## Making our own testing framework (30)

Printing a message to the console in CI isn't exactly valuable, so we're gonna add a test script that we can run to check our code. Throughout the rest of the workshop we'll be using [Jest](TODO:) and [Cypress](TODO:) to write our tests, but before we set those up we're gonna take a step back and build our own "test runner".

Sometimes when working with something new it's valuable to build a stripped-down version from scratch. While the stripped-down version might not have all the bells and whistles, it's easier for us to understand the tool since we've built all the functionality ourselves.

Let's start our testing framework by creating a raw `test.js` file at the root of our app.

```js
// test.js
console.log('Running the tests... 🚀')
```

In addition, let's update our `package.json` to run this `test.js` file.(The `-r esm` part makes sure that we can run JavaScript with ES imports without needing something like Babel to compile the code. It's using the [esm](TODO:) package.)

```json
{
  "scripts": {
    "test": "node -r esm ./test.js"
  }
}
```

If you run `yarn test` you should see the logging in your console. Let's start writing some tests.

Let's start by testing some of the files in the `utils` folder. I usually find this to be a good place to start when adding tests to a project since most utility functions are simpler and usually pure functions. We'll start with the `sumValues` function.

`sumValues` takes an array of numbers and adds them all up, returning the sum of all the values. Let's import it into our `test.js` file.

```js
// test.js
import { sumValues } from './src/utils/sumValues'
```

What should our test do though? If we use the definition from earlier—a test is a script that runs our code and checks that it's correct—we need our test to do those two things: it needs to _execute_ our code and then it needs to _assert_ that our code returns the value that we want it to. If it doesn't we'll want to `throw` an error which crashes the script.

We'll start with the _execute_ portion of our test.

```js
// test.js
import { sumValues } from './src/utils/sumValues'

const result = sumValues([1, 2, 3, 4])
```

And then let's add a check that `sumValues` returned the correct value, in this case `10`.

```js
// test.js
import { sumValues } from './src/utils/sumValues'

const result = sumValues([1, 2, 3, 4])

if (result !== 10) {
  throw new Error('🚨 sumValues > result should equal 10 but it equals', result)
}

console.log('✅ sumValues > should equal 10 when adding 1, 2, 3, and 4')
```

If the `result` doesn't equal `10`, running `yarn test` will throw the error and crash the node runtime, failing the test. However, if the `result` _is_ `10`, our app will pass right along and log out that the test was successful.

Try running `yarn test` once to inspect this output. Then intentionally make the test fail (perhaps make change it to `sumValues([1, 2, 3, 5])` so that `result` is equal to `11`) and observe the error output.

Make a commit and push it up to GitHub so that Travis can run our test. If you'd like, push up a broken commit and see the CI fail.

```bash
git add .
git commit -m 'add test for sumValues'
git push origin testing-workshop
```

### Cleaning up

This is cool and all, but it's not exactly scalable to have all of the test code at the root of the file. What if we to add another test that tries different inputs to `sumValues`? Our `test.js` file is gonna get pretty messy really quick. Let's add a function to wrap some of the logging code so that we can clean these files up. We'll call this function `test`.

```js
// test.js
function test(description, callback) {
  try {
    callback()
    console.log('✅', description)
  } catch (error) {
    console.error('🚨', description, error)
    throw error.
  }
}
```

Our `test` function takes two arguments, a `description` (a string) and a `callback` (a function). It first tries running the code inside of `callback` and if that code doesn't throw any errors, it logs out the success message. If the code _does_ throw an error it logs out the error message and rethrows the error.

_It's important that we have that `throw` portion inside of the `test` function so that failed tests still crash the Node runtime. If you leave this out you might see the error output but the tests won't crash (i.e. CI will still "pass" even though the tests are broken)._

Let's update `test.js` to use our new `test` function.

```js
// test.js
import { sumValues } from './src/utils/sumValues'

function test(description, callback) {
  try {
    callback()
    console.log('✅', description)
  } catch (error) {
    console.error('🚨', description, error)
    throw error.
  }
}

test('sumValues > should return 10 when adding 1, 2, 3, and 4', () => {
  const result = sumValues([1, 2, 3, 4])

  if (result !== 10) {
    throw new Error('expected 10 but recieved', result)
  }
})
```

This is a lot better, but let's add one more improvement before we start adding a bunch more tests. Having the `if` check and having to write `throw` every time we want to assert something isn't the worst in the world, but we can clean this up if we add our own `assert` function.

```js
// test.js
function assert(assertion, message) {
  if (assertion === false) {
    throw new Error(message)
  }
}
```

Our `assert` function takes two arguments, `assert` (a boolean) and `message` (a string). If the assertion doesn't equal `true`, the function throws the error. Otherwise it does nothing.

Let's update our test to use `assert` now 😎

