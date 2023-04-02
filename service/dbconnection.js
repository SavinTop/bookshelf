const sqlite3 = require("sqlite3")

function createDbConnection() {
	const db = new sqlite3.Database('./bookshelf.sqlite', (error) => {
		if (error) {
			return console.error(error.message);
		}
	});
	console.log("Connection with SQLite has been established");

	return db;

}


module.exports = createDbConnection() 

