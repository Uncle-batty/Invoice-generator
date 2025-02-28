let globalRows = [];
let sum = 0;



document.addEventListener("DOMContentLoaded", function() {
    let logoImg = document.getElementById("preview-business-logo");
    let logoImgFile = document.getElementById("business-logo-file");

    logoImgFile.onchange = function() {
        logoImg.src = URL.createObjectURL(logoImgFile.files[0]);
    }
});


/**
 * Add a new item to the globalRows array and update the table display.
 * This function retrieves the item details from input fields, validates them,
 * calculates the total amount, and then updates the globalRows array and
 * the table display with the new item.
 *
 * @param {void} This function does not take any parameters.
 * @returns {void} This function does not return anything.
 */
function addItems() {
    var itemName = document.getElementById("item-name").value;
    var itemDescription = document.getElementById("item-description").value;
    var itemQuantity = parseInt(document.getElementById("item-quantity").value) || 0;
    var itemUnitPrice = parseFloat(document.getElementById("item-unit-price").value) || 0;
    var itemAmount = itemQuantity * itemUnitPrice;

    // Validate input fields and exit the function if any are invalid or missing
    if (!itemName || !itemDescription || !itemQuantity || !itemUnitPrice || itemQuantity <= 0 || itemUnitPrice <= 0 || itemAmount <= 0) {
        alert("Please fill out all required fields and ensure quantity and unit price are positive numbers.");
        return;
    }

    // Update the total sum and the globalRows array
    sum += itemAmount;

    let itemsDictionary = [
        itemName,
        itemDescription,
        itemQuantity,
        itemUnitPrice.toFixed(2),
        itemAmount.toFixed(2)
    ];

    globalRows.push(itemsDictionary);
    displayTable(globalRows);

    // Clear input fields for the next item
    clearInputs();
}

//function to add empty rows
function  emptyRows(eRows, eCells) {
    var tableBody = document.querySelector("#item-table tbody");

    for(let i = 0; i < eRows; i++) {
        let newRow = tableBody.insertRow();
        
        for(let j = 0; j < eCells; j++) {
            newRow.insertCell();
        }
    }
}

function displayTable(dictionary) {
    var tableBody  = document.querySelector("#item-table tbody");
    tableBody.innerHTML = ""; // Clear existing table before adding new rows

    dictionary.forEach(row => {
        let newRow = tableBody .insertRow(); // Create a new row
        
        row.forEach(cell => {
            let newCell = newRow.insertCell(); // Create a new cell
            newCell.textContent = cell; // Set the cell text
        });
    });
}
function clearInputs() {
    //https://bobbyhadz.com/blog/javascript-clear-input-field-after-submit
    const itemName = document.getElementById("item-name");
    const itemDescription = document.getElementById("item-description");
    const itemQuantity = document.getElementById("item-quantity");
    const itemUnitPrice = document.getElementById("item-unit-price");

    itemName.value = "";
    itemDescription.value ="";
    itemQuantity.value = "";
    itemUnitPrice.value = "";
}

/**
 * Generates a PDF invoice based on the provided business and customer details.
 * If a business logo is uploaded, it will be incorporated into the invoice.
 * If no invoice ID is provided, a random one will be generated.
 *
 * @param {Object} doc - The jsPDF object for generating the invoice.
 * @param {string} imgData - The base64 encoded image data for the business logo.
 * @param {string} businessName - The name of the business.
 * @param {string} businessAddress - The address of the business.
 * @param {string} businessPhone - The phone number of the business.
 * @param {string} businessEmail - The email of the business.
 * @param {string} businessInvoiceId - The ID of the invoice.
 * @param {string} businessBilledToName - The name of the person/business being billed.
 * @param {string} businessBilledToAddress - The address of the person/business being billed.
 * @returns {void} - This function does not return a value. It opens the generated PDF in a new tab.
 */
function genPDF() {
    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get all inputs
    var businessName = document.getElementById("business-name").value;
    var businessAddress = document.getElementById("business-address").value;
    var businessPhone = document.getElementById("business-phone").value;
    var businessEmail = document.getElementById("business-email").value;
    var businessInvoiceId = document.getElementById("invoice-number").value;
    var businessBilledToName = document.getElementById("buisness-billed-to-name").value;
    var businessBilledToAddress = document.getElementById("Address").value;
    var vatAmount = document.getElementById("vat-amount").value;
    var vatNumber = document.getElementById("vat-number").value;

    // Generate invoice ID if empty
    if (businessInvoiceId == "") {
        businessInvoiceId = Math.floor(Math.random() * 1000000000) + 1;
    }

    // Check if logo is uploaded
    let logoImg = document.getElementById("preview-business-logo");
    if (logoImg.src && logoImg.src.startsWith("blob")) {
        let img = new Image();
        img.src = logoImg.src;
        img.onload = function () {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            // Set the canvas size to match the image
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            let imgData = canvas.toDataURL("image/png");

            // Generate the invoice after loading the logo
            generateInvoice(doc, imgData, businessName, businessInvoiceId, businessAddress, businessPhone, businessEmail, businessBilledToName, businessBilledToAddress, vatAmount, vatNumber);
        }
    } else {
        generateInvoice(doc, null, businessName, businessInvoiceId, businessAddress, businessPhone, businessEmail, businessBilledToName, businessBilledToAddress, vatAmount, vatNumber);
    }
}


