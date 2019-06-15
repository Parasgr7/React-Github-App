import React from 'react';
import {Text, View, AsyncStorage,ScrollView, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheets/repo_list_css';
import GLOBALS from '../src/globals';


class RepoList extends React.Component {
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
            data:[{name:'Test',description:'Good test',created_at: "2018-05-02T20:03:03Z"}]
        }
    }
 
    componentWillMount(){
      this.fetchRepos();
  }

commits(item)
{
    this.props.navigation.navigate('ThirdPage',{param:item});
}


display_list(list)
    {   const that=this;
        return list.map(function(item, i){
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
                
                      <View style={{flexDirection: 'row', flex:1, justifyContent: 'flex-end'}}>
                      <TouchableOpacity style={styles.Check_inButtonStyle} onPress={()=>that.commits(item)  } >
                          <Text style={styles.TextStyle4}>Check Commits</Text>
                      </TouchableOpacity>
                      </View> 
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