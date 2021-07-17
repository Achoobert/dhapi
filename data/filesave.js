export default class FileSave {
 
/*
 * Param is JSON data as raw string from post
*/
 async FileSave(data) {
    // TODO check a password
    var usableData = data;
    console.log(data)
    // if (typeof(data) != 'JSON'){
    //     console.log("got a string?")
    //     usableData = JSON.parse(data.toString());
    // }else{
    //     usableData = data
    //     console.log("already json")
    // }
    //var songId = usableData.songId;
    var song = usableData.data

    // get filename 
    // filename is just the title under the AT translation
    // AT, else grab EN, else whatever
    var filename;
    if(song.title['at']){
        filename = (song.title['at'])
    } else if (song.title['en']){
        filename = (song.title['en'])
    }else{
        // TODO check if this actually works
        for (const tag in song.title) {
            if (Object.hasOwnProperty.call(song.title, tag)) {
                const element = song.title[tag];
                filename = element
                break;
            }
        }
    }
    filename = filename.trim().concat('.js')


    var songData = ('export default ').concat(JSON.stringify(song))    
    // write to file
    fs.writeFile(`./test/${filename}`, songData, function(err) {
        if(err) {
            return console.log(err);
        }
            return(`${filename} was saved!`);
    });

 }
}