import { replaceRouteParams } from '../helpers'

import Logger from '@/store/ResourceModule/Logger'

const getAction = (resourceModule, API, {
  name,
  pluralName,
  rootRoute,
}) => {
  resourceModule.actions[`get_${name}`] = async ({ getters, dispatch }, {
    params,
  }) => {
    dispatch('beforeAction', `get_${name}`)
    const route = `${rootRoute}/${pluralName}/:${name}_id/`

    try {
      const endpoint: string = replaceRouteParams(route, params, getters)

      const response = await API.get(
        endpoint,
        true,
      )

      await dispatch('addItemsToLocalDB', {
        response,
        resource_type: name,
      })

      const item = getters[`all_${pluralName}`][params[`${name}_id`]]
      dispatch('afterAction', {
        actionType: `get_${name}`,
        data: {
          id: params[`${name}_id`],
          response,
          item,
          params,
        },
      })

      return item
    } catch (error) {
      Logger.error(error)
    }
  }
}

export default getAction
