import React from 'react';
import {Text, View, AsyncStorage,ScrollView } from 'react-native';
import styles from '../assets/stylesheets/repo_list_css';
import GLOBALS from '../src/globals';


class RepoList extends React.Component {
  static navigationOptions =
        {
            header:null
        };
       

    constructor(props) {

        super(props);
        const item = this.props.username;
        console.log(item);

        this.state = {

            UserName: '',
            UserPassword: '',
            isLoading: false,
            data:[{name:'Test',description:'Good test',created_at: "2018-05-02T20:03:03Z"}]
        }
    }
 
    componentWillMount(){
     
      this.fetchRepos();
  }


//   _getToken = async () => {
//     try {
//     const auth_token = await AsyncStorage.getItem('session_data').then(user => {
//       console.log('user: ', user)
//       this.setState({name: auth_token[0].username});
//     });

//     console.log("Get Token function",auth_token);
//     this.setState({name: auth_token[0].username})
//     } catch (error) {
//         console.log("Something went wrong while getting token");
//     } 
// }

display_list(list)
    {   const that=this;
        return list.map(function(item, i){
          console.log(item)
            return(
                  <View style={styles.SubmitButtonStyle1} key={i} >
                      <View >
                          <Text style={styles.TextStyleHead}>{item.name}</Text>
                      </View>
                      <Text style={{marginLeft:10,marginBottom:5}} >
                          <Text style={styles.TextStyle2Bold}>Description : </Text>
                          <Text style={styles.TextStyle2}>{item.description}</Text>
                      </Text>
                      <Text style={{marginLeft:10,marginBottom:5}} >
                          <Text style={styles.TextStyle2Bold}>Created At : </Text>
                          <Text style={styles.TextStyle2}>{item.created_at.split('T')[0]}</Text>
                      </Text>
                      {/* <Text style={{marginLeft:10,marginBottom:5}} >
                          <Text style={styles.TextStyle2Bold}>City : </Text>
                          <Text style={styles.TextStyle2}>{item.house.full_address.split(',')[1]}</Text>
                      </Text>
                      <Text style={{marginLeft:10,marginBottom:5}} >
                          <Text style={styles.TextStyle2Bold}>Due Date : </Text>
                          <Text style={styles.TextStyle2}>{item.due}</Text>
                      </Text>

                        {that.note_display(item)}
                      <View style={{paddingRight:10}}>
                          <Text style={styles.TextStyle3}>{item.status}</Text>
                      </View>
                      <View style={{flexDirection: 'row', flex:1, justifyContent: 'flex-end'}}>
                      <TouchableOpacity style={styles.Check_inButtonStyle} onPress={()=>that.WorkOrderFunction(item)  } >
                          <Text style={styles.TextStyle4}>Check-In</Text>
                      </TouchableOpacity>
                      </View> */}
                  </View>  
            );
          });
    }

  fetchRepos = async ()=>{
    const auth_token = await AsyncStorage.getItem('session_data');
    this.setState({name: JSON.parse(auth_token)[0].username});
    fetch(GLOBALS.FETCH_URL+this.state.name+"/repos", {
        method: 'GET',
        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                if(responseJson)
                {    
                   this.setState({data: responseJson});
                }
                else{
                    Alert.alert("No Repo exists");
                }

            }).catch((error) => {
            console.log(error);
            Alert.alert("Server Unavailable");
            this.setState({isLoading: false});

        });
  }

  render() {
    return (
      <View style={styles.container}>
          
           <ScrollView >
           <Text style={styles.TextStyle1}> All Repositories:</Text>
            {this.display_list(this.state.data)}
           </ScrollView>
        
              
      </View>
    );
  }
}

export default RepoList;