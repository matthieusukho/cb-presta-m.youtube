import React from 'react';
import { StyleSheet, Text, View, Header,TouchableOpacity,Image,ScrollView,Picker,AsyncStorage} from 'react-native'
import { StackNavigator } from 'react-navigation';
import { CONFIG } from '../constants/index';
const YOUTUBE = CONFIG.YOUTUBE;

class SettingScreen extends React.Component {
    state = {
        region:'',
        regionsList:[]
      }
       updateRegion = (region) => {
          this.setState({ region: region })
          AsyncStorage.setItem(CONFIG.STORAGE.CURRENT_REGION, region);
       }
       componentDidMount() {

        if (CONFIG.STORAGE.AVAILABLE_REGION.length === 0){

        
         fetch(`${YOUTUBE.BASE_URL}/i18nRegions?key=${YOUTUBE.API_KEY}&part=snippet,id`)
         .then(res => res.json())
         .then(res => {
             const regions = []
             res.items.forEach(item => {
               regions.push(item)
             })
             this.setState({
               regionsList: regions
             })
         })
        }else {
            AsyncStorage.setItem(CONFIG.STORAGE.AVAILABLE_REGIONS, this.state.regionsList)
        }
       }
       render() {
         const items = this.state.regionsList.map((item, index) => {
             return(
                <Picker.Item label={item.snippet.name} value={item.snippet.gl}/>
               )
         })
          return (
             <View>
                <Picker selectedValue = {this.state.region} onValueChange = {this.updateRegion}>
                   {items}
                </Picker>
                <Text>{this.state.region}</Text>
             </View>
          )
       }
    }


export default SettingScreen;