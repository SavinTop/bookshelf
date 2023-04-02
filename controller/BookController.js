const books = require('../service/BookService')

class BookController{
    async getBook(id){
        return books.getFullBookInfo(id);
    }

    async getBooksRange(from, to, search){
        search = search || '';
        return books.getFullBookInfoQuery(`select * from book 
        where book.title like '%${search}%' 
         limit ${from},${to-from} ;`)
    }
}

module.exports = new BookController()