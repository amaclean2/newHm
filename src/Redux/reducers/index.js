import { combineReducers } from 'redux';
import { devices } from './devices';
import { clients, clientsTimeline } from './clients';
import { events } from './events';
import { filters } from './filters';

const ahApplication = combineReducers({
	devices,
	clients,
	clientsTimeline,
	events,
	filters
});

export default ahApplication;