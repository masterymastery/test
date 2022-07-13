// var i=0;

// function timedCount()
// {
//     i=i+1;
//     postMessage(i);
//     setTimeout("timedCount()",100);
// }
// debugger
// timedCount();
for (var i = 0; i < 10000; i++) {
    // postMessage('子线程的进度: ' + i);
    // console.log(i)
    // debugger
    console.log('子线程')
}
addEventListener('message', function (e) {
    // postMessage('子线程接收到: ' + e.data);
    // console.log('子线程接收到: ' + e.data)
    for (var i = 0; i < 10000; i++) {
        // postMessage('子线程的进度: ' + i);
        // console.log(i)
        e.data.push('子线程' + i)
    }
    // debugger
    postMessage(e.data);
}, false);



