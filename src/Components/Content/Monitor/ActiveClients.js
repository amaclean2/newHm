import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchClientsIfNeeded, fetchTimelineDataIfNeeded } from '../../../Redux/actions/clients';
import { fetchFiltersIfNeeded } from '../../../Redux/actions/filters';
import AhTable from '../../ReusableTemplates/AhTable';
import AhPill from '../../ReusableTemplates/AhPill';
import Timeline from '../../ReusableTemplates/HighchartsTimeline';
import { formatRange } from '../../../DefaultData/Dates';
import LeftNav from '../../ReusableTemplates/LeftNav';
import Filters from '../../ReusableTemplates/Filters';

class ActiveClients extends Component {
	constructor() {
		super()
		this.state = {
			startTime: new Date().getTime(),
			endTime: new Date().getTime(),
			history: 0,
			longRange: 0,
			shortRange: 0,
			showNav: false,
			filterList: []
		}
	}

	componentDidMount() {
		let startTime = new Date(this.state.startTime);
		startTime.setHours(startTime.getHours() - 1);
		startTime = startTime.getTime();
		this.setState({ startTime });

		this.refreshClients();

	}

	toggleNav = () => {
		if (!this.state.showNav) {
			this.refreshFilters();
		}

		this.setState({ showNav: !this.state.showNav });
	}

	updateTimes = (startTime, endTime) => {
		this.setState({ startTime, endTime });
		this.refreshClients();
	}

	togglePill = history => {
		this.setState({ history });
	}

	toggleLongRange = longRange => {
		let lr = longRange,
			endTime = new Date(),
			startTime = new Date();
			

		switch (lr) {
			case 0 :
				startTime.setHours(startTime.getHours() - 1)
				break;
			case 1 :
				startTime.setDate(startTime.getDate() - 1)
				break;
			case 2 :
				startTime.setDate(startTime.getDate() - 7)
				break;
			default :
				break;
		}

		startTime = startTime.getTime();
		endTime = endTime.getTime();

		this.setState({ longRange, shortRange: 0 })
		this.updateTimes(startTime, endTime);
	}

	toggleShortRange = shortRange => {
		let lr = this.state.longRange,
			sr = shortRange,
			endTime = new Date(),
			startTime = new Date(),
			offset = 0;
			

		switch (lr) {
			case 0 :
				sr === 0
					? offset = 1
				: sr === 1 
					? offset = 4
				: sr === 2
					? offset = 8
				: offset = 24

				startTime.setHours(startTime.getHours() - offset)
				break;
			case 1 :
				sr === 0
					? offset = 1
				: sr === 1 
					? offset = 2
				: offset = 7

				startTime.setDate(startTime.getDate() - offset)
				break;
			case 2 :
				sr === 0
					? offset = 7
				: sr === 1 
					? offset = 14
				: offset = 30

				startTime.setDate(startTime.getDate() - offset)
				break;
			default :
				break;
		}

		startTime = startTime.getTime();
		endTime = endTime.getTime();

		this.setState({ shortRange })
		this.updateTimes(startTime, endTime);
	}

	refreshClients = () => {
		const { dispatch } = this.props;
		dispatch(fetchClientsIfNeeded(this.state.startTime, this.state.endTime));
		dispatch(fetchTimelineDataIfNeeded(this.state.startTime, this.state.endTime));
	}

	refreshFilters = () => {
		const { dispatch } = this.props;
		dispatch(fetchFiltersIfNeeded('clientList'));
	}

	renderTable() {
		if ( this.props.clients.items ) {
			return <AhTable
					data={this.props.clients.items}
					type={'clients'}
					refresh={true}
					refreshFunction={this.refreshClients}
					searchable={true}
					selectable={true}
					columnPicker={true}
					downloadable={true} />
		} else {
			return '';
		}
	}

	renderNav() {
		if (this.state.showNav) {
			return <LeftNav
				header="Filters"
				toggleNav={this.toggleNav}>
				<Filters 
					filterList={this.state.filterList}
					filters={this.props.filters}
					changeFilterList={this.changeFilterList} />
			</LeftNav>
		} else {
			return '';
		}
	}

	changeFilterList = id => {
		let filterList = this.state.filterList;
		if(filterList.indexOf(id) > -1) {
			filterList.splice(filterList.indexOf(id), 1);
		} else filterList.push(id);
		this.setState({ filterList });
	}

	renderGraph() {
		if(this.state.history === 1 && this.props.timeline.items) {
			return <Timeline
				data={this.props.timeline.items}
				colors={['#457dba']}
				height={200}
				updateTimes={this.updateTimes}
				toggleLongRange={this.toggleLongRange}
				toggleShortRange={this.toggleShortRange}
				longRange={this.state.longRange}
				shortRange={this.state.shortRange}
				units={''}
				/>;
		} else {
			return '';
		}
	}

  	render() {
  		let table = this.renderTable(),
  			range = formatRange(this.state.startTime, this.state.endTime),
  			graph = this.renderGraph(),
  			nav = this.renderNav();

    	return (<div className="Monitor" id="Components/Content/Monitor/ActiveClients">
    		{nav}
    		<div className="header-block">
    			<h2>Clients</h2>
    		</div>
    		<div className="header-block">
	    		<button onClick={this.toggleNav} className="button filter-button">Filter</button>
	    		<AhPill
	    			options={['realtime', 'historical']}
	    			type={'timeToggle'}
	    			checked={this.state.history}
	    			togglePill={this.togglePill} />
	    		<div className="flex-spacer"></div>
	    	</div>
    		{graph}
    		<div className="date-range">
    			{range}
    		</div>
    		{table}
      	</div>);
  	}
}

ActiveClients.propTypes = {
	isFetching: PropTypes.bool,
	clients: PropTypes.object,
	timeline: PropTypes.object,
	lastUpdated: PropTypes.number
}

const mapStateToProps = state => ({
	clients: state.clients,
	timeline: state.clientsTimeline,
	filters: state.filters
});

export default connect(mapStateToProps)(ActiveClients);