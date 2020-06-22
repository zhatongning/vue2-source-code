import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

// 类似_update，_render...，以_开始的方法名都是内部使用的，分析的时候结合之后的使用场景更容易立即

// Vue.prototype._init
initMixin(Vue)


/**
 * stateMixin(Vue)
 * Vue.prototype.$data = { // property accessor }
 * Vue.prototype.$props = { // property accessor }
 * 这里的set、del与Vue.set、Vue.del是同一个引用
 * Vue.prototype.$set = set
 * Vue.prototype.$delete = del
 * Vue.prototype.$watch = function() { // 这里调用createWatcher|new Watcher }
*/
stateMixin(Vue)

/**
 * $on接口文档： https://cn.vuejs.org/v2/api/#vm-on
 * Vue.prototype.$on = { // this._events内部注册事件名和回调 }
*/
eventsMixin(Vue)

/**
 * Vue.prototype._update = function() {}
 * Vue.prototype.$forceUpdate = function() {}
 * Vue.prototype.$destroy = function() {}
*/
lifecycleMixin(Vue)


/**
 * // src/core/util/next-tick.js 现在的版本2.5.22
 * Vue.prototype.$nextTick = function(cb) {
 *  维护一个cb队列，在微任务/（宏）任务中去处理事件，原则：支持microtask就在microtask中处理，macrotask作为后补
 *  1.有promise的情况，在romise.resolve()中去处理
 *  2.如果支持MutationObserver，将队列的处理作为回调，手动触发observer
 *  3.如果支持setImmediate，就setImmediate
 *  4.setTimeout(() => { handle(cbArray) }, 0)作为兜底方案
 *}
 *
 * Vue.prototype._render = function() {}
*/
renderMixin(Vue)

export default Vue
