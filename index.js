//const express = require('express')
//import('express')
import express from 'express';
import cors from 'cors';
import fs from 'fs';

//import FileSave from './data/filesave.js';
import HymnalObj from './data/DB.js';
// const SONGS = fs.readFileSync(`./data/test/megaFile.json`, 'utf8', (err, data) =>{
//   if (err) {
//     console.error(err)
//   }
//   return (data);
// });
var songCollection = new HymnalObj();
var SONGS = songCollection.getAll().then((data) => {
    app.listen(port, () => {
        console.log(`data ready and example app listening at http://localhost:${port}`)
    })
    return data;
  })

const router = express.Router();
var app = express();
// app.use(cors({
//   origin: "http://localhost:8080"
// }));
app.use(cors());


//Here we are configuring express to use  middle-ware?
//app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  

// add router in the Express app.
app.use("/", router);

const port = 8081

// var cacheSongs = songCollection.getAll();
// async function getAllSongs(){
//   console.log("Checking if data is cached...")
//   return new Promise(function(resolve, reject) {
//     if (cacheSongs){
//       console.log("data is cached...")
//       resolve(cacheSongs);
//     } else{
//       songCollection.getAll().then((data) => {
//         cacheSongs = data;
//         console.log("Cache is saved?")
//         resolve(data);
//       })
//     } 
//   });
// }

// get a massive JSON object with all the songs
app.get('/songs', (req, res) => {
  console.log("data requested");
  // songCollection.getAll().then((data) => {
  //   res.json(data)
  // });
  res.send(SONGS)
  // songCollection.getAll().then((data) => {
  //   res.json(data)
  // })
  //res.json(testData)
})


// get a massive JSON object with all the songs
app.get('/titlelist', (req, res) => {
  console.log("title list data requested");
  songCollection.getTitleList().then((data) => {
    res.json(data)
  });
  // res.send(SONGS)
  // songCollection.getAll().then((data) => {
  //   res.json(data)
  // })
  //res.json(testData)
})

// get a single song based on the ID you've sent
app.get('/song/:songid', (req, res) => {
  songCollection.getSong(req.params.songid).then((data) => {
    console.log('song sent')
    res.json(data)
  });
});

// set a single song 
router.post('/handle',(request,response) => {
  //To access POST variable use req.body()methods.
  console.log(request.body);// your JSON
  
  songCollection.setSong(request.body.songId, request.body.song).then((report) => {
    console.log(report)
    response.send("thanks!");    // echo back
  });
});

// send a list of valid songIDs 
app.get("/list", (req, res)=>{
  res.send(["0","1","10","100"])
  // songCollection.getList()
  //   .then((dbData) => {
  //     res.send(dbData);
  //     console.log("list sent")
  //   });
})

// send a list of valid songIDs 
app.get("/", (req, res)=>{
  const songid = '1'
  songCollection.getList()
    .then((dbData) => {
      //songCollection.resetDB(dbData)
      res.send(dbData);
      console.log("Page sent")
    });
})




