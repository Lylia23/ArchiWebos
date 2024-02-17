const urlHost = 'http://localhost:5678/api';

login("sophie.bluel@test.tld", "S0phie");
getCategories();
getWorks();

//-----------functions--------------------

function login(emailParam, passwordParam) {
    fetch(urlHost + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                email: emailParam,
                password: passwordParam
            }
        )
    })
        .then(response => response.json())
        .then(data => enregistrerToken(data.token))
        .catch(error => console.error('There was a problem with the fetch operation:', error));
}

function getCategories () {
    fetch(urlHost + '/categories', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + retreiveToken()
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('There was a problem with the fetch operation:', error)); 
}

 function getWorks () {
    fetch(urlHost + '/works', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + retreiveToken()
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        remplirGalleryOfWorks(data);
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error)); 
}

/*
function createWorks(image, title, category) {
    const formData = new FormData();

    //formData.append('profile_picture', fileInputElement.files[0]);
    
    formData.append('image', image);
    formData.append('title', title);
    formData.append('category', category);

    fetch(urlHost + '/works', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function deleteWorks (workId) {
    
}
*/

function enregistrerToken (token) {
    localStorage.setItem('monToken', token);
}

function retreiveToken (){
    return localStorage.getItem('monToken');
}

function remplirGalleryOfWorks(jsonData) {
    
    for (let i = 0; i < jsonData.length; i++){
        let figure = jsonData [i];
        let figureHtml = '<figure><img src="' + figure.imageUrl + '" alt="' + figure.title + '"><figcaption>' + figure.title + '</figcaption></figure>';
        document.querySelector(".gallery").innerHTML = document.querySelector(".gallery").innerHTML + figureHtml;
    }
}