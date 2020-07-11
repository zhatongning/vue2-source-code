# Vue 源码分析

## 入口文件

`package.json`中的`"main": "dist/vue.runtime.common.js",`是打包之后的入口文件。那打包过程的入口文件在哪儿呢？从`packages`中的`srcipt`中可以找到`script/config`中配置了打包的入口文件，当然这个也是程序的入口文件。

配置文件中设计到一个概念：`Runtime+compiler`与`Runtime only`？
`runtime`就是Vue提供的运行环境上下文，而`compiler`是将模板转化成`_render`函数的编译器。两者的区别是在运行的时候编译还是在运行之前编译。因为`compolier`耗时，所以生成环境一般都用`.vue`去写组件时，通过`webpack`的`vue-loader`打包，这个时候实际上`template`都被编译成了`render`函数，在运行时只需要执行`render`函数，这就是典型的`runtime only`。

如果直接把[core/index](./src/core/index.js)当做入口文件，就会发现`$mount`函数竟然没有注册到源码中。而项目的真正入口文件`/web/entry-runtime-with-compiler`，通过`import Vue`的方式在原型上注册了`$mount`方法，而且根据不同的平台扩展了`$mount`的方法。

## 1、组件与生命周期

在`new Vue`时会调用`Vue.prototype._init`的函数。

`Vue.prototype._init`是怎么来的呢？
[文件](./src/core/index.js)中并没有定义`Vue`，而是从[实例文件中](./src/core/instance/index.js)中引入了`Vue`，引入的过程会有副作用，就是会执行`Vue`的一些初始化操作，`initMixin`,`stateMixin`...作用是在`Vue.prototype`上注册方法。而在入口文件中，会执行`initGlobalAPI`，这个时候注册了大量的`Vue`的静态方法`Vue.use`，`Vue.extends`...

> 之前有面试题，为什么用函数的方式而不是`class`的方式定义`Vue`?
> 因为用原型注入的这种方式好组织代码。可以将功能分在不同的文件中，然后通过副作用的方式注入到构造函数中。

```javascript
  new Vue({
    template: `<h1>hello Vue</h1>`
  }).$mount(`#mountedDom`)
```

上面的这种写法就是`runtime + compiler`的方式，实例化之后会调用`$mount`，而`$mount`的时候会将`template`编译成`render`函数。

```javascript
  function anonymous() {
    with(this){return _c('h1',[_v("hello vue")])}
  }
```

