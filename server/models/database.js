const mongo = require('mongodb').MongoClient;
const Binary = require('mongodb').Binary;
const url = 'mongodb://localhost:12345';
const ObjectID = require('mongodb').ObjectID;
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
		  	resolve(items);
		  });
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
const saveOrder = (order) => {
	return new Promise((resolve, reject) => {
	  	mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
		    if (err) {
			    console.error('error', err);
			    return;
		    }
		    const db = client.db('ishop');
		    const collection = db.collection('orders');
		    //collection.deleteMany({ })
		    collection.insertOne(order, (err, result) => {
			  client.close()
			  if(err) reject(err)
			  resolve(result)
		    });
	  	});
	});
}
const getOrders = new Promise((resolve, reject) => {
  	mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
	    if (err) {
		    console.error('error', err);
		    return;
	    }
	    const db = client.db('ishop');
	    const collection = db.collection('orders');
	    collection.find().toArray((err, items) => {
	  	  client.close();
	  	  if(err) reject(err)
	  	  resolve(items);
	  	});
  	});
});
const getUsers = new Promise((resolve, reject) => {
  	mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
	    if (err) {
		    console.error('error', err);
		    return;
	    }
	    const db = client.db('ishop');
	    const collection = db.collection('users');
	    collection.find().toArray((err, items) => {
	  	  client.close();
	  	  if(err) reject(err)
	  	  resolve(items);
	  	});
  	});
});
const saveUser = (user) => {
		return new Promise((resolve, reject) => {
	  	mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
		    if (err) {
			    console.error('error', err);
			    return;
		    }
		    const db = client.db('ishop');
		    const collection = db.collection('users');
	      	collection.insertOne(user, (err, result) => {
			  client.close()
			  if(err) reject(err)
			  resolve(result)
		    });
	  	});
	});
}
const setStatus = ({ id, status }) => {
	console.log(id, status)
  return new Promise((resolve, reject) => {
	  	mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
		    if (err) {
			    console.error('error', err); 
			    return;
		    }
		    const db = client.db('ishop');
		    const collection = db.collection('orders');
		    const uuid = new ObjectID(id);
	      	collection.updateOne({ _id: uuid }, { $set: { status: status } }, (err, items) => {
		  	  client.close();
		  	  if(err) reject(err)
		  	  resolve("resolved");
		  	});
	  	});
	});
}
exports.getProducts = getProducts;
exports.saveProducts = saveProducts;
exports.saveOrder = saveOrder;
exports.getOrders = getOrders;
exports.getUsers = getUsers;
exports.saveUser = saveUser;
exports.setStatus = setStatus;