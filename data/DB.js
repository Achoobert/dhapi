import fs from "fs";
import Database from "@replit/database";
const db = new Database();

export default class HymnalDB {
  static constructor() {
    this.db = db
    this.availableId
  }

  // rebuilds the entire database. if song is in import, it will be over written
  // Does Not overwrite non-backed up songs!
  async init() {
    fs.readFileAsync = function() {
      return new Promise(function(resolve, reject) {
        fs.readFile(`./data/test/megaFile.json`, function(err, data) {
          if (err)
            reject(err);
          else
            resolve(data);
        });
      });
    };
    return fs.readFileAsync().then((promisedata) => {
      var data = JSON.parse(promisedata)
      let promiseArr = []
      data.dataArray.forEach(song => {
        promiseArr.push(this.setSong(song.id, song));
      });
      return Promise.all(promiseArr)
    });
  }
  async getAll() {
    return db.getAll().then(databaseData => {
      if (databaseData == null) {
        this.init().then(() => {
          return this.getAll();
        })
      } else {
        return databaseData;
      }
    });
  };
  // async getTitleList(){
  //   return this.titleList
  // }
  async getList() {
    return db.list().then(keys => {
      if (keys == null) {
        return "keys are null"
      }
      return keys
    });
  }
  async getSong(key) {
    return db.get(key).then(value => {
      if (value == null) {
        return "song value is null"
      }
      return value;
    });
  }
  async setSong(key, newData) {
    return db.set(key, newData).then((key) => {
      // TODO fs write
      console.log({ "Written new data": newData, "key": key });
      return ({'message':`updated song: ${newData.id}`})
    });
  }
  // meant to only be called by index, checks data
  async updateSong(requestData) {
    let key = await this.checkKey(requestData.songId)
    return db.get(key).then(songData => {
      if (songData == undefined || songData.song === {} || songData === "song value is null") {
        console.log('song did not already exist... creating')
        return this.insertNewSong(key, requestData.newData);
      } else if (!songData.song || songData.song.lyrics === undefined){
        // data is malformed, reset it, and continue
        this.getBlankSong(key).then(newSongData => {
          let tempData = {'song':newSongData,'id':key,'songId':key}
          return this.updateExistingSong(requestData, key, tempData)
        })
      } else {
        return this.updateExistingSong(requestData, key, songData)
      }
    });
  }
  async updateExistingSong(requestData, key, songData) {
      if (requestData.lineId) {
        songData.song.lyrics.verses[requestData.verseId].lines[requestData.lineId] = requestData.newData;
      } else if (requestData.verseId) {
        songData.song.lyrics.verses[requestData.verseId] = requestData.newData;
      } else {
        songData.song = requestData.newData;
      }

      return this.setSong(key, songData)
  }
  // meant to only be called by index, checks data
  async newSong(newData) {
    let key = await this.checkKey(newData.songId)
    // verify does not exist
    getSong(key).then(value => { 
      if(value == undefined || value === "song value is null"|| !value.song || value.song === {}){
        // key is available
        return this.insertNewSong(key, newData)
      } else {
        // use the next available ID
        let newSongId = this.availableId.toString()
        this.insertNewSong(newSongId, {}).then( ()=> { // reserve a blank spot in the database...
          this.findNextAvailableId() // then send this function off to find the next spot
        });
        return newSongId;
      }
    })
  }
  async insertNewSong(key, newData) {
    return db.set(key, newData).then((key) => {
      // TODO fs write
      console.log(key);
      return key
    });
  }
  async deleteSong(key) {
    return db.delete(key).then(() => {
      // TODO fs write
      console.log("deleted")
    });
  }
  async resetDB(list) {
    list.forEach(id => {
      db.delete(id);
    });
  }
  async checkKey(key) {
    if (key === undefined || key === null || isNaN(parseInt(key)) ) {
      console.log({ "This is not a valid key for inserting or updating a song": key });
      //find a new key
      let newSongId = this.availableId.toString()
      this.insertNewSong(newSongId, {}).then( ()=> { // reserve a blank spot in the database...
        this.findNextAvailableId() // then send this function off to find the next spot
      });
      return newSongId;
    } else {
      return key
    }
  }
  async findNextAvailableId() {
    return this.getList().then(list => {
      if (list === "keys are null") {
        return new Promise(function(resolve, reject) {
          try{
             new Promise(res => setTimeout(res,10000)).then( ()=> {
            this.findNextAvailableId().then(data => { resolve( data )
            })
          }); // try again in 120 seconds
          }catch(err){
            reject(err);
          }
        });
      } else {
        // look through the array and find an available ID
        return new Promise(function(resolve, reject) {
          try {
            var sortedArray = list
              .slice() // Make a copy of the array.
              .sort((a, b) => {
                return parseInt(a) - parseInt(b)
              })// Sort it.
            // Loop starts at 0 and immidiatly adds one
            var previousId = -1;
            for (let element of sortedArray) {
              if (element != (previousId+1).toString()) {
                // Found a gap.
                resolve (previousId + 1);
              }
              previousId = parseInt(element);
            }
            // Found no gaps.
            resolve (previousId + 1)
          } catch (err){
            reject(err)
          }
        }).then( foundId =>{
          this.availableId = foundId;
          return foundId
        });
      }
    })
  }
  async getBlankSong(id){
    return {
          "title": {
              "en": "*"
          },
          "author": "*",
          "key": "*",
          "lyrics": {
              "verses": [
                  {
                      "lines": [
                          {
                              "phrases": [
                                  {
                                      "chord": "*",
                                      "number": "1",
                                      "en": "*"
                                  }
                              ]
                          }
                      ],
                      "label": "Verse 1",
                      "id": 1
                  }
              ]
          },
          "metadata": [
              {
                  "en": "Copyright..."
              }
          ],
          "id": id
      }
  }
}

