
import OrderModel from "../models/OrderModel.js";
import { order_array } from "../db/database.js";

let item_array = [
    { id: 1, name: "Item 1", price: 100 },
    { id: 2, name: "Item 2", price: 200 },
    { id: 3, name: "Item 3", price: 300 }
];

let selectedItems = [];
let totalAmount = 0;

function populateItemSelect() {
    const itemSelect = $("#itemSelect");
    item_array.forEach(item => {
        itemSelect.append(new Option(item.name, item.id));
    });
}

//update the unit price when an item is selected
$("#itemSelect").on("change", function () {
    const selectedItemId = $(this).val();
    const selectedItem = item_array.find(item => item.id == selectedItemId);
    $("#unitPrice").val(selectedItem ? selectedItem.price : 0);
});

// add the selected item to the cart
$("#orderForm").on("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const itemId = $("#itemSelect").val();
    const quantity = parseInt($("#qty").val());
    const selectedItem = item_array.find(item => item.id == itemId);

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
        $("#itemSelect").val("");
        $("#unitPrice").val("");
    } else {
        Swal.fire("Error", "Please select an item and enter a valid quantity!", "error");
    }
});

// update the order summary table
function updateOrderSummary() {
    const selectedItemsBody = $("#selectedItemsBody");
    selectedItemsBody.empty(); // Clear previous items

    selectedItems.forEach(item => {
        selectedItemsBody.append(`
            <tr>
                <td>${item.item}</td>
                <td class="right-align">${item.quantity}</td>
                <td class="right-align">Rs. ${item.price}</td>
                <td class="right-align">Rs. ${item.total}</td>
            </tr>
        `);
    });

    $("#totalAmount").text(totalAmount); // Update total amount display
}

$(document).ready(function () {
    populateItemSelect();
});
