import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CustomformDriverDocumentUpload from "../../src/CustomformDriverDocumentUpload";

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
    id: "CustomformDriverDocumentUpload",
};

const feature = loadFeature("./__tests__/features/customformdriverdocumentupload-scenario.feature");
global.FormData = require("react-native/Libraries/Network/FormData");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to customformdriverdocumentupload", ({ given, when, then }) => {
    let customformdriverdocumentuploadBlock: ShallowWrapper;
    let instance: CustomformDriverDocumentUpload;

    given("I am a User loading customformdriverdocumentupload", () => {
        customformdriverdocumentuploadBlock = shallow(<CustomformDriverDocumentUpload {...screenProps} />);
    });

    when("I navigate to the customformdriverdocumentupload", () => {
      instance = customformdriverdocumentuploadBlock.instance() as CustomformDriverDocumentUpload;
    });

    then("customformdriverdocumentupload will load with out errors", () => {
      
        const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
        tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
        runEngine.sendMessage("Unit Test", tokenMsg);
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "SessionResponseMessage" }),
            ])
        );

        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.ManageDriverDocumentType), "Driving License");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)
    
    });

    then("I can click on back button store with out errors", () => {
        let buttonComponent = customformdriverdocumentuploadBlock.findWhere(
          (node) => node.prop("testID") === "btnBackDriverDocumentUpload"
        );
        buttonComponent.simulate("press");
        expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I am trying to submit with empty license data", () => {
        let textInputComponent = customformdriverdocumentuploadBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_license_data"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = customformdriverdocumentuploadBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverDocument")
        signUp.simulate("press")
        let errorView = customformdriverdocumentuploadBlock.findWhere((node) => node.prop("testID") === "licenseError");
        expect(errorView.exists()).toBe(true);
    });

    then("I can enter a license data with out errors", () => {
        let textInputComponent = customformdriverdocumentuploadBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_license_data"
        );
        textInputComponent.simulate("changeText", "Test");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true);
    });

    then("I can click on open camera button store with out errors", () => {
        let buttonComponent = customformdriverdocumentuploadBlock.findWhere((node) => node.prop("testID") === "btnUploadPhoto");
        buttonComponent.simulate("press");
        let modalComponent = customformdriverdocumentuploadBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then('I am find the testId btn_camera',()=>{
        const camera_btn = customformdriverdocumentuploadBlock.findWhere(
            (node) => node.prop("testID") === "btn_camera")
        camera_btn.simulate("press")
        let imageShow = customformdriverdocumentuploadBlock.findWhere((node) => node.prop("testID") === "uploadImageTest");
        expect(imageShow.exists()).toBe(false)
        const signUp = customformdriverdocumentuploadBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverDocument")
        signUp.simulate("press")
    }) 

    then('I am find the testId btn_gallery',()=>{
        const galleryBtn = customformdriverdocumentuploadBlock.findWhere(
            (node) => node.prop("testID") === "btn_gallery")
        galleryBtn.simulate("press")

        let imageShow = customformdriverdocumentuploadBlock.findWhere((node) => node.prop("testID") === "uploadImageTest");
        expect(imageShow.exists()).toBe(false)

        const signUp = customformdriverdocumentuploadBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverDocument")
        signUp.simulate("press")
    }) 

    then('I am find the testId btn_cancelMedia',()=>{
        const signUp = customformdriverdocumentuploadBlock.findWhere(
            (node) => node.prop("testID") === "btn_cancelMedia")
        signUp.simulate("press")
        let modalComponent = customformdriverdocumentuploadBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(false);
    }) 

    then("I can click on upload photo button store with out errors", () => {
        let buttonComponent = customformdriverdocumentuploadBlock.findWhere((node) => node.prop("testID") === "btnUploadDriverDocument");
        buttonComponent.simulate("press");
        expect(buttonComponent.exists()).toBe(true);
    });

    then("I can click on retake photo button store with out errors", () => {
        let buttonComponent = customformdriverdocumentuploadBlock.findWhere((node) => node.prop("testID") ==="btnRetakePhoto");
        buttonComponent.simulate("press");
        let modalComponent = customformdriverdocumentuploadBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then("I can upload profile photo api with out errors", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            "data": [
                {
                    "failed_login": "Data send"
                }
            ]
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.uploadDriverDocumentPhotoApiCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );    
    }) 

    then("I can will load agency authorization letter with out errors", () => {

        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.ManageDriverDocumentType), "Agency Authorization Letter");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationPayLoadMessage" }),
            ])
        );
        const signUp = customformdriverdocumentuploadBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverDocument")
        signUp.simulate("press")
    
    });

    then("I can will upload api with errors", () => {

        const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
        msgPlayloadAPI.addData(getName(MessageEnum.ManageDriverDocumentType), "Driving License");
        runEngine.sendMessage("Unit Test", msgPlayloadAPI)

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "error": "Please enter License Number with a valid format."
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.uploadDriverDocumentPhotoApiCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
        );
    
    })

    then("I can upload license data api with errors", () => {

      const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
      msgPlayloadAPI.addData(getName(MessageEnum.ManageDriverDocumentType), "Agency Authorization Letter");
      runEngine.sendMessage("Unit Test", msgPlayloadAPI)

      const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
      {
        "error": "Please select image less than 4 mb"
      });

      msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
      instance.uploadDriverDocumentPhotoApiCallId = msgLogInErrorRestAPI.messageId
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
