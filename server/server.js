/* 
Ez a szerver kezeli a program memóriáját. (Egyelőre csak lokális hálózaton.)
*/
const FS    = require('fs/promises');
const HTTP  = require('http');

const Server = HTTP.createServer((req, res) => {
    /* Ez a szerver kezeli a front-end kéréseit. */
    const ORIGIN = req.headers.origin
    res.setHeader('Access-Control-Allow-Origin', ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    async function readData(f) {
        return await FS.readFile(`${__dirname}${f}`, 'utf8')
            .then((dat) => {
                // Ha az olvasás sikeres...
                return dat;
            })
            .catch(() => {
                // ha nem sikerült a file-t kiolvasni...
                return false;
            });
    }

    async function saveData(filename, data) {
        try {
            let cél = `${__dirname}${filename}`;
            await FS.writeFile(cél, data, 'utf8');
        } catch (err) {
            console.error('Nem sikerült az adatokat menteni:', err);
        }
    }
    
    if (req.method === 'GET') {
        let response = readData(req.url);
        response.then((dat) => {
            if (dat) {
                // Ha sikerült adatoto kiolvasni, 200-as státuszkóddal válaszol a szerver.
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(dat);
            } else {
                // Ha nem sikerült adatoto kiolvasni, 404-es státuszkóddal válaszol a szerver.
                res.writeHead(404, 'File not found...')
                console.log(`[${__dirname}${req.url}]: ${res.statusMessage}`);
                res.end('');
            }
        })
    }
    
    /* FIGYELEM!!!!!
    Ez a kód még átnézendő, az adatfolyamok működésének jobban utána kell néznem. 
    */
    let full_data;
    if (req.method === 'POST') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            req.on('end', () => {
                full_data = Buffer.concat(body).toString();
                try {
                    saveData(req.url, full_data);
                } catch (err) {
                    console.log(
                        'Nem sikerült elmenteni az adatokat:',
                        `[${full_data}]:\n`,
                        err
                    );
                } finally {
                    res.writeHead(200);
                    res.end('OK');
                }
            });
        });
    }
})

Server.listen(3333, () => {
    console.log('A szerver fut...');
});
