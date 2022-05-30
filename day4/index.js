// import http from "http";

// const server = http.createServer((req,res) => {
    // res.writeHead(200);
    // res.end("Backend is working");
    // console.log(res);
    // if (req.url==="/books"){
    //     res.writeHead(200);
    //     res.end("Book url");
    // }else if(req.url === "/others"){
    //     res.writeHead(200);
    //     res.end("Others");
    // }else{
    //     res.writeHead(200);
    //     res.end("Backend is working");
    // }


//     switch(req.url){
//         case "/books":
//             res.writeHead(200);
//             res.end("Book");
//             console.log(req.method);
//             break;
//         case "/others":
//             res.writeHead(200);
//             res.end("Others");
//             break;
//         default:
//             res.writeHead(200);
//             res.end("Backend is working");
//     }


// });

// server.listen(8000,()=>{
//     console.log("Server has started");
// });


// import chalk from "chalk";

// console.log(chalk.bgCyan("Hello there"));


import winston from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "combined.log"
        }),
    ],
});
logger.log({
    level: "info",
    message: "Hello distributed log files",
});