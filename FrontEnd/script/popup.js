console.log('Popup js fonctionnne :)');

function deletePopup() {
    const popup = document.querySelector('#popup');
    if (popup) {
        popup.remove();
        const popupPostion = document.getElementById('popup-position');
        popupPostion.className = 'hide-popup-position';
        popupPostion.style.height = '0px';
    }
}

function goBack() {
    console.log('go back');
}

function addEventListenerAuToPopupBtns() {
    document.getElementById('exit').addEventListener('click', ()=>deletePopup());
    document.getElementById('go-back').addEventListener('click', ()=>goBack());
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