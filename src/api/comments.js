import { ThreadsService } from '../backend/threadsService'

export const controller = (req, res) => {
  if (req.method === 'POST') {
    const { id } = req.query
    const newComment = ThreadsService.addComment(id, JSON.parse(req.body))
    res.status(201).json(newComment)
  }
}
