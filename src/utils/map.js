/**
 * Replicates the functionality of Array.prototype.map, which uses a callback
 * function to transform the array into something else.
 *
 * Example usage
 * ```js
 * map([1, 2, 3, 4], num => num * 2)
 *
 * // returns [2, 4, 6, 8]
 * ```
 */
export const map = (array, callback) => {
  const newArray = []

  for (let i = 0; i < array.length; i++) {
    const mappedItem = callback(array[i], i, array)
    newArray.push(mappedItem)
  }

  return newArray
}
