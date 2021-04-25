import React, {  useState } from 'react';
import {  Form, Button,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer'
import {savePaymentMethods} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({history}) => {

    const dispatch = useDispatch()
    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart
   
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    

    const submitHandler =(e)=>{
      e.preventDefault()
      dispatch(savePaymentMethods(paymentMethod))
      history.push('/placeorder')
    }
   
    if(!shippingAddress){
        history.push('/shipping')
    }
    return (
       <FormContainer>
         <CheckoutSteps step1 step2 step3/>
           <h1>Payment Methods</h1>
           <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>
                Select Method
                </Form.Label>
           
            <Col>
            <Form.Check  checked type='radio' value='Paypal' onChange={e=> setPaymentMethod(e.target.value)} label='PayPal or Credit Card' id='paypal' name='paymentMethod'>

            </Form.Check>
            </Col>
            </Form.Group>
        <Button type='submit'>Continue</Button>
        </Form>
       </FormContainer>
    )
}

export default PaymentScreen
