import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, KeyboardAvoidingView, View,  
  Button, FlatList, ProgressBarAndroid } from 'react-native';
import { logOutThunk } from './redux/authReducer';
import { getTaskThunk, addTaskThunk, screenLoadSuccess,
  deleteTaskThunk, editTaskThunk, clearErrors, getTasksActionCreator
} from './redux/todoListReducer'
import Header from './Header';
import TodoItem from './TodoItem';
import CreateTask from './CreateTask';

const TodoScreen = React.memo(props => {

  const { 
    logOutThunk, authData, todoData,
    getTaskThunk, deleteTaskThunk, editTaskThunk,
    clearErrors, screenLoadSuccess, getTasksActionCreator
  } = props;

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (authData.userData !== null && !!todoData.isScreenReady){
      getTaskThunk(authData.userData.token);
    } 
  },[getTaskThunk, authData.isAuth, authData.userData, todoData.isScreenReady]);

  const header = <Header 
    logOutThunk = { logOutThunk } 
    authData = { authData } 
    openDrawer = { props.navigation.openDrawer }
    screenLoadSuccess = { screenLoadSuccess }
    getTasksActionCreator =  { getTasksActionCreator }
  /> 

  if (editMode){
    return (
      <KeyboardAvoidingView style = { styles.container } behavior = 'height' enabled >
        { header }
        <CreateTask clearErrors = { clearErrors } setEditMode = { setEditMode } { ...props }/>
      </KeyboardAvoidingView>
    )
  }
  return (
    <View style = { styles.container }>
      { header }
      {todoData.loadingData && <View style = {{width: '100%'}}>
        <ProgressBarAndroid styleAttr = 'Horizontal' />
      </View>}
      <View style = { styles.addTaskButton }>
        <Button 
          color = '#ff6e40' 
          title = "Add task" 
          onPress = { () => setEditMode(true) }
        />
      </View>
      <View style = { styles.scrollview }>
        <FlatList 
          data = { todoData.tasks }
          renderItem = { ({ item }) =>   
            <TodoItem 
              todoData = { item }
              filterType = { props.navigation.state.routeName }
              deleteTaskThunk = { deleteTaskThunk }
              editTaskThunk = { editTaskThunk }
              token = { authData.userData.token }
            />
          }
          keyExtractor = { item => item._id }
        />
      </View>
    </View>
)})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "flex-start",
    height: '100%'
  },

  scrollview: {
    width: '100%',
    flex: 2
  },

  addTaskButton: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 30,
    width: '100%',
  },

});

const mapStateToProps = state => {
  return {
    authData: state.authData,
    todoData: state.todoListData
  }
}
export default connect(mapStateToProps,{ 
  logOutThunk, getTaskThunk, addTaskThunk, 
  deleteTaskThunk, editTaskThunk, clearErrors,
  screenLoadSuccess, getTasksActionCreator
})(TodoScreen);

