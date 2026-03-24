const Subscriber = require('../model/contact-model');


exports.getContact = (req, res) => {
  res.render('contact', { message: null });
};

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    await Subscriber.create(email);
    res.status(200).json({ message: "Thank you for subscribing!" });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    res.status(500).json({ message: "Server error" });
  }
};