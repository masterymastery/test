const fs = require('fs')
const path = require('path')
const http = require('http')
// const readline = require('readline')
const iconv = require('iconv-lite')
// import iconv from 'iconv-lite'
// 创建一个服务器
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000')
    //这里最好不用*通配符，之前就这报错，写上指定域名例如 http://127.0.0.1:8080
    res.setHeader('Access-Control-Allow-Headers', 'content-type')
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.setHeader('Access-control-Allow-Credentials', 'true')
    //这个地方是最坑了，百度查了好多大佬给的方案都没加这条，报错一直报这个，加上就ok

    //Readline是Node.js里实现标准输入输出的封装好的模块，通过这个模块我们可以以逐行的方式读取数据流。使用require(“readline”)可以引用模块。
    let file = ''
    // if (req.url === '/file') {
    //     var fileStr = fs.readFile('D:\\基础知识点汇总.txt', function (err, data) {
    //         // 这块要根据不同的TXT类型 如果是ANSI就写GBK，如果是utf-8就写utf8
    //         // 这是直接独流的
    //         console.log(iconv.decode(data, 'GBK'))
    //     })
    // }
    //     // req 是一个 http.IncomingMessage 实例，它是可读流。
    //     // res 是一个 http.ServerResponse 实例，它是可写流。

    // console.log(req)
    // const result = iconv.decode(req, 'GBK')
    // console.log(result)

    // let body = ''
    // // 接收数据为 utf8 字符串，
    // // 如果没有设置字符编码，则会接收到 Buffer 对象。
    // // req.setEncoding('utf8')
    // // 如果添加了监听器，则可读流会触发 'data' 事件。
    req.on('data', (chunk) => {
        console.log(chunk)
        const result = iconv.decode(chunk, 'GBK')
        console.log(result)
        //  body += chunk
    })

    // // 'end' 事件表明整个请求体已被接收。
    // req.on('end', () => {
    //     try {
    //         // const data = JSON.parse(body)
    //         // 响应信息给用户。
    //         // file = body
    //         // res.write(typeof body)
    //         // 直接读文件的可以，下面这么写就不可以
    //         console.log(body)
    //         const result = iconv.decode(body, 'GBK')
    //         console.log(result)
    //         res.end()
    //     } catch (er) {
    //         // json 解析失败。
    //         res.statusCode = 400
    //         return res.end(`错误: ${er.message}`)
    //     }
    // })
})

server.listen(3000, () => {
    console.log('server start up 3000')
})

function parseFile(data, separator) {
    // 利用分隔符分割data
    // split 等同于数组的 split
    // const bufArr = split(data, separator).slice(1, -1)

    data.forEach((item) => {
        // 分割 head 与 body
        const [head, body] = split(item, '\r\n\r\n')
        // 可能会存在两行 head，所以用换行符 '\r\n' 分割一下
        // 这里的第一个元素是截取后剩下空 buffer，所以要剔除掉
        const headArr = split(head, '\r\n').slice(1)
        // head 的第一行肯定是 Content-Disposition
        // 通过这个字段肯定能拿到文件名
        // 通过parseHeader解析head
        const headerVal = parseHeader(headArr[0].toString())
        // 如果 head 内存在 filename 字段，则代表是一个文件
        if (headerVal.filename) {
            // 写入文件到磁盘
            fs.writeFile(path.resolve(__dirname, `./public/${headerVal.filename}`), body.slice(0, -2), (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
    })
}
function parseHeader(header) {
    const [name, value] = header.split(': ')
    const valueObj = {}
    value.split('; ').forEach((item) => {
        const [key, val = ''] = item.split('=')
        valueObj[key] = val && JSON.parse(val)
    })

    return valueObj
}

function split(buffer, separator) {
    const res = []
    let offset = 0
    let index = buffer.indexOf(separator, 0)
    while (index != -1) {
        res.push(buffer.slice(offset, index))
        offset = index + separator.length
        index = buffer.indexOf(separator, index + separator.length)
    }

    res.push(buffer.slice(offset))

    return res
}
