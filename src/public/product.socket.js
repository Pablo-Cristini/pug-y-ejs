const socket = io();

const productForm = document.getElementById('productForm');
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productThumbnail = document.getElementById("productThumbnail");
const productsPool = document.getElementById("productsPool");

const sendProduct = (productInfo) => {
    socket.emit("product:info", productInfo);
};

    const renderProduct = (productData) => {
        const html = productData.map((productInfo) => {
            console.log(productInfo);
            return `<li>
                    <span>${productInfo.title}</span>
                    <span>${productInfo.price}</span>
                    <img src=${productThumbnail.thumbnail} />
                    </li>`;
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
        }
        productForm.addEventListener("submit", submitEventHandler);

    socket.on("server:product", renderProduct)