import store from './store/store'
const API_URL = process.env.REACT_APP_API_URL
export async function getSeller (username, password) {
  return await fetch(API_URL + '/sellers', {
    headers: {
      Authorization: `Basic ${btoa(username + ':' + password)}`
    }
  })
}

export async function post (path, body) {
  const { seller_id: username, seller_zip_code_prefix: password } = store.getState().seller.value
  return fetch(API_URL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(username + ':' + password)}`
    },
    body: JSON.stringify(body)
  })
} export async function get (path) {
  const { seller_id: username, seller_zip_code_prefix: password } = store.getState().seller.value
  return fetch(API_URL + path, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${btoa(username + ':' + password)}`
    }
  })
}
export async function deleteReq (path) {
  const { seller_id: username, seller_zip_code_prefix: password } = store.getState().seller.value
  return fetch(API_URL + path, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${btoa(username + ':' + password)}`
    }
  })
}
