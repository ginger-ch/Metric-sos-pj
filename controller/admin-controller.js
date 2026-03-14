exports.getDashboard = (req, res) => {
  res.render('admin/dashboard', {
    currentPage: 'dashboard',
    admin: {
      name: 'Linn Latt Yamone',
      role: 'Admin',
      profileImage: '/image/default-avatar.png',
    },
    notifications: [
      { type: 'stock', message: 'Skirt3 out of stock!', body: 'Body text.' },
      { type: 'order', message: 'New order!',           body: 'Body text.' },
      { type: 'order', message: 'New order!',           body: 'Body text.' },
    ],
    earnings: { totalMonth: '30K', totalWeek: 200 },
    itemSold: [
      { name: 'dress1', qty: 40 },
      { name: 'dress2', qty: 31 },
      { name: 'skirt4', qty: 25 },
    ],
    popularItems: [
      { rank: '1st', name: '#item1', orders: 12 },
      { rank: '2nd', name: '#item2', orders: 10 },
      { rank: '3rd', name: '#item3', orders: 5  },
    ],
    recentOrders: [
      { number: '0001', date: '20-02-25', customer: 'ThepSa01' },
      { number: '0001', date: '20-02-25', customer: 'ThepSa01' },
      { number: '0001', date: '20-02-25', customer: 'ThepSa01' },
    ],
    // categories: [
    //   { name: 'Dress' }, { name: '#cat2' }, { name: '#cat3' },
    //   { name: '#cat4' }, { name: '#cat5' }, { name: '#cat6' },
    // ],
    categories: [
      { name: 'Dress',  products: ['dress1', 'dress2', 'dress3', 'dress4'] },
      { name: '#cat2',  products: ['item1', 'item2'] },
      { name: '#cat3',  products: ['item1', 'item2'] },
      { name: '#cat4',  products: ['item1', 'item2'] },
      { name: '#cat5',  products: ['item1', 'item2'] },
      { name: '#cat6',  products: ['item1', 'item2'] },
    ],
    totalCategory: 6,
    totalProduct: 24,
  });
};