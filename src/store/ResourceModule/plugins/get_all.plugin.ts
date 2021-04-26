import { replaceRouteParams } from '../helpers'

import Logger from '@/store/ResourceModule/Logger'

const getAllAction = (resourceModule, API, {
  name,
  pluralName,
  rootRoute,
}) => {
  resourceModule.actions[`get_all_${pluralName}`] = async ({ getters, dispatch }, {
    params = {},
  } = {}) => {
    dispatch('beforeAction', `get_all_${pluralName}`)
    const route = `${rootRoute}/${pluralName}`

    try {
      const endpoint: string = replaceRouteParams(route, params, getters)

      const response = await API.get_all(
        endpoint,
      )

      dispatch('addItemsToLocalDB', {
        response,
        resource_type: name,
      })

      dispatch('afterAction', {
        actionType: `get_all_${pluralName}`,
        data: {
          response,
          params,
        },
      })

      return response
    } catch (error) {
      Logger.error(error)
    }
  }
}

export default getAllAction
