// import {CustomerModel} from "./models/customerModel.js";
import CustomerModel from "../models/CustomerModel.js";
import {customer_array, item_array, order_array} from "../db/database.js";

//save customer
// let customer_array = [];
let c_id = customer_array.length + 1;
let newCustomerArray =null;

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

// // //when i click row add get value print in console
// $("#customerTableBody").on("click", "tr", function () {
//     let id = $(this).find("td:nth-child(1)").text();
//     let name = $(this).find("td:nth-child(2)").text();
//     let address = $(this).find("td:nth-child(3)").text();
//     let nic = $(this).find("td:nth-child(4)").text();
//     let email = $(this).find("td:nth-child(5)").text();
//     let phone = $(this).find("td:nth-child(6)").text();
//
//     console.log(id, name, address, nic, email, phone);
// });


//when i click row and navigate to addCustomerForm and display i clicked row details in text fields


$("#customerTableBody").on("click", "tr", function () {
    let index = $(this).index();
    let customer = customer_array[index];
    console.log(`item id: ${customer.id}`);
    newCustomerArray = $(this).index();

    let name = customer.name;
    let address = customer.address;
    let nic = customer.nic;
    let email = customer.email;
    let phone = customer.phone;



    $("#name").val(name);
    $("#address").val(address);
    $("#nic").val(nic);
    $("#email").val(email);
    $("#phone").val(phone);

    //hide pages
    $("#dashboardPage, #addCustomerForm, #addItemForm, #itemPage, #orderPage").hide();
    $("#addCustomerForm").show();

});

//update customer
$("#btnUpdateCustomer").on("click", function () {
    let index = newCustomerArray;
    let name = $("#name").val();
    let address = $("#address").val();
    let nic = $("#nic").val();
    let email = $("#email").val();
    let phone = $("#phone").val();

    // $("#id").val(id);
    // $("#name").val(name);
    // $("#address").val(address);
    // $("#nic").val(nic);
    // $("#email").val(email);
    // $("#phone").val(phone);
    // $("#dashboardPage, #addCustomerForm, #addItemForm, #itemPage, #orderPage").hide();
    // $("#addCustomerForm").show();

// update customer in customer_array

    let customer = {
        id: customer_array[index].id,
        name: name,
        address: address,
        nic: nic,
        email: email,
        phone: phone
    };
    customer_array[index] = customer;
    loadCustomerTable();
    $("#dashboardPage, #addCustomerForm, #addItemForm, #itemPage, #orderPage").hide();
    $("#customerPage").show();
    $("#addCustomerForm").show();

    // clear the form
    $("#id, #name, #address, #nic, #email, #phone").val("");


});

$("#btnDeleteCustomer").on("click", function (event) {
    event.preventDefault(); // Prevent unintended form submission

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const id = $("#nic").val().trim();

            // Check if the NIC/ID field is filled
            if (!id) {
                swalWithBootstrapButtons.fire({
                    title: "Error",
                    text: "Please provide a valid NIC.",
                    icon: "error"
                });
                return;
            }

            const index = customer_array.findIndex(customer => customer.nic === id);

            if (index !== -1) {
                customer_array.splice(index, 1);
                loadCustomerTable();

                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "The customer has been deleted.",
                    icon: "success"
                });
                //clear fields
                $("#id, #name, #address, #nic, #email, #phone").val("");

            } else {
                swalWithBootstrapButtons.fire({
                    title: "Error",
                    text: "Customer not found.",
                    icon: "error"
                });
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "The customer was not deleted.",
                icon: "info"
            });
        }
    });
});


//
// //textFields not empty
// const validateEmail=(email)=>{
//     let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regexEmail.test(email);
// }
//
//
// const validatePhone=(phone)=>{
//     let regexPhone = /^\d{10}$/;
//     return regexPhone.test(phone);
// }


//save customer
$("#saveCustomer").on("click", function (event) {

    let name = $("#name").val().trim();
    let address = $("#address").val().trim();
    let nic = $("#nic").val().trim();
    let email = $("#email").val().trim();
    let phone = $("#phone").val().trim();

    //validations
    if (name.length === 0) {
        Swal.fire({
            title: "Validation Error",
            text: "Please enter the customer's name.",
            icon: "error"
        });
        return;
    }

    if (address.length === 0) {
        Swal.fire({
            title: "Validation Error",
            text: "Please enter the customer's address.",
            icon: "error"
        });
        return;
    }


    if (nic.length === 0) {
        Swal.fire({
            title: "Validation Error",
            text: "Please enter the customer's NIC.",
            icon: "error"
        });
        return;
    }

    if (email.length === 0 || !validateEmail(email)) {
        Swal.fire({
            title: "Validation Error",
            text: "Please enter a valid email address.",
            icon: "error"
        });
        return;
    }

    if (phone.length === 0 || !validatePhone(phone)) {
        Swal.fire({
            title: "Validation Error",
            text: "Please enter a valid phone number.",
            icon: "error"
        });
        return;
    }

    //validations pass
     Swal.fire({
        position: "center",
        icon: "success",
        title: "Customer saved successfully!",
        showConfirmButton: false,
        timer: 1500
    });

});

// Example email validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Example phone validation
function validatePhone(phone) {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
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
