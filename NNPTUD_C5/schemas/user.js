let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: "",
        unique: true,
    },
    fullName: {
        type: String,
        default: "",
    },
    avatarUrl: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: false
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'role',
        required: true
    },
    loginCount: {
        type: Number,
        min: 0,
        default: 0
    },
    tokenResetPassword: String,
    tokenResetPasswordExp: Date
}, {
    timestamps: true
});

// 🔐 Hash mật khẩu trước khi lưu vào DB
userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// ✅ Hàm so sánh mật khẩu khi đăng nhập
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// 🔄 Đặt lại mật khẩu mới
userSchema.methods.resetPassword = async function (newPassword) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(newPassword, salt);
    this.tokenResetPassword = null;
    this.tokenResetPasswordExp = null;
    await this.save();
};

module.exports = mongoose.model('user', userSchema);
