const mongoose = require('mongoose');
const slugify = require('slugify');

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

// Tạo slug trước khi lưu
categorySchema.pre('save', function (next) {
    if (this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('category', categorySchema);
