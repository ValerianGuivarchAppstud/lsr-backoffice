import axios from 'axios'

export const httpClient = (params = {}) => {
  const options = params
  if (!params['headers']) {
    options['headers'] = { Accept: 'application/json' }
  }
  options['headers']['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
  return axios(options).catch((err) => {
    // eslint-disable-next-line no-magic-numbers
    if (err['response']['data']['status'] === 401) {
      localStorage.setItem('needsRefresh', 'true')
      throw Error('Refreshing...')
    } else {
      throw Error(err['response']['data']['message'] ?? 'An error occured')
    }
  })
}
