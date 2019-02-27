import { prefix, dummyData } from './urlPrefix';
import data from '../../DefaultData/DummyData/events';
import { isEmptyObject } from './generalFunctions';

const requestEvents = (startTime, endTime) => {
	return {
		type: 'REQUEST_EVENTS',
		startTime,
		endTime
	}
}

const receiveEvents = json => {
	return {
		type: 'RECEIVE_EVENTS',
		json,
		events: json.data.content.map( event => {
			return {
				timestamp: event.timestamp,
				severity: event.severity,
				category: event.category,
				description: event.description,
				hostname: event.hostname,
				deviceMac: event.deviceMac,
				clientMac: event.clientMac,
				id: event.id
			}
		}),
		receivedAt: Date.now()
	}
}

// https://10.16.139.124/hm-webapp/services/monitoring/events/viewer/list?page.page=0&page.size=10&startTime=1548806308543&endTime=1548892708543&pageSize=500&startKey=&ownerId=102&ownerIds=102
const fetchEvents = (startTime, endTime) => {
	if ( dummyData ) {
		return dispatch => {
			dispatch(receiveEvents(data))
		}
	} else {
		return dispatch => {
			dispatch(requestEvents(startTime, endTime))
			return fetch(prefix + `monitoring/events/viewer/list?page.page=0&page.size=10&startTime=${startTime}&endTime=${endTime}&pageSize=500&startKey=&ownerId=102&ownerIds=102`, {
				method: 'GET',
				headers: new Headers({'Content-Type': 'application/json'})
			}).then(response => {
					response.json()
				})
				.then(json => dispatch(receiveEvents(json)))
				.catch(err => {
					console.log(err)
				})
		}
	}
}

const shouldFetchEvents = state => {
	const events = state.events;
	if ( isEmptyObject(events) ) {
		return true;
	} else if (events && events.isFetching) {
		return false;
	} else if (events && events.items && events.items.length) {
		return false
	} else {
		return events.needsUpdate
	}
}

export const fetchEventsIfNeeded = (startTime, endTime) => {
	return (dispatch, getState) => {
		if (shouldFetchEvents(getState())) {
			return dispatch(fetchEvents(startTime, endTime))
		}
	}
}