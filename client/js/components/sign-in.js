import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import store from '../store';

export class Login extends React.Component{
  constructor (props, context) {
    super(props, context);
  }
 
  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('THIS IS THE USER ID TOKEN: ', id_token);
    //anything else you want to do(save to localStorage)... 
  }
 
  render () {


    return (
      <div>
        <GoogleLogin socialId="172739207430-a4207nj9v3dfdmbmdf652at6m2epdi7i"
                        class="google-login"
                        scope="profile"
                        responseHandler={this.responseGoogle}
                        buttonText="Login With Google"/>
        <a href="#" onClick={this.signOut}>Sign out></a>  
      </div>
    );
  }
}
 
const mapStateToProps = (state, props) => ({
});


export default connect(mapStateToProps)(Login);
