export const clients = (state = {}, action) => {
	switch(action.type) {
		case 'REQUEST_CLIENTS' :
			return {
				...state,
				isFetching: true,
				needsUpdate: false
			}
		case 'RECEIVE_CLIENTS' :
			return {
				...state,
				isFetching: false,
				items: action.clients,
				lastUpdated: action.receivedAt,
				needsUpdate: false
			}
		default :
			return state;
	}
}

export const clientsTimeline = (state = {}, action) => {
	switch(action.type) {
		case 'REQUEST_TIMELINE' :
			return {
				...state,
				isFetching: true,
				needsUpdate: false
			}
		case 'RECEIVE_TIMELINE' :
			return {
				...state,
				isFetching: false,
				items: action.data,
				lastUpdated: action.receivedAt,
				needsUpdate: false
			}
		default :
			return state;
	}
}