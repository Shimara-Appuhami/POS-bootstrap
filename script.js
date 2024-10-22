
let dashboard_nav = document.getElementById("dashboardNav");
let customer_nav = document.getElementById("customerNav");
let item_nav = document.getElementById("itemNav");
let order_nav = document.getElementById("orderNav");

let dashboard_section = document.getElementById("dashboardPage");
let customer_section = document.getElementById("customerPage");
let item_section = document.getElementById("itemPage");
let order_section = document.getElementById("orderPage");
let addCustomer=document.getElementById("addCustomerForm");
let addItem=document.getElementById("addItemForm");

let btnAddCustomer=document.getElementById("btnAddNewCustomer");
let btnAddItem=document.getElementById("btnAddItem");

let cancelAddItem=document.getElementById("cancelAddItem");
let cancelAddCustomer=document.getElementById("cancelAddCustomer");

dashboard_section.style.display="block";
customer_section.style.display="none";
item_section.style.display="none";
order_section.style.display="none";
addCustomer.style.display="none";
addItem.style.display="none";

customer_nav.addEventListener('click', function () {

    customer_section.style.display="block";
    item_section.style.display="none";
    order_section.style.display="none";
    addCustomer.style.display="none";
    addItem.style.display="none";
    dashboard_section.style.display="none";
});

dashboard_nav.addEventListener('click', function () {
    dashboard_section.style.display="block"
    customer_section.style.display="none";
    item_section.style.display="none";
    order_section.style.display="none";
    addCustomer.style.display="none";
    addItem.style.display="none";
})
item_nav.addEventListener('click', function () {
    dashboard_section.style.display="none";
    customer_section.style.display="none";
    item_section.style.display="block";
    order_section.style.display="none";
    addCustomer.style.display="none";
    addItem.style.display="none";
});
order_nav.addEventListener('click', function () {
    dashboard_section.style.display="none";
    customer_section.style.display="none";
    item_section.style.display="none";
    order_section.style.display="block";
    addCustomer.style.display="none";
    addItem.style.display="none";
});

btnAddCustomer.addEventListener('click',function (){
    dashboard_section.style.display="none";
    customer_section.style.display="none";
    item_section.style.display="none";
    order_section.style.display="none";
    addCustomer.style.display="block";
    addItem.style.display="none";
});

btnAddItem.addEventListener('click',function (){
    addItem.style.display="block";
    dashboard_section.style.display="none";
    customer_section.style.display="none";
    item_section.style.display="none";
    order_section.style.display="none";
    addCustomer.style.display="none";
});

cancelAddCustomer.addEventListener('click',function (){
    addCustomer.style.display="none";
    dashboard_section.style.display="none";
    customer_section.style.display="block";
    item_section.style.display="none";
    order_section.style.display="none";
    addItem.style.display="none";
});

cancelAddItem.addEventListener('click',function (){
    addItem.style.display="none";
    dashboard_section.style.display="none";
    customer_section.style.display="none";
    item_section.style.display="block";
    order_section.style.display="none";
    addCustomer.style.display="none";
});


//save customer
let customer_array = [];
let c_id = customer_array.length + 1;

function loadCustomerTable(customers = customer_array) {
    const customerTableBody = $("#customerTableBody");
    customerTableBody.empty(); // Clear previous entries

    customers.forEach((customer) => {
        let row = `<tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.nic}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
        </tr>`;
        customerTableBody.append(row);
    });
}

$("#saveCustomer").on("click", function () {
    let name = $("#name").val();
    let address = $("#address").val();
    let nic = $("#nic").val();
    let email = $("#email").val();
    let phone = $("#phone").val();

    if (name && address && nic && email && phone) {
        let customer = {
            id: c_id,
            name: name,
            address: address,
            nic: nic,
            email: email,
            phone: phone
        };
        customer_array.push(customer);
        loadCustomerTable();

        $("#id, #name, #address, #nic, #email, #phone").val("");
        $("#dashboardPage, #addCustomerForm, #addItemForm, #itemPage, #orderPage").hide();
        $("#customerPage").show();

        c_id++;
    } else {
        alert("Please fill all fields.");
    }
});

$("#search-input-customer").on("input", function () {
    const searchTerm = $(this).val().toLowerCase();

    const filteredCustomers = customer_array.filter((customer) =>
        customer.phone.includes(searchTerm) ||
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.id.toString().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm)
    );

    loadCustomerTable(filteredCustomers);
});

loadCustomerTable();

//save item
let item_array = [];
let i_id = item_array.length + 1;

function loadItemTable(items = item_array) {
    const itemTableBody = $("#itemTableBody");
    itemTableBody.empty();

    items.forEach((item) => {
        let row = `<tr>
            <td>${item.i_id}</td>
            <td>${item.name1}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
        </tr>`;
        itemTableBody.append(row);
    });
}

$("#saveItem").on("click", function () {
    let name1 = $("#name1").val();
    let price = $("#price").val();
    let quantity = $("#quantity").val();

    if (name1 && price && quantity) {
        let item = {
            i_id: i_id,
            name1: name1,
            price: parseFloat(price),
            quantity: parseInt(quantity)
        };

        item_array.push(item);
        loadItemTable();

        $("#name1, #price, #quantity").val("");
        $("#dashboardPage, #addCustomerForm, #addItemForm, #customerPage, #orderPage").hide();
        $("#itemPage").show();

        i_id++;
    } else {
        alert("Please fill all fields.");
    }
});

// Search functionality
$("#searchInput").on("input", function () {
    const searchTerm = $(this).val().toLowerCase();

    const filteredItems = item_array.filter((item) =>
        item.name1.toLowerCase().includes(searchTerm) ||
        item.i_id.toString().includes(searchTerm)
    );

    loadItemTable(filteredItems);
});

loadItemTable();


//save order

const orderForm = document.getElementById('orderForm');
const itemSelect = document.getElementById('itemSelect');
const qtyInput = document.getElementById('qty');
const selectedItemsBody = document.getElementById('selectedItemsBody');
const totalAmountElement = document.getElementById('totalAmount');

let totalAmount = 0;

orderForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const customerName = document.getElementById('customerName').value;
    const selectedItem = itemSelect.options[itemSelect.selectedIndex];
    const itemName = selectedItem.text;
    const itemPrice = parseFloat(selectedItem.getAttribute('data-price'));
    const quantity = parseInt(qtyInput.value);
    const totalItemPrice = itemPrice * quantity;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${itemName}</td>
        <td class="right-align">${quantity}</td>
        <td class="right-align">$${itemPrice.toFixed(2)}</td>
        <td class="right-align">$${totalItemPrice.toFixed(2)}</td>
    `;
    selectedItemsBody.appendChild(newRow);

    totalAmount += totalItemPrice;
    totalAmountElement.textContent = totalAmount.toFixed(2);

    orderForm.reset();
});

itemSelect.addEventListener('change', function () {
    const selectedPrice = parseFloat(itemSelect.options[itemSelect.selectedIndex].getAttribute('data-price'));
    document.getElementById('unitPrice').value = selectedPrice.toFixed(2);
});
