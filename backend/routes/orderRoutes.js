import express from 'express'
import {addOrderItems,getOrderByID,updateOrderToPaid,getMyOrders} from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleWare.js'


const router = express.Router()


router.post('/', protect, addOrderItems)
router.get('/myorders', protect,  getMyOrders)
router.get('/:id',protect,getOrderByID)
router.put('/:id/pay',protect,updateOrderToPaid)




export default router