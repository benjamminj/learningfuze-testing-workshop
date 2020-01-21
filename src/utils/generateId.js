/**
 * This function generates a semi-unique id—since we're not dealing with massive
 * volumes of data we don't really need to worry about collisions of the ids.
 * `Math.random` should be unique enough for our purposes.
 */
export const generateId = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9)
}
