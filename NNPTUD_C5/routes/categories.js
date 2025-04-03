var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/category');

// API thêm danh mục
router.post('/', async function (req, res) {
    try {
        let newCategory = new categoryModel({
            name: req.body.name
        });
        await newCategory.save();
        res.status(200).send({
            success: true,
            data: newCategory
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
