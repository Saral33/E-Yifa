import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserProfile, updateProfile } from '../actions/userActions';
import { getMyOrderList } from '../actions/orderActions';

const ProfileScreen = ({history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)


  const dispatch = useDispatch()
  
  const userDetails = useSelector(state=> state.userDetails)
  const {loading,user, error} = userDetails

  const userLogin = useSelector(state=> state.userLogin)
  const {userInfo} = userLogin

  const {success} = useSelector(state=> state.userUpdateProfile)

  const orderMyList = useSelector(state=> state.orderMyList)
  const {orders,loading:loadingOrders,error:errorOrders} = orderMyList

  const submitHandler = (e) => {
      e.preventDefault()
      if(password!==confirmPassword){
        setMessage('Passwords do not match')
      }
        else{
          dispatch(updateProfile({name,email,password}))
        }
  };
  
  useEffect(()=>{
   
   
      if(!userInfo){
          history.push('/login')
      }
      else{
          if(!user.name){
            dispatch(getMyOrderList())
              dispatch(getUserProfile('profile'))
          }else{
              setName(user.name)
              setEmail(user.email)
          }
      }
  },[history, userInfo,dispatch,user])
  return (
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {success && <Message variant="success">'Successfully Updated'</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>UserName </Form.Label>
          <Form.Control
            type='text'
            value={name}
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email </Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            placeholder='Confirm your password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Update</Button>
      </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders? <Loader/>: errorOrders? <Message variant='danger'>{errorOrders}</Message>:
                <>
                  <Table responsive hover bordered striped className='table-sm'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIEVERED</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order=>(
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0,10)}</td>
                          <td>{order.totalPrice}</td>
                          <td>{order.isPaid? order.paidAt.substring(0,10) : <i className='fas fa-times' style={{color:'red'}}></i> }</td>
                          <td>{order.isDelievered? order.delieverdAt.substring(0,10) : <i className='fas fa-times' style={{color:'red'}}></i> }</td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                            <Button className='btn-sm' variant='light'>Details</Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
                }
            </Col>
        </Row>
      
     
  );
};

export default ProfileScreen;