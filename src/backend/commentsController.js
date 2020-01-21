import { ThreadsService } from './threadsService'

/**
 * Controls all requests related to comments on a given thread.
 *
 * Right now the only supported operation is creating a comment on a given thread.
 */
export const controller = (req, res) => {
  if (req.method === 'POST') {
    const { id } = req.query
    console.log(id)
    const newComment = ThreadsService.addComment(id, JSON.parse(req.body))
    res.status(201).json(newComment)
  }
}
