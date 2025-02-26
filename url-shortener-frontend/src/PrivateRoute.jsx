import React from 'react'
import { useStoreContext } from './contextApi/ContextApi'
import { Navigate } from 'react-router-dom';

// this childern is the children component of the privateroute(children -> nested components)
const PrivateRoute = ({ children, publicPage }) => {

    const { token } = useStoreContext();

    return (
        <>
            {publicPage ? 
                (token ? <Navigate to="/dashboard" /> : children)
                :
                (!token ? <Navigate to="/login" /> : children)
            }
        </>
    )
}

export default PrivateRoute