import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { jest, expect, beforeEach } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import TappaymentsDriverBankDetail from "../../src/TappaymentsDriverBankDetail";
const navigation = require("react-navigation");

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
  id: "TappaymentsDriverBankDetail",
};

const paymentArrObject = [
    {
        "id": "94",
        "type": "bank_detail",
        "attributes": {
            "bank_name": '',
            "account_holder_name": "vcvx",
            "bank_code": '',
            "account_number": "vxcvsddsx",
            "iban": "jjj111",
            "is_default": false
        }
    }
]

const feature = loadFeature("./__tests__/features/tappaymentsdriverbankdetail-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to tappaymentsdriverbankdetail", ({ given, when, then }) => {
    let tappaymentsdriverbankdetailWrapper: ShallowWrapper;
    let instance: TappaymentsDriverBankDetail;

    given("I am a User loading tappaymentsdriverbankdetail", () => {
      tappaymentsdriverbankdetailWrapper = shallow(<TappaymentsDriverBankDetail {...screenProps} />);
    });

    when("I navigate to tappaymentsdriverbankdetail", () => {
      instance = tappaymentsdriverbankdetailWrapper.instance() as TappaymentsDriverBankDetail;
    });

    then("tappaymentsdriverbankdetail will load", () => {
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

    then('I can click back payment method page with out errors',()=>{
      let backButtonComponent = tappaymentsdriverbankdetailWrapper.findWhere((node) => node.prop('testID') === 'btnBackPaymentMethod');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can show all payment method api work with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),paymentArrObject);

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getDriverPaymentMethodApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
    })

    then("I can show all payment method flatlist by render with out errors", async () => {
        let render_item = tappaymentsdriverbankdetailWrapper.findWhere(
        (node) => node.prop("testID") === "paymentMethodShow"
        );
        let render_data = render_item.renderProp("renderItem")({item: paymentArrObject[0],index: 0,});
        render_item.renderProp("ListEmptyComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        
        expect(render_data).toBeTruthy();
    });

    then("I can show all payment method api work with errors", async () => {
      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
        errors:{
          'message':'Invalid Token'
        }
      });

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      instance.getDriverPaymentMethodApiCallId = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
    })

  });
});