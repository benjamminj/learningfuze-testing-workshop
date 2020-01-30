### Set up the repository (5)

https://github.com/benjamminj/learningfuze-workshop-setting-up-tests

**Step 1:** "Fork" the repo using the "fork" button in the top right corner. This will create your own local "clone" of the repository, where you have full access to commit to `master`. _It's important that you fork the repo since we will be setting up services that require you to have push access to the repo on GitHub._
**Step 2:** Clone your fork of the repo by copying the HTTPS link in the top right.

```bash
git clone https://github.com/{your username}/learningfuze-workshop-setting-up-tests.git

cd learningfuze-workshop-setting-up-tests
```

**Step 3:** Add my repo as the "upstream" branch to the repo:

```bash
git remote add upstream https://github.com/benjamminj/learningfuze-workshop-setting-up-tests.git
```

To verify that the upstream branch was added you can use this command:

```bash
git remote -v
```

You should see both `origin` listing your fork, and `upstream` listing my fork.

> 🚀 Throughout the workshop, I'll periodically push commits up to my branch. If at any point you find yourself falling behind on the coding examples or you want to set your branch to match mine, use this command to checkout my branch

```bash
# This will pull down all of my branches on the repo, you should see their names
# appear in your console.
git fetch upstream

# If you "checkout" one of my branches your codebase will be synced with my
# branch. Note that any commits you had in your branch will not be carried over,
# but they won't be lost—they'll stay in whatever branch you were on.
git checkout {upstream branch name}
```

**Step 4:** Install dependencies using `yarn`. If you haven't installed `yarn` you can do so by running `npm install --global yarn` in your console.

```bash
yarn
```

## Continuous Integration (15)

### What is "continuous integration" (CI)?

<details>
<summary>Click to view answer</summary>

> CI is basically a service that runs your tests / scripts in a special environment — the value prop is that every check-in of code guarantees that certain checks are run.

</details>
```

### Setting up TravisCI

For this workshop we'll be using a CI service called [Travis](https://travis-ci.com/). Head over to the home page and create an account if you haven't already. You'll need to link your GitHub account and install the Travis CI GitHub app.

That should be everything to get Travis CI set up to watch your repos. It'll sync all of your repos and when you push commits up to GitHub it will run tests on any repos that contain a Travis configuration file.

Let's create a `.travis.yml` file at the root of the project.

```yml
language: node_js

node_js:
  - 10.16.3
```

_Note: you can use another version of Node if you want, I'm just using the version that's on my machine. That said, I'd recommend using version 10 or 12._

Make a commit and push it up to your repo.

```bash
# Create a new branch so that we're not polluting master.
# You can name it anything, I'll just use "testing-workshop" throughout any
# examples.
git checkout -b testing-workshop

# Stage the travis.yml file and make a new commit.
git add .
git commit -m 'Add travis.yml'

# Push our branch up to GitHub.
git push origin testing-workshop
```

If you check Travis you should see that the CI started a new build! But the build will fail (spoiler alert) with an error message saying something like this:

```bash
yarn test

yarn run v1.15.2
error Command "test" not found.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

The command "yarn test" exited with 1.
```

The reason this failed is that we haven't specified a `test` command in our `package.json`. By default Travis looks for and runs whatever you have in the `test` script. Let's add that to our `package.json`

```json
{
  "scripts": {
    "test": "echo 'add a test command 🚀'"
  }
}
```

`echo` just prints that string out to the console, but if we add another commit and push it up we'll see that the travis build doesn't fail.

```bash
git add .
git commit -m 'add test script'
git push origin testing-workshop
```

Congrats! We've set up Travis to run `yarn test` on every pushed commit, and now we can go about setting up our tests with the knowledge that every commit will be checked against the test suite.

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

## 💻 Exercise #2 (10)

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

## Review: unit tests (5)

<!--
TODO:
definition of a unit test
qualities of a unit test
  - isolated
  - tests the module
  - asserts expected output for pure functions
  - asserts expected behavior (side effects) for impure functions
arrange -> act -> assert
 -->

## Intro to mocking (5)

This is great, we've got our test suite for a few pure utility functions, but what do we do when what we're testing isn't pure? If the code has side effects, how do we test _that_?

To test side effects we're gonna dive into something that tends to be one of the more confusing things about testing: mocking.

If you've read any blogs on testing or seen stuff on LinkedIn and Twitter about testing, you might have heard the terms _mock_, _spy_, and _stub_ used interchangeably in reference to mocking.

### Spies

> **A test spy** is a function that is generated and records all of the arguments passed to it.

Since the test spy records the arguments passed to it, we can access the arguments and assert on "what the function was called with". This makes it incredibly useful for testing callbacks.

In jest, we can create a spy function with the following:

```js
const mySpy = jest.fn()

// `mySpy.mock.calls` holds all the info for arguments passed into the spy function
```

### Stubs

> **A test stub** replaces the functionality of the original function with a new behavior.

Test stubs let us replace unpredictable pieces of our app with something more predictable. They're also incredibly useful for recreating difficult-to-reproduce scenarios.

We can stub a callback by writing our own function and using _that_ instead of the original function:

```js
// the real function
const request = endpoint => fetch(endpoint).then(res => res.json)

