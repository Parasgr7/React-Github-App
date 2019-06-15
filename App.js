import React from 'react';
import {Text, View, Image } from 'react-native';
import styles from './assets/stylesheets/app_css';
import { createBottomTabNavigator,createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import RepoSearch from './src/repo_search';
import RepoList from './src/repo_list';
import Contact from './src/contact';
import Logout from './src/logout';
import AllCommit from './src/commits';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Entypo } from '@expo/vector-icons';

class GitHub extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}


const Tabs = createBottomTabNavigator({
  RepoSearch:   {
      screen: RepoSearch,
      navigationOptions: () => ({

          tabBarIcon: ({tintColor}) => (
              <Octicons name="tasklist" size={24} color={tintColor}/>
          )
          
      })},
  List:   {
      screen: RepoList,
      navigationOptions: () => ({
         
          tabBarIcon: ({tintColor}) => (
              <AntDesign name="calendar" size={24} color={tintColor}/>
          )
          
      })},
  Commits:  {
      screen: AllCommit,
      navigationOptions: () => ({
          tabBarIcon: ({tintColor}) => (
              <MaterialCommunityIcons name="map-marker-radius" size={24} color={tintColor}/>
          )
          
      })},
  Contact:  {
      screen: Contact,
      navigationOptions: () => ({
          tabBarIcon: ({tintColor}) => (
              <Ionicons name="ios-call" size={24} color={tintColor}/>
          )   
      })
  },
  User:  {
      screen: Logout,
      navigationOptions: () => ({
          tabBarIcon: ({tintColor}) => (
              <Entypo name="user" size={24} color={tintColor}/>
          )
          
      })
  } 
},{
  tabBarOptions: {
      showLabel: false,
      activeTintColor: '#45AAC5',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#006075',
      },
    }
  }
)

const AppStack = createStackNavigator({ 
              SecondPage: Tabs, 
              ThirdPage: AllCommit, 
              navigationOptions: () => ({
                      
              }),
              LastPage: {
                     screen: Logout,
              } },{
                  navigationOptions: {
                    headerStyle: {
                      backgroundColor: '#007085',
                  },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    headerBackground: (
                      <Image
                        style={{width: 150,height: 100, flex:1,alignSelf: 'center', marginTop:5, marginLeft:8}}
                        // source= {require('./assets/Images/logout.png')}
                      />
                    ),
                  },
                }
              

);
const AuthStack = createStackNavigator({ First: GitHub });

const AppNavigator = createSwitchNavigator({
    App: AppStack,
    Auth: AuthStack,

},
{
  initialRouteName: 'Auth',
});

export default GitHub = createAppContainer(AppNavigator);
