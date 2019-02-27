import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import DashboardSummary from './Dashboard/DashboardSummary';
import Reports from './Dashboard/Reports';
import DashboardDiagnostics from './Dashboard/DashboardDiagnostics';
import DashboardInventory from './Dashboard/DashboardInventory';
import ComparativeAnalytics from './Dashboard/ComparativeAnalytics';
import Devices from './Monitor/Devices';
import ActiveClients from './Monitor/ActiveClients';
import ActiveUsers from './Monitor/ActiveUsers';
import ActiveEvents from './Monitor/ActiveEvents';
import ActiveAlarms from './Monitor/ActiveAlarms';
import Security from './Monitor/Security';
import TopApps from './Monitor/TopApps';
import ProximityPresence from './Monitor/ProximityPresence';
import NetworkPolicies from './Config/NetworkPolicies';
import Applications from './Config/Applications';
import CommonObjects from './Config/CommonObjects';
import Users from './Config/Users';
import ClientMonitor from './Tools/ClientMonitor';
import Diagnosis from './Tools/Diagnosis';
import Utilities from './Tools/Utilities';
import PacketCapture from './Tools/PacketCapture';
import PlanView from './360/PlanView';
import MonitorView from './360/MonitorView';
import A3 from './A3/A3';

import Header from '../Header/Header';

import HeaderMap from '../../DefaultData/HeaderMap';

const componentObj = {
	DashboardSummary: DashboardSummary,
	Reports: Reports,
	DashboardDiagnostics: DashboardDiagnostics,
	DashboardInventory: DashboardInventory,
	ComparativeAnalytics: ComparativeAnalytics,
	Devices: Devices,
	ActiveClients: ActiveClients,
	ActiveUsers: ActiveUsers,
	ActiveEvents: ActiveEvents,
	ActiveAlarms: ActiveAlarms,
	Security: Security,
	TopApps: TopApps,
	ProximityPresence: ProximityPresence,
	NetworkPolicies: NetworkPolicies,
	Applications: Applications,
	CommonObjects: CommonObjects,
	Users: Users,
	ClientMonitor: ClientMonitor,
	Diagnosis: Diagnosis,
	Utilities: Utilities,
	PacketCapture: PacketCapture,
	PlanView: PlanView,
	MonitorView: MonitorView,
	A3: A3
};

class Router extends Component {
	constructor() {
		super()
		this.state = {
			widgetList: []
		}
	}

	componentDidMount() {
		let list = [{path: '/', component: Devices }];
		this.setState({ widgetList: this.listWidgets(HeaderMap, list) });
	}

	listWidgets = (map, list) => {
		map.forEach( item => {
			if ( item.path ) {

				list.push({ path: item.path, component: componentObj[item.component]});
			}
			if ( item.menu ) {
				this.listWidgets(item.menu, list);
			}
		})
		return list;
	}

	generateRoutes() {
		let routes = this.state.widgetList.map( (route, key) => {
			return <Route key={key} path={'/' + route.path} component={route.component} />;
		});
		return routes;
	}

	primaryContent() {
		let routes = this.generateRoutes();
	    return (
	      	<div id="Components/Content/HomePage"> 
	      		<Header handleLogout={this.props.handleLogout} headers={HeaderMap} user={this.props.user} />
		        {routes}
	      	</div> );
  	}

  	render() {
    	let content = this.primaryContent();
    	return (
        	<BrowserRouter>
        		{content}
        	</BrowserRouter>
    	);
  	}
}

Router.propTypes = {
	map: PropTypes.object,
	handleLogout: PropTypes.func,
	headerMap: PropTypes.object,
	user: PropTypes.object
}

export default Router;
