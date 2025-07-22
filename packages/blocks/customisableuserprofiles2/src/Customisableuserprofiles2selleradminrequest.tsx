import React from "react";

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList
} from "react-native";

import { backIcon } from "./assets";
// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Customisableuserprofiles2selleradminrequestController, {
  Props
} from "./Customisableuserprofiles2selleradminrequestController";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import i18n from '../../../components/src/i18n/i18n.config';
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import CustomLoader from "../../../components/src/CustomLoader";
import globalStyle from "../../../components/src/GlobalStyle"
import ImageNotFound from "../../../components/src/ImageNotFound";
// Customizable Area End

export default class Customisableuserprofiles2selleradminrequest extends Customisableuserprofiles2selleradminrequestController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        {this.state.loading && <CustomLoader></CustomLoader>}
            <SafeAreaView style={{flex:0}}/>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" hidden={false} translucent={false} networkActivityIndicatorVisible={false}/>
            <View style={[{flexDirection:FlexConditionManage(i18n.language)},styles.headerViewAdmin,globalStyle.headerMarginManage]}>
                <TouchableOpacity testID="btnBackAdminRequest" style={styles.backTouchAdmin} onPress={()=>{this.props.navigation.goBack()}}>
                    <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAdmin,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                </TouchableOpacity> 
                <View>
                    <Text style={styles.headerTitleAdmin}>{i18n.t('adminRequestText')}</Text>
                </View>
                <View style={styles.filterTouchAdmin}>
                </View>
            </View>

            <View style={styles.mainViewContainerAdmin}>
                <FlatList
                    testID="adminRequestFlatData"
                    data={this.state.adminRequestArr}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    style={styles.marginManage}
                    ItemSeparatorComponent={() => <View style={styles.itemSepratorAdmin} />}
                    contentContainerStyle={styles.flatPaddingManage}
                    ListEmptyComponent={() => (!this.state.loading ? 
                    <View style={styles.flatlistEmptyMainViewAdmin}>
                        <Text style={styles.flatlistEmptyTextAdmin}>{i18n.t('noRecordFoundText')}</Text>
                    </View>
                    : null)}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={[styles.adminMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                <View style={[styles.storeImageTextView,{flexDirection:FlexConditionManage(i18n.language)}]}>
                                    <Image resizeMode="cover" style={styles.storeImage} source={ImageNotFound(item.attributes.image)}></Image>
                                    <Text style={[styles.adminStoreText,{marginLeft:ManageDynamicMargin(i18n.language,0,windowWidth*4/100),marginRight:ManageDynamicMargin(i18n.language,windowWidth*4/100,0)}]}>{item.attributes.store_name}</Text>
                                </View>
                                <View style={item.attributes.status === 'Pending'? styles.statusPendingViewAdmin : styles.statusApprovedViewAdmin}>
                                    <Text numberOfLines={1} style={item.attributes.status === 'Pending'?styles.adminRequestPendingText:styles.adminRequestDesText}>{item.attributes.status}</Text>
                                    </View>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}


// Customizable Area Start
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#ffffff'
    },
    headerViewAdmin:{
        justifyContent:'space-between',
        alignContent:'center',
        width:windowWidth*90/100,
        alignSelf:'center'
    },
    backTouchAdmin:{
        width:windowWidth*6/100,
        height:windowWidth*6/100,
        marginTop:windowWidth*1/100
    },
    backIconCssAdmin:{
        width:windowWidth*5/100,
        height:windowWidth*5/100
    },
    headerTitleAdmin:{
        color:'#375280',
        fontSize:windowWidth*5/100,
        textAlign:'center',
        fontFamily:'Avenir-Heavy'
    },
    filterTouchAdmin:{
        width:windowWidth*6/100,
        height:windowWidth*6/100
    },
    adminMainView:{
      alignItems: 'center',
      justifyContent:'space-between',
      padding:5,
      height:windowHeight*7/100
    },
    adminStoreText:{
      alignItems: 'center',
      fontSize: windowWidth *4/100,
      fontWeight:'500',
      color:'#375280',
      fontFamily:'Lato-Regular'
    },
    mainViewContainerAdmin:{
      width:windowWidth*90/100,
      alignSelf:'center',
      marginTop:windowWidth*4/100
    },
    flatlistEmptyMainViewAdmin:{
      width:windowWidth*90/100,
      alignSelf:'center',
      alignItems:'center',
      marginTop:windowHeight*30/100
    },
    flatlistEmptyTextAdmin:{
      fontSize:windowWidth*5/100,
      fontFamily:'Avenir-Heavy',
      color:'#375280'
    },
    statusPendingViewAdmin:{
        backgroundColor:'#FEF3C7',
        width:windowWidth*20/100,
        padding:5,
        borderRadius:5,
        alignItems:'center'
    },
    statusApprovedViewAdmin:{
        backgroundColor:'#D1FAE5',
        width:windowWidth*20/100,
        padding:5,
        borderRadius:5,
        alignItems:'center',
        marginTop:windowWidth*2/100
    },
    adminRequestDesText:{
        color:'#059669',
        fontSize:windowWidth*3.5/100,
        fontFamily:'Lato-Regular',
        fontWeight:'500'
    },
    adminRequestPendingText:{
        color:'#D97706',
        fontSize:windowWidth*3.5/100,
        fontFamily:'Lato-Regular',
        fontWeight:'500'
    },
    itemSepratorAdmin:{
        borderWidth:1,
        borderColor:'#D9D9D9',
    },
    storeImage:{
        width:windowWidth*8/100,
        height:windowWidth*8/100,
        borderRadius:windowWidth*8/100
    },
    storeImageTextView:{
        width:windowWidth*70/100,
        alignItems:'center'
    },
    marginManage:{
        marginTop:windowWidth*2/100
    },
    flatPaddingManage:{
        paddingBottom: 200
    }
});
// Customizable Area End
