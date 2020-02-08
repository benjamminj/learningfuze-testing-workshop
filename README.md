# Testing Software

## About me

<!-- Estimated time: 3 min -->

- Senior Software Engineer @ [SourceStrike](http://sourcestrike.com/). We're a software consultancy that specializes in robust, enterprise-grade solutions. I primarily work in front-end engineering although I occasionally slip into contributing on the back-end.
- Bootcamp grad! My journey into software engineering started back in January 2016 while I was working as a freelance musician. I had wrapped up a bachelor's degree in music (upright and electric bass) and had been gigging for a few years at this point in time. I started doing a little bit of coding on the side to diversify my income streams and caught the bug—I found that I _loved_ programming. I did a bootcamp that summer and started on my first job the following Fall.
- My darling wife Chrissy is the joy of my life. I'm so thankful to have her and no introduction would be complete without mentioning how amazing and supportive she is.

## Intro to testing

### What is a test?

<!-- Estimated time: 3 min -->

Here's my working definition of software testing:

> Software testing is making sure your code works correctly.

Nothing complex or frilly. Nothing about units, integrations, end-to-end, or even automated versus manual testing. At the core of it, testing our software is all about making sure it isn't broken. Whether you fire up your terminal and use some `console.log`s to verify behavior or whether you have the most elaborate testing environment, the reason that we care about testing is that we don't want our software to be broken.

However, for the purposes of this workshop we'll be focusing mainly on _automated testing_. So let's make sure that we define that.

> Automated software testing using code to make sure your code works correctly.

Still the same goal, the main difference is that we're leveraging that power of the computer to _automate_ checking that our software works. For this workshop I will refer to _automated testing_ and _testing_ interchangably. When we're talking about _non-automated testing_ I'll refer to it as _manual testing_.

### Why testing?

Before we dive any deeper into the _how_ or even the _what_ questions of software testing, I wanna make sure that we explore the _why_. While this is certainly less hands-on and can be a tad philisophical, it's incredibly important. Knowing _about testing_ or _how to test_ isn't the same thing as _caring about testing_ or being an _advocate_ for it to your company or software team.

Knowing _why_ is important because it gives us reasons to further invest in learning about testing. It gives us a reason to use all the nifty tools and tricks we're gonna learn today. Since you're _here_ at this workshop, I assume you believe to some degree that testing is worthwhile. As a result, I have a couple questions about testing I'd like us to consider: there isn't a right/wrong answer, just some things that I think help us get to the root of _why_ we think that.

### Discussion: What do YOU want to get from this workshop?

<!-- Estimated time 3-5 min -->

### Discussion: What are some values we can see from testing?

<!-- Estimated time: 3-5 min -->

I firmly believe there's a myriad of ways that testing benefits our ability to write quality software (I wouldn't be teaching this workshop if I didn't!). What are some ways that we think testing can be a _good thing_?

Here's a couple reasons of my own:

- **Confidence**. This is the main reason in my opinion—we write tests so that we can be confident that our code is not broken.
- **Efficiency**. Automated tests run _waaaaayyyy_ faster than manually clicking through your app, no argument there. What might take you 30s to do by clicking around might take 2ms to run in an automated test suite. After all, that's what computers are great at: automating tedious tasks and performing them way faster than humans can.
- **Communication**. One key component of writing code is being able to convey the _intent_ of the code. Having a suite of tests that verifies what this module (or feature, or page) is intended to do provides a concrete way to document the code's purpose in the system.
- **Flexibility**. As time goes on, you might need to change the way some code works in order to add new functionality to your system. In fact, it's highly likely that you will need to do this. Most often, this means you will need to _refactor_ the code at hand. Having a suite of tests in place helps you be confident that you didn't break anything while refactoring. Well-tested code is easier to refactor, which makes it much easier to adapt to changing requirements.
- **Cost**. Automated tests help shorten feedback loops so that you catch bugs earlier in the development process. The earlier a bug is caught, the less costly it is to fix. For example, if a test catches a bug before you merge a PR the only person that's spending time on that bug is you—1 engineer. If QA catches it at least 2 people are now spending time on it—1 QA to report it, and 1 engineer to fix it (chances are it's more than 1, especially if you have a Product Manager). By the time a bug is visible to people using your app it's potentially 10x as expensive to fix—depending on the severity of the bug people might have to fix it over a weekend, C-level execs might need to be involved, and potentially marketing / press releases, not to mention the cost of potentially losing that user's business.
- **Marketability**. This doesn't exactly pertain to how testing contributes to the quality of our code, but testing is an increasingly in-demand skill for software engineering jobs. While it's not _required_ to get an engineering job in OC, companies are increasingly seeing value in automated testing. In my last job search I know quite a few companies that were impressed by my knowledge of testing. If the company has a engineering culture that highly values testing this would be required. Having a firm grasp of testing—well enough that you could teach another engineer the basics of testing in your stack—will set you apart from the rest of the market.

