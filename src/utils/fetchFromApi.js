import fetch from 'isomorphic-unfetch'
import { ROOT_URL } from '../constants'

export const request = (url, options) => {
  return fetch(ROOT_URL + url, options).then(res => res.json())
}
