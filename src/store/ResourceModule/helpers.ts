export const replaceRouteParams = (route: string, params: {
  [key: string]: string;
} = {}, getters = {}) => {
  // Handle Double Slashes
  route = route.replace('//', '/')

  // Handle last param no trailing slash
  if (route[route.length - 1] !== '/') route += '/'

  // Handle no leading slash
  if (route[0] !== '/') route = '/' + route

  const parts = [...route.matchAll(/:([^/]+)\//g)]

  return parts.reduce((route, current) => {
    const param = current[1]

    let paramValue = params[param]

    // Try to resolve missing params first
    if (!paramValue) {
      paramValue = getters[param]
    }

    if (!paramValue) {
      throw new Error(`Route Parameter: ${param}, not provided`)
    }

    return route.replace(`:${param}`, paramValue)
  }, route)
}
