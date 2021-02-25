// 保存构造函数引用，避免import
let Vue

class Store {
    constructor(options) {
        var self = this
        self.options = options
        // console.log(options)
        Vue.util.defineReactive(this, 'state', options.state)

        // 手写一个computed对象，赋值给vue的computed的对象
        var computed = {}

        this.getters = {}
        
        for (let [key, fn] of Object.entries(options.getters)) {
            computed[key] = function() {
                return fn(self.state)
            }
            // computed[key] = options.getters[key]
            Object.defineProperty(self.getters, key, {
                get: function() {
                    return self.vm[key]
                },
                enumerable: true, // for local getters
            })
        }

        this.vm = new Vue({
            data: { state: this.options.state },
            computed: computed,
        })

        // 调用mutations对象中的传入的参数方法
        this.commit = function(fn, payload) {
            let entry = options.mutations[fn]
            if (!entry) {
                console.log('have no this fn')
            } else {
                entry(self.state, payload)
            }
        }

        // 调用action对象中的某个方法
        this.dispatch = function(fn, payload) {
            let entry = options.actions[fn]
            if (!entry) {
                console.log('have no this fn')
            } else {
                entry(self, payload)
            }
        }
    }
}

function install(_Vue) {
    Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            // console.log(this)
            // console.log(this.$options)
            // 这句话没明白，只有在根组件上才有这个选项，因为main.js上，给根元素（根组件）挂载了store，所以$options上有store的是根元素
            if (this.$options.store) {
                console.log('老子是根元素')
                Vue.prototype.$store = this.$options.store
            }
        },
    })
}

export default { Store, install }
