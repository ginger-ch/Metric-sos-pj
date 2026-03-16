// const express = require('express');
// const session = require('express-session');  // ← เพิ่ม
// const flash = require('connect-flash');
// const app = express();
// const session = require('express-session');
// const flash = require('connect-flash');


// app.set('view engine', 'ejs');
// app.set('views', './view');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
// app.use(flash());


// //login page
// app.use('/', require('./route/auth-route'));

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));

// app.set('view engine', 'ejs');
// app.set('views', './view');
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
// app.use(flash());


// //login page
// app.use('/', require('./route/auth-route'));
// // --- Routes ---

// // Homepage
// app.get('/', (req, res) => {
//   res.render('index', {
//     categories: [
//       { id: 'tops',      name: 'Tops' },
//       { id: 'bottoms',   name: 'Bottoms' },
//       { id: 'outerwear', name: 'Outerwear' },
//       { id: 'dresses',   name: 'Dresses' },
//       { id: 'shoes',     name: 'Shoes' },
//     ],
//     products: [
//       { id: 1, name: 'Classic Knit Top',   price: 590,  image: '' },
//       { id: 2, name: 'Wrap Mini Skirt',    price: 690,  image: '' },
//       { id: 3, name: 'Linen Blazer',       price: 1290, image: '' },
//       { id: 4, name: 'Cropped Upper Knit', price: 590,  image: '' },
//     ]
//   });
// });

// //admin เองจร้า
// const adminRoutes = require('./route/admin-route');
// app.use('/admin', adminRoutes);


// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`✅ Girlette running at http://localhost:${PORT}`);
// });




// มันมีนางคนนึงที่ไปกดแก้คอนฟิกอะไรซักอย่างในคืนวันเสาร์ที่ 14 มีนาคม ขอนุยาดแก้ชั่วคราวนะเบบี๋


const express = require('express');
const session = require('express-session');
const flash   = require('connect-flash');
const app     = express();

app.set('view engine', 'ejs');
app.set('views', './view');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(flash());

// --- Routes ---
app.get('/', (req, res) => {
  res.render('index', {
    categories: [
      { id: 'tops',      name: 'Tops' },
      { id: 'bottoms',   name: 'Bottoms' },
      { id: 'outerwear', name: 'Outerwear' },
      { id: 'dresses',   name: 'Dresses' },
      { id: 'shoes',     name: 'Shoes' },
    ],
    products: [
      { id: 1, name: 'Classic Knit Top',   price: 590,  image: '' },
      { id: 2, name: 'Wrap Mini Skirt',    price: 690,  image: '' },
      { id: 3, name: 'Linen Blazer',       price: 1290, image: '' },
      { id: 4, name: 'Cropped Upper Knit', price: 590,  image: '' },
    ]
  });
});

app.use('/', require('./route/auth-route'));
app.use('/admin', require('./route/admin-route'));

app.listen(4000, () => {
  console.log('Girlette running at http://localhost:4000');
});