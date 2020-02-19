import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { login, logout, createUser } from "../state/actions";
import { bindActionCreators } from "redux";
import Login from './Login';
import history from "../../common/components/history";
import MySnackBar from "../../common/components/Snackbar";
import Styles from '../../../assets/css/Header.module.css';

const styles = {
  root: {
    flexGrow: 1,
    flexShrink: 1,
    width: '100%' 
  },
  grow: {
    flexGrow: 1
  },
  toolBar: {
    background: "#32567e"
  }
};

export class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      showErrorSnack: false,
      loginDailog: false
    }
  }

  handleDialogStatus = (status) => {
    this.setState({loginDailog: status});
  }

  render() {
    const { showErrorSnack } = this.state
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {
          showErrorSnack ? 
          <MySnackBar message='Network Error! Please try again' color='red' />
          :
          null
        }
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Button testData='goToLandingPage' onClick={this.goTolanding}>
                <span style={{ fontSize: "1.2em", color: "#ffffff" }}>
                  YOYOGift
                </span>
              </Button>
            </Typography>
            {/* {this.props.isLoggedIn ? <Button color="inherit" onClick={this.addUpdateForm}>ADD UPDATE FORM</Button> : null} */}
            {(this.props.isLoggedIn && window.sessionStorage.getItem('usertype'))? (
              <Button className={Styles.headerButton} color="inherit" testClick='giftReceivedButton' testData='componentsOnLoggedInForAdmin' onClick={this.allUsers}>
                ALL USERS
              </Button>
            ) : null}
            {this.props.isLoggedIn ? (
              <Button className={Styles.headerButton} color="inherit" testData1='giftsReceived' testData='componentsOnLoggedIn' onClick={this.giftsReceived}>
                GIFTS RECEIVED
              </Button>
            ) : null}
            {this.props.isLoggedIn ? (
              <Button className={Styles.headerButton} color="inherit" testData1='giftsSent' testData='componentsOnLoggedIn' onClick={this.giftsSend}>
                GIFTS SENT
              </Button>
            ) : null}
            {this.props.isLoggedIn ? (
              <Button className={Styles.headerButton} color="inherit" testData1='myprofile' testData='componentsOnLoggedIn' onClick={this.myProfile}>
                MY PROFILE
              </Button>
            ) : null}
            <Button className={Styles.headerButton}
              color="inherit"
              testData='loginButton'
              onClick={() => {
                if(this.props.isLoggedIn === false) {
                  this.handleDialogStatus(true)
                } else {
                  this.logOut();
                }
              }}
            >
              {this.props.isLoggedIn ? "LOGOUT" : "LOGIN"}
            </Button>
            {/* <GoogleLogin
              clientId="430181379102-p693ifhk3pnuvhhia1f9e701kp3sphoc.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            /> */}
          </Toolbar>
        </AppBar>
        <Login testData='loginDialog' open={this.state.loginDailog} handleDialogStatus = {(status) => this.handleDialogStatus(status)}/>
      </div>
    );
  }

  allUsers = () => {
    history.push('/AllUsers');
  }

  goTolanding = () => {
    history.push("/");
  };
  myProfile = () => {
    history.push("/Profile");
  };

  giftsSend = () => {
    history.push("/GiftsSend");
  };

  giftsReceived = () => {
    history.push("/GiftsReceived");
  };

  logOut = () => {
    this.props.logout();
    history.push("/");
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("usertype");
  };

}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.loginStatus,
    userDetails: state.login.detailsObject
  };
};

export const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login, logout, createUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
