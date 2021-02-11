import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts } from '../redux/actions'
import { Item } from '../entities/Iposts'

type State = {
  posts: { posts: Array<Item>},
  page: number
}

interface ProductsProps {
  fetchPosts: (page: number) => void,
  posts: { posts: Array<Item> },
  page: number
}

const Products = ({ fetchPosts, posts, page }: ProductsProps) => {

  useEffect(() => {
    fetchPosts(page)
  }, []);

  useEffect(() => {
    console.log(posts.posts)
  }, [posts]);

  const renderRow = ({ item }: { item: Item } ) => {
    return (<View>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <Text>{page}</Text>
    </View>)
  }

  const loadMore = () => {
    fetchPosts(page)
  }

  return (
    <SafeAreaView>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic">
         <View>
            <FlatList 
              keyExtractor={item => item._id.toString()} 
              data={posts.posts} 
              renderItem={renderRow} 
              onEndReached={loadMore}
              />
          </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: State) => {
  return {
    posts: state.posts,
    page: state.page
  };
}
const mapDispatchToProps = {
  fetchPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);