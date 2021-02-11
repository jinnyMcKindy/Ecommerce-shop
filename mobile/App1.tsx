/**
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import { Provider } from 'react-redux';  
import thunk from 'redux-thunk';

import { rootReducer } from './redux/reducers/rootReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Products  from './components/Products';
import Foo  from './components/Foo';
import { ToastContextProvider }  from './components/ToastContext';
import { SagaWatcher } from './redux/sagas';

const saga = createSagaMiddleware();
const store = createStore(rootReducer, compose(applyMiddleware(thunk, saga)));

saga.run(SagaWatcher);

const App = () => {
  return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <ToastContextProvider>
              <Foo />
            </ToastContextProvider>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};
/* <Products /> */
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
