import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchDevicesIfNeeded } from '../../../Redux/actions/devices';
import AhTable from '../../ReusableTemplates/AhTable';
import { fetchFiltersIfNeeded } from '../../../Redux/actions/filters';
import LeftNav from '../../ReusableTemplates/LeftNav';
import Filters from '../../ReusableTemplates/Filters';

class Devices extends Component {
	constructor() {
		super()
		this.state = {
			startTime: new Date().getTime(),
			endTime: new Date().getTime(),
			showNav: false,
			filterList: []
		}
	}

	componentDidMount() {
		let startTime = new Date(this.state.startTime);
		startTime.setDate(startTime.getDate() - 1);
		startTime = startTime.getTime();
		this.setState({ startTime });

		this.refreshDevices();

	}

	refreshDevices = () => {
		const { dispatch } = this.props;
		dispatch(fetchDevicesIfNeeded(this.state.startTime, this.state.endTime));
	}

	refreshFilters = () => {
		const { dispatch } = this.props;
		dispatch(fetchFiltersIfNeeded('clientList'));
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

	toggleNav = () => {
		if (!this.state.showNav) {
			this.refreshFilters();
		}

		this.setState({ showNav: !this.state.showNav });
	}

	renderTable() {
		if ( this.props.devices.items ) {
			return <AhTable
					data={this.props.devices.items}
					type={'devices'}
					refresh={true}
					refreshFunction={this.refreshDevices}
					selectable={true}
					searchable={true}
					columnPicker={true}
					downloadable={true} />
		} else {
			return '';
		}
	}

  	render() {
  		let table = this.renderTable(),
  			nav = this.renderNav();
    	return (<div className="Monitor" id="Components/Content/Monitor/Devices">
    		{nav}
    		<div className="header-block">
    			<h2>Devices</h2>
    		</div>
    		<button onClick={this.toggleNav} className="button filter-button">Filter</button>
    		{table}
      	</div>);
  	}
}

Devices.propTypes = {
	isFetching: PropTypes.bool,
	items: PropTypes.array,
	lastUpdated: PropTypes.number
}

const mapStateToProps = state => ({
	devices: state.devices,
	filters: state.filters
})

export default connect(mapStateToProps)(Devices);