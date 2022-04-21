import { httpClient } from './httpClient'
import { configuration } from '../../config/config'
import { getResourceUrl } from '../../config/resources'
import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
} from 'react-admin'

export const ACTIONS = {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_RAW: 'GET_RAW',
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
}

export const CONTENT_TYPES = {
  JSON: 'application/json'
  //MULTIPART_FORM_DATA: 'multipart/form-data',
}

const _provider = (apiUrl, _httpClient) => {
  /**
   * In order to allow regular react-admin calls, this function normalize the params
   * to be able to handle calls like
   * dataProvider({ resource: "posts", method: CREATE, contentType: JSON }, { data: { name: "Hello", message: "World" }})
   * and
   * dataProvider(CREATE, "posts", { data: { name: "Hello", message: "World" }})
   * @param {object|string} typeOrOptions
   * @param {object|string} resourceOrParams
   * @param {object|string} params
   */
  const normalizeParameters = (typeOrOptions, resourceOrParams, params) => {
    if (typeof typeOrOptions === 'string')
      return {
        action: typeOrOptions,
        resource: getResourceUrl(resourceOrParams),
        contentType: CONTENT_TYPES.JSON,
        params
      }
    const { action = ACTIONS.GET_ONE, resource, contentType = CONTENT_TYPES.JSON } = typeOrOptions
    return {
      action,
      resource: getResourceUrl(resource),
      contentType,
      params: resourceOrParams
    }
  }

  /**
   * Return a usable data object according to contentType
   * @param {string} contentType
   * @param {object} data
   */
  const getRequestData = ({ contentType, data = {} }) => {
    /**
         switch (contentType) {
            case CONTENT_TYPES.MULTIPART_FORM_DATA:
                return Object.keys(data).reduce((formData, key) => {
                    formData.append(key, data[key])
                    return formData
                }, new FormData())
            case CONTENT_TYPES.JSON:
            default:
                return data
        }
         */
    return data
  }

  /**
   * @param {String} action One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {String} contentType One of the constants appearing at the top if this file, e.g. 'JSON'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertToHTTPRequests = ({ action, resource, contentType, params }) => {
    const requests: any[] = []
    switch (action) {
      case GET_LIST: {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const sign = order === 'DESC' ? '-' : ''
        const query = {
          ...fetchUtils.flattenObject(params.filter),
          sort: field + ',' + order,
          page: page - 1,
          size: perPage
        }
        requests.push({ url: `${apiUrl}/${resource}`, params: query, requestParams: params })
        break
      }
      case GET_ONE:
        requests.push({ url: `${apiUrl}/${resource}/${params.id}`, requestParams: params })
        break
      case ACTIONS.GET_RAW:
        requests.push({ url: `${apiUrl}/${resource}`, requestParams: params })
        break
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const query = {
          ...fetchUtils.flattenObject(params.filter),
          [params.target]: params.id,
          _sort: field,
          _order: order,
          _start: (page - 1) * perPage,
          _end: page * perPage
        }
        requests.push({
          url: `${apiUrl}/${resource}/manyReferences`,
          // params: {
          //   ids: params.ids,
          // },
          params: query,
          requestParams: params
        })
        break
      }
      case UPDATE:
        requests.push({
          url: `${apiUrl}/${resource}/${params.id}`,
          method: 'PUT',
          data: getRequestData({ contentType, data: params.data }),
          headers: { 'Content-Type': contentType },
          requestParams: params
        })
        break
      case CREATE:
        requests.push({
          url: `${apiUrl}/${resource}`,
          method: 'POST',
          data: getRequestData({ contentType, data: params.data }),
          headers: { 'Content-Type': contentType },
          requestParams: params
        })
        break
      case DELETE:
        requests.push({
          url: `${apiUrl}/${resource}/${params.id}`,
          method: 'DELETE',
          requestParams: params
        })
        break
      case GET_MANY: {
        requests.push({
          url: `${apiUrl}/${resource}/many`,
          params: {
            ids: params.ids
          },
          requestParams: params
        })
        break
      }
      case UPDATE_MANY:
        return params.ids
          .map((id) => {
            const newParams = { ...params, id }
            return convertToHTTPRequests({
              action: ACTIONS.UPDATE,
              resource,
              contentType,
              params: newParams
            })
          })
          .reduce((result, it) => result.concat(it), requests)
      case DELETE_MANY:
        return params.ids
          .map((id) => {
            const newParams = { ...params, id }
            return convertToHTTPRequests({
              action: ACTIONS.DELETE,
              resource,
              contentType,
              params: newParams
            })
          })
          .reduce((result, it) => result.concat(it), requests)
      default:
        throw new Error(`Unsupported fetch action for ${action}`)
    }
    return requests
  }

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponse = (response, { action, resource }, params) => {
    const { headers, data } = response
    const id = data.id || params.id
    let count = 1
    switch (action) {
      case GET_LIST:
      case GET_MANY:
      case GET_MANY_REFERENCE:
        count = data.length || 1
        if (headers['x-total-count']) {
          count = parseInt(headers['x-total-count'].split('/').pop(), 10)
        }
        return {
          data: data.content,
          total: data.totalElements
        }
      case CREATE:
        return { data: { ...params.data, ...data, id: data.id } }
      case ACTIONS.GET_RAW:
        return { data }
      default:
        return { data: { ...data, id } }
    }
  }

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {
    const normalizedParameters = normalizeParameters(type, resource, params)
    return Promise.all(
      convertToHTTPRequests(normalizedParameters).map(async (request) => {
        const response = await _httpClient(request)
        return convertHTTPResponse(response, normalizedParameters, request.requestParams)
      })
    ).then((results) => {
      if (normalizedParameters.action === DELETE_MANY || normalizedParameters.action === UPDATE_MANY)
        return { data: results.map((result) => result.data) }
      return results[0]
    })
  }
}

export const configuredProvider = _provider(configuration.apiUrl, httpClient)
