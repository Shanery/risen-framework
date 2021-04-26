import { replaceRouteParams } from '../helpers'

import Logger from '@/store/ResourceModule/Logger'

const updateAction = (resourceModule, API, {
  name,
  pluralName,
  rootRoute,
}) => {
  resourceModule.actions[`update_${name}`] = async ({ getters, dispatch }, {
    params = {},
    data,
  }) => {
    dispatch('beforeAction', `update_${name}`)
    const route = `${rootRoute}/${pluralName}/:${name}_id`

    try {
      const endpoint: string = replaceRouteParams(route, params, getters)

      const response = await API.update(
        endpoint,
        data,
      )

      dispatch('addItemsToLocalDB', {
        response,
        resource_type: name,
      })

      dispatch('afterAction', {
        actionType: `update_${name}`,
        data: {
          id: params[`${name}_id`],
          params,
          data,
          item: response,
        },
      })

      return response
    } catch (error) {
      Logger.error(error)
    }
  }
}

export default updateAction
