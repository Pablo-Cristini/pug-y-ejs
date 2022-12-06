import express, { json, urlencoded } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// import routes from './routes/index.js';
import { Server as IOServer } from 'socket.io';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const expressServer =  app.listen(3000, () => {
    console.log("Escuchando puerto 3000")
})
const io = new IOServer(expressServer);
const messages = [];

app.use(express.static(__dirname + '/public'));
io.on("connection", (socket) => {
    console.log(`New connection ${socket.id}`);

    socket.emit("server:message", messages);

    socket.on('client:message', (messageInfo) => {
        messages.push(messageInfo);
        io.emit('server:message', messages);
    })
});
const products = [];


app.use(json());
app.use(urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Aun no se logueo el newConnection . min 30