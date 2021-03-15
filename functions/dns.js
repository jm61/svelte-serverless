const dns = require('dns')

exports.handler =  function(event, context, cb) {
    if(event.httpMethod !== 'POST') {
    return {
        headers: {"Content-Type": "text/plain",
        'Access-Control-Allow-Origin': '*'},
        statusCode:405,
        body: 'Only POST request allowed!'
        }
    }
    const {hostname} = JSON.parse(event.body)
    dns.lookup(hostname, 'ANY', (err, records) => {
    cb(err, {
        headers: {"Content-Type": "text/plain",
        'Access-Control-Allow-Origin': '*'},
        statusCode: 200,
      body: JSON.stringify(records),
    })  
})
}