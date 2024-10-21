
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
    let c_id=customer_array.length+1;
    function loadCustomerTable() {
        const customerTableBody = $("#customerTableBody");
        customerTableBody.empty(); // Clear previous entries

        customer_array.forEach((customer) => {
            let customers = `<tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.nic}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
        </tr>`;
            customerTableBody.append(customers);
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

            // Reset the form
            $("#id,#name, #address, #nic, #email, #phone").val("");
            $("#dashboardPage, #addCustomerForm, #addItemForm, #itemPage, #orderPage").hide();
            $("#customerPage").show();

            c_id++;

        } else {
            alert("Please fill all fields.");
        }
    });



//save item
let item_array = [];
let i_id=item_array.length+1;
function loadItemTable() {
    const itemTableBody = $("#itemTableBody");
    itemTableBody.empty(); // Clear previous entries

    item_array.forEach((item) => {
        let items = `<tr>
            <td>${item.i_id}</td>
            <td>${item.name1}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
        </tr>`;
        itemTableBody.append(items);
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
            price: price,
            quantity: quantity,

        };
        item_array.push(item);
        loadItemTable();

        // Reset the form
        $("#name1, #price, #quantity").val("");
        $("#dashboardPage, #addCustomerForm, #addItemForm, #customerPage, #orderPage").hide();
        $("#itemPage").show();

        i_id++;

    } else {
        alert("Please fill all fields.");
    }
});
