export const devices = (state = {}, action) => {
	switch(action.type) {
		case 'REQUEST_DEVICES' :
			return {
				...state,
				isFetching: true
			}
		case 'RECEIVE_DEVICES' :
			return {
				...state, 
				isFetching: false,
				items: action.devices,
				lastUpdated: action.receivedAt
			};
		default :
			return state;
	}
}