const { createFile, formatName }  = require('./utils')
const ejs = require('ejs')
const { react_temp_path, vue_temp_path } = require('./constant')

const map = {
  createJs,
  createReact,
  createVue
}

function createJs (fileName) {
  const path = process.cwd()
  const file = fileName + '/index.js'
  createFile(file, path)
}

async function createReact (_fileName) { 
  const fileName = formatName(_fileName);
  const path = process.cwd();
  const file = fileName + '/index.jsx';
  const data = await ejs.renderFile(react_temp_path, { fileName });
  createFile(file, path, data);
}

async function createVue (_fileName) {
  const fileName = formatName(_fileName);
  const path = process.cwd();
  const file = fileName + '/index.vue';
  const data = await ejs.renderFile(vue_temp_path, { fileName });
  createFile(file, path, data);
}

module.exports = function createFolder(args) { 
  const key = Object.keys(args)[0]
  map[key](args[key])
}