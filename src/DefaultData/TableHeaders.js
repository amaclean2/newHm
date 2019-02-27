import { formatTime } from './Dates';

const TableHeaders = {
	events: {
		timestamp: {
			field: 'timestamp',
			sortable: true,
			title: 'Timestamp',
			formatter: formatTime
		}, severity: {
			field: 'severity',
			sortable: true,
			title: 'Severity'
		}, category: {
			field: 'category',
			sortable: true,
			title: 'Category'
		}, description: {
			field: 'description',
			sortable: true,
			title: 'Description'
		}, hostname: {
			field: 'hostname',
			sortable: true,
			title: 'Host Name'
		}, deviceMac: {
			field: 'deviceMac',
			sortable: true,
			title: 'Device MAC'
		}, clientMac: {
			field: 'clientMac',
			sortable: true,
			title: 'Client MAC'
		}
	},
	clients: {
		statusHealth: {
			field: 'statusHealth',
			sortable: true,
			title: 'Status Health'
		}, connectionType: {
			field: 'connectionType',
			sortable: true,
			title: 'Connection Type'
		}, hostname: {
			field: 'hostname',
			searchable: true,
			sortable: true,
			title: 'Host Name'
		}, connectionStatus: {
			field: 'connectionStatus',
			sortable: true,
			title: 'Connection Status'
		}, IPv4: {
			field: 'IPv4',
			searchable: true,
			sortable: true,
			title: 'IPv4'
		}, mac: {
			field: 'mac',
			searchable: true,
			sortable: true,
			title: 'MAC'
		}, username: {
			field: 'username',
			searchable: true,
			sortable: true,
			title: 'Username'
		}, osType: {
			field: 'osType',
			sortable: true,
			title: 'OS Type'
		}, usage: {
			field: 'usage',
			sortable: true,
			title: 'Usage'
		}, vlan: {
			field: 'vlan',
			sortable: true,
			title: 'VLAN'
		}, ssid: {
			field: 'ssid',
			sortable: true,
			title: 'SSID'
		}, userProfile: {
			field: 'userProfile',
			sortable: true,
			title: 'User Profile'
		}
	},
	devices: {
		status: {
			field: 'status',
			sortable: true,
			title: 'Device Status',
		}, uptime: {
			field: 'uptime',
			sortable: true,
			title: 'Uptime'
		}, clients: {
			field: 'clients',
			sortable: true,
			title: 'Connected Clients',
		}, hostname: {
			field: 'hostname',
			sortable: true,
			searchable: true,
			title: 'Host Name',
		}, ipv4: {
			field: 'ipv4',
			sortable: true,
			title: 'IPv4',
		}, model: {
			field: 'model',
			sortable: true,
			title: 'Model',
		}, unit: {
			field: 'unit',
			sortable: true,
			title: 'Stack Unit',
		}, stackStatus: {
			field: 'stackStatus',
			sortable: true,
			title: 'Stack Status',
		}, mac: {
			field: 'mac',
			sortable: true,
			searchable: true,
			title: 'MAC Address',
		}, location: {
			field: 'location',
			sortable: true,
			classes: 'location-width',
			title: 'Location',
		}, serialNumber: {
			field: 'serialNumber',
			sortable: true,
			searchable: true,
			title: 'Serial #',
		}, serviceTag: {
			field: 'serviceTag',
			sortable: true,
			title: 'Service Tag',
		}, vpnService: {
			field: 'vpnService',
			sortable: true,
			title: 'VPN Service',
		}, updated: {
			field: 'updated',
			sortable: true,
			title: 'Updated On',
			formatter: formatTime
		}, hiveOs: {
			field: 'hiveOs',
			sortable: true,
			title: 'HiveOS Version',
		}, wifi0Channel: {
			field: 'wifi0Channel',
			sortable: true,
			title: 'WiFi0 Channel',
		}, wifi0Power: {
			field: 'wifi0Power',
			sortable: true,
			title: 'WiFi0 Power',
		}, wifi1Channel: {
			field: 'wifi1Channel',
			sortable: true,
			title: 'WiFi1 Channel',
		}, wifi1Power: {
			field: 'wifi1Power',
			sortable: true,
			title: 'WiFi1 Power',
		}, policy: {
			field: 'policy',
			sortable: true,
			title: 'Network Policy',
		}, vlan: {
			field: 'vlan',
			sortable: true,
			title: 'MGT VLAN',
		}, make: {
			field: 'make',
			sortable: true,
			title: 'Make',
		}, sshStatus: {
			field: 'sshStatus',
			sortable: true,
			title: 'SSH Status',
		}, onboarded: {
			field: 'onboarded',
			sortable: true,
			title: 'Onboarded',
			formatter: formatTime
		}, mode: {
			field: 'mode',
			sortable: true,
			title: 'Device Mode',
		}, managed: {
			field: 'managed',
			sortable: true,
			title: 'Managed',
		}, ipAddress: {
			field: 'ipAddress',
			sortable: true,
			title: 'External IP Address',
		}, country: {
			field: 'country',
			sortable: true,
			title: 'Country Code',
		}, wifi0Radio: {
			field: 'wifi0Radio',
			sortable: true,
			title: 'WiFi0 Radio Profile',
		}, wifi1Radio: {
			field: 'wifi1Radio',
			sortable: true,
			title: 'WiFi1 Radio Profile',
		}, signature: {
			field: 'signature',
			sortable: true,
			title: 'Application Signature File',
		}, alarms: {
			field: 'alarms',
			sortable: true,
			title: 'Alarms',
		}, radius: {
			field: 'radius',
			sortable: true,
			title: 'RADIUS Server',
		}, ipv6: {
			field: 'ipv6',
			sortable: true,
			title: 'IPv6',
		}, cloudConfigGroups: {
			field: 'cloudConfigGroups',
			sortable: true,
			title: 'Cloud Config Groups'
		}, branchId: {
			field: 'branchId',
			sortable: true,
			title: 'Branch ID',
		}, eth0lldpPortNo: {
			field: 'eth0lldpPortNo',
			classes: 'location-width',
			sortable: true,
			title: 'Eth0 LLDP Port #'
		}, eth0lldpSysId: {
			field: 'eth0lldpSysId',
			classes: 'eth0-width',
			sortable: true,
			title: 'Eth0 LLDP Sys-ID'
		}, eth0lldpSysName: {
			field: 'eth0lldpSysName',
			sortable: true,
			title: 'Eth0 LLDP Sys-Name'
		}, eth1lldpPortNo: {
			field: 'eth1lldpPortNo',
			classes: 'eth0-width',
			sortable: true,
			title: 'Eth1 LLDP Port #'
		}, eth1lldpSysId: {
			field: 'eth1lldpSysId',
			classes: 'eth0-width',
			sortable: true,
			title: 'Eth1 LLDP Sys-ID'
		}, eth1lldpSysName: {
			field: 'eth1lldpSysName',
			sortable: true,
			title: 'Eth1 LLDP Sys-Name'
		}
 	}
}

export default TableHeaders;