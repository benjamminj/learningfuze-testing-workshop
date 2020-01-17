import { ThreadsService } from '../backend/threadsService'

export const controller = (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query
    const thread = ThreadsService.getThreadById(id)
    res.status(200).json(thread)
  }
}
