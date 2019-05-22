var mysql = require('mysql');

var TEST_DATABASE = 'springboot';
var TEST_TABLE = 'tbl_user';
//创建连接 
var client = mysql.createConnection({
    user: 'root',
    password: '123456',
});
client.connect();
client.query("use " + TEST_DATABASE);
client.query(
    'SELECT * FROM ' + TEST_TABLE,
    function selectCb(err, results, fields) {
        if (err) {
            throw err;
        }
        if (results) {
            for (var i = 0; i < results.length; i++) {
                console.log("%d\t%s\t%s", results[i].user_id, results[i].user_name, results[i].user_age);
            }
        }
        client.end();
    }
);