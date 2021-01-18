const axios = require ('axios');



const Orders = require('../model/orders');




const {uploadDealToBling} = require("./utils/xmlOrders");

const { integrations, webhook } = require('../config/config');


module.exports = {
    async store(req, res){

      try {
        await axios.get(
           `${webhook.baseURL}deals?status=won&api_token=${integrations.pipedrive.key}`
         ).then( async (response)=>{
           const orders = response.data.data
           orders.map(async order=>{
            const exist =  await Orders.findOne({ order_id: order.id })
   
            if (exist ==null){
   
               const payloadOrder = {
                 date: order.won_time|| new Date(),
                 customer: {
                   name: order.person_id.name
                 },
                 item: {
                   code: `${new Date().getTime()}`.slice(-6),
                   description: order.title,
                   unit_value: order.value
                 },
                 description: 'integrated from pipedrive'
               };
               uploadDealToBling(payloadOrder).then( async response=>{
                 const newOrder = Object.assign({}, payloadOrder, {
                   order_id : order.id,
                 });
                await Orders.create(newOrder);
   
               });
                }
   
             });
         return res.status(201).send()
       })
        
      } catch (error) {
        res.status(500).json(error);
      }
  },

}