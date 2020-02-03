import React, { useEffect, useState } from 'react';
import { AsyncStorage, ProgressBarAndroid, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import SideNavigator from './navigation/SideNavigator';
import { authActionCreator, loginThunk, setUserData } from './redux/authReducer';
import PresentScreen from './PresentScreen';
import AuthScreen from './AuthScreen';

const AppWithConnect = React.memo(props => {

  const { authData, authActionCreator, setUserData } = props;

  const [isInit, setInit] = useState(false);

  const _getStorageData = async (key) => {
    try {
      const userData = await AsyncStorage.getItem(key);
      if (userData) {
        let jsonData = JSON.parse(userData)
        setUserData(jsonData);
        authActionCreator(true);
      } else {
        authActionCreator(false);
      }
    } catch (err) {
        throw err;
      }
  }

  useEffect(()=> {
    _getStorageData('@userdata')
    .then(() => {
      setInit(true);
    });
  }, [authData.isAuth]);
 
  if ( !isInit || authData.loadingData || authData.isAuth === null ) {
    return <View style = { styles.container }>
      <ProgressBarAndroid />
    </View>
  } else  {
     if (authData.isFirstTry === true){
      return ( authData.isAuth === false ) ? <PresentScreen /> : <SideNavigator />
     } else {
      return ( authData.isAuth === false ) ? <AuthScreen /> : <SideNavigator />
     }
 }
})

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#80cbc4'
  }
})

const mapStateToProps = state => {
  return {
      authData: state.authData,
  }
}

export default connect(mapStateToProps, { 
  authActionCreator, loginThunk, setUserData
})(AppWithConnect);
 