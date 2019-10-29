let data;
function getData(url, method) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
        let data = JSON.parse(this.response)    
        } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    }
    
    xhr.open(method, url);
    xhr.send();      
  });
}

const url = "https://newsapi.org/v2/everything?q=bitcoin&from=2019-10-13&sortBy=publishedAt&apiKey=0c5aa5107409412a82f137ff8148d6eb"

getData(url, 'GET').then(function(value) {
  console.log('True API', value);
  data = value;
  for(let i=0; i<5; i++){
     document.getElementsByClassName("art")[i].innerHTML += data.articles[i].author; 
     document.getElementsByClassName("art")[i].innerHTML += data.articles[i].title;
     document.getElementsByClassName("art")[i].innerHTML += data.articles[i].description;
  }
 
}).catch(function(error) {
  console.log('ERROR IS', error);
})

let favNews = [];
        const addUsername = (ev)=>{
            ev.preventDefault();  //to stop the form submitting
            let user = {
                username: document.getElementById('userInput').value,
            }
            //document.write("Hello" + user + "!" + "Welcome to News List.")
            favNews.push(user);
            document.forms[0].reset(); // to clear the form for the next entries
            
            console.warn('added' , {favNews} );
            let pre = document.querySelector('#msg pre');
            pre.textContent = '\n' + JSON.stringify(favNews, '\t', 2);
            //saving to localStorage
            localStorage.setItem('UserLogin', JSON.stringify(favNews) );
        }
        document.addEventListener('DOMContentLoaded', ()=>{
            document.getElementById('btn').addEventListener('click', addUsername);
        });

function addBookmark(){
  var element = document.getElementsByClassName("newsArticle");
  element.classList.add("addedBookmark");
}

addBookmark();