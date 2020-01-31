import { sumValues } from '../sumValues'

describe('sumValues', () => {
  test('should return 10 when adding 1, 2, 3, 4', () => {
    const result = sumValues([1, 2, 3, 4])

    expect(result).toEqual(10)
  })

  test('should return 10 if there are strings in the array', () => {
    const result = sumValues(['1', 2, 3, 4])

    expect(typeof result).toEqual('number')
    expect(result).toEqual(10)
  })

  test('should not add any strings that cannot be turned into numbers', () => {
    const result = sumValues(['a', 2, 3, 4])

    expect(result).toEqual(9)
  })
})
