
export default function (fetch) {
  return function (url, opts) {
    return fetch(url, opts).then(
      (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.status !== 204 ? response.json() : {}
        } else {
          // TODO: json parametry
          var error = new Error({status: response.status, text: response.statusText})
          error.response = response
          throw error
        }
      })
  }
}
