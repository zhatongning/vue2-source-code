/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {    
    Vue.options[type + 's'] = Object.create(null)
  })
  

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  extend(Vue.options.components, builtInComponents)


  // Vue及Vue.options
  /**  
   *  初始化
   *  options: {
   *    components: {
   *      keepAlive: {
   *        "name": 'keep-alive',
   *        ...
   *      }
   *    },
   *    filters: {},
   *    directives: {},
   *    _base: Vue
   *  }
  */

  /**
   * Vue
   * {
   *    set,
   *    delete,
   *    nextTick,
   *    observable,
   *    options,
   * }
  */

  initUse(Vue)
  /**
   * Vue
   * {
   *  use: (plugin) => Vue,
   *  用来安装插件，vuex，vueRouter...
   *  _installedPlugins: {}
   * }
  */



  initMixin(Vue)
  /**
   * Vue
   * {
   *    mixin: (mixin) => {}
   *    mixin通过mergeOptions扩展options
   * }
  */


  initExtend(Vue)
  /**
   * Vue
   * {
   *    extend: (extendOptions) => VueComponent
   * }
   * Vue.extend方法，接受extendOptions作为参数
   * Vue.extend(extendOptions)
   * 继承Vue的原型，合并Vue.options,复制实用方法
   * 
  */

  /**
   * Vue.mixin与Vue.extend之间的区别
   * mixin是将选项合并到参数列表（options）里，返回的是混合之后的options
   * extend也会合并this.options，但是extend内部会生成一个继承了Vue的构造函数
   * 同时这个构造函数拥有this.options，同时还复制了Vue构造函数的其他属性
  */

  initAssetRegisters(Vue)
  /**
   * initAssetRegisters：component|filter|directive的注册方式
   * 注意事项： initAssetRegisters本身是定义了Vue['component'|'filter'|'directive']的三个方法，而
   * 这些方法的内部实际是将对应的资源都注册到实例的options中
   * 
   * Vue
   * {
   *    component: (id, definition) => definition
   *    filter: (id, definition) => definition
   *    directive: (id, definition) => definition
   * }
   * 注册组件、过滤器、指令
   * 不传definition，从options的[component|filter|directive]s中返回已注册的
   * 
   * 传入definition：相应的方法注册
   * component: definition = Vue.extend(definition)
   * directive: definition = {
   *   bind: definition,
   *   update: definition
   * }
   * filter: definition
   * 然后都定义到options中 this.options[type + 's'][id] = definition
  */
}
