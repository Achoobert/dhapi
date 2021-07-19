import fs from "fs";
import Database from "@replit/database";
const db = new Database();

export default class HymnalDB{
    static constructor() {
      this.db = db
    }
    
    async init(){
      fs.readFileAsync = function() {
        return new Promise(function(resolve, reject) {
          fs.readFile(`./data/test/megaFile.json`, function(err, data){
            if (err) 
              reject(err); 
            else 
              resolve(data);
          });
        });
      };
      return fs.readFileAsync().then((promisedata) => {
        var data = JSON.parse(promisedata)
        db.setAll(data.dataArray)
        return data.dataArray
        // data.dataArray.forEach(song => {
        //   this.titleList.push({'id':song.id, 'title':song.title })
        // });
      });
    }
    async getAll(){
      return db.getAll().then(databaseData => {
        if (databaseData == null){
          this.init().then(() =>{
            return this.getAll();
          })
        }else{
          return databaseData;
        }
      });
    };
    // async getTitleList(){
    //   return this.titleList
    // }
    async getList(){
      return db.list().then(keys => {
        if(keys==null){
          return "keys are null"
        }
        return keys
      });
    }
    async getSong(key){
      return db.get(key).then(value => {
        if(value==null){
          return "song value is null"
        }
        return value;
      });
    }
    async setSong(key, newData){
      return db.set(key, newData).then((key) => {
        // TODO fs write
        console.log({"Written new data":newData,"key":key});
        return (`updated song: ${newData.id}`)
      });
    }
    // update only selected
    async updateSong(requestData){
      let key = requestData.songId
      return db.get(key).then(songData => {
        if (songData.song == undefined){
          console.error('is undefined')
          return ({"error is undefined":songData})
        }
        if(requestData.lineId){
          songData.song.lyrics.verses[requestData.verseId].lines[requestData.lineId] = requestData.newData;
        } else if(requestData.verseId){
          songData.song.lyrics.verses[requestData.verseId] = requestData.newData;
        } else {
          songData.song = requestData.newData;
        }  
        
        return this.setSong(key, songData)
      });
    }
    async newSong(key, newData){
      return db.set(key, newData).then((key) => {
        // TODO fs write
        console.log(key);
        return key
      });
    }
    async deleteSong(key){
      return db.delete(key).then(() => {
        // TODO fs write
        console.log("deleted")
      });
    }
    async resetDB(list){
      list.forEach(id => {
            db.delete(id);
      });
    }
}

