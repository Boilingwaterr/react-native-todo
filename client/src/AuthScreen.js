import React, { useState, useEffect } from 'react';
import { StyleSheet, View,  Button, KeyboardAvoidingView } from 'react-native'; 
import RenderField from './Inputs/RenderField';
import { connect } from 'react-redux';
import { loginThunk, clearErrors, registerThunk, firstTryActionCreator } from './redux/authReducer';
import ErrorWindow from './errors/ErrorMessage';

const AuthScreen = props => {

    const { loginThunk, clearErrors, registerThunk,
        authData, type, firstTryActionCreator } = props;

    const [emailValue, onChangeEmail] = useState('');
    const [passwordValue, onChangePassword] = useState('');
    const [firstNameValue, onChangeFirstName] = useState('');
    const [lastNameValue, onChangeLastName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistrationMode, setRegistrationMode] = useState(false);
    
    useEffect(() => {
        if ( isRegistrationMode || type === 'sign in' ){
            setRegistrationMode(false);
        } else if (!isRegistrationMode || type === 'sign up'){
            setRegistrationMode(true);
        }
    },[type])

    useEffect(() => {
        return () => {
            onChangeEmail('');
            onChangePassword('');
            onChangeFirstName('');
            onChangeLastName('');
            setShowPassword(false);
        };
    },[isRegistrationMode]);

    const handleSubmit = () => {
        firstTryActionCreator();
        if(isRegistrationMode === true){
            let email = emailValue.toLowerCase();
            const payload = { 
                firstName: firstNameValue, 
                lastName: lastNameValue, 
                email: email, 
                password: passwordValue 
            }
            registerThunk(payload);
        } else {
            let email = emailValue.toLowerCase();
            const login = { email: emailValue, password: passwordValue }
            loginThunk(login);
        }
        
    }

    const iconPressHandler = iconName => {
        if (iconName === 'eye'){
            setShowPassword(!showPassword);
        }
    }
    if (isRegistrationMode){
        return (
            <KeyboardAvoidingView behavior = 'padding' style = { styles.loginScreen } >
               { authData.errors && <ErrorWindow
                    clearErrors = { clearErrors }
                    message = { authData.errors }/> }
                <RenderField 
                    onChangeText = {text => onChangeFirstName(text)}
                    value = { firstNameValue }
                    label = 'First name'
                    type = 'email-address'
                    iconName = 'umbrella'
                    iconPressHandler = { iconPressHandler }
                />
                <RenderField 
                    onChangeText = {text => onChangeLastName(text)}   
                    value = { lastNameValue }
                    label = 'Last name'
                    iconName = 'umbrella'
                    iconPressHandler = { iconPressHandler }
                />
                <RenderField 
                    onChangeText = {text => onChangeEmail(text)}
                    value = { emailValue }
                    label = 'Email'
                    type = 'email-address'
                    iconName = 'email'
                    iconPressHandler = { iconPressHandler }
                />
                <RenderField 
                    securePassword = { !showPassword }
                    onChangeText = {text => onChangePassword(text)}   
                    value = { passwordValue }
                    label = 'Password'
                    iconName = 'eye'
                    iconPressHandler = { iconPressHandler }
                />
                
                <View style = {styles.buttonView}>
                    <Button 
                        style = {{marginTop: 20}}
                        color = '#ff6e40' 
                        title = "Sign up" 
                        onPress = { handleSubmit }
                    />
                    <Button 
                        style = {{marginTop: 20}}
                        color = '#ff6e40' 
                        title = "Already have an account" 
                        onPress = { () => setRegistrationMode(false) }
                    />
                </View>
                
            </KeyboardAvoidingView>
        )
    } 
    return (
        <KeyboardAvoidingView behavior = 'padding' style = { styles.loginScreen } >
            { authData.errors && <ErrorWindow
                clearErrors = { clearErrors }
                message = { authData.errors }
            /> }
            <RenderField 
                onChangeText = {text => onChangeEmail(text)}
                value = { emailValue }
                label = 'Email'
                type = 'email-address'
                iconName = 'email'
                iconPressHandler = { iconPressHandler }
            />
            <RenderField 
                securePassword = { !showPassword }
                onChangeText = {text => onChangePassword(text)}   
                value = { passwordValue }
                label = 'Password'
                iconName = 'eye'
                iconPressHandler = { iconPressHandler }
            />
            
            <View style = {styles.buttonView}>
                <Button 
                    style = {{marginTop: 20}}
                    color = '#ff6e40' 
                    title = "Sign in" 
                    onPress = { handleSubmit }
                />
                <Button 
                    style = {{marginTop: 20}}
                    color = '#ff6e40' 
                    title = "Sign up" 
                    onPress = { () => setRegistrationMode(true) }
                />
            </View>
            
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    loginScreen: {
        alignSelf: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: '100%',
        marginBottom: 10,
    },
    text: {
        color: '#00796b'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        width: '100%'
    },
})

const mapStateToProps = state => {
    return {
        authData: state.authData
    }
}

export default connect(mapStateToProps, { 
    loginThunk, clearErrors, registerThunk, firstTryActionCreator 
})(AuthScreen);