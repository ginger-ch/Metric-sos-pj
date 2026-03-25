// // const userModel = require('../model/user-model');

// // exports.getProfile = async (req, res) => {
// //   if (!req.session.user) return res.redirect('/login');

// //   const user = await userModel.findById(req.session.user.user_id);
// //   const now = new Date();
// //   const dateStr = now.toLocaleDateString('en-GB', {
// //     weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
// //   });
// //   const editMode = req.query.edit === '1';

// //   res.render('profile', { user, dateStr, editMode });
// // };

// // exports.updateProfile = async (req, res) => {
// //   if (!req.session.user) return res.redirect('/login');

// //   const { full_name, username, phone, email, date_of_birth, address } = req.body;
// //   const id = req.session.user.user_id;

// //   try {
// //     await userModel.updateUser(id, { full_name, username, phone, email, date_of_birth, address });
// //     req.session.user = await userModel.findById(id);
// //     res.redirect('/profile');
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send('Server Error');
// //   }
// // };

// const userModel = require('../model/user-model');
// const multer = require('multer');
// const path = require('path');

// exports.getProfile = async (req, res) => {
//   if (!req.session.user) return res.redirect('/login');

//   const user = await userModel.findById(req.session.user.user_id);
//   const now = new Date();
//   const dateStr = now.toLocaleDateString('en-GB', {
//     weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
//   });
//   const editMode = req.query.edit === '1';

//   res.render('profile', { user, dateStr, editMode, error: null });
// };

// exports.updateProfile = async (req, res) => {
//   if (!req.session.user) return res.redirect('/login');

//   const { full_name, username, phone, email, date_of_birth, address } = req.body;
//   const id = req.session.user.user_id;

//   const now = new Date();
//   const dateStr = now.toLocaleDateString('en-GB', {
//     weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
//   });

//   try {
//     await userModel.updateUser(id, {
//       full_name,
//       username,
//       phone: phone || null,
//       email,
//       date_of_birth: date_of_birth || null,
//       address: address || null,
//     });
//     req.session.user = await userModel.findById(id);
//     res.redirect('/profile');

//   } catch (err) {
//     console.error(err);
//     const user = await userModel.findById(id);
//     let error = 'Something went wrong. Please try again.';

//     if (err.code === 'ER_DUP_ENTRY') {
//       if (err.message.includes('username')) error = 'Username is already taken.';
//       else if (err.message.includes('email')) error = 'Email is already in use.';
//     }

//     res.render('profile', { user, dateStr, editMode: true, error });
//   }
// };

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'public/uploads/avatars'),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `user_${req.session.user.user_id}_${Date.now()}${ext}`);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowed = ['image/jpeg', 'image/png', 'image/webp'];
//     allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
//   }
// });

// exports.upload = upload;

const userModel = require('../model/user-model');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/image/avatars'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user_${req.session.user.user_id}_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
  }
});

exports.upload = upload;

exports.getProfile = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const user = await userModel.findById(req.session.user.user_id);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
  });
  const editMode = req.query.edit === '1';

  res.render('profile', { user, dateStr, editMode, error: null });
};

exports.updateProfile = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const { full_name, username, phone, email, date_of_birth, address } = req.body;
  const id = req.session.user.user_id;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
  });

  try {
    await userModel.updateUser(id, {
      full_name,
      username,
      phone: phone || null,
      email,
      date_of_birth: date_of_birth || null,
      address: address || null,
    });
    req.session.user = await userModel.findById(id);
    res.redirect('/profile');

  } catch (err) {
    console.error(err);
    const user = await userModel.findById(id);
    let error = 'Something went wrong. Please try again.';

    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('username')) error = 'Username is already taken.';
      else if (err.message.includes('email')) error = 'Email is already in use.';
    }

    res.render('profile', { user, dateStr, editMode: true, error });
  }
};

exports.updateAvatar = async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  if (!req.file) return res.redirect('/profile?edit=1');

  const id = req.session.user.user_id;
  const imagePath = '/image/avatars/' + req.file.filename;

  try {
    await userModel.updateAvatar(id, imagePath);
    req.session.user = await userModel.findById(id);
    res.redirect('/profile?edit=1');
  } catch (err) {
    console.error(err);
    res.redirect('/profile?edit=1');
  }
};