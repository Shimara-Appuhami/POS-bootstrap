// Import the Item model and the item array from the database
import ItemModel from "../models/ItemModel.js";
import { item_array } from "../db/database.js";

// let item_id = item_array.length + 1;
let selectedItemIndex = null;
let itemId = 1;

function loadItemTable() {
    const itemTableBody = $("#itemTableBody");
    itemTableBody.empty();

    item_array.forEach((item, index) => {
        const row = `<tr data-index="${index}">
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
        </tr>`;
        itemTableBody.append(row);

        //hide pages
        $("#dashboardPage, #addCustomerForm, #addItemForm, #customerPage, #orderPage").hide();
        $("#itemPage").show();
    });
}

// Clear
function clearForm() {
    $("#name1, #price, #quantity").val("");
    selectedItemIndex = null;
}

// save Item
$("#saveItem").on("click", function (event) {
    event.preventDefault(); // Prevent form submission

    const name = $("#name1").val().trim();
    const price = parseFloat($("#price").val().trim());
    const quantity = parseInt($("#quantity").val().trim());

    if (!name || isNaN(price) || isNaN(quantity)) {
        Swal.fire("Validation Error", "All fields are required!", "error");
        return;
    }

    const newItem = {
        id: itemId++,
        name,
        price,
        quantity,
    };

    item_array.push(newItem);
    loadItemTable();
    clearForm();

    console.log(item_array)

    Swal.fire("Success", "Item added successfully!", "success");
});


// rows
$("#itemTableBody").on("click", "tr", function () {
    let index = $(this).index();
    let item = item_array[index];

    console.log(`Item ID: ${item.id}`);
    selectedItemIndex = index;

    $("#name1").val(item.name);
    $("#price").val(item.price);
    $("#quantity").val(item.quantity);

    $("#dashboardPage, #addCustomerForm, #customerPage, #orderPage").hide();
    $("#addItemForm").show();
});
// update item
$("#btnUpdateItem").on("click", function () {
    if (selectedItemIndex === null) {
        Swal.fire("Error", "Select an item to update!", "error");
        return;
    }
    let name = $("#name1").val();
    let price = parseFloat($("#price").val());
    let quantity = parseInt($("#quantity").val());

    // Validate
    if (!name || isNaN(price) || price <= 0 || isNaN(quantity) || quantity < 0) {
        Swal.fire("Validation Error", "All fields must be filled out correctly!", "error");
        return;
    }

    let item = {
        id: item_array[selectedItemIndex].id, // Retain the original ID
        name: name,
        price: price,
        quantity: quantity
    };

    item_array[selectedItemIndex] = item;

    loadItemTable();

    $("#dashboardPage, #addCustomerForm, #addItemForm, #orderPage").hide();
    $("#itemPage").show();

    $("#name1, #price, #quantity").val("");

    Swal.fire("Success", "Item updated successfully!", "success");
    selectedItemIndex = null;
});



//delete
$("#btnDeleteItem").on("click", function () {
    if (selectedItemIndex === null) {
        Swal.fire("Error", "Select an item to delete!", "error");
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "This item will be deleted permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            item_array.splice(selectedItemIndex, 1);
            loadItemTable();
            clearForm();

            Swal.fire("Deleted!", "Item has been deleted.", "success");
        }
    });
});

// cancel button
$("#cancelAddItem").on("click", function () {
    clearForm();
    Swal.fire("Cancelled", "Item form cleared.", "info");
});

$("#itemTableBody").on("click", "tr", function () {
    selectedItemIndex = $(this).data("index");
    const selectedItem = item_array[selectedItemIndex];

    $("#name1").val(selectedItem.name);
    $("#price").val(selectedItem.price);
    $("#quantity").val(selectedItem.quantity);
});


$("#itemId").on("keypress", function (e) {
    if (e.which === 13) {
        e.preventDefault();

        let itemId = $(this).val().trim();

        let item = item_array.find(i => i.id === itemId);

        if (item) {
            $("#itemName").val(item.name1);
            $("#unitPrice").val(item.price);
        } else {
            Swal.fire("Error", "Item not found!", "error");
            $("#itemName").val('');
            $("#unitPrice").val('');
        }
    }
});

loadItemTable();

//product count
function updateProductCount() {
    const itemTableBody = document.getElementById("itemTableBody");
    const totalProductsElement = document.querySelector(".dashboardBody .bg-info .card-text");

    const productCount = itemTableBody.rows.length;
    totalProductsElement.textContent = productCount;
}

document.getElementById("btnAddItem").addEventListener("click", function () {
    const itemTableBody = document.getElementById("itemTableBody");

    const newRow = itemTableBody.insertRow();
    newRow.innerHTML = `
        <td>ITM001</td>
        <td>Sample Item</td>
        <td>100</td>
        <td>10</td>
    `;

    updateProductCount();
});

updateProductCount();
