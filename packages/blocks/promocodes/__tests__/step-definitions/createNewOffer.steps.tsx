import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";

import CreateNewOffer from "../../src/CreateNewOffer";
import CustomHeader from "../../../../components/src/CustomHeader";
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback: any) => {
      if (event === "focus") {
        callback();
      }
      if (event === "willFocus") {
        callback();
      }
      if (event === "didFocus") {
        callback();
      }
      if (event === "willBlur") {
        callback();
      }
      if (event === "didBlur") {
        callback();
      }
    }),
  },
  id: "CreateNewOffer",
};

const feature = loadFeature("./__tests__/features/createNewoffer-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "android");
  });

  test("User navigates to createNewOffer", ({ given, when, then }) => {
    let promoCodeBlock: ShallowWrapper;
    let promoCodeDatilsBlock: ShallowWrapper;
    let promoCodeDatilsBlock1 : ShallowWrapper;
    let offerInstance: CreateNewOffer;

    given("I am a User loading createNewOffer", () => {
      promoCodeBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock1 = shallow(  <CustomHeader {...screenProps} title={""} language={""} onLeftPress={() =>{}}/>)
    });

    when("I navigate to the createNewOffer", () => {
      offerInstance = promoCodeBlock.instance() as CreateNewOffer;
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      const btnTC  = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "btnTnC")
        btnTC.simulate("press")
       
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              code: "Data send",
              discount_cap: "Data send",
            },
          ],
        }
      );
  
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      offerInstance.createApiCallId = msgLogInErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
     
    });
    then("I can leave the screen with onLeftPress out errors", () => {
     
      const showModels = promoCodeBlock.findWhere(
        (node) => node.prop("leftTestId") === "customHeader")
        showModels.props().onLeftPress()
  
      expect(promoCodeBlock.exists()).toBe(true);
    });

    then("createNewOffer will load with out errors", () => {

      const allusersBrn = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "AllUsersBrn")
        allusersBrn.simulate("press")

        
        const newusersBtn = promoCodeBlock.findWhere(
          (node) => node.prop("testID") === "newUsersBtnPressID")
          newusersBtn.simulate("press")
        
      let companyNameTextInputComponent = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
      companyNameTextInputComponent.simulate('changeText', '');
      
      let MaxCaptextInputs = promoCodeBlock.findWhere((node) => node.prop('testID') === 'MaxCaptextInput');
      MaxCaptextInputs.simulate('changeText', '');
      const MaxCaptextInputBtn = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        MaxCaptextInputBtn.simulate("press")
      let txtInputminOrder = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
      txtInputminOrder.simulate('changeText', '');

     
      let MaxCaptextInput = promoCodeBlock.findWhere((node) => node.prop('testID') === 'MaxCaptextInput');
      MaxCaptextInput.simulate('changeText', 'fghfdgfd');
     

      let MaxCap = promoCodeBlock.findWhere((node) => node.prop('testID') === 'textinputIDMaxCap');
      MaxCap.simulate('changeText', '');
      const textinputIDMaxCapBtn = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        textinputIDMaxCapBtn.simulate("press")
     
        let MaxCaps = promoCodeBlock.findWhere((node) => node.prop('testID') === 'textinputIDMaxCap');
        MaxCaps.simulate('changeText', 'sssss');

        let txtInputpromoCode = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCode.simulate('changeText', '');
      
      
      const txtInputpromoCodeBtn = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        txtInputpromoCodeBtn.simulate("press")
        let txtInputpromoCodes = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCodes.simulate('changeText', 'sssssssffdfe');
        let let_button_dates = promoCodeBlock.findWhere(
          (node) => node.prop("testID") == "dateTimePickerEdit"
          );
          let_button_dates.prop('onConfirm')('')
          let_button_dates.prop('onCancel')('')

          let_button_dates.simulate("confirm"); 
          let txtInputminOrderss = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
          txtInputminOrderss.simulate('changeText', '');
          const txtInputpromoCodeBtnss = promoCodeBlock.findWhere(
            (node) => node.prop("testID") === "createBtn")
            txtInputpromoCodeBtnss.simulate("press")
          let txtInputminOrders = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
          txtInputminOrders.simulate('changeText', 'dggsdgds');
          
          const txtInputpromoCodeBtns = promoCodeBlock.findWhere(
            (node) => node.prop("testID") === "createBtn")
            txtInputpromoCodeBtns.simulate("press")
      let let_button_date = promoCodeBlock.findWhere(
        (node) => node.prop("testID") == "dateTimePickerEditID"
        );
        let_button_date.prop('onConfirm')('')
          
          let_button_date.simulate("confirm");    
        const createBtn = promoCodeBlock.findWhere(
          (node) => node.prop("testID") === "createBtn")
          createBtn.simulate("press")

        const tokenMsg: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
        tokenMsg.addData(getName(MessageEnum.SessionResponseData), {type:"Products"});
        runEngine.sendMessage("Unit Test", tokenMsg);
        const txtInputpromoCodeBtnsss = promoCodeBlock.findWhere(
          (node) => node.prop("testID") === "createBtn")
          txtInputpromoCodeBtnsss.simulate("press")
        const msgLogInErrorRestAPIs = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        msgLogInErrorRestAPIs.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLogInErrorRestAPIs
        );
        msgLogInErrorRestAPIs.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          {
            data: [
              
                {attributes:{catalogue:{name:'fgf'},catalogue_variant:{sku:'fgf'},catalogue_variant_id:1}}
              
            ],
          }
        );
    
        msgLogInErrorRestAPIs.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          msgLogInErrorRestAPIs.messageId
        );
        offerInstance.getProductListApiCallId = msgLogInErrorRestAPIs.messageId;
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPIs);
        const showModel = promoCodeBlock.findWhere(
          (node) => node.prop("testID") === "showModel")
          showModel.simulate("press")
          const allBtnCheckBox = promoCodeBlock.findWhere(
            (node) => node.prop("testID") === "allBtnCheckBox")
            allBtnCheckBox.simulate("press")
            const allBtnCheckBoxs = promoCodeBlock.findWhere(
              (node) => node.prop("testID") === "allBtnCheckBox")
              allBtnCheckBoxs.simulate("press")
              const flatlist = promoCodeBlock.findWhere(
                (node) => node.prop("testID") === "Assignstore_show_flatlist_list"
            )
        
            
            const renderItem = flatlist.renderProp("renderItem")({ item: { product:'gbgvb',sku:'gfdg',selectStatus:false,id:1}, index: 0 })
            const buttonNavigate = renderItem.findWhere(
                (node) => node.prop("testID") == "selectCheckBox"
            )
            buttonNavigate.simulate("press")
            const assignStoreSaveBtn = promoCodeBlock.findWhere(
              (node) => node.prop("testID") === "assignStoreSaveBtn")
              assignStoreSaveBtn.simulate("press")
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              failed_login: "Data send",
            },
          ],
        }
      );
  
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      offerInstance.createApiCallId = msgLogInErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);

      const signUp = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
    signUp.simulate("press")
    
     expect(promoCodeBlock.exists()).toBe(true);
      
    });

    then("I can leave the screen with out errors", async() => {
      let companyNameTextInputComponent = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
      companyNameTextInputComponent.simulate('changeText', '');

      let txtInputminOrder = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
      txtInputminOrder.simulate('changeText', '20');
      
      let MaxCaptextInput = promoCodeBlock.findWhere((node) => node.prop('testID') === 'MaxCaptextInput');
      MaxCaptextInput.simulate('changeText', '7896');
      let let_button_dates = promoCodeBlock.findWhere(
        (node) => node.prop("testID") == "dateTimePickerEdit"
        );
        let_button_dates.prop('onConfirm')('')
        let_button_dates.simulate("confirm"); 
        let dateTimePickerEditID = promoCodeBlock.findWhere(
          (node) => node.prop("testID") == "dateTimePickerEditID"
          );
          expect(dateTimePickerEditID).toBeTruthy();
          dateTimePickerEditID.prop('onConfirm')('')
          
          dateTimePickerEditID.simulate("confirm"); 
      const signUp = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
    signUp.simulate("press")


    const checkBoxBtn = promoCodeBlock.findWhere(
      (node) => node.prop("testID") === "checkbox")
      checkBoxBtn.simulate("press")
      const tokenMsg: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseData), {type:"Products",offer_id:1});
      runEngine.sendMessage("Unit Test", tokenMsg);
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            "id": 1,
            "type": 'product',
            "attributes": {
                "id": 1,
                "code": "",
                "isActive": true,
                "discount_type": 'Products',
                "discount": 10,
                "valid_from": '2024-01-01T00:00:00.000Z',
                "valid_to": '2024-01-01T00:00:00.000Z',
                "min_cart_value": '101',
                "max_cart_value": '3000',
                "applicable_for": 'all_users',
                "discount_cap": "0",
                "coupon_catalogues":[{
                  "id": 1,
                  "coupon_code_id": 12,
                  "catalogue_variant_id": 1,
                }],
                "coupon_business_informations": []
            }
          },
        }
      );
  
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      offerInstance.getOfferDetailsApiCallId = msgLogInErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
      
      const showModel = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "showModel")
        showModel.simulate("press")
        const showModels = promoCodeBlock.findWhere(
          (node) => node.prop("leftTestId") === "btn-navigation-left")
          showModels.props().onLeftPress()
        const tokenMsgs: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
        tokenMsgs.addData(getName(MessageEnum.SessionResponseData), {type:"Stores",offer_id:1});
        runEngine.sendMessage("Unit Test", tokenMsgs);
        const createBtn = promoCodeBlock.findWhere(
          (node) => node.prop("testID") === "createBtn")
          createBtn.simulate("press")
          const openModel = promoCodeBlock.findWhere(
            (node) => node.prop("testID") === "openModel")
            openModel.simulate("press")
            const openModel1 = promoCodeBlock.findWhere(
              (node) => node.prop("testID") === "openModel1")
              openModel1.simulate("press")
              const msgLogInErrorRestAPIs = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              msgLogInErrorRestAPIs.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgLogInErrorRestAPIs
              );
              msgLogInErrorRestAPIs.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  data: {
                    "id": 1,
                    "type": 'product',
                    "attributes": {
                        "id": 1,
                        "code": "",
                        "isActive": true,
                        "discount_type": 'Products',
                        "discount": 10,
                        "valid_from": '2024-01-01T00:00:00.000Z',
                        "valid_to": '2024-01-01T00:00:00.000Z',
                        "min_cart_value": '101',
                        "max_cart_value": '3000',
                        "applicable_for": 'new_users',
                        "discount_cap": '0',
                        "coupon_catalogues":[{
                          "id": 1,
                          "coupon_code_id": 12,
                          "catalogue_variant_id": 1,
                        }],
                        "coupon_business_informations": []
                    }
                  },
                }
              );
          
              msgLogInErrorRestAPIs.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgLogInErrorRestAPIs.messageId
              );
              offerInstance.getOfferDetailsApiCallId = msgLogInErrorRestAPIs.messageId;
              runEngine.sendMessage("Unit Test", msgLogInErrorRestAPIs);
              const msgLogInErrorRestAPIss = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              msgLogInErrorRestAPIss.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgLogInErrorRestAPIss
              );
              msgLogInErrorRestAPIss.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                  data: {
                    description:'sdsd'
                  },
                }
              );
          
              msgLogInErrorRestAPIss.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgLogInErrorRestAPIss.messageId
              );
              offerInstance.termsConditoinId = msgLogInErrorRestAPIss.messageId;
              runEngine.sendMessage("Unit Test", msgLogInErrorRestAPIss);
              
              const checkbox = promoCodeBlock.findWhere(
                (node) => node.prop("testID") === "checkbox")
                checkbox.simulate("press")
                const checkboxs = promoCodeBlock.findWhere(
                  (node) => node.prop("testID") === "checkbox")
                  checkboxs.simulate("press")
              const createBtnss = promoCodeBlock.findWhere(
                (node) => node.prop("testID") === "createBtn")
                createBtnss.simulate("press")
                let txtInputminOrders = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
      txtInputminOrders.simulate('changeText', '20');
      expect(promoCodeBlock.exists()).toBe(true);
                offerInstance.setState({selectToDate:false})
                offerInstance.endDateCheckValidation()
                await offerInstance.createButtonAPICall()
                offerInstance.setState({selectToDate:true})
                offerInstance.endDateCheckValidation()
                offerInstance.setScrollViewRef(true)
    });
  
  });

  test("User navigates to createNewOffer for promocode", ({ given, when, then }) => {
    let promoCodeBlock: ShallowWrapper;
    let promoCodeDatilsBlock: ShallowWrapper;
    let promoCodeDatilsBlock1 : ShallowWrapper;
    let offerInstance: CreateNewOffer;

    given("I am a User loading createNewOffer for promocode", () => {
      promoCodeBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock1 = shallow(  <CustomHeader {...screenProps} title={""} language={""} onLeftPress={() =>{}}/>)
    });

    when("I navigate to the createNewOffer for promocode", () => {
      offerInstance = promoCodeBlock.instance() as CreateNewOffer;
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      const btnTC  = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "btnTnC")
        btnTC.simulate("press")
       
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              code: "Data send",
              discount_cap: "Data send",
            },
          ],
        }
      );
  
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      offerInstance.createApiCallId = msgLogInErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
     
    });

    then("I can leave the screen with out errors for new test for promocode", () => {
      const tokenMsg: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseData), {type:"Products1"});
      runEngine.sendMessage("Unit Test", tokenMsg);
      const txtInputpromoCodeBtnsss = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        txtInputpromoCodeBtnsss.simulate("press")
      const msgLogInErrorRestAPIs = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPIs
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            
              {attributes:{catalogue:{name:'fgf'},catalogue_variant:{sku:'fgf'},catalogue_variant_id:1}}
            
          ],
        }
      );
      let MaxCap = promoCodeBlock.findWhere((node) => node.prop('testID') === 'textinputIDMaxCap');
      MaxCap.simulate('changeText', '10.0');
      const textinputIDMaxCapBtn = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        textinputIDMaxCapBtn.simulate("press")
        
      let MaxCaptextInputs = promoCodeBlock.findWhere((node) => node.prop('testID') === 'MaxCaptextInput');
      MaxCaptextInputs.simulate('changeText', '10');
    
        let txtInputpromoCode = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCode.simulate('changeText', '');
            
      const txtInputpromoCodeBtn = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        txtInputpromoCodeBtn.simulate("press")

    });
  
  });

    test("User navigates to createNewOffer for minvalue", ({ given, when, then }) => {
    let promoCodeBlock: ShallowWrapper;
    let promoCodeDatilsBlock: ShallowWrapper;
    let promoCodeDatilsBlock1 : ShallowWrapper;
    let offerInstance: CreateNewOffer;

    given("I am a User loading createNewOffer for minvalue", () => {
      promoCodeBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock1 = shallow(  <CustomHeader {...screenProps} title={""} language={""} onLeftPress={() =>{}}/>)
    });

    when("I navigate to the createNewOffer for minvalue", () => {
      offerInstance = promoCodeBlock.instance() as CreateNewOffer;
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      const btnTC  = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "btnTnC")
        btnTC.simulate("press")
       
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              code: "Data send",
              discount_cap: "Data send",
            },
          ],
        }
      );
  
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      offerInstance.createApiCallId = msgLogInErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
     
    });

    then("I can leave the screen with out errors for new test for minvalue", () => {
      const tokenMsg: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseData), {type:"Products1"});
      runEngine.sendMessage("Unit Test", tokenMsg);
      const txtInputpromoCodeBtnsss = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        txtInputpromoCodeBtnsss.simulate("press")
      const msgLogInErrorRestAPIs = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPIs
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            
              {attributes:{catalogue:{name:'fgf'},catalogue_variant:{sku:'fgf'},catalogue_variant_id:1}}
            
          ],
        }
      );
     
      let MaxCap = promoCodeBlock.findWhere((node) => node.prop('testID') === 'textinputIDMaxCap');
      MaxCap.simulate('changeText', '10');
     
      let MaxCaptextInputs = promoCodeBlock.findWhere((node) => node.prop('testID') === 'MaxCaptextInput');
      MaxCaptextInputs.simulate('changeText', '98');
     
        let txtInputpromoCode = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCode.simulate('changeText', '');
            
      const txtInputpromoCodeBtn = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        txtInputpromoCodeBtn.simulate("press")
        let txtInputpromoCodes = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCodes.simulate('changeText', 'sssssssffdfe');
          let txtInputminOrderss = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
          txtInputminOrderss.simulate('changeText', '');
          const txtInputpromoCodeBtnss = promoCodeBlock.findWhere(
            (node) => node.prop("testID") === "createBtn")
            txtInputpromoCodeBtnss.simulate("press")
    });
  
  });

    test("User navigates to createNewOffer for start date", ({ given, when, then }) => {
    let promoCodeBlock: ShallowWrapper;
    let promoCodeDatilsBlock: ShallowWrapper;
    let promoCodeDatilsBlock1 : ShallowWrapper;
    let offerInstance: CreateNewOffer;

    given("I am a User loading createNewOffer for start date", () => {
      promoCodeBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock1 = shallow(  <CustomHeader {...screenProps} title={""} language={""} onLeftPress={() =>{}}/>)
    });

    when("I navigate to the createNewOffer for start date", () => {
      offerInstance = promoCodeBlock.instance() as CreateNewOffer;
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      const btnTC  = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "btnTnC")
        btnTC.simulate("press")
        
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              code: "Data send",
              discount_cap: "Data send",
            },
          ],
        }
      );
  
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      offerInstance.createApiCallId = msgLogInErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
      
    });

    then("I can leave the screen with out errors for new test for start date", () => {
      const tokenMsg: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseData), {type:"Products1"});
      runEngine.sendMessage("Unit Test", tokenMsg);
      const txtInputpromoCodeBtnsss = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        txtInputpromoCodeBtnsss.simulate("press")
      const msgLogInErrorRestAPIs = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPIs
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            
              {attributes:{catalogue:{name:'fgf'},catalogue_variant:{sku:'fgf'},catalogue_variant_id:1}}
            
          ],
        }
      );
      
      let MaxCap = promoCodeBlock.findWhere((node) => node.prop('testID') === 'textinputIDMaxCap');
      MaxCap.simulate('changeText', '10');
      
      let MaxCaptextInputs = promoCodeBlock.findWhere((node) => node.prop('testID') === 'MaxCaptextInput');
      MaxCaptextInputs.simulate('changeText', '98');
      
        let txtInputpromoCode = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCode.simulate('changeText', 'dfsdfdsf');
            
    
        let txtInputpromoCodes = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCodes.simulate('changeText', 'sssssssffdfe');
  
    const txtInputpromoCodeBtn = promoCodeBlock.findWhere(
      (node) => node.prop("testID") === "createBtn")
      txtInputpromoCodeBtn.simulate("press")
          
          let txtInputminOrderss = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
          txtInputminOrderss.simulate('changeText', '');
        
          let txtInputminOrders = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
          txtInputminOrders.simulate('changeText', '1000');
          
          const txtInputpromoCodeBtns = promoCodeBlock.findWhere(
            (node) => node.prop("testID") === "createBtn")
            txtInputpromoCodeBtns.simulate("press")
      let let_button_date = promoCodeBlock.findWhere(
        (node) => node.prop("testID") == "dateTimePickerEditID"
        );
        let_button_date.prop('onConfirm')('')
        const openModel1 = promoCodeBlock.findWhere(
          (node) => node.prop("testID") === "openModel1")
          openModel1.simulate("press")
    });
  
  });

  test("User navigates to createNewOffer for end date", ({ given, when, then }) => {
    let promoCodeBlock: ShallowWrapper;
    let promoCodeDatilsBlock: ShallowWrapper;
    let promoCodeDatilsBlock1 : ShallowWrapper;
    let offerInstance: CreateNewOffer;

    given("I am a User loading createNewOffer for end date", () => {
      promoCodeBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock1 = shallow(  <CustomHeader {...screenProps} title={""} language={""} onLeftPress={() =>{}}/>)
    });

    when("I navigate to the createNewOffer for end date", () => {
      offerInstance = promoCodeBlock.instance() as CreateNewOffer;
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      const btnTC  = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "btnTnC")
        btnTC.simulate("press")
        
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              code: "Data send",
              discount_cap: "Data send",
            },
          ],
        }
      );
  
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      offerInstance.createApiCallId = msgLogInErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
      
    });

    then("I can leave the screen with out errors for new test for end date", () => {
      const tokenMsg: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseData), {type:"Products1"});
      runEngine.sendMessage("Unit Test", tokenMsg);
      const txtInputpromoCodeBtnsss = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        txtInputpromoCodeBtnsss.simulate("press")
      const msgLogInErrorRestAPIs = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPIs
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            
              {attributes:{catalogue:{name:'fgf'},catalogue_variant:{sku:'fgf'},catalogue_variant_id:1}}
            
          ],
        }
      );
      
      let MaxCap = promoCodeBlock.findWhere((node) => node.prop('testID') === 'textinputIDMaxCap');
      MaxCap.simulate('changeText', '10');
      
      let MaxCaptextInputs = promoCodeBlock.findWhere((node) => node.prop('testID') === 'MaxCaptextInput');
      MaxCaptextInputs.simulate('changeText', '98');
    
        let txtInputpromoCode = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCode.simulate('changeText', 'dfsdfdsf');
            
    
        let txtInputpromoCodes = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCodes.simulate('changeText', 'sssssssffdfe');
        let let_button_dates = promoCodeBlock.findWhere(
          (node) => node.prop("testID") == "dateTimePickerEdit"
          );
          let_button_dates.prop('onConfirm')('')

          const txtInputpromoCodeBtnss = promoCodeBlock.findWhere(
            (node) => node.prop("testID") === "createBtn")
            txtInputpromoCodeBtnss.simulate("press")
          
          let_button_dates.simulate("confirm"); 
          let txtInputminOrderss = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
          txtInputminOrderss.simulate('changeText', '10');
          
          let txtInputminOrders = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
          txtInputminOrders.simulate('changeText', '1000');
          
          const txtInputpromoCodeBtns = promoCodeBlock.findWhere(
            (node) => node.prop("testID") === "createBtn")
            txtInputpromoCodeBtns.simulate("press")
      let let_button_date = promoCodeBlock.findWhere(
        (node) => node.prop("testID") == "dateTimePickerEditID"
        );
        let_button_date.prop('onConfirm')('')

        const txtInputpromoCodeBtn = promoCodeBlock.findWhere(
          (node) => node.prop("testID") === "createBtn")
          txtInputpromoCodeBtn.simulate("press")
    });
  
  });

  test("User navigates to createNewOffer for end date validation", ({ given, when, then }) => {
    let promoCodeBlock: ShallowWrapper;
    let promoCodeDatilsBlock: ShallowWrapper;
    let promoCodeDatilsBlock1 : ShallowWrapper;
    let offerInstance: CreateNewOffer;

    given("I am a User loading createNewOffer for end date validation", () => {
      promoCodeBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock1 = shallow(  <CustomHeader {...screenProps} title={""} language={""} onLeftPress={() =>{}}/>)
    });

    when("I navigate to the createNewOffer for end date validation", () => {
      offerInstance = promoCodeBlock.instance() as CreateNewOffer;
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      const btnTC  = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "btnTnC")
        btnTC.simulate("press")
        
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              code: "Data send",
              discount_cap: "Data send",
            },
          ],
        }
      );
  
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      offerInstance.createApiCallId = msgLogInErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
      
    });

    then("I can leave the screen with out errors for new test for end date validation", () => {
      const tokenMsg: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseData), {type:"Products1"});
      runEngine.sendMessage("Unit Test", tokenMsg);
      const txtInputpromoCodeBtnsss = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        txtInputpromoCodeBtnsss.simulate("press")
      const msgLogInErrorRestAPIs = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPIs
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            
              {attributes:{catalogue:{name:'fgf'},catalogue_variant:{sku:'fgf'},catalogue_variant_id:1}}
            
          ],
        }
      );
      
      let MaxCap = promoCodeBlock.findWhere((node) => node.prop('testID') === 'textinputIDMaxCap');
      MaxCap.simulate('changeText', '10');
      
      let MaxCaptextInputs = promoCodeBlock.findWhere((node) => node.prop('testID') === 'MaxCaptextInput');
      MaxCaptextInputs.simulate('changeText', '98');
    
        let txtInputpromoCode = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCode.simulate('changeText', 'dfsdfdsf');
            
    
        let txtInputpromoCodes = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCodes.simulate('changeText', 'sssssssffdfe');
        let let_button_dates = promoCodeBlock.findWhere(
          (node) => node.prop("testID") == "dateTimePickerEdit"
          );
          let_button_dates.prop('onConfirm')('')
          offerInstance.setState({selectedDate: new Date })
          const txtInputpromoCodeBtnss = promoCodeBlock.findWhere(
            (node) => node.prop("testID") === "createBtn")
            txtInputpromoCodeBtnss.simulate("press")
          
          let_button_dates.simulate("confirm"); 
          let txtInputminOrderss = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
          txtInputminOrderss.simulate('changeText', '10');
          
          let txtInputminOrders = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
          txtInputminOrders.simulate('changeText', '1000');
          
          const txtInputpromoCodeBtns = promoCodeBlock.findWhere(
            (node) => node.prop("testID") === "createBtn")
            txtInputpromoCodeBtns.simulate("press")
      let let_button_date = promoCodeBlock.findWhere(
        (node) => node.prop("testID") == "dateTimePickerEditID"
        );
        offerInstance.setState({selectedDate: new Date })
        let_button_date.prop('onConfirm')('')

        const txtInputpromoCodeBtn = promoCodeBlock.findWhere(
          (node) => node.prop("testID") === "createBtn")
          txtInputpromoCodeBtn.simulate("press")
    });
  
  });


  test("User navigates to createNewOffer for t and c", ({ given, when, then }) => {
    let promoCodeBlock: ShallowWrapper;
    let promoCodeDatilsBlock: ShallowWrapper;
    let promoCodeDatilsBlock1 : ShallowWrapper;
    let offerInstance: CreateNewOffer;

    given("I am a User loading createNewOffer for t and c", () => {
      promoCodeBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock = shallow(<CreateNewOffer {...screenProps} />);
      promoCodeDatilsBlock1 = shallow(  <CustomHeader {...screenProps} title={""} language={""} onLeftPress={() =>{}}/>)
    });

    when("I navigate to the createNewOffer for t and c", () => {
      offerInstance = promoCodeBlock.instance() as CreateNewOffer;
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      const btnTC  = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "btnTnC")
        btnTC.simulate("press")
        
      const msgLogInErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI
      );
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              code: "Data send",
              discount_cap: "Data send",
            },
          ],
        }
      );
  
      msgLogInErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPI.messageId
      );
      offerInstance.createApiCallId = msgLogInErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
      
    });

    then("I can leave the screen with out errors for new test for t and c", () => {
      const tokenMsg: Message = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseData), {type:"Products1"});
      runEngine.sendMessage("Unit Test", tokenMsg);
      const txtInputpromoCodeBtnsss = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "createBtn")
        txtInputpromoCodeBtnsss.simulate("press")
      const msgLogInErrorRestAPIs = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgLogInErrorRestAPIs
      );
      msgLogInErrorRestAPIs.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            
              {attributes:{catalogue:{name:'fgf'},catalogue_variant:{sku:'fgf'},catalogue_variant_id:1}}
            
          ],
        }
      );
      
      let MaxCap = promoCodeBlock.findWhere((node) => node.prop('testID') === 'textinputIDMaxCap');
      MaxCap.simulate('changeText', '10');
      
      let MaxCaptextInputs = promoCodeBlock.findWhere((node) => node.prop('testID') === 'MaxCaptextInput');
      MaxCaptextInputs.simulate('changeText', '98');
    
        let txtInputpromoCode = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCode.simulate('changeText', 'dfsdfdsf');
            
    
        let txtInputpromoCodes = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputpromoCode');
        txtInputpromoCodes.simulate('changeText', 'sssssssffdfe');
        let let_button_dates = promoCodeBlock.findWhere(
          (node) => node.prop("testID") == "dateTimePickerEdit"
          );
          let_button_dates.prop('onConfirm')('')
          offerInstance.setState({selectedDate: new Date() })
          const txtInputpromoCodeBtnss = promoCodeBlock.findWhere(
            (node) => node.prop("testID") === "createBtn")
            txtInputpromoCodeBtnss.simulate("press")
          
          let_button_dates.simulate("confirm"); 
          let txtInputminOrderss = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
          txtInputminOrderss.simulate('changeText', '10');
          
          let txtInputminOrders = promoCodeBlock.findWhere((node) => node.prop('testID') === 'txtInputminOrder');
          txtInputminOrders.simulate('changeText', '1000');
          
       
      let let_button_date = promoCodeBlock.findWhere(
        (node) => node.prop("testID") == "dateTimePickerEditID"
        );
        offerInstance.setState({selectedDate: new Date() })
        let_button_date.prop('onConfirm')('')
        const txtInputpromoCodeBtns = promoCodeBlock.findWhere(
          (node) => node.prop("testID") === "createBtn")
          txtInputpromoCodeBtns.simulate("press")
        const checkBoxBtn = promoCodeBlock.findWhere(
          (node) => node.prop("testID") === "checkbox")
          checkBoxBtn.simulate("press")

        const txtInputpromoCodeBtn = promoCodeBlock.findWhere(
          (node) => node.prop("testID") === "createBtn")
          txtInputpromoCodeBtn.simulate("press")
    });
  
  });

});