// We rewrite the entire request function to do our own thing.
// If it's used as a callback, you would just pass `myStub` instead of `request`
const myStub = endpoint => Promise.resolve(JSON.stringify({ endpoint }))
```

### Mocks

Depending on who you talk to, a _test mock_ can have a number of definitions. For the purposes of this workshop, I'll mainly use **_mock_** to refer to _some combination of a spy and a stub._ I'll also use it as a "catch-all" for both spies and stubs.

In Jest we can easily add stubbing functionality to a spy function to get a full-featured mock. We'll do this using `mockImplementation`:

```js
// original
const request = endpoint => fetch(endpoint).then(res => res.json)

const myMockRequest = jest
  // .fn() lets us listen to whatever the function was called with.
  .fn()
  // .mockImplementation() lets us customize what the mock function returns.
  .mockImplementation(endpoint => Promise.resolve(JSON.stringify({ endpoint })))
```

There's a few methods we'll use mocks to test our code with side-effects, let's put them to practice in our codebase!

## Mocking with dependency injection (10)

One common method of getting our mock into the code that we're testing is by using _dependency injection_ for our functions. If you're not familiar with dependency injection, here's a brief definition (some of the definitions you'll find out there are very detailed and complex):

> **Dependency injection** is where you pass a **dependency** to the code that needs is as an argument (if it's a function) or in the constructor (if it's a class).

In practice it looks something like the `controller` function from our `src/backend/threadsController.js` file.

```js
export const controller = (req, res) => {
  if (req.method === 'GET') {
    const threads = ThreadsService.getAllThreads()
    res.status(200).json(threads)
  }

  // handlers for other methods
}
```

The `controller` function has a few external dependencies, but right now we're gonna focus in on `req` and `res`. Both of these get into `controller` as arguments, but they contain methods and values that are used throughout the function body (`req.method`, `res.status().json()`).

Let's first think about _what_ we want to test on `controller`. It's not a pure function since it doesn't return anything. Since this is an `express` server under the hood, calling `res.status(200).json(threads)` lets the server know to end the request with a status 200 and to send a JSON response containing the threads.

That's the main side effect that we care about in this function—that it calls that method. We don't need to test that `express` knows how to send a JSON response, that's already well-tested in the framework. But we do need to test that `res.status().json()` got called with the correct arguments when `req.method` is a `GET` request.

Since both `req` and `res` are arguments to the `controller` function, we can just pass our mocks straight into `controller`. Let's create a test for `threadsController`

```js
// src/backend/__tests__/threadsController.test.js

describe('threadsController', () => {
  test('should respond with status 200 and a JSON list of requests on a GET request', () => {
    // arrange
    // set up a mock for req. We don't need mock an entire request, just the
    // parts that we're using inside of `controller`
    const req = {
      method: 'GET',
    }

    // Set up a mock for `res.status().json()`. Since we're not using any of its
    // output we don't need to give it any functionality.
    const mockJson = jest.fn()

    // For mocking res.status(), we need it to be a function that returns an
    // object containing our `json` function.
    // This will allow us to do `res.status().json()`
    const mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson }))

    // Set up a mock `res`.
    const res = {
      status: mockStatus,
    }

    // act
    controller(req, res)

    // assert
    // 🤔 what do we assert?
  })
})
```

We've done 2 out of the 3 steps for our function, but what about our _assert_ step? How do we check that our mock functions were called with the arguments that we want?

Jest provides a three helpful assertions inside of `expect` that makes working with mock functions incredibly useful.

```js
// src/backend/__tests__/threadsController.test.js

// check that the mock function was called
expect(mockStatus).toHaveBeenCalled()

// Check that the mock function was called an explicit number of times.
// This is useful if you want to protect against accidentally calling something
// multiple times.
expect(mockStatus).toHaveBeenCalledTimes(1)

// Assert on the arguments passed to `mockStatus`.
expect(mockStatus).toHaveBeenCalledWith(200)
```

Let's use those to flesh out our test.

```js
// src/backend/__tests__/threadsController.test.js

// assert
expect(mockStatus).toHaveBeenCalledTimes(1)
expect(mockStatus).toHaveBeenCalledWith(200)

expect(mockJson).toHaveBeenCalledTimes(1)
// Put all of the expected JSON inline. If it's so large that it feels like it's taking
// up too much space in your test file it's ok to either A) pull out
// the expected response into a separate file, or B) test pieces of the
// response (like the length, the items one-by-one, etc.)
//
// Some people will advocate for using snapshot tests, but I'm not the biggest fan
// of them. I think they have a few uses but for most things you're better off
// asserting on more focused output than you are using a ginormous snapshot.
expect(mockJson).toHaveBeenCalledWith([
  {
    comments: ['5tvf1vv39', '7sack1xhe'],
    content: 'This is the content for the thread',
    id: 'n4uajfhps',
    reactions: { '👍': 20, '🔥': 30 },
    title: 'My first thread!',
  },
  {
    comments: ['n99putsfi'],
    content: "This is the content for the second thread, it's got some stuffz",
    id: '624p8jvnk',
    reactions: { '🚀': 3 },
    title: 'Another cool thread',
  },
])
```

## 💻 Exercise 3 (5)

Add a test to `src/backend/__tests__/threadsController` to cover sending a `POST` request. Add mocks `req` and `res` inside of the `test` block to cover what you need.

> 💡 Tip: once you've got the test creating a new thread you might notice that the thead's `id` is different every time, making it much more difficult to test. You can use `mockFn.mock.calls` to get the arguments passed into a mock function, exclude `thread.id` from your test since it's not predictable, and use `toEqual` instead of `toHaveBeenCalledWith`. (You can read more about `mock.calls` on the [Jest docs](https://jestjs.io/docs/en/mock-functions#using-a-mock-function)). We'll look at some ways to make this cleaner in a little bit.

```js
// src/backend/__tests__/threadsController.test.js

