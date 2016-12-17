document.addEventListener('DOMContentLoaded', () => {
	var corsProxypath = 'http://cors-anywhere.herokuapp.com/'
	var foodAPIpath = 'https://api.edamam.com/search?app_id=4856d9fa&app_key=9ce82851ef943348a6fda68504f6d8a3';
	var foodOfferings = ['burger', 'chili-cheese+dogs', 'pulled+pork', 'brisket', 'bbq+chicken', 'grilled+shrimp'];
	
	function ajaxCall (searchTerm) {
		$.ajax({
			url: `${corsProxypath}${foodAPIpath}&q=${searchTerm}`,
			method: 'GET'})
			.done((response) => console.log(response.hits[0].recipe));
	}

	foodOfferings.map((x) => ajaxCall(x));

});