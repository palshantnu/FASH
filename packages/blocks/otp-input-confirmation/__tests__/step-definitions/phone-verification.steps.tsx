import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PhoneVerification from "../../src/PhoneVerification";
import { jest, beforeEach, expect,test } from '@jest/globals';
jest.useFakeTimers()
const screenProps = {
  navigation: {
    navigate:jest.fn(),
    goBack:jest.fn(),
    dispatch: jest.fn(),
    getParam: (playlist_id: any,topic_id:any) => {
    },
    addListener:(param:string,callback:any)=>{
      callback()
    },
  },
  id: "PhoneVerification",
};
const feature = loadFeature(
  "./__tests__/features/phone-verification-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to phone-verification", ({ given, when, then }) => {
    let inputOtpWrapper: ShallowWrapper;
    let instance: PhoneVerification;

    given("I am a User attempting to enter Otp", () => {
      inputOtpWrapper = shallow(
        <PhoneVerification {...screenProps} />
      );
      expect(inputOtpWrapper).toBeTruthy();
    });

    when("I navigate to the phone-verification", () => {
      instance = inputOtpWrapper.instance() as PhoneVerification;
    });

    then("I can go back with out errors", () => {
      let textInput=inputOtpWrapper.findWhere(node=>node.prop("testID")==="button_go_back")
      textInput.simulate("press")

    });


    then("I can enter OTP with out errors", () => {

      let emailArray=instance.state.OtpArray
      emailArray.map(
        (item,index)=>{
          let textInput=inputOtpWrapper.findWhere(node=>node.prop("testID")==="txt_input_otp"+index.toString())
          textInput.simulate("changeText",index.toString())
        }
      )

      expect(instance.state.OtpArray).toStrictEqual(["0","1","2","3"])
    });

    then("I can select Varify OTP button with out errors", () => {
      let buttonComponent = inputOtpWrapper.findWhere(
        (node) => node.prop("testID") === "btn_VarifyOTP"
      );
      
      buttonComponent.simulate("press");
    });

  });

  test("User Enters A Invalid Otp", async({ given, when, then }) => {
    let inputOtpWrapper: ShallowWrapper;
    let instance: PhoneVerification;

    given("I am a User attempting to enter Otp", () => {
      inputOtpWrapper = shallow(
        <PhoneVerification {...screenProps} />
      );
      expect(inputOtpWrapper).toBeTruthy();     
    });

    when("I navigate to the phone-verification", () => {
      instance = inputOtpWrapper.instance() as PhoneVerification;
    });

    then("I am entering empty otp", async() => {
      let emailArray=instance.state.OtpArray
      emailArray.map(
        (item,index)=>{
          let textInput=
          inputOtpWrapper.findWhere(node=>
            node.prop("testID")==="txt_input_otp"+index.toString())
          textInput.simulate("changeText","")
          textInput.simulate("focus")
        }
      )
      
      let buttonComponent = inputOtpWrapper.findWhere(
        (node) => node.prop("testID") === "btn_VarifyOTP"
      );
      
      buttonComponent.simulate("press");

     
      inputOtpWrapper.findWhere(node=>
        node.prop("testID")==="txt_input_otp2")
     
  

    });

    then("I am entering wrong otp", async() => {

    const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
        )
    tokenMsg.addData(getName(MessageEnum.SessionResponseToken), 'TOKEN')
    runEngine.sendMessage('Unit Test', tokenMsg)

    const phoneNumberMsg: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
        )
    phoneNumberMsg.addData(getName(MessageEnum.AuthTokenPhoneNumberMessage), 'TOKEN')
    runEngine.sendMessage('Unit Test', phoneNumberMsg)

    const getOtpVarficationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
    getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getOtpVarficationMessage);
    getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
    {
        errors:[
          {
            "error":"invalid OTP"
          }
        ]
    }
    );
    getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getOtpVarficationMessage.messageId);
    instance.otpAuthApiCallId = getOtpVarficationMessage.messageId
    runEngine.sendMessage("Unit Test", getOtpVarficationMessage);

    
      instance.setState({
        otp:"7668"
      })

      let buttonComponent = inputOtpWrapper.findWhere(
        (node) => node.prop("testID") === "btn_VarifyOTP"
      );
      
      buttonComponent.simulate("press");
    
      let methodResult=await instance.submitOtp()
      expect(methodResult).toBe(true)

    });    
  }) 

  test("User Enters otp", async({ given, when, then }) => {
    let inputOtpWrapper: ShallowWrapper;
    let instance: PhoneVerification;

    given("I am a User attempting to enter Otp", () => {
      inputOtpWrapper = shallow(
        <PhoneVerification {...screenProps} />
      );
      expect(inputOtpWrapper).toBeTruthy();     
    });

    when("I navigate to the phone-verification", async() => {
      instance = inputOtpWrapper.instance() as PhoneVerification;
    });

    then("I tap on resend otp",async()=>
    {
      instance.setState({contact_number:'8962687619'})
      let resend_button = inputOtpWrapper.findWhere(
        (node) => node.prop("testID") === "btn_resendOtp"
      );


      const resnedOtpMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      resnedOtpMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), resnedOtpMessage);
      resnedOtpMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
          meta:{
            token:"exampleTOKEN"
          }
      }
      );
      resnedOtpMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), resnedOtpMessage.messageId);
      instance.resendOTPApiCallID = resnedOtpMessage.messageId
      runEngine.sendMessage("Unit Test", resnedOtpMessage);
      resend_button.simulate("press")
      instance.setState({seconds:3})
      jest.runAllTimers()

      const resnedResult=await instance.resendOTP()
      expect(resnedResult).toBe(true)


    })

    then("I am entering right otp", async() => {

      const getOtpVarficationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getOtpVarficationMessage);
      getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        meta:
          {
            "token":"dfgrs439759834-hdejkhfbg28bhv3gb4hbcybf4",
            account: {
              role: "driver",
              driver_redirect_flag: "driver_landing_page"
            }
          }
        
      }
      );
      getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getOtpVarficationMessage.messageId);
      instance.otpAuthApiCallId = getOtpVarficationMessage.messageId
      runEngine.sendMessage("Unit Test", getOtpVarficationMessage);

      getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        meta:
          {
            "token":"dfgrs439759834-hdejkhfbg28bhv3gb4hbcybf4",
            account: {
              role: "driver",
              driver_redirect_flag: null
            },
            custom_account: {
              account_type: "Agency"
            }
          }
        
      }
      );
      runEngine.sendMessage("Unit Test", getOtpVarficationMessage);
  
        instance.setState({
          otp:"7668"
        })
  
        let buttonComponent = inputOtpWrapper.findWhere(
          (node) => node.prop("testID") === "btn_VarifyOTP"
        );
        
        buttonComponent.simulate("press");
      
        let methodResult=await instance.submitOtp()
        expect(methodResult).toBe(true)
    
  
      });  
  })

  test("User Enters otp for fogot password", async({ given, when, then }) => {
    let inputOtpWrapper: ShallowWrapper;
    let instance: PhoneVerification;

    given("I am a User attempting to enter Otp", () => {
      inputOtpWrapper = shallow(
        <PhoneVerification {...screenProps} />
      );
      expect(inputOtpWrapper).toBeTruthy();     
    });

    when("I navigate to the phone-verification", async() => {
      instance = inputOtpWrapper.instance() as PhoneVerification;
    });

    then("I tap on resend otp",async()=>
    {
      let resend_button = inputOtpWrapper.findWhere(
        (node) => node.prop("testID") === "btn_resendOtp"
      );


      const resnedOtpMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      resnedOtpMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), resnedOtpMessage);
      resnedOtpMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
          meta:{
            token:"exampleTOKEN"
          }
      }
      );
      resnedOtpMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), resnedOtpMessage.messageId);
      instance.resendOTPApiCallID = resnedOtpMessage.messageId
      runEngine.sendMessage("Unit Test", resnedOtpMessage);
      resend_button.simulate("press")
      instance.setState({seconds:3})
      jest.runAllTimers()

      const resnedResult=await instance.resendOTP()
      expect(resnedResult).toBe(true)


    })

    then("I am entering right otp", async() => {

      const getOtpVarficationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getOtpVarficationMessage);
      getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        messages:[
          {
            message:"Success"
          }
        ]
      }
      );
      getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getOtpVarficationMessage.messageId);
      instance.otpAuthApiCallId = getOtpVarficationMessage.messageId
      runEngine.sendMessage("Unit Test", getOtpVarficationMessage);
  
        instance.setState({
          otp:"7668"
        })
  
        let buttonComponent = inputOtpWrapper.findWhere(
          (node) => node.prop("testID") === "btn_VarifyOTP"
        );
        
        buttonComponent.simulate("press");
      
        let methodResult=await instance.submitOtp()
        expect(methodResult).toBe(true)
        instance.componentWillUnmount()
  
      });  
  })

  test('I am a stylist trying to sign In', ({
    given,
    when,
    then
  }) => {
    let screen: ReturnType<typeof render>;
    const spyMessage = jest.spyOn(runEngine, "sendMessage");

    given('I have filled up correct otp', () => {
      screen = render(<PhoneVerification {...screenProps} />);

      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "token");
      runEngine.sendMessage("UNIT TEST", session);
      
      const navPayload = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      navPayload.addData(getName(MessageEnum.AuthTokenPhoneNumberMessage), "8910123213")
      runEngine.sendMessage("UNIT TEST", navPayload);

      fireEvent.changeText(screen.getByTestId("txt_input_otp0"), "1");
      fireEvent.changeText(screen.getByTestId("txt_input_otp1"), "2");
      fireEvent.changeText(screen.getByTestId("txt_input_otp2"), "3");
      fireEvent.changeText(screen.getByTestId("txt_input_otp3"), "4");
    });
  
    when('I click on sign In', () => {
      fireEvent.changeText(screen.getByTestId("btn_VarifyOTP"));

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.addData(getName(MessageEnum.RestAPIResponceDataMessage), message.messageId);
      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        meta: {
            account: {
                stylist_redirect_flag: null, 
                role: "stylist"
            },
            token: "token"
        }
      })

      screen.container.instance.otpAuthApiCallId = message.messageId;
      runEngine.sendMessage("UNIT TEST", message);

      message.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        meta: {
            account: {
                stylist_redirect_flag: "stylist_landing_page", 
                role: "stylist"
            },
            token: "token"
        }
      });
      runEngine.sendMessage("UNIT TEST", message);
    });
  
    then('I go to expected screen', () => {
      const lastCall = spyMessage.mock.calls[spyMessage.mock.calls.length - 1];
      expect(lastCall[1]).toMatchObject({id: "NavigationStylistDashboard"})
    });
  });
});
