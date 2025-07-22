import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CustomformDriverCivilPassport from "../../src/CustomformDriverCivilPassport";

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
    id: "CustomformDriverCivilPassport",
};

const feature = loadFeature("./__tests__/features/customformdrivercivilpassport-scenario.feature");
global.FormData = require("react-native/Libraries/Network/FormData");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to customformdrivercivilpassport", ({ given, when, then }) => {
    let customformdrivercivilpassportBlock: ShallowWrapper;
    let instance: CustomformDriverCivilPassport;

    given("I am a User loading customformdrivercivilpassport", () => {
        customformdrivercivilpassportBlock = shallow(<CustomformDriverCivilPassport {...screenProps} />);
    });

    when("I navigate to the customformdrivercivilpassport", () => {
      instance = customformdrivercivilpassportBlock.instance() as CustomformDriverCivilPassport;
    });

    then("customformdrivercivilpassport will load with out errors", () => {
      
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
        let buttonComponent = customformdrivercivilpassportBlock.findWhere(
          (node) => node.prop("testID") === "btnBackDriverCivilUpload"
        );
        buttonComponent.simulate("press");
        expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can click on open camera button store with out errors", () => {
        let buttonComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "btnUploadPhotoRegistration");
        buttonComponent.simulate("press");
        let modalComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then('I am find the testId btn_camera',()=>{
        const camera_btn = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btn_camera")
        camera_btn.simulate("press")
        let imageShow = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "uploadImageTestCivilFront");
        expect(imageShow.exists()).toBe(false)
        const signUp = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverCivilPassport")
        signUp.simulate("press")
    }) 

    then('I am find the testId btn_gallery',()=>{
        const galleryBtn = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btn_gallery")
        galleryBtn.simulate("press")

        let imageShow = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "uploadImageTestCivilFront");
        expect(imageShow.exists()).toBe(false)

        const signUp = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverCivilPassport")
        signUp.simulate("press")
    }) 

    then('I am find the testId btn_cancelMedia',()=>{
        const signUp = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btn_cancelMedia")
        signUp.simulate("press")
        let modalComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(false);
    }) 

    then("I can click on retake photo button store with out errors", () => {
        let buttonComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") ==="btnRetakePhotoCivilFront");
        buttonComponent.simulate("press");
        let modalComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then("I can click on open camera civil id back button with out errors", () => {
        let buttonComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "btnUploadPhotoCivilBack");
        buttonComponent.simulate("press");
        let modalComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then('I am find the testId btn_camera civil id back',()=>{
        const camera_btn = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btn_camera")
        camera_btn.simulate("press")
        let imageShow = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "uploadImageCivilBack");
        expect(imageShow.exists()).toBe(false)
        const signUp = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverCivilPassport")
        signUp.simulate("press")
    }) 

    then('I am find the testId btn_gallery civil id back',()=>{
        const galleryBtn = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btn_gallery")
        galleryBtn.simulate("press")

        let imageShow = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "uploadImageCivilBack");
        expect(imageShow.exists()).toBe(false)

        const signUp = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverCivilPassport")
        signUp.simulate("press")
    }) 

    then("I can click on retake civil id back photo button store with out errors", () => {
        let buttonComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") ==="btnRetakePhotoCivilBack");
        buttonComponent.simulate("press");
        let modalComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then("I can click on open camera passport front button with out errors", () => {
        let buttonComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "btnUploadPhotoPassportFront");
        buttonComponent.simulate("press");
        let modalComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then('I am find the testId btn_camera passport front',()=>{
        const camera_btn = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btn_camera")
        camera_btn.simulate("press")
        let imageShow = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "uploadImageTestPassportFront");
        expect(imageShow.exists()).toBe(false)
        const signUp = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverCivilPassport")
        signUp.simulate("press")
    }) 

    then('I am find the testId btn_gallery passport front',()=>{
        const galleryBtn = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btn_gallery")
        galleryBtn.simulate("press")

        let imageShow = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "uploadImageTestPassportFront");
        expect(imageShow.exists()).toBe(false)

        const signUp = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverCivilPassport")
        signUp.simulate("press")
    }) 

    then("I can click on retake passport front photo button store with out errors", () => {
        let buttonComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") ==="btnRetakePhotoPassportFront");
        buttonComponent.simulate("press");
        let modalComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then("I can click on open camera passport back button with out errors", () => {
        let buttonComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "btnUploadPhotoPassportBack");
        buttonComponent.simulate("press");
        let modalComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then('I am find the testId btn_camera passport back',()=>{
        const camera_btn = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btn_camera")
        camera_btn.simulate("press")
        let imageShow = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "uploadImageTestPassportBack");
        expect(imageShow.exists()).toBe(false)
        const signUp = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverCivilPassport")
        signUp.simulate("press")
    }) 

    then('I am find the testId btn_gallery passport back',()=>{
        const galleryBtn = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btn_gallery")
        galleryBtn.simulate("press")

        let imageShow = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "uploadImageTestPassportBack");
        expect(imageShow.exists()).toBe(false)

        const signUp = customformdrivercivilpassportBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverCivilPassport")
        signUp.simulate("press")
    }) 

    then("I can click on retake passport back photo button store with out errors", () => {
        let buttonComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") ==="btnRetakePhotoPassportBack");
        buttonComponent.simulate("press");
        let modalComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then("I can click on upload photo button store with out errors", () => {
        let buttonComponent = customformdrivercivilpassportBlock.findWhere((node) => node.prop("testID") === "btnUploadDriverCivilPassport");
        buttonComponent.simulate("press");
        expect(buttonComponent.exists()).toBe(true);
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
        instance.uploadDriverCivilPassportApiCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "RestAPIResponceMessage" }),
            ])
        );    
    }) 

    then("I can will upload api with errors", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "errors": "Please enter License Number with a valid format."
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.uploadDriverCivilPassportApiCallId = msgLogInErrorRestAPI.messageId
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
