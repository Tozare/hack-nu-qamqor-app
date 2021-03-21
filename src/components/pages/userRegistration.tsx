import React, {useState} from 'react';
import {Button, Input, IconButton, TextField} from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import './userRegistration.less';

import { useHistory } from "react-router-dom";
import {authenticationService} from "services/auth.service";
import axios from "axios";

export const UserRegistration = () => {


    const history = useHistory()
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // useEffect(() => {
    //     if (authenticationService.currentUserValue) {
    //         history.push('/');
    //     }
    // });

    const changeFullName = (e:any) => {
        setFullName(e.target.value);
    }

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
        const user = {
            email: email,
            full_name: fullName,
            is_company: false,
            password,
        };
        axios.post("http://127.0.0.1:8000/register", user).then((res) => {
            console.log(res);
            alert("Registered");
            history.push('/login');
        },  (error) => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            alert(resMessage);
        });
    };

    return (
        <div className="registration-container">
            <div className="blank"></div>
            <div className="user-registration-container">
                <div className="user-registration-header">
                    <div className="user-registration-header_title">
                        Sign up to Qadam Food
                    </div>
                    <div className="user-registration-header_link">
                        <div>
                            Already a user?
                        </div>
                        <div style={{color: "blue", marginLeft: "5px"}} onClick={() => history.push("/login")}>
                            Log in
                        </div>
                    </div>
                </div>
                <div className="divider"/>
                <div className="form-control-container">
                    <div className="form-control-container_input">
                        <TextField
                            fullWidth={true}
                            id='fullname'
                            label='Full name'
                            placeholder='Full name'
                            variant='outlined'
                            value={fullName}
                            onChange={changeFullName}
                        />
                    </div>
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
                        <Button style={{maxWidth: '100%', maxHeight: '100%', minWidth: '100%', minHeight: '100%', backgroundColor: "#1565D8", color: "white"}}  fullWidth={true} variant="contained" onClick={onSubmit}>Register Account</Button>
                    </div>
                </div>
                <div className="divider"/>
                <div className="user-registration-container_btn">
                    <Button style={{maxWidth: '100%', maxHeight: '100%', minWidth: '100%', minHeight: '100%', borderColor: "1565D8", color: "#1565D8"}} fullWidth={true} variant="outlined" onClick={() => history.push("/register/company")}>Register as business owner</Button>
                </div>
            </div>
        </div>
    )

};