describe('threadsController', () => {
  test('should respond with status 200 and a JSON list of requests on a GET request', () => {
    // all the stuff from the test we just finished
  })

  test('should respond with status 201 and the created thread JSON', () => {
    // arrange
    // act
    // assert
  })
})
```

<details>
  <summary>Expand to see the answer.</summary>

```js
test('should respond with status 201 and the created thread JSON', () => {
  // arrange
  const req = {
    method: 'POST',
    body: JSON.stringify({ title: 'Test #1', content: 'More test content' }),
  }

  const mockJson = jest.fn()
  const mockStatus = jest.fn().mockImplementation(() => ({ json }))
  const res = {
    status: mockStatus,
  }

  // act
  controller(req, res)

  // assert
  expect(mockStatus).toHaveBeenCalledWith(201)

  // Pull the thread out of the mock json calls so that we can exclude the id from
  // testing.
  const thread = mockJson.mock.calls[0][0]
  const { id, ...threadWithoutId } = thread

  expect(threadWithoutId).toEqual({
    comments: [],
    content: 'More test content',
    reactions: {},
    title: 'Test #1',
  })
})
```

</details>

## Mocking an entire file (10)

Mocking via dependency injection is great, but chances are sooner or later you'll want to mock an entire file. Some people will support modifying your codebase so that you use dependency injection all over the place, thus making everything easier to test. But sometimes that's not ideal (or even desirable!). Let's take another look at the code for `threadsController`:

```js
import { ThreadsService } from './threadsService'

export const controller = (req, res) => {
  if (req.method === 'GET') {
    const threads = ThreadsService.getAllThreads()
    res.status(200).json(threads)
  }

  if (req.method === 'POST') {
    const newThread = ThreadsService.addThread(JSON.parse(req.body))
    res.status(201).json(newThread)
  }
}
```

`controller` has a dependency on `ThreadsService` which is coming from a separate file. I'm not gonna dive too far into `ThreadsService` right now, but on a high level it's a bunch of methods that interact with the "database" (in our case just the `threadsData` file).

If we go back to our `threadsController.test.js` and play around with a few things we'll notice some things in our test suite that go against our "qualities of a good unit test".

First off, there's the little snafoo with the `thread.id` in the test for a `POST` request. Since the `id` is randomly generated we can't reliably assert on it. For now we're skipping it, but it would be nice to remove that randomness from the generated id.

The second thing in this test suite is a little more hidden. Try rearranging the _order_ of the two tests. Put the `POST` test before the `GET` test.

```js
// src/backend/__tests__/threadsController.test.js

describe('threadsController', () => {
  test('should respond with status 201 and the created thread JSON', () => {
    // test the POST request
  })

  test('should respond with status 200 and a JSON list of requests on a GET request', () => {
    // test the GET request
  })
})
```

😱 Uh oh! Looks like just by switching the order of our two tests, the `GET` test is breaking now. Instead of returning the 2 threads, it now returns 3 threads. Neither of these tests are _isolated_ since they're dependent on running in a very specific order.

This is because right now we're actually updating the "database" in the `POST` test, and we're actually reading from the "database" in the `GET` test. Since our database is just another file in the filesystem we didn't notice it right away (since we didn't need to connect to a real DB) but we still shouldn't be updating the database from our unit tests.

How can we fix these issues? One way is to mock out the entire `ThreadsService` so that it doesn't hit the database. We can't do this via dependency injection though, since it's not a function argument, so we'll need to use Jest's ["file mocks"](TODO: link).

Jest's file mocks use the `jest.mock` function, which takes two arguments. The first is the path to the file you want to mock _from the test itself_, and the second provides a mock implementation of the file's exports.

```js
jest.mock('../path/to/file', () => {
  // whatever you return mocks the default export.
  return {
    // You can mock named exports by returning an object with keys.
    mockNamedExport: mockImplementation,
  }
})
```

Let's add our mock _above_ the entire test suite. Since we're only using a few methods from ThreadsService, we don't need to mock the entire thing.

```js
// src/backend/__tests__/threadsController.test.js

