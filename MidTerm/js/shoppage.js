

var regexFirstName = /^.+$/;
var regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var formErrors = "";

//Assigning the Values for the products as constants
const COST_OF_TSHIRT = 15;
const COST_OF_CAPS = 50;
const COST_OF_JACKET = 10;

var grandTotal = 0;

// function to test digits integers
function isInputNumber(evt) {
  var ch = String.fromCharCode(evt.which);
  if (!/[0-9]/.test(ch)) {
    evt.preventDefault();
  }
}

// the phone number is formatted in this function
function formatPhoneNumber() {
  var phnumber = document.getElementById("phonenumber");
  var x = phnumber.value.replace(/\D/g, "").match(/(\d{3})(\d{3})(\d{4})/);
  phnumber.value = "(" + x[1] + ")" + "-" + x[2] + "-" + x[3];
}


function formSubmit(e) {
  e.preventDefault();
  console.log("Inside form submit function");
  var name = document.getElementById("flname").value.trim();
  var email = document.getElementById("email").value.trim();

  formErrors = "";
  document.getElementById("errors").innerHTML = formErrors;

  // validate all inputs based on regex patterns
  validateInputRegex(name, regexFirstName, "Please Enter a valid Name");
  validateInputRegex(email, regexEmail, "Please Enter a valid Email");

  if (formErrors) {
    document.getElementById("errors").innerHTML = formErrors;
  } else {
    getCartItems();
    receipt(name, email);
    return false;
  }

 
  return false;
}


function getCartItems() {
  var tshirts = document.getElementById("tshirts").value;
  var caps = document.getElementById("caps").value;
  var jackets = document.getElementById("jackets").value;

  //check if cart is empty
  if (isNaN(tshirts) || isNaN(caps) || isNaN(jackets)) {
    formErrors = "Please Enter a Valid Quantity";
    document.getElementById("errors").innerHTML = formErrors;
  } else {
    if (tshirts > 0 || caps > 0 || jackets > 0) {
      document.getElementById("errors").innerHTML = "";

     
      addRow("T-Shirt", tshirts, COST_OF_TSHIRT); //QUANTITY AND PRICE
      addRow("Caps", caps, COST_OF_CAPS); //QUANTITY AND PRICE
      addRow("Jackets", jackets, COST_OF_JACKET); //QUANTITY AND PRICE
    } else {
      formErrors = "Please Enter items in the Cart";
      document.getElementById("errors").innerHTML = formErrors;
    }

    return false;
  }
}


function addRow(itemName, quantity, itemPrice) {
  if (quantity > 0) {
    var itemFound = false;
    var table = document.getElementById("receipt");
    var totalRows = table.getElementsByTagName("tr");

    
    for (i = 1; i < totalRows.length - 1; i++) {
      var firstCell = totalRows[i].getElementsByTagName("td")[0];
      if (firstCell.innerText == itemName) {
        itemFound = true;
        var newQuantity = quantity;
        var calculatedPrice = Number.parseInt(newQuantity * itemPrice);
        totalRows[i].getElementsByTagName("td")[1].innerHTML = newQuantity;
        totalRows[i].getElementsByTagName("td")[2].innerHTML = itemPrice;
        totalRows[i].getElementsByTagName("td")[3].innerHTML = calculatedPrice;
      }
    }

    
    if (!itemFound) {
      var row = table.insertRow(totalRows.length - 3);
      var newItemName = row.insertCell(0);
      var newQuantity = row.insertCell(1);
      var unitPrice = row.insertCell(2);
      var newPrice = row.insertCell(3);
      newItemName.innerHTML = itemName;
      newQuantity.innerHTML = quantity;
      unitPrice.innerHTML = itemPrice;
      newPrice.innerHTML = quantity * itemPrice;
    }
  }
}

//Receipt Generation
function receipt(name, email) {
  document.getElementsByClassName("formData")[0].style.display = 'block'
  console.log(
    '🚀 ~ receipt ~ document.getElementsByClassName("formData")',
    document.getElementsByClassName("formData")[0].style
  );
  document.getElementById("nameValue").innerHTML = name;
  document.getElementById("emailValue").innerHTML = email;
  document.getElementById("phoneNumberReceipt").innerHTML =
    document.getElementById("phonenumber").value;

  var table = document.getElementById("receipt");
  var totalRows = table.getElementsByTagName("tr");

  //Total Price calculation
  if (totalRows.length) {
    var totalPrice = 0;
    for (i = 1; i < totalRows.length - 3; i++) {
      var priceCell = totalRows[i].getElementsByTagName("td")[3];
      var priceCellValue = parseInt(priceCell.innerText);
      totalPrice += priceCellValue;
    }
  }

  var calculatedTax = 0.13 * totalPrice;

  grandTotal = totalPrice + calculatedTax;
  document.getElementById("nonTaxAmount").innerHTML = totalPrice;
  document.getElementById("taxAmount").innerHTML = calculatedTax.toFixed(2);
  document.getElementById("grandTotal").innerHTML = grandTotal;
}

//Validations of input regax
function validateInputRegex(inputType, regexPattern, errorMessage) {
  if (!regexPattern.test(inputType)) {
    formErrors += `${errorMessage}<br>`; //Error message + <br>;
  }
}