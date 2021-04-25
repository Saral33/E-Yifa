import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {Col, Row, Image, Card,ListGroup, Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import {addToCart, removeFromCart} from '../actions/cartActions'


const CartScreen = ({match,history,location}) => {

    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) :1
    const dispatch = useDispatch()
    const cart = useSelector(state=>state.cart)
    const {cartItems} = cart

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch, productId,qty])


    const checkOutHandler =()=>{
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
           <Col md={8}>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? <Message>Your Cart is Empty  <Link to= '/'>Go back </Link>
            </Message>:
            <ListGroup variant="flush">
                {cartItems.map(item=> (
                    <ListGroup.Item key={item.product}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md ={3}>
                                <Link to = {`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>
                                ${item.price}
                            </Col>
                            <Col md={2}>
                            <Form.Control as='select' value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                    {
                                    [...Array(item.countInStock).keys()].map(x => (
                                        <option key={x +1} value={x + 1}>{x + 1}</option>
                                    ))
                                     }
                                </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button type="button" variant="light" onClick={e=> dispatch(removeFromCart(item.product))}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup> }
           </Col>
           <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>
                        SubTotal({cartItems.reduce((acc, item)=> acc + item.qty, 0)}) items
                    </h3>
                    ${cartItems.reduce((acc,item)=> acc + item.price * item.qty , 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button type='button' onClick={checkOutHandler} className="btn-block" disabled={cartItems.length===0}>Proceed to Purchase</Button>
                </ListGroup.Item>
                </ListGroup>
            </Card>
           </Col>
        </Row>
    )
}

export default CartScreen
