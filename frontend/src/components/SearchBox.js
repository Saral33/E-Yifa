import React, { useState } from 'react'
import {Form,Button} from 'react-bootstrap'

const SearchBox = ({history}) => {
    
    const [keyWord, setKeyWord] = useState('')
    
    const sumbitHandler =(e)=>{
        e.preventDefault()
        if(keyWord.trim()){
            history.push(`/search/${keyWord}`)
        }
        else{
            history.push('/')
        }
    }
    return (
        <Form onSubmit={sumbitHandler} inline>
            <Form.Control className='mr-sm-2 ml-sm-5' type='text' name='q' onChange={e=> setKeyWord(e.target.value)} placeholder='Search Products...'>
            </Form.Control>
            <Button type='submit' className='p-2' variant='outline-success'>Search</Button>
        </Form>
    )
}

export default SearchBox
