import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native'; 
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default TaskBody = props => {

    const { 
        title, task, date, _id,
        isImportant, isComplete
    } = props.todoData;

    let backgroundTask;

    if (isComplete){
        backgroundTask = "#B0BEC5"  
    } else if (isImportant) {
        backgroundTask = "#FF6E40" 
    } else if (!isImportant && !isComplete) {
        backgroundTask = "#607d8b"
    }

    const clientDate = new Date(date);

    const renderLeftActions = (progress, dragX) => {

        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [ 0, 1 ],
            extrapolate: 'clamp'
        })

        return <>
            {!isComplete?
                <TouchableOpacity onPress = { () => props.editTaskThunk({
                    id: _id, title, task, isImportant, isComplete: true
                    }, props.token) }>
                    <View style = { styles.completeComponent } > 
                        <Animated.Text 
                            style = { [{
                                color:'#fff' 
                            }, { transform: [{scale}] }
                        ] } >Mark as complete</Animated.Text>   
                    </View>
                </TouchableOpacity>
            :   
                <TouchableOpacity onPress = { () => props.editTaskThunk({
                    id: _id, title, task, isImportant, isComplete: false
                    }, props.token) }>
                    <View style = { styles.completeComponent} > 
                        <Animated.Text style = { [{
                                color:'#fff' 
                            }, { transform: [{scale}] }
                        ] } >Mark as uncomplete</Animated.Text>   
                    </View>
                </TouchableOpacity>
            }
        </>
    }
    
    const renderRightActions = (progress, dragX) => {

        const scale = dragX.interpolate({
            inputRange: [ -100, 0 ],
            outputRange: [ 1, 0 ],
            extrapolate: 'clamp'
        })

        return (
            <TouchableOpacity onPress = { () => props.deleteTaskThunk(_id, props.token) }>
                <View style = { styles.deleteComponent} > 
                    <Animated.Text 
                        style = {[{
                            color:'#fff'
                        }, { transform: [{scale}] }
                        ]}>Delete task</Animated.Text>
                </View>
            </TouchableOpacity>
        )
    }

    return <TouchableOpacity activeOpacity = { 0.7 }>
        <View style = { styles.todoItem } >
            <Swipeable 
                renderLeftActions = { renderLeftActions }
                renderRightActions = { renderRightActions }
            >
                <View style = { {
                        backgroundColor: backgroundTask, 
                        width: '100%', 
                        paddingHorizontal: 15}}>
                    <Text style = { {fontSize: 20, fontWeight: 'bold', color: '#fff'} }>
                        { title }
                    </Text>
                    <Text style = { {fontSize: 16, fontWeight: '400', color: '#fff'}}>
                        { task }
                    </Text>
                </View>
                <View style = { styles.secondPiece }>
                    <View style = {{ 
                        display: "flex", 
                        flexDirection: "column", 
                        justifyContent: 'space-between'
                    }}>
                        <Text style = {{ fontSize: 11, color: '#90a4ae', maxWidth: '80%' }}>
                            {`Task was created: ${clientDate}`}
                            
                        </Text>
                        { !isComplete 
                            ? <Text style = { {color:'#FFAB40'} } >Mark as complete</Text>
                            : <Text style = { {color:'#FFAB40'} } >Mark as uncomplete</Text>
                        }
                    </View>
                    <View style = {{justifyContent: 'flex-end'}}>
                        <Text style = { {color:'#FFAB40'} } >Delete task</Text> 
                    </View>
                </View>
            </Swipeable>
        </View>
    </TouchableOpacity>
    
}

const styles = StyleSheet.create({
    todoItem: {
        flex: 1,
        alignSelf: "center",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#607d8b',
        minHeight: 100,
        width: '100%',
        marginBottom: 15
    },
    secondPiece: {
        backgroundColor: '#6f7f8f', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        paddingHorizontal: 15,
    },
    deleteComponent: {
        backgroundColor: '#FF6E40',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        width: 150
    },
    completeComponent: {
        flex: 1,
        backgroundColor: '#B0BEC5',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        width: 150
    }
})