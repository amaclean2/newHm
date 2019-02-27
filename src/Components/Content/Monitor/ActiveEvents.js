import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchEventsIfNeeded } from '../../../Redux/actions/events';
import AhTable from '../../ReusableTemplates/AhTable';
import { formatRange } from '../../../DefaultData/Dates';

class ActiveEvents extends Component {
	constructor() {
		super()
		this.state = {
			startTime: new Date().getTime(),
			endTime: new Date().getTime()
		}
	}

	componentDidMount() {
		let startTime = new Date(this.state.startTime);
		startTime.setDate(startTime.getDate() - 1);
		startTime = startTime.getTime();
		this.setState({ startTime });

		this.refreshEvents();

	}

	refreshEvents = () => {
		const { dispatch } = this.props;
		dispatch(fetchEventsIfNeeded(this.state.startTime, this.state.endTime));
	}

	renderTable() {
		if ( this.props.events.items ) {
			return <AhTable
					data={this.props.events.items}
					type={'events'}
					refresh={true}
					searchable={true}
					refreshFunction={this.refreshEvents}
					selectable={true}
					downloadable={true} />
		} else {
			return '';
		}
	}

	renderRange() {
		return formatRange(this.state.startTime, this.state.endTime);
	}

  	render() {
  		let table = this.renderTable(),
  			range = this.renderRange();

    	return (<div className="Monitor" id="Components/Content/Monitor/ActiveEvents">
    		<div className="header-block">
    			<h2>Events</h2>
    		</div>
    		<div className="date-range">
    			{range}
    		</div>
    		{table}
      	</div>);
  	}
}

ActiveEvents.propTypes = {
	isFetching: PropTypes.bool,
	items: PropTypes.array,
	lastUpdated: PropTypes.number
}

const mapStateToProps = state => ({
	events: state.events
})

export default connect(mapStateToProps)(ActiveEvents);