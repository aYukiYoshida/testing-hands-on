export const fizzbuzz = (n: number): string => {
  if (n >= 50) {
    throw new Error("50以下の値を入力してください");
  }
  const output: string[] = [];
  if (n % 3 === 0) {
    output.push("Fizz");
  }
  if (n % 5 === 0) {
    output.push("Buzz");
  }
  return output.join("") || n.toString();
};
