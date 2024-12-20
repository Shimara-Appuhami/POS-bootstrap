import OrderModel from "../models/OrderModel.js";
import CustomerModel from "../models/CustomerModel.js";
import ItemModel from "../models/ItemModel.js";
import { order_array, customer_array, item_array } from "../db/database.js";

let selectedItems = [];
let totalAmount = 0;


// function populateItemSelect() {
//     const itemSelect = $("#itemSelect");
//     itemSelect.empty(); // Clear any existing options
//
//     item_array.forEach(item => {
//         itemSelect.append(new Option(item.name, item.id));
//     });
// }


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


//find the item
$("#itemId").on("keypress", function (e) {
    if (e.which === 13) { // Check if Enter key is pressed
        e.preventDefault();

        let itemId = $(this).val();

        let item = item_array.find(i => i.id.toString() === itemId.toString());

        if (item) {
            Swal.fire({
                title: "Item found!",
                icon: "success",
                draggable: true
            });

            $("#itemName").val(item.name);
            $("#unitPrice").val(item.price);
        } else {
            // Show error message and clear fields
            Swal.fire("Error", "Item not found!", "error");
            $("#itemName").val('');
            $("#unitPrice").val('');
        }
    }
});

document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // collect item data from form inputs
    const itemId = document.getElementById('itemId').value;
    const itemName = document.getElementById('itemName').value;
    const unitPrice = parseFloat(document.getElementById('unitPrice').value);
    const qty = parseInt(document.getElementById('qty').value);

    // calculate total for the item
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

    // update total amount
    const totalAmountElement = document.getElementById('totalAmount');
    const currentTotal = parseFloat(totalAmountElement.textContent) || 0;
    totalAmountElement.textContent = (currentTotal + total).toFixed(2);

    document.getElementById('orderForm').reset();
});



// $("#itemId").on("blur", function () {
//     const itemId = $(this).val();
//     const item = item_array.find(itm => itm.id === itemId);
//
//     if (item) {
//         $("#itemName").val(item._name1);
//         $("#unitPrice").val(item.price);
//     } else {
//         $("#itemName").val("");
//         $("#unitPrice").val("");
//         Swal.fire("Error", "Item not found!", "error");
//     }
// });
$("#orderPage").on("submit", function (event) {
    event.preventDefault();

    const itemId = $("#itemId").val();
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
        $("#itemId").val("");
        $("#unitPrice").val("");
    } else {
        Swal.fire("Error", "Please select an item and enter a valid quantity!", "error");
    }
});


//update the order summary
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

//print bill
document.getElementById("btnPrintBill").addEventListener("click", function (event) {
    event.preventDefault();

    let orderItems = [];
    let totalAmount = 0;

    const itemsTable = document.getElementById("selectedItemsBody").children;
    for (let i = 0; i < itemsTable.length; i++) {
        let row = itemsTable[i];
        let itemName = row.cells[0].innerText;
        let qty = row.cells[1].innerText;
        let price = row.cells[2].innerText;
        let total = row.cells[3].innerText;

        orderItems.push({ itemName, qty, price, total });
        totalAmount += parseFloat(total);
    }

    let currentDateTime = new Date();
    let formattedDate = currentDateTime.toLocaleDateString();
    let formattedTime = currentDateTime.toLocaleTimeString();

    let billContent = `
        <h2>Order Bill</h2>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; margin-top: 20px; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>`;

    orderItems.forEach(item => {
        billContent += `
            <tr>
                <td>${item.itemName}</td>
                <td>${item.qty}</td>
                <td>${item.price}</td>
                <td>${item.total}</td>
            </tr>`;
    });

    billContent += `
        </tbody>
        </table>
        <h3 style="margin-top: 20px;">Total Amount: Rs.${totalAmount}</h3>
    `;

    // 0pen new window and print the bill
    let printWindow = window.open('', '', 'height=800,width=1500');
    printWindow.document.write('<html><head><h1>Timber n Taste</h1></head></html>')
    printWindow.document.write('<html><head><title>Order Bill</title></head><body>');
    printWindow.document.write(billContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});

// add to cart
document.getElementById("btnAddToCart").addEventListener("click", function (event) {
    event.preventDefault();

    let itemId = document.getElementById("itemId").value;
    let itemName = document.getElementById("itemName").value;
    let unitPrice = parseFloat(document.getElementById("unitPrice").value);
    let qty = parseInt(document.getElementById("qty").value);

    let total = unitPrice * qty;

    let tableBody = document.getElementById("selectedItemsBody");
    let newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${itemName}</td>
        <td class="quantity">${qty}</td>
        <td class="price">${unitPrice}</td>
        <td class="total">${total}</td>
        <td>
            <button style="background: #ff2020" class="btn-remove">Remove</button>
        </td>
    `;

    tableBody.appendChild(newRow);

    updateTotalAmount();
});

//quantity decrease
document.getElementById("selectedItemsBody").addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-decrease")) {
        let row = event.target.closest("tr");
        let quantityCell = row.querySelector(".quantity");
        let priceCell = row.querySelector(".price");
        let totalCell = row.querySelector(".total");

        let currentQty = parseInt(quantityCell.textContent);
        if (currentQty > 1) {
            //decrease
            currentQty--;
            quantityCell.textContent = currentQty;

            let price = parseFloat(priceCell.textContent);
            totalCell.textContent = (currentQty * price).toFixed(2);

            updateTotalAmount();
        }
    }

    if (event.target.classList.contains("btn-remove")) {
        let row = event.target.closest("tr");
        row.remove();
        updateTotalAmount();
    }
});

function updateTotalAmount() {
    let totalAmount = 0;
    let rows = document.querySelectorAll("#selectedItemsBody tr");

    rows.forEach(row => {
        let total = parseFloat(row.querySelector(".total").textContent);
        totalAmount += total;
    });

    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);
}

// place order and save transaction
function placeOrder() {

    const customerName = document.getElementById('customerName').value;
    const totalAmount = document.getElementById('totalAmount').textContent;
    const orderDate = new Date().toLocaleString();

    if (customerName && totalAmount) {

        const tableBody = document.getElementById('total-table-dashboard');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${orderDate}</td>
            <td>${customerName}</td>
            <td>Rs. ${totalAmount}</td>
        `;

        tableBody.appendChild(newRow);
        order_array.length = 0;

        const table_Body = document.getElementById('selectedItemsBody');
        table_Body.innerHTML = '';


        document.getElementById('orderForm').reset();
    } else {
        alert("Please fill in all the required fields.");
    }
}

document.getElementById('btnPrintBill').addEventListener('click', function(event) {
    event.preventDefault();
    placeOrder();


});


