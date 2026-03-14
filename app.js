const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './view');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Routes ---

// Homepage
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

//admin เองจร้า
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Girlette running at http://localhost:${PORT}`);
});
