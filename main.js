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


ajax("https://quote-garden.herokuapp.com/api/v2/quotes/random", (r) =>{
    let quotes = JSON.parse(r)
    let ul = document.querySelector('ul')
    console.log(quotes)
    let li = document.createElement('li')
    ul.append(li)
    li.append(`${quotes.quote.quoteText} -${quotes.quote.quoteAuthor}`)
    })

button = document.querySelector('#another-quote')

// button.addEventListener("click", ajax("https://quote-garden.herokuapp.com/api/v2/quotes/random", (r) =>{
    
//     let quotes = JSON.parse(r)
//     let ul = document.querySelector('ul')
//     console.log(quotes)
//     let li = document.createElement('li')
//     ul.append(li)
//     li.append(`${quotes.quote.quoteText} -${quotes.quote.quoteAuthor}`)
//     }))
