
function genPDF() {
    //init jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    //get all the inputs
    var buisnessName = document.getElementById("buisness-name").value;
    var buisnessAddress = document.getElementById("buisness-address").value;
    var buisnessPhone = document.getElementById("buisness-phone").value;
    var buisnessEmail = document.getElementById("buisness-email").value;
    var buisnessInvoiceId = document.getElementById("buisness-invoive-id").value;
    var buisnessBilledToName = document.getElementById("buisness-billed-to-name").value;
    var buisnessBilledToAddress = document.getElementById("Address").value;

    //check if inputs are empty
    if (buisnessInvoiceId == "") {
        buisnessInvoiceId = Math.floor(Math.random() * 1000000000) + 1;
    }

    // create invoice
    doc.setFontSize(24);
    doc.text(buisnessName, 100, 10,null, null, "center");
    doc.setFontSize(12);
    doc.text("Invoice: " + buisnessInvoiceId, 10, 20);
    doc.setFontSize(14);
    doc.text("Billed From: ", 135, 20);
    doc.setFontSize(12);
    doc.text(buisnessAddress, 140, 30);     
    doc.text("Call:" + buisnessPhone, 140, 40);
    doc.text("Email:" + buisnessEmail, 140, 50);
    doc.setFontSize(14);
    doc.text("Billed to: ", 135, 60);
    doc.setFontSize(12);
    doc.text(buisnessBilledToName, 140, 70);
    doc.text(buisnessBilledToAddress, 140, 80);


    doc.setDrawColor(0, 0, 0); 
    doc.setLineWidth(1.5);          
    doc.line(10, 90, 200, 91); 


    //Get table items 
    const columns = ["Item", "Description", "Quantity", "Price/Unit", "Total"];
    const rows = null; // Faiz add code here for items
    //Table for items 
    doc.setFontSize(14);
    doc.text("Invoice Details", 20, 95 );
    doc.setFontSize(12);
    doc.autoTable({ head: [columns],
        body: rows,
        startY: 100,
        theme: 'grid', 
        headStyles: {
        fillColor: [0, 102, 204], 
        textColor: [255, 255, 255], 
        fontSize: 12,
        fontStyle: 'bold'
    },
        bodyStyles: {
        textColor: [0, 0, 0],  
        fontSize: 10
    },
        alternateRowStyles: {
        fillColor: [240, 240, 240]  
    },
        tableLineColor: [0, 0, 0], 
        tableLineWidth: 0.1            
    });
    //open in a new tab
    var pdfBlob = doc.output("blob");

    // Create a URL for the Blob and open it in a new tab
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
window.onload = loadFromLocalStorage;
