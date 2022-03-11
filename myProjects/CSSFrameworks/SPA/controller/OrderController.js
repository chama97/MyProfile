
$("#btnCustomerSearch2").click(function () {
    var searchID = $("#InputCusId").val();
    var response = searchCustomer(searchID);
    if (response) {
        $("#InputCusId").val(response.getCustomerID());
        $("#InputCusName").val(response.getCustomerName());
        $("#InputCusAddress").val(response.getCustomerAddress());
        $("#InputCusContact").val(response.getCustomerPrice());
    }else{
        clearAll();
        alert("No Such a Customer");
    }
    $("#btnAddTocart").attr('disabled', true);
});

$("#btnItemSearch2").click(function () {
    var searchID = $("#InputItemCode").val();
    var response = searchItem(searchID);
    if (response) {
        $("#InputItemCode").val(response.getItemCode());
        $("#InputItemType").val(response.getItemType());
        $("#InputItemQtyHand").val(response.getItemQty());
        $("#InputItemPrice").val(response.getItemPrice());
    }else{
        clearAllItem();
        alert("No Such a Item");
    }
    $("#btnAddTocart").attr('disabled', false);
  });


$("#btnAddTocart").click(function () {
  saveOrder();
  loadAllOrderDetails();
  clearOrderDetails();
});


$("#btnClearOrder").click(function () {
  clearOrderDetails();
});


function saveOrder() {
  let itemID = $("#InputItemCode").val();
  let itemName = $("#InputItemType").val();
  let itemQty = $("#InputItemQtySale").val();
  let itemPrice = $("#InputItemPrice").val();
  let itemTotal = $("#InputItemPrice").val()*$("#InputItemQtySale").val();

  let i1= new Order(itemID,itemName,itemQty,itemPrice,itemTotal);
  orderDB.push(i1);
}

function loadAllOrderDetails() {
    $("#tblOrder").empty();
    for (var i of orderDB) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemType()}</td><td>${i.getItemQty()}</td><td>${i.getItemPrice()}</td><td>${i.getTotalPrice()}</td></tr>`;
        $("#tblOrder").append(row);
    }
}

function clearOrderDetails() {
  $('#InputItemCode,#InputItemType,#InputItemQtySale,#InputItemPrice,#InputItemQtyHand').val("");
  //$('#InputCusId,#InputCusName,#InputCusAddress,#InputCusContact').val("");
  $('#InputItemCode').focus();
  $("#btnAddTocart").attr('disabled', true);
}

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerID() == id) {
            return customerDB[i];
        }
    }
}

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].id == id) {
            return itemDB[i];
        }
    }
}
