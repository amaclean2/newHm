export const filters = (state = {}, action) => {
	switch(action.type) {
		case 'REQUEST_FILTERS' :
			return {
				...state,
				isFetching: true,
				needsUpdate: false
			}
		case 'RECEIVE_FILTERS' :
			return {
				...state, 
				isFetching: false,
				items: action.filters,
				lastUpdated: action.receivedAt,
				needsUpdate: false
			};
		default :
			return state;
	}
}