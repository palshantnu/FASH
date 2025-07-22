import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  FlatList,

} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from '../../../components/src/Scale'
import { backIcon, csvfile,downloadIcon } from "./assets";
interface File {
    id: string;
    attributes: {
      file_name: string;
      file: string;
    };
  }

  import i18n from '../../../components/src/i18n/i18n.config'
  import FlexConditionManage from '../../../components/src/FlexConditionManage'
  import ImageReverseManage from '../../../components/src/ImageReverseManage'
import DownloadTemplatesController, {
  Props,
} from "./DownloadTemplatesController";

// Customizable Area End

export default class DownloadTemplates extends DownloadTemplatesController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }


  // Customizable Area Start
  renderItem: React.FC<{ item: File }> = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <Image source={csvfile} style={styles.csvImage} />
        <Text style={styles.itemText}>{item.attributes.file_name}</Text>
      </View>
      <TouchableOpacity testID="DownloadBtn" style={styles.rightContainer} onPress={() => this.handleDownload(item.attributes.file , item.attributes.file_name)}>
        <Image source={downloadIcon} style={styles.uploadImage} />
      </TouchableOpacity>
    </View>
  );

 renderThelist=()=>{
    return(
        <FlatList
        bounces={false}
        testID={"DownloadTemplates_data_flatlist_list"}
        data={this.state.downloadTemplateList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          !this.state.loading ? (
            <View style={styles.listEmptyContainerInAssign}>
              <Text style={styles.listEmptyContainerTitleTextInAssign}>
              {i18n.t('noDownloadTemplate')}
              </Text>
            </View>
          ) : null
        )}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id}
      />
    )
 }
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.safeContainerInDownload}>
        <View style={styles.containerInDownload}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />

            {this.state.loading && <CustomLoader />}
            <View style={styles.viewContainerDownload}>

                <View style={[styles.headerViewMainAssignDownload,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackAssignstore" style={styles.backTouchAssignsDownload}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAssignDownload,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>

                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitleAssignDonwload}>{i18n.t('downloadTemplate')}</Text>
                    </View>
                    <View></View>
                </View>

                <View style={{ flex: 1 }}>
                   
                {this.renderThelist()}


                </View>
            </View>
        </View>
     </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerInDownload: {
    flex: 1,


},
safeContainerInDownload: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',

},
headerViewMainAssignDownload: {
    flexDirection: 'row',
    marginTop: windowWidth * 3 / 100,
    justifyContent: 'space-between',
    alignContent: 'center'
},
viewContainerDownload: {
    flex: 1,
    alignSelf: 'center',
    width: windowWidth * 90 / 100,
},
backTouchAssignsDownload: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
},
filterIconTouchInAssign: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100
},
backIconCssAssignDownload: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100,
},
headerTitleAssignDonwload: {
    color: '#375280',
    fontSize: windowWidth * 5 / 100,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
},


itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
   height:Scale(72),
    backgroundColor: '#ffffff',
    borderRadius: 2,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical:15,
    marginHorizontal:5
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex:2
  },
  rightContainer: {
  
    flex:1,
    alignItems:"flex-end"
  },
  csvImage: {
    width: Scale(40),
    height: Scale(40),
    marginRight: 10,
  },
  uploadImage:{
    width: Scale(28),
    height: Scale(28),
   
  },

  itemText: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "600"

  },

  listEmptyContainerInAssign: {
    flex: 1,
    width: windowWidth * 90 / 100,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: "70%",
    justifyContent: "center"
},

listEmptyContainerTitleTextInAssign: {
    fontSize: windowWidth * 5 / 100,
    fontFamily: 'Avenir-Heavy',
    color: '#375280'
},


});
// Customizable Area End
