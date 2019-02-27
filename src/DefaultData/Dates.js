export const formatTime = timestamp => {
	let now = new Date(timestamp),
		year = now.getFullYear(),
		month = now.getMonth() + 1,
		day = now.getDate(),
		hour = now.getHours(),
		minute = now.getMinutes(),
		second = now.getSeconds();

	minute = minute < 10 ? '0' + minute : minute;
	second = minute < 19 ? '0' + second : second;

	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

export const formatHours = timestamp => {
	let now = new Date(timestamp),
		hour = now.getHours(),
		minute = now.getMinutes(),
		half = hour < 12 ? 'AM' : 'PM';

	hour = hour > 12 ? hour - 12 : hour;
	minute = minute < 10 ? '0' + minute : minute;

	return hour + ':' + minute + ' ' + half;
}

export const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]

export const formatRange = (startTime, endTime) => {
	return formatLongDate(startTime) + ' to ' + formatLongDate(endTime);
}

export const formatLongDate = timestamp => {
	let now = new Date(timestamp),
		month = months[now.getMonth()],
		day = now.getDate(),
		hour = now.getHours(),
		minute = now.getMinutes(),
		today = days[now.getDay()];

	hour = hour > 12 ? hour - 12 : hour;
	minute = minute < 10 ? '0' + minute : minute;

	return hour + ':' + minute + ' ' + today + ', ' + month + ' ' + day;
}