import { separatorJoin } from "./exports.js"

export default class AtlasModule {
  constructor(_parent, _item, borderFullCountry, doApi) {
    this.parent = _parent;
    this.name = _item.name.common;
    this.currencies = { "name": Object.values(_item.currencies)[0].name, "symbol": Object.values(_item.currencies)[0].symbol }
    this.capital = _item.capital;
    this.region = _item.region;
    this.languages = Object.values(_item.languages);
    this.latlng = _item.latlng;
    this.borderFullCountry = borderFullCountry;
    this.population = _item.population;
    this.flag = _item.flags;
    this.doApi = doApi;
  }

  render() {
    let div = document.createElement("div");
    div.className = "col-md-9 mx-auto p-5  shadow overflow-hidden my-5 text-white";
    div.style = "background:rgba(0, 0, 0, 0.589)"
    document.querySelector(this.parent).append(div);
    div.innerHTML = `
        <img src="${this.flag.svg}" alt="${this.flag.alt}" class="w-50 float-end ms-4">
        <h2 class="text-info">${this.name}</h2>
        <div>Capital: ${this.capital}</div>
        <div>Region: ${this.region}</div>
        <div>Population: ${this.population} </div>
        <div>Languages: ${separatorJoin(this.languages)}.</div>
        <div>Currency:  ${this.currencies.name}, Symbol: ${this.currencies.symbol}</div>
        <div class="mt-3 "><strong>States with borders:</strong><br>
        <div class="borders_div text-info"></div>
        </div>
        <iframe class="mt-4 col-12" height="400" src="https://maps.google.com/maps?q=${this.latlng[0]},${this.latlng[1]}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
       `

    //document.querySelector("#id_background").style = ` background-image: url(${this.flag.png});`;
    let borders_div = div.querySelector(".borders_div");
    this.borderFullCountry.forEach((cuntry, index) => {
      let a = document.createElement("a");
      borders_div.append(a);
      a.innerHTML = cuntry
      if (index < this.borderFullCountry.length - 1)
        borders_div.append(document.createTextNode(", "));
      else
        borders_div.append(document.createTextNode("."))

      a.addEventListener("click", () => {
        this.doApi(cuntry);
      })
      a.style = "cursor: pointer; "

    })
  }
}
