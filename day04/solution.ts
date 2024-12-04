import rawData from './data.ts'

// const rawData = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`

const createHorzontalArray = (rawData: string) => {
  const data = rawData.split('\n')
  const horzontalArray: string[][] = []
  data.forEach((row) => {
    const horzontalRow = row.split('')
    horzontalArray.push(horzontalRow)
  })
  return horzontalArray
}

const createVerticalArray = (horizontal: string[][]) => {
  const verticalArray: string[][] = []

  for (let i = 0; i < horizontal[0].length; i++) {
    const verticalRow: string[] = []
    for (let j = 0; j < horizontal.length; j++) {
      verticalRow.push(horizontal[j][i])
    }
    verticalArray.push(verticalRow)
  }
  return verticalArray
}

const createDiagonalArray = (horizontal: string[][]) => {
  const diagonalArray: string[][] = []

  for (let i = 0; i < horizontal[0].length; i++) {
    const horizontalDiagonalArray: string[] = []
    for (let j = 0; j < horizontal[0].length; j++) {
      if (horizontal[j][j + i]) {
        horizontalDiagonalArray.push(horizontal[j][j + i])
      }
    }
    if (horizontalDiagonalArray.length >= 4) {
      diagonalArray.push(horizontalDiagonalArray)
    }
  }
  for (let i = 1; i < horizontal.length; i++) {
    const verticalDiagonalArray: string[] = []
    for (let j = 0; j < horizontal.length; j++) {
      if (horizontal[j + i]?.[j]) {
        verticalDiagonalArray.push(horizontal[j + i][j])
      }
    }

    if (verticalDiagonalArray.length >= 4) {
      diagonalArray.push(verticalDiagonalArray)
    }
  }

  return diagonalArray
}

const createDiagonalArrayOtherWay = (horizontal: string[][]) => {
  const diagonalArray: string[][] = []

  for (let i = 0; i < horizontal[0].length; i++) {
    const horizontalDiagonalArray: string[] = []
    for (let j = 0; j < horizontal[0].length; j++) {
      if (horizontal[j][horizontal[0].length - 1 - j - i]) {
        horizontalDiagonalArray.push(horizontal[j][horizontal[0].length - 1 - j - i])
      }
    }
    if (horizontalDiagonalArray.length >= 4) {
      diagonalArray.push(horizontalDiagonalArray)
    }
  }

  for (let i = 1; i < horizontal.length; i++) {
    const verticalDiagonalArray: string[] = []
    for (let j = 0; j < horizontal.length; j++) {
      if (horizontal[j + i]?.[horizontal[0].length - 1 - j]) {
        verticalDiagonalArray.push(horizontal[j + i][horizontal[0].length - 1 - j])
      }
    }

    if (verticalDiagonalArray.length >= 4) {
      diagonalArray.push(verticalDiagonalArray)
    }
  }

  return diagonalArray
}

const findWords = (array: string[][]) => {
  const words = ['XMAS', 'SAMX']
  let totalCount = 0

  words.forEach((word) => {
    const count = array.reduce((total, subArray) => {
      const subArrayString = subArray.join('')
      const matches = (subArrayString.match(new RegExp(word, 'g')) || []).length
      return total + matches
    }, 0)

    totalCount += count
  })

  return totalCount
}

const horizontalArray = createHorzontalArray(rawData)
const verticalArray = createVerticalArray(horizontalArray)
const diagonalArray = createDiagonalArray(horizontalArray)
const diagonalArray2 = createDiagonalArrayOtherWay(horizontalArray)

const allDirections = [...horizontalArray, ...verticalArray, ...diagonalArray, ...diagonalArray2]

console.log(findWords(allDirections))
