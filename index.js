
const submitButton = document.getElementById('searchSubmit');
const fevList = [];
const box = document.getElementById('main');
const fevButton = document.getElementById('fevButton');

function urlVal (val ) {
    return `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${val}&ts=alokks&apikey=2117c7e5aeab2ce9376a8ef37e7cf99b&hash=bd5cf177b51fd33b08ead5209bdaea06`;
}

async function logData(val) {
    const res = await fetch(urlVal(val));
    const data = await res.json();
    if(data.code === 200 ) {
        const newData = data.data?.results.map(da => (
            {
                name:da.name,
                imgPath: da.thumbnail.path + '/portrait_xlarge.'+da.thumbnail.extension,
                description: da.description,
                series: da.series,
                stories: da.stories,
                urls: da.urls
            }
        ));
        return newData;
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function handleFetch (val) {
    logData(val)
        .then((data) => {
            removeAllChildNodes(box);
            const newData = data;
            displayData( newData );
        })
        .catch((err) => {
            console.log(err);
        })
}

handleFetch('cap');

function handleSearch() {
    const input = document.getElementById('search');
    let val = input.value;
    if (val === undefined || val === '') {
        alert('Please enter a Valid search term');
        return;
    }
    handleFetch(val);
}

function displayData ( newData ) {
    newData.map(data => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figCaption = document.createElement('figcaption');
        const fevButton = document.createElement('button');
        const detialButton = document.createElement('button');
        const ptag = document.createElement('p');
        ptag.className = 'figureButton';
        figCaption.appendChild(document.createTextNode(data.name));
        figCaption.className = "figCap";
        img.src = data.imgPath;
        img.className = "image";
        fevButton.textContent = "Mark As Fev";
        fevButton.className = "buttonD";
        fevButton.addEventListener("click", function handleFevButton ( ) {
            fevList.push(data);
            localStorage.setItem("fevList", JSON.stringify(fevList));
            console.log(fevList);
        });
        detialButton.textContent = "Details";
        detialButton.id = 'detailButton';
        detialButton.className = "buttonD";
        detialButton.addEventListener("click", () => {
            localStorage.setItem("detail", JSON.stringify(data));
            window.location.href = 'details.html';
        });
        figure.appendChild(img);
        ptag.appendChild(fevButton);
        ptag.appendChild(detialButton);
        figure.appendChild(figCaption);
        figure.appendChild(ptag);
        figure.title = data.description;
        box.appendChild(figure);
    });
}

submitButton.addEventListener('click', handleSearch);
