// Author- Shobhit Preetam Sahoo
// Global query selectors
const row = document.querySelector('.table__body');
const navLeft = document.querySelector(".nav__left");
const navRight = document.querySelector(".nav__right");
const addBtn = document.querySelector('.add');
const editBtn = document.querySelector('.edit')
const deleteBtn = document.querySelector('.delete');

// Function to check all the checkbox elements
const checkAll = (el) => {
    for (let i = 0; i < el.length; i++) {
      el[i].checked = true;
      el[i].parentElement.parentElement.classList.remove("even");
      el[i].parentElement.parentElement.classList.toggle("checkBG");
    }
};
  
// Function to uncheck all checkboxes
const uncheckAll = (el) => {
    for (let i = 0; i < el.length; i++) {
      el[i].checked = false;
      el[i].parentElement.parentElement.classList.remove("checkBG");
      if (i % 2 !== 0) el[i].parentElement.parentElement.classList.add("even");
    }
};
  
// Function to check a single checkbox
const checkThis = (el) => {
    el.parentElement.parentElement.classList.remove("even");
    el.parentElement.parentElement.classList.toggle("checkBG");
};
  
// Function to uncheck single checkbox
const unCheckThis = (el) => {
    el.parentElement.parentElement.classList.add("even");
    el.parentElement.parentElement.classList.remove("checkBG");
};


// This function will check activity of checkboxes and accordingly the buttons will be activated.

const checkBtnsActivity = () => {
	
	// If only 1 checkbox is selected, then add will be disabled whereas edit and delete will be enabled.
	if(arr.length === 1){
		addBtn.classList.remove('btn__enabled');
		editBtn.classList.remove('btn__disabled');
		deleteBtn.classList.remove('btn__disabled');

		addBtn.classList.add('btn__disabled');
		editBtn.classList.add('btn__enabled');
		deleteBtn.classList.add('btn__enabled');
	}
	// If more than 1 checkboxes are selected, then add and edit will be disabled whereas delete will be enabled.
	else if(arr.length >= 2) {
		addBtn.classList.remove('btn__enabled');
		editBtn.classList.remove('btn__enabled');
		deleteBtn.classList.remove('btn__disabled');
		
		addBtn.classList.add('btn__disabled');
		editBtn.classList.add('btn__disabled');
		deleteBtn.classList.add('btn__enabled');
	}
	// If none of the checkbox is selected, then add will be enabled whereas edit and delete will be disabled.
	else if(arr.length===0) {
		addBtn.classList.remove('btn__disabled');
		editBtn.classList.remove('btn__enabled');
		deleteBtn.classList.remove('btn__enabled');

		addBtn.classList.add('btn__enabled');
		editBtn.classList.add('btn__disabled');
		deleteBtn.classList.add('btn__disabled');
	}
}

let arr = [];

// This function will keep checking for checkboxes, everytime they will be checked.
// This function keeps running every half a second and stores the checked checkbox elements in global array arr which is used later.
window.setInterval(function() {
	arr = [...document.querySelectorAll("input[type='checkbox']:checked")];
	checkBtnsActivity();
	//checkDeleteEvent();
}, 500);

// Declaring the page number variable. On page load its set to 1 as its the first page.
let PAGE_NO = 1;

// Function to check late payments
const checkDelay = (days) => {
	if (days > 0)
		return `style="color: #FF5B5B;"`
	else
		return ``;
}

