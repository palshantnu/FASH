import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import VerifyAccount from "../../src/VerifyAccount";
import { jest, beforeEach, expect,test } from '@jest/globals';
jest.useFakeTimers()
const screenProps = {
  navigation: {
    navigate:jest.fn(),
    goBack:jest.fn(),
    dispatch: jest.fn(),
    
    addListener:(param:string,callback:any)=>{
      callback()
    },
  },
  id: "VerifyAccount",
};
const feature = loadFeature(
  "./__tests__/features/VerifyAccount-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to verify account screen", ({ given, when, then }) => {
    let inputOtpWrapper: ShallowWrapper;
    let instance: VerifyAccount;

    given("I am a User attempting to enter Otp", () => {
      inputOtpWrapper = shallow(
        <VerifyAccount {...screenProps} />
      );
     
    });

    when("I navigate to the verify account", () => {
      instance = inputOtpWrapper.instance() as VerifyAccount;
      const msgData = new Message(getName(MessageEnum.LoginFaliureMessage));
runEngine.sendMessage("Unit Test", msgData);
    });

    then("I can go back with out errors", () => {
      let textInput=inputOtpWrapper.findWhere(node=>node.prop("testID")==="button_go_back")
      textInput.simulate("press")
      expect(inputOtpWrapper.exists()).toBe(true);
       
    });


  

  });

  test("User Enters A Invalid Otp", async({ given, when, then }) => {
    let inputOtpWrapper: ShallowWrapper;
    let instance: VerifyAccount;

    given("I am a User attempting to enter Otp", () => {
      inputOtpWrapper = shallow(
        <VerifyAccount {...screenProps} />
      );    
    });

    when("I navigate to the verify screen", () => {
      instance = inputOtpWrapper.instance() as VerifyAccount;
      expect(inputOtpWrapper.exists()).toBe(true);
    });

    

    then("I am entering empty otp", async() => {

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

    
  

      let buttonComponent = inputOtpWrapper.findWhere(
        (node) => node.prop("testID") === "btn_VarifyOTP"
      );
      
      buttonComponent.simulate("press");
    
    
      expect(inputOtpWrapper.exists()).toBe(true);
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
  
      
  
  
        let buttonComponent = inputOtpWrapper.findWhere(
          (node) => node.prop("testID") === "btn_VarifyOTP"
        );
        
        buttonComponent.simulate("press");
      
        expect(inputOtpWrapper.exists()).toBe(true);


        
      }); 

      then("I am entering right otp", async() => {

        const getOtpVarficationMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getOtpVarficationMessage);
        getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          meta:
            {
              "token":"dfgrs439759834-hdejkhfbg28bhv3gb4hbcybf4"
            }
          
        }
        );
        getOtpVarficationMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getOtpVarficationMessage.messageId);
        instance.otpAuthApiCallId = getOtpVarficationMessage.messageId
        runEngine.sendMessage("Unit Test", getOtpVarficationMessage);
    
        
    
          let buttonComponentq = inputOtpWrapper.findWhere(
            (node) => node.prop("testID") === "btn_VarifyOTP"
          );
          
          buttonComponentq.simulate("press");
        
        
      
    
        
        
    
          let buttonComponent = inputOtpWrapper.findWhere(
            (node) => node.prop("testID") === "btn_VarifyOTP"
          );
          
          buttonComponent.simulate("press");
        
          
  
          expect(inputOtpWrapper.exists()).toBe(true);
          
        }); 
  }) 



});
