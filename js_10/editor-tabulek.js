let tabulka;
let vychoziVelikostX = 5;
let vychoziVelikostY = 5;
let aktivniBunka;

function vytvorBunku() {
    let td = document.createElement("td");

    let tdInput = document.createElement("input");

    tdInput.type = "text";
    tdInput.onfocus = function () {
        aktivniBunka = this;
    };
    td.appendChild(tdInput);

    return td;
}
function vytvorVychoziTabulku() {
    tabulka = document.createElement("table");
    document.body.appendChild(tabulka);
    for (let y = 0; y < vychoziVelikostY; y++) {
        let tr = document.createElement("tr");
        tabulka.appendChild(tr);

        for (let x = 0; x < vychoziVelikostX; x++) {
            tr.appendChild(vytvorBunku());
        }
    }
}
window.onload = function () {
    vytvorVychoziTabulku();
    vytvorOvladaciTlacitko();
};
function vytvorTlacitkoAVlozHo(popisek, rodic) {
    let btn = document.createElement("button");
    btn.textContent = popisek;
    rodic.appendChild(btn);
    return btn;
}
function vytvorOvladaciTlacitko() {
    vytvorTlacitkoAVlozHo("Přidat řádek dolů", document.body).onclick = pridejRadekDolu;
    vytvorTlacitkoAVlozHo("Přidat řádek nahoru", document.body).onclick = pridejRadekNahoru;
    vytvorTlacitkoAVlozHo("Přidat sloupec vlevo", document.body).onclick = pridejSloupecDoleva;
    vytvorTlacitkoAVlozHo("Přidat sloupec vpravo", document.body).onclick = pridejSloupecDoprava;
    vytvorTlacitkoAVlozHo("Odstranit řádek", document.body).onclick = smazRadek;
    vytvorTlacitkoAVlozHo("Odstranit sloupec", document.body).onclick = smazSloupec;
}

function vytvorRadek() {
    let novyRadek = document.createElement("tr");

    for (let i = 0; i < tabulka.firstElementChild.childNodes.length; i++) {
        novyRadek.appendChild(vytvorBunku());
    }
    return novyRadek
}
/*
 * table = <TABLE>
 * table.firstElementChild = <TR>
 * table.firstElementChild.childNodes = [<TD>]
 * table.firstElementChild.childNodes.length = number
 *
 * table.       firstElementChild.      childNodes      .length
 * <TABLE>.     <TR>.                   [<TD>]          .length
 */

function indexRadkuAktivniBunky() {
    let cilHledani = tabulka.childNodes;
    let hledanyPrvek = aktivniBunka.parentElement.parentElement;
    return Array.prototype.indexOf.call(cilHledani, hledanyPrvek);
}
function indexSloupceAktivniBunky() {
    let bunkyVRadku = aktivniBunka.parentElement.parentElement.childNodes;
    let td = aktivniBunka.parentElement;
    return Array.prototype.indexOf.call(bunkyVRadku, td);
}

function pridejRadekNahoru() {
    let radek = vytvorRadek();
    let indexVybraneho = indexRadkuAktivniBunky();
    tabulka.insertBefore(radek, tabulka.childNodes[indexVybraneho]);
}
function pridejRadekDolu() {
    let radek = vytvorRadek();
    let indexVybraneho = indexRadkuAktivniBunky();
    if (tabulka.lastChild == tabulka.childNodes[indexVybraneho]) {
        tabulka.appendChild(radek);
    } else {
        tabulka.insertBefore(radek,tabulka.childNodes[indexVybraneho + 1]);
    }
}function pridejSloupecDoleva() {
    let indexVybraneho = indexSloupceAktivniBunky();
    for (let i = 0; i < tabulka.childNodes.length; i++) { //najde delku-uzlu-vtabulce
        tabulka.childNodes[i].insertBefore(vytvorBunku(), tabulka.childNodes[i].childNodes[indexVybraneho]);
    }
}
function pridejSloupecDoprava() {
    let indexVybraneho = indexSloupceAktivniBunky();
    for (let i = 0; i < tabulka.childNodes.length; i++) {
        if (tabulka.childNodes[i].childNodes[indexVybraneho] == tabulka.childNodes[i].lastElementChild) {
            tabulka.childNodes[i].appendChild(vytvorBunku());
        } else {
            tabulka.childNodes[i].insertBefore(vytvorBunku(), tabulka.childNodes[i].childNodes[indexVybraneho + 1]);
        }
    }
}
//mazani radku
function smazRadek() {
    let indexVybraneho = indexRadkuAktivniBunky();
    tabulka.removeChild(tabulka.childNodes[indexVybraneho]);
}
//mazani sloupce
function smazSloupec() {
    let indexVybraneho = indexSloupceAktivniBunky();
    for (let i = 0; i < tabulka.childNodes.length; i++) {
        tabulka.childNodes[i].removeChild(tabulka.childNodes[i].childNodes[indexVybraneho]);
    }
}