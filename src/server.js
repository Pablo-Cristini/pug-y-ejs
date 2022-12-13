import express, { json, urlencoded } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Server as IOServer } from 'socket.io';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const expressServer =  app.listen(3000, () => {
    console.log("Escuchando puerto 3000")
})
const io = new IOServer(expressServer);
const messages = [];
const products = [];
//const data = JSON.parse(fs.readFileSync("./chat.txt", "utf-8"));
app.use(express.static(__dirname + '/public'));
io.on("connection", (socket) => {
    console.log(`New connection ${socket.id}`);
    socket.emit("server:message", messages);
    socket.on('client:message', (messageInfo) => {
        messages.push(messageInfo);
        io.emit('server:message', messages);
    })

    socket.emit("server:product", products);
    socket.on("product:info", (productInfo) => {
    products.push(productInfo);
    io.emit("server:product", products);
    })
});
app.use(json());
app.use(urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


//data.legth !== 0 &&
//  data.forEach((element) => {
//    messages.push(element);
// });
// fs.writeFileSync("./chat.txt", JSON.stringify(messages));