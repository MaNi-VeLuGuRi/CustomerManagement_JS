import config from "./config.js";
 
export function saveCustomer(post) {
 return fetch(`${config.endpoint}/customers`, {
 method: "POST",
 body: JSON.stringify(post),
 headers: {
 "Content-Type": "application/json"
 }
 }).then(res => res.json());
 }
 
 export function getCustomer() {
 fetch(`${config.endpoint}/customers`)
 .then(function (response) {
 return response.json();
 })
 .then(function (data) {
 addingData(data);
 });
 
  function addingData(data) {
 //extract the headers and save in col array
 var col = [];
 for (var i = 0; i < data.length; i++) {
 for (var key in data[i]) {
 if (col.indexOf(key) === -1) {
 col.push(key);
 }
 }
 }
 col.push("Actions");
 // to create dynamic table
 var table = document.createElement("table");
 table.setAttribute('id', 'table');
 
 // to create table header using col array
 
 var tr = table.insertRow(-1); 
 
 for (var i = 0; i < col.length; i++) {
 var th = document.createElement("th"); //for table header
 th.innerHTML = col[i];
 
 tr.appendChild(th);
 
 }
 if (data.length==null){
     console.log(data)
 var th = document.createElement("th"); 
 th.innerHTML="DELETE";
 tr.appendChild(th);
 }
 // ADD JSON DATA TO THE TABLE AS ROWS.
 for (var i = 0; i < data.length; i++) {
 
 tr = table.insertRow(-1);
 
 for (var j = 0; j < col.length-1; j++) {
 var tabCell = tr.insertCell(-1);
 tabCell.innerHTML = data[i][col[j]];
 
 
 }
 var cell = tr.insertCell(-1);
 var btnRemove = document.createElement("input");
 btnRemove.type = "button";
 btnRemove.value = " X ";
 
 btnRemove.onclick= function() {
 var emptab = document.getElementById('table');
console.log("printing"+this.parentNode.parentNode.rowIndex);
 var delv= this.parentNode.parentNode.rowIndex;
 
 console.log(data[delv-1].id)
 
 var delid=data[delv-1].id;
 
 console.log(data)
 
 if(confirm("Do you want to delete")){
    emptab.deleteRow(this.parentNode.parentNode.rowIndex); 
 
    console.log(`${config.endpoint}/customers/${delid}`)
    
    return fetch(`${config.endpoint}/customers/${delid}` , {
    method: 'delete'
    }) .then(r=> r.json())   
 }
 }
 cell.appendChild(btnRemove); 
 
}
 // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
 var divContainer = document.getElementById("showData");
 divContainer.innerHTML = "";
 divContainer.appendChild(table);
 }
 }