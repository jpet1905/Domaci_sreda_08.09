import { Kupac, Proizvod, Prehrambeni, Belatehnika } from "./klase.js";
import { index } from "./index.js"

const divIzlog = document.querySelector('.proizvodi');

export const divKorpa = document.querySelector('.korpa');

let counter = 0;
let nizOdabranih = [];

export const addToPage = (item) => {

    const divProizvod = document.createElement('div');
    divProizvod.className = 'proizvod';
    divIzlog.append(divProizvod);
    const pNaziv = document.createElement('p');
    pNaziv.innerHTML = `Naziv: ${item.naziv}`
    const pCena = document.createElement('p');
    pCena.innerHTML = `Cena: ${item.cena} <span>din.</span>`
    //*razlicit ispis za grupe proizvoda*/
    const pDodatni = document.createElement('p');
    if (item.constructor == Prehrambeni) {
        pDodatni.innerHTML = `Rok trajanja: ${item.rokTrajanja}`
    } else if (item.constructor == Belatehnika) {
        pDodatni.innerHTML = `Garancija: ${item.garancija} <span>godina</span>`
    }
    //************/
    const inputKolicina = document.createElement('input');
    inputKolicina.type = 'number';
    inputKolicina.name = '';
    inputKolicina.id = counter++;
    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Dodaj u korpu';
    //potrebno zbog resetovanja
    btnAdd.id = inputKolicina.id;
    const pGreska = document.createElement('p');

    //dodavanje artikala
    btnAdd.addEventListener('click', () => {

        if (Number(inputKolicina.value) <= item.kolicina) {

            //na stranicu
            const divProizvod = document.createElement('div');
            divProizvod.className = 'proizvod';
            divKorpa.append(divProizvod);
            const pNaziv = document.createElement('p');
            pNaziv.innerHTML = `Naziv: ${item.naziv}`
            const pCena = document.createElement('p');
            pCena.innerHTML = `Cena: ${item.cena} <span>din.</span>`
            const pKolicina = document.createElement('p');
            pKolicina.innerHTML = `Kolicina: ${Number(inputKolicina.value)}`
            const btnDel = document.createElement('button');
            btnDel.textContent = 'Obrisi iz korpe';
            //potrebno zbog brisanja iz niza
            btnDel.id = inputKolicina.id;
            console.log("pritisnuto je dugme id " + btnDel.id);
            divProizvod.append(pNaziv, pCena, pKolicina, btnDel)

            //u niz
            let objekatKojiDodajemo = { naziv: item.naziv, cena: item.cena, kolicina: inputKolicina.value }
            nizOdabranih.push(objekatKojiDodajemo);
            //smanjuju se zalihe
            Proizvod.nizProizvoda.forEach(element => {
                if (element.naziv == item.naziv) {
                    element.kolicina = element.kolicina - Number(inputKolicina.value);
                    console.log(element);
                }
            });

            //brisanje artikla iz korpe
            btnDel.addEventListener('click', () => {
                if (btnDel.id == btnAdd.id) {
                    //brisanje iz niza
                    nizOdabranih.splice(nizOdabranih.indexOf(objekatKojiDodajemo), 1)
                    // console.log(nizOdabranih);

                    //vraca kolicinu na zalihe kad se izbrise iz korpe
                    Proizvod.nizProizvoda.forEach(element => {
                        if (element.naziv == item.naziv) {
                            element.kolicina = element.kolicina + Number(objekatKojiDodajemo.kolicina);
                            console.log(element);
                        }
                    });
                }
                //brise div za taj artikal sa stranice
                btnDel.parentElement.remove();
            })
            // resetovanje input polja u koje je prethodno uneta kolicina
            if (btnAdd.id == inputKolicina.id) {
                inputKolicina.value = "";
            }
        } else {
            pGreska.textContent = 'Trenutno nemamo tu kolicinu ovog artikla na stanju.';
        }

        // dodavanje u objekat Kupac
        Kupac.addToNiz(index, nizOdabranih);
        Kupac.display();
        //cistimo niz da se ne bi duplirali dodati artikli
        nizOdabranih = []
    });
    divProizvod.append(pNaziv, pCena, pDodatni, inputKolicina, btnAdd, pGreska);
}

//validacija pri logovanju korisnika
export function isValid(x, y) {
    for (const obj of Kupac.registrovaniKupci) {
        if (x == obj.ime && y == obj.sifra) {
            return Kupac.registrovaniKupci.indexOf(obj);
        }
    }
}