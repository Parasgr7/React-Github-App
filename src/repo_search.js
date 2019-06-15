import React from 'react';
import {Text, View } from 'react-native';
import styles from '../assets/stylesheets/repo_search_css';

class RepoSearch extends React.Component {
  render() {
    const item = this.props.navigation.state.params;
        // this.setState({name: name});
        console.log(item);
    return (
      <View style={styles.container}>
        <Text>Open up App.js </Text>
      </View>
    );
  }
}

export default RepoSearch;