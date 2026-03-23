const express = require('express');
const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', (req, res) => {
    res.json([{ message: 'Return all products (placeholder)' }]);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', (req, res) => {
    res.json({ message: `Return product with id ${req.params.id}` });
});

module.exports = router;
