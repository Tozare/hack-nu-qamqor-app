import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {ChakraProvider, ThemeProvider, theme} from "@chakra-ui/react";
import {UserRegistration} from "components/pages/userRegistration";

// const theme = {
//
// }

export const Myapp = () => {
    return (
        <Router>
            {/*<div style={{width: '100%', height: '100%'}}>*/}
            {/*<NavBar/>*/}
            {/*<Switch>*/}
                <Route path="/register/user">
                    <UserRegistration/>
                </Route>
                <Route path="/register/company">

                </Route>
                <Route path="/login/user"></Route>
                <Route path="/login/company"></Route>
                <Route path='/'>
                    <h1>hjjhhhghgkjhgjkghjghjkhgjkjghk</h1>
                </Route>
            {/*</Switch>*/}
            {/*</div>*/}
        </Router>
    )
}
