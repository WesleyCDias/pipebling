
const OrdersDay = require("../model/ordersDay");
const logger = require("../config/logger");


const { aggregateDay } = require("./utils/aggregateDay");

module.exports={
  async index (req, res){
    try {
    const ordersDay = await OrdersDay.find({})

    res.status(200).json( ordersDay);
    } catch (error) {
      res.status(500).json(error);
    }
    
   
  },
  async store(req, res){
    try {
    await aggregateDay();
    res.status(200).send();
    } catch (error) {
      res.status(500).json(error);
    }
    

  }
}