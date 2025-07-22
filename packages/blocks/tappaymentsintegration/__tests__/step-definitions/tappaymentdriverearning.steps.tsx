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
import TappaymentDriverEarning from "../../src/TappaymentDriverEarning";
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
  id: "TappaymentDriverEarning",
};

const filterArrEarning=[
    {
        earningName:'Daily',
        status:false
    },
    {
        earningName:'Weekly',
        status:false
    },
    {
        earningName:'Monthly',
        status:false
    },
    {
      earningName:'Monthly12',
      status:false
    },
];

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

const feature = loadFeature("./__tests__/features/tappaymentdriverearning-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to tappaymentdriverearning", ({ given, when, then }) => {
    let tappaymentdriverearningWrapper: ShallowWrapper;
    let instance: TappaymentDriverEarning;

    given("I am a User loading tappaymentdriverearning", () => {
      tappaymentdriverearningWrapper = shallow(<TappaymentDriverEarning {...screenProps} />);
    });

    when("I navigate to tappaymentdriverearning", () => {
      instance = tappaymentdriverearningWrapper.instance() as TappaymentDriverEarning;
    });

    then("tappaymentdriverearning will load", () => {
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

    then("I can click refresh button with out errors", () => {
        let buttonComponent = tappaymentdriverearningWrapper.findWhere(
          (node) => node.prop("testID") === "refreshDriverEarning"
        );
        buttonComponent.simulate("press");
        expect(buttonComponent.exists()).toBe(true);
    });

    then("I can show earning method flatlist by render with out errors", async () => {
        let render_item = tappaymentdriverearningWrapper.findWhere(
        (node) => node.prop("testID") === "earning_data_show"
        );
        let render_data = render_item.renderProp("renderItem")({item: paymentArrObject[0],index: 0,});
        render_item.renderProp("ItemSeparatorComponent")({})
        render_item.renderProp("keyExtractor")({id:0})
        expect(render_data).toBeTruthy();
    });

    then("I can click on calendar open with out errors", () => {
        let buttonComponent = tappaymentdriverearningWrapper.findWhere(
          (node) => node.prop("testID") === "btnCalendarOpenEarning"
        );
        buttonComponent.simulate("press");
    });

    then("I can click on calendar on change with out errors", () => {
        
        let buttonComponent = tappaymentdriverearningWrapper.findWhere(
          (node) => node.prop("testID") === "calendarTestWorkEarning"
        );
        buttonComponent.simulate("dateChange")
    });

    then("I can click on calendar close with out errors", () => {
        let buttonComponent = tappaymentdriverearningWrapper.findWhere(
          (node) => node.prop("testID") === "btnCalendarCloseEarning"
        );
        buttonComponent.simulate("press");
    });

    then("I should render earning data in flatlist and click weekly with out errors",() => {
        let render_item = tappaymentdriverearningWrapper.findWhere(
          (node) => node.prop("testID") === "earning_data_show"
        );
        let render_data = render_item.renderProp("renderItem")({
          item: filterArrEarning[1],
          index: 0,
        });
        render_item.renderProp("ItemSeparatorComponent")({});
        expect(render_data).toBeTruthy();

        let buttonComponent = render_data.findWhere(
        (node) => node.prop("testID") == "btn_selected_earning_filter"
            );
        buttonComponent.simulate("press");

    });

    then("I can click on weekly calendar on change with out errors", () => {
        let buttonComponentModal = tappaymentdriverearningWrapper.findWhere(
            (node) => node.prop("testID") === "btnCalendarOpenEarning"
          );
          buttonComponentModal.simulate("press");

        let buttonComponent = tappaymentdriverearningWrapper.findWhere(
          (node) => node.prop("testID") === "calendarTestWorkRangeEarning"
        );
        buttonComponent.simulate("dateChange")
    });

    then("I should render earning data in flatlist and click monthly with out errors",() => {
        let render_item = tappaymentdriverearningWrapper.findWhere(
          (node) => node.prop("testID") === "earning_data_show"
        );
        let render_data = render_item.renderProp("renderItem")({
          item: filterArrEarning[2],
          index: 0,
        });
        render_item.renderProp("ItemSeparatorComponent")({});
        render_item.renderProp("keyExtractor")({});
        expect(render_data).toBeTruthy();

        let buttonComponent = render_data.findWhere(
        (node) => node.prop("testID") == "btn_selected_earning_filter"
            );
        buttonComponent.simulate("press");

    });

    then("I can click on monthly calendar on change with out errors", () => {
        let buttonComponentModal = tappaymentdriverearningWrapper.findWhere(
            (node) => node.prop("testID") === "btnCalendarOpenEarning"
          );
          buttonComponentModal.simulate("press");

        let buttonComponent = tappaymentdriverearningWrapper.findWhere(
          (node) => node.prop("testID") === "calendarTestWorkRangeEarning"
        );
        buttonComponent.simulate("dateChange")
    });

    then("I can show earning api work with out errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),paymentArrObject);

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getDriverEarningCallApiId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );
    })

    then("I can click see detail redirect with out errors", () => {
        let buttonComponent = tappaymentdriverearningWrapper.findWhere(
          (node) => node.prop("testID") === "btnSeeDetails"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationAnalyticsDriverEarning" }),
            ])
        );
    });

    then("I can click payment method redirect with out errors", () => {
        let buttonComponent = tappaymentdriverearningWrapper.findWhere(
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

    then("I can click help and support redirect with out errors", () => {
        let buttonComponent = tappaymentdriverearningWrapper.findWhere(
          (node) => node.prop("testID") === "btnHelpSupportRedirect"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationContactUsDriverMessage" }),
            ])
        );
    });

    then("I can show earning activity work with errors", async () => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{
          error:{
            'message':'Invalid Token'
          }
        });
  
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getDriverEarningCallApiId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
        expect(sendMessage.mock.calls).toContainEqual(
              expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "RestAPIResponceMessage" }),
              ])
          );
    })

    then("I should render earning data in flatlist and click undefined with out errors",() => {
      let render_item = tappaymentdriverearningWrapper.findWhere(
        (node) => node.prop("testID") === "earning_data_show"
      );
      let render_data = render_item.renderProp("renderItem")({
        item: filterArrEarning[3],
        index: 0,
      });
      render_item.renderProp("ItemSeparatorComponent")({});
      render_item.renderProp("keyExtractor")({});
      expect(render_data).toBeTruthy();

      let buttonComponent = render_data.findWhere(
      (node) => node.prop("testID") == "btn_selected_earning_filter"
          );
      buttonComponent.simulate("press");

  });


  });
});