const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = process.env.DATABASE_URL
const dbName = 'store'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
    useUnifiedTopology: true,
    sslValidate: true,
    sslCA: process.env.CA_CERT
})

const insertItem = (item) => {
  const collection = db.collection('items')
  return collection.insertOne(item)
}

const getItems = () => {
  const collection = db.collection('items')
  return collection.find({}).toArray()
}

const updateQuantity = (id, quantity) => {
  const collection = db.collection('items')
  return collection.updateOne({ _id: ObjectId(id) }, { $inc: { quantity } })
}

module.exports = { init, insertItem, getItems, updateQuantity }
