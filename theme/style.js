window.onload = function (e) {
  var heading = document.getElementsByTagName('h1')[0]
  var tableRows = document.getElementsByTagName('tr')

  //current path
  breadCrumb(heading)

  //children
  for (var i = 1; i < tableRows.length; i++) {
    var row = tableRows[i]
    var cols = row.getElementsByTagName('td')

    var name = cols[1]
    var date = cols[2]
    var size = cols[3]

    //if have no date then parentdir
    formatDate(date) || formatParentDir(name)
    formatSize(size)
  }
}

function breadCrumb (node) {
  //ex.) 'Index of /web/pc-r01/src/Apaxy/apaxy'
  var text = node.innerText.trim()
  var dirList = text.split('/')
  node.innerText = ""

  //remove 'Index of'
  dirList.shift()

  //wrap h1 for styling
  var wrapper = document.createElement('header')
  node.parentNode.replaceChild(wrapper, node)
  wrapper.appendChild(node)

  var path = '/'
  //append root
  var elLink = document.createElement('a')
  elLink.href = path
  elLink.appendChild(document.createTextNode('root'))
  node.appendChild(elLink)

  //append links
  dirList.forEach(function (dir) {
    path += dir + '/'

    var elSep = document.createElement('span')
    elSep.innerText = '/'
    var elLink = document.createElement('a')
    elLink.href = path
    elLink.appendChild(document.createTextNode(dir))

    node.appendChild(elSep)
    node.appendChild(elLink)
  })
}
function formatParentDir(node){
  //replace text
  node.firstChild.innerText = '..'
}

function formatDate (node) {
  var text = node.innerText.trim()
  if (0 >= text.length) {
    return false
  }
  var m = moment(new Date(text))
  node.innerText = m.format('YYYY/MM/DD hh:mm')
  return true
}

function formatSize (node) {
  var text = node.innerText.trim()
  if (text === '-') return
  node.innerText = text.replace(/^([\d|\.]+)(K?)/i, '$1 $2B')
}
