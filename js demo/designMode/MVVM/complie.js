class Complie {
    constructor(el, vm) {
        this.el = el
        this.vm = vm
        this._complie()
    }

    _complie() {
        // console.log(this.el)
        // 1.将dom变成fragment
        let dom = document.getElementById(this.el + '')

        let cp = document.createDocumentFragment()
        while (dom.firstChild) {
            cp.appendChild(dom.firstChild)
        }
        // console.log('firstChild', dom.firstChild)
        //  console.log('cp', cp)
        // 解析指令和{{}}，替换值
        cp.childNodes.forEach((item) => {
            if (this.isElementNode(item)) {
                // 这块差了一个递归，稍后再补
                this._excuteInput(item)
            } else {
                this._exceteText(item)
            }
        })
        // 3.重新放入dom中
        dom.appendChild(cp)
    }


    _excuteInput(node) {
        Array.from(node.attributes).forEach(attr => {
            if (attr.name.includes('v-')) {
                // console.log('元素指令节点', node)
                let expr = attr.value
                // console.log('元素指令节点表达式', expr)
                let [, type] = attr.name.split('-')
                // console.log('元素指令节点类型', type)
                CompileUtil[type](node, this.vm, expr)
            }
        })
        // console.log(node)
        // console.log('元素节点', node)
    }

    _exceteText(text) {
        // 将 {{message}} 拿出来，并替换成 data上的值
        let reg = /\{\{([^}]+)\}\}/g
        if (reg.test(text.textContent)) {
            console.log('文本节点', text.textContent)
            CompileUtil['text'](text, this.vm, text.textContent)
        }
    }

    isElementNode(node) {
        return node.nodeType === 1
    }
}

// 解耦 逻辑和处理
CompileUtil = {
    getVal(vm, expr) {
        expr = expr.split('.')
        return expr.reduce((prev, next) => {
            return prev[next]
        }, vm)
    },
    getText(vm, expr) {
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            return this.getVal(vm, arguments[1])
        })
    },
    text(text, vm, expr) {
        // console.log(this.getText(expr))
        let updateFn = this.updater['textUpdater']
        // {{a}} {{b}}
        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1], (newValue) => {
                // 如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
                updateFn && updateFn(text, this.getText(vm, expr))
            })
        })

        updateFn && updateFn(text, this.getText(vm, expr))
    },
    setVal(vm, expr, value) {
        expr = expr.split('.')
        return expr.reduce((prev, next, currentIndex) => {
            if (currentIndex === expr.length - 1) {
                return prev[next] = value
            }
            return prev[next]
        }, vm)
    },
    model(node, vm, expr) {
        // 将 v-model='message' 拿出来，并替换成 data上的值
        // 这块有个递归回头再补
        let updateFn = this.updater['modelUpdater']
        // 添加一个观察者，数据变化后，调用watcher的callback
        new Watcher(vm, expr, (newValue) => {
            updateFn && updateFn(node, this.getVal(vm, expr))
        })
        node.addEventListener('input', (e) => {
            let newValue = e.target.value
            this.setVal(vm, expr, newValue)
        })
        updateFn && updateFn(node, this.getVal(vm, expr))
    },
    updater: {
        textUpdater(text, value) {
            text.textContent = value
            console.log('编译后的text', text)
        },
        modelUpdater(node, value) {
            node.value = value
            console.log('编译后的node', node)
        }
    }
}