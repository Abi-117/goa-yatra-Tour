const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AdminUserSchema = new mongoose.Schema({
name: String,
email: { type: String, unique: true },
password: String,
}, { timestamps: true });


AdminUserSchema.pre('save', async function (next) {
if (!this.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});


AdminUserSchema.methods.matchPassword = async function (entered) {
return await bcrypt.compare(entered, this.password);
};


module.exports = mongoose.model('AdminUser', AdminUserSchema);