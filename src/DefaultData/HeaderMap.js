const headerMap = [
	{ title: 'Dashboard', menu: [
		{title: 'summary', path: 'summary', component: 'DashboardSummary'},
		{title: 'reports', path: 'reports', component: 'Reports'},
		{title: 'diagnostics', path: 'diagnostics', component: 'DashboardDiagnostics'},
		{title: 'inventory', path: 'inventory', component: 'DashboardInventory'},
		{title: 'comparative analytics', path: 'comparative', component: 'ComparativeAnalytics'}
	]},
	{ title: 'Monitor', menu: [
		{title: 'Devices', path: 'devices', component: 'Devices'},
		{title: 'Clients', path: 'activeclients', component: 'ActiveClients'},
		{title: 'Users', path: 'activeusers', component: 'ActiveUsers'},
		{title: 'Events', path: 'activeevents', component: 'ActiveEvents'},
		{title: 'Alarms', path: 'activealarms', component: 'ActiveAlarms'},
		{title: 'Security', path: 'security', component: 'Security'},
		{title: 'applications', path: 'topapps', component: 'TopApps'},
		{title: 'proximity & presence', path: 'proximity', component: 'ProximityPresence'}
	]},
	{ title: 'Configure', menu: [
		{ title: 'Network Policies', path: 'network', component: 'NetworkPolicies'},
		{ title: 'applications', path: 'applications', component: 'Applications'},
		{ title: 'common objects', path: 'common', component: 'CommonObjects'},
		{ title: 'users', path: 'users', component: 'Users' }
	]},
	{ title: 'Tools', menu: [
		{ title: 'client monitor', path: 'client', component: 'ClientMonitor'},
		{ title: 'diagnosis', path: 'diagnosis', component: 'Diagnosis'},
		{ title: 'utilities', path: 'utilities', component: 'Utilities'},
		{ title: 'packet capture', path: 'packet', component: 'PacketCapture' }
	]},
	{ title: 'Network 360', menu: [
		{ title: 'plan view', path: 'plan', component: 'PlanView'},
		{ title: 'monitor view', path: 'monitor', component: 'MonitorView' }
	]},
	{ title: 'A3', path: 'a3', component: 'A3', menu: []}
];

export default headerMap;