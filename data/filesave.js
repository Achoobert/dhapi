import jsonfile from 'jsonfile';
const file = './data/json/backup.json'

export default class FileSave {
  /*
   * Param is JSON data 
   */
  async FileSave(data) {
    let filePath = './data/json/backup${getFullYear()}${getMonth()}${getDate}.json'
    jsonfile.writeFile(filePath, data)
      .then(res => {
        console.log('Write complete')
        return 'Write complete'
      })
      .catch(error => console.error(error))
  }
}