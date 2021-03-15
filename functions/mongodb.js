require('dotenv').config()
const mongo_url = process.env.MONGO_URL
const MongoClient = require('mongodb').MongoClient
let cacheDb = null

const connect = async (uri) => {
    if (cacheDb) return cacheDb
    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true,
    })
    cacheDb = client.db('App2')
    return cacheDb
}

const queryDb = async (db) => {
    const users = await db.collection('users').find({}).toArray()
    return {
        statusCode:200,
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
    }
}

module.exports.handler = async  (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const db = await connect(mongo_url);
    return queryDb(db);
}