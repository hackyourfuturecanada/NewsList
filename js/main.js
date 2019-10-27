// store all articles 
let articles = [];
let user;


//make a XMLHttpReqeust and return a promise 
function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });

    };
    xhr.send();
  });
}

// get articles and display 5 of them
async function getArticles() {
  try {
    let data = await makeRequest("GET", "https://newsapi.org/v2/everything?q=bitcoin&from=2019-10-13&sortBy=publishedAt&apiKey=0c5aa5107409412a82f137ff8148d6eb");
    data = JSON.parse(data);
    // display 5 articles in doc 
    for (let i = 0; i < 5; i++) {
      document.getElementById("articles").innerHTML += `<p> 
        <span>${data.articles[i].author} </span>
        <span>${data.articles[i].title} </span> 
        <span class="fav"> <i id=${i} class="fa fa-heart" > </i></span> 
        </p>`;

      //add the articles to the array  
      articles.push(data.articles[i]);
    }


  } catch (err) {
    console.log(err.message());
  }

}

// get articles display them in the page and then modify the document to add 'favourite symbol' and 'show favourite articles' button
async function addFavButtons() {
  await getArticles();
  favIcon();
  displayFav();

}

addFavButtons();



//functionalize favourtie icon, when clicked get its ID and push it to user bookmarks
function favIcon() {
  for (let i = 1; i < 6; i++) {
    document.getElementsByClassName("fa")[i].addEventListener("click", function (e) {
      this.style.color = "black";
      // parse the ID of the articl
      indexOfArticles = parseInt(this.id);
      if(trackBookMarks() > 3){
        alert("oops, You can not have more than 3 articles bookmarked ")
      }
      if (user && user.bookMarks.length < 4) {
        this.style.color = "red";
        // if item does not exist push it
        if (user.bookMarks.indexOf(indexOfArticles) == -1)
          user.bookMarks.push(indexOfArticles);
      }
    });
  }
}



// display the hidden form to sign up on clik
document.getElementById("log").addEventListener("click", function () {
  document.querySelector("form").style.display = "flex";
});


// button to create an account 
document.getElementById("createAccount").addEventListener("click", function (e) {
  e.preventDefault();
  user = new User();
  userName = document.getElementsByName("userName")[0].value;
    trackBookMarks=counter(0);
  if (userName.length > 0) {
    user.name = userName;
    user.bookMarks = [];
    document.getElementById("name").innerHTML = userName;
    document.forms[0].style.display = "none";
  }
});



class User {
  constructor(name, bookMarks) {
    this.name = name;
    this.bookMarks = bookMarks;
  }

}

// add function to the button when clicked,display favourite articles 
function displayFav() {
  document.getElementById("displayFav").addEventListener("click", function () {
    if (user != null && user.bookMarks.length > 0) {
      user.bookMarks.sort();
      document.getElementById("articles").innerHTML = "";
      for (let i = 0; i < 3; i++) {
        if (user.bookMarks.indexOf(i) > -1) {
          document.getElementById("articles").innerHTML += `<p> <span>${articles[i].author}</span>  <span>${articles[i].title} </span> </p>`;
        }

      }
    }
  });
}



let trackBookMarks=null;
let counter = function (x) {
  if (x == undefined) {
    i = 0;
  } else { i = x; }

  return function () {
    i++;
    return i;
  }
};
