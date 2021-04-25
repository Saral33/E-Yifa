import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import CartScreen from './screens/CartScreen'
import {Container} from 'react-bootstrap'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'


const App=()=> {
  return (
      <Router>
      <Header/>
      <main className="py-3">
        <Container>
       <Route exact path='/' component={HomeScreen}/>
       <Route exact path='/search/:keyword' component={HomeScreen}/>
       <Route exact path='/product/:id' component={ProductScreen}/>
       <Route exact path='/cart/:id?' component={CartScreen}/>
       <Route exact path='/login' component={LoginScreen}/>
       <Route exact path='/register' component={RegisterScreen}/>
       <Route exact path='/profile' component={ProfileScreen}/>
       <Route  path='/shipping' component={ShippingScreen}/>
       <Route  path='/placeorder' component={PlaceOrderScreen}/>
       <Route  path='/payment' component={PaymentScreen}/>
       <Route  path='/admin/userlist' component={UserListScreen}/>
       <Route  path='/admin/productlist' component={ProductListScreen}/>
       <Route  path='/admin/user/:id/edit' component={UserEditScreen}/>
       <Route  path='/admin/product/:id/edit' component={ProductEditScreen}/>
       <Route  path='/order/:id' component={OrderScreen}/>
        </Container>
        </main>
      <Footer/>
      </Router>
  );
}

export default App;
