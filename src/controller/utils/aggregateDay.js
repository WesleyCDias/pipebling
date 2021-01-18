const OrdersDay = require("../../model/ordersDay");
const Orders = require('../../model/orders');


module.exports ={

  //funçao para somar todos os pedidos nos dias.
  async aggregateDay(){
   await OrdersDay.deleteMany({})
    Orders.aggregate([
      {$match:{}},
      {
        $group: {
          _id: {
            day: { $dayOfMonth: '$date' },
            month: { $month: '$date' },
            year: { $year: '$date' },
          },
          totalAmount: { $sum: '$item.unit_value' },
          pedidos: { $sum: 1 },
        },
      },
    ]).then((orders) => {
      orders = orders
        .map((order) => {
          return {
            date: new Date(
              `${order._id.month}/${order._id.day}/${order._id.year}`
            ),
            total: order.totalAmount,

          };
        })

      OrdersDay.create(orders)
        return ;

      })
  }
}
