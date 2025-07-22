import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backIcon } from "./assets";
import AdvancesSearchFilterBuyerController, { Props } from "./AdvancesSearchFilterBuyerController";
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End


export default class AdvancesSearchFilterBuyer extends AdvancesSearchFilterBuyerController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

    // Customizable Area Start
    // Customizable Area End

  render() {
    // Customizable Area Start
    return (
            <View style={styles.mainContainer}>
                <SafeAreaView style={styles.safeContainer}/>
                <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
                {this.state.loading && <CustomLoader />}
                <View style={styles.container}>
                    <View style={styles.headerViewFilter}>
                        <TouchableOpacity testID="btnBackFilter" style={styles.backTouchFilter} onPress={()=>{this.props.navigation.goBack()}}>
                            <Image resizeMode="contain" source={backIcon} style={styles.backIconCssFilter}></Image>
                        </TouchableOpacity> 
                        <View>
                            <Text style={styles.headerTitleFilter}>Filters</Text>
                        </View>
                        <TouchableOpacity style={styles.filterClearAllTouch}>
                            <Text style={styles.clearText}>Clear All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
    searchTextinput:{
        width:windowWidth*80/100,
        height:windowHeight*6/100,
        padding:10,
        color:'#000000',
        marginLeft:windowWidth*7/100
    },
    mainContainer:{
        flex:1,
        backgroundColor:'#ffffff'
    },
    safeContainer:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    container:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewFilter:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:windowWidth*3/100,
        alignContent:'center'
    },
    backTouchFilter:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssFilter:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleFilter:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterClearAllTouch:{
        width:windowWidth*16/100,
    },
    clearText:{
        color:'#375280',
        fontFamily:'Lato-Regular',
        fontWeight:'500',
        fontSize:windowWidth*3.9/100
    },
});
// Customizable Area End
