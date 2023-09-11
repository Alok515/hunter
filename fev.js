
const box = document.getElementById('main');
const fevList = JSON.parse(localStorage.getItem('fevList'));

console.log(fevList);

function displayFev () {
    fevList.map(data => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figCaption = document.createElement('figcaption');
        const delButton = document.createElement('button');
        const detialButton = document.createElement('button');
        const ptag = document.createElement('p');
        ptag.className = 'figureButton';
        figCaption.appendChild(document.createTextNode(data.name));
        figCaption.className = "figCap";
        img.src = data.imgPath;
        img.className = "image";
        delButton.textContent = "Delete";
        delButton.className = "buttonD";
        delButton.addEventListener("click", function handleFevButton ( ) {
            const index = fevList.indexOf(data);
            if (index > -1) {
                fevList.splice(index, 1);
            }
            localStorage.setItem("fevList", JSON.stringify(fevList));
            box.removeChild(figure);
            console.log(fevList);
        });
        detialButton.textContent = "Details";
        detialButton.id = 'detailButton';
        detialButton.className = "buttonD";
        figure.appendChild(img);
        ptag.appendChild(delButton);
        ptag.appendChild(detialButton);
        figure.appendChild(figCaption);
        figure.appendChild(ptag);
        figure.title = data.description;
        box.appendChild(figure);
    });
}

displayFev();