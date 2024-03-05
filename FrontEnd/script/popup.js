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
    fetch(urlHost + '/works', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + retreiveToken()
        }
    })
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            figure = data[i];
            let figureHtml = '<img src="' + figure.imageUrl + '" alt="' + figure.title + '">';
            document.querySelector('.popup-galerie').innerHTML = document.querySelector('.popup-galerie').innerHTML + figureHtml;
        }
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error)); 
}