const jwt = require('jsonwebtoken');//加载包

let hash256 = '这个秘钥哈希算法随便生成一个'
let token = jwt.sign({ user: '小姜', pass: '123' }, hash256, { expiresIn: 100000 });

console.log('token生成：', token);



//客户端请求数据的时候验证token
//客户端传递过来的token
let _token = token;

let code = jwt.verify(_token, hash256, function (err, data) {
    //verify接收两个参数,第一个参数是客户端传递过来的token,第二个参数是加密时的私钥;第三个参数是回调函数
    // console.log(err);//签名通过返回null, 签名不通过返回err(JsonWebTokenError: invalid signature)	
    console.log('解密结果：', data);//	通过返回解密数据,失败返回unfinished
});

console.log('验证结果：' + code)