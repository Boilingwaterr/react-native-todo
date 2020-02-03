import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import TodoScreen from './../TodoScreen';
import { Icon } from 'native-base';


const CustomDrawerComponent = props => {
    
    return (
        <SafeAreaView
            style = { styles.container }
            forceInset={{ top: 'always', horizontal: 'never' }}
        >   
            <Icon  
                style = { { 
                    marginTop: 50,
                    alignSelf: 'center', 
                    fontSize: 150,
                    color: '#4db6ac'
                } }
                name = 'bookmarks'/>
            <ScrollView>
                <DrawerItems {...props}/>                   
            </ScrollView>
        </SafeAreaView>
  )};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    },
    item: {
        paddingHorizontal: 20,
        height: 50,
        justifyContent: 'center',
        marginBottom: 15
    },
    text: {
        fontSize: 18,
        fontWeight: '400'
    }
})

const SideNavigator = createDrawerNavigator({

    All: {
        screen: TodoScreen,
        navigationOptions: {
            title: 'All',
            drawerIcon: ({tintColor}) => <Icon name = "paper" 
                style = { {color: tintColor, fontSize: 24} }
            />
        }
    },

    Important: {
        screen: TodoScreen,
        navigationOptions: {
            title: 'Important',
            drawerIcon: ({tintColor}) => <Icon name = "flame" 
                style = { {color: tintColor, fontSize: 24} }
            />
        }
    },

    Completed: {
        screen: TodoScreen,
        navigationOptions: {
            title: 'Completed',
            drawerIcon: ({tintColor}) => <Icon name = "star" 
                style = { {color: tintColor, fontSize: 24} }
            />
        }
    },
    
},{ 
    contentComponent: CustomDrawerComponent,
    initialRouteName: 'All',
    drawerBackgroundColor: '#E0F2F1',
    drawerType: 'front',
    activeTintColor: '#000',
    unmountInactiveRoutes : true,
    contentOptions: {
        activeTintColor: '#FF6E40'
    }
})

export default createAppContainer(SideNavigator);