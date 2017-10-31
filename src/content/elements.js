const qrOverlay = (imageData) => {

    const parent = document.createElement("div");
    Object.assign(parent.style, {
        zIndex: 9999,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.8)",
        position: "absolute",
        top: 0,
        left:  0,
        alignItems: "center",
        justifyContent: "center",
        display: "flex"
    });
    parent.setAttribute("class", "sahajr-qr-popup");

    const image = document.createElement("img");
    Object.assign(image.style, {
        width: "400px",
        height: "400px",
        border: "5px solid white"
    });
    image.setAttribute("src", imageData);

    parent.appendChild(image);

    return parent;
};

export {qrOverlay};
