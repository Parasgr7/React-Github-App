import React from 'react';
import {Text, View } from 'react-native';
import styles from '../assets/stylesheets/repo_list_css';

class RepoList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to on your app!</Text>
      </View>
    );
  }
}

export default RepoList;