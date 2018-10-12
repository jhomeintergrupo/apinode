'use strict'

const express = require ('express')
const bodyparser = require ('body-parser')
const app = express()
const  productCtrl = require ('./controllers/product')
const auth = require('./middlewares/auth')
const userCtrl = require('./controllers/user')
const hbs = require('express-handlebars')

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.get ('/api/product', auth, productCtrl.getProducts)
app.get ('/api/product/:productID', productCtrl.getProduct)
app.post ('/api/product/', productCtrl.saveProduct)
app.put ('/api/product/:productID', productCtrl.updateProduct)
app.delete ('/api/product/:productID', productCtrl.deleteProduct)

app.post('/api/signup', userCtrl.signUp)
app.post('/api/signin', userCtrl.signIn)

app.get('/api/private', auth, (req, res) => {
res.status(200).send({message:'Tienes acceso'})
})

app.get('/login', (req, res) => {
   res.render('login')   
})

app.get('/', (req, res) => {
    res.render('product')
  })

module.exports = app