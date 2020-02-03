import { Alert } from "react-native";

export const authAPI = {
    async signUp(data) {
        const res = await fetch('http://192.168.0.100:5000/api/auth/register', {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .catch( error => {
            Alert.alert(error.message);
            return error.message;
        })
        const serverData = await res.json();
        return {res, serverData};
    },
    
    async signIn(data){
        const res = await fetch('http://192.168.0.100:5000/api/auth/login', {
            method:'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .catch( error => {
            Alert.alert(error.message);
            return error.message;
        })
        const serverData = await res.json();
        return {res, serverData};
    }
}

export const todoListAPI = {
    async addTask(payload, token) {
        const res = await fetch('http://192.168.0.100:5000/api/todoList/addTask', {
            method:'POST',
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .catch( error => {
            Alert.alert(error.message);
            return error.message;
        })
        const serverData = await res.json();
        return {res, serverData};
    },

    async getTasks(token) {
        const res = await fetch('http://192.168.0.100:5000/api/todoList/getTasks', {
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .catch( error => {
            Alert.alert(error.message);
            return error.message;
        })
        const serverData = await res.json();
        return {res, serverData};
    },

    async deleteTask(id, token) {
        const res = await fetch('http://192.168.0.100:5000/api/todoList/deleteTask', {
            method:'PUT',
            body: JSON.stringify(id),
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .catch( error => {
            Alert.alert(error.message);
            return error.message;
        })
        const serverData = await res.json();
        return {res, serverData};
    },

    async editTask(id, token) {
        const res = await fetch('http://192.168.0.100:5000/api/todoList/editTask', {
            method:'POST',
            body: JSON.stringify(id),
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .catch( error => {
            Alert.alert(error.message);
            return error.message;
        })
        const serverData = await res.json();
        return {res, serverData};
    },
}