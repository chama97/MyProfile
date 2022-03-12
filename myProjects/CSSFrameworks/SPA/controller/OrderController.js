
$("#btnCustomerSearch2").click(function () {
    var searchID = $("#InputCusId").val();
    var response = searchCustomer(searchID);
    if (response) {
        $("#InputCusId").val(response.getCustomerID());
        $("#InputCusName").val(response.getCustomerName());
        $("#InputCusAddress").val(response.getCustomerAddress());
        $("#InputCusContact").val(response.getCustomerContact());
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
});


$("#btnClearOrder").click(function () {
  clearOrderDetails();
});


let tempTotal = 0;
function saveOrder() {
    let itemTotal = $("#InputItemPrice").val()*$("#InputItemQtySale").val();
    tempTotal+=itemTotal;
    let cartRow = `<tr><td>${$("#InputItemCode").val()}</td><td>${$("#InputItemType").val()}</td><td>${$("#InputItemQtySale").val()}</td><td>${$("#InputItemPrice").val()}</td><td>${itemTotal}</td></tr>`;
    $("#tblOrder").append(cartRow);
    $("#orderPrice").val(tempTotal+'/=');
    
    let qtyOnHand=$("#InputItemQtyHand").val()-$("#InputItemQtySale").val();
    $("#InputItemQtyHand").val(qtyOnHand);
    let qtyIndex=isItemExists($("#InputItemCode").val());
    if(qtyIndex!=-1){
        itemDB[qtyIndex].setItemQty(qtyOnHand);
        loadAllItems();
        return;
    }
}

let balance = 0;
function calculateBalance() {
    let discount = $("#orderDiscount").val();
    let profit = tempTotal*discount/100;
    balance = tempTotal-profit;
    $("#orderBalance").val(balance+'/=');
}

$("#orderDiscount").on('keyup', function (eventOb) {
    if (eventOb.key == "Enter") {
      calculateBalance();
    }
});

generateOid ();

let tempId = O-001;
function generateOid (){
    tempId=tempId+1;
    $("#orderId").val(tempId+'/='); 

    if (tempId<9){
        return "O-00"+tempId;
    }else{
        return "O-0"+tempId;
    }
}

$("#btnPlaceOrder").click(function () {
    if($("#orderId").val()!=''&&$("#InputCusId").val()!=''&&$("#orderDate").val()!=''&&$("#orderBalance").val()!=''){
        let orderId = $("#orderId").val();
        let custId = $("#InputCusId").val();
        let orderDate = $("#orderDate").val();
        let orderPrice = $("#orderBalance").val();
        if(isOrderExists(orderId)){
            alert("Order_ID Already Exists");
            return;
        }
        
        let o1=new Order(orderId,custId,orderDate,orderPrice);
        orderDB.push(o1);
        alert("Order placed success");
        //generateOid ();
        
    }
    else{
        alert("Please Insert Correct Data..");
        return;
    }
});


function clearOrderDetails() {
  $('#InputItemCode,#InputItemType,#InputItemQtySale,#InputItemPrice,#InputItemQtyHand').val("");
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
        if (itemDB[i].getItemCode() == id) {
            return itemDB[i];
        }
    }
}

function isOrderExists(id){
    let x=-1;
    for(let i=0;i<orderDB.length;i++){
        if(orderDB[i].getItemCode() == id) {
            x = i;
        }
    }
    return x;
}

function isItemExists(id){
    let x=-1;
    for(let i=0;i<itemDB.length;i++){
        if(itemDB[i].getItemCode()==id) {
            x = i;
        }
    }
    return x;
}
