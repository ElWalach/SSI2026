function funkcja(){
    console.log("Funkcja została wywołana.");
}

function newsy(){
    let news = document.getElementById("news");
    news.innerHTML = powitanie()+data();

    let urodziny= document.getElementById("urodziny");
    urodziny.innerHTML= dniDoUrodzin();
}

function powitanie(){
    let dzisiaj= new Date();
    let godzina = dzisiaj.getHours();
    
    if( (godzina<18) && (godzina>6) ){
        return 'Dzień dobry, ';
    } else {
        return 'Dobry wieczór, ';
    }
}

const miesiace= ['stycznia', 'lutego', 'marca', 'kwietnia',
        'maja', 'czerwca', 'lipca', 'sierpnia', 'września',
        'października', 'listopada', 'grudnia'];

function data(){
    let dzisiaj= new Date();
    let dzien= dzisiaj.getDate();
    let miesiac= miesiace[dzisiaj.getMonth()];
    let rok= dzisiaj.getFullYear();
    return 'dzisiaj jest ' + dzien + ' ' + miesiac + ' ' + rok + ' r.';
}

class Walec{
    #r;
    #h;
    #pole= null;
    #objetosc= null;

    constructor(r, h){
        this.setR(r);
        this.setH(h);
    }

    getR(){
        return this.#r;
    }

    setR(value){
        this.#r = value;
    }

    getH(){
        return this.#h;
    }

    setH(value){
        this.#h = value;
    }

    getPole(){
        return this.#pole;
    }

    getObjetosc(){
        return this.#objetosc;
    }

    oblicz(){
        if( !this.#waliduj()){
            alert("Nie podano prawidłowych danych.");
            return;
        }

        this.#pole= 2* Math.PI * this.#r* (this.#r + this.#h); 
        this.#objetosc= Math.PI * Math.pow(this.#r, 2) * this.#h;
    
    }

    #waliduj() {
        return this.#walidujLiczbe(this.#r) && this.#walidujLiczbe(this.#h);
    }

    #walidujLiczbe(value){
        return typeof value === "number" && !isNaN(value) && value > 0;
    }
}
function podpiecie(){
    let element = document.getElementById('licz');
    element.addEventListener('click', function(event){
        let r= Number(document.getElementById('walec_r').value);
        let h= Number(document.getElementById('walec_h').value);

        let walec= new Walec(r, h);
        walec.oblicz();

        if (walec.getPole()==null)
            return false;

        console.log('A = ' + walec.getPole() + ' V = ' + walec.getObjetosc())

        let A= walec.getPole();
        let V= walec.getObjetosc();

        let wynik = document.createTextNode('Wynik:');
        let ul= document.createElement('ul');

        let liA= document.createElement('li');
        let liAText= document.createTextNode('A= ' + A);

        liA.appendChild(liAText);
        ul.appendChild(liA);

        let liV= document.createElement('li');
        let liVText= document.createTextNode('V= ' + V);

        liV.appendChild(liVText);
        ul.appendChild(liV);

        let lista= document.getElementById('lista');

        if(lista.hasChildNodes()){
            while(lista.firstChild){
                lista.removeChild(lista.firstChild);
            }
        }

        lista.appendChild(wynik);
        lista.appendChild(ul);

        ul.style.listStyleType= 'square';

    });
}


function dniDoUrodzin(){
    let urodzinyDzien= 1;
    let urodzinyMiesiac= 1;
    
    let dataDzisiaj= new Date();
    let dataUrodzin= new Date(dataDzisiaj.getFullYear(), urodzinyMiesiac -1, urodzinyDzien);

    let roznicaDni= Math.ceil((dataUrodzin - dataDzisiaj)/(1000*60*60*24));
    
    if(roznicaDni>0) return 'Autor będzie miał urodziny za ' + roznicaDni + ' dni';
    
    else if(roznicaDni==0) return 'Autor ma dzisiaj urodziny';
    
    else return 'Autor miał urodziny ' + roznicaDni * -1 + ' dni temu';
}