'use strict'


const mongoose = require ('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, { useNewUrlParser: true },(err,res)=>{
if(err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
}
console.log('Conexion a db lista...')

app.listen(config.port, () => {
    console.log(`APi rest corriendo en localhost:${config.port}`)
})
})





