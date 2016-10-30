$(document).ready(function(){
	var defaultActiveElements = {keyboard: true, guitar: true};
	active_elements = (localStorage.getItem("active_elements") === null) ? defaultActiveElements : JSON.parse(localStorage.getItem("active_elements"));
});
