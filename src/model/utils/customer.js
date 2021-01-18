const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
	{ name: String },
	{ _id : false, timestamps: false, versionKey: false }
);
module.exports = CustomerSchema;