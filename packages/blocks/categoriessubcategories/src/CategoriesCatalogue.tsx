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
import { backIcon,categories,stores} from "./assets";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import CategoriesCatalogueController, { Props } from "./CategoriesCatalogueController";
// Customizable Area End


export default class CategoriesCatalogue extends CategoriesCatalogueController {
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
                <View style={styles.container}>
                    <View style={[styles.headerViewCate,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <TouchableOpacity testID="btnBackCatalogue" style={styles.backTouchCateCata} onPress={()=>{this.redirectGoHome()}}>
                            <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssN,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                        </TouchableOpacity> 
                        <View>
                            <Text style={styles.headerTitleCatCata}>{i18n.t('catalogueText')}</Text>
                        </View>
                        <View style={styles.filterExtraViewTouch}>
                        </View>
                    </View>

                    <View style={[styles.dataContainerView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                        <TouchableOpacity testID="btnCategoryRedirect" style={styles.categoryTouch} onPress={()=>this.categoryStoreRedirection('category')}>
                            <Image source={categories} style={styles.catalogeIcons}></Image>
                            <View style={styles.overlayView}></View>
                            <View style={styles.textView}>
                                <Text style={styles.categoryText}>{i18n.t('categoriesText')}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity testID="btnStoreRedirect" style={styles.categoryTouch} onPress={()=>this.categoryStoreRedirection('store')}>
                            <Image source={stores} style={styles.catalogeIcons}></Image>
                            <View style={styles.overlayView}></View>
                            <View style={styles.textView}>
                                <Text style={styles.categoryText}>{i18n.t('stores')}</Text>
                            </View>
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
    safeContainer:{
        flex:0,
        backgroundColor:'#ffffff'
    },
    mainContainer:{
        flex:1,
        backgroundColor:'#ffffff'
    },
    container:{
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    headerViewCate:{
        justifyContent:'space-between',
        marginTop:windowWidth*3/100,
        alignContent:'center'
    },
    backTouchCateCata:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssN:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    filterIconCssN:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    headerTitleCatCata:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterExtraViewTouch:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },

    overlayView:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'rgba(0, 0, 0, 0.4)',
        height:windowHeight*20/100
    },
    textView:{
        position:'absolute',
        marginTop:windowHeight*8/100,
        alignSelf:'center'
    },
    dataContainerView:{
        justifyContent:'space-between',
        marginTop:windowWidth*6/100
    },
    categoryTouch:{
        width:windowWidth*43/100,
        height:windowHeight*21/100
    },
    catalogeIcons:{
        width:windowWidth*43/100,
        height:windowHeight*20/100
    },
    categoryText:{
        color:'#ffffff',
        textAlign:'center',
        fontSize:windowWidth*5/100,
        fontFamily:'Lato-Regular',
        fontWeight:'500'
    }
});
// Customizable Area End
