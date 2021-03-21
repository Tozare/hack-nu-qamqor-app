import React from 'react'
import ReactDOM from 'react-dom'
import './app.less'
import * as serviceWorker from './service-worker'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import { NavBar } from 'components/nav/nav'
import {ChakraProvider, ThemeProvider} from "@chakra-ui/react";
import {UserRegistration} from "components/pages/userRegistration";
import {Myapp} from "components/myapp";
import {Welcome} from "components/pages/welcome";
import {CompanyRegistration} from "components/pages/companyRegistration";
import {CompanyDashboard} from "components/pages/dashboardCompany/companyDashboard";
import {PrivateRoute} from "components/private-route/privateRoute";
import {PostFoodPack} from "components/pages/dashboardCompany/postFoodPack";
import {Login} from "components/pages/login";


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <CompanyDashboard/>
                {/*<Switch>*/}
                {/*    <Route path="/login">*/}
                {/*        <Login/>*/}
                {/*    </Route>*/}
                {/*    <Route path="/register/user">*/}
                {/*        <UserRegistration/>*/}
                {/*    </Route>*/}
                {/*    <Route path="/register/company">*/}
                {/*        <CompanyRegistration/>*/}
                {/*    </Route>*/}
                {/*    <PrivateRoute path="/dashboard" component={CompanyDashboard}/>*/}
                {/*    /!*<Route exact path='/dashboard' component={CompanyDashboard}/>*!/*/}
                {/*    <Route path="/dashboard/">*/}
                {/*        <CompanyDashboard/>*/}
                {/*    </Route>*/}
                {/*    <Route path='/'>*/}
                {/*        <Redirect to={"login"}/>*/}
                {/*    </Route>*/}
                {/*</Switch>*/}
            {/*</div>*/}
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
