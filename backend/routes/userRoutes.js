import express from 'express'
import {authUser,getUserProfile,getUsers,registerUser, updateUserProfile, deleteUser, getUserByID, updateUserByAdmin} from '../controllers/userController.js'
import {admin, protect} from '../middleware/authMiddleWare.js'


const router = express.Router()


router.post('/login', authUser)
router.post('/', registerUser)
router.get('/',protect,admin,getUsers)
router.delete('/:id',protect,admin, deleteUser)
router.get('/:id',protect,admin, getUserByID)
router.put('/:id',protect,admin, updateUserByAdmin)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)



export default router