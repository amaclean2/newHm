import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LeftNav extends Component {
	constructor() {
		super()
		this.state = {
			hidden: true
		}
	}

	closeNav = () => {
		this.setState({ hidden: true });
		setTimeout(() => {
			this.props.toggleNav();
		}, 300);
	}

	componentWillMount() {
		setTimeout(() => {
			this.setState({ hidden: false });
		}, 0)
	}

  	render() {
    	return (<div id="Components/ReusableTemplates/LeftNav">
    		<div className={"nav-background " + (this.state.hidden ? 'hide' : '')} onClick={this.closeNav}>
    		</div>
    		<div className={"left-nav " + (this.state.hidden ? 'hide' : '')}>
    			<div className="nav-header">
    				{this.props.header}
    				<button className="close-button nav-close button" onClick={this.closeNav}></button>
    			</div>
    			<div className="nav-content">
    				{this.props.children}
    			</div>
    		</div>
      	</div>);
  	}
}

LeftNav.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
        PropTypes.node
    ]),
    header: PropTypes.string,
    toggleNav: PropTypes.func.isRequired
};

export default LeftNav;