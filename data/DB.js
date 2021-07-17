import glob from "glob";
import fs from "fs";

export default class HynmalObj{
    static constructor() {
        this.songs = init()
    }
    async init(){
        var array
        glob("../json/*.json", function(err, files) { // read the folder or folders if you want: example json/**/*.json
            if(err) {
                console.log("cannot read the folder, something goes wrong with glob", err);
            }
            files.forEach(function(file) {
                fs.readFile(file, 'utf8', function (err, data) { // Read each file
                if(err) {
                    console.log(`cannot read ${file}, something goes wrong with the file`, err);
                }
                array.push({'id':data.id, 'data':data})
                });
            });
        });
        return array;
    }
}
