import React from 'react';
import { StyleSheet, Text, View, Header} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen  from './screens/home'
import SettingScreen  from './screens/settings'
import VideoScreen from './screens/video';

 class App extends React.Component {
  render() {
    return (

      <View style={styles.container}>
       
      </View>
    );
  }
}


const MainNav = StackNavigator({
  Home: { screen: HomeScreen },
   Settings: { screen: SettingScreen },
   Video: {screen: VideoScreen},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default MainNav;
