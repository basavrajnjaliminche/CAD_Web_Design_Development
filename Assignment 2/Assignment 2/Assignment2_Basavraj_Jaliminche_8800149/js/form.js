

const jacketCost = 25;
const sweaterCost = 15;
const glovesCost = 7;
const capCost = 5;
const scarfCost = 3;

var totalCost = 0;
var formErrors = "";
formErrors = "";
// function executed after submission of form
function formSubmit(e) {
  e.preventDefault();
  console.log("Inside form submit function");
  var name = document.getElementById("flname").value.trim();
  var email = document.getElementById("email").value.trim();
  var creditcard = document.getElementById("creditcard").value.trim();
  var expmonth = document.getElementById("expmonth").value.trim();
  var expyear = document.getElementById("expyear").value.trim();
  var regexFirstName = /^.+$/;
  //regex expression for month validation in for of MMM
  var regexMonth =
    /^([Jj][Aa][Nn]|[Ff][Ee][bB]|[Mm][Aa][Rr]|[Aa][Pp][Rr]|[Mm][Aa][Yy]|[Jj][Uu][Nn]|[Jj][u]l|[aA][Uu][gG]|[Ss][eE][pP]|[oO][Cc]|[Nn][oO][Vv]|[Dd][Ee][Cc])$/;
  // regex expression for year validation for 2022-2029 
  var regexExpYear = /^20[2][2-9]$/;
  //Expression for credit card number validation
  var regexCreditCard =
    /^(\d{4})\s?(\d{4})\s?(\d{4})\s?(\d{4})$|(^\d{16}$)|(^\d{4})\-?(\d{4})\-?(\d{4})\-?(\d{4})$/;
  // expression for the email validation 
  var regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  document.getElementById("errors").innerHTML = formErrors;

  // validate all inputs based on regex patterns
  validateInputRegex(name, regexFirstName, "Please Enter a valid Name");
  validateInputRegex(email, regexEmail, "Please Enter a valid Email");
  validateInputRegex(
    creditcard,
    regexCreditCard,
    "Please Enter valid Credit Card Details"
  );
  validateInputRegex(expmonth, regexMonth, "Please Enter a valid Expiry Month");
  validateInputRegex(expyear, regexExpYear, "Please enter a valid Expiry year");

  if (formErrors) {
    document.getElementById("errors").innerHTML = formErrors;
  } else {
    getCartItems();
    receipt(name, email, creditcard);
    return false;
  }

  
  return false;
}

//input from the form submitted and cheks how many items are avilible 
 function getCartItems() {
  var jackets = document.getElementById("Jackets").value;
  var sweaters = document.getElementById("Sweaters").value;
  var gloves = document.getElementById("Gloves").value;
  var caps = document.getElementById("Caps").value;
  var Scarfs = document.getElementById("Scarfs").value;

  //validation for empty cart items 
  if (
    isNaN(jackets) ||
    isNaN(sweaters) ||
    isNaN(gloves) ||
    isNaN(caps) ||
    isNaN(Scarfs)
  ) {
    formErrors = "Please Enter a Valid Quantity";
    document.getElementById("errors").innerHTML = formErrors;

  } else {
    if (jackets > 0 || sweaters > 0 || gloves > 0 || caps > 0 || Scarfs > 0) {
      document.getElementById("errors").innerHTML = "";

     
      addRow("jackets", jackets, jacketCost); 
      addRow("sweaters", sweaters, sweaterCost); 
      addRow("gloves", gloves, glovesCost); 
      addRow("caps", caps, capCost); 
      addRow("Scarfs", Scarfs, scarfCost); 
    } else {
      formErrors = "Please Enter items in the Cart";
      document.getElementById("errors").innerHTML = formErrors;
    }

    return false;
  }
}

//adding new row to the table
function addRow(itemName, quantity, itemPrice) {
  if (quantity > 0) {
    var itemFound = false;
    var table = document.getElementById("receipt");
    var totalRows = table.getElementsByTagName("tr");

    //adding quantity to the existing item in the cart
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

    //  adding a new row
    if (!itemFound) {
      var row = table.insertRow(totalRows.length - 2);
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
function receipt(name, email, creditCard) {
  document.getElementById("nameValue").innerHTML = name;
  document.getElementById("emailValue").innerHTML = email;
  var creditCarkMasked =
    "xxx-xxxx-xxxx-" + creditCard.substring(creditCard.length - 4);
  document.getElementById("creditCardValue").innerHTML = creditCarkMasked;
  var table = document.getElementById("receipt");
  var totalRows = table.getElementsByTagName("tr");

  //calculating tax and total price
  if (totalRows.length) {
    var totalPrice = 0;
    for (i = 1; i < totalRows.length - 2; i++) {
      var priceCell = totalRows[i].getElementsByTagName("td")[3];
      var priceCellValue = parseInt(priceCell.innerText);
      totalPrice += priceCellValue;
    }
  }

  var donationValue = 0.1 * totalPrice;

  if (donationValue > 10) {
    totalCost = totalPrice + donationValue;
    document.getElementById("donationValue").innerHTML = donationValue;
  } else {
    totalCost = totalPrice + 10;
    document.getElementById("donationValue").innerHTML = 10;
  }
  document.getElementById("totalCost").innerHTML = totalCost;
}

//To validate the input with regex
function validateInputRegex(inputType, regexPattern, errorMessage) {
  if (!regexPattern.test(inputType)) {
    formErrors += `${errorMessage}<br>`; //Error message + <br>;
  }
}
