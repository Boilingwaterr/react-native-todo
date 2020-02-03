import React, { useState } from 'react';
import { StyleSheet, View,  Button, Text, CheckBox, ProgressBarAndroid} from 'react-native'; 
import RenderField from './Inputs/RenderField';
import ErrorWindow from './errors/ErrorMessage';

const CreateTask = props => {

    const { setEditMode, addTaskThunk, authData, todoData, clearErrors } = props;

    const [titleValue, onChangeTitle] = useState('');
    const [taskValue, onChangeTask] = useState('');
    const [isImportant, setImportant] = useState(false);
    const [message, setMessage] = useState(null);

    const setCheckBox = () => {
        if (isImportant){
            setImportant(false);
        } else {
            setImportant(true);
        }
    }

    const handleSubmit = () => {
        const data = { title: titleValue, task: taskValue, isImportant }
        if(data.title.trim() !== '' && data.task.trim() !== ''){
            addTaskThunk(data, authData.userData.id, props.authData.userData.token)
            .then(()=>{
                if(!todoData.loadingData && todoData.errors === null) setEditMode(false);
            })
        } else {
            setMessage('Title and Task is required.');
        }
        
    }

    return (
        <View style = { styles.todoItemCreator } >
            {todoData.loadingData && <View style = {{width: '100%'}}>
                <ProgressBarAndroid styleAttr = 'Horizontal' />
            </View>}
            { message && <ErrorWindow 
                clearErrors = { setMessage }
                message = { message }
            /> }
            <RenderField 
                onChangeText = {text => onChangeTitle(text)}
                value = { titleValue }
                label = 'Title'
            />
            <RenderField 
                onChangeText = {text => onChangeTask(text)}
                value = { taskValue }
                label = 'Task' 
            />
            <View style = { styles.checkBox } >
                <Text style = { styles.text } >Task is important? </Text>
                <CheckBox 
                    onChange = { setCheckBox }
                    value = { isImportant }
                />
            </View>
            <View style = {{
                flexDirection: 'row', 
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <Button 
                    style = {{marginTop: 20}}
                    color = '#ff6e40' 
                    title = "Create task" 
                    onPress = { handleSubmit }
                /> 
                <Button 
                    style = {{marginTop: 20}}
                    color = '#ff6e40' 
                    title = "Close" 
                    onPress = { () => {
                        setEditMode(false);
                    } }
                /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    todoItemCreator: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginBottom: 10,
    },
    text: {
        color: '#00796b'
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        width: '90%',
    },
})

export default CreateTask;