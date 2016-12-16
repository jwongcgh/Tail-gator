document.addEventListener('DOMContentLoaded', () => {
var context = { // Define data object
		package: [
			{	
				"name": "10",
				"price": 59.99,
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste consectetur veritatis qui est vel, rerum aperiam reprehenderit, tempora quibusdam mollitia.",
				'image': "http://www.bakeryonmain.com/wp-content/uploads/2014/08/expert-tips-for-grilling.jpg",
				'features': {
					grill: 1,
					tent: 1,
					chairs: 6,
					tables: 1
				}
			},
			{	
				"name": "20",
				"price": 119.99,
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste consectetur veritatis qui est vel, rerum aperiam reprehenderit, tempora quibusdam mollitia.",
				'image': "http://americleaninc.com/wp-content/uploads/grilling-2.gif",
				'features': {
					grill: 1,
					tent: 1,
					chairs: 12,
					tables: 2
				}
			},
			{	
				"name": "30",
				"price": 199.99,
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste consectetur veritatis qui est vel, rerum aperiam reprehenderit, tempora quibusdam mollitia.",
				'image': "http://s.hswstatic.com/gif/grilling-history-1.jpg",
				'features': {
					grill: 2,
					tent: 2,
					chairs: 18,
					tables: 3
				}
			},
			{	
				"name": "40",
				"price": 259.99,
				"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste consectetur veritatis qui est vel, rerum aperiam reprehenderit, tempora quibusdam mollitia.",
				'image': "http://www.gone-ta-pott.com/000802_c710_0016_csls.jpg",
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
	context.package
	localStorage.setItem('package', event.currentTarget.getAttribute('data-package'));
	// console.log(localStorage.getItem('package'));
	var myarray = []
	var filteredArray = context.package.filter((x) => {
		if (x.name == "30") return true;
	});
	console.log(filteredArray[0]);
	myarray.push({
		foodName: `${filteredArray[0].name} person package`,
		price: filteredArray[0].price,
		quantity: 1
	})
	console.log()
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