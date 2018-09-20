/**
* Order.js
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
    invoice_id: {
      type: 'string',
      required: true
    },
    payment: {
      type: 'string',
      required: true
    },
    state: {
      type: 'int',
      required: true
    },
  },

  saveHashpower: function (inputs, cb){
    Order.find({userid: inputs.userid})
    .sort('createdAt DESC')
    .limit(1)
    .exec(function(err, data){
      if (err){
      }
      if(data[0]){
        if (data[0].state == '-100') {
          Order.destroy({id: data[0].id}).exec(function(err){
          });
        }
      }
      Order.create({
        userid: inputs.userid,
        zcash: inputs.data.zcash,
        ethereum: inputs.data.ethereum,
        litecoin: inputs.data.litecoin,
        invoice_id: inputs.invoice_id,
        payment: inputs.data.payment,
        state: inputs.state,
      }).exec(cb);
    });
  },

  savePending: function(inputs, cb){
    Order.create({
      userid: inputs.userid,
      zcash: inputs.data.zcash,
      ethereum: inputs.data.ethereum,
      litecoin: inputs.data.litecoin,
      invoice_id: inputs.invoice_id,
      payment: inputs.data.payment,
      state: '-100',
    }).exec(cb);
  },

  find_order: function(input, cb){
    Order.find({userid: input.userid, state: '1'})
    .sort('createdAt DESC')
    .limit(1)
    .exec(cb);
  },

  find_pending: function(input, cb){
    Order.find({userid: input.userid, state: '-100'})
    .sort('id DESC')
    .limit(1)
    .exec(cb);
  },

  getPendings: function(input, cb){
    Order.find({userid: input.userid, state: '-100'})
    .sort('createdAt DESC')
    .exec(cb);
  },
};

