import React, { useState } from 'react'
import { FlatList, StyleSheet, View, Pressable, Text } from 'react-native' 
import Item from '../components/item'
import { primaryColor, primaryFontColor } from '../globals/globalStyles'
import { FontAwesome5 } from '@expo/vector-icons'


export default ({ copyOfSelectedItems }) => {

    const[checkoutItems, setCheckoutItems] = useState(copyOfSelectedItems)
    const[checkoutSelectedItems, setCheckoutSelectedItems] = useState([])

    const setQuantity = (obj, num) => {
        const copy = Object.assign([], checkoutItems)
        const item = copy.find(element => element == obj)
        if(item.quantity > 0){
            item.quantity = item.quantity + num
        } else if(item.quantity == 0 && num == 1){
            item.quantity = item.quantity + num
        }
        setCheckoutItems(copy)
    }

    const toggleSelectCheckout = (obj) => {
        // Toggle selection with a boolean property
        const copy = Object.assign([], checkoutItems)
        const item = copy.find(element => element == obj)
        item.selected = !item.selected
        setCheckoutItems(copy)
        // Adding or subtracting from selected list that can be removed upon garbage button press
        if(checkoutSelectedItems.find( element => element == item) == undefined){
            setCheckoutSelectedItems([...checkoutSelectedItems, item])
        } else {
            setCheckoutSelectedItems(copy.filter(element => element != item))
        }
    }

    const deleteSelectedFromCheckout = () => {
        const copy = Object.assign([], checkoutItems)
        setCheckoutItems(copy.filter(item => !checkoutSelectedItems.includes(item)))
    }

    

    return(
        <View style={ styles.containerCheckout }>
            <View style={ styles.topContainer }>
                <Text style={{ fontStyle: "italic", textAlign: "center", margin: 5 }}>Select items to remove   - - - </Text>
                <Pressable onPress={ deleteSelectedFromCheckout }>
                    <FontAwesome5 name="trash-alt" size={ 36 } color="grey" />
                </Pressable>
            </View>
            <FlatList 
                data={ checkoutItems }
                renderItem={ item => (   
                             <Item 
                                isCheckoutScreen={ true }
                                item={ item.item }
                                toggleSelection={ toggleSelectCheckout }
                                setQuantity={ setQuantity } 
                            /> 
                        ) }
                keyExtractor={ item => item.key.toString() }
            />
            <Pressable
                style={ styles.confirmButton }
                onPress={ () => alert("Enjoy your meal!") }
            >
                <Text style={ styles.confirmButtonText }>Confirm</Text>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    topContainer:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 15
    },
    containerCheckout:{
        flex: 1,
        justifyContent: "center"
    },
    confirmButton: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        padding: 15,
        backgroundColor: primaryColor,
    },
    confirmButtonText:{
        color: primaryFontColor, 
        fontSize: 18, 
        fontWeight: "700" 
    },
})