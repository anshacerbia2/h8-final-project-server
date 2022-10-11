const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
let db = undefined
const uri =
    // "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";
    "mongodb+srv://finalproject:jVHdi00ItetXryH6@cluster0.ko7cjj1.mongodb.net/test"
const client = new MongoClient(uri);
async function run() {
    try {
        db = client.db('chat');
        return db
    } catch (err) {
        console.log(err)
        await client.close();
    }
}
function getDb() {
    return db
}
// const movies = database.collection('movies');

module.exports = { run, getDb }