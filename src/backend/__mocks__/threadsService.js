export const ThreadsService = {
  getAllThreads: () => {
    return [
      {
        comments: ['a', 'b'],
        content: 'This is the content for the thread',
        id: '1',
        reactions: {
          '👍': 20,
          '🔥': 30,
        },
        title: 'My first thread!',
      },
      {
        comments: ['c'],
        content:
          "This is the content for the second thread, it's got some stuffz",
        id: '2',
        reactions: { '🚀': 3 },
        title: 'Another cool thread',
      },
    ]
  },

  addThread: newThreadData => {
    const id = '1'
    return {
      comments: [],
      id,
      reactions: {},
      ...newThreadData,
    }
  },

  addComment: (id, comment) => {
    return {
      id: id,
      ...comment,
    }
  },
}
