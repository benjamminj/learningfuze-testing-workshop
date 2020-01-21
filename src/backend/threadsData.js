// This file is our makeshift "database"—for the sake of simplicitly we're just using
// 2 JavaScript objects to represent two tables or collections in the DB.

/**
 * A list of threads.
 * Each thread's comments are an id from the "comments" object down below. If this were
 * a SQL database that would be the column holding the relationship.
 */
export const threads = {
  n4uajfhps: {
    id: 'n4uajfhps',
    title: 'My first thread!',
    content: 'This is the content for the thread',
    comments: ['5tvf1vv39', '7sack1xhe'],
    reactions: {
      '🔥': 30,
      '👍': 20,
    },
  },
  '624p8jvnk': {
    id: '624p8jvnk',
    title: 'Another cool thread',
    content: "This is the content for the second thread, it's got some stuffz",
    comments: ['n99putsfi'],
    reactions: {
      '🚀': 3,
    },
  },
}

/** Comments to various threads. */
export const comments = {
  '5tvf1vv39': {
    id: '5tvf1vv39',
    user: 'Ben Johnson',
    content: 'This is a comment',
  },
  n99putsfi: {
    id: 'n99putsfi',
    user: 'Ben Johnson',
    content: 'This is another comment',
  },
  '7sack1xhe': {
    id: '7sack1xhe',
    user: 'Test Tester',
    content: 'This is a comment from Test Tester',
  },
}
