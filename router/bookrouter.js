const books = require('../controller/BookController')
const express = require('express')
class BookRouter{

    async booksById(req, res){
        const id = req.params.id
        res.json(await books.getBook(id))
    }

    async booksRange(req,res){
        const [from, to, search] = [req.query.from, req.query.to, req.query.search]
        res.json(await books.getBooksRange(from,to,search))
    }

}

module.exports = new BookRouter()