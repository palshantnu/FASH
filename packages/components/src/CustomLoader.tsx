import React, { Component } from "react";
// Customizable Area Start
import { View, Dimensions, ActivityIndicator,StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// Customizable Area End

export class CustomLoader extends Component {
    // Customizable Area Start
    render() {
        return (
            <View
            style={styles.modalMainViewContainer}
            >
                <View style={styles.loaderIcon} testID="custom-loader">
                    <ActivityIndicator size="small" color="#ffffff" />
                </View>
            </View>
        );
    }
    // Customizable Area End
}

// Customizable Area Start
const styles = StyleSheet.create({
    modalMainViewContainer:{
        zIndex: 9999999,
        height: windowHeight,
        width: windowWidth,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        alignSelf: "center",
    },
    loaderIcon:{
        backgroundColor: '#375280', 
        padding: 15, 
        borderRadius: 10,
    }
})
// Customizable Area End

export default CustomLoader;
