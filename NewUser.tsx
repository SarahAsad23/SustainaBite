import React from "react";
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'; 

const NewUserScreen = ({navigation}: {navigation:any}) => {
    return(
        <View> 
            
            <TouchableOpacity style={styles.touchStyle1}>
                <Text style={styles.textStyle}>Register as Restaurant</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchStyle2}>
                <Text style={styles.textStyle}>Register as Organizatin</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    touchStyle1: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        marginTop: 75, 
        marginRight: 30, 
        marginLeft: 30,
        padding: 50, 
        alignItems: 'center', 
    }, 
    touchStyle2: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        marginTop: 75, 
        marginRight: 30, 
        marginLeft: 30,
        padding: 50, 
        alignItems: 'center', 
    },
    textStyle: {
        fontSize: 20,
    },
});

export default NewUserScreen; 