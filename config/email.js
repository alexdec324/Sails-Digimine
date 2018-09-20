//config/email.js
module.exports.email = {
  service: "Mailgun",
  auth: {
    user: "postmaster@sandboxe4508cc52c344e54a175d04f01f1aaa9.mailgun.org", 
    pass: "072026fa6190b8a6bbbf009757f3aa53"
  },
  templateDir: "api/emailTemplates",
  testMode: false,
  ssl: true
}