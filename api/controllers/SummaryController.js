/**
 * SummaryController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 module.exports = {
 	/*****SummaryController.welcome()******/
  welcome: function(req, res){
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
        Balance.welcome({userid: req.session.me}, function(err, data){
          if (err) return res.negotiate(err);
          if (!data) {
            if (!hashpower) {
              state = 1;
            }else{
              state = 2;
            }
            var data = sails.models.balance;
            data.zcash = 0;
            data.ethereum = 0;
            data.litecoin = 0;
            data.bitcoin = 0;
            res.view('user/dashboard', {username: username, data: data, hashpower: hashpower, state: state});
          }else{
            if (!hashpower) {
              state = 3;
            }else{
              state = 4;
            }
            res.view('user/dashboard', {username: username, data: data, hashpower: hashpower, state: state});
          }
        });
      });
    });
  }

 }