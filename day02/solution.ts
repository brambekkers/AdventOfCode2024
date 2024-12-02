import rawData from './data.ts'

// const rawData = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`

const getNestedLists = (data: string) => {
  const nestedLists: number[][] = []
  const lists = data.split('\n')
  lists.forEach((list) => {
    const nestedList = list.split(' ').map(Number)
    nestedLists.push(nestedList)
  })
  return nestedLists
}

const nestedLists = getNestedLists(rawData)

const isListSafe = (list: number[]) => {
  let increasing = true
  let decreasing = true

  for (let i = 1; i < list.length; i++) {
    const diff = list[i] - list[i - 1]
    if (diff < -3 || diff > 3 || diff === 0) return false
    if (diff < 0) increasing = false
    if (diff > 0) decreasing = false
  }

  return increasing || decreasing
}

const isSafeWithDampener = (list: number[]) => {
  if (isListSafe(list)) return true

  for (let i = 0; i < list.length; i++) {
    const modifiedlist = list.slice(0, i).concat(list.slice(i + 1))
    if (isListSafe(modifiedlist)) return true
  }

  return false
}

const countSafeLists = (nestedLists: number[][]) => {
  let count = 0
  nestedLists.forEach((list, index) => {
    console.log('list', index)
    if (isSafeWithDampener(list)) {
      console.log('safe')
      count++
    }
  })
  return count
}

console.log(countSafeLists(nestedLists))
