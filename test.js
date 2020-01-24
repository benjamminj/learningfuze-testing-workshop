require('esm')(module)

const { sumValues } = require('./src/utils/sumValues')

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

  if (result !== 10) {
    throw new Error('result should equal 10')
  }
})
