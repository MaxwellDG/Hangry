import React from 'react'
import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native'
import Counter from '../components/counter'
import Item from '../components/item'
import { primaryColor, primaryFontColor } from '../globals/globalStyles'

export default ({ navigation, toggleSelectItem, allItems, selectedItemsLength }) => {

    return(
        <View style={ { flex: 1 } }>
            <View style={ styles.cartContainer }>
                <Image style={ styles.cart } source={ require("../assets/images/cart.png") } />
                <Counter style={ styles.counter } count={ selectedItemsLength } />
            </View>
            <FlatList
                data={ allItems }
                renderItem={ item => (
                    <Item 
                        isCheckoutScreen={ false }
                        item={ item.item } 
                        toggleSelection={ toggleSelectItem } 
                    /> 
                )}
                keyExtractor={ item => item.key.toString() }
            /> 
            <Pressable
                style={ styles.checkoutButton }
                onPress={ () => navigation.navigate("Checkout") }
            >
                <Text style={ styles.checkoutButtonText }>Checkout</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    checkoutButton: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        padding: 15,
        backgroundColor: primaryColor,
    },
    checkoutButtonText:{
        color: primaryFontColor, 
        fontSize: 18, 
        fontWeight: "700" 
    },
    headerText: {
        fontSize: 24
    },
    cartContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10
    },
    cart: {
        height: 50,
        width: 50
    }
})