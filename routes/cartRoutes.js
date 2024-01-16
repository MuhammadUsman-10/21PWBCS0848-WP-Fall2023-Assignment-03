const express = require('express');
const router = express.Router();
const Cart = require('../models/cartschema');

// Get all cart items
router.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('product');

        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/cart/:productId', async (req, res) => {
    const { productId } = req.params;
    
        try {
        if (productId) {
            // If productId is provided, fetch a specific cart item by product ID
            const cartItem = await Cart.findOne({ product: productId }).populate('product');
    
            if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found for the product' });
            }
    
            res.json(cartItem);
        } else {
            // If productId is not provided, fetch all cart items
            const cartItems = await Cart.find().populate('product');
            res.json(cartItems);
        }
        } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
});
// Update or add a product to the cart
router.put('/updatecart/:productId', async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    try {
        let cartItem = await Cart.findOne({ product: productId });

        if (!cartItem) {
        // If the product is not in the cart, add a new item
            cartItem = new Cart({
                product: productId,
                quantity: 0, // Default quantity is 0
            });
        }

        // Update the quantity if provided in the request body
        if (quantity !== undefined) {
            cartItem.quantity += quantity; // Set quantity to the provided value

            if (cartItem.quantity < 0) {
                cartItem.quantity =0;
            }
        }

        await cartItem.save();
        res.json(cartItem);
    } catch (error) {
        console.error('Error updating/adding product to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a product from the cart
router.delete('/deletecart/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await Cart.deleteOne({ product: productId });

        if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Product not found in the cart' });
        }

        res.json({ message: 'Product deleted from the cart successfully' });
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
