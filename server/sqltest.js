var Connection = require('tedious').Connection
var Request = require('tedious').Request

var config = {
    server: 'rmt-db-server.database.windows.net',
    options: {
        database: 'referee-management-tool',
        trustServerCertificate: true
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'arbitridevolei',
            password: 'Admin2020'
        }
    },

}

var connection = new Connection(config)

connection.on('connect', function (err) {
    if (err) {
        console.log(err)
    } else {
        executeStatement()
    }
})

query = "select * from lots"
function executeStatement() {
    request = new Request(query, function (err, rowCount) {
        if (err) {
            console.log(err)
        } else {
            console.log(rowCount + ' rows')
        }
        connection.close()
    })

    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL')
            } else {
                console.log(column.value)
            }
        })
    })

    connection.execSql(request)
}

connection.connect()