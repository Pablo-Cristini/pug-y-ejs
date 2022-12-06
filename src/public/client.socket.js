const socket = io();
const messageForm = document.getElementById("messageForm");
const usernameInput = document.getElementById("usernameInput");
const messageInput = document.getElementById("messageInput");
const messagesPool = document.getElementById("messagesPool");

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productThumbnail = document.getElementById("productThumbnail");
const productsPool = document.getElementById("productsPool");

//------------------//---------------------//----------------------//-----------------//
const sendMessage = (messageInfo) => {

socket.emit("client:message", messageInfo);
};

const renderMessage = (messagesData) => {
const html = messagesData.map((messageInfo) => {
    return `<div> <strong>${messageInfo.username}</strong> <em>${messageInfo.message}</em> </div>`;
});
messagesPool.innerHTML = html.join(" ");
};

const submitHandler = (event) => {
event.preventDefault();

const messageInfo = {username: usernameInput.value, message: messageInput.value,
};
sendMessage(messageInfo);

messageInput.value = "";
usernameInput.readOnly = true;
};

messageForm.addEventListener("submit", submitHandler);

socket.on("server:message", renderMessage);


//---------------------//----------------------//--------------------//------------------//

const sendProduct = (productInfo) => {

    socket.emit("product:message", productInfo);
    };
    
    const renderProduct = (productData) => {
    const html = productData.map((productInfo) => {
        return `<div> <strong>${productInfo.productName}</strong> <em>${productInfo.message}</em> </div>`;
    });
    productsPool.innerHTML = html.join(" ");
    };
    const submitEventHandler = (event) => {
        event.preventDefault();
        const productInfo = {
            title: productName.value,
            price: productPrice.value,
            thumbnail: productThumbnail.value,
        };
        sendProduct(productInfo);
        productForm.reset();
    }

    productForm.addEventListener("submit", submitEventHandler);

    socket.on("server:product",renderProduct)