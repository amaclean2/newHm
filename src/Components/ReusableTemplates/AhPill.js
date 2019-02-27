import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AhPill extends Component {

	renderPill() {
		let pillContents = this.props.options.map( (item, i) => <div key={'pill' + i} className="pill-option">
			<input
				onChange={() => this.props.togglePill(i)}
				id={item}
				name={this.props.type}
				type="radio"
				checked={i === this.props.checked} />
			<label htmlFor={item}>{item}</label>
		</div>);

		return <div className={"pill-container"} >{pillContents}</div>
	}

  	render() {
  		let pill = this.renderPill();
    	return (<div className={"pill " + (this.props.classes || '')} id="Components/ReusableTemplates/AhPill">{pill}</div>);
  	}
}

AhPill.propTypes = {
	options: PropTypes.array.isRequired,
	type: PropTypes.string.isRequired,
	checked: PropTypes.number.isRequired,
	togglePill: PropTypes.func.isRequired,
	classes: PropTypes.string
}

export default AhPill;