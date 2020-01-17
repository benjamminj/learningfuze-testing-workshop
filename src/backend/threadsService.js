import { threads } from './threadsData'
import { generateId } from './generateId'

export class ThreadsService {
  static getAllThreads() {
    return Object.values(threads)
  }

  static getThreadById(id) {
    return threads[id]
  }

  static addThread(threadData) {
    const id = generateId()

    const thread = {
      ...threadData,
      id,
    }

    threads[id] = thread
    return thread
  }

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

  static deleteThread(id) {
    delete threads[id]

    return threads
  }

  static addComment(threadId, commentData) {
    const id = generateId()

    const comment = {
      ...commentData,
      id,
    }

    threads[threadId].comments.push(id)

    return comment
  }
}
