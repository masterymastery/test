class Complie {
    constructor(el, vm) {
        this.el = el
        this.vm = vm
    }

    _complie() {
        console.log(this.el)
        // 将dom变成fragment
        let dom = document.getElementById(this.el + '')


        let cp = document.createDocumentFragment()
        while (dom.firstChild) {
            cp.appendChild(dom.firstChild)
        }

        console.log('firstChild', dom.firstChild)
        console.log('cp.childNodes', cp.childNodes)

        
        // 解析指令，替换值

        // 重新放入dom中
    }
}