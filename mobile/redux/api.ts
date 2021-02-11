import { API_HOST } from '@env'
import axios from 'axios';
import { Item } from '../entities/Iposts'

const posts:Array<Item | null> = []

export async function getPosts(page: number): Promise<T>{
  const url = `${API_HOST}/getProducts`;
  const promise = new Promise((resolve, reject) => {
    console.log('getPosts', posts.length)
    if(!posts.length) {
      axios.get(url).then((response) => {
        posts = response.data;
        const products = posts.splice(0, 10);
        resolve(products)
      }).catch(err => {
        console.warn("Couldn't get products from backend", err)
        resolve([])
      });
    } else {
      resolve(posts.splice(0, 10 * page));
    }
  })
  return await promise;
}