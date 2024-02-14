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
        .then(data => console.log(data))
        .catch(error => console.error('There was a problem with the fetch operation:', error)); 
}

function createWorks (image, title, category) {
    
}

function deleteWorks (workId) {
    
}

function enregistrerToken (token) {
    localStorage.setItem('monToken', token);
}

function retreiveToken (){
    return localStorage.getItem('monToken');
}