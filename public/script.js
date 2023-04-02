
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const bookshelf = document.createElement('div')
bookshelf.classList.add('bookshelf')

function createBookItem(book){
    const div = document.createElement('div')
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    div.classList.add('book')
    const img = document.createElement('img')
    img.src = book.url===null?'':book.url
    const header = document.createElement('h1')
    header.innerText = book.title
    const desc = document.createElement('p')
    desc.innerText = book.desc
    div1.append(img)
    div2.append(header,desc, book.authors,book.genres)
    div.append(div1, div2)
    return div
}

function rerender(params){
bookshelf.innerHTML = ''
fetch(`/api/books/?from=${params.from}&to=${params.to}&search=${params.search}`)
  .then((response) => response.json())
  .then((json) => {
    json.forEach((el)=>{
        
        const book = createBookItem(el)

        bookshelf.appendChild(book)
    })
    document.body.append(bookshelf)
  });

}

const search = document.getElementById('search')
search.addEventListener('input', (el)=>{
    rerender({
        from: 0,
        to: 50,
        search: el.target.value
    })
})