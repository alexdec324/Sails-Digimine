/**
* Balance.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    userid: {
      type: 'int',
      required: true
    },
    coin: {
      type: 'string',
      required: true
    },
    zcash: {
      type: 'string',
      required: true
    },
    ethereum: {
      type: 'string',
      required: true
    },
    litecoin: {
      type: 'string',
      required: true
    },
    bitcoin: {
      type: 'string',
      required: true
    },
  },

  save_coin: function (inputs, cb){
    Balance.findOne({
      userid: inputs.userid
    }).exec(function(err, data){
      if (err){
        console.log("err:" + err);
      }else if(!data){
        Balance.create({
        userid: inputs.userid,
        coin: inputs.coindata.coin,
        zcash: 0,
        ethereum: 0,
        litecoin: 0,
        bitcoin: 0,
        }).exec(cb);
      }else {
        Balance.update({userid: inputs.userid}, {
        coin: inputs.coindata.coin,
        }).exec(cb);
      }
    });
  },
  save_percent: function (inputs, cb){
    Balance.findOne({
      userid: inputs.userid
    }).exec(function(err, data){
      if (err){
        console.log("err:" + err);
      }else if(!data){
        Balance.create({
        userid: inputs.userid,
        coin: 1,
        zcash: inputs.coindata.zcash,
        ethereum: inputs.coindata.ethereum,
        litecoin: inputs.coindata.litecoin,
        bitcoin: inputs.coindata.bitcoin,
        }).exec(cb);
      }else {
        Balance.update({userid: inputs.userid}, {
        zcash: inputs.coindata.zcash,
        ethereum: inputs.coindata.ethereum,
        litecoin: inputs.coindata.litecoin,
        bitcoin: inputs.coindata.bitcoin,
        }).exec(cb);
      }
    });
  },
  welcome: function(input, cb){
    Balance.findOne({
      userid: input.userid
    }).exec(cb);
  },

};

