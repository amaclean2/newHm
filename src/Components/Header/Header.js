import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Images/logo/new_logo.svg';
import { NavLink } from 'react-router-dom';

class Header extends Component {
	constructor() {
		super()
		this.state = {
			searchText: '',
			searchExpanded: false,
			userMenu: false
		}
	}

	renderTabs() {
		let tabs = this.props.headers.map( (tab, mainKey) => {

			let subTabs = tab.menu.map( (subTab, key) => {
				return <li key={key} >
					<NavLink to={'/' + subTab.path}>{subTab.title}</NavLink>
				</li>;
			});

			return <li key={mainKey + 'i'}>
				<div className="title">{tab.title}</div>
				<ul className="sub-menu">
					{subTabs}
				</ul>
			</li>;
		});
		return <ul className="tool-bar">{tabs}</ul>;
	}

	handleSearch = e => {
		this.setState({ searchText: e.target.value });
	}

	expandSearch = () => {
		this.setState({ searchExpanded: !this.state.searchExpanded });
	}

	toggleUserPreferences = () => {
		this.setState({ userMenu: !this.state.userMenu });
	}

	render() {
		let tabs = this.renderTabs();

	    return (
		    <div className="Header" id="Components/Header/Header">
		      	<img src={Logo} className="ah-logo" alt="Aerohive" />
		      	{tabs}
		      	<div className="flex-spacer"></div>
		      	<div className="header-actions" >
		      		<div className="search">
		      			<div className={"search-box " + (this.state.searchExpanded ? '' : 'gone')}>
		      				<input type="text" placeholder="Search" onChange={this.handleSearch} />
		      			</div>
		      			<div className="search-icon icon" onClick={this.expandSearch}></div>
		      		</div>
		      		<div className="add-icon icon"></div>
		      		<div className="bell-icon icon"></div>
		      		<div className="clock-icon icon"></div>
		      		<div className="user-preferences">
		      			<div className="user-icon" onClick={this.toggleUserPreferences}>
		      				<div className="user-title">
			      				<span className="user-name">{this.props.user.name}</span>
			      				<span className="user-company">{this.props.user.org}</span>
			      			</div>
		      			</div>
		      			<ul className={"preferences-menu " + (this.state.userMenu ? '' : 'gone')}>
		      				<li><NavLink to={'/' }>Global Settings</NavLink></li>
		      				<li><NavLink to={'/' }>Switch HiveManager</NavLink></li>
		      				<li><NavLink to={'/' }>About HiveManager</NavLink></li>
		      				<li><NavLink to={'/' }>Communications</NavLink></li>
		      				<li><button onClick={this.props.handleLogout} >Log Out</button></li>
		      			</ul>
		      		</div>
		      	</div>
		    </div>
	    );
	}
}

Header.propTypes = {
	user: PropTypes.object,
	handleLogout: PropTypes.func,
	headers: PropTypes.array
}

export default Header;
