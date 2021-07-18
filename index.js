//const express = require('express')
//import('express')
import express from 'express';
import cors from 'cors';
import fs from 'fs';

//import FileSave from './data/filesave.js';
import HynmalObj from './data/DB.js';
var songCollection //= new HynmalObj();
//var fileSave = new FileSave();
const router = express.Router();
var app = express();
app.use(cors({
  origin: "http://localhost:8080"
}));


//Here we are configuring express to use  middle-ware?
//app.use(express.urlencoded());
app.use(express.json());  

router.post('/handle',(request,response) => {
  //To access POST variable use req.body()methods.
  var incomingData = ''
  request.on( 'data', function(chunk) { incomingData.concat(chunk); } );
  request.on( 'close', function() { 
    console.dir({"Request body":incomingData});// your JSON
    //fileSave.FileSave(incomingData);
    response.send("thanks!");    // echo the result back
  } );
  console.log(request.body);// your JSON
});

// add router in the Express app.
app.use("/", router);

const port = 8081



const SONGS = fs.readFileSync(`./data/test/megaFile.json`, 'utf8', (err, data) =>{
  if (err) {
    console.error(err)
  }
  return (data);
  console.log(data)
  songCollection = new HynmalObj(data);
});
//console.log(SONGS)

app.get('/songs', (req, res) => {
  
  res.send(SONGS)
  //res.send(JSON.stringify(songCollection));
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
