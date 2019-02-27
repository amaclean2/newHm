import { prefix, dummyData } from './urlPrefix';
import data from '../../DefaultData/DummyData/devices';
import { isEmptyObject } from './generalFunctions';

const requestDevices = () => {
	return {
		type: 'REQUEST_DEVICES'
	}
}

const receiveDevices = json => {
	return {
		type: 'RECEIVE_DEVICES',
		json,
		devices: json.data.devices.data.map( devices => {
			return {
				status: '',
				uptime: devices.systemUpTime,
				clients: devices.activeClientCount,
				hostname: devices.hostname,
				ipv4: devices.ipAddress,
				model: devices.productType,
				unit: '',
				stackStatus: '',
				mac: devices.macAddress,
				location: devices.locationName,
				serialNumber: devices.serialNumber,
				serviceTag: '',
				vpnService: devices.vpnSeviceName,
				updated: devices.updatedOn,
				hiveOs: devices.displayVer,
				wifi0Channel: devices.channel24g,
				wifi0Power: devices.power24g,
				wifi1Channel: devices.channel5g,
				wifi1Power: devices.power5g,
				policy: devices.networkPolicyName,
				vlan: devices.mgtVlan,
				make: devices.make,
				sshStatus: '',
				onboarded: devices.createdAt,
				mode: devices.apType,
				managed: devices.adminState,
				ipAddress: devices.extIpAddress,
				country: devices.countryCode,
				wifi0Radio: devices.radioProfile24g,
				wifi1Radio: devices.radioProfile5g,
				signature: devices.appSignatureFileVer,
				alarms: devices.alarms,
				radius: devices.radiusServer,
				ipv6: devices.ipv6Address,
				cloudConfigGroups: '',
				branchId: '',
				eth0lldpPortNo: devices.eth0LldpPortId,
				eth0lldpSysId: devices.eth0LldpSysId,
				eth0lldpSysName: devices.eth0LldpSysName,
				eth1lldpPortNo: devices.eth1LldpPortId,
				eth1lldpSysId: devices.eth1LldpSysId,
				eth1lldpSysName: devices.eth1LldpSysName,
				id: devices.id
			}
		}),
		receivedAt: Date.now()
	}
}

const fetchWipDevices = taskKey => {
	return dispatch => {
		return fetch(prefix + `services/inventory/devices/wip/data?taskKey=${taskKey}&ownerId=16781&ownerIds=16781`, {
			method: 'GET',
			headers: new Headers({'Content-Type': 'application/json'})
		}).then(response => response.json())
		.then( json => {
			dispatch(receiveDevices(json))
		}).catch(err => console.log(err))
	}
}

// services/allowallroles/devices/wip/list?page.page=0&page.size=10&ownerId=16781&ownerIds=16781
// services/inventory/devices/wip/data?taskKey=WipTask-devices-fd7a65a92b3445e53555ea3122b4febb&ownerId=16781&ownerIds=16781
const fetchDevices = () => {
	if ( dummyData ) {
		return dispatch => {
			dispatch(receiveDevices(data))
		}
	} else {
		return dispatch => {
			dispatch(requestDevices())
			return fetch(prefix + `allowallroles/devices/wip/list?page.page=0&page.size=10&ownerId=16781&ownerIds=16781`, {
				method: 'GET',
				headers: new Headers({'Content-Type': 'application/json'})
			}).then(response => {
					response.json()
				})
				.then(json => {
					if(json.data) {
						dispatch(fetchWipDevices(json.data))
					}
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}

const shouldFetchDevices = state => {
	const devices = state.devices;
	if (isEmptyObject(state.devices)) {
		return true
	} else if (devices && devices.isFetching) {
		return false;
	} else if (devices && devices.items && devices.items.length) {
		return false
	} else {
		return devices.needsUpdate
	}
}

export const fetchDevicesIfNeeded = (configKey) => {
	return (dispatch, getState) => {
		console.log(getState());

		if (shouldFetchDevices(getState())) {
			return dispatch(fetchDevices(configKey))
		}
	}
}