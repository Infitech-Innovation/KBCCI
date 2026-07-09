// const {createServer} = require("http");
// const express = require('express');
// const next = require('next');

// const dev = process.env.NODE_ENV !=='production';

// const app = next({dev});
// const handle = app.getRequestHandler();

// //use environment variable

// const port = process.env.PORT || 3000;

// app.prepare().then(()=>{
// createServer((req, res) = {
// const parsedurl = parse(req.url, true)
// handle(re, res, parsedurl);
// }).listen(port,(err)=>{
// if(err) throw err;
// console.log(`> Server ready on http://localhost:${port}`);
//    // const server = express();

// //server.all('*',(req,res) => handle(req,res));

// // server.listen(port,(err) => {
// // if(err) throw err;
// // console.log(`> Server ready on http://localhost:${port}`);
// });
// })