/* 
Ez a szerver kezeli a program memóriáját. (Egyelőre csak lokális hálózaton.)
*/
const FS    = require('fs/promises');
const HTTP  = require('http');

const Server = HTTP.createServer((req, res) => {
    const ORIGIN = req.headers.origin
    // console.log(ORIGIN);
    res.setHeader('Access-Control-Allow-Origin', ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    async function readData(f) {
        return await FS.readFile(`${__dirname}${f}`, 'utf8')
            .then((dat) => {
                // console.log(`Project data: ${dat}`);
                return dat;
            })
            .catch(() => {
                // console.log(`${__dirname}${f}`)
                return false;
            });
    }

    if (req.method === 'GET') {
        let response = readData(req.url)
        response.then((dat) => {
            // console.log(dat);
            if (dat) {
                // console.log(dat);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(dat);
            } else {
                // console.log('404: Nincsen...')
                res.writeHead(404, 'File not found...')
                console.log(`[${__dirname}${req.url}]: ${res.statusMessage}`);
                res.end('');
            }
        })
    }
})

Server.listen(3333, () => {
    console.log('A szerver fut...');
});
