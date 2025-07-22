import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Modal,
  StatusBar,
  Dimensions
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { backBtn, call, more, selectGallery, send, download } from "./assets";
import Scale, { verticalScale } from "../../../components/src/Scale";
import moment from "moment";
import { OrderRequest, Wishlist } from "./types";
const baseURL = require("../../../framework/src/config.js").baseURL
import i18n from "../../../components/src/i18n/i18n.config";
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ImageReverseManage from '../../../components/src/ImageReverseManage'
import TextAlignManage from '../../../components/src/TextAlignManage'
import { deviceHeight, deviceWidth } from "framework/src/Utilities";
import { placeholderImage } from "../../categoriessubcategories/src/assets";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
import CustomLoader from "../../../components/src/CustomLoader";
// Customizable Area End

import ChatController, { Props, configJSON, IChat } from "./ChatController";

export default class Chat extends ChatController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    moment.locale(i18n.language) 
    // Customizable Area End
  }

  // Customizable Area Start
  renderInputToolBar = () => {
    return (
      <View style={[styles.mainChatView, { flexDirection: FlexConditionManage(i18n.language) }]}>
        <View style={[styles.chatContainer, { flexDirection: FlexConditionManage(i18n.language) }]}>
          <View style={{ width: '85%', flexDirection: FlexConditionManage(i18n.language) }}>
            <TextInput
              testID="typeMessage"
              placeholder={i18n.t("typeMessage")}
              placeholderTextColor="#375280"
              value={this.state.chatScreenMessage}
              onChangeText={(text: string) => { this.renderInputMessage(text) }}
              multiline={true}
              style={[styles.inputStyles, {textAlign: TextAlignManage(i18n.language)}]}
            />
          </View>
          {
            this.state.docIdRes.name === "" ?
          <TouchableOpacity
            onPress={() => { this.openDocumentPicker() }}
            testID="openDocumentPicker"
            style={{ flexDirection: FlexConditionManage(i18n.language) }}>
            <Image
              source={selectGallery}
              resizeMode="contain"
              style={styles.camera}
            />
          </TouchableOpacity> : null
          }
        </View>
        <View style={{ flexDirection: FlexConditionManage(i18n.language) }}>
          <TouchableOpacity
            testID="sendMessage"
            onPress={() => {
             !this.state.isSendEnable && this.sendMessage();
              Keyboard.dismiss();
          }}
          >
            <Image
              source={send}
              style={[styles.send, {transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderChatMessageStringWithAttachment = (attributes: any) => {
    // istanbul ignore next
    return (
      <>
        <View style={[styles.messageContainer, {
          alignSelf: attributes?.role === "sender" ? "flex-end" : "flex-start",
          marginTop: verticalScale(10),
          backgroundColor: attributes?.role !== "sender" ? "#E2E8F0" : "#CCBEB1",
        }]}>
          <Text style={[styles.messageTxt, {
            color: attributes.role !== "sender" ? "#375280" : "#FFFFFF"
          }]}>{attributes.message[0].message}</Text>
          <TouchableOpacity onPress={()=>{this.openAttachment(baseURL + attributes.message[0].url)}} testID="openAttachment">
            {this.renderImage(attributes.message[0].url) ? 
            <View style={{
              borderRadius: 5,
              alignItems: "center",
              marginVertical: 5,
              padding: 5,
              justifyContent: "space-between"}} >

            <Image
              source={{ uri: baseURL + attributes.message[0].url }}
              style={{ width: 100, height: 100 }}
              /> 
              </View>
              : 
            <View style={{backgroundColor: "#375280",flexDirection: "row",
              alignItems: "center",
              borderRadius: 5,
              padding: 5,
              marginVertical: 5,
              justifyContent: "space-between"}} >
              <Text style={{color: "#FFFFFF", textAlign: "center", padding: 10}}>{i18n.t("File")}</Text>
              <Image source={download} style={[styles.call, {}]} />
            </View>
            }
          </TouchableOpacity>
        </View>
      </>
    )
  }

  renderChatMessageString = (attributes: any) => {
    return (
      <>
        <View style={[styles.messageContainer, {
          alignSelf: attributes?.role === "sender" ? "flex-end" : "flex-start",
          marginTop: verticalScale(10),
          backgroundColor: attributes?.role !== "sender" ? "#E2E8F0" : "#CCBEB1",
        }]}>
          <Text style={[styles.messageTxt, {
            color: attributes.role !== "sender" ? "#375280" : "#FFFFFF"
          }]}>{attributes.message}</Text>
        </View>
      </>
    )
  }

  renderChatMessageWishlist = (attributes: any) => {
    const messageObject = attributes.message as Wishlist
    return (
      <View style={[styles.messageContainer, {
        alignSelf: attributes?.role === "sender" ? "flex-end" : "flex-start",
        marginTop: verticalScale(10),
        backgroundColor: attributes?.role !== "sender" ? "#E2E8F0" : "#F7F7F7",
        width: "80%"
      }]}>
        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}>
          {
            messageObject?.catalogues.slice(0, 8).map((items, index) => {
              return (
                <View style={{ marginEnd: index % 4 === 3 ? 0 : 10, marginBottom: 10 }}>
                  <Image source={{ uri: baseURL + items?.images[0] }} style={{ height: this.imageHeight, width: this.imageHeight }} resizeMode="cover" />
                </View>
              )
            })
          }
        </View>
        <TouchableOpacity onPress={() => this.navigateToWishlist()} testID="navigateWishlist">
          <View style={styles.btnView}>
            <Text style={styles.btnTxt}>{i18n.t("exploreWishlist")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  ImageURI = (image : string) => {
    if(image == null || image == '')
      {
        return placeholderImage;
      }else{
        return {uri:baseURL + image};
      }
  }

  renderChatMessageOrderRequest = (attributes: any) => {
    const messageObject = attributes.message as OrderRequest
    return (
      <View style={[styles.messageContainer, {
        alignSelf: attributes?.role === "sender" ? "flex-end" : "flex-start",
        marginTop: verticalScale(10),
        backgroundColor: attributes?.role !== "sender" ? "#E2E8F0" : "#F7F7F7",
        width: "80%"
      }]}>
        <View style={styles.orderManagementContainer}>
          <Image
            source={this.ImageURI(messageObject.product_display_image_url)}
            style={styles.orderImage}
          />
          <Text style={styles.productName}>{messageObject.product_name}</Text>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={styles.orderTitle}>{i18n.t("gender")}</Text>
          <Text style={styles.orderDetails}>{messageObject.gender}</Text>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={styles.orderTitle}>{i18n.t("size")}</Text>
          <Text style={styles.orderDetails}>{messageObject.size}</Text>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={styles.orderTitle}>{i18n.t("colour")}</Text>
          <Text style={styles.orderDetails}>{messageObject.color}</Text>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={styles.orderTitle}>{i18n.t("quantity")}</Text>
          <Text style={styles.orderDetails}>{messageObject.product_quantity}</Text>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={styles.orderTitle}>{i18n.t("pricePerUnit")}</Text>
          <Text style={styles.orderDetails}>{PriceConvertValue(messageObject.price_per_unit,this.state.localCurrency)}</Text>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={styles.orderTitle}>{i18n.t("shippingCost")}</Text>
          <Text style={styles.orderDetails}>{PriceConvertValue(messageObject.shipping_cost,this.state.localCurrency)}</Text>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={styles.orderTitle}>{i18n.t("totalCost")}</Text>
          <Text style={styles.orderDetails}>{PriceConvertValue(messageObject.total_amount,this.state.localCurrency)}</Text>
        </View>

        <TouchableOpacity
          onPress={() => { this.acceptOrderRequest(messageObject) }}
          testID="acceptOrder"
          disabled={this.state.currentUser === "stylist"}>
          <View style={styles.btnView}>
            {
              messageObject.status === "pending" &&
              <Text style={styles.btnTxt}>{i18n.t("acceptAddCart")}</Text>
            }
            {
              messageObject.status === "in_cart" && this.state.currentUser === "stylist" ?
              <Text style={styles.btnTxt}>{i18n.t("orderAccepted")}</Text> : 
              <Text style={styles.btnTxt}>{i18n.t("inCart")}</Text> 
            }
          </View>
        </TouchableOpacity>
      </View>
    )
  }


  renderChatMessagePaymentRequest = (attributes: any) => {
    let formattedMessage = `${attributes.message.data.attributes.chat_message.split(' ')[0]} asked for $${attributes.message.data.attributes.amount} for ${attributes.message.data.attributes.reason}`;
    return (
      <View style={[styles.messageContainer, {
        alignSelf: attributes?.role === "sender" ? "flex-end" : "flex-start",
        marginTop: verticalScale(10),
        backgroundColor: attributes?.role !== "sender" ? "#E2E8F0" : "#F7F7F7",
        width: "80%"
      }]}>
        <Text style={styles.orderDetails}>{formattedMessage}</Text>
        <TouchableOpacity 
          onPress={() => {this.makePaymentApi(attributes?.message?.data?.attributes?.id)}}
          disabled={this.state.currentUser === "stylist"}
          testID="makePayment"
          >
          <View style={styles.btnView}>
            <Text style={styles.btnTxt}>{i18n.t("pay")}{attributes?.message?.data?.attributes?.amount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderChatMessage = (item: any) => {
    if (!item) {
      return null;
    }
  
    const { attributes } = item;
    const timeZone = moment(attributes.created_at).local().format("HH:mm");
  
    const renderTimeZone = () => (
      <Text
        style={[
          styles.timeZ,
          {
            textAlign: attributes.role !== "sender" ? "left" : "right",
            marginHorizontal: Scale(24),
            marginTop: verticalScale(2),
          },
        ]}
      >
        {timeZone}
      </Text>
    );
  
    const renderMessageByType = () => {
      if (typeof attributes.message === "string") {
        return this.renderChatMessageString(attributes);
      }
      if (attributes.message?.wishlist_id) {
        return this.renderChatMessageWishlist(attributes);
      }
      if (attributes.message?.order_request_id) {
        return this.renderChatMessageOrderRequest(attributes);
      }
      if (attributes.message?.data?.type === "stylist_payment_request") {
        return this.renderChatMessagePaymentRequest(attributes);
      }
      if (attributes.message?.[0]?.url) {
        return this.renderChatMessageStringWithAttachment(attributes);
      }
      return null;
    };
  
    return (
      <>
        {renderTimeZone()}
        {renderMessageByType()}
      </>
    );
  };
  

  renderChatMessagesList = () => {
    return (
      <FlatList
        ref={(ref) => this.FlatListRef.current = ref}
        testID="getChatlist"
        data={this.state.chatMessages}
        renderItem={({ item }) => this.renderChatMessage(item)}
        inverted
      />
    )
  }

  renderErrorChatMessagesList = () => {
    return (
      <View style={{ alignItems: "center", alignSelf: "center", justifyContent: 'center', flex:1}}>
        <Text style={styles.errorMsg}>{i18n.t("noChatFound")}</Text>
      </View>
    )
  }

  renderChatComponent = (checkStatus:any) => {
    return (
      checkStatus  === true ?
        this.renderErrorChatMessagesList() 
        :
        this.renderChatMessagesList()
    )
  }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    // istanbul ignore next
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}
          behavior={this.isPlatformAndroid() ? undefined : "padding"}>
          {this.state.loading && <CustomLoader />}
            {/* Header */}
          <View style={[styles.headerView, { flexDirection: FlexConditionManage(i18n.language) }]}>
            <View style={{ flexDirection: FlexConditionManage(i18n.language), }}>
              <TouchableOpacity onPress={() => { this.previousScreen() }} testID="PreviousScreen">
                <Image source={backBtn} style={[styles.backBtn, {
                  transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }],
                }]} />
              </TouchableOpacity>
              <Text style={styles.headerName}>{this.state.receiverName}</Text>
            </View>

            <View style={{ flexDirection: FlexConditionManage(i18n.language) }}>
              <TouchableOpacity onPress={() => { this.makeCall() }} testID="MakeCall">
                <Image source={call} style={[styles.call, {
                  // transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }],
                }]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.moreModalOpen() }} testID="MoreModalOpen">
                <Image source={more} style={[styles.more, {
                  transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }],
                }]} />
              </TouchableOpacity>
            </View>
          </View>

            <View style={styles.bodyView}>
              {
                this.state.loader ?
                  <ActivityIndicator size={"large"} color={"#375280"} />
                  :
                  this.renderChatComponent(this.state.errorMessage)
              }
            </View>
          
          <View style={styles.footerView}>
            {
              this.state.docIdRes.name === "" ?
              null :<View style={styles.selectedFileContainer}>
              <Text style={styles.selectedFileName}>{this.state.docIdRes.name}</Text>
              <TouchableOpacity style={{}} onPress={this.removeFile}>
                <Text style={styles.removeFileIcon}>✕</Text>
              </TouchableOpacity>
            </View>
            }
            {this.renderInputToolBar()}
          </View>

          <Modal
            visible={this.state.moreModal}
            animationType={"slide"}
            transparent={true}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={() => this.modalContainer()} style={styles.modalContainer} testID="ModalContainer" />
              <View style={styles.modalViewContainer}>
                {
                  this.state.currentUser === "stylist" ?
                    <View>
                      <TouchableOpacity onPress={() => { this.sendOrderRequest() }} testID="sendOrderRequest" >
                        <Text style={[styles.reportPerson, {textAlign: TextAlignManage(i18n.language)}]}>{i18n.t('sendOrderRequest')}</Text>
                      </TouchableOpacity>
                      <View style={styles.modalLine} />

                      <TouchableOpacity onPress={() => { this.paymentRequestNavigation() }} testID="paymentRequest" >
                        <Text style={[styles.blockPerson, {textAlign: TextAlignManage(i18n.language)}]}>{i18n.t('sendPaymentRequest')}</Text>
                      </TouchableOpacity>
                      <View style={styles.modalLine} />

                      <TouchableOpacity onPress={() => { this.sendMessage(true) }} testID="sendMessage2">
                        <Text style={[styles.blockPerson, {textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("shareWishlist")}</Text>
                      </TouchableOpacity>
                      <View style={styles.modalLine} />

                      <TouchableOpacity onPress={() => { this.reportPersonFn() }} testID="ReportPersonFn">
                        <Text style={[styles.reportPerson, {textAlign: TextAlignManage(i18n.language)}]}>{i18n.t("reportPerson")}</Text>
                      </TouchableOpacity>
                      <View style={styles.modalLine} />

                      
                      <TouchableOpacity onPress={() => { this.blockModalOpen() }} testID="BlockModalOpen">
                        <Text style={[styles.blockPerson, {textAlign: TextAlignManage(i18n.language)}]}>{this.state.isBlock ? i18n.t("unBlock") : i18n.t("block")}</Text>
                      </TouchableOpacity>
                      <View style={styles.modalLine} />

                    </View>
                    :
                    <View>
                      <TouchableOpacity onPress={() => { this.reportPersonFn() }} testID="ReportPersonFn">
                        <Text style={styles.reportPerson}>{i18n.t("reportPerson")}</Text>
                      </TouchableOpacity>

                      <View style={styles.modalLine} />

                      <TouchableOpacity onPress={() => { this.blockModalOpen() }} testID="BlockModalOpen">
                        <Text style={styles.blockPerson}>{this.state.isBlock ? i18n.t("unBlock") : i18n.t("block")}</Text>
                      </TouchableOpacity>
                    </View>
                }
              </View>
            </View>
          </Modal>

          <Modal
            visible={this.state.blockModal}
            animationType={"slide"}
            transparent={true}>
            <View style={styles.blockModalContainer}>
              <View style={styles.blockModalViewContainer}>

                <Text style={styles.blockHeader}>{this.state.isBlock ? i18n.t("unBlockPerson") : i18n.t("blockPerson")}</Text>
                <View style={styles.modalLine} />
                <Text style={styles.blockConfirm}>{this.state.isBlock ? i18n.t("unBlockPersonQuestion") : i18n.t("blockPersonQuestion")}</Text>

                <View style={{ borderWidth: 0.6, borderColor: "#D5D5D5" }} />
                <View style={styles.btnContainer}>
                  <TouchableOpacity onPress={() => { this.closeBlockModal() }} testID="CloseBlockModal">
                    <View style={styles.close}>
                      <Text style={styles.closeTxt}>{i18n.t("close")}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.blockApiCall() }} testID="BlockApiCall">
                    <View style={styles.block}>
                      <Text style={styles.blockTxt}>{this.state.isBlock ? i18n.t("unBlock") : i18n.t("block")}</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            testID="documentPickerModal"
            visible={this.state.documentPickerModal}>
            <View style={styles.modalMainViewDoc}>
              <SafeAreaView style={styles.modalSafeDoc}></SafeAreaView>
              <View style={styles.docModalMainViewAdd}>
                <View style={styles.modalSecondViewDoc}>
                  <TouchableOpacity
                    testID={"btn_camera"}
                    style={styles.optionModalTouchAdd} activeOpacity={0.9} onPress={() => { this.CameraDocOpen() }}>
                    <View style={styles.optionModalViewAdd}>
                      <Text style={styles.optionModalTextAdd}>{i18n.t('cameraText')}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    testID={"btn_gallery"}
                    style={[styles.optionModalTouchAdd, { marginTop: 10 }]} onPress={() => { this.openImageFile() }}>
                    <View style={styles.optionModalViewAdd}>
                      <Text style={styles.optionModalTextAdd}>{i18n.t('Attachment')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.optionModalCancelViewAdd}>
                  <TouchableOpacity
                    testID={"btn_cancelMedia"}
                    onPress={() => { this.setState({ documentPickerModal: false }) }} style={styles.docModalCancelTouch}>
                    <Text style={styles.docModalCancelTextAdd}>{i18n.t('cancelText')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            visible={this.state.isLoading}
            animationType={"slide"}
            transparent={true}>
            <View style={styles.loaderModalContainer}>
              <ActivityIndicator size={"large"} color={"#375280"} />
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  headerView: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Scale(24),
    paddingVertical: verticalScale(10)
  },
  fullScreen: {
    height: deviceHeight,
    width: deviceWidth
  },
  webView: {
    width: deviceWidth,
    height: deviceHeight - (StatusBar.currentHeight ?? 0),
    flex: 1,
  },
  backBtn: {
    height: 24,
    width: 12,
    
  },
  headerName: {
    fontSize: 18,
    fontFamily: "Lato-Regular",
    fontWeight: '500',
    color: "#375280",
    marginHorizontal: Scale(26),
    textAlign: "center"
  },
  call: {
    height: 24,
    width: 24,
    marginHorizontal: Scale(24),
  },
  more: {
    height: 24,
    width: 24,
  },
  bodyView: {
    flex: 2,
  },
  footerView: {
    paddingVertical: verticalScale(10),
    justifyContent: "flex-end"
  },
  inputStyles: {
    fontSize: 18,
    fontFamily: "Lato-Regular",
    marginLeft: Scale(15),
    marginBottom: Platform.OS === "ios" ? Scale(5) : Scale(-2),
    flex: 1,
    color: "#375280",
    fontWeight: "400",
  },
  camera: {
    height: 24,
    width: 24,
    marginVertical: Scale(12),
    marginRight: Scale(10),
    tintColor: "#375280",
    transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }],
  },
  send: {
    height: 40,
    width: 40,
    tintColor: '#375280',
    marginTop: verticalScale(5),
  },
  mainChatView: {
    flexDirection: 'row',
    marginBottom: Scale(30),
    marginHorizontal: Scale(20),
    justifyContent: "space-between"
  },
  chatContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    height: 50,
    marginBottom: Scale(-10),
    padding: Scale(5),
    justifyContent: "space-between",
    width: "85%",
    borderRadius: 10,
    borderColor: "#F1F5F9"
  },
  messageContainer: {
    padding: Scale(12),
    marginTop: verticalScale(5),
    marginHorizontal: Scale(24),
    borderWidth: 0.1
  },
  messageTxt: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
    fontWeight: "400"
  },
  timeZ: {
    fontSize: 12,
    fontFamily: "Lato-Regular",
    color: "#8A91A8",
    fontWeight: "400",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalViewContainer: {
    backgroundColor: "#FFFFFF",
  },
  modalLine: {
    borderWidth: 1,
    borderColor: "#D5D5D5",
    marginHorizontal : 20
  },
  reportPerson: {
    fontSize: 18,
    fontFamily: "Lato",
    color: "#375280",
    fontWeight: "500",
    marginHorizontal: Scale(24),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  blockPerson: {
    fontSize: 18,
    fontFamily: "Lato",
    color: "#375280",
    fontWeight: "500",
    marginHorizontal: Scale(24),
    marginTop: verticalScale(16),
    marginBottom: verticalScale(20),
  },
  blockModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderModalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  blockModalViewContainer: {
    backgroundColor: "#FFFFFF",
    height: 260,
  },
  blockHeader: {
    fontSize: 20,
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontWeight: "800",
    textAlign: "center",
    marginVertical: verticalScale(16)
  },
  blockConfirm: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: verticalScale(20)
  },
  btnContainer: {
    flexDirection: "row",
    marginHorizontal: Scale(24),
    marginTop: verticalScale(20),
    justifyContent: "space-between"
  },
  close: {
    borderWidth: 1,
    borderColor: "#CCBEB1",
    paddingVertical: Scale(15),
    paddingHorizontal: Scale(60)
  },
  closeTxt: {
    fontSize: 20,
    fontFamily: "Lato-Regular",
    color: "#375280",
    fontWeight: "500",
    textAlign: "center"
  },
  block: {
    borderWidth: 1,
    borderColor: "#CCBEB1",
    backgroundColor: "#CCBEB1",
    paddingVertical: Scale(15),
    paddingHorizontal: Scale(60)
  },
  blockTxt: {
    fontSize: 20,
    fontFamily: "Lato-Regular",
    color: "#FFFFFF",
    fontWeight: "800",
  },
  errorMsg: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(24),
    color: "#94A3B8",
    textAlign: "center",
    fontWeight: "500"
  },
  orderManagementContainer: {
    flexDirection: "row"
  },
  orderImage: {
    height: 44,
    width: 44,
    resizeMode: "cover",
  },
  productName: {
    fontSize: 14,
    fontFamily: "Lato-Bold",
    color: "#375280",
    marginLeft: Scale(12),
    alignSelf: "center"
  },
  orderDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(12)
  },
  orderTitle: {
    fontSize: 16,
    fontFamily: "Lato",
    fontWeight: "400",
    color: "#375280"
  },
  selectedFileContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "76%",
    marginLeft: Scale(20),
    backgroundColor: "#E2E8F0",
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
    justifyContent: "space-between"
  },
  selectedFileName: {
    flex: 1,
    fontSize: 14,
    color: "#375280",
  },
  removeFileIcon: {
    fontSize: 14,
    color: "#375280",
  },
  orderDetails: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
    fontWeight: "600",
    color: "#375280"
  },
  btnView: {
    backgroundColor: "#C7B9AD",
    padding: 20,
    marginBottom: verticalScale(12),
    marginTop: verticalScale(24)
  },
  btnTxt: {
    fontSize: 18,
    fontFamily: "Lato-Regular",
    fontWeight: '800',
    color: "#FFFFFF",
    textAlign: "center"
  },
  uploadButtonText:{
    color:'#fff',
    textAlign:'center',
    fontFamily:'Lato-Black',
    fontSize:windowWidth*5/100
  },
  btnUploadButton:{
    backgroundColor:'#CCBEB1',
    width:windowWidth*90/100,
    height:windowHeight*6/100,
    borderRadius:2,
    justifyContent:'center',
    alignSelf:'center',
    position:'absolute',
    bottom:windowWidth*8/100
  },
  uploadStoreImageView:{
    width:windowWidth*90/100,
    height:windowHeight*20/100,
    backgroundColor:'#F8F8F8',
    borderRadius:3,
    justifyContent:'center',
    alignItems:'center'
  },
  exportIcon:{
    width:windowWidth*10/100,
    height:windowWidth*10/100
  },
  exportText:{
    color:'#375280',
    fontFamily:'Lato-Bold',
    fontSize:windowWidth*4/100,
    marginTop:windowWidth*3/100
  },
  errorView:{
    marginTop:windowWidth*1/100
  },
  errorTextUploadDoc:{
    color:'#F87171',
    fontFamily:'Lato-Regular',
    fontSize:windowWidth*3.9/100
  },
  optionModalTouchAdd:{
    width:'100%',
    alignSelf:'center',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  optionModalViewAdd:{
    width:'94%',
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    paddingVertical:windowWidth*3.5/100
  },
  optionModalTextAdd:{
    textAlign:'center', 
    fontSize: windowWidth*4/100, 
    color:'#000000'
  },
  optionModalCancelViewAdd:{
    marginTop: 15, 
    alignSelf: 'center', 
    borderRadius: 15, 
    backgroundColor: '#0061A7', 
    width: '94%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  docModalCancelTouch:{
    alignSelf: 'center',  
    width: '94%',  
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical:windowWidth*3.5/100
  },
  docModalCancelTextAdd:{
    fontSize: windowWidth*4/100, 
    color:'#FFFFFF'
  },
  modalMainViewDoc:{
    flex: 1, 
    backgroundColor: '#00000030', 
    alignItems: 'center'
  },
  docModalMainViewAdd:{
    position: 'absolute', 
    bottom:windowHeight*3/100,
    width:windowWidth
  },
  modalSecondViewDoc:{
    alignSelf: 'center',
    width:'100%'
  },
  modalSafeDoc:{
    flex:0
  },
});
// Customizable Area End
