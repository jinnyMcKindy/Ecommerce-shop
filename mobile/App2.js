/**
 * @format
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <Image source="cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <View onMouseMove={this.handleMouseMove}>
        {}
        {this.props.render(this.state)}
      </View>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <View>
        <Text>Move the mouse around!</Text>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </View>
    );
  }
}

const App = () => {
  return (
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
          <MouseTracker />
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
