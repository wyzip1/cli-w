const fs = require('fs')

function createFile (fileName, _path, data = '') { 
  let path = _path;
  const list = fileName.split('/');
  const last = list.at(-1);
  for (const file of list) {
    path += '/' + file
    const exists = fs.existsSync(path)
    if (exists) continue;
    if (file === last) {
      fs.writeFileSync(path, data)
    }
    else fs.mkdirSync(path)
  }
}

module.exports = createFile