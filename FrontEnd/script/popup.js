function deletePopup() {
    const popup = document.querySelector('#popup');
    if (popup) {
        popup.remove();
        const popupPostion = document.getElementById('popup-position');
        popupPostion.className = 'hide-popup-position';
        popupPostion.style.height = '0px';
    }
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
*/

function goBack() {
    document.getElementById('galerie-content').className = "popup-galerie";
    document.getElementById('formulaire-content').className ="hide-content";
    document.querySelector('.btn-container .btn span').innerHTML = "Ajouter une photo";
    document.getElementById('go-back').style.visibility = "hidden";
    document.getElementById('popup-titre').innerHTML = "Galerie photo";
}

function addEventListenerToPopupBtns() {
    document.getElementById('exit').addEventListener('click', ()=>deletePopup());
    document.getElementById('go-back').addEventListener('click', ()=>goBack());
    document.getElementById('go-back').style.visibility = "hidden";
}

function remplirPopupGalerie() {
    document.querySelector('.popup-galerie').innerHTML = "";

    fetch(urlHost + '/works', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + retreiveToken()
        }
    })
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            let figure = data[i];
            let figureHtml = `<div class="popup-galerie-image">
                                <div>
                                    <img class="trash" id="trash-${figure.id}" src="./assets/icons/trash.png">
                                </div>
                                <img class="popup-figure" src="${figure.imageUrl}" alt="${figure.title}">
                            </div>`;
            document.querySelector('.popup-galerie').innerHTML = document.querySelector('.popup-galerie').innerHTML + figureHtml;
        }
        addEventListenerToTrash(data);
        addEventListenerToBtnAjout();
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error)); 
}

function addEventListenerToTrash(data) {
    for(let i = 0; i < data.length; i++) {
        let figure = data[i];
        document.getElementById(`trash-${figure.id}`).addEventListener('click', ()=> {
            deleteWorks(figure.id);
        });
    }
}

function deleteWorks (workId) {
    fetch(urlHost + '/works/' + workId, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + retreiveToken()
        }
    })
    .then()
    .catch(error => console.error('There was a problem with the fetch operation:', error)); 
    remplirPopupGalerie();
    const filter = retreiveSavedFilter();
    getWorks(filter);
}

function retreiveSavedFilter() {
    return Number(localStorage.getItem('monFiltre'));
}

function addEventListenerToBtnAjout() {
        document.querySelector('.btn-container .btn').addEventListener('click', ()=> {
            switchContent();
        });
}

function switchContent() {
    document.getElementById('galerie-content').className = "hide-content";
    document.getElementById('formulaire-content').className ="popup-ajout-projet";
    document.getElementById('go-back').style.visibility = "visible";
    document.querySelector('.btn-container .btn span').innerHTML = "Valider";
    document.getElementById('popup-titre').innerHTML = "Ajout photo";
}