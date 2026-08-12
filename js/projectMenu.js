/* 
Ez a program felel a Grafikus Felhasználói Felület (GUI) működéséért.
*/
let projects;
let main_data;
const MAIN  = document.getElementById("main");
const MN    = document.getElementById("mn");
const HEAD  = document.getElementById("head");
const MAIN_MENU = `
<menu>
    <ul>
        <li id="new-project"><label>Új Project</label></li>
        <li id="list-projects"><label>Project-ek listázása</label></li>
        <li id="s">
            <input type="checkbox" id="p-kilincs">
            <label for="p-kilincs">Project keresése</label>
        </li>
    </ul>

    <div class="seeker">
        <input type="text" id="seek-project">
        <button id="start-seek-project">Keress!</button>
    </div>
</menu>
`;
const DASHBOARD = `
<menu>
    <ul>
        <li id="save-data">Adatok mentése</li>
        <li id="delete-project">Project törlése</li>
        <li id="new-task">Új Feladat</li>
        <li id="list-tasks">Feladatok listázása</li>
        <li id="s">
            <input type="checkbox" id="p-kilincs">
            <label for="p-kilincs">Feladat keresése</label><br>
        </li>
    </ul>

    <div class="seeker">
        <input type="text" id="seek-task">
        <button id="start-seek-task">Keress!</button>
    </div>
</menu>
`;
const NEW_PROJECT_CONT = `
<form action="" id="submit">
    <fieldset>
        <legend><strong>Új Project</strong></legend>
        <label for="name">Project Neve*:</label>
        <input name="project-name" title="Adj egy frappáns nevet a project-ednek!" placeholder="Új Project" id="name" type="text" required autofocus><br>
        <label for="description">Project Leírása</label><br>
        <textarea name="project-description" title="Adj egy rövid leírást a project-ről, hogy könnyebben átlásd, mit kell csinálnod!" placeholder="Project rövid Leírása" id="description" cols="45" rows="10"></textarea><br>
    </fieldset>
    <div id="buttons">
        <button type="submit">Project létrehozása</button>
    </div>
</form>
<button id="cancel">Mégse</button>
`;

function new_project() {
    /* Új project űrlapja */
    let htm             = MAIN.innerHTML;   // A főmenü html kódja mentésre kerül
    MAIN.innerHTML      = NEW_PROJECT_CONT; // Az új project elkészítési űrlapja
    MAIN.style.display  = 'block';
    const FORM          = document.getElementById('submit'); // Az új project elkészítési űrlapja a FORM állandóban
    const CANCEL        = document.getElementById('cancel'); // A mégse gomb a CANCEL állandóban.

    CANCEL.addEventListener('click', () => {
        /* Mégse gomb hatására adatmentés nélkül visszalépünk a főmenübe. */
        MAIN.innerHTML = htm;
        main_buttons();
    });

    FORM.addEventListener('submit', (e) => {
        /* 
        A Project létrehozása gomb hatására az űrlapba felvitt 
        adatokat elmenti a program a szerver memóriájába. 
        */
        e.preventDefault(); // Alapvető eseménymetódus kiiktatása

        let dict = {};      // Az új project adatait tartalmazza
        let s    = '';      // A project-ek egyedi azonosítója
        s       += String(main_data.num+1).padStart(3, '0'); 
        const DATA = new FormData(e.target);
        let tmp_data = Object.fromEntries(DATA);
        dict["Project-name"]        = tmp_data['project-name'];         // Project neve
        dict["Project-ID"]          = `P-${s}`;                         // Egyedi azonosító
        dict["Project-description"] = tmp_data['project-description'];  // Project leírása
        dict["Tasks"]               = [];                               // Project-hez tartozó részfeladatok listája
        dict["ISComplete"]          = false;                            // Ez a jelölő mutatja, hogy ezt a projectet teljesítették e
        
        projects.push(dict);
        main_data.contents = projects;
        main_data.num++;
        save_projects();
    })
}


/* FIGYELEM!!!!!
Ezt a részt még jobban át kell nézni működés közben, mert szokatlanúl működik.
*/
function save_projects() {
    /* Új project adatainak mentése a szerver memóriájába */
    const saverHeads = new Headers();                   // Új fejlécek
    saverHeads.set('Mission', 'Save-Projects');         // A konkrét feladat rögzítése a Mission fejlécben
    saverHeads.set('Content-Type', 'application/json'); // jSON fájltípus rögzítése a Content-Type fejlécben
    // Adadtok küldése a szervernek.
    fetch('http://localhost:3333/data/projects.json', {
        method: 'POST',
        Headers: saverHeads,
        body: JSON.stringify(main_data, null, 4)
    })
        .then((res) => {
            const name          = document.getElementById('name');
            const description   = document.getElementById('description');
            name.value          = '';
            description.value   = '';
        })
        .catch((reas) => {
            alert('Nem sikerült elmenteni az adatokat:', reas);
        })
}

function list_projects() {
    /* Project-ek listázása */
    console.log('Listázás');
}

function seek_project(seeker) {
    /* Project keresése */
    console.log(seeker.value);
}

function main_buttons() {
    /* A főmenü gombjai állandókban eltárolása */
    const NEW_PROJECT   = document.getElementById('new-project');
    const LIST_PROJECTS = document.getElementById('list-projects');
    const SEEK_PROJECT  = document.getElementById('seek-project'); //Input mező
    const START_SEEKING = document.getElementById('start-seek-project');
    
    NEW_PROJECT.addEventListener('click', () => {new_project();});
    LIST_PROJECTS.addEventListener('click', () => {list_projects();});
    START_SEEKING.addEventListener('click', () => {seek_project(SEEK_PROJECT);});
}

function main() {
    const myHeaders = new Headers();
    myHeaders.set('Mission', 'Get-Projects-Menu')
    myHeaders.set('Content-Type', 'application/json')
    fetch('http://localhost:3333/data/projects.json', myHeaders)
        .then((response) => response.json())
        .then((data) => {
            main_data = data;
            projects = data.contents;
            MN.innerHTML = MAIN_MENU;
            main_buttons();
        })
        .catch((reas) => {
            HEAD.innerHTML = `<h1>Nem sikerült betölteni az adatokat.</h1><p>${reas}</p>`;
            console.log(this)
        })
}


main();
