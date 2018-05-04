import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, AsyncStorage,TextInput } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { CONFIG } from '../constants/index'
import { Icon } from 'react-native-elements'

export default class HomeScreen extends React.Component {
    state = {
        videoList: [],
        locale: "",
        search: "",
        isSearch: false
    }

    video = (header, id) => {
        let link = "https://www.youtube.com/watch?v=" + id
        this.props.navigation.navigate("Video", {header, link})
    };


    render() {
        return (
            <View style={styles.container}>
            {this._toggleSearch()}
                <ScrollView>
                    <View style={styles.body}>
                        <Text>Video populaire : {this.state.locale}</Text>
                        {this.state.videoList.map((item) =>
                            <TouchableOpacity
                                key={item.id.videoId}
                                onPress={() => this.video(item.snippet.title, item.id.videoId)}>
                                <View style={styles.vids}>
                                    <Image
                                        source={{uri: item.snippet.thumbnails.medium.url}}
                                        style={{width: 320, height: 180}}/>
                                    <View style={styles.vidItems}>
                                        <Text style={styles.vidText}>{item.snippet.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>


            </View>
        )
    }
    _search  = ()  => {
        if (this.state.isSearch) {
            this.setState({isSearch: false})

        }
        else {
            this.setState({isSearch: true})
        }
    };

    Buttonsearch = ( )  => {
        console.log("rrr");
        fetch(`${CONFIG.YOUTUBE.BASE_URL}/search/?key=${CONFIG.YOUTUBE.API_KEY}&part=snippet,id&maxResults=${CONFIG.YOUTUBE.DEFAULT_NB_RESULT}&q=${this.state.search}`)
            .then(res => res.json())
            .then(res => {
                const video = []
                res.items.forEach(item => {
                    video.push(item)
                })
                this.setState({
                    videoList: video
                })
            })
            .catch(error => {
                console.error(error)
            })
    };

    _toggleSearch(){
        if (this.state.isSearch) {
            return (
                <TextInput
                    style={{height: 40, borderColor: 'red', borderWidth: 1}}
                    onChangeText={(search) => this.setState({search})}
                    value={this.state.text}
                    onEndEditing={() => this.Buttonsearch( )}
                    placeholder = "Recherchez"
                />
            )
        }
    }
    
    static navigationOptions = ({navigation}) => {
        const { state, setParams, navigate } = navigation; 
        return {
        title: 'Youtube',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerLeft: (
            <TouchableOpacity>
                <Image
                    style={{ height: 22, width: 98, color: '#fff', marginLeft: 25 }}
                    source={require('../assets/logo.png')} />
            </TouchableOpacity>
        ),
        headerRight: (
            <View style={{flexDirection: 'row'}}>
                <Icon
                name='settings'
                onPress={() => navigation.navigate('Settings')
                }/>
                <Icon 
                name='favorite'/>
                <Icon 
                name='search'
                onPress={() => state.params.search()}
                />
                <Icon 
                name='cached'/>
            </View>
        )

    };

}

    componentDidMount() {
        fetch(`${CONFIG.YOUTUBE.BASE_URL}/search?key=${CONFIG.YOUTUBE.API_KEY}&chart=mostPopular&regionCode=FR&part=snippet`)
            .then(res => res.json())
            .then(res => {
                const videoId = []
                res.items.forEach(el => {
                    videoId.push(el);
                });
                this.setState({
                    videoList: videoId
                });
            })
            this.props.navigation.setParams({
                search: this._search
              });
    }
}






const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 30
    },
    vids: {
        paddingBottom: 30,
        width: 320,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderBottomWidth: 0.6,
        borderColor: '#aaa'
    },
    vidItems: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10
    },
});



