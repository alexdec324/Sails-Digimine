/**
 * AllocationController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
 	/*****AllocationController.allocation()******/
  allocation: function(req, res){
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
        Balance.welcome({userid: req.session.me}, function(err, balance){
          if (err) return res.negotiate(err);
          if (!balance) {
            if (!hashpower) {
              state = 1;
            }else{
              state = 2;
            }
            var balance = sails.models.balance;
            balance.coin = 1;
            balance.bitcoin = 0;
            balance.ethereum = 0;
            balance.zcash = 0;
            balance.litecoin  = 0;
            res.view('user/allocation', {username: username, data: balance, hashpower: hashpower, state: state});
          }else{
            if (!hashpower) {
              state = 3;
            }else{
              state = 4;
            }
            if (!balance.coin) {
              balance.coin = 1;
            }
            res.view('user/allocation', {username: username, data: balance, hashpower: hashpower, state: state});
          }
        });
      });
    });
  },
  /***
  // AllocationController.saveMining()
  ***/
  save_coin: function(req, res){
    var coindata = req.allParams();
    Balance.save_coin({
      userid: req.session.me,
      coindata: coindata
    }, function(err, data){
      if (err) return res.negotiate(err);
      return res.send('success');
    });
  },
  /***
  // AllocationController.coinBalance()
  ***/
  save_percent: function(req, res){
    var coindata = req.allParams();
    Balance.save_percent({
      userid: req.session.me,
      coindata: coindata
    }, function(err, data){
      if (err) return res.negotiate(err);
      return res.send('success');
    });
  },

}