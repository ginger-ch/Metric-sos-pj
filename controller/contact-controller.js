const ContactModel = require('../model/contact-model');


exports.getContact = (req, res) => {
  res.render('contact', { message: null });
};