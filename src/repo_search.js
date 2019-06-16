import React from 'react';
import {Text, View, TextInput, AsyncStorage } from 'react-native';
import styles from '../assets/stylesheets/repo_search_css';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from './globals';

class RepoSearch extends React.Component {

  constructor(props) {

    super(props);
  

    this.state = {

        reponame: ''
    }
}

componentWillMount(){
}

  reposearch(text){
    this.setState({reponame: text})
  }
  submit=async()=>{

    console.log(this.state.reponame);
    if(this.state.reponame=='')
    {
      this.props.navigation.navigate('ThirdPage',{param:"react-native"});
      
    }else{
      this.props.navigation.navigate('ThirdPage',{param:this.state.reponame});
    }
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Enter Repository Name </Text>
        <Input
        placeholder='facebook/react-native'
        onChangeText = {text=> this.reposearch(text)}/>
        <Button
          title="Search"
          onPress={this.submit}/>
        
      </View>
      
    );
  }
}

export default RepoSearch;