var http = require('http');
fs = require('fs');

function readstaticFilesToRes(res, path, contentType)
{
    var responseCode = 200;
    fs.readFile(__dirname + "/"  + path, function(err,data) {
        if (err)
        {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal error');
        } else
        {
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    });
}

http.createServer(function(req,res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '');
    switch (path)
    {
        case '':
            readstaticFilesToRes(res, 'app/index.html', 'text/html');
            break;
        default:
            readstaticFilesToRes(res, 'app/Error.html', 'text/html');
            break;

    }
}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');;