```js
// test.js
import { sumValues } from './src/utils/sumValues'

function test(description, callback) {
  try {
    callback()
    console.log('✅', description)
  } catch (error) {
    console.error('🚨', description, error)
    throw error.
  }
}

function assert(assertion, message) {
  if (assertion === false) {
    throw new Error(message)
  }
}

test('sumValues > should return 10 when adding 1, 2, 3, and 4', () => {
  const result = sumValues([1, 2, 3, 4])

  assert(result === 10, `expected 10 but recieved ${result}`)
})
```

_Fun fact—`assert` is built-in with Node, so we actually don't even need our custom `assert` function! If we delete `assert` and add an import at the top of our file everything should still work perfectly!_. (It's good that we made our own, it's very close to what `assert` does under the hood).

```js
// test.js
import assert from 'assert'
import { sumValues } from './src/utils/sumValues'

function test(description, callback) {
  try {
    callback()
    console.log('✅', description)
  } catch (error) {
    console.error('🚨', description, error)
    throw error.
  }
}

test('sumValues > should return 10 when adding 1, 2, 3, and 4', () => {
  const result = sumValues([1, 2, 3, 4])

  assert(result === 10, `expected 10 but recieved ${result}`)
})
```

With that we're ready to add some more of our own tests! As an exercise, let's add some additional tests for `sumValues`.

## 💻 Exercise #1 (10)

I've added two empty tests with descriptions to `test.js`. Add code to make both of the tests run and pass.

```js
// test.js
test('sumValues > should return 10 when adding 1, 2, 3, and 4', () => {
  const result = sumValues([1, 2, 3, 4])

  assert(result === 10, `expected 10 but recieved ${result}`)
})

test('sumValues > should still return the sum when 1 item is a string', () => {})

test("sumValues > should filter out any strings that can't be transformed into a number", () => {})
```

_Note: if you've set up the two tests correctly they will fail when you first run them against `sumValues`. To verify that the tests pass go to the `sumValues` file and uncomment the fixed code (or update the function to fix the bugs on your own for bonus points!)._

## Swapping over to Jest (5)

Now that we've got a few tests and we understand what's happening under the hood with our testing framework, it's time to add Jest to the project. I've already installed `Jest` as a `devDependency`, but if you're creating this from scratch you would need to install `jest`.

```bash
yarn add --dev jest
```

With Jest installed we can modify `package.json` to run `jest` instead of our Node script.

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Let's run `yarn test` and see what happens. You'll notice that our tests failed even though all of the preexisting tests in `test.js` ran! 😱

You should see an error message saying something like this:

```
Your test suite must contain at least one test.
```

The reason for this is that Jest needs us to use its version of `test` so that it can pick up the tests. Jest already knows to run any files with `test.js` in the name (as well as a few other patterns which you can see [on the Jest docs](TODO: link)), but we'll need to update our `test` function.

Fortunately Jest comes with a `test` function built-in and added as a global variable, and it takes the exact same arguments as the `test` function that we wrote! So all we need to do is delete our `test` function and everything should work. 🔥

```js
// test.js
import assert from 'assert'
import { sumValues } from './src/utils/sumValues'

test('sumValues > should return 10 when adding 1, 2, 3, and 4', () => {
  const result = sumValues([1, 2, 3, 4])

  assert(result === 10, `expected 10 but recieved ${result}`)
})
```

Now if you run `yarn test` you should see the output from Jest! Jest works fine with `assert` but we can swap this for the built-in assertions that come with Jest.

### Swapping to `expect`

Jest assertions are provided via another global function—`expect`. `expect` has two main parts, the `actual` and the `expected`. An `expect` assertion looks like this:

```js
expect(actual).toEqual(expected)
```

There's tons of methods on `expect` that we can use, but for this workshop we'll mostly be using `toEqual`. It does a deep equality check to make sure the values for the left and right sides are equal. Let's update our test to use `expect` instead of `assert`.

```js
// test.js
import { sumValues } from './src/utils/sumValues'

test('sumValues > should return 10 when adding 1, 2, 3, and 4', () => {
  const result = sumValues([1, 2, 3, 4])

  expect(result).toEqual(10)
})
```

### Updating our file system

Next, we're gonna do a little bit of reorganization to _colocate_ our tests with the code that they test. Jest automatically picks up any files matching `test.js`, `.test.js`, and files inside of a `__tests__` folder. I typically like to put all my tests as `.test.js` files inside a `__tests__` folder in the same directory as the code that they're testing.

Let's add a new folder at `src/utils/__tests__`, and we'll create a `sumValues.test.js` file inside of it. You directory structure should look like this:

```
src
├ utils
│  ├ __tests__
│  │   |⎼ sumValues.test.js
│  ├ sumValues.js
│  ├ (other util files)
```

