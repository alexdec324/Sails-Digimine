/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    firstname: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    address: {
      type: 'string',
      required: true
    },
    phonenum: {
      type: 'string',
      required: true
    },
    pricing: {
      type: 'string',
      required: true
    },
    token: {
      type: 'string',
      required: true
    },
    verifycode: {
      type: 'string',
      required: true
    },
    state: {
      type: 'int',
      required: true
    },

  },


  /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup: function (inputs, cb) {
    // Create a user
    User.create({
      username: inputs.username,
      email: inputs.email,
      // TODO: But encrypt the password first
      password: inputs.password,
      firstname: inputs.firstname,
      lastname: inputs.lastname,
      address: inputs.address,
      phonenum: inputs.phonenum,
      pricing: '1',
      token: inputs.token,
      verifycode: inputs.verifycode,
      state: -1
    })
    .exec(cb);
  },
  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  attemptLogin: function (inputs, cb) {
    // Create a user
    User.findOne({
      email: inputs.email,
      // TODO: But encrypt the password first
      password: inputs.password,
    })
    .exec(cb);
  },

  getUser: function (input, cb) {
    // Create a user
    User.findOne({
      id: input.id
    })
    .exec(cb);
  },

  testEmail: function (inputs, cb) {

    User.findOne({
      email: inputs.email
    })
    .exec(cb);
  },
  /** verification  */
  verify: function (inputs, cb) {
  // update a user
    User.findOne({token: inputs.token, verifycode: inputs.verifycode}).exec(function(err,result){
      if(result){
        User.update(
          {token: inputs.token },
          {state: 1}
        ).exec(cb);
      } else {
        cb(1, result);
      }
    });
  },
  updateUser: function(inputs, cb){
    User.update({id: inputs.id},{
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
      firstname: inputs.firstname,
      lastname: inputs.lastname,
      address: inputs.address,
      phonenum: inputs.phonenum,
      token: inputs.token,
      verifycode: inputs.verifycode,
      state: inputs.state,
    }).exec(cb);
  },
};

