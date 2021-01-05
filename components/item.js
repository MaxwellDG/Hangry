import { Pressable, Text, Image, Button, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { primaryColor, primaryFontColor } from '../globals/globalStyles'

export default ({ item, toggleSelection, isCheckoutScreen, setQuantity }) => {

    return(
        <Pressable style={ item.selected ? styles.itemContainerPressed : styles.itemContainer } onPress={ () => toggleSelection(item) }>
            <View style={{flex: 1}}>
                <Image style={ styles.foodImages } source={ item.image } />
            </View>
            <View style={{flex: 1}}>
                <Text style={{ fontWeight: "700" }}>{ item.name }</Text>
            </View>
            { isCheckoutScreen ? 
                null 
                :
                <View style={{flex: 1}}>
                    <Text>{ item.description }</Text>
                </View>
            }
            { isCheckoutScreen ?  
                <View style={ styles.quantityContainer }>
                    <Pressable onPress={ () => setQuantity(item, 1) } color={ primaryColor } >
                        <Text style={ styles.buttonTextPlus }>+</Text>
                    </Pressable> 
                    <Text style={ styles.buttonText }>{ item.quantity }</Text>
                    <Pressable onPress={ () => setQuantity(item, -1) } color="red" >
                        <Text style={ styles.buttonTextMinus }>-</Text>
                    </Pressable>
                </View>
                : 
                null 
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    foodImages: {
        height: 50,
        width: 50
    },
    quantityContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonText:{
        fontSize: 18,
        margin: 5
    },
    buttonTextPlus:{
        fontSize: 18,
        fontWeight: "700",
        backgroundColor: primaryColor,
        padding: 15,
        margin: 5,
        borderRadius: 7
    },    
    buttonTextMinus:{
        fontSize: 18,
        fontWeight: "700",
        backgroundColor: primaryFontColor,
        padding: 15,
        margin: 5,
        borderRadius: 7
    },
    itemContainer:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 15,
        backgroundColor: "white",
        margin: 10,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: "transparent"
    },
    itemContainerPressed: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 15,
        backgroundColor: "white",
        borderColor: primaryColor,
        borderWidth: 2,
        borderStyle: "solid",
        borderRadius: 5,
        margin: 10
    }
})
