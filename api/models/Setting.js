/**
* Setting.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var async=require('async');
module.exports = {

  attributes: {
    userid: {
      type: 'int',
      required: true
    },
    item: {
      type: 'string',
      required: true
    },
    value: {
      type: 'string',
      required: true
    }
  },
  accountID: function(inputs, cb){
    var accountIds = [
      {userid: inputs.userid, item: 'bitcoin_id', value: inputs.bitcoin_id},
      {userid: inputs.userid, item: 'ethereum_id', value: inputs.ethereum_id},
      {userid: inputs.userid, item: 'zcash_id', value: inputs.zcash_id},
      {userid: inputs.userid, item: 'litecoin_id', value: inputs.litecoin_id},
    ]
    var Len = accountIds.length, i = 0;
    var errData=[];
    async.whilst(
      function(){
        return i<Len;
      },function(callback){
        Setting.findOne({
          userid: inputs.userid, item: accountIds[i].item
        }).exec(function(err, row){
          if (err){
            console.log("err:" + err);
          }
          if (!row) {
            Setting.create(accountIds[i]).exec(function(err,data){
              if(err){
                errData.push(accountIds[i]);
              }
              callback(null,i++);
            });
          }else{
            Setting.update(
              {userid: inputs.userid, item: accountIds[i].item},
              {value: accountIds[i].value}).exec(function(err,data){
              if(err){
                errData.push(accountIds[i]);
              }
              callback(null,i++);
            });
          }
        });
      },function(err,n){
        // console.log(errData);//These are the data where error encountered!!!
        cb(null, true);
    });
  },
  getaccountIds: function(input, cb){
    Setting.find({userid: input.userid}).exec(cb);
  },
};

