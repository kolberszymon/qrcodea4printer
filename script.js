const { jsPDF } = require("jspdf");
var QRCode = require("qrcode");

// Default export is a4 paper, portrait, using millimeters for units

const QR_SIZE_CM = 3;
const MARGIN_BETWEEN_CM = 0.4;

const HYGI_URL = "https://drhygi-hygicare.de/test/";

const getQrCode = async () => {
  let startId = 1;
  let endId = 2000;
  let qrCodeNumber = startId;

  let qrCodesOnPage = 24;

  const numberOfPages = Math.ceil((endId - startId + 1) / qrCodesOnPage);
  const qrCodesInWidth = 6;
  const qrCodesInHeight = 4;

  // Page loop
  for (let page = 1; page <= numberOfPages; page++) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "cm",
      format: "a4",
    });
    // y loop, so we're drawing by rows
    for (let y = 0; y < qrCodesInHeight; y++) {
      // x loop - rows
      for (let x = 0; x < qrCodesInWidth; x++) {
        // Creating qr code
        let qrCode = await QRCode.toDataURL(HYGI_URL + qrCodeNumber);

        // Inserting qrCode
        doc.addImage(
          qrCode,
          "JPEG",
          MARGIN_BETWEEN_CM + x * (QR_SIZE_CM + MARGIN_BETWEEN_CM),
          MARGIN_BETWEEN_CM + y * (QR_SIZE_CM + MARGIN_BETWEEN_CM),
          QR_SIZE_CM,
          QR_SIZE_CM
        );

        qrCodeNumber++;

        // If we reached desired id break the loop
        console.log(qrCodeNumber);
        if (qrCodeNumber === endId + 1) {
          break;
        }
      }

      if (qrCodeNumber === endId + 1) {
        break;
      }
    }
    // Save a page
    doc.save(`pdfs/qrCodes_page${page}.pdf`);
  }
};

getQrCode();
