import { controller } from '../threadsController'

jest.mock('../threadsService', () => ({
  ThreadsService: {
    getAllThreads: () => {
      return [
        {
          comments: ['5tvf1vv39', '7sack1xhe'],
          content: 'This is the content for the thread',
          id: 'n4uajfhps',
          reactions: { '👍': 20, '🔥': 30 },
          title: 'My first thread!',
        },
        {
          comments: ['n99putsfi'],
          content:
            "This is the content for the second thread, it's got some stuffz",
          id: '624p8jvnk',
          reactions: { '🚀': 3 },
          title: 'Another cool thread',
        },
      ]
    },
    addThread: newThread => {
      const id = 'test-id'
      return {
        title: '',
        content: '',
        comments: [],
        reactions: {},
        ...newThread,
        id,
      }
    },
  },
}))

describe('threadsController', () => {
  test('should add a thread on a POST request', () => {
    // arrange
    const req = {
      method: 'POST',
      body: JSON.stringify({ title: 'Test #1', content: 'More test content' }),
    }

    const json = jest.fn()
    const status = jest.fn()
    const res = {
      status: status.mockImplementation(() => ({ json })),
    }

    // act
    controller(req, res)

    // assert
    expect(res.status).toHaveBeenCalledWith(201)

    expect(json).toHaveBeenCalledWith({
      comments: [],
      id: 'test-id',
      content: 'More test content',
      reactions: {},
      title: 'Test #1',
    })
  })

  test('should return threads on a GET request', () => {
    // arrange
    const req = {
      method: 'GET',
    }

    const json = jest.fn()

    const res = {
      status: jest.fn().mockImplementation(() => ({ json })),
    }

    // act
    controller(req, res)

    // assert
    // Tip: use `toHaveBeenCalledTimes` since it explicitly protects against
    // accidental duplicate calls
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)

    expect(json).toHaveBeenCalledTimes(1)
    expect(json).toHaveBeenCalledWith([
      {
        comments: ['5tvf1vv39', '7sack1xhe'],
        content: 'This is the content for the thread',
        id: 'n4uajfhps',
        reactions: { '👍': 20, '🔥': 30 },
        title: 'My first thread!',
      },
      {
        comments: ['n99putsfi'],
        content:
          "This is the content for the second thread, it's got some stuffz",
        id: '624p8jvnk',
        reactions: { '🚀': 3 },
        title: 'Another cool thread',
      },
    ])
  })
})
