import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    return (
        <div>
            <Route
                {...rest}
                render={props => {
                    return currentUser ? <Component {...props} /> : <Redirect to="/signin" />
                }}            
            ></Route> 
        </div>
    )
}


export default PrivateRoute
