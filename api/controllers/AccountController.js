/**
 * AccountController
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
   * `AccountController.account()`
   */
  account: function(req, res){
    var username = 'JOHN MARTIN';
    var hashpower;
    var state;
    User.getUser({id: req.session.me}, function(err, user){
      if (err) return res.negotiate(err);
      if (!user) {
        return res.redirect('/');
      }
      username = user.username.toUpperCase();
      Order.find_pending({userid: req.session.me}, function(err, data){
        if (err) return res.negotiate(err);
        hashpower = data[0];
        Setting.getaccountIds({userid: req.session.me}, function(err, Ids){
          var ids = {bitcoin_id: '', ethereum_id: '', zcash_id: '', litecoin_id: ''};
          Ids.forEach(function(id){
            if(id.item == 'bitcoin_id'){
              ids.bitcoin_id = id.value;
            }else if(id.item == 'ethereum_id'){
              ids.ethereum_id = id.value;
            }else if(id.item == 'zcash_id'){
              ids.zcash_id = id.value;
            }else if(id.item == 'litecoin_id'){
              ids.litecoin_id = id.value;
            }
          });
          Balance.welcome({userid: req.session.me}, function(err, balance){
            if (err) return res.negotiate(err);
            if (!balance) {
              if (!hashpower) {
                state = 1;
              }else{
                state = 2;
              }
              return res.view('user/account', {username: username, hashpower: hashpower, state: state, user: user, ids: ids});
            }
            else{
              if (!hashpower) {
                state = 3;
              }else{
                state = 4;
              }
              return res.view('user/account', {username: username, hashpower: hashpower, state: state, user: user, ids: ids});
            }
          });
        });
      });
    });
  },

  /***datasave()**/
  datasave: function(req, res){
    var verifycode = Math.floor((Math.random()*999999)+111111);
    var token = randtoken.generate(16);
    var sha256 = crypto.createHash("sha256");
    sha256.update(req.param('password'), "utf8");//utf8 here
    var securitypassword = sha256.digest("base64");
    User.testEmail({id: req.session.me, email:req.param('email')}, function(err,success){
      Setting.accountID({
        userid: req.session.me,
        bitcoin_id: req.param('bitcoin_id'),
        ethereum_id: req.param('ethereum_id'),
        zcash_id: req.param('zcash_id'),
        litecoin_id: req.param('litecoin_id'),
      }, function(err, data){
        if (err) {
          req.flash('error', 'AccountID Save Failed!');
        }
      });
      if(success)
      {
        User.updateUser({
          id: req.session.me,
          username: req.param('username'),
          email: req.param('email'),
          password: securitypassword,
          firstname: req.param('firstname'),
          lastname: req.param('lastname'),
          address: req.param('address'),
          phonenum: req.param('phonenum'),
          token: success.token,
          verifycode: success.verifycode,
          state: 1
        },function(err, user){
          if (err) {
            req.flash('error', arr[0]);
            return res.redirect('/account');
          }
          req.flash('alert', 'Save Successed');
          return res.redirect('/account');
        });
      }
      else
      {
        //Send Email to new User
        //Save the user data in mysql
        User.updateUser({
          id: req.session.me,
          username: req.param('username'),
          email: req.param('email'),
          password: securitypassword,
          firstname: req.param('firstname'),
          lastname: req.param('lastname'),
          address: req.param('address'),
          phonenum: req.param('phonenum'),
          token: token,
          verifycode: verifycode,
          state: -1
        }, function(err, user){
          if(err)
          {
            req.flash('error', err[0]);
            return res.redirect('/account');
          }
          Mailer.sendWelcomeMail(user);
          req.session.me = null;
          if (req.wantsJSON) {
            return res.ok('Signup successful!');
          }
          return res.redirect('/verify/'+token);
        });
      }
    });
  },

}