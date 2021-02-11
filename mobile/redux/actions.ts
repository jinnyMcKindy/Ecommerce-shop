import { getPosts } from "./api";
import { FETCH_POSTS, LOAD_MORE } from "./types";
import { Item } from '../entities/Iposts'

export interface IcreatePost {
  type: String,
  payload: Object
}

export function fetchPosts(page: number){
  return async (dispatch: any) => {
    const posts:Array<Item> = await getPosts(page);
    if(posts.length){
      dispatch({ type: FETCH_POSTS, payload: posts });
      dispatch({ type: LOAD_MORE });
    }
  }
}