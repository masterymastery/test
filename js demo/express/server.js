// ---- 基本設定 ----
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// ---- ROUTES ----

// 舊方法
app.get('/sample', function (req, res) {
    res.send('this is a sample!');
});

// ---- 啟動伺服器 ----
app.listen(port);
console.log();