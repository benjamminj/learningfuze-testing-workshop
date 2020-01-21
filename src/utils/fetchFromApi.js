import fetch from 'isomorphic-unfetch'

export const request = (url, options) => {
  return fetch(process.env.ROOT_URL + url, options).then(res => res.json())
}
