class KVue {
    constructor(data, template) {
        this.$data = data
        this.observer(data)
        // 模拟watcher创建
        new Watcher()
        this.$data.name
        new Watcher()
        this.$data.npc.name
    }
    // 将数据都进行观察
    observer(data) {
        if (!data || typeof data !== 'object') {
            return
        }
        Object.keys(data).forEach((key) => {
            this.deactivated(data, key, data[key])
        })
    }
    deactivated(obj, key, val) {
        this.observer(val)
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return val
            },
            set(newValue) {
                if (val === newValue) {
                    return
                }
                val = newValue
                // console.log(`$data的${key}发生改变，值为${val}`)
                dep.notify()
            }
        })
    }
}

// 订阅器，管理watcher 
class Dep {
    constructor() {
        // 存放依赖（watcher）
        this.deps = []
    }
    addDep(dep) {
        this.deps.push(dep)
    }
    // 通知所有的watcher
    notify() {
        this.deps.forEach(dep => dep.update())
    }
}

class Watcher {
    constructor() {
        // 将当前watcher实例给Dep的静态属性（只有唯一一个）
        Dep.target = this
    }
    update() {
        console.log('属性更新')
    }
}