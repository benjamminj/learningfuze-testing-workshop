import fetch from 'isomorphic-unfetch'

// Provide a default root url since this is a tutorial app.
// In a "real world" app you wouldn't want to do something like this, you'd want
// to fail fast if process.env.ROOT_URL isn't available in this file.
const rootUrl = process.env.ROOT_URL || 'http://localhost:3000'

export const request = (url, options) => {
  if (options && options.body) {
    options.body = JSON.stringify(options.body)
  }

  return fetch(rootUrl + url, options).then(res => res.json())
}
