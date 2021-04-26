import { replaceRouteParams } from '../helpers'

import Logger from '@/store/ResourceModule/Logger'

const deleteAction = (resourceModule, API, {
  name,
  pluralName,
  rootRoute,
}) => {
  resourceModule.actions[`delete_${name}`] = async ({ getters, dispatch }, {
    params = {},
  }) => {
    dispatch('beforeAction', `delete_${name}`)
    const route = `${rootRoute}/${pluralName}/:${name}_id`

    try {
      const endpoint: string = replaceRouteParams(route, params, getters)

      const item = getters[`all_${pluralName}`][params[`${name}_id`]]

      const response = await API.delete(
        endpoint
      )

      if (getters[`all_${pluralName}`][params[`${name}_id`]]) {
        getters[`all_${pluralName}`][params[`${name}_id`]] = undefined

        delete getters[`all_${pluralName}`][params[`${name}_id`]]
      }

      await dispatch('afterAction', {
        actionType: `delete_${name}`,
        data: {
          id: params[`${name}_id`],
          item,
          params,
          response,
        },
      })

      return response
    } catch (error) {
      Logger.error(error)
    }
  }
}

export default deleteAction
