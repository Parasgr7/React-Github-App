import React from 'react';
import { View, Alert, Text, Button, AsyncStorage, TextInput, ScrollView, Keyboard, TouchableWithoutFeedback,Image, ImageBackground, Dimensions,ActivityIndicator,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import styles from '../assets/stylesheets/logout_css';
import GLOBALS from '../src/globals';

class Logout extends React.Component {
  
         
    constructor(props) {

      super(props);
      this.state = {

          UserName: '',
          UserPassword: '',
          isLoading: false,
          created_at:  "2018-07-22T17:25:26Z",
          // url:'https://avatars3.githubusercontent.com/u/30603340?v=4',
          data:[{name:'Test',description:'Good test',created_at: "2018-05-02T20:03:03Z"}]
      }
  }

  componentWillMount(){
    this._getToken();
}

_getToken = async () => {
  const auth_token = await AsyncStorage.getItem('session_data');
  this.setState({ id: JSON.parse(auth_token)[0].auth_id,
                  name:JSON.parse(auth_token)[0].username,
                  url: JSON.parse(auth_token)[0].url,
                  location: JSON.parse(auth_token)[0].location,
                  bio: JSON.parse(auth_token)[0].bio,
                  email: JSON.parse(auth_token)[0].email,
                  created_at: JSON.parse(auth_token)[0].created_at,
                  public_repos: JSON.parse(auth_token)[0].public_repos,
                  followers: JSON.parse(auth_token)[0].followers,
                  following: JSON.parse(auth_token)[0].following

                });
  
}
_signOutAsync = async () => {
    
    await AsyncStorage.removeItem('session_data');
    this.props.navigation.navigate('Auth');
};

  render() {
    return (
      <View style={{flex:1}}>
                <ImageBackground source={require('../assets/images/login.jpg')} style={styles.backgroundImage}>
                    <View style={styles.logoImage}>
                        <Image source={{uri: this.state.url}} style={styles.logoImagedesign}>
                        </Image>
                    </View>
                    <Text style={{margin:5,marginTop:10}}>
                        <Text style={styles.WorkOrderTextStyle}>UserName : </Text>
                        <Text style={styles.WorkOrderTextStyle2}>{this.state.name}</Text>
                    </Text>
                    <Text style={{margin:5}}>
                        <Text style={styles.WorkOrderTextStyle}>Email : </Text>
                        <Text style={styles.WorkOrderTextStyle2}>{this.state.email?this.state.email:"N/A"}</Text>
                    </Text>
                    <Text style={{margin:5}}>
                        <Text style={styles.WorkOrderTextStyle}>Location : </Text>
                        <Text style={styles.WorkOrderTextStyle2}>{this.state.location?this.state.location:"N/A"}</Text>
                    </Text>
                    <Text style={{margin:5}}>
                        <Text style={styles.WorkOrderTextStyle}>Bio : </Text>
                        <Text style={styles.WorkOrderTextStyle2}>{this.state.bio?this.state.bio:"N/A"}</Text>
                    </Text>
                    <Text style={{margin:5}}>
                        <Text style={styles.WorkOrderTextStyle}>Public Repositories : </Text>
                        <Text style={styles.WorkOrderTextStyle2}>{this.state.public_repos?this.state.public_repos:"N/A"}</Text>
                    </Text>
                    <Text style={{margin:5}}>
                        <Text style={styles.WorkOrderTextStyle}>Followers : </Text>
                        <Text style={styles.WorkOrderTextStyle2}>{this.state.followers?this.state.followers:"N/A"}</Text>
                    </Text>
                        
                
                    <TouchableOpacity style={styles.SubmitButtonStyle2} activeOpacity = { .5 } onPress={ this._signOutAsync }>
                                <Text style={styles.TextStyle}> Logout </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
    );
  }
}

export default Logout;