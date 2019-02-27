import { prefix, dummyData } from './urlPrefix';
import data from '../../DefaultData/DummyData/filters';
import { isEmptyObject } from './generalFunctions';

const requestFilters = configKey => {
	return {
		type: 'REQUEST_FILTERS',
		configKey
	}
}

const receiveFilters = json => {
	return {
		type: 'RECEIVE_FILTERS',
		json,
		filters: json.data.content,
		receivedAt: Date.now()
	}
}

// https://cloud-va.aerohive.com/hm-webapp/services/inventory/global/data/filter/-1?filterConfigKey=deviceList&ownerId=16781
const fetchFilters = configKey => {
	if ( dummyData ) {
		return dispatch => {
			dispatch(receiveFilters(data))
		}
	} else {
		return dispatch => {
			dispatch(requestFilters(configKey))
			return fetch(prefix + `inventory/global/data/filter/-1?filterConfigKey=${configKey}&ownerId=16781`, {
				method: 'GET',
				headers: new Headers({'Content-Type': 'application/json'})
			}).then(response => {
					response.json()
				})
				.then(json => dispatch(receiveFilters(json)))
				.catch(err => {
					console.log(err)
				})
		}
	}
}



const shouldFetchFilters = state => {
	const filters = state.filters;
	if (isEmptyObject(state.filters)) {
		return true
	} else if (filters && filters.isFetching) {
		return false;
	} else if (filters && filters.items && filters.items.length) {
		return false
	} else {
		return filters.needsUpdate
	}
}

export const fetchFiltersIfNeeded = (configKey) => {
	return (dispatch, getState) => {
		console.log(getState());

		if (shouldFetchFilters(getState())) {
			return dispatch(fetchFilters(configKey))
		}
	}
}