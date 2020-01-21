import { threads, comments } from './threadsData'
import { generateId } from '../utils/generateId'

/**
 * ThreadsService is the only thing that communicates back-and-forth with our
 * "database" (threadsData.js). By keeping all of the read/write operations inside
 * of this class we make it a lot easier to replace `threadsData.js` with a real
 * database, since we'd only have to update our code right here to use the real
 * database queries.
 */
export class ThreadsService {
  /**
   * Return a list of all threads. Since `threadsService` is using an object under
   * the hood, we use `Object.values` to transform the object into an array of its
   * values.
   *
   * To learn more about Object.values, check out
   * [this link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values)
   */
  static getAllThreads() {
    return Object.values(threads)
  }

  /**
   * Return a single thread by its id.
   *
   * The array of comment ids in `comments` on the thread is expanded by default.
   *
   * ⭐️ Bonus points: add the ability to expand the `comments` based on a flag in the
   * API. For example, hitting `/threads?expand=comments` would expand the comments,
   * but hitting `/threads` would not.
   */
  static getThreadById(id) {
    const thread = threads[id]

    const expandedComments = thread.comments
      // Get rid of any ids that don't exist in `comments`
      .filter(commentId => comments[commentId])
      // Expand each id into its corresponding comment.
      .map(commentId => comments[commentId])

    return {
      ...thread,
      comments: expandedComments,
    }
  }

  /**
   * Creates a new thread. The thread's id will be generated automatically.
   *
   * Right now there is _no validation_ to guarantee that good data is being inserted
   * into the threads, so it's possible to add a thread that's missing a
   * title/description
   *
   * ⭐️ Bonus points: add validation to make sure that a thread can't be added unless it
   * has a "title" and "content"
   */
  static addThread(threadData) {
    const id = generateId()

    const thread = {
      title: '',
      content: '',
      comments: [],
      reactions: {},
      ...threadData,
      id,
    }

    threads[id] = thread

    return thread
  }

  /**
   * Update the content of a given thread.
   *
   * Right now there isn't any validation to make sure that the thread exists before
   * attempting to update the field.
   *
   * ⭐️ Bonus points: add a check to make sure that the thread with the given id exists
   * before attempting to update the field. If it doesn't exist, throw an error.
   */
  static updateThread(id, threadDataUpdate) {
    const thread = threads[id]

    threads[id] = {
      ...thread,
      ...threadDataUpdate,
      // Make sure it isn't possible to override a thread's id
      id,
    }

    return threads[id]
  }

  /**
   * Deletes a thread with the given id. Currently we're not using this anywhere in
   * the app since there's no UI on the front-end allowing you to delete a thread.
   *
   * ⭐️ Bonus points: add a button on the thread profile page that allows you to delete
   * the thread.
   *
   * ⭐️ Bonus bonus points: add a confirmation step to the UI before deleting a thread
   * (something like "are you sure you want to delete this?")
   */
  static deleteThread(id) {
    delete threads[id]

    return threads
  }

  /**
   * Adds a comment to the thread.
   *
   * Right now there isn't any validation to make sure that the "user" and "content"
   * fields are populated so it's technically possible to add a comment without those
   * fields.
   *
   * ⭐️ Bonus points: add validation that the user & content are populated before
   * inserting the comment to the "database".
   */
  static addComment(threadId, commentData) {
    const id = generateId()

    const comment = {
      ...commentData,
      id,
    }

    comments[id] = comment
    threads[threadId].comments.push(id)

    return comment
  }
}
