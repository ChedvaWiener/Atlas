import AtlasModule from "./atlasModule.js";

// To set the background
const images = [
    'url(../images/pexels-lara-jameson-8828583.jpg)',
    'url(../images/pexels-aaditya-arora-592753.jpg)',
    'url(../images/pexels-pixabay-414916.jpg)',
    'url(../images/pexels-antonio-quagliata-227433.jpg)',
    'url(../images/pexels-pixabay-269724.jpg)',
];

let currentIndex = 0;
const backgroundDiv = document.querySelector('#id_background');

export const changeBackground = () => {
    backgroundDiv.style = ` background-image: ${images[currentIndex]};`
    currentIndex = (currentIndex + 1) % images.length;
};

// Get full name by country code 
export const fullCountry = async (codeCountry) => {
    let url = `https://restcountries.com/v3.1/alpha/${codeCountry}?fields=name`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data.name.common;
}



export const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_row").style.display = "none";
}

export const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";
}

export const createAtlas = async (ar, doApi) => {
    document.querySelector("#id_parent").innerHTML = "";
    let borderFullCountry = [];

    if (ar[0].borders && ar[0].borders.length > 0) {
        await Promise.all(ar[0].borders.map(cuntry => fullCountry(cuntry)
            .then(fullName => borderFullCountry.push(fullName))
            .catch(error => console.error(error))
        ));
    } else {
        console.log("No borders to process.");
    }

    let country = new AtlasModule("#id_parent", ar[0], borderFullCountry, doApi);
    country.render();
    hideLoading();
};

