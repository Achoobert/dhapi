import express from 'express';
import cors from 'cors';
import fs from 'fs';
import HymnalObj from './data/DB.js';
import FileSaver from './data/filesave.js';

var app = express();
var port = 8080;
app.use(cors());
var songCollection = new HymnalObj();
var fileSave = new FileSaver();
var SONGS = songCollection.init().then((data) => {
  console.log(data)
    app.listen(port, () => {
        console.log(`data ready and example app listening at http://localhost:${port}`)
    })
    return data;
  })

// app.use(cors({
//   origin: "http://localhost:8080"
// }));
app.use(cors());

// save a massive JSON object with all the songs
app.get('/backupthesongs', (req, res) => {
  console.log("save requested");
  songCollection.getAll().then((data) => {
    fileSave.FileSave(data).then( (report) =>{
      console.log(report);
      res.send('done');
    });
  });
})

//Here we are configuring express to use  middle-ware?
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
const router = express.Router();
app.use("/", router);

// get a massive JSON object with all the songs
app.get('/songs', (req, res) => {
  console.log("data requested");
  songCollection.getAll().then((data) => {
    res.json(data)
  });
  //res.json(SONGS)
})
app.post('/songs',  (req, res) => {
  songCollection.getAll().then((data) => {
    res.json(data)
  });
})

// get an array list
app.get('/titlelist', (req, res) => {
  console.log("title list data requested");
  songCollection.getTitleList().then((data) => {
    res.json(data)
  });
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
// set a specific item 
router.post('/handle/update/:songId',(request,response) => {  
  songCollection.updateSong(request.body).then((report) => {
    console.log(report)
    response.send(report);    // echo back
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
// send a list of valid songIDs and titles in a given language
app.get("/list/:languagetag", (req, res)=>{
  res.send([{'songId':"0",'song':'abcd'},{'songId':"1",'song':'abc'}])
  // songCollection.getList()
  //   .then((dbData) => {
  //     res.send(dbData);
  //     console.log("list sent")
  //   });
})

// send a list of valid songIDs 
app.get("/", (req, res)=>{
  songCollection.getList()
    .then((dbData) => {
      res.send(dbData);
      console.log("Page sent")
    });
})




