import React from 'react'
import profilePng from '../../images/Profile.png'
import ReactStars from 'react-rating-stars-component';

function ReviewCard({ review }) {
    const options = {
        edit: false,
        color: "rgba(20,20, 20, 0.1)",
        value: review.rating,
        count: 5,
        size: window.innerWidth < 600 ? 20 : 22,
        activeColor: "tomato",
        isHalf: true,
    }
    return (
        <div className='reviewCard'>
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <ReactStars {...options} />
            <span>{review.comment}</span>
        </div>
    )
}

export default ReviewCard
