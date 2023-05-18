// Adding the Quantity to Basket and validations
function addToBasket(itemName, itemPrice) 
{
  var itemQuantity = parseInt(prompt("Please Enter The Quantity of Flowers want to buy?"));
  // validating the number
  if (Number.isNaN(itemQuantity)) {
    alert("Please enter a Number");
  } else {
    if(itemQuantity==0){
      alert("Please enter a valid quantity !!")
    }
    else{
    Row_Append(itemName, itemQuantity, itemPrice);
    }
  }
}

//validating the name of the custamer
function Name_Validation(name) 
{
  var letters = /^[A-Za-z]+$/;
  return name.match(letters);
}

function order_summary()
{
  var username = prompt("Please Enter your Name").toUpperCase();

if (username.length > 0 && Name_Validation(username)) {

  //adding username to the receipt
    var userReceipt = document.getElementById("userReceipt");
    userReceipt.innerText = `${username}, Thank you for shopping with us. Shop Again With Ous !! Collect your flowers and Receipt at the counter`;



 // Receipt generation for the Custamer
    var finalInvoice = document.getElementById("finalInvoice");
    finalInvoice.style.visibility = "visible";
    finalInvoice.style.display = "block";
  } else {
    alert("Kindly enter a valid Name.");
  }
}

function Row_Append(itemName, quantity, itemPrice) {
  var found = false;
  var table = document
    .getElementsByTagName("table")[0]
    .getElementsByTagName("tbody")[0];
  var totalRows = table.getElementsByTagName("tr");

  //   adding quantity to the existing intem in the cart
  for (i = 0; i < totalRows.length; i++) {
    var firstCell = totalRows[i].getElementsByTagName("td")[0];
    if (firstCell.innerText == itemName) {
      found = true;
      var newQuantity =
        parseInt(totalRows[i].getElementsByTagName("td")[1].innerText) +
        quantity;
      var calculatedPrice = Number.parseFloat(newQuantity * itemPrice).toFixed(
        2
      );
      totalRows[i].getElementsByTagName("td")[1].innerHTML = newQuantity;
      totalRows[i].getElementsByTagName("td")[2].innerHTML = calculatedPrice;
    }
  }

  //  adding a new row
  if (!found) {
    var row = table.insertRow(totalRows.length);
    var newItemName = row.insertCell(0);
    var newQuantity = row.insertCell(1);
    var newPrice = row.insertCell(2);
    newItemName.innerHTML = itemName;
    newQuantity.innerHTML = quantity;
    newPrice.innerHTML = Number.parseFloat(quantity * itemPrice).toFixed(2);
  }

  //  calculating the finam ammouth with 13% GST
  
  if (totalRows.length) {
    var totalPrice = 0;
    for (i = 1; i < totalRows.length; i++) {
      var priceCell = totalRows[i].getElementsByTagName("td")[2];
      var priceCellValue = parseFloat(priceCell.innerText);
      totalPrice += priceCellValue;
    }
  }

  var addPrice = document.getElementById("totalPrice");
  addPrice.innerHTML = `<text style="font-style:italic;font-weight: bold;">Total  - $.</text>${Number.parseFloat(
    totalPrice
  ).toFixed(2)}`;
  var taxAmount = (13 / 100) * totalPrice;
  var taxDOMElement = document.getElementById("taxAmount");
  taxDOMElement.innerHTML = `<text style="font-style:italic;font-weight: bold;">GST(13%) - $.${Number.parseFloat(
    taxAmount
  ).toFixed(2)}`;

  var totalPayableAmount = totalPrice + taxAmount;
  var totalAmount = document.getElementById("totalAmount");
  totalAmount.innerHTML = `<text style="font-style:italic;font-weight: bold;">Total Payable after Taxes - $.${Number.parseFloat(
    totalPayableAmount
  ).toFixed(2)}`;

  if (totalPayableAmount) {
    var checkoutButton = document.getElementById("checkoutButton");
    checkoutButton.disabled = false;
  }
}