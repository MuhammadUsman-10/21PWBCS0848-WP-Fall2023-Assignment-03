const productSchema = require('../models/productSchema');

const getproducts= async (req, res) => {
    try {
        const products = await productSchema.find(); 
        res.json(products);
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getproducts };