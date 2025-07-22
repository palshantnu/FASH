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
} from "react-native";
import CustomLoader from "../../../components/src/CustomLoader";
import ProgressBar from "../../../components/src/ProgressBar";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import Scale from '../../../components/src/Scale'
import { backIcon, upload, csvfile } from "./assets";

import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import UploadCSVController, {
  Props,
} from "./UploadCSVController";

// Customizable Area End

export default class UploadCSV extends UploadCSVController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }


  // Customizable Area Start
  loadProgress = (prog: string) => {
    return (
      <ProgressBar
        height={8}
        backgroundColor={'#E2E8F0'}
        completedColor={'#375280'}
        percentage={prog}
      />
    )
  }
  // Customizable Area End


  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.safeContainerInUploadCSV}>
        <View style={styles.containerInUploadCSV}>
            <StatusBar backgroundColor="#ffffff" barStyle="dark-content" translucent={false} hidden={false} networkActivityIndicatorVisible={false} />

            {this.state.loading && <CustomLoader />}
            <View style={styles.viewContainerAssignStoreInUploadCSV}>

                <View style={[styles.headerViewMaInUploadCSVStoreInUploadCSV,{flexDirection:FlexConditionManage(i18n.language)}]}>
                    <TouchableOpacity testID="btnBackInCSV" style={styles.backTouchAssignstoreInUploadCSV}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Image resizeMode="contain" source={backIcon} style={[styles.backIconCssAssignstoreInUploadCSV,{transform:[ { scaleX: ImageReverseManage(i18n.language) },{ scaleY: ImageReverseManage(i18n.language) }]}]}></Image>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerTitleAssignstoreInUploadCSV}>{this.state.headerTile}</Text>
                    </View>
                    <View style={styles.filterIconTouchInUploadCSV}>
                    </View>
                </View>

                <View style={styles.imageContainerInUploadCSV}>
                  
                    {this.state.fileURL == '' ?
                      <TouchableOpacity style={styles.emptyImageContainerInUploadCSV}
                      testID="pickCSVfile"
                      onPress={this.pickFile}
                      >
                        <Image style={styles.uploadImgIconViewInUploadCSV} source={upload} />
                        <Text style={styles.uploadTextInUploadCSV}>{this.state.subText}</Text>
                        <Text style={styles.uploadSubTextInUploadCSV}>{i18n.t('csvFile')}</Text>
                      </TouchableOpacity>
                      :
                      <View style={{justifyContent: 'center', width: '92%'}}>
                        <View style={{alignItems: 'center'}}>
                          <Image style={styles.uploadCSVImgIconViewInUploadCSV} source={csvfile} />
                          <Text style={styles.textSucess}>{this.state.percentage} {i18n.t('completed')}</Text>
                        </View>
                        {this.state.percentage == '0%' && 
                          this.loadProgress('0%')
                        }
                        {this.state.percentage == '30%' && 
                          this.loadProgress('30%')
                        }
                        {this.state.percentage == '70%' && 
                          this.loadProgress('70%')
                        }
                        {this.state.percentage == '100%' && 
                          this.loadProgress('100%')
                        }
                      </View>
                    }
                  
                </View>

                {this.state.fileURL !== '' && <TouchableOpacity testID="reUploadCSV" style={styles.buttonInUploadCSV} activeOpacity={0.8} 
                onPress={() => { 
                  this.setState({filename: '', fileURL: '', percentage: '0%'})
                  this.pickFile()
                }}
                >
              <Text style={styles.textInUploadCSV}>{"Reupload CSV file"}</Text>
            </TouchableOpacity>}
            {this.state.percentage == '100%' && <Text style={styles.textSucess}>{i18n.t('csvUploadComplete')}</Text>}

            </View>

            {this.state.fileURL !== ''  && 
            <View style={styles.buttonsContainerUploadCSV}>
              <TouchableOpacity
                  testID="btnBack"
                  style={styles.backButtonUploadCSV}
                  onPress={() => { this.props.navigation.goBack() }}
              >
                  <Text style={styles.backTextInUploadCSV}>{i18n.t('back')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  testID="btnConfirm"
                  style={styles.nextButtonUploadCSV}
                  onPress={this.uploadFile}
              >
                  <Text style={styles.nextButtonTextInUploadCSV}>{i18n.t('confirm')}</Text>
              </TouchableOpacity>
            </View>
            }
        </View>
     </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerInUploadCSV: {
    flex: 1,
  },
  safeContainerInUploadCSV: {
      flex: 1,
      width: "100%",
      backgroundColor: '#fff',
  },
  headerViewMaInUploadCSVStoreInUploadCSV: {
      flexDirection: 'row',
      marginTop: windowWidth * 3 / 100,
      justifyContent: 'space-between',
      alignContent: 'center'
  },
  viewContainerAssignStoreInUploadCSV: {
      flex: 1,
      alignSelf: 'center',
      width: windowWidth * 90 / 100,
  },
  backTouchAssignstoreInUploadCSV: {
      width: windowWidth * 6 / 100,
      height: windowWidth * 6 / 100,
      marginTop: windowWidth * 1 / 100
  },
  filterIconTouchInUploadCSV: {
      width: windowWidth * 6 / 100,
      height: windowWidth * 6 / 100
  },
  backIconCssAssignstoreInUploadCSV: {
      width: windowWidth * 5 / 100,
      height: windowWidth * 5 / 100,
  },
  headerTitleAssignstoreInUploadCSV: {
      color: '#375280',
      fontSize: windowWidth * 5 / 100,
      textAlign: 'center',
      fontFamily: 'Avenir-Heavy'
  },

  emptyImageContainerInUploadCSV: {
    alignItems: "center",
    justifyContent: 'center',
  },
  uploadImgIconViewInUploadCSV: {
    width: Scale(40),
    height: Scale(40)
  },
  uploadCSVImgIconViewInUploadCSV: {
    width: Scale(52),
    height: Scale(52)
  },
  uploadTextInUploadCSV: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(18),
    fontWeight: "700",
    color: '#375280',
    marginTop: 16
  },
  uploadSubTextInUploadCSV: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(14),
    fontWeight: "400",
    color: '#94A3B8',
    alignItems: "center",
    textAlign: "center",
    paddingVertical: Scale(10)
    ,
  },
  buttonInUploadCSV: {
    backgroundColor: "#fff",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#CCBEB1'
  },
  textInUploadCSV: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 26,
    color: '#375280',
    textAlign: 'center'
  },
  textSucess: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 26,
    color: '#375280',
    textAlign: 'center',
    marginTop: 8
  },
  imageContainerInUploadCSV: {
    borderRadius: 2,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: Scale(190),
    marginTop: 32
  },

  buttonsContainerUploadCSV: {
    marginTop: Scale(40),
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 20,
    alignItems: "center",
    width: '90%',
    marginLeft: '5%'   
  },
  backButtonUploadCSV: {
      width: "48%",
      backgroundColor: "#fff",
      height: (windowHeight * 6.5) / 100,

      borderRadius: 2,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#CCBEB1",
  },
  backTextInUploadCSV: {
      color: "#375280",
      textAlign: "center",
      fontFamily: "Lato-Regular",
      fontSize: (windowWidth * 5) / 100,
      fontWeight: "500",
  },
  nextButtonUploadCSV: {
    backgroundColor: "#CCBEB1",
    height: (windowHeight * 6.5) / 100,
    width: "48%",
    borderRadius: 2,
    justifyContent: "center",

  },
  nextButtonTextInUploadCSV: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800",
  },

});
// Customizable Area End
