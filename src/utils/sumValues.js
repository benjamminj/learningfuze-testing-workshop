export const sumValues = values => {
  return values.reduce((sum, val) => {
    const num = Number(val)

    if (Number.isNaN(num)) {
      return sum
    }

    return sum + num
  }, 0)
}
