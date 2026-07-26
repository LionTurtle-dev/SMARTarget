/* 
Ez a program felel a Grafikus Felhasználói Felület (GUI) működéséért.
*/

const HEAD = document.getElementById("head");

HEAD.innerHTML = `
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
</menu>`;
const NEW_PROJECT   = document.getElementById('new-project');
const LIST_PROJECTS = document.getElementById('list-projects');

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

