import fetch from 'isomorphic-unfetch'

// Provide a default root url since this is a tutorial app.
// In a "real world" app you wouldn't want to do something like this, you'd want
// to fail fast if process.env.ROOT_URL isn't available in this file.
const rootUrl = process.env.ROOT_URL || 'http://localhost:3000'

export const request = (url, options = {}) => {
  let body

  if (options.body) {
    body = JSON.stringify(options.body)
  }

  return fetch(rootUrl + url, { ...options, body }).then(res => res.json())
}
