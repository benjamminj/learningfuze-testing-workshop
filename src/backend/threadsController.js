import { ThreadsService } from './threadsService'

/**
 * Handles requests related to fetching multiple threads.
 *
 * Right now the ability to create a thread and view a list of threads is permitted.
 *
 * ⭐️ Bonus points: add validation to send back a 400 error if the user doesn't send
 * valid JSON on the POST request.
 */
export const threadsController = (req, res) => {
  if (req.method === 'GET') {
    const threads = ThreadsService.getAllThreads()
    res.status(200).json(threads)
  }

  if (req.method === 'POST') {
    if (typeof req.body === 'object') {
      req.body = JSON.stringify(req.body)
    }

    const newThread = ThreadsService.addThread(JSON.parse(req.body))
    res.status(201).json(newThread)
  }
}
