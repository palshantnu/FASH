import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { jest, beforeEach, expect,} from "@jest/globals";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import * as helpers from "../../../../framework/src/Helpers";

import { Listener } from "../../__mock__/eventlistener";
import StylistCatalogue from "../../src/StylistCatalogue";

const listener = new Listener();
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback: any) => {
      if (event === "focus") {
        callback();
      }
      if (event === "willFocus") {
        callback();
      }
      if (event === "didFocus") {
        callback();
      }
      if (event === "willBlur") {
        callback();
      }
      if (event === "didBlur") {
        callback();
      }
    }),
  },
  id: "StylistCatalogue",
};
const sendMessage = jest.spyOn(runEngine, "sendMessage");
const feature = loadFeature("./__tests__/features/stylistCatalogue-scenario.feature");
const response = {"data": [
    {
        "id": "20",
        "type": "service",
        "attributes": {
            "name": "weekly_plan",
            "styling_per_week": 5,
            "discussion_time": "30",
            "voice_call_facility": true,
            "video_call_facility": true,
            "service_charges": 300.0
        }
    },
    {
        "id": "26",
        "type": "service",
        "attributes": {
            "name": "monthly_plan",
            "styling_per_week": 4,
            "discussion_time": "5",
            "voice_call_facility": true,
            "video_call_facility": true,
            "service_charges": 89.0
        }
    }
]}
const responseNew = {"data":[{"id":"95","type":"service","attributes":{"name":"weekly_plan","styling_per_week":1,"discussion_time":"1","voice_call_facility":true,"video_call_facility":true,"service_charges":5}}]}
 defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
    jest.mock('react-native-tab-view', () => require('react-native-tab-view'));
  });

  test("User navigates to catalogue", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: StylistCatalogue;

    given("I am a User loading catalogue", () => {
      exampleBlockA = shallow(<StylistCatalogue {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      instance = exampleBlockA.instance() as StylistCatalogue;
    });

    then("catalogue will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click back Icon with out errors", () => {
        const panGestureHandler = exampleBlockA.findWhere(
          (node) => node.prop("onResponderStart") === instance.handleResponderStart
        );
        
        // Left Swipe
        panGestureHandler.props().onResponderStart({
          nativeEvent: { pageX: 100, pageY: 100 },
        });

        panGestureHandler.props().onResponderMove({
          nativeEvent: { pageX: 50, pageY: 100 },
        });
        exampleBlockA.update();
        expect(instance.state.index).toBe(1);

        // intrupted swipe left
        panGestureHandler.props().onResponderMove({
          nativeEvent: { pageX: 50, pageY: 100 },
        });
        exampleBlockA.update();
        expect(instance.state.index).toBe(1);

        panGestureHandler.props().onResponderRelease();
        exampleBlockA.update();
        
        // Left Swipe
        panGestureHandler.props().onResponderStart({
          nativeEvent: { pageX: 100, pageY: 100 },
        });

        panGestureHandler.props().onResponderMove({
          nativeEvent: { pageX: 50, pageY: 100 },
        });
        panGestureHandler.props().onResponderRelease();
        exampleBlockA.update();
        expect(instance.state.index).toBe(2);

        // Left Swipe
        panGestureHandler.props().onResponderStart({
          nativeEvent: { pageX: 100, pageY: 100 },
        });

        panGestureHandler.props().onResponderMove({
          nativeEvent: { pageX: 50, pageY: 100 },
        });
        panGestureHandler.props().onResponderRelease();
        exampleBlockA.update();
        expect(instance.state.index).toBe(2);

        // Right Swipe
        panGestureHandler.props().onResponderStart({
          nativeEvent: { pageX: 100, pageY: 100 },
        });

        panGestureHandler.props().onResponderMove({
          nativeEvent: { pageX: 150, pageY: 100 },
        });
        panGestureHandler.props().onResponderRelease();
        exampleBlockA.update();
        expect(instance.state.index).toBe(1);

        // Right Swipe
        panGestureHandler.props().onResponderStart({
          nativeEvent: { pageX: 100, pageY: 100 },
        });

        panGestureHandler.props().onResponderMove({
          nativeEvent: { pageX: 150, pageY: 100 },
        });
        panGestureHandler.props().onResponderRelease();
        exampleBlockA.update();
        expect(instance.state.index).toBe(0);

        // Right Swipe
        panGestureHandler.props().onResponderStart({
          nativeEvent: { pageX: 100, pageY: 100 },
        });

        panGestureHandler.props().onResponderMove({
          nativeEvent: { pageX: 150, pageY: 100 },
        });
        panGestureHandler.props().onResponderRelease();
        exampleBlockA.update();
        expect(instance.state.index).toBe(0);

        // Vertical Swipe
        panGestureHandler.props().onResponderStart({
          nativeEvent: { pageX: 100, pageY: 100 },
        });

        panGestureHandler.props().onResponderMove({
          nativeEvent: { pageX: 100, pageY: 80 },
        });
        panGestureHandler.props().onResponderRelease();
        exampleBlockA.update();
        
        let buttonComp = exampleBlockA.findWhere(
            (node) => node.prop("testID") === "toggleId"
          );
          buttonComp.simulate("press");
    
          const msgTokenAPI = new Message(
            getName(MessageEnum.SessionResponseMessage)
          );
          msgTokenAPI.addData(
            getName(MessageEnum.SessionResponseToken),
            "User-Token"
          );
          runEngine.sendMessage("Unit Test", msgTokenAPI);
          expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "SessionResponseMessage" }),
            ])
          );
          
          let buttonComp3 = exampleBlockA.findWhere(
            (node) => node.prop("testID") === "btnBackCatalogue"
          );
          buttonComp3.simulate("press");

          const flatlistWrapper5 = exampleBlockA.findWhere(
            (node) => node.prop("data-test-id") === "TabId"
         );
          const render_item5 = flatlistWrapper5.renderProp("renderScene")({route:{key:"first"}});

        const flatlistWrapper = exampleBlockA.findWhere(
            (node) => node.prop("data-test-id") === "TabId"
         );
          const render_item = flatlistWrapper.renderProp("renderScene")({route:{key:"second"}});

          const flatlistWrapper1 = exampleBlockA.findWhere(
            (node) => node.prop("data-test-id") === "TabId"
         );
          const render_item1 = flatlistWrapper1.renderProp("renderTabBar")();
          
          const render_item3 = flatlistWrapper1.renderProp("onIndexChange")();

          instance.SecondRoute()

          const apiTestMsg = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
          );
          apiTestMsg.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            apiTestMsg.messageId
          );
          apiTestMsg.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            response
          );
          instance.getPlanListId = apiTestMsg.messageId;
          runEngine.sendMessage("Test", apiTestMsg);
    
          expect(exampleBlockA.length).toBeGreaterThan(0);
          
    });

    then("I can call api catalogue with out errors", async () => {
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        response
      );
      instance.deletePlanListId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      expect(exampleBlockA.length).toBeGreaterThan(0);
    });

    then("I can show all catalogue with list view and with out errors", () => {
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        response
      );
      instance.getParticularPlanId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      expect(exampleBlockA.length).toBeGreaterThan(0);
    });

    then("I can call api catalogue with errors", async () => {
      const flatlistWrapper5 = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "TabId"
     );
      const render_item5 = flatlistWrapper5.renderProp("renderScene")({route:{key:"third"}});
      let buttonComp = render_item5.findWhere(
        (node) => node.prop("testID") === "btnNext"
      );
      buttonComp.simulate("press"); 
      let buttonComps = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "manualBtn"
      );
      buttonComps.simulate("press"); 
      let cancelBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "cancelBtn"
      );
      cancelBtn.simulate("press");
      let manualBtnCsv = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "manualBtnCsv"
      );
      manualBtnCsv.simulate("press"); 
      let closeBtn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "closeBtn"
      );
      closeBtn.simulate("press"); 
      let modal = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "modal"
      );
      modal.props().onRequestClose(); 
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        responseNew
      );
      instance.getAllCatalogueApiCallId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);
      const flatlistWrappers5 = exampleBlockA.findWhere(
        (node) => node.prop("data-test-id") === "TabId"
     );
      const render_items5 = flatlistWrappers5.renderProp("renderScene")({route:{key:"third"}});
      const flatlists = render_items5.findWhere(
        (node) => node.prop("testID") === "catalogue_show_flatlist_list"
      )
      
      flatlists.props().onEndReached()
      const renderItems = flatlists.renderProp("renderItem")({ item:  responseNew.data[0], index: 0 })
      const buttonNavigates = renderItems.findWhere(
        (node) => node.prop("testID") == "btnCatalogueListRedirection"
      )
      buttonNavigates.simulate('press')
 let newRender=flatlists.renderProp("renderItem")({ item: {type:'addProduct'}, index: 0 })
 const btnAddProducts = newRender.findWhere(
  (node) => node.prop("testID") == "btnAddProducts"
)
btnAddProducts.simulate('press')
expect(exampleBlockA.length).toBeGreaterThan(0);
 
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();

      exampleBlockA.setState({ heartWishlist: false });
      exampleBlockA.setState({ heartWishlist: require('path-to-heart-icon.png') });
      expect(exampleBlockA.find('Image').exists()).toBe(true);
    });
  });
});
