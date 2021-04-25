import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productDetailsReducer,productTopreducer, productListReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, createReviewReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {userDetailsReducer, userDeleteReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer,userListReducer, userUpdateReducer} from './reducers/userReducer'
import {orderCreateReducer, orderDetailsReducer, orderPayReducer,orderListMy} from './reducers/orderReducer'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReview: createReviewReducer,
    productTop: productTopreducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderListMy,
    userLists: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')): {}
// const paymentMethodFromStorage = localStorage.getItem('paymentMethod')? JSON.parse(localStorage.getItem('paymentMethod')): {}

const initialState = {
    cart: {cartItems: cartItemsFromStorage, shippingAddress:shippingAddressFromStorage},
    userLogin: {userInfo:userInfoFromStorage}
}
const middleWare = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleWare)))


export default store