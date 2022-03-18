import http from 'http'; //impoer pre-bundled module(s)
import fs from 'fs';
import mime from 'mime-types';// thrid- party module

let lookup = mime.lookup;

//const hostname = '127.0.0.1'; // Aka LocalHost
const port = process.env.PORT || 3000;

//Creating a instance of a server (Immutable)
const server = http.createServer(function(req, res){

    //console.log(req.url);
    let path = req.url as string;
    if(path == "/" || path == "/home")
    {
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1)) as string;

    fs.readFile(__dirname  + path, function(err, data)
    {
        if (err) 
        {
            res.writeHead(404);
            res.end("Error: 404 - File not found" + err.message);
            return;
        } 
            res.setHeader("X-Content-Type-Options", "nosniff");
            res.writeHead(200, {'Content-Type': mime_type});
            res.end(data);
   

 /*  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!'); */
    });
});
// Like addEventListener("user req on a port")
server.listen(port, function() {
  console.log(`Server running at Port: ${port}`);
});


