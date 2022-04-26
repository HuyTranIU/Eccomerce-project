import React from 'react'
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, isAdmin }) {

    const { loading, isAuthenticated, user } = useSelector(state => state.user)

    if (isAdmin === true && user.role !== "admin") {
        return (
            <Navigate to="/login" />
        )
    }

    return (
        <>
            {
                loading === false && (
                    isAuthenticated ? <Component /> : <Navigate to="/login" />
                )
            }
        </>
    )
}

export default ProtectedRoute