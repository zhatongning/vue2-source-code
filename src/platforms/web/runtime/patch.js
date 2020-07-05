/* @flow */

// dom的操作方法
import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'

// direactive, ref
import baseModules from 'core/vdom/modules/index'

// attrs, klass, events, domProps, style, transition
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
const modules = platformModules.concat(baseModules)

export const patch: Function = createPatchFunction({ nodeOps, modules })
