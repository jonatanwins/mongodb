// This file is our controller, it handles the routing for our app
const express = require('express')
const router = express.Router()

// when at the root "/", render the response index, which refers to index.ejs in "views"
router.get('/', (req, res) => {
   res.render('index') 
})

// this export enables us to import our router from server.js
module.exports = router