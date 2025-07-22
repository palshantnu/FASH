import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import * as utils from "../../../../framework/src/Utilities";
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import Customisableuserprofiles2driverprofile from "../../src/Customisableuserprofiles2driverprofile"
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
    id: "Customisableuserprofiles2driverprofile"
}

const feature = loadFeature("./__tests__/features/customisableuserprofiles2driverprofile-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    });
  
    test("User navigates to Customisableuserprofiles2driverprofile", ({ given, when, then }) => {
      let Customisableuserprofiles2driverprofileBlock: ShallowWrapper;
      let instance: Customisableuserprofiles2driverprofile;
  
      given("I am a User loading Customisableuserprofiles2driverprofile", () => {
        Customisableuserprofiles2driverprofileBlock = shallow(<Customisableuserprofiles2driverprofile {...screenProps} />);
      });
  
      when("I navigate to the Customisableuserprofiles2driverprofile", async() => {
        instance = Customisableuserprofiles2driverprofileBlock.instance() as Customisableuserprofiles2driverprofile;
      });
  
      then("Customisableuserprofiles2driverprofile will load with out errors", () => {
      
       
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "SessionResponseMessage" }),
            ])
        );
      });

      then("I can click vehicle show redirection with out errors", () => {
        const userDetailsResponce = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        userDetailsResponce.initializeFromObject({
          [getName(
            MessageEnum.RestAPIResponceDataMessage
          )]: userDetailsResponce.messageId,
          [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {data:{id:1}}}
        );
       instance.getUserDetailsDriverApiCallID =
       userDetailsResponce.messageId;
        runEngine.sendMessage(userDetailsResponce.messageId, userDetailsResponce);
  
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnAddVehicleRedirection"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationDriverShowVehicleMessage" }),
            ])
        );
      });

      then("I can click documents redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnRedirectionDocuments"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationDriverDocuments" }),
            ])
        );
      });

      then("I can click earning activity redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnEarningRedirect"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationTappaymentDEarningActivity" }),
            ])
        );
      });

      then("I can click my profile redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "myProfileBtnRedirection"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationProfileScreenMessage" }),
            ])
        );
      });

      then("I can click edit address redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnEditAddress"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationDriverEditAddressMessage" }),
            ])
        );
      });

      then("I can click go to language and currency redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "languageCurrencyBtn"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationBuyerLanguageAndCurrencyMessage" }),
            ])
        );
      });

      then("I can click payment method redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnPaymentMethodRedirect"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationTappaymentsDriverBankDetail" }),
            ])
        );
      });

      then("I can click customer support redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "contactUsRedirectionBtn"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationContactUsDriverMessage" }),
            ])
        );
      });

      then("I can click frequently asked questions redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "faqRedirectionBtn"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationCustomisableProfileFaq" }),
            ])
        );
      });

      then("I can click terms of use redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "termAndConditionBtn"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationTermsAndUseMessage" }),
            ])
        );
      });

      then("I can click privacy policy redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnPrivacyPolicy"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationTermsConditionsDetailMessage" }),
            ])
        );
      });

      then("I can click product delivered policy redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "productPolicyBtnRedirection"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationTermsConditionsDetailMessage" }),
            ])
        );
      });

      then("I can click payout policy redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "payoutPolicyBtnRedirection"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationTermsConditionsDetailMessage" }),
            ])
        );
      });

      then("I can click logout with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "logoutBtnDriver"
        );
        buttonComponent.simulate("press");
        let modalComponent = Customisableuserprofiles2driverprofileBlock.findWhere((node) => node.prop("testID") === "logoutModal");
        expect(modalComponent.prop("visible")).toBe(true);
      });

      then("I can click logout modal with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnLogoutModal"
        );
        buttonComponent.simulate("press");
        expect(buttonComponent.exists()).toBe(true);
      });

      then("I can click logout cancel with out errors", () => {
        let buttonComponent = Customisableuserprofiles2driverprofileBlock.findWhere(
          (node) => node.prop("testID") === "btnCancelLogoutModal"
        );
        buttonComponent.simulate("press");
        let modalComponent = Customisableuserprofiles2driverprofileBlock.findWhere((node) => node.prop("testID") === "logoutModal");
        modalComponent.simulate("press");
        expect(modalComponent.prop("visible")).toBe(false);
      });
      then('I can press delete btn with out errors', () => {
        let goToReturnButtonComponent = Customisableuserprofiles2driverprofileBlock.findWhere((node) => node.prop('testID') === 'deleteBtn');
        goToReturnButtonComponent.simulate('press');
        expect(goToReturnButtonComponent).toBeTruthy();
    });

    then('I can press delete confirm btn with out errors', () => {
        let goToReturnButtonComponent = Customisableuserprofiles2driverprofileBlock.findWhere((node) => node.prop('testID') === 'btnDeleteModal');
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
         instance.deleteAccountDriverApiCallId =
         userDeleteResponce.messageId;
          runEngine.sendMessage(userDeleteResponce.messageId, userDeleteResponce);
        expect(goToReturnButtonComponent).toBeTruthy();
        
    });

    then('I can press delete cancel btn with out errors', () => {
      jest.spyOn(utils, "getStorageData").mockImplementation((key, _):any => {
        if (key === "token") {
          return null
        }
     
    })
    instance.componentDidMount()
        let goToReturnButtonComponent = Customisableuserprofiles2driverprofileBlock.findWhere((node) => node.prop('testID') === 'btnCancelDeleteModal');
        goToReturnButtonComponent.simulate('press');
        expect(goToReturnButtonComponent).toBeTruthy();
    });
    });
  });