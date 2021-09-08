import { Proizvod } from "./klase.js";
import { divKorpa, addToPage, isValid } from "./service.js"

//selektovanja za submit forme
const forma = document.querySelector('#forma');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#password');
const pError = document.querySelector('#error');
const spanIme = document.querySelector('#ubacen');

// Na stranici su sve vreme izlistani svi dostupni proizvodi iz niza
Proizvod.nizProizvoda.forEach(element => addToPage(element));

export let index;

forma.addEventListener('submit', (event) => {
    event.preventDefault();
    pError.innerHTML = '';

    //samo registrovani kupci mogu kupovati
   index = isValid(inputUser.value, inputPass.value);
    if (index != undefined) {
        divKorpa.style = 'visibility: visible';
        spanIme.textContent = inputUser.value;
    } else {
        pError.innerHTML = 'Ne mozete kupovati dok se ne registrujete.';
    }
});