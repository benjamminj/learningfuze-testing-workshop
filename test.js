require('esm')(module)

const assert = require('assert')
const { sumValues } = require('./src/utils/sumValues')
const { map } = require('./src/utils/map')

function test(description, callback) {
  try {
    callback()
    console.log('✅', description)
  } catch (error) {
    console.log('🚨', description, error)
    throw error
  }
}

test('should return 10 when adding 1, 2, 3, 4', () => {
  const result = sumValues([1, 2, 3, 4])

  assert(result === 10, 'result should equal 10')
})

test('should return 10 if there are strings in the array', () => {
  const result = sumValues(['1', 2, 3, 4])

  assert(typeof result === 'number', 'result should be a number')
  assert(result === 10, 'result should equal 10')
})

// sumValues(['a', 2, 3, 4]) -> 9
test('should not add any strings that cannot be turned into numbers', () => {
  const result = sumValues(['a', 2, 3, 4])

  assert(result === 9, 'result should equal 9')
})

test('map > should transform the array into a different array', () => {
  const result = map([1, 2, 3], num => num * 2)
  assert(result[0] === 2, 'result should be double')
  assert(result[1] === 4, 'result should be double')
  assert(result[2] === 6, 'result should be double')
})

test('map > should not change the original array', () => {
  const original = [1, 2, 3]
  const result = map(original, num => num * 2)

  assert(original[0] === 1, 'original should not change')
  assert(original[1] === 2, 'original should not change')
  assert(original[2] === 3, 'original should not change')
})
