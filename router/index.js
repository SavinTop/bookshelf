const express = require('express')
const BookRouter = require('./bookrouter')

const router = express.Router()

//router.get('books/:id', BookRouter.booksById)
router.get('/books/:id', BookRouter.booksById)
router.get('/books/', BookRouter.booksRange)

module.exports = router