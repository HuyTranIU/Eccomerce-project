import Rating from '@material-ui/lab/Rating'
import React from 'react'
import profilePng from '../../images/Profile.png'

function ReviewCard({ review }) {

    const options = {
        size: "small",
        value: review.rating,
        readOnly: true,
        precision: 1
    }
    return (
        <div className='reviewCard'>
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className='reviewCardComment'>{review.comment}</span>
        </div>
    )
}

export default ReviewCard
