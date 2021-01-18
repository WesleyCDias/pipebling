const mongoose = require('mongoose');
const CustomerSchema= require("./utils/customer")
const ItemSchema= require("./utils/item")


const OrderSchema = new mongoose.Schema({
		order_id: {
			type: String,
			unique: true,
			required: true
		},
		date: {
			type: Date,
			default: Date.now
		},
		customer: CustomerSchema,
		item: ItemSchema,
	},
	{versionKey: false }
);
const Orders = mongoose.model('Orders', OrderSchema);
module.exports = Orders
