import React from 'react'
import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    return (
       <Card className="my-3 p-3 rounded">
           <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image}/>
        </Link>
        <Card.Body>
            <Card.Title as="div">
            <Link to={`/product/${product._id}`}>
              <strong> {product.name}</strong> 
                </Link>
            </Card.Title>
            <Card.Text as="div">
                <div className="my-3">
                   <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </div>
            </Card.Text>
            <Card.Text as="h3">
                ${product.price}
            </Card.Text>
        </Card.Body>
        </Card>
    )
}

export default Product
