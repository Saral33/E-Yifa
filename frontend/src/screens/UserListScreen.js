import React, { useEffect } from 'react';
import {Table, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUsers, deleteUser} from '../actions/userActions'

const UserListScreen = ({history}) => {

    const dispatch = useDispatch()
    const userList = useSelector(state=> state.userLists)
    const {users,loading,error} = userList

    const {userInfo} = useSelector(state=> state.userLogin)
    const {success:successDelete} = useSelector(state=> state.userDelete)

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(getUsers())
        }
        else{
            history.push('/login')
        }
        
    },[dispatch,history,userInfo, successDelete])

    const deleteHandler = (id)=>{
        dispatch(deleteUser(id))
    }
    return (
        <>
          <h1>Users</h1>
          {loading? <Loader/>: error? <Message variant='danger'>{error}</Message> :
          (
              <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>ADMIN</th>
                          <th></th>
                      </tr>
                 </thead>
                 <tbody>
                     {users.map(user=>(
                         <tr key={user._id}>
                             <td>{user._id}</td>
                             <td>{user.name}</td>
                             <td>{user.email}</td>
                             <td>{user.isAdmin? 'Admin':'Not Admin'}</td>
                             <td>
                                 <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                 <Button variant='light' className='btn-sm'>
                                     <i className='fas fa-edit'></i>
                                 </Button>
                                 </LinkContainer>
                                 <Button variant='danger' className='btn-sm' onClick={()=> deleteHandler(user._id)}>
                                     <i className='fas fa-trash'></i>
                                 </Button>
                                
                             </td>
                         </tr>
                     ))}
                 </tbody>
              </Table>
          )
          }  
        </>
    )
}

export default UserListScreen
