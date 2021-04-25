import React, {  useState } from 'react';
import {  Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({history}) => {

    const dispatch = useDispatch()
    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart
   
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)
    const [postalCode, setpostalCode] = useState(shippingAddress.postalCode)

    const submitHandler =(e)=>{
      e.preventDefault()
      dispatch(saveShippingAddress({address,city,country,postalCode}))
      history.push('/payment')
    }
   
    return (
       <FormContainer>
         <CheckoutSteps step1 step2/>
           <h1>Shipping</h1>
           <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address </Form.Label>
          <Form.Control
            type='text'
            required
            value={address}
            placeholder='Enter your address'
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City </Form.Label>
          <Form.Control
            type='text'
            required
            value={city}
            placeholder='Enter your city'
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code </Form.Label>
          <Form.Control
            type='text'
            required
            value={postalCode}
            placeholder='Enter your Postal Code'
            onChange={(e) => setpostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            required
            value={country}
            placeholder='Enter your country'
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit'>Continue</Button>
        </Form>
       </FormContainer>
    )
}

export default ShippingScreen
