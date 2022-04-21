import { configuration } from '../../config/config'
import axios from 'axios'
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin'

export const authProvider = (type, params) => {
  // Called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const { username, password } = params
    return axios
      .post(`${configuration.apiUrl}/auth/login`, {
        email: username,
        password
      })
      .then((response) => {
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        localStorage.setItem('authority', response.data.authority)
      })
  }
  // Called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('authority')
    return Promise.resolve()
  }
  // Called when the API returns an error
  if (type === AUTH_ERROR) {
    return (
      axios
        .post(`${configuration.apiUrl}/auth/refresh`, {
          access_token: localStorage.getItem('accessToken'),
          refresh_token: localStorage.getItem('refreshToken')
        })
        // eslint-disable-next-line consistent-return
        .then((response) => {
          localStorage.setItem('accessToken', response.data.accessToken)
          localStorage.setItem('refreshToken', response.data.refreshToken)
          localStorage.setItem('authority', response.data.authority)
          if (localStorage.getItem('needsRefresh') === 'true') {
            return window.location.reload()
          }
        })
        .catch(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('authority')
          return window.location.reload()
        })
    )
  }
  // Called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    return localStorage.getItem('accessToken') ? Promise.resolve() : Promise.reject()
  }

  if (type === AUTH_GET_PERMISSIONS) {
    const authority = localStorage.getItem('authority')
    return authority ? Promise.resolve(authority) : Promise.reject()
  }

  return Promise.reject(Error('Unknown Method'))
}
