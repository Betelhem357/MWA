const MogoClient = require("mongodb").MongoClient;
const dbName = process.env.DATABASENAME;
const dburl = process.env.DATABASEURL + dbName;
var _connection = null;
var open = function () {
    MogoClient.connect(dburl, { useUnifiedTopology: true }, function (err, client) {
        if (err) {
            console.log("Database connection failed");
            return;
        }
        _connection = client.db(dbName);
        console.log("DB connection open", _connection);
    });
};
var get = function () {
    console.log(_connection);
    return _connection;
};
module.exports = {
    open: open,
    get: get
};