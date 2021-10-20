const express=require('express')
const app=express()

const hbs=require('hbs')
const path = require('path')

const userRoutes=require('../routes/userRoutes')

app.set('view engine','hbs')

app.use(express.static(path.join(__dirname,'../public')))
app.set('views',path.join(__dirname,'../frontend/views'))
hbs.registerPartials(path.join(__dirname,"../frontend/layouts"))

app.use(express.urlencoded())
app.use(userRoutes)

module.exports=app