## Set up the repository

<!-- Estimated time: 5 min -->

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

## Continuous Integration

<!-- Estimated time: 10-15 min -->

### What is "continuous integration" (CI)?

<details>
<summary>Expand to view answer</summary>

> CI is a service that runs your tests / scripts in a special environment—every check-in of code guarantees that certain checks are run.

</details>

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

## Intro to Unit tests

<!-- Estimated time: 5-10 mins -->

To start, let's define what a unit test is.

> A unit test is an automated test that covers a single module of the software in isolation.

Unit tests are the smallest building blocks of our testing suite—they're only concerned with a single _unit_ of the codebase. Most of the times this will be a single function, class, or component.

The idea with writing unit tests is that we want to make sure that the pieces of our application are working correctly. If the pieces are broken, the application will certainly be broken, but if the pieces are working as intended we can reliably use them like Lego blocks to make our program.

In order to keep our unit tests focused on a single module of the codebase, our unit tests need to possess a few key qualities.

**Unit tests should be isolated.** A solid unit test should not be interconnected with other unit tests. As much as possible we want to keep the details of our test from affecting other tests. This means that we should be able to run our tests in any order without their behavior changing.

**Unit tests should be limited in scope.** We'll cover integration tests in a little bit, but unit tests typically should stay focused on a single module.

**Unit tests should be deterministic.** In software we use the term _deterministic_ to mean that something should behave the exact same way every time. As long as the actual program doesn't change, our tests should pass—whether we run them 1 time or 1,000 times, whether we run them now or in 6 months.

### Arrange / Act / Assert

When setting up unit tests it can sometimes be difficult to know where to start. I like to use this formula for setting up tests.

**Arrange.** In the _arrange_ step, we set up anything that we need to in order for our test to run. If we're mocking (more on that to come) we'll set up our mocks in this step. If our function needs some fancy data structure as input we might spend a few lines of code setting up that structure. If the stuff we're testing is pure (side-effect free) and simple we might be able to skip this step.

**Act.** This is where we actually run the code we're trying to test. If we were testing a function or class method this means calling it. If we were testing some type of event handler we would trigger the event. Regardless of _what causes our code to run_, we make sure that the actual code runs in this step. If your code _is a function_, it's also a good idea to capture that function's output in a variable.

**Assert.** This is where we run checks to see whether our software actually behaved as intended. In our _act_ step we ran the code, so in this step we grab values from the _actual_ result of the code (either the return value or side-effect) and make sure that it matches what we _expect_ it to be if the code is not broken. If it doesn't match, this is where the test fails.

One reason I love this pattern is it takes a little bit of the _magic_ out of writing tests. Another is that it's easy to remember—AAA. Completing the _act_ step is just running the code in the exact same way we would use it in our app. The _assert_ step is a little more difficult, since it will require us to know our testing framework's assertion helpers. The most difficult of the three steps is setting up our mocks in the _arrange_ step. We'll cover this in a little bit, but let's get comfortable with writing some tests that _don't need mocks_ first.

## Writing our first Jest test

<!-- Estimated time: 10 mins -->

Let's create new file for our first test! We'll create it at `src/utils/__tests__/sumValues.test.js`. Jest automatically looks through our project for anything in a `__tests__` folder as well as anything with `.test.js` in the name. (There's a few other patterns that Jest looks for, but these are the main ones that we're gonna be using.)

First, we'll set up our test with a `describe` block and import our function. `describe` is a global function added by Jest that allows us to group our tests together into "suites".

```js
// src/utils/__tests__/sumValues.test.js

describe('sumValues', () => {})
```

Next, we'll add a `test` block. `test` is another global function added by Jest that creates a new test. If you've worked with other testing frameworks like Mocha or Jasmine you might be familiar with `it`. `it` actually works in Jest, it's actually the exact same as `test`!

For the first argument to `test`, we'll put a brief description of what our test should do. You'll notice I also added our "arrange/act/assert" steps as comments inside of the test itself.

```js
// src/utils/__tests__/sumValues.test.js

describe('sumValues', () => {
  test('should return 15 when adding 1, 2, 3, 4, 5', () => {
    // arrange
    // act
    // assert
  })
})
```

Since `sumValues` is a _pure function_, we won't need to do anything for the `arrange` step. Let's move on to fill out the `act` step. We'll call our `sumValues` function with the arguments.

```js
// src/utils/__tests__/sumValues.test.js

describe('sumValues', () => {
  test('should return 15 when adding 1, 2, 3, 4, 5', () => {
    // act
    const sum = sumValues([1, 2, 3, 4, 5])

    // assert
  })
})
```

