'use strict'
////import father1 from './father1'
//import father2 from './father2'
import { father } from './father1'
function mix(...mixins) {
    class Mix {
        constructor() {
            for (let Mixin of mixins) {
                copyProperties(this, new Mixin()) // 拷贝实例属性
            }
        }
    }

    for (let mixin of mixins) {
        copyProperties(Mix, mixin) // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype) // 拷贝原型属性
    }

    return Mix
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
            let desc = Object.getOwnPropertyDescriptor(source, key)
            Object.defineProperty(target, key, desc)
        }
    }
}

/* 继承mix的作用是将所有ht类的属性和方法继承，公共变量dm gv view放在 */
//class HtModel extends mix(father1, father2) {}
//export default HtModel
// function mix(){
//     return 123
// }
