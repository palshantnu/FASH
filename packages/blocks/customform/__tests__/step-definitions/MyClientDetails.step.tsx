import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import MyClientsDetails from "../../src/MyClientsDetails";
import { render } from "@testing-library/react-native";
import createGestureHandler from "react-native-gesture-handler"
const mockNavigate = jest.fn();

const screenProps = {
  navigation: {
    navigate: mockNavigate,
    goBack:jest.fn()
  },

  id: "MyClientsDetails",
};
const feature = loadFeature(
  "./__tests__/features/MyClientsDetails.scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
    jest.mock("react-native-tab-view", () => require("react-native-tab-view"));
  });

  test("User navigates to clients tab", ({ given, when, then }) => {
    let MyClientsDetailsWrapper: ShallowWrapper;
    let instance: MyClientsDetails;
    given("I am a User loading clients tab", () => {
      MyClientsDetailsWrapper = shallow(<MyClientsDetails {...screenProps} />);
       
    });

    when("Show over All data list on report screen", () => {
      let flatList = MyClientsDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "flatlistTestID"
      );
      const render_item = flatList.renderProp("renderItem")({
        item: { name: "My Clients", screenName: "MyClients" },
        index: 0,
      });
      let buttonComponent = render_item
        .findWhere((node) => node.prop("testID") === "btnScreen")
        .first();
      buttonComponent.simulate("press");
    });

    then("Showing over all data list in user", () => {
      let flatList = MyClientsDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "flatlistTestID"
      );
      expect(flatList.prop("testID")).toEqual("flatlistTestID");
      // container.instance.isFocused.current = true;
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "token");
      runEngine.sendMessage("token test", tokenMsg);
    });
    then("User goes back",()=>{
      let backButton = MyClientsDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "btnBackClientsAndchat"
      );
      backButton.simulate("press");
    })
    then("session storage and navigation are triggered",()=>{
      const navigation = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navigation.addData(getName(MessageEnum.myClientsItem), {
        clientId:57
      });
      runEngine.sendMessage("UNIT TEST", navigation);

      const createWishlistapi = new Message(getName(MessageEnum.RestAPIResponceMessage));
    let instance=  MyClientsDetailsWrapper.instance() as MyClientsDetails
  
    instance.createWishlistApiCallId=createWishlistapi.messageId;
    createWishlistapi.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: createWishlistapi.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {data:{id:23 }}
      });
      runEngine.sendMessage("stores message", createWishlistapi);

    })
  });
  test("User clicks on go to wishlist button", ({ given, when, then }) => {
    let MyClientsDetailsWrapper: ShallowWrapper;
    let instance: MyClientsDetails;

    given("I am a User loading clients tab", () => {
      MyClientsDetailsWrapper = shallow(<MyClientsDetails {...screenProps} />);
    });

    when("button rendered and clicked", () => {
      let wishlistButton = MyClientsDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "wishListbuttonId"
      );
      wishlistButton.simulate("press");
    });

    then("Showing over all data list in user", () => {
      let wishlistButton = MyClientsDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "wishListbuttonId"
      );
      wishlistButton.exists();
    });
  

  });

  test("Stylist navigates to clients tab", ({ given, when, then }) => {
    let MyClientsDetailsWrapper: ShallowWrapper;
    let instance: MyClientsDetails;
    given("I am a User loading clients tab", () => {
      MyClientsDetailsWrapper = shallow(<MyClientsDetails {...screenProps} />);
       
    });

    when("Stylist enters this screen for client", () => {
      const getClientDetailsApi= new Message(getName(MessageEnum.RestAPIResponceMessage));
      let instance=  MyClientsDetailsWrapper.instance() as MyClientsDetails
      instance.getClientDetailsApiCallId=getClientDetailsApi.messageId;
      getClientDetailsApi.initializeFromObject({
          [getName(MessageEnum.RestAPIResponceDataMessage)]: getClientDetailsApi.messageId,
          [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {data:{id:"",type:"",attributes:{ id: 0,
            stylist_id: 0,
            payment_status:"",
            service_status: "",
            service_informations_id: 0,
            start_date:"",
            end_date: "",
            amount: "",
            buyer_name: "",
            service_information_name: ""}}}
        });
        runEngine.sendMessage("stores message", getClientDetailsApi);
    });

    then("Showing over all data list in stylist", () => {
      let flatList = MyClientsDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "flatlistTestID"
      );
      expect(flatList.prop("testID")).toEqual("flatlistTestID");
      // container.instance.isFocused.current = true;
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "token");
      runEngine.sendMessage("token test", tokenMsg);
    });
    then("time showing text is rendered",()=>{
      
       let myText = MyClientsDetailsWrapper.findWhere(
        (node) => node.prop("testID") === "AmPm"
      );
       expect(myText.props().children).toEqual('#43423-343 | 03.33PM');
    })
    
  });

});
