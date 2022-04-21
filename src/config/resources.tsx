export const IDENTIFIERS = {
  ACCOUNT: 'accounts',
  ENUM: 'enums'
}

export const resources = {
  [IDENTIFIERS.ACCOUNT]: {
    name: IDENTIFIERS.ACCOUNT,
    url: 'accounts'
  },
  [IDENTIFIERS.ENUM]: {
    name: IDENTIFIERS.ENUM,
    url: 'enums'
  }
}

/**
 * Returns the URL according to the resource, or the original parameter if it's not found
 * @param {string} name Resource name
 */
export const getResourceUrl = (name) => {
  if (resources[name]) {
    return resources[name].url
  }
  return name
}
