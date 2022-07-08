const fs = require('fs')
const { resolve } = require('path')
const buildFTLPath = resolve(__dirname, '../node_modules/vite-ftl-plugin/dist/buildFTL/index.js');

fs.writeFileSync(buildFTLPath, fs.readFileSync(resolve(__dirname, './temaplate.js')))