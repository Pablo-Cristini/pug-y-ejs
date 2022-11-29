import express, {json, urlencoded} from 'express';
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import routes from './routes/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(json());
app.use(urlencoded({extended: true}));
//app.set('views', __dirname + './views');
//app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/', routes);

app.listen(3000, () => {
    console.log("Escuchando puerto 3000")
})