/**
 * @name sumValues
 * @param {number[]} values
 */
// export const sumValues = valuesArray => {
//   let sum = 0

//   for (const num of valuesArray) {
//     sum += num
//   }

//   return sum
// }

// Uncomment this version of sumValues and comment the other one out if you're
// working on exercise #1 and you want to make your tests pass.
//
export const sumValues = values => {
  return values.reduce((sum, val) => {
    const num = Number(val)

    if (Number.isNaN(num)) {
      return sum
    }

    return sum + num
  }, 0)
}
