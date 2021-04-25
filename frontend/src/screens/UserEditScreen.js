import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserProfile, updateUser } from '../actions/userActions';
import {USER_UPDATE_RESET} from '../constants/userConstants'

const UserEditScreen = ({location,history,match}) => {
  const [email, setEmail] = useState('');
  const [name,setName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false);
  

  const dispatch = useDispatch()
  
  const userDetails = useSelector(state=> state.userDetails)
  const {loading,user, error} = userDetails

  const userUpdate = useSelector(state=> state.userUpdate)
  const {loading:loadingUpdate,success, error:errorUpdate} = userUpdate

  const submitHandler = (e) => {
      e.preventDefault()
     dispatch(updateUser({_id:match.params.id, name,email, isAdmin }))
  };

  useEffect(()=>{

    if(success){
        dispatch({type: USER_UPDATE_RESET})
        history.push('/admin/userlist')
    }
    else{
      if(!user.name || user._id!== match.params.id){
      dispatch(getUserProfile(match.params.id))
  }else{
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
  }
    }

  },[user,match,dispatch,history,success])
  return (

    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>Go back</Link>
    <FormContainer>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading? <Loader/>: error? <Message variant='danger'>{error}</Message>:(
      <>
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
       <Form.Group controlId='isAdmin'>
       
         <Form.Check
           type='checkbox'
           checked={isAdmin}
            label='Admin'
           onChange={(e) => setIsAdmin(e.target.checked)}
         ></Form.Check>
       </Form.Group>
       
       <Button type='submit' variant='primary'>Update</Button>
     </Form>
     
     </>)
      }
     
    </FormContainer>
    </>
    
  );
};

export default UserEditScreen;
