import React from 'react';
import { View, Alert, Text, Button, AsyncStorage, TextInput, ScrollView, Keyboard, TouchableWithoutFeedback,Image, ImageBackground, Dimensions,ActivityIndicator,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import styles from '../assets/stylesheets/logout_css';

class Logout extends React.Component {
  static navigationOptions =
        {
            header:null
        };

        _signOutAsync = async () => {
          
          await AsyncStorage.removeItem('session_data');
          this.props.navigation.navigate('Auth');
      };
  render() {
    return (
      <View style={{flex:1}}>
                <ImageBackground source={require('../assets/images/login.jpg')} style={styles.backgroundImage}>
                    <View style={styles.logoImage}>
                        <Image source={require('../assets/images/github.png')} style={styles.logoImagedesign}>
                        </Image>
                    </View>
                    
                    <Text style={styles.WorkOrderTextStyle2}>Github_Check App</Text>
                    <Text style={styles.WorkOrderTextStyle2}>V1.0</Text>                            
                
                    <TouchableOpacity style={styles.SubmitButtonStyle} activeOpacity = { .5 } onPress={ this._signOutAsync }>
                                <Text style={styles.TextStyle}> Logout </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
    );
  }
}

export default Logout;