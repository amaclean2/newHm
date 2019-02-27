import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Images/logo/new_login_logo.svg';

class Login extends Component {

  	render() {
    	return (<div className="Login" id="Components/Outside/Login">
    		<div className="centerer">
	    		<img src={Logo} alt="Aerohive" className="main-logo" />
	    		<div className="action-box">
	    			<div className="login-box">
	    				<h1>Login to HiveManager</h1>
	    				<div className="flex-spacer"></div>
	    				<input type="text" placeholder="email" />
			      		<input type="password" placeholder="password" />
			      		<button onClick={this.props.login}>Login</button>
			      		<span className="forgot-password">Forgot your password?<span className="fake-a">Reset it here</span></span>
	    			</div>
	    			<div className="register-box">
	    				<h1>Join Aerohive's Cloud Networking Revolution!</h1>
	    				<div className="desc-block">
	    					<h2>Unified. Intelligent. Simple.</h2>
	    					<span className="desc-text">Take our products for a test drive and experience a new generation of cloud networking</span>
	    				</div>
	    				<button className="register-button">Register</button>
	    			</div>
	    		</div>
	    		<span className="copywrite">© 2019 Aerohive Networks - All Rights Reserved.</span>
	    	</div>
      	</div>);
  	}
}

Login.propTypes = {
	login: PropTypes.func
}

export default Login;
