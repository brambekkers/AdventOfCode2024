import rawData from './data.ts'

// Extract the information from the string data
const createLists = (data: string) => {
  const list1: number[] = []
  const list2: number[] = []

  const pairs = data.split('\n')

  pairs.forEach((pair) => {
    const [left, right] = pair.split('   ')
    list1.push(Number(left))
    list2.push(Number(right))
  })

  return { list1, list2 }
}

// Prepare the data for processing
const sortNumberArrayAscending = (numberArray: number[]) =>
  numberArray.sort((a, b) => {
    return a - b
  })

const { list1: unsortedList1, list2: unsortedList2 } = createLists(rawData)
const list1 = sortNumberArrayAscending(unsortedList1)
const list2 = sortNumberArrayAscending(unsortedList2)

// Calculate the total distance between the two lists
const calculateDistance = (list1: number[], list2: number[]) => {
  let totalDistance = 0

  for (let i = 0; i < list1.length; i++) {
    totalDistance += Math.abs(list2[i] - list1[i])
  }

  return totalDistance
}

const countNumber = (arr: number[], num: number) => arr.filter((n) => n === num).length

const calculateSimilarity = (list1: number[], list2: number[]) => {
  let totalSimilarity = 0

  for (let i = 0; i < list1.length; i++) {
    totalSimilarity += list1[i] * countNumber(list2, list1[i])
  }

  return totalSimilarity
}

console.log('The outcome of challenge 1:', calculateDistance(list1, list2))
console.log('The outcome of challenge 2:', calculateSimilarity(list1, list2))
