 document.addEventListener('DOMContentLoaded', () => {
 	var packageItems;

 	var corsProxypath = 'https://cors-anywhere.herokuapp.com/'
	var foodAPIpath = 'https://api.edamam.com/search?app_id=4856d9fa&app_key=9ce82851ef943348a6fda68504f6d8a3';
	// var foodOfferings = ['burger', 'chili-cheese+dogs', 'pulled+pork', 'brisket', 'bbq+chicken', 'grilled+shrimp'];
	
	function ajaxCall (searchTerm) {
		$.ajax({
			url: `${corsProxypath}${foodAPIpath}&q=${searchTerm}`,
			method: 'GET'})
			.done((response) => {
				$('#myModal').modal('show');
				populateModal(response.hits[0].recipe);
			});
	}

	function populateModal (response) {
		console.log(response)
		document.querySelector('.modal-body').innerHTML = '';
		document.getElementById('myModalLabel').innerHTML = response.label;
		document.getElementById('source').src = response.url;
		document.getElementById('sourceName').innerHTML = response.source + '.com';
		var div = document.createElement('div');
		var img = document.createElement('img');
		var ul = document.createElement('ul');
		var p = document.createElement('p');
		p.innerHTML = 'Ingredients';
		var ingredientLines = response.ingredientLines;
		img.src = response.image;
		img.classList.add('img-responsive', 'center-block');
		div.appendChild(img);
		div.appendChild(p);
		ingredientLines.map((x) => {
			var li = document.createElement('li');
			li.innerHTML = x;
			ul.appendChild(li)
		});
		div.appendChild(ul);
		document.querySelector('.modal-body').appendChild(div);

	}

        if (localStorage.getItem('package')) {
            document.getElementById('package').innerHTML = localStorage.getItem('package');
            document.getElementById('yourPackage').innerHTML = localStorage.getItem('package');
            packageItems = { items:  JSON.parse(localStorage.getItem('myarray'))}
            packageItems.items.splice(0, 1); //Remove the default package item
        } else window.location.href = 'packages.html';

        document.getElementById('cancelButton').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'packages.html';
        });
        
        document.getElementById('checkoutButton').addEventListener('click', () => {
            Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map((x) => {
                addItem(x.getAttribute('data-name'), x.getAttribute('data-price'), x.getAttribute('data-quantity'));
            });
            var entreeSelection = document.querySelector('input[type="radio"]:checked').getAttribute('data-entree');
            myarray.splice(1, 0, {
                foodName: entreeSelection,
                price: 0.00,
                quantity: localStorage.getItem('package'),
            });
            localStorage.setItem('myarray', JSON.stringify(myarray));
            window.location.href = 'billing.html';
        });

        Array.from(document.querySelectorAll('input[type="radio"]')).map((x) => {
             x.addEventListener('click', () => {
                document.getElementById('checkoutButton').disabled = false;
            });
        });

        var context = { // Define data object
            addOns: [
                {   
                    name: "Water bottles",
                    price: 0.99,
                    quantity: 6
                },
                {   
                    name: "Cooler",
                    price: 10.99,
                    quantity: 1
                },
                {   
                    name: "60 inch television",
                    price: 30.99,
                    quantity: 1
                },
                {   
                    name: "Slip 'n slide",
                    price: 35.99,
                    quantity: 1
                },
           
            ]
        }

        var myarray = JSON.parse(localStorage.getItem('myarray'));

        var populateTemplate = function (context, scriptID, selector) {
            var templateScript = document.getElementById(scriptID).innerHTML;
            // Compile the template
            var template = Handlebars.compile(templateScript);
            // Pass our data to the template
            var compiledHTML = template(context);
            // Add the compiled html to the page
            document.querySelector(selector).innerHTML = compiledHTML;
        }

        var addItem = function (name, price, quantity) {
            myarray.push({
                foodName: name,
                price: price,
                quantity: quantity
            });
        }
        Array.from(document.querySelectorAll('a.recipe')).map((x) => {
        	x.addEventListener('click', (event) => {
        		
        		ajaxCall(event.currentTarget.getAttribute('data-recipe'))
        	});
        });
        populateTemplate(context,'addOnTemplate', '#addOnItems');
        populateTemplate(packageItems,'packageItemTemplate', '#itemsUL');



    });