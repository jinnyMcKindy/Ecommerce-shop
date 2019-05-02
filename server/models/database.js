const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const getProducts = new Promise((resolve, reject) => {
		mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
		  if (err) {
		    console.error("error", err)
		    return
		  }
		  const db = client.db('ishop')
		  const collection = db.collection('products')
		  /* collection.insertOne({name: 'Roger'}, (err, result) => {
		  	//console.log(err, result)
		  }) */
		  let items = collection.find().toArray((err, items) => {
			  resolve(items)
		  })
		  client.close()
		})
	})
const saveProducts = new Promise((resolve, reject) => {
	
})

exports.getProducts = getProducts;