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

const mainContent = document.querySelector('.card-center')
let button = document.querySelector('button')
    
ajax("https://quote-garden.herokuapp.com/api/v2/quotes?page=1&limit=20", (r) =>{
    let allQuotes = JSON.parse(r)
    console.log(allQuotes)

    let newQuote = () => {
            let selectedQuote = allQuotes.quotes.pop();
            let div = document.createElement('div')
            div.className = "card"
            div.style.width = '18rem'
            mainContent.append(div)
            
            let closeButton = document.createElement('span')
            closeButton.innerText = 'X'
            closeButton.className = "close-btn"
    
            closeButton.addEventListener('click', (evt => {
                let parent = evt.target.parentNode
                parent.remove();

            }))
            
            div.append(closeButton)

            let p = document.createElement('p')
            p.append(`"${selectedQuote.quoteText}"`)
            div.append(p)
            
            let author = document.createElement('h6')
            author.setAttribute("id", "card-author")
            if (selectedQuote.quoteAuthor != false){
                author.append(`-${selectedQuote.quoteAuthor}`)
                div.append(author)
            }
            else {
                author.append("-Unknown")
                div.append(author)
            }
        }

button.addEventListener('click', newQuote)

})



// ajax('https://quote-garden.herokuapp.com/api/v2/genres', (resp) => {
//     let listed = JSON.parse(resp)
//     console.log(listed)
//     listed.genres.forEach(genre => {
//     let options = document.createElement('option')
//     options.append(genre)
//     document.querySelector('#quote-categories').append(options)
//     })
// })

