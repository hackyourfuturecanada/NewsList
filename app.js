

var url = 'https://newsapi.org/v2/top-headlines?' +
    'country=us&' +
    'apiKey=02ab49fb89864ca7a94b3a70554114ec';

// // I added foreach but I gave me an error and It changed to fetch API
/*
var xhr = new XMLHttpRequest();
xhr.onload = function () {
    let list = document.getElementById("employees");
    return new Promise(function (resolve, reject) {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            const datas = JSON.parse(xhr.responseText);
            resolve(
                
            document.getElementById("h1").textContent += datas.articles[randomNumber].description);
            document.getElementById("img").setAttribute("src", datas.articles[randomNumber].urlToImage)
            document.getElementById("root").textContent += datas.articles[randomNumber].content;

                console.log(datas)
    }
    }).catch(function (error) {
        throw error;
    })
}
xhr.open('GET', url, true);
xhr.send(null);

*/


 function apiGetAll() {
     // console.log("Fetching stuff")
     fetch(url)
         .then(response=>response.json())
         .then(data=> {

           
            for(let i=0; i<5; i++){
                
               console.log(data.articles[i]);

                document.getElementById("news").innerHTML +=`
                        
                  <div  class="card">
                    <img src = "${data.articles[i].urlToImage}" class = "card-img-top" alt = "..." >
                        <div class="card-body">
                        <h5 id="h1" class="card-title">${data.articles[i].title}</h5>
                            <h6 id= "root" class = "card-text">${data.articles[i].description} </h6>
                            <p id= "root" class = "card-text">${data.articles[i].content} </p>
                            <p id= "root" class = "card-text">${data.articles[i].author} </p>
                            <p id= "root" class = "card-text">${data.articles[i].publishedAt} </p>
                            
                        </div>
                    <div class="card-footer">
                    <fieldset>
                      <button id = "n1" type = "button"class = "btn btn-primary" onclick = "showNews()" >${"Save"} </button>
                      <p id="sign"></p>
                  </fieldset>
                    </div>
                </div> 

`;
    }
          
            })
         .catch(err=> console.log(err));
 }

apiGetAll();



currentUser = []


function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if (!username == "" && !password=="" ) {
        currentUser.push(username, password)
        // console.log(currentUser)
        
        document.getElementById("createuser").innerHTML = "You have created new user:  " + username + '\n' + '\n';
        document.getElementById("createpassword").innerHTML = "Your password is:  " + password + '\n' + '\n';
    }else{
        document.getElementById("info").textContent = "Opss! Enter a value to submit" 
     }
   
}


// console.log(document)




var attempt = 3; // Variable to count number of attempts.

function showNews() {
    const createdUser = document.getElementById("createuser").value;
    if (!currentUser[0] == "" && !currentUser[1] == ""){
    
            attempt--;
            document.getElementById("p1").textContent = attempt + " articles left to save";
            document.querySelector(".card").style.backgroundColor = "#ccdcff";
                   if (attempt == 0) {
                    
                        
                    document.querySelector("fieldset").disabled = true;
                    alert("Sorry, you have reached your capacity");

                    
                }
  }else{
        alert("Sign in to save");

  }
}


