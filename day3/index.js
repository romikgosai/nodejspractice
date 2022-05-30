import http from "http";

const server = http.createServer((req,res) =>{
    res.writeHead(200);
    res.end("backend is working")
});

server.listen(8000, () =>{
    console.log("server is starting");
});