function formatName (name, path = true) {
  const list = name.split('/')
  const fname = list.at(-1).split('-').map(item => {
    return item[0].toUpperCase() + item.slice(1)
  }).join('');
  list[list.length - 1] = fname;
  return path ? list.join('/') : fname
}

module.exports = formatName