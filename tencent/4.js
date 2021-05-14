const arr = [
  { id: 1, name: '部门A', parentId: undefined },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: undefined },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: undefined },
  { id: 8, name: '部门H', parentId: 4 },
]

// O(n^2)
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

// 时间复杂度 O(n)，空间复杂度 O(n)
function toTree2(arr) {
  var idMap = {}
  arr.forEach((n) => {
    idMap[n.id] = n
  })

  for (let i = 0; i < arr.length; i++) {
    const node = arr[i]
    const parentNode = idMap[node.parentId]
    if (parentNode) {
      if (Array.isArray(parentNode.children)) {
        parentNode.children.push(node)
      } else {
        parentNode.children = [node]
      }
    }
  }

  return arr.filter((n) => n.parentId === undefined)
}

// console.log(JSON.stringify(toTree(arr), null, 2))
console.log(JSON.stringify(toTree2(arr), null, 2))
