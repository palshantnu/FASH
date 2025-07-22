import React from "react";
// more core import statements

// Customizable Area Start
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native"
import Scale from '../../../components/src/Scale'

import CustomLoader from "../../../components/src/CustomLoader";
import { backIcon, cancel, errorIcon } from "./assets";
import { MultiSelect } from "react-native-element-dropdown";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import i18n from "../../../components/src/i18n/i18n.config";
import TextAlignManage from "../../../components/src/TextAlignManage";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import {Variant } from "./VarientsController"
// Customizable Area End

import VarientsController, {
  Props
} from "./VarientsController";

export default class Varients extends VarientsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderVariantTextInput = (testid: string, value: string, moblKeyboard: any, onChangeText:any, isSku?: boolean,) => {
    const handleVariantTextChange = (text: string) => {
     
      const filteredText = text.replace(/[^a-zA-Z0-9]/g, '');
      onChangeText(filteredText); 
    };
    return (
      <TextInput
        testID={testid}
        placeholder='-'
        placeholderTextColor='#375280'
        style={[styles.blockSunContent, { width: isSku ? Scale(80) : Scale(58) }]}
        value={value}
        maxLength={40}
        autoCapitalize="none"
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        onChangeText={handleVariantTextChange}
        keyboardType={moblKeyboard} />
    );
  }

  renderPriceInput = (testid: string, value: string, moblKeyboard: any, onChangeText:any, isSku?: boolean,) => {
    const handlePriceChange = (text: string) => {
      // Allow only digits and decimal points
      const filteredText = text.replace(/[^0-9.]/g, '');
    
      // Ensure only one decimal point
      const parts = filteredText.split('.');
    
      // If there's a decimal point, limit the digits after it to a maximum of 2
      const validText = parts.length > 1
        ? parts[0] + '.' + parts[1].slice(0, 2) // Keep only the first two digits after the decimal
        : filteredText;
    
      onChangeText(validText); 
    };    
    
    return (
      <TextInput
        testID={testid}
        placeholder='-'
        placeholderTextColor='#375280'
        style={[styles.blockSunContent, { width: isSku ? Scale(80) : Scale(58) }]}
        value={value}
        maxLength={40}
        autoCapitalize="none"
        onSubmitEditing={Keyboard.dismiss}
        onChangeText={handlePriceChange}
        keyboardType={moblKeyboard} />
    );
  }

  renderEmptyVariantTextInput = (testid: string, value: string, isSku?: boolean,) => {
  
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center',}} onPress={this.handleTextEmptyInputBox}>
      <TextInput
        testID={testid}
        editable={false}
        placeholder='-'
        placeholderTextColor='#375280'
        style={[styles.blockSunContent, { width: isSku ? Scale(80) : Scale(58) }]}
        value={value}
        autoCapitalize="none"
        />
        </TouchableOpacity>
    );
  }

  renderVariantListContainer = () => {
    return this.state.variants.map((item:Variant , index: number) => (
      <View key={index} style={[styles.variantBodyContainer,{flexDirection: FlexConditionManage(i18n.language)}]}>
        <View>
          <Text style={[styles.numberings,{textAlign: TextAlignManage(i18n.language)}]}>{index + 1}. {item.variant_size} / {item.variant_color}</Text>
        </View>
        <View style={{ marginLeft: Scale(15) }}>
          {this.renderVariantTextInput(`txtInputQuantity${index}`, item.stock_qty ? item.stock_qty.toString() : '', "number-pad", (text: string) => this.updateVariantProperty(index, 'stock_qty', text))}
        </View>
        <View style={{ marginLeft: Scale(19) }}>
          {this.renderPriceInput(`txtInputPrice${index}`, item.price ? item.price.toString() : '', "decimal-pad", (text: string) => this.updateVariantProperty(index, 'price', text))}
        </View>
        <View style={{ marginLeft: Scale(22) }}>
          {this.renderVariantTextInput(`txtInputsku${index}`, item.sku ? item.sku.toString() : '', "default", (text: string) => this.updateVariantProperty(index, 'sku', text), true)}
        </View>
      </View>
    ));
  }

  renderEmptyVarientContainer = () => (
    <View style={[styles.variantBodyContainer,{flexDirection: FlexConditionManage(i18n.language)}]}>
      <View>
        <Text style={[styles.numberings,{textAlign: TextAlignManage(i18n.language)}]}>1. -</Text>
      </View>
      <View style={{ marginLeft: Scale(25) }}>
        {this.renderEmptyVariantTextInput("txtInputQuantity", this.state.quantity, )}
      </View>
      <View style={{ marginLeft: Scale(19) }}>
        {this.renderEmptyVariantTextInput("txtInputPrice", this.state.price, )}
      </View>
      <View style={{ marginLeft: Scale(22) }}>
        {this.renderEmptyVariantTextInput("txtInputsku", this.state.sku, true)}
      </View>

    </View>
  )
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { errorMsg } = this.state;
    // Merge Engine - render - Start
    return (
      <SafeAreaView style={styles.safeContainerVarients}>
       
        <View style={styles.containerVarients}>
          <StatusBar backgroundColor="#ffffff" hidden={false} barStyle="dark-content" translucent={false} networkActivityIndicatorVisible={false} />
          {this.state.loading && <CustomLoader />}
          <View style={styles.varientViewContainer}>
            <View style={styles.headerViewMainVarients}>
              <TouchableOpacity testID="btnBackCatalogue" style={styles.backTouchCatalogue} onPress={() => { this.props.navigation.goBack() }}>

                <Image source={backIcon} resizeMode="contain" style={styles.backIconCssVarients}></Image>

              </TouchableOpacity>
              <View>
                <Text style={styles.headerTitleCatalogue}>{i18n.t('varients')}</Text>
              </View>
              <TouchableOpacity style={styles.filterIconTouch}>
              </TouchableOpacity>
            </View>
            <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={{flex:1}}
        keyboardVerticalOffset={64}
      >
            <ScrollView bounces={false} keyboardShouldPersistTaps="always"  >
              <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>
                <View>
                  <View>
                    <View style={styles.fieldContainer}>
                      <Text style={styles.nameText}>{i18n.t('varientSize')}</Text>
                      <MultiSelect
                        testID="btnVariantSize"
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={[styles.iconStyle,{
                          position:"absolute",
                          right:ManageDynamicMargin(i18n.language,undefined,0),
                          left:ManageDynamicMargin(i18n.language,0,undefined)
                        }]}
                        data={this.state.sizeList}
                        itemTextStyle={styles.selectedTextStyle}
                        labelField="label"
                        valueField="value"
                        placeholder={i18n.t('selectSize')}
                        value={this.state.sizeSelected}
                        onFocus={this.fetchTheSizeList}
                        onChange={item => {
                          this.setState({ sizeSelected: item }, () => {
                            this.checkCreateVariantButtonStatus();
                          });
                        }}
                        renderSelectedItem={(item, unSelect) => (
                          <TouchableOpacity testID={item.label} onPress={() => unSelect && unSelect(item)}>
                            <View style={styles.selectedStyle}>
                              <Text style={styles.selectedTextStyle}>{item.label}</Text>
                              <Image style={{ height: 16, width: 16 }} source={cancel} />
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                      <Text style={styles.multitext}>{i18n.t('seperateValue')}</Text>
                    </View>

                    <View style={styles.fieldContainer}>
                      <Text style={styles.nameText}>{i18n.t('varientColor')}</Text>
                      <MultiSelect
                        testID="btnVariantColor"
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={[styles.iconStyle,
                          {
                            position:"absolute",
                            right:ManageDynamicMargin(i18n.language,undefined,0),
                            left:ManageDynamicMargin(i18n.language,0,undefined)
                          }
                        ]}
                        data={this.state.colorList}
                        itemTextStyle={styles.selectedTextStyle}
                        labelField="label"
                        valueField="value"
                        placeholder={i18n.t('selectVarientColor')}
                        onFocus={this.fetchTheColorList}
                        value={this.state.colorSelected}
                        onChange={item => {
                          this.setState({ colorSelected: item }, () => {
                            this.checkCreateVariantButtonStatus();
                          });
                        }}
                        renderSelectedItem={(item, unSelect) => (
                          <TouchableOpacity testID="selectColor" onPress={() => unSelect && unSelect(item)}>
                            <View style={styles.selectedStyle}>
                              <Text style={styles.selectedTextStyle}>{item.label}</Text>
                              <Image style={{ height: 16, width: 16 }} source={cancel} />
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                      <Text style={styles.multitext}>{i18n.t('seperateValue')}</Text>
                    </View>
                    {errorMsg.errorHeader.length > 1 && <View style={styles.errorMsgContainer}>
                      <Image source={errorIcon} style={styles.errorIcon} />
                      <View style={styles.errorTextContainer}>
                        <Text style={styles.errorHeading}>{errorMsg.errorHeader}</Text>
                        <Text style={styles.errorDescription}>{errorMsg.errorTitle}</Text>
                      </View>
                    </View>}
                    <TouchableOpacity testID="createBtn" disabled={this.state.isVariantButtonDisabled} style={styles.button} activeOpacity={0.8} onPress={this.handleCreateTheVariantls}>
                      <Text style={[styles.varianttext, { color: this.state.isVariantButtonDisabled ? '#94A3B8' : '#375280' }]}>
                        {this.state.variants.length > 0 ? i18n.t('updateVariant') : i18n.t('createVariant')}
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.variantcontentText}>{i18n.t('youCanCretae')}</Text>
                  </View>
                </View>

              </TouchableWithoutFeedback>
              <View style={styles.variantsTextContainer}>
                <View style={[styles.variantBoxView,{flexDirection: FlexConditionManage(i18n.language)}]}>
                  <Text style={styles.blockDetailTitle}>{i18n.t('varientdetail')}</Text>
                  <Text style={styles.blockDetailTitle}>{this.state.variants.length}/30</Text>
                </View>
                <View style={styles.seperator} />

               
                <ScrollView horizontal={true} contentContainerStyle={styles.variantContainer}>
                  <View style={styles.VarientSubcontainerMain}>
                    <View style={[styles.headerContainer,{flexDirection: FlexConditionManage(i18n.language)}]}>
                      <Text style={[styles.blockSubTitleMain, { }]}>{i18n.t('varient')}</Text>
                      <Text style={[styles.blockSubTitleMain,{marginRight:ManageDynamicMargin(i18n.language,40,undefined),marginLeft:ManageDynamicMargin(i18n.language,undefined,40)}]}>{i18n.t('quantity')}</Text>
                      <Text style={styles.blockSubTitleMain}>{i18n.t('price')}</Text>
                      <Text style={styles.blockSubTitleMain}>{i18n.t('sku')}</Text>
                    </View>


                    {this.state.variants.length > 0 ? this.renderVariantListContainer() : this.renderEmptyVarientContainer()}

                  </View>
                </ScrollView>
               
               
              </View>


              <TouchableWithoutFeedback onPress={() => this.hideKeyboard()}>

              <View style={[styles.buttonsContainerAddProducts,{flexDirection: FlexConditionManage(i18n.language)}]}>
                <TouchableOpacity testID="btnBack"
                  style={styles.backButtonAddProducts}
                  onPress={() => { this.props.navigation.navigate('AddProduct') }}>
                  <Text style={styles.backText}>{i18n.t('back')}</Text>
                </TouchableOpacity>

                <TouchableOpacity testID="btnNext"
                  style={styles.nextButtonAddproducts}
                  onPress={this.handleAllTheValidation}>
                  <Text style={styles.nextButtonText}>{i18n.t('next')}</Text>
                </TouchableOpacity>
              </View>

              </TouchableWithoutFeedback>


            </ScrollView>
            </KeyboardAvoidingView>

          </View>

        </View>

      </SafeAreaView>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  containerVarients: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  safeContainerVarients: {
    height: "100%",
    backgroundColor: '#fff',
    width: "100%",
  },
  varientViewContainer: {
    flex:1,
    alignSelf: 'center',
    width: windowWidth * 90 / 100,
  },
  backTouchCatalogue: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100,
    marginTop: windowWidth * 1 / 100
  },
  headerTitleCatalogue: {
    color: '#375280',
    fontSize: windowWidth * 5 / 100,
    textAlign: 'center',
    fontFamily: 'Avenir-Heavy'
  },
  backIconCssVarients: {
    width: windowWidth * 5 / 100,
    height: windowWidth * 5 / 100
  },
  filterIconTouch: {
    width: windowWidth * 6 / 100,
    height: windowWidth * 6 / 100
  },
  headerViewMainVarients: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: windowWidth * 3 / 100,
    alignContent: 'center'
  },
  openIocn: {
    width: Scale(24),
    height: Scale(24),
    transform: [{ rotate: '180deg' }],
  },
  dropdown: {
    borderRadius: 2,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    height: Scale(50),
  },
  placeholderStyle: {
    fontSize: Scale(16),
    color: '#94A3B8',
    fontFamily: 'Lato-Regular',
  },
  selectedTextStyle: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(16),
    // fontWeight: '700',
    color: '#375280',
    paddingRight: 10,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#CCBEB1"
  },
  fieldContainer: {
    paddingTop: 26
  },
  nameText: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(16),
    fontWeight: '700',
    color: '#375280',
    paddingBottom: 6,
  },
  variantcontentText: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(14),
    fontWeight: '400',
    color: '#94A3B8',
    paddingBottom: 6,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: "flex-end",
    paddingLeft: Scale(28)
  },

  button: {
    backgroundColor: "#fff",
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#CCBEB1'
  },
  varianttext: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 26,
    color: '#375280',
    textAlign: 'center'
  },
  blockDetailTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(16),
    fontWeight: '600',
    color: '#375280',
    paddingBottom: 6,
  },
  blockSubTitleMain: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(14),
    fontWeight: '700',
    color: '#375280',
    marginVertical: 20,
    width: 70,
    marginLeft: Scale(4),

  },
  numberings: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(14),
    alignItems: "center",
    justifyContent: "center",
    width: Scale(120),
    height: Scale(40),
    paddingTop: 6,
    color: '#375280',

  },
  blockSunContent: {
    fontFamily: 'Lato-Regular',
    fontSize: Scale(14),
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#E2E8F0',
    width: Scale(54),
    height: Scale(34),

    textAlign: 'center',
    color: '#375280',

  },
  buildingTextInput: {
    fontFamily: 'Lato-Regular',
    color: '#375280',
    fontSize: Scale(16),
    fontWeight: '400',
  },
  variantContainer: {


    flexDirection: 'row',

  },
  VarientSubcontainerMain: {
    flex: 1,

  },

  scrollHorizontal: {
    justifyContent: 'space-between',
  },
  insideCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  variantBoxView: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  variantsTextContainer: {
    shadowColor: '#E2E8F0',
    shadowOffset: {
      width: 3,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: "#FFF",
    margin: 5,
    marginTop: 20,
    borderRadius: 2,
    borderColor: "#E2E8F0",

  },
  seperator: {
    height: 1,
    backgroundColor: "#E2E8F0",
    opacity: 1
  },
  nextButton: {
    backgroundColor: "#CCBEB1",
    width: '48%',
    height: (windowHeight * 6.5) / 100,
    borderRadius: 2,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center"
  },
  nextButtonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Lato-Bold",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "800"
  },
  backText: {
    color: "#375280",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontSize: (windowWidth * 5) / 100,
    fontWeight: "500"
  },
  backButtonVarients: {
    backgroundColor: "#fff",
    width: '48%',
    borderRadius: 2,
    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#CCBEB1'
  },
  multitext: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(14),
    fontWeight: "400",
    color: '#94A3B8',
    marginTop: 8
  },

  buttonsContainerAddProducts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 60,
  },
  backButtonAddProducts: {
    width: '48%',
    backgroundColor: "#fff",
    height: (windowHeight * 6.5) / 100,
    marginTop: (windowWidth * 4) / 100,
    borderRadius: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#CCBEB1'
  },
  nextButtonAddproducts: {
    backgroundColor: "#CCBEB1",
    height: (windowHeight * 6.5) / 100,
    width: '48%',
    borderRadius: 2,
    justifyContent: "center",
    marginTop: (windowWidth * 4) / 100,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  variantBodyContainer: {
    flexDirection: 'row',

    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  errorMsgContainer: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 8) / 100,
    marginTop: (windowWidth * 4) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    borderColor: 'rgba(220, 38, 38, 0.30)',
    backgroundColor: 'rgba(254, 226, 226, 0.30)',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: Scale(15),
  },
  errorIcon: {
    marginRight: 10,
    width: Scale(27),
    height: Scale(27),
    backgroundColor: "white"
  },
  errorTextContainer: {
    flex: 1,
    marginLeft: Scale(5)
  },
  errorHeading: {
    lineHeight: 24,
    fontSize: Scale(16),
    fontWeight: "700",
    color: "#DC2626",
    fontFamily: "Lato",
  },
  errorDescription: {
    fontSize: Scale(16),
    fontWeight: "400",
    color: "#DC2626",
    fontFamily: "Lato",
    lineHeight: 24,
  },

});
// Customizable Area End