// Function for rendering JSON data in table.
const renderData = (data, start, end) => {
    
    for(let i = start; i < end; i++) {
		
		let xx = checkDelay(data[i].delay);
		
		// created the markup that needs to be inserted to the table.
        const tr_markup = `<tr>
	                        <td><input type="checkbox" class="checkbox"></td>
	                        <td class="data__row C_name">${data[i].name_customer}</td>
	                        <td class="data__row">${data[i].cust_number}</td>
	                        <td class="data__row">${data[i].invoice_id}</td>
	                        <td class="data__row">${data[i].total_open_amount+"K"}</td>
	                        <td class="data__row" ${xx}>${data[i].due_date_pd}</td>
	                        <td class="data__row">${(data[i].pred_payment_date)?data[i].pred_payment_date:"- -"}</td>
	                        <td class="data__row">Lorem Ipsum dolor...</td>
	                        </tr>`
    
        let tr = document.createElement('tr');
		tr.setAttribute("id", `row_${data[i].id}`);
        tr.innerHTML = tr_markup;
    	if(i%2 != 0) 
            tr.classList.add('even');
        row.appendChild(tr);
   	}	//End of loop

    const checkbox = document.querySelector(".checkbox__main");
    const all_checkbox = document.querySelectorAll(".checkbox");

    // Event listener for main checkbox
    checkbox.addEventListener("change", function () {
        if (this.checked)
            checkAll(all_checkbox);
        else 
            uncheckAll(all_checkbox);
    });
    // Event listener for single checkbox when checked
    for (let i = 0; i < all_checkbox.length; i++) {
        all_checkbox[i].addEventListener("change", function () {
            if (all_checkbox[i].checked == true)
            	checkThis(all_checkbox[i]);
            else {
            	if (i % 2 !== 0) 
					unCheckThis(all_checkbox[i]);
            	else
            		all_checkbox[i].parentElement.parentElement.classList.remove("checkBG");
            }
        });
    }

	editBtn.classList.remove('btn__enabled');
	addBtn.classList.remove('btn__disabled');			
	deleteBtn.classList.remove('btn__enabled');
}

// Snackbar function
const showSnackbar = (message, status) => {
	document.querySelector('.data').innerHTML = "";
	let error = `<div class="snackbars">
                <img src="./images/error.svg" alt="error" class="sb__icon">
                <p class="sb__header">
                    ${message}
                </p>
                <p class="sb__desc">
                    Invoice Id you are searching for is not found.
                </p>
                <p class="sb__footer">
                    Please check the invoice id again.
                </p>
            	</div>`;
	let success = `<div class="snackbars">
				<img src="./images/success.svg" alt="success" class="sb__icon">
                <p class="sb__header">
                    ${message}
                </p>
				<p class="sb__desc">
                    Please wait, while we redirect you.
                </p>
            	</div>`;
	if(status == "error")
		document.querySelector('.data').innerHTML = error;
	else if (status == "Success") 
		document.querySelector('.data').innerHTML = success;			
		
	document.querySelector('.snackbars').style.visibility = "visible";	
	setTimeout( function() {
		window.location.replace('http://localhost:8080/H2HBABBA1626/');
	}, 4000);

}

// Fetches the JSON data for pagination
const getPageData = (start, amt) => {
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", `http://localhost:8080/H2HBABBA1626/Page.do?start=${start}&amt=${amt}`, false);
	xhttp.send();
	let data = xhttp.responseText;
	data = JSON.parse(data);

	renderData(data, 0, 10);
}

// Event listener for right page or next page
navRight.addEventListener('click', () => {
    // render next 10 data, page number ++
    document.querySelector('.table__body').innerHTML = "";
    PAGE_NO++;
    //console.log(PAGE_NO);
    let start = (PAGE_NO - 1) * 10;
	const amt = 10;
	getPageData(start, amt);
    
    if(PAGE_NO === 1)
        document.querySelector('.nav__left').style.backgroundColor = "#39495E";
	
	if(PAGE_NO >= 2) 
		document.querySelector('.nav__left').style.backgroundColor = "#14AFF1";    
  
});

// Event listener for left page or previous page
navLeft.addEventListener('click', () => {
    if(PAGE_NO >= 2) {
        PAGE_NO--;
		document.querySelector('.nav__left').style.backgroundColor = "#14AFF1";    
    }

    if(PAGE_NO === 1)
        document.querySelector('.nav__left').style.backgroundColor = "#39495E";

    document.querySelector('.table__body').innerHTML = "";
    let start = (PAGE_NO - 1) * 10;
	const amt = 10;
	getPageData(start, amt);
});

// Event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    document.querySelector('.table__body').innerHTML = "";
	getPageData(0, 10);
});


