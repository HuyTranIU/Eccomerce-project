import React from 'react'
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component }) {

    const { loading, isAuthenticated } = useSelector(state => state.user)
    console.log("isAuthenticated:", loading)
    return (
        <>
            {
                !loading && (
                    isAuthenticated ? <Component /> : isAuthenticated === false ? <Navigate to="/login" /> : <Component />
                )
            }
        </>
    )
}

export default ProtectedRoute