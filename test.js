import { sumValues } from './src/utils/sumValues'

const sum = sumValues([1, 2, 3, 4, 5])

const test = (description, callback) => {
  try {
    callback()
    console.log('✅', description)
  } catch (error) {
    // exit code w/ non-0
    throw new Error(error)
  }
}

test('should return 15 when adding 1-5', () => {
  if (sum !== 15) {
    throw new Error(`😱 expected ${sum} to equal 15`)
  }
})
