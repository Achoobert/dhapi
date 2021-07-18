import fs from "fs";
import Database from "@replit/database";
const db = new Database()
// db.set("key", "value").then(() => {});
// db.get("key").then(value => {});
// db.delete("key").then(() => {});
// db.list().then(keys => {});
// db.list("prefix").then(matches => {});
// Get all key/value pairs and return as an object.
// setAll(Object obj)

export default class HynmalDB{
    static constructor(songs) {
      songs.forEach(song => {
        this.db.set(song.id, {"id":song.id, "song": song.song}).then((report) => {
          console.log(report)
        });
      });
      this.songs = init()
    }
    async getAll(){
      //return this.db.setAll(Object obj)
    }
    async getList(){
      return this.db.list()// .then(keys => {});
    }
    async getSong(key){
      return this.db.get(key)//.then(value => {});
    }
    async updateSong(key, newData){
      return this.db.set(key, newData).then((key) => {
        // TODO fs write
        console.log(key);
        return key
      });
    }
    async newSong(key, newData){
      return this.db.set(key, newData).then((key) => {
        // TODO fs write
        console.log(key);
        return key
      });
    }
    async deleteSong(key){
      return this.db.delete(key).then(() => {
        // TODO fs write
        console.log("deleted")
      });
    }
}

