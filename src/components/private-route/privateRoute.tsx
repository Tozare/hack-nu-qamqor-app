import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
// import {authenticationService} from "../../services/auth.service";


// @ts-ignore
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        // const currentUser = authenticationService.currentUserValue;
        if (!localStorage.getItem("currentUser")) {
            return <Redirect to='/login/user' />
        } else {
            return <Component {...props} />
        }
    }} />
)