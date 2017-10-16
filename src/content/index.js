import QR from "qrious";
import{qrOverlay} from "./elements";

chrome.runtime.onMessage.addListener((request) => {
    generateQR(request.text);
});

const generateQR = (value) => {

    if(typeof value !== "string") {
        throw "Invalid text";
    }

    const qr = new QR({
        value
    });

    const overlay = qrOverlay(qr.toDataURL());
    document.body.appendChild(overlay);
    overlay.scrollIntoView();

    const qrCodes = document.getElementsByClassName("sahajr-qr-popup");
    for(const qrCode of qrCodes) {
        qrCode.addEventListener('click', () => {
            qrCode.parentNode.removeChild(qrCode);
        });
    }
};

