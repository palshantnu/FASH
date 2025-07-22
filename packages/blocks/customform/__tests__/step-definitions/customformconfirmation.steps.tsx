import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import CustomformConfirmation from "../../src/CustomformConfirmation"
import { jest, expect,beforeEach } from '@jest/globals';
jest.useFakeTimers()
const navigation = require("react-navigation")
const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        getParam: (playlist_id: any,topic_id:any) => {
        },
        addListener:(param:string,callback:any)=>{
          callback()
        },
    },
    id: "CustomformConfirmation"
}

const feature = loadFeature("./__tests__/features/customformconfirmation-scenario.feature");

defineFeature(feature, (test) => {
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    });
  
    test("User navigates to CustomformConfirmation", ({ given, when, then }) => {
      let CustomformConfirmationBlock: ShallowWrapper;
      let instance: CustomformConfirmation;
  
      given("I am a User loading CustomformConfirmation", () => {
        CustomformConfirmationBlock = shallow(<CustomformConfirmation {...screenProps} />);
      });
  
      when("I navigate to the CustomformConfirmation", () => {
        instance = CustomformConfirmationBlock.instance() as CustomformConfirmation;
      });
  
      then("CustomformConfirmation will load with out errors", () => {
        expect(CustomformConfirmationBlock).toBeTruthy();
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
      
      });

      then("I can click logout button with out errors", () => {
        let buttonComponent = CustomformConfirmationBlock.findWhere(
          (node) => node.prop("testID") === "btnLogout"
        );
        buttonComponent.simulate("press");
      });
  
      then("I can click create store button with with out errors", async () => {
        let buttonComponent = CustomformConfirmationBlock.findWhere(
          (node) => node.prop("testID") === "btnCreateStoreRedirect"
        );
        buttonComponent.simulate("press");        
      });
  
      then("I can leave the screen with out errors", () => {
        instance.componentWillUnmount();
        expect(CustomformConfirmationBlock).toBeTruthy();
      });
    });
  });