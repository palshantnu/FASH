import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CustomformDriverDocument from "../../src/CustomformDriverDocument";

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
    id: "CustomformDriverDocument",
};

const feature = loadFeature("./__tests__/features/customformdriverdocument-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to customformdriverdocument", ({ given, when, then }) => {
    let customformdriverdocumentBlock: ShallowWrapper;
    let instance: CustomformDriverDocument;

    given("I am a User loading customformdriverdocument", () => {
        customformdriverdocumentBlock = shallow(<CustomformDriverDocument {...screenProps} />);
    });

    when("I navigate to the customformdriverdocument", () => {
      instance = customformdriverdocumentBlock.instance() as CustomformDriverDocument;
    });

    then("customformdriverdocument will load with out errors", () => {
      
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "SessionResponseMessage" }),
        ])
      );
    });

    then("I can click on back button store with out errors", () => {
        let buttonComponent = customformdriverdocumentBlock.findWhere(
          (node) => node.prop("testID") === "btnBackDriverDocument"
        );
        buttonComponent.simulate("press");
    });

    then("I can upload profile photo api with out errors", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "profile_photo_status": "In Review",
          "license_status": "Submit Again Not Approved",
          "vehicle_registration_status": "Approved",
          "bank_detail_status": "Submit bank details"
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.getDriverDocumentSubApiCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
        );
    
    })

    then("I can click on profile photo button store with out errors", () => {
        let buttonComponent = customformdriverdocumentBlock.findWhere(
          (node) => node.prop("testID") === "btnProfilePhoto"
        );
        buttonComponent.simulate("press");
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "NavigationDriverProfilePhotoMessage" }),
          ])
        );
    });

    then("I can click on driving license button store with out errors", () => {
      let buttonComponent = customformdriverdocumentBlock.findWhere(
        (node) => node.prop("testID") === "btnDrivingLicenseRedirect"
      );
      buttonComponent.simulate("press");
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationDriverProfilePhotoMessage" }),
        ])
      );
    });

    then("I can click on vehicle registration button store with out errors", () => {
      let buttonComponent = customformdriverdocumentBlock.findWhere(
        (node) => node.prop("testID") === "btnAddVehicleDriver"
      );
      buttonComponent.simulate("press");
     
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationDriverProfilePhotoMessage" }),
        ])
      );
    });

    then("I can click on add bank button with out errors", () => {
      let buttonComponent = customformdriverdocumentBlock.findWhere(
        (node) => node.prop("testID") === "btnBankDriverRedirect"
      );
      buttonComponent.simulate("press");
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationTappaymentAddBank" }),
        ])

      );
      let logoutbtn = customformdriverdocumentBlock.findWhere(
        (node) => node.prop("testID") === "logoutbtn"
      );
      logoutbtn.simulate("press");
      const requestmsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      requestmsg.addData(getName(MessageEnum.BidYourQuote), {
        from: "Profile",
      }); 
      runEngine.sendMessage("UNIT TEST", requestmsg);
      let buttonComponent1 = customformdriverdocumentBlock.findWhere(
        (node) => node.prop("testID") === "btnBackDriverDocument"
      );
      buttonComponent1.simulate("press");
    });

  });
});
