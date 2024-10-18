
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

    // create invoice
    doc.text("Invoice", 100, 10);
    doc.text(buisnessName, 100, 20);
    doc.text(buisnessAddress, 100, 30);     
    doc.text(buisnessPhone, 100, 40);
    doc.text(buisnessEmail, 100, 50);
    doc.text(buisnessInvoiceId, 100, 60);
    doc.text(buisnessBilledToName, 100, 70);
    doc.text(buisnessBilledToAddress, 100, 80);

    //open in a new tab
    var pdfBlob = doc.output("blob");

    // Create a URL for the Blob and open it in a new tab
    var blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, '_blank');
}
