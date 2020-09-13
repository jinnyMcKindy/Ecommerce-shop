const HTMLParser = require('node-html-parser');
const fs = require('fs');
const fileName = './items.txt';
const ProductModel = require('./models/entities/Products')

const getContent = new Promise((resolve, reject) => {
  ProductModel.find().then(res => resolve(res), err => { console.log(err); reject(err)})
})

function parseProduct(res) {
  const root = HTMLParser.parse(res);
  const li = root.querySelectorAll('li');
  const tt = li.map((v) => {
    const price = v.querySelector('.value') ? Number.parseFloat(v.querySelector('.value').innerHTML.replace(/(руб.)*\s*/gi, "").replace(",",".")).toFixed(2) : 0;
    const imageSrc = v.querySelector('.picCore') ? v.querySelector('.picCore').attributes['image-src'] : '';
    const productLink = v.querySelector('.product') ? v.querySelector('.product').attributes.href : '';
    const { title } = v.querySelector('.product') ? v.querySelector('.product').attributes : '';
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
      ProductModel.insertMany(tt)
         .then(res => {
           resolve(res)
         })
         .catch(err => {
          reject(err)
      })
      
    } else { reject('No content'); }
  })
})

exports.getContent = getContent;
exports.saveContent = saveContent;