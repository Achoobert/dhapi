//const express = require('express')
//import('express')
import express from 'express';
import cors from 'cors';
import fs from 'fs';

//import FileSave from './data/filesave.js';
import HymnalObj from './data/DB.js';
const SONGS = fs.readFileSync(`./data/test/megaFile.json`, 'utf8', (err, data) =>{
  if (err) {
    console.error(err)
  }
  return (data);
});
var songCollection = new HymnalObj();
songCollection.getAll().then((data) => console.log(data))

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




//console.log(SONGS)

app.get('/songs', (req, res) => {
  res.send(SONGS)
  //res.send(JSON.stringify(songCollection));
})

app.get('/song', (req, res) => {
  res.send( JSON.stringify(
      songCollection.getSong(1)
      )
    );
})

// app.get('/', (req, res) => {
//   //res.send('Hello World!')
//   //
//   console.log(songCollection.getString('1'))
//   res.send( songCollection.getString('1') );
// })

app.get("/", (req, res)=>{
  const songid = '1'
  songCollection.getList()
    .then((dbData) => {
      console.log({"data is": dbData})
      res.send(dbData);
      console.log("Page sent")
    });
})
// app.get("song/:songid", (req, res)=>{
//   const songid = req.params.songid;
//   getParsedHTML(songid)
//     .then((parsedHTML) => {
//       res.json({
//         username,
//         parsedHTML
//       });
//       console.log("Page sent")
//     });
// })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
