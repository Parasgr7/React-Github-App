import {StyleSheet,Dimensions} from "react-native";
let height= Dimensions.get('window').height;
let width= Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    MainContainer :{

      justifyContent: 'center',
      flex:1,
      margin: 10,
  },

  TextInputStyleClass: {

      textAlign: 'center',
      marginBottom: 7,
      height: 40,
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 5 ,

  },
  maybeRenderUploading: {
      position: 'absolute',
      left: 0,
      right: 20,
      top: 0,
      bottom: 0,
      alignItems: 'flex-end',
      justifyContent: 'center'
  },
  TextComponentStyle: {
      fontSize: 20,
      color: "#000",
      textAlign: 'center',
      marginBottom: 15
  },

  backgroundImage: {
      flex: 1,
      width: width,
      height: height
  },
  logoImage: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  logoImagedesign: {
      marginTop: 80,
      width: 150,
      height:150,
      resizeMode: 'contain'
  },
  inputStyle: {
      flex: 0.7,
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 15
  },
  error: {
      color: 'red',
      paddingTop: 10
  },
  SubmitButtonStyle: {
      marginTop:30,
      paddingTop:15,
      paddingBottom:15,
      marginLeft:30,
      marginRight:30,
      backgroundColor:'#00BCD4',
      borderRadius:10,
  },

  TextStyle:{
      color:'#fff',
      textAlign:'center',
      fontSize:20
  },

  Select:{
      marginLeft:15,
      paddingTop:10,
      width:170
  }

  });