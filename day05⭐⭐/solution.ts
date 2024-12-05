import rawData from './data.ts'

// const rawData = `47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47`

const getRules = (rawData: string) => rawData.split('\n').map((line) => line.split('|'))
const getPages = (rawData: string) => rawData.split('\n').map((line) => line.split(','))

const splitRulesAndChecks = (rawData: string) => {
  const [rules, pages] = rawData.split('\n\n')
  return {
    rules: getRules(rules),
    pages: getPages(pages)
  }
}

const { rules, pages } = splitRulesAndChecks(rawData)

const checkPageOrder = (page: string[]) => {
  for (let i = 0; i < page.length; i++) {
    for (const rule of rules) {
      const [rule1, rule2] = rule
      if (page[i] === rule1) {
        for (let j = i - 1; j >= 0; j--) {
          if (page[j] === rule2) return false
        }
      }
    }
  }
  return true
}

const getMiddleNumber = (page: string[]) => Number(page[Math.floor(page.length / 2)])
const countAllMiddleNumbersForCorrectPages = (pages: string[][]) => {
  let count = 0
  for (const page of pages) {
    const isCorrect = checkPageOrder(page)
    if (isCorrect) {
      const middleNumber = getMiddleNumber(page)
      count += middleNumber
    }
  }
  return count
}

const correctThePageOrder = (page: string[]) => {
  for (let i = 0; i < page.length; i++) {
    for (const rule of rules) {
      const [rule1, rule2] = rule
      if (page[i] === rule1) {
        for (let j = i - 1; j >= 0; j--) {
          if (page[j] === rule2) {
            const temp = page[j]
            page[j] = page[i]
            page[i] = temp
          }
        }
      }
    }
  }

  if (!checkPageOrder(page)) {
    correctThePageOrder(page)
  }

  return page
}

const countAllMiddleNumbersForIncorrectPages = (pages: string[][]) => {
  let count = 0
  for (const page of pages) {
    const isCorrect = checkPageOrder(page)
    if (!isCorrect) {
      const newPage = correctThePageOrder(page)
      const middleNumber = getMiddleNumber(newPage)
      count += middleNumber
    }
  }
  return count
}

console.log(countAllMiddleNumbersForIncorrectPages(pages))
