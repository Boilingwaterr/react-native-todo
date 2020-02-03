import React from 'react';
import { View, Animated, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import AuthScreen from './AuthScreen';

const { width, height } = Dimensions.get('window');

class PresentScreen extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
            _animate: new Animated.Value(0),
            type: null
       }
    }

    actionHandler (type) {
        this.setState({ type });

        Animated.timing(this.state._animate, {
            toValue: 100,
            delay: 200
        }).start();
    }

    render() {

        const bottom = this.state._animate.interpolate({
            inputRange: [0, 100],
            outputRange: [ 0 , height ],
            
        })

        const authBottom = this.state._animate.interpolate({
            inputRange: [0, 100],
            outputRange: [ -height , 0 ]
        })

        return <>
            <Animated.View style = { [
                styles.container,
                { 
                    bottom: bottom,
                    width: width,
                    height: height
                }
            ] }>
                <Icon  
                    style = { { 
                        marginTop: 50,
                        alignSelf: 'center', 
                        fontSize: 140,
                        color: '#000',   
                    } }
                    name = 'bookmarks'
                /> 
                <View>
                    <TouchableOpacity onPress = { () => this.actionHandler('sign in') }>
                        <View  style = { styles.button }>
                            <Text style = { { fontSize: 18, fontWeight: '400', color: '#FF6E40' } }>
                                Sign in
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = { () => this.actionHandler('sign up') }>
                        <View  style = { [styles.button, {backgroundColor: '#FF6E40'}] }>
                            <Text style = { { fontSize: 18, fontWeight: '400', color: '#fff' } }>
                                Sign up
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>      
            </Animated.View>
            <Animated.View style = {{
                position: 'absolute',
                bottom: authBottom,
                height: height,
                width: width
            }}>
                <AuthScreen type = { this.state.type } /> 
            </Animated.View>
        </>
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4db6ac',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#ffffff',
        borderRadius: 50,
        height: 40,
        width: 140,
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 20
    }
})
export default PresentScreen;