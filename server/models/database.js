const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
exports.connect = {mongo, url};
mongo.connect(url, (err, client) => {
		  if (err) {
		    console.error(err)
		    return
		  }
		  const db = client.db('test')
		  const collection = db.collection('products')
		  collection.insertOne({name: 'Roger'}, (err, result) => {
		  	console.log(err, result)
		  })
		  client.close()
});