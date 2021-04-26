import get from './get.plugin'
import get_all from './get_all.plugin'
import create from './create.plugin'
import update from './update.plugin'
import deleteAction from './delete.plugin'

const plugins: PluginList =
  [
    [get, {}],
    [get_all, {}],
    [create, {}],
    [update, {}],
    [deleteAction, {}],
  ]

export default plugins
