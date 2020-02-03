import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native'; 
import { Icon } from 'native-base'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _lazyHeader: new Animated.Value(0)
        }
    }

    componentDidMount () {
        const animation = new Promise((res, rej) => {

            Animated.timing(this.state._lazyHeader,{
                toValue: 1,
                delay: 300
            }).start();

            res('animated');
            rej('some err');
        })
        
        animation.then(() => {
            setTimeout(() => {
                this.props.screenLoadSuccess(true);
            }, 500)
        });
    }

    componentWillUnmount() {
        this.props.screenLoadSuccess(false)
    }

    render(){     
        const lazyHeader = this.state._lazyHeader.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 0]
        })

        return (
            <Animated.View style = { [styles.header , { top: lazyHeader }] }>
                <View style = { styles.firstWrapper }>
                    <Icon 
                        name = 'menu' 
                        style = { {color: '#ffffff'} }
                        onPress = { () => this.props.openDrawer() }
                    />
                </View>
                <View style = { styles.secondWrapper }>
                    <Text style = { styles.text }>
                        {`${this.props.authData.userData.firstName} ${this.props.authData.userData.lastName}`}
                    </Text>
                    <TouchableOpacity  
                        style = {{height: '35%',justifyContent: 'flex-end'}} 
                        onPress = { () => {
                            this.props.logOutThunk();
                            this.props.getTasksActionCreator();
                            this.props.screenLoadSuccess(false);
                        }}
                    >
                        <Text style = { styles.text }>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
            )
    }       
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4db6ac',
        maxHeight: 100,
        minHeight: 100,
        width: '100%',
        marginBottom: 15,
        paddingBottom: 0,
        paddingHorizontal: 15,
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'sans-serif'
    },
    firstWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        height: '100%',
        paddingBottom: 15,
        marginLeft: 5
    },
    
    taskButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#ffffff',
        marginRight: 10,
        minWidth: 35,
        minHeight: 30
    },
    secondWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        height: '100%',
        paddingBottom: 15
    }

})

export default Header;