import { replaceRouteParams } from '../helpers'

import Logger from '@/store/ResourceModule/Logger'

const createAction = (resourceModule, API, {
  name,
  pluralName,
  rootRoute,
}) => {
  resourceModule.actions[`create_${name}`] = async ({ getters, dispatch }, {
    params = {},
    data,
  }) => {
    dispatch('beforeAction', `create_${name}`)
    const route = `${rootRoute}/${pluralName}`

    try {
      const endpoint: string = replaceRouteParams(route, params, getters)

      const response = await API.post(
        endpoint, data
      )

      await dispatch('addItemsToLocalDB', {
        response,
        resource_type: name,
      })

      dispatch('afterAction', {
        actionType: `create_${name}`,
        data: {
          payload: data,
          item: response,
          params,
        },
      })

      return getters.linkResolver(response)
    } catch (error) {
      Logger.error(error)
    }
  }
}

export default createAction
