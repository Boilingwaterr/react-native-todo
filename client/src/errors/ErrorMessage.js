import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

const ErrorWindow = props => {

    const { message, clearErrors } = props;
    const [ duration, setDuration ] = useState(2000)

    const _opacity = new Animated.Value(1);

    Animated.timing(_opacity, {
        toValue: 0,
        duration
    }).start()

    const opacity = _opacity;

    useEffect(()=>{
        setTimeout(()=>{
            clearErrors(null);
        }, duration);
    })

    return <>
        { message && <Animated.View style = { [ styles.container, 
            { top: 30, opacity } 
        ] }>
            <Animated.Text style = { {
                color: '#ff6e40', 
                fontSize: 16, 
                fontWeight: "bold"
            } }>{ message }</Animated.Text>
        </Animated.View> }
    </>
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        minHeight: 50,
        minWidth: 100,
        backgroundColor: '#cfd8dc',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15

    }
})

export default ErrorWindow;