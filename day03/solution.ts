import rawData from './data.ts';

// const rawData = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const getRealFuctions = (data: string): string[] => {
  const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
  return data.match(regex) || [];
};

const multiply = (a: number, b: number): number => a * b;

const grabDoAndDont = (rawMuls: string[]) => {
  const mulArray: string[] = [];
  let getMul = true;

  rawMuls.forEach((mul) => {
    console.log(mul);
    if (mul === 'do()') {
      getMul = true;
      return;
    }
    if (mul === "don't()") {
      getMul = false;
      return;
    }
    if (getMul) {
      mulArray.push(mul);
    }
  });
  return mulArray;
};

const removeMul = (mulString: string) => {
  const mulData = mulString.slice(4, mulString.length - 1);
  console.log(mulData);
  const [a, b] = mulData.split(',');
  return multiply(Number(a), Number(b));
};

const rawMuls = getRealFuctions(rawData);
const realMuls = grabDoAndDont(rawMuls);
console.log(realMuls);
const totalSum = realMuls.reduce((acc, mulString) => {
  return acc + removeMul(mulString);
}, 0);

console.log(totalSum);
