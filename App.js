import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenCheckout from './containers/screenCheckout' 
import ScreenSelection from './containers/screenSelections'
import React, { useState } from 'react'
import RawData from './data/items'
import { primaryColor, primaryFontColor } from './globals/globalStyles'


const Stack = createStackNavigator()

export default () => {

    const[allItems] = useState(RawData)
    const[selectedItems, setSelectedItems] = useState([])

    const toggleSelectItem = (obj) => {
        // Toggle selection with a boolean property
        const key = allItems.indexOf(obj)
        allItems[key].selected = !allItems[key].selected
        // Add or subtract from selectedItems array 
        if(selectedItems.find( element => element == allItems[key]) == undefined){
            setSelectedItems([...selectedItems, allItems[key]])
        } else {
            const copy = Object.assign(selectedItems)
            setSelectedItems(copy.filter(item => item != allItems[key]))
        }
    }

    // Making a fresh copy for checkout that isn't connected to App.js state
    const sendCopyToCheckout = () => {
        let copy = Object.assign([], selectedItems)
        copy.forEach(item => {
            item.selected = false
            item.quantity = 0
        })
        return copy
    }

    // Using Context API or Redux would both be overkill so components are passed as props to the route instead //
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Selection">
                    <Stack.Screen 
                        name="Selection" 
                        options={{ 
                            title: "Hangry",
                            headerStyle: {
                                backgroundColor: primaryColor
                            },
                            headerTintColor: primaryFontColor,
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                textAlign: "center"
                            },
                        }} 
                    >
                        { props => <ScreenSelection 
                                        { ...props } 
                                        toggleSelectItem={ toggleSelectItem } 
                                        allItems={ allItems } 
                                        selectedItemsLength={ selectedItems.length } 
                                    /> 
                        }  
                    </Stack.Screen>
                    <Stack.Screen 
                        name="Checkout"
                        options={{
                            headerStyle: {
                                backgroundColor: primaryColor
                            },
                            headerTintColor: primaryFontColor,
                            headerTitleStyle: {
                                fontWeight: 'bold'
                            },
                            headerTitleAlign: "center"
                        }} 
                    >
                        { props => <ScreenCheckout 
                                        { ...props }
                                        copyOfSelectedItems={ sendCopyToCheckout }
                                    /> 
                        } 
                    </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

