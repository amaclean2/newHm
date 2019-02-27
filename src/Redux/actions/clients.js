import { prefix, dummyData } from './urlPrefix';
import data from '../../DefaultData/DummyData/activeClients';
import timelineData from '../../DefaultData/DummyData/TimelineData.json';
import { isEmptyObject } from './generalFunctions';

const requestClients = (startTime, endTime) => {
	return {
		type: 'REQUEST_CLIENTS',
		startTime,
		endTime
	}
}

const receiveClients = json => {
	return {
		type: 'RECEIVE_CLIENTS',
		json,
		clients: json.data.map( client => {
			return {
				statusHealth: client.clientHealth,
				connectionType: client.connectionType,
				hostname: client.hostName,
				connectionStatus: client.connectionStatus,
				IPv4: client.ipAddress,
				mac: client.macAddress,
				username: client.userName,
				osType: client.osType,
				usage: client.usage,
				vlan: client.vlan,
				ssid: client.ssidOrPort,
				userProfile: client.userProfile,
				id: client.id
			}
		}),
		receivedAt: Date.now()
	}
}

const requestTimelineData = (startTime, endTime) => {
	return {
		type: 'REQUEST_TIMELINE',
		startTime,
		endTime
	}
}

const receiveTimelineData = json => {
	return {
		type: 'RECEIVE_TIMELINE',
		json,
		data: json.data.values.map( point => {
			return {
				timestamp: point.timestamp,
				value: point.value
			}
		}),
		receivedAt: Date.now()
	}
}

// https://cloud-va.aerohive.com/hm-webapp/services/monitoring/clients/active?startTime=1548982232422&endTime=1548982232422&clientConnectionStates=1&page.page=0&page.size=20&ownerId=16781&ownerIds=16781
const fetchClients = (startTime, endTime) => {
	if ( dummyData ) {
		return dispatch => {
			dispatch(receiveClients(data))
		}
	} else {
		return dispatch => {
			dispatch(requestClients(startTime, endTime))
			return fetch(prefix + `monitoring/clients/active?startTime=${startTime}&endTime=${endTime}&clientConnectionStates=1&page.page=0&page.size=20&ownerId=16781&ownerIds=16781`, {
				method: 'GET',
				headers: new Headers({'Content-Type': 'application/json'})
			}).then(response => {
					response.json()
				}).then(json => dispatch(receiveClients(json)))
				.catch(err => {
					console.log(err)
				})
		}
	}
}

const shouldFetchClients = state => {
	const clients = state.clients;
	if (isEmptyObject(state.clients)) {
		return true
	} else if (clients && clients.isFetching) {
		return false
	} else if (clients && clients.items && clients.items.length) {
		return false
	} else {
		return clients.needsUpdate
	}
}

export const fetchClientsIfNeeded = (startTime, endTime) => {
	return (dispatch, getState) => {
		if (shouldFetchClients(getState())) {
			return dispatch(fetchClients(startTime, endTime))
		}
	}
}

const fetchTimelineData = (startTime, endTime) => {
	if ( dummyData ) {
		return dispatch => {
			dispatch(receiveTimelineData(timelineData))
		}
	} else {
		return dispatch => {
			dispatch(requestTimelineData(startTime, endTime))
			return fetch(prefix = `monitoring/clients/history/timeseries?startTime=${startTime}&endTime=${endTime}&ownerId=16781&ownerIds=16781`, {
				method: 'GET',
				headers: new Headers({'Content-Type': 'application/json'})
			}).then(response => {
				response.json()
			}).then(json => dispatch(receiveTimelineData(json)))
			.catch(err => {
				console.log(err)
			})
		}
	}
}

const shouldFetchTimeline = state => {
	const time = state.clientsTimeline;
	if (isEmptyObject(state.clientsTimeline)) {
		return true
	} else if (time && time.isFetching) {
		return false;
	} else if (time && time.items && time.items.length) {
		return false
	} else {
		return time.needsUpdate
	}
}

export const fetchTimelineDataIfNeeded = (startTime, endTime) => {
	return (dispatch, getState) => {
		if (shouldFetchTimeline(getState())) {
			return dispatch(fetchTimelineData(startTime, endTime))
		}
	}
}