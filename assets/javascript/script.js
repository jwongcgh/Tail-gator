document.addEventListener('DOMContentLoaded', () => {
	var corsProxypath = 'http://cors-anywhere.herokuapp.com/'
	var foodAPIpath = 'https://api.edamam.com/search?app_id=4856d9fa&app_key=9ce82851ef943348a6fda68504f6d8a3';
	var foodContext = {foodItem: []};
	var foodOfferings = ['burger', 'chili-cheese+dogs', 'pulled+pork', 'brisket', 'bbq+chicken', 'grilled+shrimp'];

	function populateCarouselCount () {
		//Take count of images from dom and dynamically generate dot indicators on carousel
		var carouselCount = Array.from(document.querySelectorAll('.carousel-inner .item'));
		var carouselIndicators = document.querySelector('.carousel-indicators');
		carouselCount.map((_,i) => {
			var li = document.createElement('li');
			li.dataset.target = ('#carousel-example-generic');
			li.setAttribute('data-slide-to', i);
			if (i == 0) li.classList = ('active');
			carouselIndicators.appendChild(li);
		});
	}

	function populateCarouselItems(context) {
		console.count('populateCarouselItems')
		var templateScript = $("#food-carousel-template").html();
		var template = Handlebars.compile(templateScript);
		var compiledHTML = template(context);
		$('.carousel-placeholder').html(compiledHTML);
		$('.carousel').carousel()
		// populateCarouselCount();
	}

	function populateFoodItems (context) {
		console.count('populateFoodItems')
		var templateScript = $("#food-template").html();
		// Compile the template
		var template = Handlebars.compile(templateScript);
		// Pass our data to the template
		var compiledHTML = template(context);
		// Add the compiled html to the page
		$('.content-placeholder').html(compiledHTML);
	}

	function ajaxCall (searchTerm) {
		$.ajax({
			url: `${corsProxypath}${foodAPIpath}&q=${searchTerm}`,
			method: 'GET'})
			.done((response) => createContext(response.hits[0].recipe));
	}

	function createContext (response) {
		console.log(response)
		thisItemObject = {
			name: response.label,
			price: '$19.99',
			description: '',
			ratingCount: '',
			image: response.image,
			yield: response.yield,
			caloriesPer: Math.round(parseInt(response.calories)/ response.yield)
		}
		console.log(thisItemObject)
		foodContext.foodItem.push(thisItemObject)
		populateFoodItems(foodContext);
		populateCarouselItems(foodContext);

	}

	function init () {
		// populateCarouselCount();
		// var context = { // Define data object
		// 	foodItem: [
		// 		{	
		// 			"name": "Burger",
		// 			"price": "$59.99",
		// 			"description": "Burgers are awesome.",
		// 			"ratingCount": 5,
		// 			'image': "https://placehold.it/320x150"
		// 		},
		// 		{	
		// 			"name": "Hotdog",
		// 			"price": "$19.99",
		// 			"description": "Hot dogs are awesome.",
		// 			"ratingCount": 12,
		// 			'image': "https://placehold.it/320x150"
		// 		},
		// 		{	
		// 			"name": "Other",
		// 			"price": "$19.99",
		// 			"description": "Hot dogs are awesome.",
		// 			"ratingCount": 12,
		// 			'image': "https://placehold.it/320x150"
		// 		},
		// 		{	
		// 			"name": "Burger",
		// 			"price": "$59.99",
		// 			"description": "Burgers are awesome.",
		// 			"ratingCount": 5,
		// 			'image': "https://placehold.it/320x150"
		// 		},
		// 	]
		// }

		// populateFoodItems(context);
		
	foodOfferings.map((x) => ajaxCall(x));
	populateCarouselCount();
	
	}

	init();
}); //DOMContentLoaded