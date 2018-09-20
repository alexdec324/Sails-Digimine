/**
 * ContactUsController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
  /***contact***/
  sendmessage: function(req, res){
    sails.hooks.email.send(
      "", 
      {
        Name: req.param('name')
      },
      {
        from: req.param('email'),
        to: 'contact@digimine.com.au',
        subject: req.param('subject'),
        text: req.param('message')
      },
      function(err) {
        console.log(err || "Mail Sent!");
        if(err){
          res.send('Message Send Failed! Try Again!');
        }else{
          res.send('Message Sent, Thank you for contacting us.');
          // res.ok();
        }
    });
  },
}