jest.mock('../threadsService', () => ({
  // We don't NEED to make ThreadService a class since we're only using static
  // methods. If you wanted to make it a class you certainly can.
  ThreadsService: {
    // Return an array of threads. For this mock, I just took the exact output that we were
    // recieving from ThreadService and returned it. Since this is the exact data we were
    // expecting in our tests we shouldn't have to change anything.
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
    // The actual `addThread` method does than our mock—it generates the random id,
    // adds some defaults, inserts the new thread, and then returns it. Our mock just
    // creates a test id that's predictable and returns the thread immediately.
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

describe('controller', () => {
  // our tests
})
```

Now that we're not actually updating the database in our tests, we should be able to run our tests and they should pass! 😎 We can also update the `POST` test to assert that the returned thread has our fake id.

```js
// src/backend/__tests__/threadsController.test.js

test('should respond with status 201 and the created thread JSON', () => {
  // arrange (no changes)
  // act (no changes)
  // assert
  expect(mockStatus).toHaveBeenCalledWith(201)

  // 🚨 Delete this portion!
  // Pull the thread out of the mock json calls so that we can exclude the id from
  // testing.
  // const thread = mockJson.mock.calls[0][0]
  // const { id, ...threadWithoutId } = thread

  // Update our expect to use `toHaveBeenCalledWith` again.
  expect(mockJson).toHaveBeenCalledWith({
    comments: [],
    id: 'test-id',
    content: 'More test content',
    reactions: {},
    title: 'Test #1',
  })
})
```

## 💻 Exercise 4 (5)

Create a new test for the `commentsController` in `src/backend/__tests__/commentsController.test.js`. Add mocks for `req` and `res` (dependency injection) and for `ThreadsService` (file mock). Add a test for the `controller` function testing whether a comment is added and returned correctly as JSON.

> 💡 Tip: you don't need to mock all of `ThreadsService`, you only need to mock the methods that are being used inside of `commentsController`

<details>
  <summary>Expand to view the answer.</summary>

```js
TODO: finish answer
```

</details>

## Mocking global dependencies and npm modules (5)

Sometimes we'll need to mock more than our own code. Some global APIs (like `window` or `Math`) don't always give us what we want to recreate a test scenario. Furthermore, what do we do if we have a npm module that has side-effects?

Let's put mocking global dependencies aside for a moment and focus in on mocking npm modules.

### Mocking npm dependencies

Mocking an npm module follows the exact same process as mocking a local module. Instead of using a relative path, just use the name of the module!

Let's take a look at `src/utils/request`. Here's the source code:

```js
// src/utils/request.js

import fetch from 'isomorphic-unfetch'

export const request = (url, options = {}) => {
  let body

  if (options.body) {
    body = JSON.stringify(options.body)
  }

  return fetch(process.env.ROOT_URL + url, { ...options, body }).then(res =>
    res.json()
  )
}
```

If we tried running `request` in our test environment, it would actually attempt an HTTP request, which we definitely don't want! We want our unit tests to be predictable, and sending network requests is one of the most common ways to make things unpredictable. We need to mock out `fetch` from `isomorphic-unfetch`

Let's create a test for `request` in `src/utils/__tests__/request.test.js`.

```js
// src/utils/__tests__/request.test.js

import { request } from '../request'

describe('request', () => {
  test('should send a fetch request to the url and resolve with the JSON', async () => {
    // arrange — no local mocks needed
    // act
    const result = await request('/test')
    // assert
  })
})
```

If you tried running this test, you'll get an error, something like this:

```bash
    FetchError: request to http://localhost:8000/test failed, reason: connect ECONNREFUSED 127.0.0.1:8000
```

The reason is that `fetch` is actually attempting a HTTP call, but the network request fails. 😱 Let's create a mock for `fetch` so that it doesn't actually hit the network.

We'll add our mock above `describe`.

```js
// src/utils/__tests__/request.test.js

import { request } from '../request'

jest.mock('isomorphic-unfetch', () => {
  return jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ json: () => ({ test: 'json' }) })
    )
})

describe('request', () => {
  test('should send a fetch request to the url and resolve with the JSON', async () => {
    // arrange — mocking is done up above
    // act
    const result = await request('/test')
    // assert
  })
})
```

You'll notice the tests don't fail anymore since we're not hitting the network! Now we can assert about the calls to `fetch` using our `expect` matchers.

```js
test('should return json for the endpoint', async () => {
  // arrange — mocking is done up above
  // act
  const result = await request('/test')
  // assert
  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith('http://localhost:3000/test', {})
  expect(result).toEqual({ test: 'json' })
})
```

This is great! We've got a passing unit test. Let's see what happens when we add a second test.

```js
// src/utils/__tests__/request.test.js

import { request } from '../request'

jest.mock('isomorphic-unfetch', () => {
  return jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ json: () => ({ test: 'json' }) })
    )
})

