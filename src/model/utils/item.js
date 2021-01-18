const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema(
	{
		code: String,
		description: String,
		unit_value: Number
	},
	{ _id : false, timestamps: false, versionKey: false }
);
module.exports = ItemSchema;
