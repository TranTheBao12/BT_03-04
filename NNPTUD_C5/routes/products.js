var express = require('express');
var router = express.Router();
let productModel = require('../schemas/product');
let categoryModel = require('../schemas/category');
const slugify = require('slugify');

// API lấy tất cả sản phẩm trong category theo slug
router.get('/slug/:category', async function (req, res) {
    try {
        let category = await categoryModel.findOne({ slug: req.params.category });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Danh mục không tồn tại"
            });
        }
        let products = await productModel.find({ category: category._id });

        res.status(200).send({
            success: true,
            data: products
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

// API lấy sản phẩm theo category và product slug
router.get('/slug/:category/:product', async function (req, res) {
    try {
        let category = await categoryModel.findOne({ slug: req.params.category });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Danh mục không tồn tại"
            });
        }
        let product = await productModel.findOne({ slug: req.params.product, category: category._id });
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Sản phẩm không tồn tại"
            });
        }
        res.status(200).send({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

// API thêm sản phẩm
router.post('/', async function (req, res) {
    try {
        let category = await categoryModel.findOne({ name: req.body.category });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Danh mục không đúng"
            });
        }
        let newProduct = new productModel({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            category: category._id
        });
        await newProduct.save();
        res.status(200).send({
            success: true,
            data: newProduct
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
