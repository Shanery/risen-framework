import driver from './localStorageDriver'

import defaultPlugins from './plugins/defaults'

import Vue from 'vue'

export default (settings: ResourceModuleSettings, extensions = {}, API: ApiShape = driver) => {
  const {
    name,
    pluralName,
    rootRoute,
    plugins = defaultPlugins || [],
  } = settings

  const resourceModule: ResourceModule = {
    name,
    pluralName,
    rootRoute,

    state: {},
    getters: {},
    mutations: {},
    actions: {},
    plugins: [],
  }

  resourceModule.plugins = [(store) => {
    store.commit('addSingularPluralMapping', {
      singlur: name,
      plural: pluralName,
    })
  }]

  // Set State
  resourceModule.state[`all_${pluralName}`] = {}

  // Set Getter
  resourceModule.getters[`all_${pluralName}`] = (state) => {
    return state[`all_${pluralName}`]
  }

  // Set Mutations
  resourceModule.mutations[`add_${pluralName}`] = (state, payload) => {
    const localDB = state[`all_${pluralName}`]

    // Allow for Type Identification
    Object.values(payload).forEach((item: Resource) => {
      item.resource_type = name

      if (localDB[item.id]) {
        Object.assign(localDB[item.id], item)
      } else {
        Vue.set(localDB, item.id, item)
      }
    })
  }

  resourceModule.mutations[`refresh_${name}`] = (state, item: Resource) => {
    if (item) {
      item.resource_type = name

      const localDB = state[`all_${pluralName}`]

      localDB[item.id] = Object.assign({}, localDB[item.id], item)
      state[`all_${pluralName}`] = Object.assign({}, localDB)
    }
  }

  const installPlugin = (plugin: ResourcePlugin, plugin_settings: PluginSettings) => {
    plugin(resourceModule, API, {
      ...settings,
      ...plugin_settings,
    })
  }
  // Instantiate the Plugins
  plugins.forEach(([plugin, plugin_settings]) => {
    installPlugin(plugin, plugin_settings)
  })

  resourceModule.actions.beforeAction = async ({ dispatch }, actionType) => {
    if (resourceModule.actions[`before_${actionType}`]) {
      dispatch(`before_${actionType}`)
    }
  }

  resourceModule.actions.afterAction = async ({ dispatch }, {
    actionType,
    data,
  }) => {
    if (resourceModule.actions[`after_${actionType}`]) {
      dispatch(`after_${actionType}`, data)
    }
  }

  Object.entries(extensions).forEach(([key, value]: [string, object]) => {
    if (resourceModule[key]) {
      Object.assign(resourceModule[key], value)
    } else {
      resourceModule[key] = {
        ...value,
      }
    }
  })
  return resourceModule
}
