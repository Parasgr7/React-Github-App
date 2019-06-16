import React from 'react';
import { View, Alert, Text, Button, AsyncStorage, TextInput,StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback,Image, ImageBackground, Dimensions,ActivityIndicator,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Form, Item, Input} from 'native-base';
import styles from './assets/stylesheets/app_css';
import { createBottomTabNavigator,createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import RepoSearch from './src/repo_search';
import RepoList from './src/repo_list';
import Contact from './src/contact';
import Logout from './src/logout';
import AllCommit from './src/commits';
import GLOBALS from './src/globals';
import { Ionicons,FontAwesome,MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Entypo } from '@expo/vector-icons';

let height= Dimensions.get('window').height;
let width= Dimensions.get('window').width;
const base64 = require('base-64');

class GitHub extends React.Component {
  static navigationOptions =
        {
            header:null
        };
       
       
    constructor(props) {

        super(props);
    
        this.state = {

            UserName: '',
            UserPassword: '',
            isLoading: false,
        }
    }

    componentWillMount(){

      this._getToken();
  }

    _storeToken = async responseJson => {
      try{
          userdata={  "auth_id": responseJson.id,
                      "pass": this.state.UserPassword,
                      "username": responseJson.login,
                      "url": responseJson.avatar_url,
                      "location": responseJson.location,
                      "bio": responseJson.bio,
                      "email": responseJson.email,
                      "created_at": responseJson.created_at,
                      "public_repos": responseJson.public_repos,
                      "followers": responseJson.followers,
                      "following": responseJson.following

                    };
          item=[];
          item.push(userdata);
      await AsyncStorage.setItem('session_data',JSON.stringify(item))
      }
      catch(error){
          console.log("Something went wrong while storing the token");
      }
      
  }


  _getToken = async () => {
      try {
      const auth_token = await AsyncStorage.getItem('session_data');
      console.log("Get Token function from APP.js",auth_token);
      this.setState({ id: JSON.parse(auth_token)[0].auth_id,
                      name:JSON.parse(auth_token)[0].username,
                    });
      console.log(this.state.name);
      this.props.navigation.navigate(auth_token? 'App':'Auth');
      } catch (error) {
          console.log("Something went wrong while getting token");
      }
  }

    UserLoginFunction = () =>{
      this.setState({isLoading: true});
      UserName   = this.state.UserName ;
      UserPassword  = this.state.UserPassword ;

      var headers = new Headers();
      headers.append("Authorization", "Basic " + base64.encode(UserName+":"+UserPassword));

      fetch(GLOBALS.AUTH_URL, {
          method: 'GET',
          headers: headers,
          }).then((response) => response.json())
              .then((responseJson) => {
                  console.log(responseJson);
                  if(responseJson.login===UserName)
                  {   
                      this._storeToken(responseJson);
                      this.setState({isLoading: false});
                      this.props.navigation.navigate('App');
                  
                  }
                  else{
                      Alert.alert("Provide Proper Credentials");
                      this.setState({isLoading: false});
                  }

              }).catch((error) => {
              console.log(error);
              Alert.alert("Server Unavailable");
              this.setState({isLoading: false});

          });
    
  }

    _maybeRenderUploadingOverlay = () => {
      if (this.state.isLoading) {
        console.log('here');
          return (
              <View
                  style={ styles.maybeRenderUploading}>
                  <ActivityIndicator size="small" color="black"/>
              </View>
          );
      }
    };

  render() {
    return (
      <View style={{flex:1}}>
                <ImageBackground source={require('./assets/images/login.jpg')} style={styles.backgroundImage}>
                    <View style={styles.logoImage}>
                        <Image source={require('./assets/images/github.png')} style={styles.logoImagedesign}>
                        </Image>
                    </View>
                    <KeyboardAvoidingView style={styles.inputStyle} behavior="padding" enabled keyboardShouldPersistTaps="handled">
                    <Form>
                
                            <Item style={[{marginLeft: 0}]}>
                                <TextInput onSubmitEditing={Keyboard.dismiss} style={[{fontSize: 18, flex: 1}]}
                                    autoCorrect={false}
                                    placeholder="Username"
                                    // textContentType="Username"
                                    placeholderTextColor="white"
                                    onChangeText={UserName => this.setState({UserName})}
                                />
                            </Item>
                
                            <Text>{"\n"}</Text>
                            <Item style={[{marginLeft: 0}]}>
                                <TextInput onSubmitEditing={Keyboard.dismiss} style={[{fontSize: 18, flex: 1}]}
                                    autoCorrect={false}
                                    placeholder="Password"
                                    placeholderTextColor="white"
                                    secureTextEntry={true}
                                    onChangeText={UserPassword => this.setState({UserPassword})}
                                />
                            </Item>
                            <Text>{"\n"}</Text>
                    </Form>
                         
                            <TouchableOpacity style={styles.SubmitButtonStyle} activeOpacity = { .5 } onPress={ this.UserLoginFunction }>
                            {this._maybeRenderUploadingOverlay()}
                                <Text style={styles.TextStyle}> Sign In </Text>
                            </TouchableOpacity>
  

                    </KeyboardAvoidingView>


                    
                </ImageBackground>
            </View>
    );
  }
}


const Tabs = createBottomTabNavigator({
  RepoSearch:   {
      screen: RepoSearch,
      navigationOptions: () => ({

          tabBarIcon: ({tintColor}) => (
              <FontAwesome name="search" size={20} color={tintColor}/>
          )
          
      })},
  List:   {
      screen: RepoList,
      navigationOptions: () => ({
         
          tabBarIcon: ({tintColor}) => (
              <Entypo name="list" size={24} color={tintColor}/>
          )
          
      })},

  User:  {
      screen: Logout,
      navigationOptions: () => ({
    
          tabBarIcon: ({tintColor}) => (
              <Entypo name="user" size={24} color={tintColor}/>
          )
          
      })
  },
  
  Contact:  {
    screen: Contact,
    navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <MaterialIcons name="developer-mode" size={24} color={tintColor}/>
        )   
    })
}, 
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
              ThirdPage: {
                screen: AllCommit,
              },

              LastPage: {
                     screen: Logout,
                     
              } },{
                defaultNavigationOptions: {
       
                    
                    headerStyle: {
                      backgroundColor: '#007085',
                  },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    title: 'AdaKerja',
       
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