Then we'll copy over the code from `test.js` into `src/utils/__tests__/sumValues.test.js` and update the imports appropriately. Once you've done this you can go ahead and delete `test.js`.

```js
// src/utils/__tests__/sumValues.test.js
import { sumValues } from '../sumValues'

test('should return 10 when adding 1, 2, 3, and 4', () => {
  const result = sumValues([1, 2, 3, 4])

  expect(result).toEqual(10)
})
```

You should be able to run `yarn test` and nothing will have changed, only the file paths. 😎

Setting up our tests like this allows our tests to scale with our app. Rather than having a giant `tests` directory at the root of the app (common in some testing approaches) we have our unit tests nicely located near the code that we're testing. This means that no matter whether your app is a few hundred lines of code or hundreds of thousands, the unit tests will only be a directory away from the code itself. Additionally, if you ever decide to move folders around you don't have to go update the tests!

### Describe

One last thing we can do to "jestify" our test is add a test suite block around our tests. While this isn't required, it's good practice to have a wrapper around the group of tests to keep them organized.

In Jest we can use `describe` (another global variable added by Jest) to group our tests into blocks. Let's add a `describe` around our tests.

```js
// src/utils/__tests__/sumValues.test.js
import { sumValues } from '../sumValues'

describe('sumValues', () => {
  test('should return 10 when adding 1, 2, 3, and 4', () => {
    const result = sumValues([1, 2, 3, 4])

    expect(result).toEqual(10)
  })

  // other tests
})
```

You can have multiple `describe`s in a single file—they're incredibly handy at separating groups of tests if you've got multiple functions in a single file that you want to test.

```js
import { a, b } from 'sample'

describe('a', () => {
  test('something testing a', () => {})
})

describe('b', () => {
  test('something testing b', () => {})
})
```

## ⏱ Organizing mocks for reuse (bonus content?)

<!-- Estimated time: 5 minutes -->

Over time, you might find that you're always mocking the same things and that you have a lot of duplication due to mocking. For example, in each controller we're mocking the `ThreadsService`.

