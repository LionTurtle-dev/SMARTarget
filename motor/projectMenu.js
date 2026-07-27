/* 
Ez a program felel a Grafikus Felhasználói Felület (GUI) működéséért.
*/
let projects;
const HEAD = document.getElementById("head");
const MAIN_MENU = `
<menu>
    <ul>
        <li id="new-project">Új Project</li>
        <li id="list-projects">Project-ek listázása</li>
        <li>
            <div class="seeker">
                <input type="checkbox" name="p-kilincs">
                <label for="p-kilincs">Project keresése</label>
                <input type="text" name="seek-project" id="seek-project">
                <button id="start-seek-project">Keress!</button>
            </div>
        </li>
    </ul>
</menu>
`;
const DASHBOARD = `
<menu>
    <ul>
        <li id="save-data">Adatok mentése</li>
        <li id="delete-project">Project törlése</li>
        <li id="new-task">Új Feladat</li>
        <li id="list-tasks">Feladatok listázása</li>
        <li>
            <div class="seeker">
                <input type="checkbox" name="p-kilincs">
                <label for="p-kilincs">Feladat keresése</label>
                <input type="text" name="seek-task" id="seek-task">
                <button id="start-seek-task">Keress!</button>
            </div>
        </li>
    </ul>
</menu>
`;

const myHeaders = new Headers();
myHeaders.set('Mission', 'Get-Projects-Menu')
myHeaders.set('Content-Type', 'application/json')
fetch('http://localhost:3333/data/projects.json', myHeaders)
    .then((response) => response.json())
    .then((data) => {
        projects = data;
        // console.log(projects);
        HEAD.innerHTML = MAIN_MENU;
        const NEW_PROJECT   = document.getElementById('new-project');
        const LIST_PROJECTS = document.getElementById('list-projects');
    })
    .catch((reas) => {
        HEAD.innerHTML = `<h1>Nem sikerült betölteni az adatokat.</h1>`;
        console.log(this)
    })


