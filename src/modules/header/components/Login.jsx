import React, {useState} from 'react';
import axiosWrapper from "../../../apis/axiosCreate";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login, createUser } from "../state/actions";
import Dialog from '@material-ui/core/Dialog';
import { GoogleLogin } from 'react-google-login';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {adminEmail} from '../../../config/constants';

// import {
//     withStyles
//   } from '@material-ui/core/styles';
import './Login.css';

export const Login = (props) => {
    // const CustomisedTextField = withStyles({
    //     root: {
    //         '& .MuiFormLabel-root':{
    //             color: 'white'
    //         }
    //     }
    // })(TextField);

    const [formUserName, setFormUserName] = useState('');
    const [formPassword, setFormPassword] = useState('');

    const handleChange = (ev) => {
        // console.log(ev.target)
        if(ev.target.id === 'userName') {
            // console.log(ev.target.value);
            setFormUserName(ev.target.value);
        } else {
            // console.log("password");
            setFormPassword(ev.target.value);
        }
    }

    const responseGoogle = async (response) => {
        console.log(response);
        const isAlreadyUser = await axiosWrapper.get(`/users?email=${response.profileObj.email}`);
        // console.log(isAlreadyUser);
        if(isAlreadyUser.data.length === 0) {
            const temp = {
                            "id": response.profileObj.googleId,
                            "email": response.profileObj.email,
                            "first_name": response.profileObj.givenName,
                            "last_name": response.profileObj.familyName,
                            "picture": response.profileObj.imageUrl,
                            "balance_points": 0,
                            "wishlist": [],
                            "cards_gifted": [],
                            "cards_received": [] 
                         }
            props.createUser(temp);
            props.login(temp);
            window.sessionStorage.setItem('user', JSON.stringify(temp));
        } else {
            props.login(isAlreadyUser.data[0]);
            window.sessionStorage.setItem('user', JSON.stringify(isAlreadyUser.data[0]));
        }
        props.handleDialogStatus(false);
    }
  
    const login = async() => {
        console.log(formUserName);
        if(formUserName === adminEmail[0]) {
          const temp = {
            "id": 1,
            "email": formUserName,
            "first_name": 'admin',
            "last_name": 'admin',
            "picture": '',
            "balance_points": 0,
            "wishlist": [],
            "cards_gifted": [],
            "cards_received": [] 
         }
         console.log(temp);
         props.login(temp);
          window.sessionStorage.setItem('user', JSON.stringify(temp));
          window.sessionStorage.setItem('usertype', 'admin');
        } else {
          const isaUser = await axiosWrapper.get(`/users?email=${formUserName}`);
          console.log(isaUser);
          if(isaUser.data.length !== 0 && isaUser.data[0].password === 'password') {
            console.log(isaUser.data[0]);
              props.login(isaUser.data[0]);
              window.sessionStorage.setItem('user', JSON.stringify(isaUser.data[0]));
          } else {
              console.log('not a registered user or credentials wrong');
          }
        }
        props.handleDialogStatus(false);
    }

    return (
        <>
        <Dialog open={props.open} aria-labelledby="form-dialog-title" fullWidth>
            {/* <DialogTitle id="form-dialog-title">Edit Services</DialogTitle> */}
            <div>
            <HighlightOffIcon testData='offIcon' onClick={() => props.handleDialogStatus(false)} style={{float: "right", cursor: 'pointer'}}/>
            </div>
            <div className="admin-wrapper">
                <h1>
                    Login
                </h1>
                {/* <CustomisedTextField
                  className="admin-form-elements"
                  id="userName"
                  hintText="Text"
                  label="User Name"
                  value={formUserName}
                  variant="outlined"
                  uniqueIdentifier="userName"
                  onChange={handleChange}
                />  */}
                <TextField
                  className="admin-form-elements"
                  id="userName"
                  hintText="Text"
                  label="User Name"
                  value={formUserName}
                  variant="outlined"
                  uniqueIdentifier="userName"
                  onChange={handleChange}
                /> 


                <TextField
                  className="admin-form-elements"
                  id="password"
                  hintText="password"
                  label="Password"
                  value={formPassword}
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />

                <Button testData='login-button' className="admin-form-elements" variant="contained" color="primary" onClick={login}>
                  Login
                </Button>
                <h4>Or</h4>
                <div>
                {/* <a style={{textDecoration: "none", color: "white"}} href="http://localhost:8080/api/login/google"> Login using Google</a> */}
                <GoogleLogin
                  clientId="430181379102-p693ifhk3pnuvhhia1f9e701kp3sphoc.apps.googleusercontent.com"
                  buttonText="Login Using Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                </div>
                <p style= {{color: "white"}}>Please use external network for oauth login if Mindtree network blocks it</p>
                </div>
        </Dialog>
        </>
    )
}

export const mapStateToProps = state => {
    return {};
  };
  
 export const mapDispatchToProps = dispatch => {
    return bindActionCreators({ login, createUser }, dispatch);
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(Login);