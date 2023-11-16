export const declareEvents = (doApi) => {
    let id_input = document.querySelector("#countryInput")
    let btn_Search = document.querySelector("#btn_Search");

    let logo = document.querySelector("#logo")
    logo.addEventListener('click', () => doApi() )
    
    const anchorElements = document.querySelectorAll('ul a');

    anchorElements.forEach(anchor => {
        anchor.addEventListener('click', () => doApi(anchor.innerHTML));
    });

    id_input.addEventListener("keydown", (e) => {
        if (e.key == 'Enter')
            doApi(id_input.value);
    })
    btn_Search.addEventListener("click", () => {
        doApi(id_input.value);
    })


    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-90px";
        }
        prevScrollpos = currentScrollPos;
    }
}