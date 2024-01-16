const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const Cart = require('./models/cartschema.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const uri = 'mongodb://127.0.0.1:27017/My_Ecommerce'; // Replace with your MongoDB URI
mongoose.connect(uri);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Database connection error:', err);
});


const products = require('./routes/productRoutes');
app.use('/api', products);
const cart= require('./routes/cartRoutes');
app.use('/api',cart)


db.once('open', () => {
  console.log('Database connected successfully');

  app.use('/', userRoutes); // Mounting user authentication routes
  app.use('/', adminRoutes); // Mounting admin authentication routes // Mounting product authentication routes
  app.use('/', productRoutes);
  app.use('/', cartRoutes); //  Mounting cart details 

  // Home page route
  app.get('/', (req, res) => {
    res.send('Welcome to the eCommerce web app!');
  });
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
