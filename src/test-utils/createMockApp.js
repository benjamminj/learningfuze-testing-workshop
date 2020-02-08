import express from 'express'
import { apiResolver } from 'next/dist/next-server/server/api-utils'

export const resolveApiHandler = (req, res, handler) => {
  req.query = {
    ...req.query,
    ...req.params,
  }

  return apiResolver(req, res, req.params, handler)
}

export const createMockApp = (endpoint, controller) => {
  const app = express()
  app.use(endpoint, (req, res) => resolveApiHandler(req, res, controller))

  return app
}
