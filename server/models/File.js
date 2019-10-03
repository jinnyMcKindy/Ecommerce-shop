const request = require('request');
const fs = require('fs');
const HTMLParser = require('node-html-parser');

const fileName = './items.txt';
const db = require('./database');

const url_phones = 'https://ru.aliexpress.com/category/202001195/mobile-phones.html?site=rus&isrefine=y';
const url_laptop = 'https://ru.aliexpress.com/af/category/202000104.html?site=rus&d=n&catName=laptops&CatId=202000104&origin=n&isViewCP=y&jump=afs';
const url_iphones = 'https://ru.aliexpress.com/af/category/202001195.html?isrefine=y&site=rus&brandValueIds=105790%2C3426%2C200702996&d=n&origin=n&spm=a2g0v.search0603.0.0.30f4411aQMaOBZ&jump=afs&CatId=202001195&catName=mobile-phones&isViewCP=y';
const url_acces = 'https://ru.aliexpress.com/category/202040726/mobile-phone-accessories.html?site=rus&isrefine=y';

const saveFile = new Promise((resolve) => {
  request(url_iphones, (error, response, body) => {
	    if (error) reject('error:', error);
	  	writeFile(body)
	  	resolve(body);
  });
});

function writeFile(body) {
  const root = HTMLParser.parse(body);
  //const lazyLoad = root.querySelector('#list-items').innerHTML;
  const len = root.querySelectorAll('#list-items li').length;
  console.log(len);
  const tt = parseProduct(lazyLoad);
  fs.writeFile(fileName, `${tt}`, (err) => {
	    if (err) {
	        console.log(err)
	    }
	    console.log('The file was saved!');
  });
}

function parseProduct(res) {
  const root = HTMLParser.parse(res);
  const li = root.querySelectorAll('li');
  const tt = li.map((v) => {
    const price = v.querySelector('.value').innerHTML;
    const imageSrc = v.querySelector('.picCore').attributes['image-src'];
    const productLink = v.querySelector('.product').attributes.href;
    const { title } = v.querySelector('.product').attributes;
    return {
      price, title, imageSrc, productLink,
    };
  });
  return tt;
}

exports.saveFile = saveFile;