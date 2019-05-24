const request = require('request');

const url_phones = 'https://ru.aliexpress.com/category/202001195/mobile-phones.html?site=rus&isrefine=y';
const url_laptop = 'https://ru.aliexpress.com/af/category/202000104.html?site=rus&d=n&catName=laptops&CatId=202000104&origin=n&isViewCP=y&jump=afs';
const url_iphones = 'https://ru.aliexpress.com/af/category/202001195.html?isrefine=y&site=rus&brandValueIds=105790%2C3426%2C200702996&d=n&origin=n&spm=a2g0v.search0603.0.0.30f4411aQMaOBZ&jump=afs&CatId=202001195&catName=mobile-phones&isViewCP=y';
const url_acces = 'https://ru.aliexpress.com/category/202040726/mobile-phone-accessories.html?site=rus&isrefine=y';


const promise = new Promise((resolve, revect) => {
  request(url_iphones, (error, response, body) => {
	    if (error) reject('error:', error);
	    resolve({ body });
  });
});

exports.promise = promise;
