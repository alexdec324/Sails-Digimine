/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var querystring = require('querystring');
var https = require('https');
var text = require('textbelt');  
var randtoken = require('rand-token');
var crypto = require("crypto");
var sha256 = crypto.createHash("sha256");

module.exports = {

  /**
   * `UserController.login()`
   */
  login: function (req, res) {

    // See `api/responses/login.js`
    var sha256 = crypto.createHash("sha256");
    sha256.update(req.param('password'), "utf8");//utf8 here
    var inputpassword = sha256.digest("base64");

    return res.login({
      email: req.param('email'),
      password: inputpassword,
      successRedirect: '/welcome',
      invalidRedirect: '/'
    });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {

    // "Forget" the user from the session.
    // Subsequent requests from this user agent will NOT have `req.session.me`.
    req.session.me = null;
    req.session.data = null;
    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a simple response letting the user agent know they were logged out
    // successfully.
    if (req.wantsJSON) {
      return res.ok('Logged out successfully!');
    }

    // Otherwise if this is an HTML-wanting browser, do a redirect.
    return res.redirect('/');
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    var verifycode = Math.floor((Math.random()*999999)+111111);
    var token = randtoken.generate(16);
    var sha256 = crypto.createHash("sha256");
    sha256.update(req.param('password'), "utf8");//utf8 here
    var securitypassword = sha256.digest("base64");
    // Attempt to signup a user using the provided parameters
    User.testEmail({ email:req.param('email')}, function(err,success){
      if(success)
      {
        req.flash('error', 'Duplicate email address');
        return res.redirect('/signup');
        
      }
      //Save the user data in mysql
      User.signup({
        username: req.param('username'),
        email: req.param('email'),
        password: securitypassword,
        firstname: req.param('firstname'),
        lastname: req.param('lastname'),
        address: req.param('address'),
        phonenum: req.param('phonenum'),
        token: token,
        verifycode: verifycode,
      }, function (err, user) {
        if(err)
        {
          req.flash('error', 'Signup Faild!');
          return res.redirect('/signup');
          
        }
        //Send Email to new User
        Mailer.sendWelcomeMail(user);
        // req.session.me = user.id;
        if (req.wantsJSON) {
          return res.ok('Signup successful!');
        }
        return res.redirect('/verify/'+user.token);
      });
    });
  },
  /** verification  */
  verify: function(req, res){
    User.verify({
      verifycode: req.param('verifycode'),
      token: req.params.token
    }, function(err, updated){
    if (!updated) {
      req.flash('error', 'Incorect verifycode.');
      return res.redirect('/verify/'+req.params.token);
    }
    req.session.me = updated[0].id;
    return res.redirect('/welcome');
    });
  },
};

