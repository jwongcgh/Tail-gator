document.addEventListener('DOMContentLoaded', () => {
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

	function populateFoodItems (context) {
		var templateScript = $("#address-template").html();
		// Compile the template
		var template = Handlebars.compile(templateScript);
		// Pass our data to the template
		var compiledHTML = template(context);
		// Add the compiled html to the page
		$('.content-placeholder').html(compiledHTML);

	}


	function init () {
		populateCarouselCount();
		var context = { // Define data object
			foodItem: [
				{	
					"name": "Burger",
					"price": "$59.99",
					"description": "Burgers are awesome.",
					"ratingCount": 5,
					'image': "https://placehold.it/320x150"
				},
				{	
					"name": "Hotdog",
					"price": "$19.99",
					"description": "Hot dogs are awesome.",
					"ratingCount": 12,
					'image': "https://placehold.it/320x150"
				},
				{	
					"name": "Other",
					"price": "$19.99",
					"description": "Hot dogs are awesome.",
					"ratingCount": 12,
					'image': "https://placehold.it/320x150"
				},
				{	
					"name": "Burger",
					"price": "$59.99",
					"description": "Burgers are awesome.",
					"ratingCount": 5,
					'image': "https://placehold.it/320x150"
				},
			]
		}

		populateFoodItems(context);
	
	}

	init();
}); //DOMContentLoaded