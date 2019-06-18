const HTMLParser = require('node-html-parser');
const dbo = require('./database');
const fs = require('fs');
const fileName = './server/items.txt';
const db = dbo.DataBase;

const getContent = new Promise((resolve, reject) => {
  db.getProducts().then(res => resolve(res), err => reject(err))
})

function parseProduct(res) {
  const root = HTMLParser.parse(res);
  const li = root.querySelectorAll('li');
  const tt = li.map((v) => {
    const price = Number.parseFloat(v.querySelector('.value').innerHTML.replace(/(руб.)*\s*/gi, "").replace(",",".")).toFixed(2);
    const imageSrc = v.querySelector('.picCore').attributes['image-src'];
    const productLink = v.querySelector('.product').attributes.href;
    const { title } = v.querySelector('.product').attributes;
    return {
      price, name: title, imageSrc, productLink,
    };
  });
  return tt;
}
const saveContent = new Promise((resolve, reject) => {
  fs.readFile(fileName, 'utf8', (err, contents) => {
    if (err) reject(err);
    if (contents) {
    	let tt = parseProduct(contents)
    	db.saveProducts(tt).then(res => resolve(res), err => reject(err))
    } else { reject('No content'); }
  })
})

exports.getContent = getContent;
exports.saveContent = saveContent;