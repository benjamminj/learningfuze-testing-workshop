import { map } from '../map'

describe('map', () => {
  test('should transform the array into a different array', () => {
    const result = map([1, 2, 3], num => num * 2)

    expect(result).toEqual([2, 4, 6])
  })

  test('should not change the original array', () => {
    const original = [1, 2, 3]
    map(original, num => num * 2)

    expect(original).toEqual([1, 2, 3])
  })
})
