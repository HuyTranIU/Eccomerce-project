import React from 'react'
import { Navigate, Route } from "react-router-dom"
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component }) {

    const { loading, user, isAuthenticated } = useSelector(state => state.user)
    return (
        <>
            {
                !loading && (
                    isAuthenticated ? <Component /> : <Navigate to="/login" />
                )
            }
        </>
    )
}

export default ProtectedRoute