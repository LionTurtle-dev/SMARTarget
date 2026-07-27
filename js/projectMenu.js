/* 
Ez a program felel a Grafikus Felhasználói Felület (GUI) működéséért.
*/
let projects;
const MN = document.getElementById("mn");
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
<form action="">
    <fieldset>
        <legend><strong>Új Project</strong></legend>
        <label for="name">Project Neve*:</label>
        <input title="Adj egy frappáns nevet a project-ednek!" placeholder="Új Project" id="name" type="text" required autofocus><br>
        <label for="description">Project Leírása</label><br>
        <textarea title="Adj egy rövid leírást a project-ről, hogy könnyebben átlásd, mit kell csinálnod!" placeholder="Project rövid Leírása" id="description" cols="45" rows="10"></textarea><br>
    </fieldset>
    <div id="buttons">
        <button type="submit" id="submit">Project létrehozása</button>
        <button id="cancel">Mégse</button>
    </div>
</form>
`;

function new_project() {
    // Új project űrlapja
    console.log('Új Project');
}

function list_projects() {
    // Project-ek listázása
    console.log('Listázás');
}

function seek_project(seeker) {
    // Project keresése
    console.log(seeker.value);
}

const myHeaders = new Headers();
myHeaders.set('Mission', 'Get-Projects-Menu')
myHeaders.set('Content-Type', 'application/json')
fetch('http://localhost:3333/data/projects.json', myHeaders)
    .then((response) => response.json())
    .then((data) => {
        projects = data;
        // console.log(projects);
        MN.innerHTML = MAIN_MENU;
        const NEW_PROJECT   = document.getElementById('new-project');
        const LIST_PROJECTS = document.getElementById('list-projects');
        const SEEK_PROJECT  = document.getElementById('seek-project'); //Input mező
        const START_SEEKING = document.getElementById('start-seek-project');

        NEW_PROJECT.addEventListener('click', () => {new_project();});
        LIST_PROJECTS.addEventListener('click', () => {list_projects();});
        START_SEEKING.addEventListener('click', () => {seek_project(SEEK_PROJECT);});
    })
    .catch((reas) => {
        HEAD.innerHTML = `<h1>Nem sikerült betölteni az adatokat.</h1>`;
        console.log(this)
    })


