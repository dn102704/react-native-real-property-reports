import React, {Component} from 'react';
import ReactNative from 'react-native';

const { StyleSheet, Text, View } = ReactNative;

/**
 * High Level Container
 */
class App extends Component {

  /**
    * App Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  /**
   * Render a page(screen)
   * @return {jsxresult} result in jsx format
   */
  render() {
    return ( 
      <View>
        <Text>
        Hello
        </Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  iOsStatusBar: {
   marginTop:20 
  }
});

export default App;
