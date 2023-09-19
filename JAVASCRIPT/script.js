const imageWrapper = document.querySelector(".images");
const searchInput = document.querySelector(".search input");
const loadMoreBtn = document.querySelector(".gallery .load-more");
const url = "https://api.pexels.com/v1/search?query=";

const apiKey = "IzjqfEL1ITBGQrac2m7bjGM4PWARcr7zfCIO7PlON2DnpsZo8MSvC6Lu";
const perPage = 15;
let currentPage = 1;
let searchTerm = "";

function getImages(url) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        generateHTML(data.photos);
    })
    .catch((error) => {
        console.error('Errore:', error);
    });
}

const generateHTML = (images) => {
    imageWrapper.innerHTML += images.map(img =>
        `<li class="card">
            <img ('${img.photographer}', '${img.src.large2x}')" src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photograph">
                <ion-icon name="camera-outline"></ion-icon>
                    <span>${img.photographer}</span>
                </div>
                <button ('${img.src.large2x}');">
                <ion-icon name="download-outline"></ion-icon>
                </button>
            </div>
        </li>`
    ).join("");
}

searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        currentPage = 1;
        searchTerm = e.target.value;
        imageWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`);
    }
});

loadMoreBtn.addEventListener("click", () => {
    currentPage++; // Incrementa di 1
    let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    if (searchTerm) {
        apiUrl = `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`;
    }
    getImages(apiUrl);
});

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);



/* 

1. **Variabili**: All'inizio del codice, vengono dichiarate alcune variabili. Queste includono riferimenti a elementi del DOM come `imageWrapper`, `searchInput` e `loadMoreBtn`, così come variabili per gestire la paginazione (`currentPage`) e la ricerca (`searchTerm`).

2. **Funzione getImages**: Questa funzione esegue una richiesta GET all'API di Pexels utilizzando l'URL fornito come parametro. Utilizza l'API key per autenticarsi con il servizio. Una volta ricevuti i dati, li passa alla funzione `generateHTML`.

3. **Funzione generateHTML**: Questa funzione prende un array di immagini e genera l'HTML per visualizzarle sulla pagina. Utilizza il metodo `map` per creare un array di stringhe HTML, una per ogni immagine, e poi aggiunge queste stringhe all'elemento `imageWrapper`.

4. **Event Listener**: Ci sono due event listener alla fine del codice. Il primo si attiva quando l'utente preme il tasto "Enter" nel campo di input di ricerca, eseguendo una nuova ricerca con il termine di ricerca dell'utente. Il secondo si attiva quando l'utente clicca sul pulsante "Load More", caricando più immagini.

5. **Chiamata Iniziale**: Infine, il codice chiama la funzione `getImages` con un URL predefinito per caricare le prime immagini non appena lo script viene eseguito*/
