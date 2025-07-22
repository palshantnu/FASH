import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import * as utils from "../../../../framework/src/Utilities";
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import Customisableuserprofiles2sellerprofile from "../../src/Customisableuserprofiles2sellerprofile"
import { jest, expect,beforeEach } from '@jest/globals';
jest.useFakeTimers()
const navigation = require("react-navigation")
const mockNavigate = jest.fn();
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
    id: "Customisableuserprofiles2sellerprofile"
}

const feature = loadFeature("./__tests__/features/customisableuserprofiles2sellerprofile-scenario.feature");

defineFeature(feature, (test) => {
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    });
  
    test("User navigates to Customisableuserprofiles2sellerprofile", ({ given, when, then }) => {
      let Customisableuserprofiles2sellerprofileBlock: ShallowWrapper;
      let instance: Customisableuserprofiles2sellerprofile;
  
      given("I am a User loading Customisableuserprofiles2sellerprofile", () => {
        Customisableuserprofiles2sellerprofileBlock = shallow(<Customisableuserprofiles2sellerprofile {...screenProps} />);
      });
  
      when("I navigate to the Customisableuserprofiles2sellerprofile", () => {
        instance = Customisableuserprofiles2sellerprofileBlock.instance() as Customisableuserprofiles2sellerprofile;
      });
  
      then("Customisableuserprofiles2sellerprofile will load with out errors", () => {
        expect(Customisableuserprofiles2sellerprofileBlock).toBeTruthy();
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
        const userDetailsResponce = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        userDetailsResponce.initializeFromObject({
          [getName(
            MessageEnum.RestAPIResponceDataMessage
          )]: userDetailsResponce.messageId,
          [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {data:{id:1}}}
        );
       instance.getUserDetailsSellerApiCallID =
       userDetailsResponce.messageId;
        runEngine.sendMessage(userDetailsResponce.messageId, userDetailsResponce);
  
      });

      then("I can click my profile redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "myProfileBtn"
        );
        buttonComponent.simulate("press");
      });

      then("I can click earning redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnEarningRedirection"
        );
        buttonComponent.simulate("press");
      });

      then("I can click bank details redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnBankRedirection"
        );
        buttonComponent.simulate("press");
      });

      then("I can click language and currency redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnLanguageRedirect"
        );
        buttonComponent.simulate("press");
      });

      then("I can click notification status redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnNotificationStatusRedirection"
        );
        buttonComponent.simulate("press");
      });

      then("I can click admin request redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnAdminRequest"
        );
        buttonComponent.simulate("press");
      });

      then("I can click get help redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnGetHelp"
        );
        buttonComponent.simulate("press");
      });

      then("I can click faq redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnFaqRedirect"
        );
        buttonComponent.simulate("press");
      });

      then("I can click terms of use redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnTermsOfUse"
        );
        buttonComponent.simulate("press");
      });

      then("I can click privacy policy redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnPrivacyPolicy"
        );
        buttonComponent.simulate("press");
      });

      then("I can click shipping policy redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnShippingPolicy"
        );
        buttonComponent.simulate("press");
      });

      then("I can click return policy redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnReturnPolicy"
        );
        buttonComponent.simulate("press");
      });

      then("I can click logout with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnLogOutWork"
        );
        buttonComponent.simulate("press");
      });

      then("I can click logout modal with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnLogoutModal"
        );
        buttonComponent.simulate("press");
      });

      then("I can click logout cancel with out errors", () => {
        let buttonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnCancelLogoutModal"
        );
        buttonComponent.simulate("press");
      });
      then('I can press delete btn with out errors', () => {
        let goToReturnButtonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere((node) => node.prop('testID') === 'deleteBtn');
        goToReturnButtonComponent.simulate('press');
        expect(goToReturnButtonComponent).toBeTruthy();
    });

    then('I can press delete confirm btn with out errors', () => {
        let goToReturnButtonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere((node) => node.prop('testID') === 'btnDeleteModal');
        goToReturnButtonComponent.simulate('press');
        const userDeleteResponce = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          userDeleteResponce.initializeFromObject({
            [getName(
              MessageEnum.RestAPIResponceDataMessage
            )]: userDeleteResponce.messageId,
            [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {data:{id:1}}}
          );
         instance.deleteAccountSellerApiCallId =
         userDeleteResponce.messageId;
          runEngine.sendMessage(userDeleteResponce.messageId, userDeleteResponce);
        expect(goToReturnButtonComponent).toBeTruthy();
    });

    then('I can press delete cancel btn with out errors', () => {
        let goToReturnButtonComponent = Customisableuserprofiles2sellerprofileBlock.findWhere((node) => node.prop('testID') === 'btnCancelDeleteModal');
        goToReturnButtonComponent.simulate('press');
        expect(goToReturnButtonComponent).toBeTruthy();
        jest.spyOn(utils, "getStorageData").mockImplementation((key, _):any => {
          if (key === "token") {
            return null
          }
       
      })
      instance.componentDidMount()
    });
      then("I can leave the screen with out errors", () => {
        instance.componentWillUnmount();
        expect(Customisableuserprofiles2sellerprofileBlock).toBeTruthy();
      });
    });
  });