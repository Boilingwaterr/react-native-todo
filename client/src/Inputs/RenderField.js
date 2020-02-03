import React, { useState, useEffect } from 'react';
import { TextInput, View, Animated, StyleSheet } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

const RenderField = props => {

    const [isFocused, setFocus] = useState(false);

    const { 
        onChangeText, value, placeholder, 
        label, type, iconName, 
        securePassword, iconPressHandler, maxLength
    } = props;

    const _labelAnimation = new Animated.Value(10);

    const animateLabel = () => {

        let labelPosition;

        if (!isFocused){
            labelPosition = 10;
        } else {
            labelPosition = 40;
        }

        Animated.timing(_labelAnimation, {
            toValue: labelPosition,
            duration: 250,
        }).start();        
    }

    const fontSize = _labelAnimation.interpolate({
        inputRange: [10, 30],
        outputRange: [16, 14],
        extrapolate: 'clamp'
    })

    const borderPosition = _labelAnimation.interpolate({
        inputRange: [10, 40],
        outputRange: [-300, 0],
        extrapolate: 'clamp'
    })
    

    useEffect(() => {
        animateLabel();
    }, [isFocused]);

    return (
        <View style = { styles.inputstyle }>
            <TextInput 
                secureTextEntry = { securePassword }
                style = { {width: '82%', height: 40, fontSize: 16} }
                onChangeText = { onChangeText }
                value = { value }
                placeholder = { placeholder }
                onFocus = { () => setFocus(true) }
                keyboardType = { type }
                maxLength = { maxLength }
                onBlur = { () => {
                    return value === '' && setFocus(false);
                }}
            />
            { iconName && <TouchableOpacity 
                style = { {
                    width: 40,
                    height: 40,    
                    marginRight: 10
                } }
                onPress = { () => iconPressHandler(iconName) }
            >
                <Icon name = { iconName } size = { 25 }/>
            </TouchableOpacity> }
            <Animated.View style = { {
                position: 'absolute', 
                bottom: _labelAnimation,
                left: 0,    
            } }>
                <Animated.Text style = { {
                    color: '#4db6ac',
                    fontSize: fontSize
                } }>
                    { label }
                </Animated.Text>
            </Animated.View>
            
            <Animated.View 
                style = {{
                    position: 'absolute',
                    borderBottomWidth: 3,
                    borderBottomColor: '#b2dfdb',
                    width: '100%',
                    left: borderPosition,
                    bottom: 0
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputstyle: {
        marginTop: 5,
        marginBottom: 15,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#4db6ac',
        borderBottomWidth: 1,
        height: 60,
        width: '90%',
        position: 'relative',
        overflow: "hidden"
      }
})

export default RenderField;