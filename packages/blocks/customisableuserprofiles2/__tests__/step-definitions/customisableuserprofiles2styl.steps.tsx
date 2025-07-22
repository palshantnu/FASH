import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import * as utils from "../../../../framework/src/Utilities";
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import Customisableuserprofiles2styl from "../../src/Customisableuserprofiles2styl"
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
    id: "Customisableuserprofiles2styl"
}

const feature = loadFeature("./__tests__/features/customisableuserprofiles2styl-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    });
  
    test("User navigates to customisableuserprofiles2styl", ({ given, when, then }) => {
      let Customisableuserprofiles2stylBlock: ShallowWrapper;
      let instance: Customisableuserprofiles2styl;
  
      given("I am a User loading customisableuserprofiles2styl", () => {
        Customisableuserprofiles2stylBlock = shallow(<Customisableuserprofiles2styl {...screenProps} />);
      });
  
      when("I navigate to the customisableuserprofiles2styl", () => {
        instance = Customisableuserprofiles2stylBlock.instance() as Customisableuserprofiles2styl;
      });
  
      then("customisableuserprofiles2styl will load with out errors", () => {
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
       instance.getUserDetailsApiCallID =
       userDetailsResponce.messageId;
        runEngine.sendMessage(userDetailsResponce.messageId, userDetailsResponce);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "SessionResponseMessage" }),
            ])
        );
      
      });

      then("I can click portfolio redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnPortfolioRedirect"
        );
        buttonComponent.simulate("press");

        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationPhotoLibrary" }),
            ])
        );
      });

      then("I can click stylist earning redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnEarningStylist"
        );
        buttonComponent.simulate("press");

        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationTappaymentSellerEarning" }),
            ])
        );
      });

      then("I can click stylist bank details redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnBankDetailsStylist"
        );
        buttonComponent.simulate("press");

        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationTappaymentsDriverBankDetail" }),
            ])
        );
      });

      then("I can click stylist language redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnStylistLanguage"
        );
        buttonComponent.simulate("press");

        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationBuyerLanguageAndCurrencyMessage" }),
            ])
        );
      });

      then("I can click notification settings redirection with out errors", () => {
          let btnEditProfileRedirection = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnEditProfileRedirection"
          );
          btnEditProfileRedirection.simulate("press");
          let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
            (node) => node.prop("testID") === "btnNotifcationSetRedirection"
            );
            buttonComponent.simulate("press");
          expect(sendMessage.mock.calls).toContainEqual(
              expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationNotificationsettingsStylist" }),
              ])
          );
      });

      then("I can click stylist payment history redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnStylistPayment"
        );
        buttonComponent.simulate("press");

        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationTappaymentsBuyerHistory" }),
            ])
        );
      });

      then("I can click stylist address redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnStylistAddress"
        );
        buttonComponent.simulate("press");

        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationAddressesMessage" }),
            ])
        );
      });
    
      then("I can click get help redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnGetHelpStylist"
        );
        buttonComponent.simulate("press");

        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationContactUsMessage" }),
            ])
        );
      });

      then("I can click faq redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnFaqRedirectStylist"
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
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnTermsOfUseStylist"
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
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnPrivacyPolicyStylist"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationTermsConditionsDetailMessage" }),
            ])
        );
      });

      then("I can click shipping policy redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnShippingPolicy"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationShippingPolicyMessage" }),
            ])
        );
      });

      then("I can click return policy redirection with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnReturnPolicyStylist"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationReturnPolicyMessage" }),
            ])
        );
      });

      then("I can click logout with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnLogOutStylist"
        );
        buttonComponent.simulate("press");
        let modalComponent = Customisableuserprofiles2stylBlock.findWhere((node) => node.prop("testID") === "logoutModal");
        expect(modalComponent.prop("visible")).toBe(true);
      });

      then("I can click logout modal with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnLogoutModalStylist"
        );
        buttonComponent.simulate("press");
        expect(buttonComponent.exists()).toBe(true);
      });

      then("I can click logout cancel with out errors", () => {
        let buttonComponent = Customisableuserprofiles2stylBlock.findWhere(
          (node) => node.prop("testID") === "btnCancelModalStylist"
        );
        buttonComponent.simulate("press");
        let modalComponent = Customisableuserprofiles2stylBlock.findWhere((node) => node.prop("testID") === "logoutModal");
        expect(modalComponent.prop("visible")).toBe(false);
      });
      then('I can press delete btn with out errors', () => {
        let goToReturnButtonComponent = Customisableuserprofiles2stylBlock.findWhere((node) => node.prop('testID') === 'deleteBtn');
        goToReturnButtonComponent.simulate('press');
        expect(goToReturnButtonComponent).toBeTruthy();
    });

    then('I can press delete confirm btn with out errors', () => {
        let goToReturnButtonComponent = Customisableuserprofiles2stylBlock.findWhere((node) => node.prop('testID') === 'btnDeleteModal');
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
         instance.deleteAccountApiCallId =
         userDeleteResponce.messageId;
          runEngine.sendMessage(userDeleteResponce.messageId, userDeleteResponce);
        expect(goToReturnButtonComponent).toBeTruthy();
    });

    then('I can press delete cancel btn with out errors', () => {
        let goToReturnButtonComponent = Customisableuserprofiles2stylBlock.findWhere((node) => node.prop('testID') === 'btnCancelDeleteModal');
        goToReturnButtonComponent.simulate('press');
        expect(goToReturnButtonComponent).toBeTruthy();
        jest.spyOn(utils, "getStorageData").mockImplementation((key, _):any => {
          if (key === "token") {
            return null
          }
       
      })
      instance.componentDidMount()
    });
    });
  });