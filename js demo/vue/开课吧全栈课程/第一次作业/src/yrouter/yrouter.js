let _Vue = null

class yrouter {
    constructor(options) {
        console.log(options)
        this.$options = options

        // 只有这里使用了Vue
        _Vue.util.defineReactive(this, 'current', '/')
        // 创建一个路由映射表 提前处理路由表避免每次都循环
        this.routeMap = {}
        options.routes.forEach((route) => {
            this.routeMap[route.path] = route
        })
        // 监听浏览器地址变化的事件
        window.addEventListener('hashchange', (address) => {
            //  this.current = window.location.hash.slice(1)
            this.current = address.newURL.split('#')[1] === '/' ? '/' : '/' + address.newURL.split('#')[1]
            // console.log(this.current)
        })
    }
}

yrouter.install = function(Vue) {
    _Vue = Vue

    // 为什么要使用混入式写？因为use代码在前（install执行），Router实例创建在后（根组件实例），install逻辑需要用到该实例。
    // 相当于一个延迟执行，等组件创建实例的时候，再来执行混入的代码。
    Vue.mixin({
        beforeCreate: function() {
            // 判断是否是根组件
            if (this.$options.router) {
                // 将用户传入的自定义配置注入VUE的$router中
                Vue.prototype.$router = this.$options.router
            }
        },
    })
    // 直接这么写不行吗，为什么要注入
    //  Vue.prototype.$router = this.$option

    Vue.component('router-link', {
        render: function(h) {
            // let component = `<a href={'#' + this.to}>{this.$slots.default}</a>`
            // console.log(this.$slots)
            return h(
                'a',
                {
                    attrs: {
                        href: '#' + this.to,
                    },
                },
                [this.$slots.default]
            )
        },
        props: {
            to: {
                type: String,
                required: true,
            },
        },
    })

    Vue.component('router-view', {
        render(h) {
            // 动态获取对应组件
            let component = null
            // console.log(this.$router)
            const route = this.$router.$options.routes.find((route) => route.path === this.$router.current)
            if (route) component = route.component
            return h(component)
        },
    })
}

export default yrouter
