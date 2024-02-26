const urlHost = 'http://localhost:5678/api';
const tabFiltres = ['Tous', 'Objets', 'Appartements', 'Hôtels & restaurants'];
const categoryIds = [1, 2, 3];

login("sophie.bluel@test.tld", "S0phie");
construireFiltres();
getWorks(0);

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

 function getWorks (filtre) {

    for (let i = 0; i < tabFiltres.length; i++) {
        // recuperation des boutons des filtres par id 
        let id = 'btn-' + i;
        let btnFiltre = document.getElementById(id);
        if (filtre == i){
            //Application de la classe de style au moment du clique 
            btnFiltre.className = "btn-filtre-on-clique";
        } else {
            //remetre le style par defaut des boutons non selectionnés
            btnFiltre.className = "btn-filtre";
        }
    }

    fetch(urlHost + '/works', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + retreiveToken()
        }
    })
    .then(response => response.json())
    .then(data => {
        remplirGalleryOfWorks(data, filtre);
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

function remplirGalleryOfWorks(jsonData, filtre) {
    //vider la galerie
    document.querySelector(".gallery").innerHTML = "";
    
    for (let i = 0; i < jsonData.length; i++){
        let figure = jsonData [i];
        //Condition pour enrichir toutes les figures 
        if (!categoryIds.includes(filtre)) {
            let figureHtml = '<figure><img src="' + figure.imageUrl + '" alt="' + figure.title + '"><figcaption>' + figure.title + '</figcaption></figure>';
            document.querySelector(".gallery").innerHTML = document.querySelector(".gallery").innerHTML + figureHtml;
        
        } else 
        //Condition pour enrichir que les figures qui ont l'id demandé au niveau du paramètre filtre
        if(figure.categoryId == filtre) {

            let figureHtml = '<figure><img src="' + figure.imageUrl + '" alt="' + figure.title + '"><figcaption>' + figure.title + '</figcaption></figure>';
            document.querySelector(".gallery").innerHTML = document.querySelector(".gallery").innerHTML + figureHtml;

        }
    }
}

function construireFiltres() {
    for(let i = 0; i < tabFiltres.length; i++) {
        let idFiltre = 'btn-' + i;
        let filtre = '<div id="' + idFiltre + '"><p>' + tabFiltres[i] + '</p></div>';
        document.querySelector('.filtre').innerHTML = document.querySelector('.filtre').innerHTML + filtre;
    }
    addEventListenerAuFiltres();
}

function addEventListenerAuFiltres() {
    for(let i = 0; i < tabFiltres.length; i++) {
        document.getElementById('btn-' + i).addEventListener('click', ()=>getWorks(i));
    }
}