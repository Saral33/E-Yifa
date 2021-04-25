import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({location,history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)
  const redirect = location.search ? location.search.split('=')[1]: '/'

  const dispatch = useDispatch()
  const userRegister = useSelector(state=> state.userRegister)
  const {loading,userInfo, error} = userRegister

  const submitHandler = (e) => {
      e.preventDefault()
      if(password!==confirmPassword){
        setMessage('Passwords do not match')
      }
        else{dispatch(register(name,email,password))}
  };

  useEffect(()=>{
      if(userInfo){
          history.push(redirect)
      }
  },[history, userInfo, redirect])
  return (
    <FormContainer>
      <h1>Register</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="danger">{message}</Message>}
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
        <Button type='submit' variant='primary'>Register</Button>
      </Form>
      <Row className="py-3">
          <Col>
          Already have an Account?{' '}
          <Link to={redirect? `/login?redirect=${redirect}`: `/login`}>Login</Link>
          </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
