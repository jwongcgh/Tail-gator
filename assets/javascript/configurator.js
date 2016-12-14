document.addEventListener('DOMContentLoaded', () => {
var context = { // Define data object
		package: [
			{	
				"name": "10",
				"price": "$59.99",
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste consectetur veritatis qui est vel, rerum aperiam reprehenderit, tempora quibusdam mollitia.",
				'image': "http://grilling24x7.com/wp/wp-content/uploads/2015/06/brats.jpg",
				'features': {
					grill: 1,
					tent: 1,
					chairs: 6,
					tables: 1
				}
			},
			{	
				"name": "20",
				"price": "$119.99",
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste consectetur veritatis qui est vel, rerum aperiam reprehenderit, tempora quibusdam mollitia.",
				'image': "http://grilling24x7.com/wp/wp-content/uploads/2015/06/brats.jpg",
				'features': {
					grill: 1,
					tent: 1,
					chairs: 12,
					tables: 2
				}
			},
			{	
				"name": "30",
				"price": "$199.99",
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste consectetur veritatis qui est vel, rerum aperiam reprehenderit, tempora quibusdam mollitia.",
				'image': "http://grilling24x7.com/wp/wp-content/uploads/2015/06/brats.jpg",
				'features': {
					grill: 2,
					tent: 2,
					chairs: 18,
					tables: 3
				}
			},
			{	
				"name": "40",
				"price": "$259.99",
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste consectetur veritatis qui est vel, rerum aperiam reprehenderit, tempora quibusdam mollitia.",
				'image': "http://grilling24x7.com/wp/wp-content/uploads/2015/06/brats.jpg",
				'features': {
					grill: 2,
					tent: 2,
					chairs: 24,
					tables: 4
				}
			},
		]
}

var populatePackages = function (context) {
		var templateScript = document.getElementById('foodTemplate').innerHTML;
		// Compile the template
		var template = Handlebars.compile(templateScript);
		// Pass our data to the template
		var compiledHTML = template(context);
		// Add the compiled html to the page
		document.querySelector('.content-placeholder').innerHTML = compiledHTML;
}

var buttonClicked = function (event) {
	localStorage.setItem('package', event.currentTarget.getAttribute('data-package'));
	// console.log(localStorage.getItem('package'));
	window.location.href = 'configurator.html'

} 

populatePackages(context);
//Click listeners for each button
Array.from(document.querySelectorAll('div.priceBlock button')).map((x) => {
	x.addEventListener('click', buttonClicked);
});
// module.exports = {
// 	packages: context,
// }
});//DOMContentLoaded