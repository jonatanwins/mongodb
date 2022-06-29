// NODE_ENV gets set by default by node
// if the environment is something different than production, say development, then we want to to access the variables in .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Imports express' module which we interact with through "app"
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// This utilizes our routing system which is configured in routes/index.js. 
const indexRouter = require('./routes/index')

// This renders ejs files to dynamic html
app.set('view engine', 'ejs')
// Specifies where to find "views", 
// __dirname is the local directory, e.g localhost://3000
app.set('views', __dirname + '/views')
// Here (in layout.ejs) we put the boilerplate code of html in order to clean up the rest of the code
app.set('layout', 'layouts/layout')
// this is the module that renders ejs files to html through express
app.use(expressLayouts)

app.use(express.static('public'))

// This is our database and we access it through DATABASE_URL which lies in .env
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
// db is the variable that lets us interact with mongodb
const db = mongoose.connection
db.on('error', error => cconsole.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

// the dotenv module which we'll install will enable us to have a .env file where we store the variable PORT,
// from there it can be changed easily depending on the system that runs the code.
app.listen(process.env.PORT || 3000)