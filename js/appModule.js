
import { declareEvents } from "./events.js"
import { changeBackground, showLoading, createAtlas } from "./atlasManeger.js";
const init = async () => {
  await doApiAll();
  await doApi();

  declareEvents(doApi);
  changeBackground();
  setInterval(changeBackground, 10000);
};

const doApi = async (search) => {

  if (!search)
    search = getRandomCountry()
  console.log(search)
  showLoading();
  let url = (`https://restcountries.com/v3.1/name/${search}`);
  try {
    let resp = await fetch(url);
    let data = await resp.json();
    createAtlas(data, doApi);
  }
  catch (err) {
    console.log(err);
  }
}

let allCountries = []

const getRandomCountry = () => {
  const randomIndex = Math.floor(Math.random() * allCountries.length);
  return allCountries[randomIndex];
};

const doApiAll = async () => {
  showLoading();
  let url = "https://restcountries.com/v3.1/all?fields=name";
  try {
      let resp = await fetch(url);
      let data = await resp.json();

      allCountries = data.map((dataName) => dataName.name.common);
      const countryInput = document.querySelector("#countryInput");
      const dropdown = document.querySelector("#countriesDropdown");

      countryInput.addEventListener("input", () => {
          const inputLowerCase = countryInput.value.toLowerCase();
          
          const filteredCountries = allCountries.filter(
              (country) => country.toLowerCase().includes(inputLowerCase)
          );

          filteredCountries.sort();
          dropdown.innerHTML = "";
          filteredCountries.slice(0, 10).forEach((country) => {
              const item = document.createElement("div");
              item.classList.add("dropdown-item");
              item.textContent = country;
              item.addEventListener("click", () => {
                  countryInput.value = country;
                  dropdown.style.display = "none";
              });
              dropdown.appendChild(item);
          });

          dropdown.style.display = filteredCountries.length > 0 ? "block" : "none";
      });

      document.addEventListener("click", (event) => {
          if (!event.target.closest(".custom-select")) {
              dropdown.style.display = "none";
          }
      });
  } catch (err) {
      console.log(err);
  }
};



init();