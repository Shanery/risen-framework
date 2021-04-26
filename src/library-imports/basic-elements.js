
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const componentFolders = [ 
  '@/blocks/elements/', // Add Paths to folder of components you want
  '@/blocks/layouts/',
]

// Require Basic Elements
export default (Vue) => {
  const requireElements = require.context(
    '@/blocks/elements/', false, /[\w-]+\.vue$/,
  )
  requireElements.keys().forEach(fileName => {
  // Get component config
    const componentConfig = requireElements(fileName)
    // Get PascalCase name of component
    const componentName = upperFirst(
      camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
    )
    // Register component globally
    Vue.component(componentName, componentConfig.default || componentConfig)
  })

  // Require Layouts
  const requireLayouts = require.context(
    '@/blocks/layouts/', false, /[\w-]+\.vue$/,
  )
  requireLayouts.keys().forEach(fileName => {
  // Get component config
    const componentConfig = requireLayouts(fileName)
    // Get PascalCase name of component
    const componentName = upperFirst(
      camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
    )
    // Register component globally
    Vue.component(componentName, componentConfig.default || componentConfig)
  })

  // // Require Utilities
  // const requireRenderless = require.context(
  //   '@/blocks/utility-components/', false, /[\w-]+\.vue$/,
  // )
  // requireRenderless.keys().forEach(fileName => {
  // // Get component config
  //   const componentConfig = requireRenderless(fileName)
  //   // Get PascalCase name of component
  //   const componentName = upperFirst(
  //     camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
  //   )
  //   // Register component globally
  //   Vue.component(componentName, componentConfig.default || componentConfig)
  // })
}
