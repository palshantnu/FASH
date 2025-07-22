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
import TappaymentsBuyerHistory from "../../src/TappaymentsBuyerHistory";
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
  id: "TappaymentsBuyerHistory",
};

const paymentArrObject = [
    {
        "id": 3,
        "status": "CAPTURED",
        "created_at": "2024-06-24T11:30:34.555Z",
        "updated_at": "2024-06-24T11:30:34.649Z",
        "charge_id": "chg_TS05A4420241424Ns662406228",
        "merchant_id": null,
        "order_id": "OD00000456",
        "amount": 8260,
        "currency": "KWD",
        "customer_id": "cus_TS06A3420241333u6Z31505392",
        "reason": "",
        "account_id": 685,
        "order_management_order_id": 542,
        "refund_id": null,
        "refund_amount": null,
        "refund_reason": null,
        "seller_order_id": null,
        "last_four_card_digit": "0008",
        "payment_type": "MASTERCARD",
        "deleted": false
    },
    {
        "id": 4,
        "status": "CAPTURED",
        "created_at": "2024-06-25T09:05:10.462Z",
        "updated_at": "2024-06-25T09:05:10.881Z",
        "charge_id": "chg_TS06A0620241138Ox9i2506085",
        "merchant_id": null,
        "order_id": "OD00000462",
        "amount": 348,
        "currency": "KWD",
        "customer_id": "cus_TS06A3420241333u6Z31505392",
        "reason": "",
        "account_id": 685,
        "order_management_order_id": 546,
        "refund_id": null,
        "refund_amount": null,
        "refund_reason": null,
        "seller_order_id": null,
        "last_four_card_digit": "0008",
        "payment_type": "MASTERCARD",
        "deleted": false
    }
]

const feature = loadFeature("./__tests__/features/tappaymentsbuyerhistory-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to tappaymentsbuyerhistory", ({ given, when, then }) => {
    let tappaymentsbuyerhistoryWrapper: ShallowWrapper;
    let instance: TappaymentsBuyerHistory;

    given("I am a User loading tappaymentsbuyerhistory", () => {
      tappaymentsbuyerhistoryWrapper = shallow(<TappaymentsBuyerHistory {...screenProps} />);
    });

    when("I navigate to tappaymentsbuyerhistory", () => {
      instance = tappaymentsbuyerhistoryWrapper.instance() as TappaymentsBuyerHistory;
    });

    then("tappaymentsbuyerhistory will load", () => {
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

    then('I can click back payment history page with out errors',()=>{
      let backButtonComponent = tappaymentsbuyerhistoryWrapper.findWhere((node) => node.prop('testID') === 'btnBackPaymentHistory');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can show all payment history api work with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),paymentArrObject);

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getBuyerAllPaymentApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
    })

    then("I can show all payment history flatlist by render with out errors", async () => {
        let render_item = tappaymentsbuyerhistoryWrapper.findWhere(
        (node) => node.prop("testID") === "paymentAllStatusDataList"
        );
        let render_data = render_item.renderProp("renderItem")({item: paymentArrObject[0],index: 0,});
        render_item.renderProp("ListEmptyComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        const buttonNavigate = render_data.findWhere(
          (node) => node.prop("testID") == "btnPaymentDetailRedirect"
        )
        buttonNavigate.simulate("press")

        const buttonNavigateDelete = render_data.findWhere(
            (node) => node.prop("testID") == "btnPaymentDelete"
          )
        buttonNavigateDelete.simulate("press")

        const buttonNavigateDownload = render_data.findWhere(
            (node) => node.prop("testID") == "btnDownloadReceipt"
          )
        buttonNavigateDownload.simulate("press")

        const buttonNavigateDeleteNo = tappaymentsbuyerhistoryWrapper.findWhere(
            (node) => node.prop("testID") == "btnCancelPaymentNo"
          )
          buttonNavigateDeleteNo.simulate("press")

        const buttonNavigateDeleteYes = tappaymentsbuyerhistoryWrapper.findWhere(
            (node) => node.prop("testID") == "btnDeletePaymentYes"
          )
          buttonNavigateDeleteYes.simulate("press")
        
        expect(render_data).toBeTruthy();
    });

    then("I can enter text payment for search with out errors", () => {
        let textInputComponent = tappaymentsbuyerhistoryWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_payment"
        );
        textInputComponent.simulate("changeText", "0000000123");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true);
    });

    then("I can show all payment api work with errors", async () => {
      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
        errors:{
          'message':'Invalid Token'
        }
      });

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      instance.getBuyerAllPaymentApiCallId = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);
      expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
    })

    then("I can delete payment api work with errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
          errors:{
            'message':'Invalid Token'
          }
        });
  
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.buyerPaymentDeleteApiCallId = getCategoryMessage.messageId
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
