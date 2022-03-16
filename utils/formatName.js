function formatName (name) {
  const list = name.split('/')
  const fname = list.at(-1).split('-').map(item => {
    return item[0].toUpperCase() + item.slice(1)
  }).join('');
  list[list.length - 1] = fname;
  return list.join('/')
}

module.exports = formatName