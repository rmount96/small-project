const ajax = (url, callback, method='GET')=>{
    if(!url) return console.error("Request Required")
    if(!callback) return console.error("Callback Required")
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", evt=>{
        let req = evt.target;
        if(req.readyState !== 4) return;
        if(req.status === 200) return callback(req.response)
        callback("")
    })
    request.open(method,url)


    //Setting some headers...Don't sweat it right now
    request.setRequestHeader("X-Requested-With","XMLHttpRequest");
    request.setRequestHeader("Access-Control-Allow-Origin","*");
    
    request.setRequestHeader("Content-Type","application/json");
    request.setRequestHeader("Accept","application/json");
    //Use above for APIs in the future
    
    request.send()
}

const formHandler = (evt)=>{
    evt.preventDefault() // prevents page from reloading
    return [...evt.target.elements]
    .filter(el=>el.name)
    .map(el=>({name:el.name, value:el.value}))
}


// ajax("https://quote-garden.herokuapp.com/api/v2/quotes/random", (r) =>{
//     let quotes = JSON.parse(r)
//     let ul = document.querySelector('ul')
//     console.log(quotes)
//     let li = document.createElement('li')
//     ul.append(li)
//     li.append(`${quotes.quote.quoteText} -${quotes.quote.quoteAuthor}`)
//     })


    
ajax("https://quote-garden.herokuapp.com/api/v2/quotes/random", (r) =>{
    let quotes = JSON.parse(r)
    console.log(quotes)
    let p = document.querySelector('p')
    p.append(`"${quotes.quote.quoteText}"`)
    let title = document.querySelector('h5')
    //if(quotes.quote.quoteGenre != null) {
    title.append(`Quote Genre: ${quotes.quote.quoteGenre}`)
    //}
    let author = document.querySelector('h6')
    author.append(`-${quotes.quote.quoteAuthor}`)
})


ajax('https://quote-garden.herokuapp.com/api/v2/genres', (resp) => {
    let listed = JSON.parse(resp)
    console.log(listed)
    listed.genres.forEach(genre => {
    let options = document.createElement('option')
    options.append(genre)
    document.querySelector('#quote-categories').append(options)
    })
})
