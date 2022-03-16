function formatName (name) {
  return name.split('-').map(item => {
    return item[0].toUpperCase() + item.slice(1)
  }).join('');
}

module.exports = formatName