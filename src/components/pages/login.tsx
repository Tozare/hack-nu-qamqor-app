import React, {useState} from 'react';
import {Button, Input, IconButton, TextField} from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons";

import { useHistory } from "react-router-dom";

import './userRegistration.less';
import {authenticationService} from "services/auth.service";

export const Login = () => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const changeEmail = (e:any) => {
        setEmail(e.target.value);
    }

    const changePassword = (e:any) => {
        setPassword(e.target.value);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = (e:any) => {
        e.preventDefault();

        authenticationService.login(email, password)
            .then((res) => {
                alert("You are logged in");
                history.push("/dashboard")
            }, () => {alert("error occurred")});
    }

    return (
        <div className="registration-container">
            <div className="blank"></div>
            <div className="user-registration-container">
                <div className="user-registration-header">
                    <div className="user-registration-header_title">
                        Login to Qadam Food
                    </div>
                    <div className="user-registration-header_link">
                        <div>
                            No account?
                        </div>
                        <div style={{color: "blue", marginLeft: "5px"}} onClick={() => history.push("/register/user")}>
                            Register as citizen
                        </div>
                        <div style={{marginLeft: "5px"}}>
                            or as
                        </div>
                        <div style={{color: "blue", marginLeft: "5px"}} onClick={() => history.push("register/company")}>
                            company owner
                        </div>
                    </div>
                </div>
                <div className="divider"/>
                <div className="form-control-container">
                    <div className="form-control-container_input">
                        <TextField
                            fullWidth={true}
                            id='email'
                            label='email'
                            placeholder='enter your email'
                            variant='outlined'
                            value={email}
                            onChange={changeEmail}
                        />
                    </div>
                    <div className="form-control-container_input">
                        <TextField
                            fullWidth={true}
                            id='password'
                            label='password'
                            placeholder='enter your password'
                            variant='outlined'
                            value={password}
                            // type={"password"}
                            type = {showPassword ? 'text' : 'password'}
                            onChange={changePassword}
                            InputProps={{
                                endAdornment:
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                            }}
                        />
                    </div>
                    <div className="form-control-container_btn">
                        <Button style={{maxWidth: '100%', maxHeight: '100%', minWidth: '100%', minHeight: '100%', backgroundColor: "#1565D8", color: "white"}}  fullWidth={true} variant="contained" onClick={onSubmit}>Login</Button>
                    </div>
                </div>
            </div>
        </div>
    )

};