const { Router } = require('express');

const router = Router();

const OrderController = require('../controller/orderController')
const OrderDaysController = require('../controller/orderDaysController')



router
	.get('/', (_req, res) => res.send({ message: 'api running' }))
	//rota que pega os pedidos no pipedrive, envia para o bling e salva no banco
	.post('/webhook', OrderController.store)
	//rota para pegar os pedidos agregados por dia
	.get('/orders', OrderDaysController.index)
	//rota que agragas os pedidos por dia
	.post('/orders', OrderDaysController.store)
	

module.exports = router;