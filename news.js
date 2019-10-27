function getData(url, method) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));


        let data = JSON.parse(this.response)
document.getElementById('article1a').textContent = (data.articles[0].author) + "  " + (data.articles[0].title)+" "+(data.articles[0].description);
        document.getElementById('article2a').textContent = (data.articles[1].author) + "  " + (data.articles[1].title);
        document.getElementById('article3a').textContent = (data.articles[2].author) + "  " + (data.articles[2].title);
        document.getElementById('article4a').textContent = (data.articles[3].author) + "  " + (data.articles[3].title);
        document.getElementById('article5a').textContent = (data.articles[5].author) + "  " + (data.articles[5].title);

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
  console.log('THIS IS THE ', value);
}).catch(function(error) {
  console.log('ERROR IS', error);
})

var username = document.getElementById("username").value;
function create_user(){

     sessionStorage.setItem("username", username);
     alert('new user is created');
}

 function saveData() {
    if(!sessionStorage.getItem(username) == username) {
    sessionStorage.setItem(username);
    }  else {
    alert(username + "already registered")
    }



// function state() {
// const foundUser = users.find(user => user.username === username);
//   if (!foundUser) {
//   console.log('Invalid user!');
//   } else {
//   Log  in
//     }
//   };

const sayHi = (event) => {
      document.querySelector('#put here').textContent = `HI ${username}!!!!`;}
const form = document.querySelector('form');
form.addEventListener('submit', sayHi());

// got below from farnous's code
function User(username){
	let savedArt = [];
	let count = 0;

function addArt(x){
  if(savedArt.includes(x)){
  alert("already added")
  return false;
}
  if(counter()){
  savedArt.push(x)
  return true
  }else{
  return false
  }
}
function getSaved(){
  return savedArt
}

function counter(){
return (count < 3) ? count+=1 : alert("Sorry, you can't add anymore");
}

return { name : username, addArt, getSaved}
}
 }
