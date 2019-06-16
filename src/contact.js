import React from 'react';
import { View, Alert, Text, Button, AsyncStorage, TextInput, ScrollView, Keyboard, TouchableWithoutFeedback,Image, ImageBackground, Dimensions,ActivityIndicator,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import styles from '../assets/stylesheets/logout_css';
import call from 'react-native-phone-call';

class Contact extends React.Component {
  static navigationOptions = {
    title: 'Developer'
}

constructor(props) {

  super(props);
  const commit = this.props.navigation.getParam('param');
  
  this.state = {

      commit : commit,
      refreshing: false,
  }
}

componentWillMount(){
}
  call= async ()=>{

    const args = {
        number: '+91-8510962131', 
        prompt: false 
      }
       
      call(args).catch(console.error)
}

  render() {
    return (
      <View style={{flex:1}}>
                <ImageBackground source={require('../assets/images/login.jpg')} style={styles.backgroundImage}>
                    <View style={styles.logoImage}>
                        <Image source={require('../assets/images/Paras.png')} style={styles.logoImagedesign}>
                        </Image>
                    </View>
                    <Text style={styles.WorkOrderTextStyle1}>Software Engineer</Text>
                    <Text style={styles.WorkOrderTextStyle3}>Developer's Profile</Text>
                    <View style={{margin:10}}>
                    <Text style={{margin:5,marginTop:10}}>
                        <Text style={styles.WorkOrderTextStyle}> Name : </Text>
                        <Text style={styles.WorkOrderTextStyle2}>Paras Gaur</Text>
                    </Text>
                    <Text style={{margin:5}}>
                        <Text style={styles.WorkOrderTextStyle}>Email : </Text>
                        <Text style={styles.WorkOrderTextStyle2}>parasgr484@gmail.com</Text>
                    </Text>
                    <Text style={{margin:5}}>
                        <Text style={styles.WorkOrderTextStyle}>Location : </Text>
                        <Text style={styles.WorkOrderTextStyle2}>New Delhi</Text>
                    </Text>
                    <View >
                        <TouchableOpacity style={styles.SubmitButtonStyle} activeOpacity = { .5 } onPress={this.call}>
                            <View>
                            <Text style={styles.TextStyle}>Call</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
   
                    </View>
                    
                </ImageBackground>
            </View>
    );
  }
}

export default Contact;