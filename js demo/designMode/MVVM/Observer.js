class Observer {
    constructor(data) {
        // this.data = data
        this.observer(data)
    }

    defineReactive(obj, key) {
        let val = obj[key]
        let self = this
        let dep = new Dep()
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                console.log('get')
                // 第一次取值的时候，没有Dep.target，所以加判断
                Dep.target && dep.add(Dep.target)
                return val
            },
            set(newVal) {
                if (val === newVal) {
                    return
                }
                console.log('set')
                val = newVal
                // 这块疑问一下，回头再说
                // self.defineReactive(obj, key)
                self.observer(newVal)
                // 通知所有watcher 数据更新
                dep.notify()
            }
        })
    }
    // 将data对象中的数据，全部监听
    observer(data) {
        var self = this
        // 一开始定义递归的方法没写好，不科学，他这个写的贼几把科学
        if (!data || typeof data !== 'object') {
            return
        }
        Object.keys(data).forEach(key => {

            // if (typeof (data[key]) === 'object') {
            //     self.observer(data[key])
            // } else {
            self.observer(data[key])
            self.defineReactive(data, key)
            // }
        })
    }

}