Fortunately Jest gives us a way to clean up this reuse of our mocks by using their [`manual mocks`](https://jestjs.io/docs/en/manual-mocks) API. What we can do is we can make a "mock" version of the `threadsService` file and drop it in a `__mocks__` folder next to the real `threadsService` module. Once we do that, Jest, will automatically use our mock when we do `jest.mock`.

Let's create a new file at `src/backend/__mocks__/threadsService.js`. Inside of it we'll combine our two mocks of the `threadsService` that we previously had in the test files

```js
// src/backend/__mocks__/threadsService.js

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
```

Once again, _we do not need to mock everything in `threadsService`_, only the portions that we use. That said, chances are your file mocks will be more complete than your mocks inside of the test files.

Once we've set up our mock file for `threadsService` we can update our mock to just be this:

```js
// src/backend/__tests__/threadByIdController.js

jest.mock('../threadsService')
```

## 💻 Exercise 8

<!-- Estimated time: 10 min -->

Add a new Cypress test to handle error states within the app using Cypress's response mocking. You can organize the test however you want (in the same spec file or in a different one), but go through the flow of a user creating a thread and attempting to go to the thread profile page. However, make it so that the `POST` request to create a new thread fails! 😱

You may find that the app doesn't respond gracefully when this request fails. In this case consider the failing test a completion of this exercise. As a bonus, update the code to make the app handle failure states more gracefully.

> 💡 Tip: you'll want to check out [`cy.request`](https://docs.cypress.io/api/commands/request.html#Options) with the `options` argument. This should give you what you need to make the network request return an error status.

## 💻 Exercise #2

<!-- Estimated time: 5-10 min -->

Create a new test file inside `src/utils/__tests__` named `map.test.js`. Import the `map` function and write some tests to cover its functionality. If you find bugs feel free to modify the `map` function, but remember to write a failing test first!

Use the `expect` assertions provided by Jest.

> Tip: if you're having trouble trying to figure out _what_ to test, try reading the comments and code inside the `map` function. I've left a bit of documentation about what it's supposed to do.

```js
// map.test.js
import { map } from '../map'

describe('map', () => {
  // write your tests here
})
```

### Mocking a global dependency

<!-- Estimated time: 5 min -->

`request` uses `process.env.ROOT_URL` to provide a base url for the request. For example, if you set `ROOT_URL=https://example.com` and then ran `request('/test')`, you'd actually be firing a request to `https://example.com/test`. Right now there's a default of `http://localhost:3000` inside of `request`, but ideally we should mock out `process.env.ROOT_URL` in our test so we can test that as well.

However, `process.env` is a globally added object inside of Node. We don't want to mess up other test files that rely on `process.env` when we create our mock, so we'll need to be extra careful to set up and tear down our mock.

We can leverage two more lifecycle hooks from Jest, `beforeAll` (runs before the entire test suite) and `afterAll` (runs after the entire test suite) to handle setup/teardown.

```js
// src/utils/__tests__/request.test.js

// Store a reference to the actual process.env.ROOT_URL so that we can restore it.
const originalRootUrl = process.env.ROOT_URL

describe('request', () => {
  beforeAll(() => {
    // Set process.env.ROOT_URL to whatever we want for our tests
    process.env.ROOT_URL = 'https://example.com'
  })

  afterAll(() => {
    // Restore the original process.env.ROOT_URL
    process.env.ROOT_URL = originalRootUrl
  })

  beforeEach(() => {
    fetch.mockClear()
  })

  test('should return json for the endpoint', async () => {
    // test
  })

  test('should allow passing "method" and "body" options to fetch', async () => {
    // test
  })
})
```

Now that we're using a mock for `process.env.ROOT_URL`, all we need to do is update our tests to assert our new endpoint.

```js
// src/utils/__tests__/request.test.js

// mocking stuff up here

describe('request', () => {
  // test lifecycle hooks up here

  test('should send a fetch request to the url and resolve with the JSON', async () => {
    // arrange — mocking is done up above
    // act
    const result = await request('/test')
    // assert
    expect(fetch).toHaveBeenCalledTimes(1)

    // update this line
    expect(fetch).toHaveBeenCalledWith('https://example.com/test', {})
    expect(result).toEqual({ test: 'json' })
  })

  test('should allow passing "method" and "body" options to fetch', async () => {
    const result = await request('/another', {
      method: 'POST',
      body: { content: 'test' },
    })

    expect(fetch).toHaveBeenCalledTimes(1)

    // update this line
    expect(fetch).toHaveBeenCalledWith('https://example.com/another', {
      method: 'POST',
      body: '{"content":"test"}',
    })
  })
})
```

## 💻 Exercise 5

<!-- Estimated time: 5 min -->

Create a new test file for `generateId` in `src/utils/__tests__/generateId.test.js`. This function relies on `Math.random` to create a unique id every time it is called. Mock out `Math.random` and write a test for `generateId`.

> 💡 Tip: check out what `Math.random` returns by [checking it out on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random). Make sure that your mock returns the same type of response as the real `Math.random`. One quick way to get mock values is to try it out in a console (ie the browser console or Node REPL) and copy-paste an actual value for your mock.

<details>
  <summary>Expand to see the answer.</summary>

```js
import { generateId } from '../generateId'

const originalMathRandom = Math.random
describe('generateId', () => {
  beforeAll(() => {
    Math.random = () => 0.54321
  })

  afterAll(() => {
    Math.random = originalMathRandom
  })

  test('should generate a random id', () => {
    expect(generateId()).toEqual('jk007gql6')
  })
})
```

</details>

> ⭐️ Bonus points: there's actually a much more elegant way to mock something on a global object using some features of Jest. Check out this [article I wrote about mocking fetch](https://www.benjaminjohnson.me/blog/mocking-fetch/) and see if you can update the global mocks we added to use this method.

## 💻 Exercise 6

<!-- Estimated time: 5-10 min -->

Let's add a test for `src/backend/commentsController.js`. Only mock out the database with a Jest mock and use `supertest` to create a mock app and hit the endpoint in your tests.

> 💡 Tip: You'll likely need to reuse the adapter we wrote for the other backend integration test, at this time if you want it might be a good idea to spin up a new `test-utils/createApp` function to house the logic.

> 💡 Tip: You'll also likely have the same mock for the database, this would be a good time to move the database mock to one of the Jest file mocks that we covered earlier in our unit on mocking. 💪

<details>
  <summary>Expand to view the answer:</summary>

```js
import express from 'express'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import request from 'supertest'
import { commentsController } from '../commentsController'

// This is the answer without file mocks, if you have your mocks in files then your
// `jest.mock` will be considerably shorter.
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

const resolveApiHandler = (req, res, handler) => {
  req.query = {
    ...req.query,
    ...req.params,
  }

  return apiResolver(req, res, req.params, handler)
}

const app = express()
app.use('/threads/:id/comments', (req, res) =>
  resolveApiHandler(req, res, commentsController)
)

const id = 'a'

describe('/comments', () => {
  test('should allow creating a comment', async () => {
    const res = await request(app)
      .post(`/threads/${id}/comments`)
      .set('content-type', 'application/json')
      .send({ user: '@benjamminj', content: 'test' })

    expect(res.status).toEqual(201)

    const { id: commentId, ...body } = res.body

    // Since id is auto-generated, we just want to check that it was generated.
    // Reason is we're still running thru all of the business logic.
    expect(typeof commentId).toEqual('string')
    expect(body).toEqual({
      content: 'test',
      user: '@benjamminj',
    })
  })
})
```

</details>
