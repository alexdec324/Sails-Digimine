/**
 * MyorderController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var moment = require('moment');
 var crypto = require("crypto");

 module.exports = {
 	myorder: function(req, res){
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
        Order.getPendings({userid: req.session.me}, function(err, pendings){
          if (err) return res.negotiate(err);
          Balance.welcome({userid: req.session.me}, function(err, balance){
            if (err) return res.negotiate(err);
            if (!balance) {
              if (!hashpower) {
                state = 1;
              }else{
                state = 2;
              }
              return res.view('user/myorder', {username: username, hashpower: hashpower, pendings: pendings, state: state});
            }
            else{
              if (!hashpower) {
                state = 3;
              }else{
                state = 4;
              }
              return res.view('user/myorder', {username: username, hashpower: hashpower, pendings: pendings, state: state});
            }
          });
        });
      });
    });
 	}
 }