/**
 * HashpowerController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var moment = require('moment');
var crypto = require("crypto");
module.exports = {
  /**
   * `SetcoinController.hashpower()`
   */
  hashpower: function(req, res){
    var username = 'JOHN MARTIN';
    var hashpower = {};
    var state;
    User.getUser({id: req.session.me}, function(err, user){
      if (err) return res.negotiate(err);
      if (!user) {
        return res.redirect('/');
      }
      username = user.username.toUpperCase();
      Order.find_pending({userid: req.session.me}, function(err, order){
        if (err) return res.negotiate(err);
        hashpower = order[0];
        Balance.welcome({userid: req.session.me}, function(err, balance){
          if (err) return res.negotiate(err);
          if (!balance) {
            if (!hashpower) {
              state = 1;
            }else{
              state = 2;
            }
            return res.view('user/hashpower', {username: username, hashpower: hashpower, state: state});
          }
          else{
            if (!hashpower) {
              state = 3;
            }else{
              state = 4;
            }
            return res.view('user/hashpower', {username: username, hashpower: hashpower, state: state});
          }
        });
      });
    });

  },
  /**
   * `SetcoinController.saveHashpower()`
   */
  saveHashpower: function(req, res, callback){
    var params = req.allParams();
    req.session.data = {};
    req.session.data.zcash = req.param('zcash');
    req.session.data.ethereum = req.param('ethereum');
    req.session.data.litecoin = req.param('litecoin');
    req.session.data.payment = req.param('payment');
    // console.log(req.session.data);
    return res.ok();
  },
  /***
  ** `SetcoinController.orderSpec()`
  ***/
  orderSpec: function(req, res){
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
        var date = moment(new Date()).format('DD.MM.YYYY');
        Balance.welcome({userid: req.session.me}, function(err, balance){
          if (err) return res.negotiate(err);
          if (!balance) {
            if (!hashpower) {
              state = 1;
            }else{
              state = 2;
            }
            res.view('user/order', {username: username, hashpower: hashpower, pending: req.session.data, date: date, state: state});
          }
          else{
            if (!hashpower) {
              state = 3;
            }else{
              state = 4;
            }
            res.view('user/order', {username: username, hashpower: hashpower, pending: req.session.data, date: date, state: state});
          }
        });
      });
    });
  },

  payment: function(req, res){
    var uID = crypto.randomBytes(4).toString('hex').toUpperCase() + "-" + 
          crypto.randomBytes(2).toString('hex').toUpperCase() + "-" + 
          crypto.randomBytes(2).toString('hex').toUpperCase() + "-" +
          crypto.randomBytes(6).toString('hex').toUpperCase();
    Order.savePending({userid: req.session.me, data: req.session.data, invoice_id: uID}, function(err, data){
      if (err) return res.negotiate(err);
      if (!data) {
        return res.redirect('/hashpower');
      }else{
        req.session.data = null;
        res.view('user/payment', {data: data});
      }
    });
  }
};

