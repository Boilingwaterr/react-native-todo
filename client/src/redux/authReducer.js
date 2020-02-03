import { authAPI } from "../api/api";
import { AsyncStorage } from 'react-native';

const LOADING = 'auth/LOADING';
const SET_USER_DATA = 'auth/SET_USER_DATA';
const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';
const SET_ERRORS = 'auth/SET_ERRORS';
const CLEAR_ERRORS = 'auth/CLEAR_ERRORS';
const FIRST_TRY = 'auth/FIRST_TRY';

const initialState = {
    isFirstTry: true,
    isAuth: null,
    userData: null,
    loadingData: false,
    errors: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loadingData: action.boolean
            }

        case AUTH_SUCCESS:
            return {
                ...state,
                isAuth: action.boolean
            }

        case SET_USER_DATA:
            return {
                ...state,
                userData: action.data
            }

        case SET_ERRORS:
            return {
                ...state,
                errors: action.error
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            } 

        case FIRST_TRY:
            return {
                ...state,
                isFirstTry: false
            } 
            
        default:
            return state;
    }
}

//action creators
export const firstTryActionCreator = () => {
    return {
        type: FIRST_TRY
    }
}

export const authActionCreator = boolean => {
    return {
        type: AUTH_SUCCESS,
        boolean
    }
}

const loadingData = boolean => {
    return {
        type: LOADING,
        boolean
    }
}

export const setUserData = data => {
    return {
        type: SET_USER_DATA,
        data
    }
}

const setErrors = error => {
    return {
        type: SET_ERRORS,
        error
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS        
    }
}
//thunks

export const registerThunk = data => {// fstName, lstName, email, password
    return async dispatch => {
        dispatch(loadingData(true));
        let response = await authAPI.signUp(data);
        if (response.res.status === 201) {
            dispatch(loadingData(false));
            let loginData = {email: data.email, password: data.password};
            dispatch(loginThunk(loginData));
        } else if(response.res.status === 400){
            dispatch(loadingData(false));
            dispatch(setErrors(response.serverData.message));
        } 
    }
}

export const loginThunk = data => {// email, password
    
    return async dispatch => {
        dispatch(loadingData(true)); 
        let response = await authAPI.signIn(data);
        console.log(response)
        if (response.res.status === 200) {
            
            let payload = {
                token: response.serverData.token,
                id: response.serverData.userId,
                email: response.serverData.email,
                firstName: response.serverData.firstName,
                lastName: response.serverData.lastName
            } 
            //set auth data in storage
            _storeData(payload);
            dispatch(setUserData(payload));     
            dispatch(authActionCreator(true));
            dispatch(loadingData(false));
           
        } else if(response.res.status === 400){
            dispatch(loadingData(false));
            dispatch(setErrors(response.serverData.message));
            console.log(response.serverData.message,'client side error')
        } else if(response.res.status === 500) {
            dispatch(loadingData(false));
            dispatch(setErrors('Error on server side.'))
        } 
    }
}

export const logOutThunk = () => {
    return dispatch => {
        _removeData();
        dispatch(setUserData(null));
        dispatch(authActionCreator(false));
    }
}

//async storage

const _storeData = async (payload) => {
    try {
        let string = JSON.stringify(payload);
        await AsyncStorage.setItem('@userdata', string);
    } catch (error) {
        console.log(error.message)
    }
}

const _removeData = async () => {
    try {
        await AsyncStorage.removeItem('@userdata');
    } catch (error) {
        console.log(error.message)
    }
}
export default authReducer;