import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
} from 'react-native';

interface Iitems {
  id: Number, 
  price: String,
  title: String,
  imageSrc: String,
  productLink: String
}

const Products = () => {
  const [items, setItems] = useState<Iitems[]>([
    {
      id: 1, 
      price: '123', 
      title: 'Iphone 3', 
      imageSrc: 'https://i.pinimg.com/564x/5d/f8/ec/5df8ecaf2192fdd973b764ffad618ddf.jpg',
      productLink: 'https://br.pinterest.com/pin/861594972454381826/'
    },
    {
      id: 2, 
      price: '1000 руб', 
      title: 'Iphone 5S', 
      imageSrc: 'https://i.pinimg.com/564x/5d/f8/ec/5df8ecaf2192fdd973b764ffad618ddf.jpg',
      productLink: 'https://br.pinterest.com/pin/861594972454381826/'
    }
  ])
  return (
    <SafeAreaView>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic">
         <View>
            <FlatList data={items} renderItem={({ item }) => (
              <View>
                <Text>{item.title}</Text>
                <Text>{item.price}</Text>
              </View>
            )}/>
          </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default Products;