describe('request', () => {
  test('should send a fetch request to the url and resolve with the JSON', async () => {
    // arrange — mocking is done up above
    // act
    const result = await request('/test')
    // assert
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
```

Looks like this second test failed because it says that `fetch` was called twice. 🤔

The reason for this is that the mock `fetch` function is created _outside_ of the tests themselves, so the counter is applied for the entire test suite rather than on a per-test basis.

While we _could_ move our mock into each `test`, that would get repetitive rather quickly (imagine if we had 15 tests 😱), so we don't want to do that. We also don't want to change our assertion to be `expect(fetch).toHaveBeenCalledTimes(2)` since that makes our test dependent on the other that they're run.

What we can do instead is use some methods on the Jest's mock functions as well as test hooks that allow us to reset the counter for `fetch` between every test. 😎

```js
// src/utils/__tests__/request.test.js

describe('request', () => {
  // `beforeEach` runs before each test, true to its name. Jest has a number of these
  // "test hooks" that let us run scripts at certain points in the lifecycle of the
  // test suite.
  beforeEach(() => {
    // Clear all the call data being captured in between every test. `mockClear`
    // resets all of the calls in `mockFn.mock.calls` as well as a few other things,
    // but it doesn't reset the mock itself.
    fetch.mockClear()
  })

  test('should return json for the endpoint', async () => {
    // test
  })

  test('should allow passing "method" and "body" options to fetch', async () => {
    // test
  })
```

Run the tests again, and they should pass! Now let's look at the global dependency inside of `request`.

### Mocking a global dependency

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

## 💻 Exercise 5 (5)

Create a new test file for `generateId` in `src/utils/__tests__/generateId.test.js`. This function relies on `Math.random` to create a unique id every time it is called. Mock out `Math.random` and write a test for `generateId`.

> 💡 Tip: check out what `Math.random` returns by [checking it out on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random). Make sure that your mock returns the same type of response as the real `Math.random`. One quick way to get mock values is to try it out in a console (ie the browser console or Node REPL) and copy-paste an actual value for your mock.

<details>
  <summary>Expand to see the answer.</summary>

```js
TODO: add answer
```

</details>

> ⭐️ Bonus points: there's actually a much more elegant way to mock something on a global object using some features of Jest. Check out this [article I wrote about mocking fetch](https://www.benjaminjohnson.me/blog/mocking-fetch/) and see if you can update the global mocks we added to use this method.

## ⏱ Organizing mocks for reuse (bonus content?)

## Review: mocking (5)

<!--
TODO:
  - Why we mock: predictability
  - Why we mock: Ability to observe side effects
  - Mocking requires that you understand the interface that you're mocking—if you mock a function it should be something that returns the same shape as the original code.
-->

## Adding test coverage (5)

Now that we've been adding tests to our codebase for a little while, it would be nice to know _how much_ of the codebase we've already tested. Even in a codebase of small size, going through and manually looking at which files have tests isn't efficient. Instead of doing this manually or flying blind, we can use Jest's built-in _code coverage reporter_ to tell us how much of our code is run by our tests.

All we need to do is run Jest with the `--coverage` flag.

```bash
yarn test --coverage
```

This will print out all of the files that _have_ tests as well as some metrics of how complete the tests for those files are. However, it doesn't print out the files with no tests. To do that we'll need to add some configuration for `jest`. We'll do that in our `package.json`.

```json
"jest": {
  "collectCoverageFrom": [
    "./src/**/*.js"
  ]
}
```

This tells Jest that when we use the `--coverage` flag that it should look for all `.js` files inside of the `src` directory. It'll automatically ignore our test files.

Run it again and you should see a coverage report that shows the metrics for all of our code, not just the ones we've tested already.

Let's make it easier to run the coverage by adding a script to `package.json`

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "test:cov": "jest --coverage"
  }
}
```

## Using a test coverage threshold to enforce test coverage in CI (5)

Having the ability to view the test coverage isn't really all that useful if we can't enforce that it stays up. Especially if you're working in a team, it's a good idea to introduce a _coverage threshold_ and have your CI make sure that the metrics pass a certain bar.

A _coverage threshold_ operates by looking at the percentage of files that are covered and comparing them to a _target number_. If the coverage exceeds the target, it passes the test suite, but if it's below the target it treats your tests as if they failed.

We can add this using the `jest` config in our `package.json`

```json
{
  "jest": {
    "collectCoverageFrom": ["./src/**/*.js"],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

Run the `yarn test:cov` again and see what happens. The command will actually fail because our test coverage is below the target!

```
Jest: "global" coverage threshold for statements (80%) not met: 18.52%
Jest: "global" coverage threshold for branches (80%) not met: 37.5%
Jest: "global" coverage threshold for lines (80%) not met: 17.19%
Jest: "global" coverage threshold for functions (80%) not met: 14.58%
```

For now, just update the coverage numbers to be slightly below where they currently are (I usually just round down to the nearest whole number). This will make sure that the coverage doesn't go _down_ but gives you enough wiggle-room to make small changes without needing a bunch of tests.

```json
{
  "jest": {
    "collectCoverageFrom": ["./src/**/*.js"],
    "coverageThreshold": {
      "global": {
        "branches": 37,
        "functions": 14.25,
        "lines": 17,
        "statements": 18
      }
    }
  }
}
```

As time goes on, the test coverage will likely _increase_ as people become more comfortable with testing. Periodically revisit the coverage thresholds and increase them until your app is at a coverage level you're comfortable with.

Now that we've got our `test:cov` command dialed in, let's make sure that it runs in CI. This will guarantee that anyone contributing to this codebase keeps the test coverage from dipping any lower.

```yml
# .travis.yml
language: node_js

node_js:
  - 10.16.3

# This allows us to change the script that Travis runs from the default "yarn test"
# to whatever we want.
script: yarn test:cov
```

## A discussion on code coverage (5)

There's a lot of opinions about what number is the ideal target for coverage metrics. The important thing to remember when using code coverage is that it's not a perfect metric for the quality of a test suite. Coverage just makes sure that the lines _ran_ in the tests, but they won't help you know the _quality_ of your tests.

Some people will use this to write off coverage completely and fight against using a coverage threshold. Another common reason for dismissing coverage thresholds is the argument that 100% coverage is a waste of time. Pushing a codebase up to 100% coverage takes a lot of time and effort and you get diminishing returns as you go higher (getting from 90% to 95% doesn't really add as much extra security as going from 40% to 45%).

While those both are true—getting to 100% coverage ends up being more trouble than it's worth, and high coverage doesn't speak to the quality of test, I have to disagree that these are reasons for writing off coverage altogether.

Rather, these two bits mean that finding an ideal coverage target for your app is kind of a gray area. In my experience, 80% is a good number to shoot for when you're writing applications (and then you can shoot higher if the team wants to), and 95-100% is useful if you're writing tests for a library (or some module that's being heavily reused).

## Intro to integration testing (5)

We've spent quite a bit of time writing unit tests with Jest, now let's shift our focus to integration testing. Let's revisit our definition from before:

> An **integration test** is a test that makes sure a combination of two or more modules is working as intended.

Integration tests can run the full range of extremely small (practically a unit test) to very large (an entire page of the app). The key to differentiating integration tests from unit tests is whether we're _mocking dependencies_ or testing multiple modules together.

That said, integration tests will still need to mock _something_. Typically the most that you'll be mocking in integration tests is the _next layer of the stack_. For example, if you're writing integration tests for frontend code, you'll be mocking the API calls to the backend. If you're writing integration tests for backend code, you'll be mocking the queries to the database.

While _anything using 2 or modules_ can be classified as an integration test, for the purposes of our workshop we're gonna say that integration tests for backend will actually hit an endpoint but won't write to the database, and integration tests for frontend will actually render into a DOM, but they won't run in the browser or hit any real APIs.

The good news is that we'll be able to write all of these integration tests inside of Jest, so we don't need to set up any new tools.

## Integration testing for backend code (15)

Let's start by writing an integration test for our backend code. We're gonna write some integration tests for our `getThreadById` controller. Let's create a new file, `src/backend/__tests__/getThreadById.integration.test.js`.

> 💡 Note: For this workshop I'm naming the integration tests with `.integration.test.js` so we can easily see which files are examples of what type of test. Typically in a real app I wouldn't differentiate, I'd kinda just mix the integration and unit tests under `.test.js` patterns.

Next, we'll need to install a couple of dependencies to make testing a little easier.

```bash
yarn add -D supertest express
```

We're gonna be using a tool called `supertest` in order to write integration tests for our API. The way that `supertest` works is by simulating a real server, letting you hit _endpoints_, and then you can assert on the way that your endpoints behave. However, all of this still happens inside of Jest, so we don't need to spin up a real browser or even a real server—`supertest` can make this happen on a per-test basis.

The reason we're adding `express` as a dev dependency is due to how NextJS's server endpoints handle requests. `supertest` primarily works with the shapes provided by `express`, so we're gonna spin up a fake `express` server in our test so that we can test the endpoints using `supertest`.

> 💡 Tip: each framework has its own "flavor" of testing that's considered the preferred approach. That said, if there isn't an "approved" approach you might have to write your own testing utilities or write an adapter to use another, more mature tool.

We'll see this a little more clearly after writing some of our own tests, so let's set up our test for `threadByIdController`.

```js
// src/backend/__tests__/getThreadById.integration.test.js

describe('threadByIdController', () => {
  test('should respond 200 to a GET request', () => {
    // arrange
    // act
    // assert
  })

  test('should respond 200 to a PATCH request with a valid body', () => {
    // arrange
    // act
    // assert
  })
})
```

In order to use the NextJS endpoint handlers with `supertest` we'll need to transform them into a format that Express can properly parse. We don't want to change our actual code, so we'll add this adapter up above the `describe`.

```js
// src/backend/__tests__/getThreadById.integration.test.js

// apiResolver is a utility from NextJS used inside of their server to format
// the http requests. We're gonna use it to format our test requests.
import { apiResolver } from 'next/dist/next-server/server/api-utils'

// The first two arguments are the `req` and `res` from EXPRESS.
// The `handler` arg will be a NEXTJS-style handler.
// This function takes express-style arguments along with the nextjs handler and
// transforms the arguments before passing them into our handler.
const resolveApiHandler = (req, res, handler) => {
  // The main difference between NextJS and Express is that route params (req.params)
  // are put inside of `req.query` instead of `req.params`. We can just merge all the params
  // and queries together inside of `req.query` before passing it along.
  req.query = {
    ...req.query,
    ...req.params,
  }

  return apiResolver(req, res, req.params, handler)
}

describe('threadByIdController', () => {
  // tests
})
```

Now that we've got our resolver, let's create an express app with our handler attached to an endpoint. Add this above `describe`:

```js
// src/backend/__tests__/getThreadById.integration.test.js

import express from 'express'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import { threadByIdController } from '../threadByIdController'

// resolveApiHandler function

const app = express()
app.use('/threads/:id', (req, res) =>
  resolveApiHandler(req, res, threadByIdController)
)

describe('threadByIdController', () => {
  // tests
})
```

> ⚠️ It bears repeating that writing this type of resolver isn't the "best" way to test your endpoints. If there's a good tool that works without a resolver for your framework of choice, I'd recommend that. I've found there aren't a lot of perfect solutions for _NextJS_ endpoints, but there are a lot of good solutions for bigger frameworks like Express, NestJS, Hapi, etc. But when there aren't good solutions immediately available, it's our job as software engineers to create solutions!

Now that we've got our Express app set up and ready to recieve connections, let's fire off a request using `supertest`!

```js
// src/backend/__tests__/getThreadById.integration.test.js

import express from 'express'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import request from 'supertest'
import { threadByIdController } from '../threadByIdController'

describe('threadByIdController', () => {
  test('should respond 200 on a GET request', async () => {
    const res = await request(app).get('/thread/n4uajfhps')

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({
      comments: [
        { content: 'This is a comment', id: '5tvf1vv39', user: 'Ben Johnson' },
        {
          content: 'This is a comment from Test Tester',
          id: '7sack1xhe',
          user: 'Test Tester',
        },
      ],
      content: 'This is the content for the thread',
      id: 'n4uajfhps',
      reactions: { '👍': 20, '🔥': 30 },
      title: 'My first thread!',
    })
})
```

That first line of the test is all that we need to do in order to simulate an API request using `supertest`. We pass it our Express app and tell it which endpoint we want to send a `GET` request. We receive back a response that we can use to make our test assertions!

Let's add a test for the `POST` request.

```js
// src/backend/__tests__/getThreadById.integration.test.js

describe('threadByIdController', () => {
  test('should respond 200 on a GET request', async () => {
    // test that we just wrote
  })

  test('should respond 200 on a PATCH request', async () => {
    const res = await request(app)
      .patch('/thread/' + id)
      // we have to send the content-type header for NextJS to know that it's recieving JSON.
      .set('content-type', 'application/json')
      // .send adds the object as JSON to the body.
      .send({ name: '🔥' })

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({
      comments: ['5tvf1vv39', '7sack1xhe'],
      content: 'This is the content for the thread',
      id: 'n4uajfhps',
      name: '🔥',
      reactions: { '👍': 20, '🔥': 30 },
      title: 'My first thread!',
    })
  })
})
```

This is great, but there's still one thing left to do—our tests are still hitting the real DB. Let's add a mock for the DB so that our tests are always operating on the same data. Instead of doing the mock inline, I'm gonna do it inline, but chances are if we were in a bigger app we'd put it in a separate file to decrease the size of our test file and allow for reuse. For more on mocking an entire file [check out the Jest docs on file mocks](https://jestjs.io/docs/en/manual-mocks).

Let's just copy-paste all of our initial `threadsData` into our mock. The only thing we'll change is the ids so that we can know for sure that our tests are using the mock. I'll use letters for thread ids and numbers (as strings) for the comment ids.

```js
// src/backend/__tests__/getThreadById.integration.test.js
// imports

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

// all of our other code
```

If you run the tests again you should get a few failures from the failed ids. Go through the tests right now and update the ids in your tests to match the test output so that all of our tests are passing.

> 💡 Since our database is a simple file rather than a "real" database, we had to write our own mocks. However, if you're working with a more established DB (Postgres, MySQL, MongoDB), chances are there are already-built test utilities and mocks for that database that you can install so you don't have to do a custom mock for your DB.

## 💻 Exercise 6 (5)

<!-- TODO: write this portion -->

## Integration testing for frontend code (15)

Let's take a look at integration testing for our frontend code. In our frontend code our integration tests will do everything that they do in our real app, with the exception of two things: they won't render in a real browser, and they won't hit the actual API.

We'll be using a tool called `@testing-library` to manage our testing. I'm a huge fan of `@testing-library`, and one of the main reasons is the testing philosophy it was built on top of:

> The more your tests resemble the way your software is used, the more confidence they can give you.

`@testing-library` has a base set of utilities which allow you to test any JavaScript app that runs in the browser—`@testing-library/dom`—as well as framework-specific versions (React, Vue, Angular, Reason, React Native, Svelte, etc) that wrap the `@testing-library/dom` library. Since we're working on a React app, let's install the `@testing-library/react` package (also referred to a `react-testing-library` or RTL).

```bash
yarn add --dev @testing-library/react
```

RTL works by rendering your component into the DOM and returning a set of utilities that let you select items out of the DOM. However, the utilities force you to select elements the same way you would if you were a real user—you select them by their text.

Let's explore this by writing a test for our `Input` component. Create a new test in `src/components/__tests__/Input.test.js`

```js
// src/components/__tests__/Input.test.js
import React from 'react'
import { render } from '@testing-library/react'

describe('<Input />', () => {
  test('should render the input with a label', () => {
    const helpers = render(
      <Input label="Test" id="test" value="test" onChange={() => {}} />
    )
  })
})
```

`helpers` is kind of a grab-bag for all of the DOM helpers that RTL provides for us. The most important ones that we'll be using are `helpers.getByText` (fetches a single DOM node by the text inside), `helpers.getByLabelText` (fetches a form field by its label), and `helpers.debug` (prints out the entire component rendered).

It's also fairly common to destructure the helpers we need. Feel free to not if you don't want to. 😎 Let's fire off debug and see what we get!

```js
// src/components/__tests__/Input.test.js
import React from 'react'
import { render } from '@testing-library/react'

describe('<Input />', () => {
  test('should render the input with a label', () => {
    const { debug } = render(
      <Input label="Test" id="test" value="test" onChange={() => {}} />
    )

    debug()
  })
})
```

You'll see that `debug()` is the same thing as console logging our entire component! It's useful to remember that this utility exists so that if you get stuck trying to figure out _what_ to select.

However, logging our component out isn't enough, we want to actually assert something on it. But what do we want to assert?

Let's take a step back and think as if we were using this input. How would we know that it was in the DOM? How would we know what it's for? We'd see the label and the input and start interacting with it.

This is where RTL shines. We can just select our input by its label text, the same way we'd identify it as a regular manual user.

```js
// src/components/__tests__/Input.test.js
import React from 'react'
import { render } from '@testing-library/react'

describe('<Input />', () => {
  test('should render the input with a label', () => {
    const { getByLabelText } = render(
      <Input label="Test Label" id="test" value="test" onChange={() => {}} />
    )

    const input = getByLabelText('Test Label')
  })
})
```

Try changing the input's label inside of `render`. You should see your test fail because it can't find the label text.

However, we can still make our test a bit stronger with an explicit assertion. To do this we'll need to pull in another file that RTL gives us that lets us add a few extra matchers to Jest's `expect` that are perfect for working with the DOM.

```bash
yarn add --dev @testing-library/jest-dom
```

```js
// src/components/__tests__/Input.test.js
import React from 'react'
import { render } from '@testing-library/react'
// Adds the extra matchers to Jest
import '@testing-library/jest-dom/extend-expect'

describe('<Input />', () => {
  test('should render the input with a label', () => {
    const { getByLabelText } = render(
      <Input label="Test Label" id="test" value="test" onChange={() => {}} />
    )

    const input = getByLabelText('Test Label')
    expect(input).toBeInTheDocument()
  })
})
```

The main matcher from `testing-library` that we'll be using is `toBeInTheDocument`. True to its name, it checks whether the selected node exists in the DOM.

And that's it! We have our first component test!

Let's add a second test that actually interacts with the component. We're gonna trigger an onchange event to the input and test that it actually handles user input correctly.

```js
// src/components/__tests__/Input.test.js
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('<Input />', () => {
  test('should render the input with a label', () => {})

  test('should handle an onChange event', () => {
    // Use a mock function so we can see if the onChange prop gets called
    const onChange = jest.fn()

    const { getByLabelText } = render(
      <Input label="Test" id="test" value="test" onChange={onChange} />
    )

    // fireEvent comes from RTL and lets us trigger events on DOM nodes.
    // The methods correspond to which event you want to trigger (ie fireEvent.click,
    //  fireEvent.change, etc).
    fireEvent.change(getByLabelText('Test'), {
      target: { value: 'testz' },
    })

    // Assert our mock function was called.
    expect(onChange).toHaveBeenCalled()
  })
})
```

## 💻 Exercise 7 (5)

Create a new test in `src/components/__tests__/AddCommentForm.test.js` and write a test for the functionality of `AddCommentForm`.

Think about how you would interact with this form and what the ideal result is. If it helps open up the app and play with the form a little bit and see what you do. Then write your test using RTL to select elements and trigger events.

> 💡 Hint: the main reason we interact with each part of this form is so that we can submit, so our test should do all of the actions leading up to (and triggering) a form submission.

```js
```

<details>
  <summary>Expand to view the answer</summary>
</details>

## Review: integration testing (5)

## Intro to end-to-end testing (5)

We've covered unit and integration tests, now let's take a brief look at end-to-end testing. Depending on your company, writing end-to-end tests might or might not fall under your job responsibilities as a software engineer. Typically if you're on a smaller team without QA it would fall on you, but if you have dedicated QA automation engineers they might write the end-to-end automation.

That said, it's a great skill to have and can greatly increase your speed when working on apps.

End-to-end tests cover the entire application—they test the frontend, backend, _and_ the database. Typically we'd run these in a browser using some type of browser automation tool like Selenium or Cypress.

Because end-to-end tests have to spin up an entire browser, they take a lot longer to run and are therefore much more "expensive". As a result you likely wouldn't want to have all of the tests for your app written as end-to-end tests, they're much better for testing the really important user flows. These would be the paths that people commonly go down or that you _really_ don't want to break.

We'll be writing our end-to-end tests using [Cypress](TODO: link). It's one of the best end-to-end testing tools available today and certainly one of my favorites.

## Setting up end-to-end tests with Cypress (15)

Let's get started with some Cypress tests. 😍

First, we'll install Cypress.

```bash
yarn add --dev cypress
```

Similar to Jest, Cypress looks for a specific file pattern by default in order to determine what the test files. In order to get up and running with our first Cypress test we'll need to add a few new files.

First, add a `cypress` folder at the root of the project. Inside of that folder create an `integration` folder. This is where Cypress looks to find the test files

> Note: we colocated our unit and integration tests inside of `__tests__` folders, but for end-to-end tests it makes more sense to keep them in a separate directory. This is because the end-to-end tests might be covering multiple pages, modules, and even apps. Depending on the size and architecture of your app it might actually make sense to have your end-to-end tests be in a completely separate repository!

Let's also add a `cypress.json` file at the root of the app. This is where we'll put all the config for Cypress.

```json
// cypress.json
{}
```

Your directory structure should look something like this:

```bash
cypress
├ cypress.json
src
cypress.json
package.json
README.md
# other folders and config files at the root
```

Now that we've got our directories all set up, create a new file at `cypress/integration/e2e_spec.js`. We'll set this one up with a similar wrapper to our Jest tests.

```js
describe('threads list & profile', () => {
  it('should allow viewing a thread profile from the list', () => {
    console.log('it passes')
  })
})
```

> Note: It's fairly common in the testing world to name test files with `_spec` instead of `.test`. I'm naming the Cypress tests with `_spec` for two main reasons—first, it's the preferred naming pattern that Cypress uses in their docs, and second, if we name it with `.test` the Cypress tests will get picked up by Jest when we run `yarn test`. By naming with `_spec` we avoid this conflict without having to configure Jest to ignore Cypress (which can be done—you can set up Jest to ignore certain file patterns but it doesn't come by default).

If we run Cypress we should see our test open in a new instance of Chrome. Let's add a script to our `package.json`.

```json
{
  "scripts": {
    "e2e": "cypress open"
  }
}
```

And then we run it with `yarn e2e`. You should see a prompt from Cypress asking us which test we want to run. Click on `e2e_spec.js` and it should open our test in Chrome!

## Writing our end-to-end test

## 💻 Exercise 8 (10)

## Conclusion (5)

## Going the extra mile

<!--
TODO:
- find all of the bonus activities in the notes and the code. You can find all of them by searching "⭐️ Bonus:" in your text editor
- Take the app all the way to 100% coverage.
-->
