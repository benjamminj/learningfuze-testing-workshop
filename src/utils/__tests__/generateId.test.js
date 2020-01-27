import { generateId } from '../generateId'

const originalMathRandom = global.Math.random

describe('generateId', () => {
  beforeAll(() => {
    // set up our mocks
    global.Math.random = () => 0.5234678
  })

  afterAll(() => {
    // tear down our mocks
    global.Math.random = originalMathRandom
  })

  test('generates a random id', () => {
    expect(generateId()).toEqual('iueww4i67')
  })
})
