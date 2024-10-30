//
// let dashboard_nav = document.getElementById("dashboardNav");
// let customer_nav = document.getElementById("customerNav");
// let item_nav = document.getElementById("itemNav");
// let order_nav = document.getElementById("orderNav");
//
// let dashboard_section = document.getElementById("dashboardPage");
// let customer_section = document.getElementById("customerPage");
// let item_section = document.getElementById("itemPage");
// let order_section = document.getElementById("orderPage");
// let addCustomer=document.getElementById("addCustomerForm");
// let addItem=document.getElementById("addItemForm");
//
// let btnAddCustomer=document.getElementById("btnAddNewCustomer");
// let btnAddItem=document.getElementById("btnAddItem");
//
// let cancelAddItem=document.getElementById("cancelAddItem");
// let cancelAddCustomer=document.getElementById("cancelAddCustomer");
//
// dashboard_section.style.display="block";
// customer_section.style.display="none";
// item_section.style.display="none";
// order_section.style.display="none";
// addCustomer.style.display="none";
// addItem.style.display="none";
//
// customer_nav.addEventListener('click', function () {
//
//     customer_section.style.display="block";
//     item_section.style.display="none";
//     order_section.style.display="none";
//     addCustomer.style.display="none";
//     addItem.style.display="none";
//     dashboard_section.style.display="none";
// });
//
// dashboard_nav.addEventListener('click', function () {
//     dashboard_section.style.display="block"
//     customer_section.style.display="none";
//     item_section.style.display="none";
//     order_section.style.display="none";
//     addCustomer.style.display="none";
//     addItem.style.display="none";
// })
// item_nav.addEventListener('click', function () {
//     dashboard_section.style.display="none";
//     customer_section.style.display="none";
//     item_section.style.display="block";
//     order_section.style.display="none";
//     addCustomer.style.display="none";
//     addItem.style.display="none";
// });
// order_nav.addEventListener('click', function () {
//     dashboard_section.style.display="none";
//     customer_section.style.display="none";
//     item_section.style.display="none";
//     order_section.style.display="block";
//     addCustomer.style.display="none";
//     addItem.style.display="none";
// });
//
// btnAddCustomer.addEventListener('click',function (){
//     dashboard_section.style.display="none";
//     customer_section.style.display="none";
//     item_section.style.display="none";
//     order_section.style.display="none";
//     addCustomer.style.display="block";
//     addItem.style.display="none";
// });
//
// btnAddItem.addEventListener('click',function (){
//     addItem.style.display="block";
//     dashboard_section.style.display="none";
//     customer_section.style.display="none";
//     item_section.style.display="none";
//     order_section.style.display="none";
//     addCustomer.style.display="none";
// });
//
// cancelAddCustomer.addEventListener('click',function (){
//     addCustomer.style.display="none";
//     dashboard_section.style.display="none";
//     customer_section.style.display="block";
//     item_section.style.display="none";
//     order_section.style.display="none";
//     addItem.style.display="none";
// });
//
// cancelAddItem.addEventListener('click',function (){
//     addItem.style.display="none";
//     dashboard_section.style.display="none";
//     customer_section.style.display="none";
//     item_section.style.display="block";
//     order_section.style.display="none";
//     addCustomer.style.display="none";
// });
//
//
// //save customer
// let customer_array = [];
// let c_id = customer_array.length + 1;
// let newCustomerArray =null;
//
// function loadCustomerTable(customers = customer_array) {
//     const customerTableBody = $("#customerTableBody");
//     customerTableBody.empty(); // Clear previous entries
//
//     customers.forEach((customer) => {
//         let row = `<tr>
//             <td>${customer.id}</td>
//             <td>${customer.name}</td>
//             <td>${customer.address}</td>
//             <td>${customer.nic}</td>
//             <td>${customer.email}</td>
//             <td>${customer.phone}</td>
//         </tr>`;
//         customerTableBody.append(row);
//     });
// }
//
// // // //when i click row add get value print in console
// // $("#customerTableBody").on("click", "tr", function () {
// //     let id = $(this).find("td:nth-child(1)").text();
// //     let name = $(this).find("td:nth-child(2)").text();
// //     let address = $(this).find("td:nth-child(3)").text();
// //     let nic = $(this).find("td:nth-child(4)").text();
// //     let email = $(this).find("td:nth-child(5)").text();
// //     let phone = $(this).find("td:nth-child(6)").text();
// //
// //     console.log(id, name, address, nic, email, phone);
// // });
//
//
// //when i click row and navigate to addCustomerForm and display i clicked row details in text fields
//
//
// $("#customerTableBody").on("click", "tr", function () {
//     let index = $(this).index();
//     let customer = customer_array[index];
//     console.log(`item id: ${customer.id}`);
//     newCustomerArray = $(this).index();
//
//     let name = customer.name;
//     let address = customer.address;
//     let nic = customer.nic;
//     let email = customer.email;
//     let phone = customer.phone;
//
//
//
//     $("#name").val(name);
//     $("#address").val(address);
//     $("#nic").val(nic);
//     $("#email").val(email);
//     $("#phone").val(phone);
//
//     //hide pages
//     $("#dashboardPage, #addCustomerForm, #addItemForm, #itemPage, #orderPage").hide();
//     $("#addCustomerForm").show();
//
// });
//
// //update customer
// $("#btnUpdateCustomer").on("click", function () {
//         let index = newCustomerArray;
//         let name = $("#name").val();
//         let address = $("#address").val();
//         let nic = $("#nic").val();
//         let email = $("#email").val();
//         let phone = $("#phone").val();
//
//         // $("#id").val(id);
//         // $("#name").val(name);
//         // $("#address").val(address);
//         // $("#nic").val(nic);
//         // $("#email").val(email);
//         // $("#phone").val(phone);
//         // $("#dashboardPage, #addCustomerForm, #addItemForm, #itemPage, #orderPage").hide();
//         // $("#addCustomerForm").show();
//
// // update customer in customer_array
//
//         let customer = {
//             id: customer_array[index].id,
//             name: name,
//             address: address,
//             nic: nic,
//             email: email,
//             phone: phone
//         };
//         customer_array[index] = customer;
//         loadCustomerTable();
//         $("#dashboardPage, #addCustomerForm, #addItemForm, #itemPage, #orderPage").hide();
//         $("#customerPage").show();
//         $("#addCustomerForm").show();
//
//         // clear the form
//     $("#id, #name, #address, #nic, #email, #phone").val("");
//
//
//     });
//
//     //delete customer
//     $("#btnDeleteCustomer").on("click", function () {
//         const swalWithBootstrapButtons = Swal.mixin({
//             customClass: {
//                 confirmButton: "btn btn-success",
//                 cancelButton: "btn btn-danger"
//             },
//             buttonsStyling: false
//         });
//         swalWithBootstrapButtons.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes, delete it!",
//             cancelButtonText: "No, cancel!",
//             reverseButtons: true
//         }).then((result) => {
//             if (result.isConfirmed) {
//
//                 let index = newCustomerArray;
//                 customer_array.splice(index, 1);
//                 loadCustomerTable();
//                 $("#dashboardPage, #addCustomerForm, #addItemForm, #itemPage, #orderPage").hide();
//                 $("#customerPage").show();
//                 $("#addCustomerForm").show();
//
//                 // clear the form
//                 $("#id, #name, #address, #nic, #email, #phone").val("");
//
//                 // reset newCustomerArray
//                 newCustomerArray = null;
//                 loadCustomerTable();
//
//                 swalWithBootstrapButtons.fire({
//                     title: "Deleted!",
//                     text: "Your file has been deleted.",
//                     icon: "success"
//                 });
//             } else if (
//                 /* Read more about handling dismissals below */
//                 result.dismiss === Swal.DismissReason.cancel
//             ) {
//                 swalWithBootstrapButtons.fire({
//                     title: "Cancelled",
//                     text: "Your imaginary file is safe :)",
//                     icon: "error"
//                 });
//                 loadItemTable();
//             }
//         });
//
//     });
//
//
// //regex
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
// $("#saveCustomer").on("input", function () {
//     let name = $("#name").val();
//     let address = $("#address").val();
//     let nic = $("#nic").val();
//     let email = $("#email").val();
//     let phone = $("#phone").val();
//
//     if (name.length===0) {
//         Swal.fire({
//             title: "The Internet?",
//             text: "That thing is still around?",
//             icon: "question"
//         });
//     }else if (validateEmail(email)){
//         Swal.fire({
//             title: "The Internet?",
//             text: "That thing is still around?",
//             icon: "question"
//         });    }
//     else if(validatePhone(phone)){
//         Swal.fire({
//             title: "The Internet?",
//             text: "That thing is still around?",
//             icon: "question"
//         });    }
//     else if (address.length===0) {
//         Swal.fire({
//             title: "The Internet?",
//             text: "That thing is still around?",
//             icon: "question"
//         });    }
//     else if (nic.length===0) {
//         Swal.fire({
//             title: "The Internet?",
//             text: "That thing is still around?",
//             icon: "question"
//         });    }
//     else if (email.length===0) {
//         Swal.fire({
//             title: "The Internet?",
//             text: "That thing is still around?",
//             icon: "question"
//         });    }
//     else if (phone.length===0) {
//         Swal.fire({
//             title: "The Internet?",
//             text: "That thing is still around?",
//             icon: "question"
//         });    }
//
//     else {
//         alert("Customer saved successfully");
//     }
//     Swal.phone({
//         position: "top-end",
//         icon: "success",
//         title: "Your work has been saved",
//         showConfirmButton: false,
//         timer: 1500
//     });
//
// });
//
//
//
//
//
// $("#saveCustomer").on("click", function () {
//         let name = $("#name").val();
//         let address = $("#address").val();
//         let nic = $("#nic").val();
//         let email = $("#email").val();
//         let phone = $("#phone").val();
//
//         if (name && address && nic && email && phone) {
//             let customer = {
//                 id: c_id,
//                 name: name,
//                 address: address,
//                 nic: nic,
//                 email: email,
//                 phone: phone
//             };
//             customer_array.push(customer);
//             loadCustomerTable();
//
//             $("#id, #name, #address, #nic, #email, #phone").val("");
//             $("#dashboardPage, #addCustomerForm, #addItemForm, #itemPage, #orderPage").hide();
//             $("#customerPage").show();
//
//             c_id++;
//         } else {
//             alert("Please fill all fields.");
//         }
//     });
//
// $("#search-input-customer").on("input", function () {
//         const searchTerm = $(this).val().toLowerCase();
//
//         const filteredCustomers = customer_array.filter((customer) =>
//             customer.phone.includes(searchTerm) ||
//             customer.name.toLowerCase().includes(searchTerm) ||
//             customer.id.toString().includes(searchTerm) ||
//             customer.email.toLowerCase().includes(searchTerm)
//         );
//
//         loadCustomerTable(filteredCustomers);
//     });
//
//     loadCustomerTable();
//
// //save item
//     let item_array = [];
//     let i_id = item_array.length + 1;
//
//     function loadItemTable(items = item_array) {
//         const itemTableBody = $("#itemTableBody");
//         itemTableBody.empty();
//
//         items.forEach((item) => {
//             let row = `<tr>
//             <td>${item.i_id}</td>
//             <td>${item.name1}</td>
//             <td>${item.price}</td>
//             <td>${item.quantity}</td>
//         </tr>`;
//             itemTableBody.append(row);
//         });
//     }
//
//     $("#saveItem").on("click", function () {
//         let name1 = $("#name1").val();
//         let price = $("#price").val();
//         let quantity = $("#quantity").val();
//
//         if (name1 && price && quantity) {
//             let item = {
//                 i_id: i_id,
//                 name1: name1,
//                 price: parseFloat(price),
//                 quantity: parseInt(quantity)
//             };
//
//             item_array.push(item);
//             loadItemTable();
//
//             $("#name1, #price, #quantity").val("");
//             $("#dashboardPage, #addCustomerForm, #addItemForm, #customerPage, #orderPage").hide();
//             $("#itemPage").show();
//
//             i_id++;
//         } else {
//             alert("Please fill all fields.");
//         }
//     });
//
//     $("#searchInput").on("input", function () {
//         const searchTerm = $(this).val().toLowerCase();
//
//         const filteredItems = item_array.filter((item) =>
//             item.name1.toLowerCase().includes(searchTerm) ||
//             item.i_id.toString().includes(searchTerm)
//         );
//
//         loadItemTable(filteredItems);
//     });
//
//     loadItemTable();
//
//
// //save order
//
// // Item Selection for Order
//     const selectedItemsBody = document.getElementById('selectedItemsBody');
//     const orderForm = document.getElementById('orderForm');
//     const qtyInput = document.getElementById('qty');
//
//     $("#itemTableBody").on("click", ".select-item", function () {
//         const itemId = $(this).data("id");
//         const itemName = $(this).data("name");
//         const itemPrice = parseFloat($(this).data("price"));
//         const quantity = parseInt(qtyInput.value);
//
//         if (quantity > 0) {
//             const totalItemPrice = itemPrice * quantity;
//
//             const newRow = `<tr>
//             <td>${itemName}</td>
//             <td class="right-align">${quantity}</td>
//             <td class="right-align">$${itemPrice.toFixed(2)}</td>
//             <td class="right-align">$${totalItemPrice.toFixed(2)}</td>
//         </tr>`;
//             selectedItemsBody.insertAdjacentHTML('beforeend', newRow);
//         } else {
//             alert("Please enter a valid quantity.");
//         }
//     });
//
//     orderForm.addEventListener('submit', function (event) {
//         event.preventDefault(); // Prevent form submission
//
//         alert("Order submitted successfully!");
//         orderForm.reset(); // Reset the form
//         selectedItemsBody.innerHTML = ""; // Clear selected items after submission
//     });
//
//     loadItemTable();
