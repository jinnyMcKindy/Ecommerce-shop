const mongo = require('mongodb').MongoClient;

const url = 'mongodb://localhost:12345';

const getProducts = new Promise((resolve, reject) => {
  mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
		  if (err) {
		    console.error('error', err);
		    return;
		  }
		  const db = client.db('ishop');
		  const collection = db.collection('products');
		  collection.find().toArray((err, items) => {
		  	  client.close();
		  	  //console.log(items, err)
		  	  resolve(items);
		  });
		  //if(!items) reject("error db, no items")
		  
  });
});
const saveProducts = (contents) => {
	return new Promise((resolve, reject) => {
	  mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
			  if (err) {
			    console.error('error', err);
			    return;
			  }
			  const db = client.db('ishop');
			  const collection = db.collection('products');
			  	collection.deleteMany({ })
			    collection.insertMany(contents, (err, result) => {
			   	client.close();
			  	if(err) reject(err)
			  	resolve(result)
			  }) 
			 
	  });
	});
}
exports.getProducts = getProducts;
exports.saveProducts = saveProducts;
