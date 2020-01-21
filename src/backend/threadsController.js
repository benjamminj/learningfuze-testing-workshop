import { ThreadsService } from './threadsService'

/**
 * Handles requests related to fetching multiple threads.
 *
 * Right now the ability to create a thread and view a list of threads is permitted.
 */
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
