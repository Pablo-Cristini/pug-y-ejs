import { Router } from "express";

const router = Router()
const products = []

router.get('/', (req, res) => {
    res.render("form.ejs"); 
    //res.render("info.pug", {formPug});
})
router.post('/product', (req, res) => {
    const {name, price, thumbnail} = req.body;
    products.push({name, price, thumbnail})

    res.redirect('/')
})
router.get('/product', (req, res) => {
    res.render("products.ejs", {products});
    //res.render("info.pug", {products});
})


export default router;