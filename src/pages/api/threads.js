import { ThreadsService } from '../../backend/threadsService'

export const controller = (req, res) => {
  console.log('________HERE___________')
  if (req.method === 'GET') {
    const threads = ThreadsService.getAllThreads()
    res.status(200).json(threads)
  }
}
