### 01 Set up the repository

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

## 02 Continuous Integration

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

## 03 Making our own testing framework

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

With that we're ready to add some more of our own tests! As an exercise, let's add some additional tests for `sumValues`.

### 💻 Exercise #1

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

<!-- TODO: flip on Jest -->
<!-- TODO: exercise testing mapValues -->
