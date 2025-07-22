import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import {render,fireEvent} from '@testing-library/react-native';

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import TappaymentsAddBank from "../../src/TappaymentsAddBank";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
const navigation = require("react-navigation");

export const configJSON = require("../../config.json");
import { _ } from "../../../../framework/src/IBlock";
import { jest, beforeEach, expect } from '@jest/globals';

const screenProps = {
  navigation: {
    navigate:jest.fn(),
    goBack:jest.fn(),
    getParam: (playlist_id: any,topic_id:any) => {
    },
    addListener:(param:string,callback:any)=>{
      callback()
    },
  },
  id: "TappaymentsAddBank",
};

const feature = loadFeature("./__tests__/features/tappaymentsaddbank-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");
let tappaymentsaddbankData = <TappaymentsAddBank {...screenProps}/>

defineFeature(feature, (test) => {
    let screen: ReturnType<typeof render>;
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to tappaymentsaddbank", ({ given, when, then }) => {
    let tappaymentsaddbankWrapper: ShallowWrapper;
    let instance: TappaymentsAddBank;

    given("I am a User loading tappaymentsaddbank", () => {
    screen = render(<TappaymentsAddBank {...screenProps} />);
      tappaymentsaddbankWrapper = shallow(<TappaymentsAddBank {...screenProps} />);
    });

    when("I navigate to the tappaymentsaddbank", () => {
      instance = tappaymentsaddbankWrapper.instance() as TappaymentsAddBank;
    });

    then('tappaymentsaddbank will load with out errors',()=>{
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)

        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "SessionResponseMessage" }),
            ])
        );

        const addBankAccount = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        addBankAccount.initializeFromObject({
          [getName(MessageEnum.RestAPIResponceDataMessage)]:
          addBankAccount.messageId,
          [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          {
            errors : "not found"
          },
        });
        instance.addBankAccountCallApiId = addBankAccount.messageId;
        runEngine.sendMessage("UNIT TEST", addBankAccount);
    }) 

    then('I can click back icon with out errors',()=>{
        const signUp = tappaymentsaddbankWrapper.findWhere(
            (node) => node.prop("testID") === "btnBackAddBank")
        signUp.simulate("press")
        expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    }) 

    then("I am trying to add bank with empty account holder name", () => {
        const textInput = screen.getByTestId("txt_enter_account_name");
        fireEvent(textInput, "onChangeText", "");
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnAddBankAccount'))
        expect(screen.getByTestId("txt_enter_account_name").props.value).toBe("");
    });

    then("I can enter a account holder name with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_account_name");
        fireEvent(textInput, "onChangeText", "Kuwait");
        fireEvent.press(screen.getByTestId('btnAddBankAccount'))
        expect(screen.getByTestId("txt_enter_account_name").props.value).toBe("Kuwait");
    });

    then("I am trying to add bank with empty iban number", () => {
        const textInput = screen.getByTestId("txt_enter_iban_number");
        fireEvent(textInput, "onChangeText", "");
        fireEvent.press(screen.getByTestId('btnAddBankAccount'))
        expect(screen.getByTestId("txt_enter_iban_number").props.value).toBe("");

    });

    then("I can enter a iban number with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_iban_number");
        fireEvent(textInput, "onChangeText", 123456);
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnAddBankAccount'))
        expect(screen.getByTestId("txt_enter_iban_number").props.value).toBe(123456);
    });

    then("I am trying to add bank with empty account number", () => {
        const textInput = screen.getByTestId("txt_enter_account_number");
        fireEvent(textInput, "onChangeText", "");
        fireEvent.press(screen.getByTestId('btnAddBankAccount'))
        expect(screen.getByTestId("txt_enter_account_number").props.value).toBe("");

    });

    then("I can enter a account number with out errors", () => {
        const textInput = screen.getByTestId("txt_enter_account_number");
        fireEvent(textInput, "onChangeText", 123456);
        fireEvent(textInput, "onSubmitEditing");
        fireEvent.press(screen.getByTestId('btnAddBankAccount'))
        expect(screen.getByTestId("txt_enter_account_number").props.value).toBe(123456);
    });

    then("I can add bank Should Pass and update data", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            "errors": [
                {
                    "failed_login": "Data send"
                }
            ]
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.addBankAccountCallApiId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);  
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        ); 
    }) 

    then("I can add bank profile Should Pass and update data with errors", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
        {
            "error":
                {
                    "failed_login": "Data send"
                }
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.addBankAccountCallApiId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        ); 
    
    }) 

    then("I can add bank Should Pass and update data with response error", () => {

      const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
          "error": 
              {
                  "failed_login": "Data send"
              }
      });

      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
      instance.addBankAccountCallApiId = msgLogInErrorRestAPI.messageId
      runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);  
      expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
      ); 
    }) 
  });
});
