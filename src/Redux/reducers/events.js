export const events = (state = {}, action) => {
	switch(action.type) {
		case 'REQUEST_EVENTS' :
			return {
				...state,
				isFetching: true,
				needsUpdate: false
			}
		case 'RECEIVE_EVENTS' :
			return {
				...state, 
				isFetching: false,
				items: action.events,
				lastUpdated: action.receivedAt,
				needsUpdate: false
			};
		default :
			return state;
	}
}