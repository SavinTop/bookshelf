const db = require('./dbconnection')

class BookService{

	async each(query){
		return new Promise((resolve, reject)=>{
			db.all(query, (err, row)=>{
				if(err) reject(err.message)
				resolve(row)
			}	
			)
		})
	}

	async firstrow(query){
		return new Promise((resolve, reject)=>{
			db.get(query, (err, row)=>{
				if(err) reject(err.message)
				resolve(row)
			}
			)
		})
	}

	async getFullBookInfo(id){
		const book = await this.firstrow(`select * from book where id = ${id}`)
		const genres = await this.each(`select genre.name from book_genre inner join genre on book_genre.genreID=genre.id where bookID = ${id}`)	
		const authors = await this.each(`select author.name from book_author inner join author on book_author.authorsID=author.id where bookID = ${id}`)

		book.authors = authors.map(el=>el.name)
		book.genres = genres.map(el=>el.name)

		return book
	}

	async getFullBookInfoQuery(query){
		const books = await this.each(query)
		for(let el of books){
			const id = el.id
			const genres = await this.each(`select genre.name from book_genre inner join genre on book_genre.genreID=genre.id where bookID = ${id}`)	
			const authors = await this.each(`select author.name from book_author inner join author on book_author.authorsID=author.id where bookID = ${id}`)
			el.genres = genres.map(el=>el.name)
			el.authors = authors.map(el=>el.name)
		}
		return books
	}

	async getBooksByGenre(genreId){
		const books = await this.each(`select book.* from book
inner join book_genre
on book_genre.bookID = book.id
where book_genre.genreID = ${genreId}`)

		return books
	}

}

module.exports = new BookService()
