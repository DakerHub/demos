const arr = [
  {
    id: 1,
    name: 'x1',
  },
  {
    id: 2,
    name: 'x2',
  },
  {
    id: 3,
    name: 'x3',
    parentId: 2,
  },
]

function toTree(arr) {
  var idMap = {}
  arr.forEach((n) => {
    idMap[n.id] = n
  })

  const roots = arr.filter((n) => n.parentId === undefined)

  var findChildren = (node) => {
    node.children = arr.filter((n) => n.parentId === node.id)
    node.children.forEach((sub) => {
      findChildren(sub)
    })
  }

  roots.forEach((node) => {
    findChildren(node)
  })

  return roots
}

console.log(JSON.stringify(toTree(arr), null, 2))
