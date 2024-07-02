const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

getProducts = asyncHandler(async (req, res) => {
    const {company,name,sort} = req.query;
    const queryObject = {};
    if(company) {queryObject.company = company;}
    if(name) queryObject.name = {$regex: name, $options: 'i'};


    try {
        const products = await Product.find(queryObject);
        res.status(200).json(products);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);   
     }
});

getProduct = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

createProduct =  asyncHandler(async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

updateProduct =  asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

        // we cannot find any product in database
        if (!product) {
           res.status(404);
           throw new Error(`I cannot find any product with ID ${id}`);
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);    }
});

deleteProduct =  asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404);
            throw new Error(`I cannot find any product with ID ${id}`);        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);    }
});

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}