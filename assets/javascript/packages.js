document.addEventListener('DOMContentLoaded', () => {

var context = { // Define data object
		package: [
			{	
				"name": "10",
				"price": 59.99,
				"description": "Suitable for approximately 10 people.",
				'image': "assets/images/package-10.jpg",
				'features': {
					Grills: 1,
					Tents: 1,
					Chairs: 6,
					Tables: 1
				}
			},
			{	
				"name": "20",
				"price": 119.99,
				"description": "Suitable for approximately 20 people.",
				'image': "assets/images/package-20.gif",
				'features': {
					Grills: 1,
					Tents: 1,
					Chairs: 12,
					Tables: 2
				}
			},
			{	
				"name": "30",
				"price": 199.99,
				"description": "Suitable for approximately 30 people.",
				'image': "assets/images/package-30.jpg",
				'features': {
					Grills: 2,
					Tents: 2,
					Chairs: 18,
					Tables: 3
				}
			},
			{	
				"name": "40",
				"price": 259.99,
				"description": "Suitable for approximately 40 people.",
				'image': "assets/images/package-40.jpg",
				'features': {
					Grills: 2,
					Tents: 2,
					Chairs: 24,
					Tables: 4
				}
			},
		]
}

var myarray = [];

var populatePackages = function (context) {
		var templateScript = document.getElementById('foodTemplate').innerHTML;
		// Compile the template
		var template = Handlebars.compile(templateScript);
		// Pass our data to the template
		var compiledHTML = template(context);
		// Add the compiled html to the page
		document.querySelector('.content-placeholder').innerHTML = compiledHTML;
}

var addItem = function (name, price, quantity) {
	myarray.push({
		foodName: name,
		price: price,
		quantity: quantity
	});
}

var buttonClicked = function (event) {
	// context.package
	var packageSelected = event.currentTarget.getAttribute('data-package');
	localStorage.setItem('package', packageSelected);
	// console.log(localStorage.getItem('package'));
	
	var filteredArray = context.package.filter((x) => {
		if (x.name == packageSelected) return true;
	});
	var thisPackage = filteredArray[0];
	//Add package name
	addItem(`${thisPackage.name} person package`, thisPackage.price, 1
	);
	//Get features' keys and iterate of that array
	var package = Object.getOwnPropertyNames(thisPackage.features);
	package.map((x) => {
		addItem(x, 0.00, thisPackage.features[x]);
	});
	localStorage.setItem('myarray', JSON.stringify(myarray));



	window.location.href = 'configurator.html';


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