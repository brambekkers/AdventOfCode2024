import dataRaw from './data.ts'

// const dataRaw = `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`

type Data = { result: number; numbers: number[] }[]

const parseData = (data: string): Data => {
  const lines = data.split('\n')

  return lines.map((line) => {
    const [result, rest] = line.split(': ')
    const numbers = rest.split(' ').map(Number)
    return { result: Number(result), numbers }
  })
}

const evaluateExpression = (numbers: number[], operators: string[]): number => {
  let total = numbers[0]
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      total += numbers[i + 1]
    } else if (operators[i] === '*') {
      total *= numbers[i + 1]
    } else if (operators[i] === '||') {
      total = Number('' + total + numbers[i + 1])
    }
  }
  return total
}

const checkEquation = (numbers: number[], target: number): boolean => {
  const operators = ['+', '*', '||']

  const tryCombinations = (currentOperators: string[], index: number): boolean => {
    if (index === numbers.length - 1) {
      const result = evaluateExpression(numbers, currentOperators)
      return result === target
    }

    for (const op of operators) {
      if (tryCombinations([...currentOperators, op], index + 1)) {
        return true
      }
    }
    return false
  }

  return tryCombinations([], 0)
}

const checkSum = (data: Data): number => {
  let total = 0
  for (const { result, numbers } of data) {
    if (checkEquation(numbers, result)) {
      total += result
    }
  }
  return total
}

const data = parseData(dataRaw)
const result = checkSum(data)
console.log(result)