/**
 * Generates an invoice using provided details and opens it in a new tab.
 *
 * @param {Object} doc - The jsPDF object for generating the invoice.
 * @param {string} imgData - The base64 encoded image data for the business logo.
 * @param {string} businessName - The name of the business.
 * @param {string} businessInvoiceId - The ID of the invoice.
 * @param {string} businessAddress - The address of the business.
 * @param {string} businessPhone - The phone number of the business.
 * @param {string} businessEmail - The email of the business.
 * @param {string} businessBilledToName - The name of the person/business being billed.
 * @param {string} businessBilledToAddress - The address of the person/business being billed.
 * @returns {void}
 */
function generateInvoice(doc, imgData, businessName, businessInvoiceId, businessAddress, businessPhone, businessEmail, businessBilledToName, businessBilledToAddress, vatAmount, vatNumber) {
    // Create invoice header
    doc.setFontSize(24);
    doc.text(businessName, 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text("Invoice: " + businessInvoiceId, 10, 35); // Invoice number
    doc.text("VAT Number: " + vatNumber, 10, 45); //(10,45) is the x and y axis

    // If there is a logo, add it under invoice number and next to business details
    if (imgData) {
        doc.addImage(imgData, "PNG", 35, 50, 50, 50); // Logo on the left under invoice ID
    }

    // Business details on the right side
    doc.setFontSize(14);
    doc.text("Billed From: ", 135, 45);
    doc.setFontSize(12);
    doc.text(businessAddress, 140, 55);
    doc.text("Call: " + businessPhone, 140, 65);
    doc.text("Email: " + businessEmail, 140, 75);

    // Billed To section
    doc.setFontSize(14);
    doc.text("Billed to: ", 135, 90);
    doc.setFontSize(12);
    doc.text(businessBilledToName, 140, 100);
    doc.text(businessBilledToAddress, 140, 110);

    // Draw a separator line
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1.5);
    doc.line(10, 120, 200, 121);
     vatPercentage = vatAmount
     vatAmount = sum *(vatAmount/100)
     subtotal = sum 
     sum = subtotal + vatAmount
    // Table for items
    const columns = ["Item", "Description", "Quantity", "Price/Unit", "Total"];
    const rows = globalRows;
    doc.setFontSize(14);
    doc.text("Invoice Details", 20, 125);
    doc.setFontSize(12);
    doc.autoTable({
        head: [columns],
        body: rows,
        foot: [["", "", "", "Subtotal:", subtotal],
        ["", "", "", "VAT (" + vatPercentage + "%):", vatAmount],
        ["", "", "", "Grand Total:", sum]],
        startY: 130,
        theme: 'grid',
        headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255], fontSize: 12, fontStyle: 'bold' },
        bodyStyles: { textColor: [0, 0, 0], fontSize: 10 },
        alternateRowStyles: { fillColor: [240, 240, 240] },
        tableLineColor: [0, 0, 0],
        tableLineWidth: 0.1,
        footStyles: { fontStyle: 'bold', textColor: [0, 0, 0], fillColor: [200, 200, 200] } 
    });

    // Open PDF in a new tab
    var pdfBlob = doc.output("blob");
    var blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, '_blank');
}



function localsave() {
    //get all the inputs
    var buisnessName = document.getElementById("buisness-name").value;
    var buisnessAddress = document.getElementById("buisness-address").value;
    var buisnessPhone = document.getElementById("buisness-phone").value;
    var buisnessEmail = document.getElementById("buisness-email").value;
    var buisnessInvoiceId = document.getElementById("buisness-invoive-id").value;
    var buisnessBilledToName = document.getElementById("buisness-billed-to-name").value;
    var buisnessBilledToAddress = document.getElementById("Address").value;
    localStorage.setItem("buisnessName", buisnessName);
    localStorage.setItem("buisnessAddress", buisnessAddress);
    localStorage.setItem("buisnessPhone", buisnessPhone);
    localStorage.setItem("buisnessEmail", buisnessEmail);
    localStorage.setItem("buisnessInvoiceId", buisnessInvoiceId);
    localStorage.setItem("buisnessBilledToName", buisnessBilledToName);
    localStorage.setItem("buisnessBilledToAddress", buisnessBilledToAddress);
}

function loadFromLocalStorage() {
    // Get the saved values from localStorage
    var buisnessName = localStorage.getItem("buisnessName");
    var buisnessAddress = localStorage.getItem("buisnessAddress");
    var buisnessPhone = localStorage.getItem("buisnessPhone");
    var buisnessEmail = localStorage.getItem("buisnessEmail");
    var buisnessInvoiceId = localStorage.getItem("buisnessInvoiceId");
    var buisnessBilledToName = localStorage.getItem("buisnessBilledToName");
    var buisnessBilledToAddress = localStorage.getItem("buisnessBilledToAddress");

    // Set the input values to the retrieved data if they exist
    if (buisnessName) document.getElementById("buisness-name").value = buisnessName;
    if (buisnessAddress) document.getElementById("buisness-address").value = buisnessAddress;
    if (buisnessPhone) document.getElementById("buisness-phone").value = buisnessPhone;
    if (buisnessEmail) document.getElementById("buisness-email").value = buisnessEmail;
    if (buisnessInvoiceId) document.getElementById("buisness-invoive-id").value = buisnessInvoiceId + 1;
    if (buisnessBilledToName) document.getElementById("buisness-billed-to-name").value = buisnessBilledToName;
    if (buisnessBilledToAddress) document.getElementById("Address").value = buisnessBilledToAddress;


}

// Call this function on page load to automatically populate the fields

//functions for page loading
function loadPageContents() {
    loadFromLocalStorage();
    emptyRows(1,5)
}
window.addEventListener("load", loadPageContents)
