const express = require('express')
const { restart } = require('nodemon')
const router = express.Router()
const Author = require('../models/author')

// All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        // we can access name of an empty object
        // What is RegExp?
        // 'i' makes the query case INsensitive
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        // find is a fuction from mongoose
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query    
        })
    } catch {
        res.redirect('/')
    }
    res.render('authors/index')
})

// New author route
router.get('/new', (req, res) => {
    //this passes down an Author object dont access we can use to add an author to our database later on.
    // Make sure to call this model as 
    res.render('authors/new', { author: new Author() })
})

// Create author
// body.name gets the name we input in our form
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    
    try {
        // We have specified that this post request is async so await here specifies that this is
        // where there might be a delay and we want to continue on with some other task while we wait
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: "error creating author"
        })
    }
})

module.exports = router;



