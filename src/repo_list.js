import React from 'react';
import {Text, View, AsyncStorage,ScrollView, TouchableOpacity, Alert,RefreshControl } from 'react-native';
import styles from '../assets/stylesheets/repo_list_css';
import GLOBALS from '../src/globals';

const base64 = require('base-64');

class RepoList extends React.Component {

       
    constructor(props) {

        super(props);
      

        this.state = {

            UserName: '',
            UserPassword: '',
            refreshing: false,
            data:[{name:'Test',description:'Good test',created_at: "2018-05-02T20:03:03Z",language:''}]
        }
    }
 
    componentWillMount(){
      this.fetchRepos();
  }

commits(reponame)
{
    this.props.navigation.navigate('ThirdPage',{param:reponame});
}

_onRefresh = () => {
    this.setState({refreshing: true});
    console.log('Yes m loding');
    this.fetchRepos();
    console.log(this.state.refreshing);
    
  }

deleteApi(reponame){

    UserName   = this.state.name ;
    UserPassword  = this.state.password ;
    var headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(UserName+":"+UserPassword));
    
    console.log("Password",GLOBALS.FETCH_COMMITS+UserName+"/"+reponame);

    fetch(GLOBALS.FETCH_COMMITS+UserName+"/"+reponame, {
        method: 'DELETE',
        headers: headers,
        }).then((response) => response)
            .then((responseJson) => {
                if(responseJson.ok==true)
                {   
                    
                    console.log("Done");
                
                }
                else{
                    Alert.alert("Error while deleting");
                }

            }).catch((error) => {
            console.log(error);
            Alert.alert("Server Unavailable");

        });
    
}

deleteRepo=(reponame)=>{

    Alert.alert(
        'Delete Repository',
        'Are you sure',
        [
          {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
          {text: 'YES', onPress: () => this.deleteApi(reponame)},
        ]
      );
      
      this.fetchRepos();

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
                          <Text style={styles.TextStyle2}>{item.description?item.description:"N/A"}</Text>
                      </Text>
                      <Text style={{marginLeft:10,marginBottom:5}} >
                          <Text style={styles.TextStyle2Bold}>Language : </Text>
                          <Text style={styles.TextStyle2}>{item.language?item.language:"N/A"}</Text>
                      </Text>
                      <Text style={{marginLeft:10,marginBottom:5}} >
                          <Text style={styles.TextStyle2Bold}>Created At : </Text>
                          <Text style={styles.TextStyle2}>{item.created_at.split('T')[0]}</Text>
                      </Text>
                    <View style={{flexDirection:'row',flex:1}}>
                      <View >
                      <TouchableOpacity style={styles.Check_inButtonStyle1} onPress={()=>that.deleteRepo(item.name)  } >
                          <Text style={styles.TextStyle4}>Delete Repo</Text>
                      </TouchableOpacity>
                      </View> 
                      <View style={{justifyContent: 'flex-end'}}>
                      <TouchableOpacity style={styles.Check_inButtonStyle} onPress={()=>that.commits(item.name)  } >
                          <Text style={styles.TextStyle4}>Check Commits</Text>
                      </TouchableOpacity>
                      </View> 
                      </View>
                  </View>  
            );
          });
    }

  fetchRepos = async ()=>{
    const auth_token = await AsyncStorage.getItem('session_data');
    this.setState({name: JSON.parse(auth_token)[0].username,password: JSON.parse(auth_token)[0].pass});
    fetch(GLOBALS.FETCH_URL+this.state.name+"/repos", {
        method: 'GET',
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson)
                {    
                   this.setState({data: responseJson});
                   this.setState({refreshing: false});
                }
                else{
                    Alert.alert("No Repo exists");
                }

            }).catch((error) => {
            console.log(error);
            Alert.alert("Server Unavailable");

        });
  }

  render() {
    return (
      <View style={styles.container}>
          
           <ScrollView 
           refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
           />}>
           <Text style={styles.TextStyle1}> All Repositories:</Text>
            {this.display_list(this.state.data)}
           </ScrollView>
        
              
      </View>
    );
  }
}

export default RepoList;