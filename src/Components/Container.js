import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Router from './Content/Router';
import Login from './Outside/Login';

class Container extends Component {
	constructor() {
		super()
		this.state = {
			user: {
				name: 'Andrew Maclean',
				org: 'Aerohive'
			}
		}
	}

	handleLogIn = () => {
		this.setState({ user: { name: 'Andrew Maclean', org: 'Aerohive'} });
	}

	handleLogout = () => {
		this.setState({ user: false });
	}

	showApp() {
		if(this.state.user) {
			return (<div>
				<Router handleLogout={this.handleLogout} user={this.state.user} />
			</div>);
		} else {
			return (<div>
				<Login login={this.handleLogIn} />
			</div>);
		}
	}

  	render() {
  		let app = this.showApp();
    	return (<div className="Container" id="Components/Container">
      		{app}
      	</div>);
  	}
}

Container.propTypes = {

};

export default Container;
