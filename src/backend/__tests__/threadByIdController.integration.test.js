import request from 'supertest'
import express from 'express'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import { threadByIdController } from '../threadByIdController'

const id = 'a'

jest.mock('../threadsData', () => {
  return {
    threads: {
      a: {
        id: 'a',
        title: 'My first thread!',
        content: 'This is the content for the thread',
        comments: ['1', '3'],
        reactions: {
          '🔥': 30,
          '👍': 20,
        },
      },
      b: {
        id: 'b',
        title: 'Another cool thread',
        content:
          "This is the content for the second thread, it's got some stuffz",
        comments: ['2'],
        reactions: {
          '🚀': 3,
        },
      },
    },
    comments: {
      '1': {
        id: '1',
        user: 'Ben Johnson',
        content: 'This is a comment',
      },
      '2': {
        id: '2',
        user: 'Ben Johnson',
        content: 'This is another comment',
      },
      '3': {
        id: '3',
        user: 'Test Tester',
        content: 'This is a comment from Test Tester',
      },
    },
  }
})

const resolveApiHandler = handler => (req, res) => {
  req.query = {
    ...req.query,
    ...req.params,
  }
  // return handler(req, res)
  return apiResolver(req, res, req.params, handler)
}

const app = express().use(
  '/thread/:id',
  resolveApiHandler(threadByIdController)
)

describe('threadByIdController', () => {
  test('should respond 200 on a GET request', async () => {
    const res = await request(app).get('/thread/' + id)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({
      comments: [
        { content: 'This is a comment', id: '1', user: 'Ben Johnson' },
        {
          content: 'This is a comment from Test Tester',
          id: '3',
          user: 'Test Tester',
        },
      ],
      content: 'This is the content for the thread',
      id: 'a',
      reactions: { '👍': 20, '🔥': 30 },
      title: 'My first thread!',
    })
  })

  test('should respond 200 on a PATCH request', async () => {
    const res = await request(app)
      .patch('/thread/' + id)
      .set('content-type', 'application/json')
      .send({ name: '🔥' })

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({
      comments: ['1', '3'],
      content: 'This is the content for the thread',
      id: 'a',
      name: '🔥',
      reactions: { '👍': 20, '🔥': 30 },
      title: 'My first thread!',
    })
  })
})
