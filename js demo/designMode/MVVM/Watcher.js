class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        // 先缓存老值，获取值的时候，Object.definepropery的get执行
        this.value = this.get()
    }

    get() {
        Dep.target = this;
        let value = this.getVal(this.vm, this.expr)
        Dep.target = null;
        return value
    }

    getVal(vm, expr) {
        expr = expr.split('.')
        return expr.reduce((prev, next) => {
            return prev[next]
        }, vm)
    }

    // 对外暴露的方法，用新值和老值进行对比，如果发生变化，就调用更新方法
    update() {
        let newValue = this.getVal(this.vm, this.expr)
        if (newValue !== this.value) {
            this.cb(newValue) // 对应watch的callback
        }
    }
}