import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CustomformDriverAgencyDocument from "../../src/CustomformDriverAgencyDocument";

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
    id: "CustomformDriverAgencyDocument",
};

const feature = loadFeature("./__tests__/features/customformdriveragencydocument-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to customformdriveragencydocument", ({ given, when, then }) => {
    let customformdriveragencydocumentBlock: ShallowWrapper;
    let instance: CustomformDriverAgencyDocument;

    given("I am a User loading customformdriveragencydocument", () => {
        customformdriveragencydocumentBlock = shallow(<CustomformDriverAgencyDocument {...screenProps} />);
    });

    when("I navigate to the customformdriveragencydocument", () => {
      instance = customformdriveragencydocumentBlock.instance() as CustomformDriverAgencyDocument;
    });

    then("customformdriveragencydocument will load with out errors", () => {
      
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

    then("I can click on back button agency with out errors", () => {
        let buttonComponent = customformdriveragencydocumentBlock.findWhere(
          (node) => node.prop("testID") === "btnBackDriverAgencyDocument"
        );
        buttonComponent.simulate("press");
        expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can click on contact support button with out errors", () => {
      let buttonComponent = customformdriveragencydocumentBlock.findWhere(
        (node) => node.prop("testID") === "btnContactRedirectAgency"
      );
      buttonComponent.simulate("press");
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationContactUsDriverMessage" }),
        ])
      );
    });

    then("I can get agency document status api with out errors", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "profile_photo_status": "In Review",
          "license_status": "In Review",
          "vehicle_registration_status": "Approved",
          "agency_authorization_letter_status": "Submit Again",
          "bank_detail_status": "Submit bank details"
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.getDriverAgencyDocumentApiCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
        );
    })

    then("I can click on profile photo button agency with out errors", () => {
      let buttonComponent = customformdriveragencydocumentBlock.findWhere(
        (node) => node.prop("testID") === "btnProfilePhotoAgency"
      );
      buttonComponent.simulate("press");
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationDriverProfilePhotoMessage" }),
        ])
      );
    });

    then("I can click on driving license button agency with out errors", () => {
      let buttonComponent = customformdriveragencydocumentBlock.findWhere(
        (node) => node.prop("testID") === "btnDrivingLicenseRedirectAgency"
      );
      buttonComponent.simulate("press");
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationDriverDocumentUploadMessage" }),
        ])
      );
    });

    then("I can click on add vehicle button agency with out errors", () => {
      let buttonComponent = customformdriveragencydocumentBlock.findWhere(
        (node) => node.prop("testID") === "btnAddVehicleRegistration"
      );
      buttonComponent.simulate("press");
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationSelectVehicle" }),
        ])
      );
    });

    then("I can click on civil id and passport redirection button agency with out errors", () => {
      let buttonComponent = customformdriveragencydocumentBlock.findWhere(
        (node) => node.prop("testID") === "btnCivilIdRedirect"
      );
      buttonComponent.simulate("press");
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationDriverCivilPassportMessage" }),
        ])
      );
    });

    then("I can click on authorization letter redirection button agency with out errors", () => {
      let buttonComponent = customformdriveragencydocumentBlock.findWhere(
        (node) => node.prop("testID") === "btnAuthorizationLetter"
      );
      buttonComponent.simulate("press");
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationDriverDocumentUploadMessage" }),
        ])
      );
    });

    then("I can click on agency add bank redirection button with out errors", () => {
      let buttonComponent = customformdriveragencydocumentBlock.findWhere(
        (node) => node.prop("testID") === "btnAgencyAddBank"
      );
      buttonComponent.simulate("press");
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationTappaymentAddBank" }),
        ])
      );
      let logoutbtn = customformdriveragencydocumentBlock.findWhere(
        (node) => node.prop("testID") === "logoutbtn"
      );
      logoutbtn.simulate("press");
    });

  });
});
