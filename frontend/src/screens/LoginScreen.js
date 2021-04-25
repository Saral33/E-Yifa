import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({location,history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = location.search ? location.search.split('=')[1]: '/'

  const dispatch = useDispatch()
  const userLogin = useSelector(state=> state.userLogin)
  const {loading,userInfo, error} = userLogin

  const submitHandler = (e) => {
      e.preventDefault()
        dispatch(login(email,password))
  };

  useEffect(()=>{
      if(userInfo){
          history.push(redirect)
      }
  },[history, userInfo, redirect])
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
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
        <Button type='submit' variant='primary'>Login</Button>
      </Form>
      <Row className="py-3">
          <Col>
          No Account?{' '}
          <Link to={redirect? `/register?redirect=${redirect}`: `/register`}>Register here</Link>
          </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
