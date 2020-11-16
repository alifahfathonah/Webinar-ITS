$(document).ready(function (params) {
	let eventRoute = document.getElementById('calendarData').dataset.eventroute;
	let calendar = $('#calendar').fullCalendar({
		header:{
			left:'prev,next today',
			center:'title',
			right:'month,agendaWeek,agendaDay',
		},
		events: eventRoute,
	});
})
