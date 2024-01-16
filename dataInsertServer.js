const express = require('express');
const mongoose = require('mongoose');
const productSchema = require('./models/productSchema'); // Path might differ
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

// MongoDB Connection
const uri = 'mongodb://127.0.0.1:27017/My_Ecommerce'; 
mongoose.connect(uri)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const dataPath = path.join(__dirname, 'products.json');

fs.readFile(dataPath, 'utf8', async (err, data) => {
    if (err) {
    console.error(err);
    return;
    }

    try {
    const productsData = JSON.parse(data);
    await productSchema.insertMany(productsData);
    console.log('Data inserted successfully');
    
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.disconnect();
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