In order to complete our `assert` step, we'll need to use Jest's [`expect`](https://jestjs.io/docs/en/expect) function. The `expect` function takes a single argument containing the output from our function and returns an object containing a ton of _assertion_ methods. There's tons of assertions built-in to `expect`, and you can even add custom ones! That said, the most important one we'll be using is `expect(actual).toEqual(expected)`.

`.toEqual` runs a deep equality check between the `actual` value and the `expected` value, and fails the test if the two are not identical. While there's a lot of other assertions, `toEqual` is enough to get us through 80-90% of the unit tests that we will be writing. To be honest, we won't be using a lot of the assertions that Jest has to offer since `.toEqual` is good enough for what we need (not to mention that it lowers the overhead when people are reading our tests).

Let's add an assertion to our test. We want to check that the `sum` variable is equal to `15`

```js
// src/utils/__tests__/sumValues.test.js

describe('sumValues', () => {
  test('should return 15 when adding 1, 2, 3, 4, 5', () => {
    // act
    const sum = sumValues([1, 2, 3, 4, 5])

    // assert
    expect(sum).toEqual(15)
  })
})
```

And now let's run our test! All we need to do is change the line in `package.json` that had our `test` script.

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

Now all we need to do is run `yarn test` in our terminal and you should see Jest output that our test passed! We just wrapped up our first test!

## 💻 Exercise #1

<!-- Estimated time: 5-10 mins -->

I've added `test` blocks for two more tests to `src/utils/__tests__/sumValues.test.js`. Write code for each of these tests so that they cover the test case.

> ⚠️ Note: when you first write these tests, the test runner should fail if you've written them correctly. Once you've got both tests failing, go into `src/utils/sumValues` and uncomment the fleshed-out version of `sumValues` and the tests should pass.

> 💡 Tip: If you find yourself typing `yarn test` into your terminal a lot, you can actually run Jest in **watch mode** by typing `yarn test --watch`. This will watch all files in your codebase and run your tests whenever you update a file (Jest is smart and will only run tests for files that changed since your last commit).

```js
// src/utils/__tests__/sumValues.test.js

describe('sumValues', () => {
  test('should return 15 when adding 1, 2, 3, 4, 5', () => {
    // act
    const sum = sumValues([1, 2, 3, 4, 5])

    // assert
    expect(sum).toEqual(15)
  })

  test('should return 15 when adding 1, 2, "3", 4, 5', () => {
    // act
    // assert
  })
  test('should return 10 when adding 1, 2, 3, 4, "5abc"', () => {
    // act
    // assert
  })
})
```

<details>
  <summary>Expand to view answer:</summary>

```js
// src/utils/__tests__/sumValues.test.js

describe('sumValues', () => {
  test('should return 15 when adding 1, 2, 3, 4, 5', () => {
    // act
    const sum = sumValues([1, 2, 3, 4, 5])

    // assert
    expect(sum).toEqual(15)
  })

  test('should return 15 when adding 1, 2, "3", 4, 5', () => {
    // act
    const sum = sumValues([1, 2, '3', 4, 5])
    // assert
    expect(sum).toEqual(15)
  })

  test('should return 10 when adding 1, 2, 3, 4, "5abc"', () => {
    // act
    const sum = sumValues([1, 2, 3, 4, '5abc'])
    // assert
    expect(sum).toEqual(10)
  })
})
```

</details>

## Review: unit tests

<!-- Estimated time: 5 mins -->

To recap what we've seen about unit tests so far—we can define a _unit test_ as an automated software test that is limited to a single _module_ (or unit) of the application. Since it is limited to a single portion of the application, unit tests should be isolated, independent and focused.

A strong unit test should be deterministic and always pass no matter how many times we run it. In order to achieve this determinism in our tests we can use the AAA formula while writing tests. We _arrange_ any mocks that we need, _act_ by running the code, and _assert_ upon the output.

We looked at writing a few Jest tests— we organized our tests into suites with Jest's file-naming convention as well as a `describe` block. Then we added tests for our functions, using `expect` to write our assertions.

## Intro to mocking

<!-- Estimated time: 7 min -->

This is great, we've got our test suite for a few pure utility functions, but what do we do when what we're testing isn't pure? It's a noble ideal to have only pure functions in a codebase, but sooner or later our app will need to have side-effects like interacting with a database or hitting an API.

If the code has side effects, how do we test _that_?

To test side effects we're gonna dive into something that tends to be one of the more confusing things about testing: mocking.

Let's define a quick working definition for mocking.

> Mocking is replacing actual code in our application with custom, "test-only" code with the goal of making our tests more predictable.

There's a couple important things to note about this definition. First off, we're _replacing the code_ with _custom_ code. Furthermore, the code that we're using as a replacement is only intended to be run in the test environment. However, the most important part of this definition is the _why_ of mocking: we do it to make our code with side-effects more reliable.

This all comes down to the _determinism_ aspect of unit tests. If we're hitting the network, that means that we open up our tests to potential failure _because the internet is down_. Or if we're hitting a database we don't want tests to randomly fail because of connection issues.

That's what mocks are for—they help us increase the reliability of our tests. While we won't mock heavily in every test we write (for example our integration and end-to-end tests), we _will_ mock some things in our unit tests.

> When tests are unreliable and they randomly fail, what inevitably happens is people start to lose trust in the testing suite. Having a test suite you don't trust is kind of pointless since the main goal of testing is to provide confidence. We want to have the security that our tests will only fail if the code they're testing is broken.

There's a few ways to mock portions of our codebase. If you've read any blogs on testing or seen stuff on LinkedIn and Twitter about testing, you might have heard the terms _mock_, _spy_, and _stub_ used interchangeably when talking about mocking.

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

## Mocking with dependency injection

<!-- Estimated time: 10 min -->

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

## 💻 Exercise 3

<!-- Estimated time: 5 min -->

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

## Mocking an entire file

<!-- Estimated time: 10 min -->

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

How can we fix these issues? One way is to mock out the entire `ThreadsService` so that it doesn't hit the database. We can't do this via dependency injection though, since it's not a function argument, so we'll need to use Jest's ["file mocks"](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options).

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

## 💻 Exercise 4

<!-- Estimated time: 7 min -->

Create a new test for the `commentsController` in `src/backend/__tests__/commentsController.test.js`. Add mocks for `req` and `res` (dependency injection) and for `ThreadsService` (file mock). Add a test for the `controller` function testing whether a comment is added and returned correctly as JSON.

> 💡 Tip: you don't need to mock all of `ThreadsService`, you only need to mock the methods that are being used inside of `commentsController`

<details>
  <summary>Expand to view the answer.</summary>

```js
import { commentsController } from '../commentsController'

jest.mock('../threadsService', () => {
  const MockThreadsService = {
    addComment: (id, comment) => {
      return {
        id: id,
        ...comment,
      }
    },
  }

  return {
    ThreadsService: MockThreadsService,
  }
})

describe('commentsController', () => {
  test('should respond 201 with the comment when sending a POST request', () => {
    // arrange
    const mockReq = {
      method: 'POST',
      query: {
        id: '123',
      },
      body: {
        user: '@tester',
        content: 'This is a comment',
      },
    }

    const mockJson = jest.fn()
    const mockStatus = jest.fn().mockImplementation(() => {
      return {
        json: mockJson,
      }
    })
    const mockRes = {
      status: mockStatus,
    }

    // act
    commentsController(mockReq, mockRes)

    // assert
    expect(mockStatus).toHaveBeenCalledTimes(1)
    expect(mockStatus).toHaveBeenCalledWith(201)

    expect(mockJson).toHaveBeenCalledTimes(1)
    expect(mockJson).toHaveBeenCalledWith({
      content: 'This is a comment',
      id: '123',
      user: '@tester',
    })
  })
})
```

</details>

## Mocking global dependencies and npm modules

<!-- Estimated time: 5 min -->

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

## Review: mocking

<!-- Estimated time: 5 min -->

The reason that I think it's so valuable for us to spend all this time on mocking is that I think mocking is one of the most under-taught portions of testing. I see lots of testing tutorials that do an intro to unit testing but don't wade into mocking. And the ones that do go into mocking go _waaaaayyyyy_ deep into it. I just haven't seen much out there about getting up to speed with _why_ we mock when we test and _how_ to think about mocking.

Having a solid knowledge of mocking will empower you to test virtually any code in your app—as long as you know the _shape_ of what you want to mock, you have the ability to mock it out! (Just because you _can_ doesn't mean you always _should_, as we'll see in a bit). In fact, the reason that we can test client-side code in Jest is because it runs in a _mock DOM_ (jest-dom) that replaces most of the functionality of the `window` APIs that JavaScript frameworks depend on.

We looked at a few ways of mocking code in our app, whether it's via dependency injection, `jest.mock`, or replacing global variables. Jest has a lot more ways to mock, more than we could cover in this workshop! You might find some more elegant ways to mock (especially the `global` variables!).

Chances are in a real-world app you might find yourself using a combination of all of these, it will largely depend on the code that you're testing and the architecture of your app.

## Adding test coverage

<!-- Estimated time: 2 min -->

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

## Using a test coverage threshold to enforce test coverage in CI

<!-- Estimated time: 3 min -->

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

## A discussion on code coverage

<!-- Estimated time: 2 min -->

There's a lot of opinions about what number is the ideal target for coverage metrics. The important thing to remember when using code coverage is that it's not a perfect metric for the quality of a test suite. Coverage just makes sure that the lines _ran_ in the tests, but they won't help you know the _quality_ of your tests.

Some people will use this to write off coverage completely and fight against using a coverage threshold. Another common reason for dismissing coverage thresholds is the argument that 100% coverage is a waste of time. Pushing a codebase up to 100% coverage takes a lot of time and effort and you get diminishing returns as you go higher (getting from 90% to 95% doesn't really add as much extra security as going from 40% to 45%).

While those both are true—getting to 100% coverage ends up being more trouble than it's worth, and high coverage doesn't speak to the quality of test, I have to disagree that these are reasons for writing off coverage altogether.

Rather, these two bits mean that finding an ideal coverage target for your app is kind of a gray area. In my experience, 80% is a good number to shoot for when you're writing applications (and then you can shoot higher if the team wants to), and 95-100% is useful if you're writing tests for a library (or some module that's being heavily reused).

## Intro to integration testing

<!-- Estimated time: 5 min -->

We've spent quite a bit of time writing unit tests with Jest, now let's shift our focus to integration testing. Let's revisit our definition from before:

> An **integration test** is a test that makes sure a combination of two or more modules is working as intended.

Integration tests can run the full range of extremely small (practically a unit test) to very large (an entire page of the app). The key to differentiating integration tests from unit tests is whether we're _mocking dependencies_ or testing multiple modules together.

That said, integration tests will still need to mock _something_. Typically the most that you'll be mocking in integration tests is the _next layer of the stack_. For example, if you're writing integration tests for frontend code, you'll be mocking the API calls to the backend. If you're writing integration tests for backend code, you'll be mocking the queries to the database.

While _anything using 2 or modules_ can be classified as an integration test, for the purposes of our workshop we're gonna say that integration tests for backend will actually hit an endpoint but won't write to the database, and integration tests for frontend will actually render into a DOM, but they won't run in the browser or hit any real APIs.

The good news is that we'll be able to write all of these integration tests inside of Jest, so we don't need to set up any new tools.

## Integration testing for backend code

<!-- Estimated time: 15 min -->

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

In order to use the NextJS endpoint handlers with `supertest` we'll need to transform them into a format that Express can properly parse. I've added this adapter in `test-utils` as `createMockApp` (you can check it out there if you want!).

> ⚠️ It bears mentioning that writing this type of resolver isn't the "best" way to test your endpoints. If there's a good tool that works without a resolver for your framework of choice, I'd recommend that. I've found there aren't a lot of perfect solutions for _NextJS_ endpoints, but there are a lot of good solutions for bigger frameworks like Express, NestJS, Hapi, etc. But when there aren't good solutions immediately available, it's our job as software engineers to create solutions!

Now that we've got our Express app set up and ready to receive connections, let's fire off a request using `supertest`!

```js
// src/backend/__tests__/getThreadById.integration.test.js

import express from 'express'
import { apiResolver } from 'next/dist/next-server/server/api-utils'
import request from 'supertest'
import { threadByIdController } from '../threadByIdController'
import { createMockApp } from '../../test-utils/createMockApp'

describe('threadByIdController', () => {
  test('should respond 200 on a GET request', async () => {
    const app = createMockApp('/thread/:id', threadByIdController)
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

> 💡 Since our database is a simple file rather than a "real" database, we had to write our own mocks. However, if you're working with a more established DB (Postgres, MySQL, MongoDB), there might be already-built test utilities and mocks for that database that you can install so you don't have to do a custom mock for your DB. Depending on how your app's architecture is you might be able to mock the "service" or the "repository" with fake data as well.

## Integration testing for frontend code

<!-- Estimated time: 15 min -->

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

## 💻 Exercise 7

<!-- Estimated time: 5-10 min -->

Create a new test in `src/components/__tests__/AddCommentForm.test.js` and write a test for the functionality of `AddCommentForm`.

Think about how you would interact with this form and what the ideal result is. If it helps open up the app and play with the form a little bit and see what you do. Then write your test using RTL to select elements and trigger events.

> 💡 Hint: the main reason we interact with each part of this form is so that we can submit, so our test should do all of the actions leading up to (and triggering) a form submission.

<details>
  <summary>Expand to view the answer</summary>

```js
// src/components/__tests__/AddCommentForm.test.js

import { render, fireEvent } from '@testing-library/react'
import { AddCommentForm } from '../AddCommentForm'

describe('<AddCommentForm />', () => {
  test('should allow submitting the form', () => {
    const onSubmit = jest.fn()
    const { getByLabelText, getByText } = render(
      <AddCommentForm onSubmitForm={onSubmit} />
    )

    fireEvent.change(getByLabelText('User'), {
      target: { value: '@benjamminj' },
    })
    fireEvent.change(getByLabelText('Content'), {
      target: { value: 'This is test content' },
    })

    fireEvent.click(getByText('Submit'))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({
      content: 'This is test content',
      user: '@benjamminj',
    })
  })

  test('should not submit form if username is blank', () => {
    const onSubmit = jest.fn()
    const { getByLabelText, getByText } = render(
      <AddCommentForm onSubmitForm={onSubmit} />
    )

    fireEvent.change(getByLabelText('Content'), {
      target: { value: 'This is test content' },
    })

    fireEvent.click(getByText('Submit'))
    expect(onSubmit).not.toHaveBeenCalled()
  })

  test('should not submit form if content is blank', () => {
    const onSubmit = jest.fn()
    const { getByLabelText, getByText } = render(
      <AddCommentForm onSubmitForm={onSubmit} />
    )

    fireEvent.change(getByLabelText('User'), {
      target: { value: '@benjamminj' },
    })

    fireEvent.click(getByText('Submit'))
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
```

</details>

## Review: integration testing

<!-- Estimated time: 5 min -->

And that's it for integration testing! The key difference between writing our integration tests and writing unit tests is the _amount_ of mocking that we do. When writing unit tests we might mock more things in order to isolate the logic of the module itself, but when we're writing integration tests we only mock the portions that add uncertainty to our test suite (network calls, database operations, stuff like that).

While it _is good_ to know what the difference between a unit and integration test is, I don't think it's worth stressing out over. Some people spend a lot of time trying to determine what the correct balance of unit and integration tests are (for example, look up the concept of a [testing pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) and the concept of a [testing trophy](https://kentcdodds.com/blog/write-tests)).

Personally, I think the difference between unit tests and integration tests is less of a hard dividing line—instead it's a continuum with unit tests on one side (all mocking) and integration on the other (minimal mocking).

Don't stress out a ton about whether you're writing a unit test or an integration test, just mock what you need to in order to have your tests be predictable. Write the tests that make you feel confident in your application and mock when it helps you achieve confidence in your test suite.

My personal "balance" for unit & integration tests tends to be this: I lean more heavily on integration tests for front-end code and component tests—I don't mock much unless it's a network call or some type of DOM API. For back-end code I tend to think that you can get away with mocking out the services that talk to the database (in our app this would be the `threadsService`) and do something right in the middle of the unit-integration spectrum. (I also asked with one of my back-end coworkers and he said this is a standard approach to testing backend: mock the db when unit-testing services and mock the services when testing other things).

Unit and integration tests aren't the only tests that we can have in our test suite though—let's take a look at end-to-end testing. 😎

## Intro to end-to-end testing

<!-- Estimated time: 5 min -->

Depending on your company, writing end-to-end tests might or might not fall under your job responsibilities as a software engineer. Typically if you're on a smaller team without QA it would fall on you, but if you have dedicated QA automation engineers they might write the end-to-end automation.

That said, it's a great skill to have and can greatly increase your speed when working on apps.

End-to-end tests cover the entire application—they test the frontend, backend, _and_ the database. Typically we'd run these in a browser using some type of browser automation tool like Selenium or Cypress.

Because end-to-end tests have to spin up an entire browser, they take a lot longer to run and are therefore much more "expensive". As a result you likely wouldn't want to have all of the tests for your app written as end-to-end tests, they're much better for testing the really important user flows. These would be the paths that people commonly go down or that you _really_ don't want to break.

We'll be writing our end-to-end tests using [Cypress](https://www.cypress.io/). It's one of the best end-to-end testing tools available today and certainly one of my favorites.

## Setting up end-to-end tests with Cypress

<!-- Estimated time: 5 min -->

Let's get started with some Cypress tests. 😍

First, we'll install Cypress.

```bash
yarn add --dev cypress
```

Similar to Jest, Cypress looks for a specific file pattern by default in order to determine what the test files. In order to get up and running with our first Cypress test we'll need to add a few new files.

First, add a `cypress` folder at the root of the project. Inside of that folder create an `integration` folder. This is where Cypress looks to find the test files

> Note: we colocated our unit and integration tests inside of `__tests__` folders, but for end-to-end tests it makes more sense to keep them in a separate directory. This is because the end-to-end tests might be covering multiple pages, modules, and even apps. Depending on the size and architecture of your app it might actually make sense to have your end-to-end tests be in a completely separate repository!

Let's also add a `cypress.json` file at the root of the app. This is where we'll put all the config for Cypress. For now we'll just start with a `baseUrl` config.

```json
// cypress.json
{
  "baseUrl": "http://localhost:3000"
}
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
  it('should allow creating a thread and viewing its profile', () => {
    cy.visit('/')
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

And then we run it with `yarn e2e` (you'll need to start a server in the other tab, I recommend doing so with `yarn build && yarn start` so that you're not hot-reloading your app a bunch while writing your tests). You should see a prompt from Cypress asking us which test we want to run. Click on `e2e_spec.js` and it should open our test in Chrome!

## Writing our end-to-end test

<!-- Estimated time: 12 min -->

Right now our test will just hit our threads list, log out to the console and immediately pass. Let's add some stuff so that it's actually useful.

Let's think about what we would do as a user if we were actually clicking through the app.

1. First we would hit the "/" url to see the whole "threads list" page.
2. Then we would click the "Add a thread" button to display the form.
3. We'd fill the form out with our new thread and submit the form.
4. We should see the form rendered to the list.
5. We'll click the thread to view its profile.

When we write this test we'll need to tell the browser exactly to do each of these things. We'll use the same concepts that we used in our integration tests with RTL ("the more your tests resemble the way your software is used, the more confidence they give you") and try to prefer selecting items by their labels, text, etc.

Let's start out by putting all of our steps inside of the test as comments. Let's fill out the first two.

```js
describe('threads list & profile', () => {
  it('should allow viewing a thread profile from the list', () => {
    // 1. First we would hit the "/" url to see the whole "threads list" page.
    cy.visit('/')

    // 2. Then we would click the "Add a thread" button to display the form.
    cy.contains('Add a thread').click()

    // 3. We'd fill the form out with our new thread and submit the form.
    // 4. We should see the form rendered to the list.
    // 5. We'll click the thread to view its profile.
  })
})
```

Cypress has all of its DOM utilities available on a global `cy` object. There's a [ton of helpers](https://docs.cypress.io/api/api/table-of-contents.html) on the `cy` object. It also chains in a very "JQuery-esque" fashion—meaning you can do things like `cy.get('.button').contains('Text')`.

Cypress is also built with an _async-first_ approach—when you try to query the DOM Cypress knows to wait until the element appears in the DOM. If it doesn't appear in about 5 seconds, Cypress times out and fails the test.

In what we've written so far, we've used `cy.visit()` to hit a url (it will be based on the `baseUrl` we configured in our `cypress.json`), `cy.contains` to select a DOM node containing the text "Add a thread" and then `.click()` to fire a click event on the selected node.

Let's do steps 3-4.

```js
describe('threads list & profile', () => {
  it('should allow viewing a thread profile from the list', () => {
    // 1. First we would hit the "/" url to see the whole "threads list" page.
    cy.server()
    cy.visit('/')

    // 2. Then we would click the "Add a thread" button to display the form.
    cy.contains('Add a thread').click()

    // 3. We'd fill the form out with our new thread and submit the form.
    cy.contains('Title').click()
    cy.focused().type('Test threadzzzzz')

    cy.contains('Content').click()
    cy.focused().type(
      'This is the test thread content written by our e2e test 😎'
    )

    cy.route('POST', '/api/threads').as('createThread')
    // 4. We should see the form rendered to the list.
    cy.contains('Submit').click()

    // 5. We'll click the thread to view its profile.
  })
})
```

Step 3 is a little more involved than what we did in step 2. First, we fire a click event on the label containing the "Title" text. This _should_ focus the "title" input since clicking a label has that behavior. (We select the input this way instead of selecting with a classname due to our principle of wanting our tests to mirror how a user would actually use the software).

Since `cy.contains("Title").click()` focuses the input, we can select the input with `cy.focused`. This is both a check and a selector—if the input isn't focused then we won't be selecting it and our test should fail. But it's also a selector—after selecting the "title" input we use `.type` to trigger typing on the input.

We do these exact same steps with the "Content" label to finish filling out the form. But we need to do a little bit of mocking before we submit it.

In order to _spy_ on the endpoint, we need to use `cy.route()` to hook into the network layer of Cypress. Because Cypress controls the browser, it can listen to all networks requests going in and out and record them for us. In this case we want to listen to the `POST` request going to `/api/threads`. We also are going to alias it so that Cypress knows that we want to assert on it later. We do this with the `.as("aliasName")` (you can alias anything Cypress grabs onto, it's not just limited to API requests and responses).

> Cypress has a super cool feature that also allows you to mock out entire responses for your endpoints, but we likely won't be diving into that in this workshop. It works similar to the way we mocked the network in our integration tests, and is incredibly useful for recreating difficult to reproduce scenarios (like error responses, when the network is down, etc.)

Finally, now that we've set up our spy on the endpoint, we can trigger a click event to submit the form with `cy.contains("Submit").click()`.

Coming down the home stretch—let's do step 5!

```js
describe('threads list & profile', () => {
  it('should allow viewing a thread profile from the list', () => {
    // 1. First we would hit the "/" url to see the whole "threads list" page.
    cy.server()
    cy.visit('/')

    // 2. Then we would click the "Add a thread" button to display the form.
    cy.contains('Add a thread').click()

    // randomize the title a little
    const title = `Test threadzzzzz ${Date.now().toString()}`

    // 3. We'd fill the form out with our new thread and submit the form.
    cy.contains('Title').click()
    cy.focused().type(title)

    cy.contains('Content').click()
    cy.focused().type(
      'This is the test thread content written by our e2e test 😎'
    )

    cy.route('POST', '/api/threads').as('createThread')
    // 4. We should see the form rendered to the list.
    cy.contains('Submit').click()

    // 5. We'll click the thread to view its profile.
    cy.wait('@createThread')

    cy.get('a')
      .contains(title)
      .then($anchor => {
        const href = $anchor.attr('href')
        cy.wrap(href).as('threadId')
      })

    cy.get('a')
      .contains(title)
      .click()

    cy.get('@threadId').then(id => {
      cy.url().should('include', id)
    })
  })
})
```

Step 5 shows _why_ it was important for us to create that API spy and alias it to `createThread`. Since API requests will take an arbitrary amount of time to resolve, we want to tell Cypress to _wait_ until the request finishes before continuing the test. That way it's not trying to assert against things that don't exist in the DOM yet. We do this with `cy.wait("@createThread")` (the name of our alias with an `@` symbol in front).

Once our `POST` request resolves correctly, we then want to do a couple things. _If_ it resolved ok, our new thread should exist in the DOM as a link preview. It should have an `href` pointing to a url containing its server-generated id as well.

Since these ids will vary from test to test, and we don't want to heavily mock in our end-to-end tests, we actually want to grab the `href` itself and save _that value_ to a Cypress alias so that we can use it later.

We use `cy.contains(title)` to fetch the thread we just created, and then we can use the `.then` method to operate on the DOM node that we just selected. If you're reading the Cypress docs, they discuss this `.then` as something called `yields`. The idea is that most Cypress methods _yield_ or _return_ something that we can use for assertions or further operations. In this case we were selecting a DOM node, so our `cy.contains` should _yield_ an `a` tag. I've named this variable `$anchor` (the `$` is a naming convention in the Cypress docs for the stuff yielded in `.then`).

Once we have the `$anchor` we want to grab its `href` attribute with the `.attr` method (a lot of these methods can be found in the Cypress docs, I'll be honest I don't know them all by heart!). We then want to alias the `href` value, so we can do that with `cy.wrap(href).as('threadId')` (`cy.wrap` allows us to convert non-Cypress values into things that Cypress can properly store).

Finally, we trigger a click event on the link, and then we wait for the title to appear in the next page. Once the next page is loaded, we run a quick check on the url with Cypress to make sure that it actually is the url of our newly created thread. We do this with the combination of `cy.get('@threadId')` to let us retrieve our aliased value and `cy.url().should('include', id)` to assert that the url actually contains the value.

## Review: End-to-end tests

<!-- Estimated time: 5 min -->

Whew. That was quite a bit, and it leverages Cypress' API fairly heavily. It might feel a little bit like drinking from a firehose—but the important part is identifying those key user actions and breaking down the end-to-end tests into a set of concrete steps. Once we've done _that_, writing our test becomes a matter of figuring out _how_ to express these user actions using Cypress' API.

It's also important to note that Cypress can do way more than we're doing in this test. You can set cookies and request headers, modify session state, change your Redux store—basically anything that helps you to get your app into a state that makes it easy to test. For example, if you have an app with authentication you might want to set a cookie _before_ running your tests so that Cypress doesn't have to log in every time.

Cypress also has a fantastic API for [stubbing out API requests](https://docs.cypress.io/api/commands/route.html#Arguments), which I mentioned earlier. This can be incredibly useful for simulating how your frontend might respond under adverse network conditions or if an API goes down (without having to bring the entire API down). Technically stubbing out an API isn't a _true_ end-to-end test since we're doing some mocking, but our tests should work for us, and not the other way around. If it increases your confidence to have a Cypress test for that scenario, mock the endpoint and write the test!

Lastly, if you're using a real database and you plan on running your end-to-end tests in a deployed test environment (which is a good idea since they'll more closely mirror your production environment), it's a good idea to have your Cypress tests _arrange_ and _clean up_ the data that they are using for tests. We won't really dive into _how_ to do this from Cypress, but you can either have it use the API to seed and delete test data or you can do so via command-line scripts.

## Conclusion
