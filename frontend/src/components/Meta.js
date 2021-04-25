import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keyword}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keyword' content={keyword}/>
        </Helmet>
    )
}

Meta.defaultProps ={
    title:'E-Yifa Shop',
    keyword: 'Electronics, cheap electronic, best electronic',
    description: 'Find your products easily in cheap price. We serve quality'
}

export default Meta
