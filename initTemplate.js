const fs = require('fs-extra')
const { resolve } = require('path')

const map = {
  vue: resolve(__dirname, './vite-template/vite-vue-pages')
}

module.exports = ({ templateName }) => {
  const path = process.cwd()
  console.log(templateName, path, map[templateName])
  fs.copy(map[templateName], resolve(path, './vite-vue-pages'))
}