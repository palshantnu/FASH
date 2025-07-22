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
import TappaymentsPaymentDetail from "../../src/TappaymentsPaymentDetail";
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
  id: "TappaymentsPaymentDetail",
};

const feature = loadFeature("./__tests__/features/tappaymentspaymentdetail-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to tappaymentspaymentdetail", ({ given, when, then }) => {
    let tappaymentsPaymentDetailWrapper: ShallowWrapper;
    let instance: TappaymentsPaymentDetail;

    given("I am a User loading tappaymentspaymentdetail", () => {
      tappaymentsPaymentDetailWrapper = shallow(<TappaymentsPaymentDetail {...screenProps} />);
    });

    when("I navigate to tappaymentspaymentdetail", () => {
      instance = tappaymentsPaymentDetailWrapper.instance() as TappaymentsPaymentDetail;
    });

    then("tappaymentspaymentdetail will load", () => {
        const msgNavigationPayload = new Message(getName(MessageEnum.NavigationPayLoadMessage));
        msgNavigationPayload.addData(getName(MessageEnum.paymentDetailPayloadMessage), {
          url:''
        });
        runEngine.sendMessage("Unit Test", msgNavigationPayload);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationPayLoadMessage" }),
            ])
        );
    });

    then('I can click back transaction page with out errors',()=>{
      let backButtonComponent = tappaymentsPaymentDetailWrapper.findWhere((node) => node.prop('testID') === 'btnBackTransaction');
      backButtonComponent.simulate('press');
      expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then('I can click download receipt pdf with out errors',()=>{
      let backButtonComponent = tappaymentsPaymentDetailWrapper.findWhere((node) => node.prop('testID') === 'btnDownloadPdf');
      backButtonComponent.simulate('press');
      expect(backButtonComponent.exists()).toBe(true);
    });
  });
});
