import { ThreadsService } from './threadsService'

/**
 * Handle requests related to a single thread, with an `id` prop in the query.
 *
 * Allows GET & PATCH operations.
 *
 * ⭐️ Bonus points: add the ability to DELETE a thread.
 * ⭐️ Bonus points: add error handling to send 400 errors when an id doesn't exist
 *    or a PATCH body is incorrect.
 */
export const threadByIdController = (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query
    const thread = ThreadsService.getThreadById(id)
    res.status(200).json(thread)
  }

  if (req.method === 'PATCH') {
    const { id } = req.query

    if (typeof req.body === 'object') {
      req.body = JSON.stringify(req.body)
    }

    const thread = ThreadsService.updateThread(id, JSON.parse(req.body))
    res.status(200).json(thread)
  }
}
