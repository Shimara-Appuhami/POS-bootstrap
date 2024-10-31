import OrderModel from "../models/OrderModel.js";
import CustomerModel from "../models/CustomerModel.js";
import ItemModel from "../models/ItemModel.js";
import { order_array, customer_array, item_array } from "../db/database.js";

let selectedItems = [];
let totalAmount = 0;


// // Populate item dropdown from item_array
// function populateItemSelect() {
//     const itemSelect = $("#itemSelect");
//     itemSelect.empty(); // Clear any existing options
//
//     item_array.forEach(item => {
//         itemSelect.append(new Option(item.name, item.id));
//     });
// }

// Sample customer array (replace this with your actual customer data source)

// customer search and order
$("#customerContact").on("keypress", function (e) {
    if (e.which === 13) { // Check if Enter key is pressed
        e.preventDefault();

        let customer_contact = $(this).val().trim();

        let customer = customer_array.find(c => c.phone === customer_contact);
        if (customer) {
            $("#customerName").val(customer.name);
        } else {
            Swal.fire("Error", "Customer not found.", "error");
            $("#customerName").val('');
        }
    }
});
$("#itemId").on("keypress", function (e) {
    if (e.which === 13) { // Check if Enter key is pressed
        e.preventDefault();

        let item_id = $(this).val().trim();

        // Corrected the find method syntax
        let item = item_array.find(c => c.id === item_id);

        if (item) {
            $("#itemName").val(item._name1);
        } else {
            Swal.fire("Error", "Item not found.", "error");
            $("#itemName").val('');
        }
    }
});

document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect item data from form inputs
    const itemId = document.getElementById('itemId').value;
    const itemName = document.getElementById('itemName').value;
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const qty = parseInt(document.getElementById('qty').value);

    // Calculate total for the item
    const total = unitPrice * qty;

    const tableBody = document.getElementById('selectedItemsBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${itemName}</td>
        <td class="right-align">${qty}</td>
        <td class="right-align">${unitPrice.toFixed(2)}</td>
        <td class="right-align">${total.toFixed(2)}</td>
    `;
    tableBody.appendChild(newRow);

    // Update total amount
    const totalAmountElement = document.getElementById('totalAmount');
    const currentTotal = parseFloat(totalAmountElement.textContent) || 0;
    totalAmountElement.textContent = (currentTotal + total).toFixed(2);

    // Clear form fields after adding to cart
    document.getElementById('orderForm').reset();
});



$("#itemId").on("blur", function () {
    const itemId = $(this).val();
    const item = item_array.find(itm => itm.id === itemId);

    if (item) {
        $("#itemName").val(item.name);
        $("#unitPrice").val(item.price);
    } else {
        $("#itemName").val("");
        $("#unitPrice").val("");
        Swal.fire("Error", "Item not found!", "error");
    }
});
$("#orderPage").on("submit", function (event) {
    event.preventDefault();

    const itemId = $("#itemId").val();
    const quantity = parseInt($("#qty").val());
    const selectedItem = item_array.find(item => item.id == itemId);

    // Validate selected item and quantity
    if (selectedItem && quantity > 0) {
        const totalPrice = selectedItem.price * quantity;
        selectedItems.push({
            item: selectedItem.name,
            quantity: quantity,
            price: selectedItem.price,
            total: totalPrice
        });

        totalAmount += totalPrice;
        updateOrderSummary();

        $("#qty").val(1);
        $("#itemId").val("");
        $("#unitPrice").val("");
    } else {
        Swal.fire("Error", "Please select an item and enter a valid quantity!", "error");
    }
});


//update the order summary table with selected items
function updateOrderSummary() {
    const selectedItemsBody = $("#selectedItemsBody");
    selectedItemsBody.empty(); // Clear previous items

    selectedItems.forEach(item => {
        selectedItemsBody.append(`
            <tr>
                <td>${item.itemId}</td>
                <td class="right-align">${item.quantity}</td>
                <td class="right-align">Rs. ${item.price}</td>
                <td class="right-align">Rs. ${item.total}</td>
            </tr>
        `);
    });

    $("#totalAmount").text(totalAmount);
}

$(document).ready(function () {
    populateItemSelect();
});
