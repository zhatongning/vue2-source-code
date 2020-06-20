#

```html
  <div id="app">
    <div >{{ messsage }}</div>
    <div>{{ cmsg }}</div>
    <div>{{ ccmsg }}</div>
    <button v-on:click="modify">xiugai</button>
  </div>
```

```js
  new Vue({
    name: 'root',
    el: '#app',
    data() {
      return {
        messsage: 'hello world'
      }
    },
    computed: {
      cmsg() {
        return this.messsage + ' hello stackbucks'
      },
      ccmsg: {
        get: function() {
          return this.messsage + ' hello coffee'
        }
      }
    },
    methods: {
      modify() {
        console.log(123)
        this.messsage = 'hello js'
      }
    }
    // render: h => h(Outer)
  })
```

## Dep

1、$attrs: id=0, subs = []
2、$listeners: id=1, subs = []
3、data: id = 2, subs = []
4、data的message: id = 3, subs = []

## Observer

1、 messsage

## Watcher

1、ccmsg
2、cmsg
3、updateComponent函数
