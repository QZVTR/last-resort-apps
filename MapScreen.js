import React, {useState} from "react";
import {StyleSheet, Text, View, Dimensions, Button} from "react-native";
import Map from "./Map";

const MapScreen = (props) => {
    return (
        <View style={styles.container}>
            <View>                
                <Map latitude={props.latitude} longitude={props.longitude}/>
                </View>
            </View>
        )
}


export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
});