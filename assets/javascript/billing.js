$(document).ready(function() {
    // ******************************************************************************* //
    // Start *** using array object *** //
    // ******************************************************************************* //

    var table_columns = 6;
    var array = [];

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
// Remove or comment out before deploying @@@@@@@@@@@@@@@@@@@@@@@@ //
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    // var myarray = [
    //     { foodName: 'burger', price: 19.99, quantity: 3 },
    //     { foodName: 'hotdog', price: 22.65, quantity: 15 },
    //     { foodName: 'shrimp', price: 24.85, quantity: 22 },
    //     { foodName: 'package 1', price: 98.99, quantity: 1 },
    //     { foodName: 'utensils', price: 12.99, quantity: 25 },
    // ]

    // store
    // localStorage.clear();
    // localStorage.setItem("myarray", JSON.stringify(myarray));

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    //retrieve
    array = JSON.parse(localStorage.getItem("myarray"));
    console.log('Array', array)
    if (array!== null && array.length > 0) { 
        console.log("retrieved array: ", array, array.length);
        console.log(array[0].price);


        // display object values
       for (var a=0; a < array.length; a++) {
                console.log("value: " + Object.values(array[a]));
       } 

        populate()
    } else window.location.href = 'packages.html';
// ******************************************************************************* //
// Start *** populates table with cart items *** //
// ******************************************************************************* //

    function populate() {
        for (var j = 0; j < array.length; j++) {
            // adds new row in table when needed
            var newRow = $("<tr>");
            // append the necessary number of columns in table
            for (var i = 0; i < table_columns; i++) {
                var newData = $("<td>");
                if (i == 2 || i == 3 || i==4) {newData.addClass("text-center"); }   // formatting columns
                if (i == array.length) {newData.addClass("text-right");}     // formatting columns
                // adds input field inside table cell
                if (i == 3) {
                    var newInput = $("<input type='text' size='4'>");
                    newInput.addClass("quantity");
                    // assign id to item-update input field
                    newInput.attr("id", "quant_" + j);
                    // placeholder value is inital chosen item-quantity 
                    newInput.attr("placeholder", array[j].quantity);
                    if (array[j].price == 0.00) {
                        newInput.attr('disabled', true);
                    }

                    newData.append(newInput);
                }

                // adds button to update items quantity
                if (i == 4) {
                    var newButton = $("<button>");
                    newButton.addClass("update_item_Butt");
                    newButton.addClass("btn btn-default");
                    if (array[j].price == 0.00) {
                        newButton.addClass('disabled');
                    }
                    newButton.attr("data-update", j);
                    newButton.text("update");
                    newData.append(newButton);
                }
                newRow.append(newData);
            } // end for-loop appending columns to each row

            $("#rows").append(newRow);

            // *** populate page 1 - order details
            // target columns and populate cells with pertinent cart information from columns 1 to 6
            var RowTds = $('table').children().eq(1).children('tr').eq(j).children('td');

            RowTds.eq(0).text(j + 1);
            RowTds.eq(1).text(array[j].foodName); // item id value: e.g. burger
            RowTds.eq(2).text(array[j].price); // item each
            RowTds.eq(3).html(); // item quantity: array[j].quantity
            RowTds.eq(4).html(); // update list item button: "button here"
            RowTds.eq(5).text((array[j].price * array[j].quantity).toFixed(2));

        } // end for-loop populating Order Details cart
        charges();
    } // end populate function


    function invoice_pop() {
// Start *** populate page 3 - invoice *** //

       for (var k = 0; k < array.length; k++) {
            // adds new row in table when needed
            var newRow = $("<tr>");
            // append the necessary number of columns in table
            for (var i = 0; i < table_columns - 1 ; i++) {
                var newData = $("<td>");
                if (i == 2 || i == 3) {
                    newData.addClass("text-center");    // formatting columns
                }
                if (i >= array.length - 1) {
                    newData.addClass("text-right");     // formatting columns
                }
                newRow.append(newData);
            } // end for-loop appending columns to each row

            $("#rows_invoice").append(newRow);
            // *** populate page 1 - order details
            // target columns and populate cells with pertinent cart information from columns 1 to 6
            var RowTds = $('#tableInv').children().eq(1).children('tr').eq(k).children('td');

            RowTds.eq(0).text(k + 1);
            RowTds.eq(1).text(array[k].foodName); // item id value: e.g. burger
            RowTds.eq(2).text(array[k].price); // item each
            RowTds.eq(3).text(array[k].quantity); // item quantity: array[j].quantity
            // RowTds.eq(4).html(); // update list item button: "button here"
            RowTds.eq(4).text((array[k].price * array[k].quantity).toFixed(2));

        } // end for-loop populating Invoice

    }   // end fucntion populate invoive

// ******************************************************************************* //
// Start *** cart charges calculation *** //
// ******************************************************************************* //

    function charges() {
        var subtotal = 0.00;
        var totalCharge = 0.00;
        var shipping = 10.00;
        var tax = 0.0825;

        // adds items prices
        for (var i = 0; i < array.length; i++) {
            subtotal += parseFloat(array[i].price * array[i].quantity);
            $(".subtotal").html(subtotal.toFixed(2));
        }

        $(".tax").html((subtotal * tax).toFixed(2));

        if (subtotal == 0) {
            shipping = 0;
            $(".shipping").html("0.00");
        } else {
            $(".shipping").html(shipping.toFixed(2));
        }

        totalCharge = subtotal * (1 + tax) + shipping
        $(".totalCharge").html(totalCharge.toFixed(2));
        // console.log(typeof totalCharge.toFixed(2));
        // console.log(totalCharge);
        // console.log(typeof totalCharge.toFixed(2));

        // go-to poputate invoice
        invoice_pop();

// ******************************************************************************* //
// Start *** pass charge to paypal *** //
// ******************************************************************************* //

    toPayPal = totalCharge.toFixed(2);
    $('#subtpay').val(toPayPal);
    // console.log($('#subtpay').val());
    } // end charges function

// ******************************************************************************* //
// Start *** update cart at checkout *** //
// ******************************************************************************* //

    // update cart item quantity and subtotal
    $(".update_item_Butt").on("click", function() {
            var newQuant = $(this).data("update");  // button id retrieved once pressed
            // retrieving new item quantity value
            var inputVal = $("#quant_" + newQuant).val();
            if (inputVal !== "") {
                // updates locally quantity updated in array
            // database cart update
                array[$(this).data("update")].quantity = inputVal;
                myarray = array;
                localStorage.setItem("myarray", JSON.stringify(myarray));
                // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& //
                // checking array has been updated in database
                array = JSON.parse(localStorage.getItem("myarray"));
                for (var a=0; a < array.length; a++) {
                    console.log("value: ", Object.values(array[a]));
                } 
                // end checking array has been updated in database
                // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& //
                $('table').children().eq(1).children('tr').eq($(this).data("update")).children('td').eq(5).html((array[$(this).data("update")].price * inputVal).toFixed(2));
            } else {
                console.log("no change to initial value");
            }
            charges();
            return false;
        }); // end update order

// ******************************************************************************* //
// Start *** go back to mainpage *** //
// ******************************************************************************* //

//Now it works :) 

    $("#cancel").on("click", function() {
        // empty order array in database
        array = [];
        localStorage.clear();
        window.location.href = 'index.html';
    }); // end cancel order


// ******************************************************************************* //
// Start ***  bootsnip code below ***
// ******************************************************************************* //
// ******************************************************************************* //
// Start *** initialize tooltips ***
// ******************************************************************************* //

    //Initialize tooltips
    // $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        var $target = $(e.target);
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {
        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);
    });

    $(".prev-step").click(function (e) {
        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });

}); // end document ready

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}
