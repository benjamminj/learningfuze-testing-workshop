import { request } from '../request'
import fetch from 'isomorphic-unfetch'

jest.mock('isomorphic-unfetch', () => {
  return jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ json: () => ({ test: 'json' }) })
    )
})

const originalRootUrl = process.env.ROOT_URL

describe('request', () => {
  beforeAll(() => {
    process.env.ROOT_URL = 'https://example.com'
  })

  afterAll(() => {
    process.env.ROOT_URL = originalRootUrl
  })

  beforeEach(() => {
    // clear all the call data being captured in between every test.
    fetch.mockClear()
  })

  test('should return json for the endpoint', async () => {
    const result = await request('/test')

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/test', {})
    expect(result).toEqual({ test: 'json' })
  })

  test('should allow passing "method" and "body" options to fetch', async () => {
    const result = await request('/another', {
      method: 'POST',
      body: { content: 'test' },
    })

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/another', {
      method: 'POST',
      body: '{"content":"test"}',
    })
  })
})
