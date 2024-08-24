document.addEventListener('DOMContentLoaded', () => {
    const addTextBtn = document.getElementById('addTextBtn');
    const viewTextsBtn = document.getElementById('viewTextsBtn');
    const textModal = document.getElementById('textModal');
    const closeModalBtn = document.querySelector('.close');
    const saveTextBtn = document.getElementById('saveTextBtn');
    const textInput = document.getElementById('textInput');
    const textsContainer = document.getElementById('textsContainer');

    addTextBtn.addEventListener('click', () => {
        textModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        textModal.style.display = 'none';
    });

    saveTextBtn.addEventListener('click', () => {
        const text = textInput.value;
        if (text) {
            saveTextToLocalStorage(text);
            textInput.value = '';
            textModal.style.display = 'none';
        }
    });

    viewTextsBtn.addEventListener('click', () => {
        displaySavedTexts();
    });

    function saveTextToLocalStorage(text) {
        let texts = JSON.parse(localStorage.getItem('savedTexts')) || [];
        texts.push(text);
        localStorage.setItem('savedTexts', JSON.stringify(texts));
    }

    function displaySavedTexts() {
        textsContainer.innerHTML = '';
        let texts = JSON.parse(localStorage.getItem('savedTexts')) || [];
        texts.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            textsContainer.appendChild(p);
        });
    }

    window.onclick = function(event) {
        if (event.target == textModal) {
            textModal.style.display = 'none';
        }
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            }, err => {
                console.log('Service Worker registration failed:', err);
            });
    });
}
