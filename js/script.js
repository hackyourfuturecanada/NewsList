let currentUser
let oldUsers = []


function User(username){
	let favs = [];
	let count = 0;

	function addFav(x){
		
		if(favs.includes(x))
		{
			alert("already added")
			return false;
		}
		if(counter()){
			favs.push(x)
			return true
		}else{
			return false
		} 
			
	}

	function getFav(){
		return favs
	}

	function counter(){
		return (count < 3) ? count+=1 : alert("Sorry, you have reached your capacity");
	}

	return { name : username, addFav, getFav}
}





let userArea = () => {
	let element = document.getElementById('userArea')
	if(currentUser){
		element.innerHTML = "Hello " + currentUser.name + " | <a href='#' onclick='switchUser(true)'>Log out</a>";
	}else{
		element.innerHTML = `
			<form id="login">
				Create User <br />
				<input type="text" id="username" placeholder="Username" />
				<button type="submit" onclick="switchUser()">Create</button>
			</form>
		`;
	}
}



const switchUser = (logout = false) => {
	if(logout){
		currentUser = ""
		userArea()
		clearFav()
		return 
	}

	let userName = document.querySelector('#username').value;
	
	if(!userName){
		alert("User name can't be empty")
		return false
	}

	if(oldUsers[userName]){
		currentUser = oldUsers[userName]
		userArea()
		checkFav()
	}else{
		currentUser = new User(userName)
		oldUsers[userName] = currentUser
		userArea()
	}
}

const getNews = () => {
	let key = "0c5aa5107409412a82f137ff8148d6eb"
	let api = "https://newsapi.org/v2/everything?q=toronto&sortBy=publishedAt&apiKey=" + key;
	
	fetch(api, {
	  method: 'GET',
	  headers: {
	    	'Content-Type': 'text/plain',
	    	'X-Api-Key': key,
		}
	})
		.then(function(response) {
			//if the response status not ok then show me the response
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
				  response.status);
				return;
			}

			//i did not understand why we did use .then here so please i need some explination 
			response.json().then(function(data) {
				let articles = data.articles

				for (let i = 0; i < 5; i++) {
					let item = articles[i]
					//console.log(item)
					let el = document.createElement('li')
					el.innerHTML = `
						<h1>${item.title}</h1>
						<p>
						${item.description}
						<button class="addFav">Add to FAV</button>
						</p>
					`;
					document.getElementById('newsList').appendChild(el)
				}


				let items = document.querySelectorAll('li button');

				for (let i = 0; i < items.length; i++) {
					items[i].addEventListener('click', function(e){
						if(!currentUser){
							alert("Create a user first")
							return false
						}

						
						let x = e.target.parentNode.parentNode.children[0].innerHTML
						if (currentUser.addFav(x)){
							e.target.parentNode.parentNode.classList = "fav"
						}
					});
				}

			});

		})
		.catch(function(err) {
			console.log('Error :', err);
		});

}

const clearFav = () => {
	let lis = document.querySelectorAll('li');
	lis.forEach(function(list){
		list.classList = "";
	})
}

const checkFav = () => {
	let fav = currentUser.getFav()
	let lis = document.querySelectorAll('li');
	lis.forEach(function(list){
		
		if(fav.includes(list.children[0].innerHTML)){
			list.classList = "fav";
		}
	})
}


getNews()
userArea()


