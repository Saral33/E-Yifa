import express from 'express'
import {getProductByID,getProducts,deleteProduct,createProduct,updateProduct,giveReview, getTopProducts} from '../controllers/productController.js'
import {admin,protect} from '../middleware/authMiddleWare.js'

const router = express.Router()


router.route('/').get(getProducts).post(protect,admin,createProduct)
router.get('/top', getTopProducts)
router.post('/:id/reviews', protect, giveReview)
router.route('/:id').get(getProductByID).put(protect,admin,updateProduct).delete(protect,admin, deleteProduct)



export default router