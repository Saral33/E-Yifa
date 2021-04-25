import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
  
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
  
    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
  
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
  })

const getProductByID = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
    res.json(product)
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({message:'Product Removed'})
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct = asyncHandler(async(req,res)=>{

    const product = new Product({
        name:'Sample',
        price: 0,
        user: req.user._id,
        image: '/images/sample.png',
        brand:'Sample',
        category: 'Sample',
        countInStock: 0,
        numReviews: 0,
        description:'Sample test'
    })
    const createdProduct = await product.save()
    res.status(201)
    res.json(createdProduct)
})


const updateProduct = asyncHandler(async(req,res)=>{

    const { name,
    price,
    image,
    brand,
    category,
    countInStock,
    description
} = req.body

    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name
        product.price = price
        product.image = image
        product.brand = brand
        product.description = description
        product.countInStock = countInStock
        product.category = category

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }
     else{
        res.status(404)
        throw new Error('Product not found')
    }
})

const giveReview = asyncHandler(async(req,res)=>{

    const {comment, rating} = req.body

    const product = await Product.findById(req.params.id)
    if(product){
       
        const reviewdUser = product.reviews.find(r=> r.user.toString() === req.user._id.toString())
        if(reviewdUser){
            res.status(400)
            throw new Error('Already Reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating), comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc,item)=> item.rating + acc, 0)/ product.reviews.length

        await product.save()
        res.status(201)
        res.json({message: 'Review Added'})
    }
     else{
        res.status(404)
        throw new Error('Product not found')
    }
})


const getTopProducts = asyncHandler(async(req,res)=>{

    const products = await Product.find({}).sort({rating: -1}).limit(3)
    res.json(products)

})

export {getProductByID,getProducts,deleteProduct, createProduct, updateProduct, giveReview, getTopProducts}