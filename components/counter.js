import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default ({ count }) => {

    return(
        <View>
            <Text style={ styles.number }>{ count }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    number: {
        fontSize: 50,
        color: "grey",
        marginLeft: 15
    }
})