// Event listener for delete button
deleteBtn.addEventListener('click', () => {
    let id= [];
    for(let i = 0; i < arr.length; i++) {
        let temp = arr[i].parentNode.parentNode.id;
        temp = temp.split("_")[1];
        id.push(temp);
    }

	if(id.length === 11)
		id.shift();
	
	// Event listener when the confirmation delete button is pressed
    document.querySelector(".btn__delete").addEventListener('click', () => {
        let acknow = [];
        for(let i = 0; i < id.length; i++) {
            const xhttp = new XMLHttpRequest();
            xhttp.open("GET", `http://localhost:8080/H2HBABBA1626/Delete.do?id=${id[i]}`, false);
            xhttp.send();
            let data = xhttp.responseText;
            data = JSON.parse(data);
			if(data == "Success")
            	acknow.push(data);
        }
        if (acknow.length == id.length) {
			showSnackbar("Data deleted successfully", "Success");
			document.querySelector('.modal__delete').parentElement.style.visibility = "hidden";
			document.querySelector('.modal__delete').parentElement.style.opacity = 0;
        }
    });		// End of btn__delete event listener
});			// End of delete modal event listener


// Event listeners for edit button
editBtn.addEventListener('click', () => {
    let id;
    for(let i = 0; i < arr.length; i++) {
        let temp = arr[i].parentNode.parentNode.id;
        id = temp.split("_")[1];
    }
	let p = document.querySelector(".checkBG").children[4].textContent;
	document.getElementById("editInvoice").setAttribute("placeholder", p);

	// Event listener when user hits save button
    document.querySelector(".btn__save").addEventListener('click', () => {
		let amount = document.getElementById("editInvoice").value/1000;
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", `http://localhost:8080/H2HBABBA1626/Edit.do?amt=${amount}&id=${id}`, false);
        xhttp.send();
        let data = xhttp.responseText;
        data = JSON.parse(data);
			
        if (data == "Success") {
			showSnackbar("Data updated successfully", data);
			document.querySelector('.modal__edit').parentElement.style.visibility = "hidden";
			document.querySelector('.modal__edit').parentElement.style.opacity = 0;
        }
    });		// End of btn__edit event listener
});			// End of edit modal event listener


// Event listener when data is submitted in add modal
document.querySelector(".btn__add").addEventListener('click', () => {
		
	const C_name = document.getElementById("C_name").value;
	const C_number = document.getElementById("C_number").value;
	const I_number = document.getElementById("I_number").value;
	const I_amount = document.getElementById("I_amount").value;
	const dueDate = document.getElementById("dueDate").value;
		
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", `http://localhost:8080/H2HBABBA1626/Add.do?cust_name=${C_name}&cust_no=${C_number}&invoice_id=${I_number}&total_amt=${I_amount/1000}&due=${dueDate}`, false);
        xhttp.send();
        let data = xhttp.responseText;
        data = JSON.parse(data);
			
        if (data == "Success") {
            showSnackbar("Data added successfully", data);
			document.querySelector('.modal__add').parentElement.style.visibility = "hidden";
			document.querySelector('.modal__add').parentElement.style.opacity = 0;
        }
});		// End of btn__add event listener


// Event listener for search bar
document.querySelector(".search__icon").addEventListener('click', () => {
	const iID = document.querySelector(".search__input").value;
	if(iID){
	    document.querySelector('.table__body').innerHTML = "";
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", `http://localhost:8080/H2HBABBA1626/Search.do?invoice_id=${iID}`, false);
		xhttp.send();
		let data = xhttp.responseText;
		data = JSON.parse(data);
		if(data.length === 1)
			renderData(data, 0, 1);
		else
			showSnackbar("No result found!", "error");		
	}
	document.querySelector(".nav__left").style.display = "none";
	document.querySelector(".nav__right").style.display = "none";
});

// Event listener for reset button in edit modal
document.querySelector(".btn__reset").addEventListener('click', ()=> {
	document.getElementById("editInvoice").value = "";
	document.querySelector(".edit_form_note").value = "";
});

// Event listener for clear button in add modal
document.querySelector(".btn__clear").addEventListener('click', ()=> {
	document.getElementById("C_name").value = "";
	document.getElementById("C_number").value = "";
	document.getElementById("I_number").value = "";
	document.getElementById("I_amount").value = "";
	document.getElementById("dueDate").value = "";
	document.querySelector(".add_form_note").value = "";
});


