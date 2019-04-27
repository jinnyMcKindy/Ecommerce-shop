const request = require('request')
const fs = require('fs')
const HTMLParser = require('node-html-parser')
const fileName = './server/items.txt'
const mongo = require('mongodb').MongoClient

const url_phones = 'https://ru.aliexpress.com/category/202001195/mobile-phones.html?site=rus&isrefine=y'
const url_laptop = 'https://ru.aliexpress.com/af/category/202000104.html?site=rus&d=n&catName=laptops&CatId=202000104&origin=n&isViewCP=y&jump=afs'
const url_iphones = 'https://ru.aliexpress.com/af/category/202001195.html?isrefine=y&site=rus&brandValueIds=105790%2C3426%2C200702996&d=n&origin=n&spm=a2g0v.search0603.0.0.30f4411aQMaOBZ&jump=afs&CatId=202001195&catName=mobile-phones&isViewCP=y'
const url_acces = 'https://ru.aliexpress.com/category/202040726/mobile-phone-accessories.html?site=rus&isrefine=y'

let products = new Promise((resolve, revect) => {
	request(url_iphones, (error, response, body) => {
	    if(error) reject('error:', error)
	  	//writeFile(body)  
	  	resolve()
	})
})

function writeFile(body){
	const root = HTMLParser.parse(body)
	const lazyLoad = root.querySelector("#list-items").innerHTML
	const len = root.querySelectorAll("#list-items li").length
	console.log(len)
	/*
	const strEnd = `id="lazy-render">`
	let reg = new RegExp(strEnd)
	let indexStart = body.match(reg).index + strEnd.length;
	let indexEnd = body.substr(indexStart).match(/<\/script>/i).index
	let res = body.substr(indexStart, indexEnd)
	*/
    fs.writeFile(fileName, `${lazyLoad}`, (err) => {
	    if(err) {
	        return console.log(err)
	    }
	    console.log("The file was saved!")
	})
}

function parseProduct(res){
	const root = HTMLParser.parse(res)
	let li = root.querySelectorAll("li")
	const tt = li.map((v) => {
		const price = v.querySelector(".value").innerHTML
		const imageSrc = v.querySelector(".picCore").attributes["image-src"]
		const productLink = v.querySelector(".product").attributes.href
		const title = v.querySelector(".product").attributes.title
		return { price, title, imageSrc, productLink }
	})
	console.log(tt)
	return tt;
}

async function parseFile(){
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, 'utf8',(err, contents) => {
		    if(err) reject(err)
		    if(contents) { 
		    	const tt = parseProduct(contents)
		    //resolve(contents) 

		const url = 'mongodb://localhost:27017'
		exports.connect = {mongo, url};
		mongo.connect(url, (err, client) => {
			  if (err) {
			    console.error(err)
			    return
			  }
			  const db = client.db('ishop')
			  const collection = db.collection('products')
			 /*  collection.insertOne({name: 'Roger'}, (err, result) => {
			  	//console.log(err, result)
			  }) */
			  collection.find().toArray((err, items) => {
				  console.log(items)
			  })
			  client.close()
		});
		    }
    	    /* const lazy = root.querySelector('.lazy-load')
			const el = lazy.querySelectorAll(".history-item.product")
			const title = el.map(val=> val.innerHTML) */
		})
	})
}

exports.parseFile = parseFile;