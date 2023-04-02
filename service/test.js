const BookService = require('./BookService');



(async ()=>{
	async function mesure(func, title){
		let start = Date.now()
		console.log(await func())
		const delta = (Date.now()-start)/1000
		console.log(`${title} ${delta} seconds passed`)
		return delta
	}
	const func = BookService.getFullBookInfoQuery.bind(BookService, 'select * from book order by rating asc')
	console.log('-----------------------------------------')
	let arr = []
	arr.push(await mesure(func, '1000 books'))
	console.log(`Everage: ${arr.reduce((acc,el)=>acc+el, 0)/arr.length}`)
	console.log('DONE-----------------------------------------')
})()
