import rawData from './data.ts'

// const rawData = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`

const createMatrix = (rawData: string) => {
  const data = rawData.split('\n')
  const twoDArray: string[][] = []
  data.forEach((row) => {
    const twoDRow = row.split('')
    twoDArray.push(twoDRow)
  })
  return twoDArray
}

const findGuardPosition = (matrix: string[][]) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '^') {
        return [i, j]
      }
    }
  }

  return [-1, -1]
}

const getNextPosition = (matrix: string[][], curPos: number[], dir: string) => {
  const nextPos = [curPos[0], curPos[1]]
  if (dir === 'up') nextPos[0]--
  if (dir === 'left') nextPos[1]--
  if (dir === 'down') nextPos[0]++
  if (dir === 'right') nextPos[1]++
  return matrix[nextPos[0]]?.[nextPos[1]]
}

const guardWalk = (matrix: string[][], maxSteps = 10000) => {
  let curPos: number[] = findGuardPosition(matrix)
  let steps = 0
  let dir = 'up'

  while (
    curPos[0] >= 0 &&
    curPos[0] < matrix.length &&
    curPos[1] >= 0 &&
    curPos[1] < matrix[0].length &&
    steps < maxSteps
  ) {
    const nextPos = getNextPosition(matrix, curPos, dir)
    if (nextPos === '#') {
      if (dir === 'up') dir = 'right'
      else if (dir === 'left') dir = 'up'
      else if (dir === 'down') dir = 'left'
      else if (dir === 'right') dir = 'down'
    } else {
      if (dir === 'up') curPos[0]--
      else if (dir === 'left') curPos[1]--
      else if (dir === 'down') curPos[0]++
      else if (dir === 'right') curPos[1]++

      if (nextPos) {
        steps++
        matrix[curPos[0]][curPos[1]] = 'X'
      }
    }
  }

  return steps
}

const newMatrix = createMatrix(rawData)
// const steps = guardWalk(newMatrix)

const countAllX = (matrix: string[][]) => {
  let count = 0
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 'X') count++
    }
  }
  return count
}

const addExtraObstacles = (matrix: string[][]) => {
  let totalLoops = 0
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === '.') {
        const tempMatrix = matrix.map((row) => [...row])
        tempMatrix[i][j] = '#'
        const threshold = 50000
        const steps = guardWalk(tempMatrix, threshold)
        if (steps === threshold) totalLoops++
      }
    }
  }

  console.log(totalLoops)
}
console.log(addExtraObstacles(newMatrix))
