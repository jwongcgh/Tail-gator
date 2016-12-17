 document.addEventListener('DOMContentLoaded', () => {
 	var packageItems;

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

        populateTemplate(context,'addOnTemplate', '#addOnItems');
        populateTemplate(packageItems,'packageItemTemplate', '#itemsUL');



    });