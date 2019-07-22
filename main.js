import {saveCustomer ,  getCustomer} from "./lib.js";

 getCustomer();
 //addingData();

document.forms[0].addEventListener("submit", async function submitform(e) {
  e.preventDefault();
    var firstname = document.querySelector("#firstname").value;
    var lastname = document.querySelector("#lastname").value;
    var emailid = document.querySelector("#emailid").value;
    var mobileno = document.querySelector("#mobileno").value;
    var fr=document.querySelector("#firstname_error");
    var er=document.querySelector("#emilid_error");
    var mr=document.querySelector("#mobileno_error");
        
        if(!isNaN(firstname)){
           fr.style.color="red";
           fr.textContent="provide valid username"; 
           return true;
        }
        else if(emailid==" "){
            er.style.color="red";
            er.textContent="provide email id";
             return true;
        }
        else if(isNaN(mobileno)||mobileno==" "){
            mr.style.color="red";
            mr.textContent="invalid mobileno";
          return true;
        }
      
    var body = { firstname,lastname,emailid,mobileno };
    console.log(body.value);
     let createdPost = await saveCustomer(body);
    let { id } = createdPost;
    let message = `Post save successfully with id ${id}`;
    alert(message);
    
  });