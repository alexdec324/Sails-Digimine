// api/services/Mailer.js
module.exports.sendWelcomeMail = function(obj) {
  // console.log('verifycode:' + obj.verifycode);
  sails.hooks.email.send(
    "", 
    {
      Name: obj.username
    },
    {
      to: obj.email,
      subject: "Welcome Email",
      text: obj.verifycode
    },
    function(err) {
     console.log(err || "Mail Sent!");
    });
}