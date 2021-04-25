import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Product from '../components/Product'
import {listProducts} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const HomeScreen = ({match}) => {
    const dispatch = useDispatch();
    const pageNumber = match.params.pageNumber || 1
    const keyword = match.params.keyword
    const productList = useSelector(state=> state.productList)
    const {loading,error, products,page,pages} = productList
    
    useEffect(()=>{
        dispatch(listProducts(match.params.keyword,pageNumber))
    },[dispatch,match,pageNumber])
    return (
        <>
        <Meta/>
        {!match.params.keyword && <ProductCarousel/>}
        <h1>Latest products</h1>
        {loading? <Loader/>: error? <Message variant="danger">{error}</Message> : 
             <Row>
              {products.map(product=>(
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                   <Product product={product}/>
                </Col>
            )
            )}  
            </Row>   }
            <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
         
        </>
    )
}

export default HomeScreen
