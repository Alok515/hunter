const box = document.getElementById('main');
const detail = JSON.parse(localStorage.getItem('detail'));

function showDetails () {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figCaption = document.createElement('figcaption');
    console.log(detail);
    img.src = detail.imgPath;
    const text = document.createTextNode(detail.name);
    figCaption.appendChild(text);
    const pdisplay = document.createElement('div');
    const pdetail = document.createTextNode(detail.description);
    const url = document.createElement('div');
    detail.urls.map(data => {
        const ar = document.createElement('a');
        ar.appendChild(document.createTextNode(data.type));
        ar.href = data.url;
        url.appendChild(ar);
    });
    pdisplay.appendChild(pdetail);
    figure.appendChild(img);
    figure.appendChild(figCaption);
    figure.appendChild(pdisplay);
    figure.appendChild(url);
    box.appendChild(figure);
}

showDetails();