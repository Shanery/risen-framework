import Vue from 'vue'

import { replaceRouteParams } from '../helpers'

import Logger from '@/store/ResourceModule/Logger'

const addEdges = (resourceModule, API, {
  name,
  pluralName,
  rootRoute,

  relationships,
}: {
  name: string;
  pluralName: string;
  rootRoute: string;

  relationships: Relationship[];
}) => {
  resourceModule.modules = {}

  relationships.forEach(relationship => {
    const {
      edgeName,
      linkedName,
      edgeSchema,
    } = relationship

    const subModule = {
      state: {},
      getters: {},
      mutations: {},
      actions: {},
    }
    resourceModule.modules[edgeName] = subModule

    const edgeType = `${name}_${edgeName}`

    subModule.state[`all_${edgeType}`] = {}

    subModule.getters[`all_${edgeType}`] = (state) => {
      return state[`all_${edgeType}`]
    }

    // Edge Schema
    subModule.getters[`${edgeType}_schema`] = () => {
      return edgeSchema
    }

    // Get Edge Action
    subModule.actions[`get_edge_${edgeType}`] = async ({ getters, dispatch }, {
      edgeLink,
    }: {
      fromResource: Resource;
      edgeLink: EdgeLink;
    }) => {
      const route = `${rootRoute}/${edgeName}/:${edgeName}_id`

      const params = {}
      params[`${edgeName}_id`] = edgeLink.id

      const endpoint: string = replaceRouteParams(route, params, getters)

      const response = await API.get(endpoint)

      if (response) {
        await dispatch('addItemsToLocalDB', {
          response,
          resource_type: edgeType,
        })
      }

      return response
    }

    // Set Mutations
    subModule.mutations[`add_${edgeType}`] = (state, payload) => {
      const localDB = state[`all_${edgeType}`]

      // Allow for Type Identification
      Object.values(payload).forEach((item: Resource) => {
        item.resource_type = edgeType

        if (localDB[item.id]) {
          // Object.assign(localDB[item.id], item)
          Vue.set(localDB, item.id, item)
        } else {
          Vue.set(localDB, item.id, item)
        }
      })
    }

    subModule.mutations[`refresh_${edgeType}`] = (state, item: Resource) => {
      item.resource_type = edgeType

      const localDB = state[`all_${edgeType}`]

      Vue.set(localDB, item.id, Object.assign({}, localDB[item.id], item))

      state[`all_${edgeType}`] = Object.assign({}, localDB)
    }

    // Create Actions
    subModule.actions[`create_edge_${edgeType}`] = async ({ getters, dispatch }, {
      fromResource,
      toResource,
      data = {},
    }: {
      fromResource: Resource;
      toResource: Resource;
      data: { [key: string]: any };
    }) => {
      if (!fromResource || !toResource) { }

      fromResource = getters.linkResolver(fromResource)
      toResource = getters.linkResolver(toResource)

      try {
        const route = `${rootRoute}/${edgeName}`

        const params = {}
        // params[`${name}_id`] = fromResource.id
        // params[`${linkedName}_id`] = toResource.id

        const endpoint: string = replaceRouteParams(route, params, getters)

        const edge = {
          resource_type: edgeType,

          out: fromResource.id,
          out_type: fromResource.resource_type,

          in: toResource.id,
          in_type: toResource.resource_type,

          data,
        }

        // Add Edge
        const response = await API.post(
          endpoint,
          edge,
        )

        const edgeLink = {
          resource_type: edgeType,
          id: response.id,
        }

        // Add Edge Links to Resources
        if (fromResource[`out_${edgeName}`]) {
          fromResource[`out_${edgeName}`].push(edgeLink)
        } else {
          fromResource[`out_${edgeName}`] = [edgeLink]
        }
        dispatch('updateResource', fromResource)

        if (toResource[`in_${edgeName}`]) {
          toResource[`in_${edgeName}`].push(edgeLink)
        } else {
          toResource[`in_${edgeName}`] = [edgeLink]
        }
        dispatch('updateResource', toResource)

        return response
      } catch (error) {
        Logger.error(error)
      }
    }

    // Update Actions
    subModule.actions[`update_edge_${edgeType}`] = async ({ getters, dispatch }, {
      edge,
    }: {
      edge: Edge;
    }) => {
      try {
        const edgeId: string = edge.id

        const route = `${rootRoute}/${edgeName}/:${edgeType}_id`

        const params = {}
        params[`${name}_id`] = edge.out
        params[`${edgeType}_id`] = edge.id

        const endpoint = replaceRouteParams(route, params, getters)

        // Add Edge
        const response = await API.update(
          endpoint,
          edge,
        )

        return response
      } catch (error) {
        Logger.error(error)
      }
    }

    // Delete Edge
    subModule.actions[`delete_edge_${edgeType}`] = async ({ getters, dispatch }, {
      edge,
    }: {
      edge: Edge;
    }) => {
      try {
        const edgeResolver: (ResourceLink: ResourceLink, direction: 'in' | 'out' | 'none') => Edge = getters.edgeResolver

        edge = edgeResolver(edge, 'none')

        const edgeId: string = edge.id

        const route = `${rootRoute}/${edgeName}/:${edgeType}_id`

        const params = {}
        params[`${name}_id`] = edge.out
        params[`${edgeType}_id`] = edge.id

        const endpoint = replaceRouteParams(route, params, getters)

        // Remove Links from Resources
        const linkResolver: (ResourceLink: ResourceLink) => Resource = getters.linkResolver

        const fromResource: Resource = linkResolver({
          resource_type: edge.out_type,
          id: edge.out,
        })
        const toResource: Resource = linkResolver({
          resource_type: edge.in_type,
          id: edge.in,
        })

        if (fromResource) {
          const fromLinkIndex = fromResource[`out_${edgeName}`].findIndex(edge => {
            return edge.id === edgeId
          })

          if (fromLinkIndex !== -1) {
            fromResource[`out_${edgeName}`].splice(fromLinkIndex, 1)
          }

          dispatch('updateResource', fromResource)
        }

        if (toResource) {
          const toLinkIndex = toResource[`in_${edgeName}`].findIndex(edge => {
            return edge.id === edgeId
          })

          if (toLinkIndex !== -1) {
            toResource[`in_${edgeName}`].splice(toLinkIndex, 1)
          }

          dispatch('updateResource', toResource)
        }

        // Remove Edge
        const response = await API.delete(
          endpoint,
          edge,
        )

        return response
      } catch (error) {
        Logger.error(error)
      }
    }

    // Remove Links after removing Resources

    subModule.actions[`after_delete_${name}`] = async ({ dispatch, getters }, {
      item,
    }) => {
      const edges = getters.edgesResolver(item, `out_${edgeName}`, 'none')

      if (!edges) return

      edges.forEach((edge: Edge) => {
        dispatch(`delete_edge_${edgeType}`, {
          edge,
        })
      })
    }

    if (Array.isArray(linkedName)) {
      linkedName.forEach(name => {
        subModule.actions[`after_delete_${name}`] = async ({ dispatch, getters }, {
          item,
        }) => {
          const edges = getters.edgesResolver(item, `in_${edgeName}`, 'none')

          if (!edges) return

          edges.forEach((edge: Edge) => {
            dispatch(`delete_edge_${edgeType}`, { edge })
          })
        }
      })
    } else {
      subModule.actions[`after_delete_${linkedName}`] = async ({ dispatch, getters }, {
        item,
      }) => {
        const edges = getters.edgesResolver(item, `in_${edgeName}`, 'none')

        if (!edges) return

        edges.forEach((edge: Edge) => {
          dispatch(`delete_edge_${edgeType}`, { edge })
        })
      }
    }
  })
}

export default addEdges
