import Vue from 'vue'
import Vuex from 'vuex'

// UI
import Logger from '@/store/ResourceModule/Logger'

Vue.use(Vuex)

export default function (resources, options = {}): VuexModule {
  const singularToPlural = {}
  const pluralToSingular = {}

  const allResourceTypes = {}

  Object.values(resources).forEach(({
    name,
    pluralName,
  }) => {
    singularToPlural[name] = pluralName
    pluralToSingular[pluralName] = name

    allResourceTypes[name] = true
  })

  return {
    modules: {
      ...resources,
    },

    state: {
      singularToPlural,
      pluralToSingular,
      allResourceTypes,
    },
    getters: {
      singularToPlural: (state) => (singular) => {
        const plural = state.singularToPlural[singular]
        if (!plural) throw new Error(`No Plural found for: "${singular}"`)
        return plural
      },
      pluralToSingular: (state) => (plural) => {
        const singular = state.pluralToSingular[plural]
        if (!singular) throw new Error(`No Singluar found for: "${plural}"`)
        return singular
      },
      allResourceTypes: (state) => {
        return state.allResourceTypes
      },
    },
    plugins: [(store) => {
      store.registerModule('linkResolver', {
        state: {
          getting: {},
        },
        getters: {
          linkResolver: (state, getters) => (resourceLink: ResourceLink) => {
            if (!(resourceLink && resourceLink.resource_type && resourceLink.id)) return

            const database = getters[`all_${getters.singularToPlural(resourceLink.resource_type)}`]

            if (!database) return resourceLink

            const resource = database[resourceLink.id]

            if (!resource && !state.getting[resourceLink && resourceLink.id]) {
              const params = Object.assign({}, resourceLink.params)
              params[`${resourceLink.resource_type}_id`] = resourceLink.id

              state.getting[resourceLink.id] = true

              Logger.log(`Getting Resource: ${resourceLink.resource_type} ${resourceLink.id}`)

              store.dispatch(`get_${resourceLink.resource_type}`, {
                params,
                query: resourceLink.query,
              })
                .finally(() => {
                  setTimeout(() => {
                    state.getting[resourceLink.id] = false
                  }, 20000)
                })
            }

            return resource
          },

          asyncLinkResolver: (state, getters) => async (resourceLink: ResourceLink) => {
            if (!(resourceLink && resourceLink.resource_type && resourceLink.id)) return

            const database = getters[`all_${getters.singularToPlural(resourceLink.resource_type)}`]

            if (!database) return resourceLink

            const resource = database[resourceLink.id]

            if (!resource && !state.getting[resourceLink && resourceLink.id]) {
              const params = Object.assign({}, resourceLink.params)
              params[`${resourceLink.resource_type}_id`] = resourceLink.id

              state.getting[resourceLink.id] = true

              Logger.log(`Getting Resource: ${resourceLink.resource_type} ${resourceLink.id}`)

              try {
                return await store.dispatch(`get_${resourceLink.resource_type}`, {
                  params,
                  query: resourceLink.query,
                })
              } catch (error) {
                Logger.error(error)
                return undefined
              }
            }

            return resource
          },
        },
      })
    }],
    mutations: {
      addSingularPluralMapping(state, {
        singular,
        plural,
      }) {
        state.singularToPlural[singular] = plural
        state.pluralToSingular[plural] = singular
      },
    },
    actions: {
      async addItemsToLocalDB({
        getters,
        commit,
      }: VuexContext, {
        resource_type,
        response,
      }: {
        resource_type: string;
        response: Resource[] | Resource;
      }) {
        if (Array.isArray(response)) {
          return commit(`add_${(getters.singularToPlural(resource_type))}`, response)
        } else {
          return commit(`refresh_${resource_type}`, response)
        }
      },

      async createResource({
        dispatch,
      }, {
        resource_type,
        params = {},
        data,
      }) {
        if (!resource_type) {
          throw new Error('Cannot create Resource with no resource type')
        }

        try {
          return await dispatch(`create_${resource_type.toLowerCase()}`, {
            params,
            data,
          })
        } catch (error) {
          Logger.error(error)
        }
      },

      async refreshResource({
        dispatch,
      }, {
        id,
        resource_type,
      }: Resource) {
        if (!id || !resource_type) return

        const params = {}

        params[`${resource_type}_id`] = id

        return await dispatch(`get_${resource_type}`, {
          params,
          query: {},
        })
      },

      async updateResource({
        dispatch,
        getters,
      }, resource: Resource) {
        resource = getters.linkResolver(resource)

        const {
          id,
          resource_type,
        } = resource

        Logger.log(resource)

        if (!id || !resource_type) return

        const params = {}

        params[`${resource_type.toLowerCase()}_id`] = id

        try {
          return await dispatch(`update_${resource_type.toLowerCase()}`, {
            params,
            data: resource,
          })
        } catch (error) {
          Logger.error(error)
        }
      },

      async deleteResource({
        dispatch,
      }, {
        id,
        resource_type,
      }: Resource) {
        if (!id || !resource_type) return

        const params = {}

        params[`${resource_type.toLowerCase()}_id`] = id

        try {
          return await dispatch(`delete_${resource_type.toLowerCase()}`, {
            params,
            query: {},
          })
        } catch (error) {
          Logger.error(error)
        }
      },
    },
  }

}
