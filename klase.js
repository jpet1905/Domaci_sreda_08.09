class Kupac {
    static registrovaniKupci = [new Kupac('Jelena', '1234', []), new Kupac('Marko', '9876', []), new Kupac('Ivana', '5263', [])];
    constructor(param1, param2) {
        this.ime = param1;
        this.sifra = param2;
        this.korpa = [];
    }
    static addToNiz(i, niz) {
        Kupac.registrovaniKupci[i].korpa.push(...niz)
    }
    static display() {
        console.log(Kupac.registrovaniKupci);
    }
}

class Proizvod {
    static nizProizvoda = [];
    constructor(naziv, cena, kolicina) {
        this.naziv = naziv;
        this.cena = cena;
        this.kolicina = kolicina;
    }
    addToArray() {
        Proizvod.nizProizvoda.push(this);
    }
}

class Prehrambeni extends Proizvod {
    constructor(naziv, cena, kolicina, rok) {
        super(naziv, cena, kolicina)
        this.rokTrajanja = rok;
    }
}

class Belatehnika extends Proizvod {
    constructor(naziv, cena, kolicina, garancija) {
        super(naziv, cena, kolicina)
        this.garancija = garancija;
    }
}



let p1 = new Prehrambeni("Mleko", 100, 25, "21.03.2023");
p1.addToArray();
let p2 = new Prehrambeni("Hleb", 45, 100, "28.09.2021");
p2.addToArray();
let p3 = new Prehrambeni("Jogurt", 56, 82, "21.3.2023");
p3.addToArray();
let p4 = new Prehrambeni("Cokolada", 199, 24, "07.01.2022");
p4.addToArray();
let p5 = new Prehrambeni("Brasno", 150, 50, "15.06.2023");
p5.addToArray();

let b1 = new Belatehnika("Sporet", 30000, 8, 5);
b1.addToArray();
let b2 = new Belatehnika("Mikser", 12000, 9, 2);
b2.addToArray();
let b3 = new Belatehnika("Bojler", 45000, 3, 5);
b3.addToArray();
let b4 = new Belatehnika("Televizor", 10200, 12, 10);
b4.addToArray();
let b5 = new Belatehnika("Grejalica", 5200, 6, 2);
b5.addToArray();
console.log(Proizvod.nizProizvoda);

export { Kupac, Proizvod, Prehrambeni, Belatehnika }