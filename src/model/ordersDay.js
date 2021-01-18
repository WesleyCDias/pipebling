const mongoose = require('mongoose');

const OrdersDaySchema = new mongoose.Schema({
		
		date: {
			type: Date,
		
    },
		total:{
      type: Number
    }
	},
	{versionKey: false }
);
const OrdersDay = mongoose.model('OrdersDay', OrdersDaySchema);
module.exports = OrdersDay