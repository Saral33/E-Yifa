import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails,updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstamts';
import axios from 'axios';


const ProductEditScreen = ({history,match}) => {
 
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [image,setImage] = useState('')
  const [price,setPrice] = useState('')
  const [brand,setBrand] = useState('')
  const [category,setCategory] = useState('')
  const [countInStock,setCountInStock] = useState('')
  const [uploading, setUploading] = useState(false)
  
  

  const dispatch = useDispatch()
  
  const productDetails = useSelector(state=> state.productDetails)
  const {loading,product, error} = productDetails

  const productUpdate = useSelector(state=> state.productUpdate)
  const {loading:loadingUpdate,success, error: errorUpdate} = productUpdate

  
  const uploadFileHandler = async(e)=>{
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image',file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        } 
      }

      const {data} = await axios.post('/api/uploads', formData,config)
      setImage(data)
      setUploading(false)
    } catch (e) {
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updateProduct({
        _id: match.params.id,
        name, price,image, description,brand,category,countInStock
      }))
   
  };

  useEffect(()=>{

    if(success){
      dispatch({type: PRODUCT_UPDATE_RESET})
      history.push('/admin/productlist')
    }
    else{
      if(!product.name || product._id!==match.params.id){
        dispatch(listProductDetails(match.params.id))
    } else{
        setName(product.name)
        setPrice(product.price)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setImage(product.image)
        setDescription(product.description)
    }
    }
 },[match,product,dispatch,success,history])
  return (

    <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>Go back</Link>
    <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message>{errorUpdate}</Message>}
      {loading? <Loader/>: error? <Message variant='danger'>{error}</Message>:(
      <>
       <Form onSubmit={submitHandler}>
       <Form.Group controlId='name'>
         <Form.Label>Name </Form.Label>
         <Form.Control
           type='text'
           value={name}
           placeholder='Enter your name'
           onChange={(e) => setName(e.target.value)}
         ></Form.Control>
       </Form.Group>
       <Form.Group controlId='price'>
         <Form.Label>Price </Form.Label>
         <Form.Control
           type='number'
           value={price}
           placeholder='Enter your price'
           onChange={(e) => setPrice(e.target.value)}
         ></Form.Control>
       </Form.Group>
      
       <Form.Group controlId='image'>
         <Form.Label>Image </Form.Label>
         <Form.Control
           type='text'
           value={image}
           placeholder='Upload Image'
           onChange={(e) => setImage(e.target.value)}
         ></Form.Control>
         <Form.File  id='image-file' label='Choose file' custom onChange={uploadFileHandler}>

         </Form.File>
         {uploading && <Loader/>}
       </Form.Group>
       <Form.Group controlId='brand'>
         <Form.Label>Brand </Form.Label>
         <Form.Control
           type='text'
           value={brand}
           placeholder='Enter brand'
           onChange={(e) => setBrand(e.target.value)}
         ></Form.Control>
       </Form.Group>
       <Form.Group controlId='category'>
         <Form.Label>Category </Form.Label>
         <Form.Control
           type='text'
           value={category}
           placeholder='Enter category'
           onChange={(e) => setCategory(e.target.value)}
         ></Form.Control>
       </Form.Group>
       <Form.Group controlId='countInStock'>
         <Form.Label>Count In Stock </Form.Label>
         <Form.Control
           type='number'
           value={countInStock}
           placeholder='Enter countInStock'
           onChange={(e) => setCountInStock(e.target.value)}
         ></Form.Control>
       </Form.Group>
       <Form.Group controlId='description'>
         <Form.Label>Description </Form.Label>
         <Form.Control
           type='text'
           value={description}
           placeholder='Enter description'
           onChange={(e) => setDescription(e.target.value)}
         ></Form.Control>
       </Form.Group>
       
       <Button type='submit' variant='primary'>Update</Button>
     </Form>
     
     </>)
      }
     
    </FormContainer>
    </>
    
  );
};

export default ProductEditScreen;
