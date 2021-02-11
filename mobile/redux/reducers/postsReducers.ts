import { IcreatePost } from '../../redux/actions';
import { Item } from '../../entities/Iposts'
import products from '../../redux/products.json'

interface initialStateInterface {
  posts: Array<Item>,
  page: number
}
const initialState:initialStateInterface = {
  posts: products.splice(0, 10),
  page: 1

}
export const postsReducer = (state = initialState, action: IcreatePost) => {
  switch(action.type) {
    case 'FETCH_POSTS':
      return {...state, posts: action.payload }
    case 'LOAD_MORE':
      return {...state, page: state.page++ }
  }
  return state;
}