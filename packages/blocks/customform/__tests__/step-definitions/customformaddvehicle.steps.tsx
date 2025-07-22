import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CustomformAddVehicle from "../../src/CustomformAddVehicle";
jest.useFakeTimers() 
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
    id: "CustomformAddVehicle",
};

const feature = loadFeature("./__tests__/features/customformaddvehicle-scenario.feature");
global.FormData = require("react-native/Libraries/Network/FormData");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to customformaddvehicle", ({ given, when, then }) => {
    let customformaddvehicleBlock: ShallowWrapper;
    let instance: CustomformAddVehicle;

    given("I am a User loading customformaddvehicle", () => {
        customformaddvehicleBlock = shallow(<CustomformAddVehicle {...screenProps} />);
    });

    when("I navigate to the customformaddvehicle", () => {
      instance = customformaddvehicleBlock.instance() as CustomformAddVehicle;
    });

    then("customformaddvehicle will load with out errors", () => {
      
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
        let buttonComponent = customformaddvehicleBlock.findWhere(
          (node) => node.prop("testID") === "btnBackDriverVehicleUpload"
        );
        buttonComponent.simulate("press");
        expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I am trying to submit with empty license data", () => {
        let textInputComponent = customformaddvehicleBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_registration_number"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = customformaddvehicleBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverDocument")
        signUp.simulate("press")
        let errorView = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "licenseError");
        expect(errorView.exists()).toBe(true);
    });

    then("I can enter a license data with out errors", () => {
        let textInputComponent = customformaddvehicleBlock.findWhere(
          (node) => node.prop("testID") === "txt_enter_registration_number"
        );
        textInputComponent.simulate("changeText", "Test");
        textInputComponent.simulate("submitEditing");
        expect(textInputComponent.exists()).toBe(true);
    });

    then("I can click on open camera button store with out errors", () => {
        let buttonComponent = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "btnUploadPhotoRegistration");
        buttonComponent.simulate("press");
        let modalComponent = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then('I am find the testId btn_camera',()=>{
        const camera_btn = customformaddvehicleBlock.findWhere(
            (node) => node.prop("testID") === "btn_camera")
        camera_btn.simulate("press")
        let imageShow = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "uploadImageTest");
        expect(imageShow.exists()).toBe(false)
        const signUp = customformaddvehicleBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverDocument")
        signUp.simulate("press")
    }) 

    then('I am find the testId btn_gallery',()=>{
        const galleryBtn = customformaddvehicleBlock.findWhere(
            (node) => node.prop("testID") === "btn_gallery")
        galleryBtn.simulate("press")

        let imageShow = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "uploadImageTest");
        expect(imageShow.exists()).toBe(false)

        const signUp = customformaddvehicleBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverDocument")
        signUp.simulate("press")
    }) 

    then("I can click on open camera button insurance with out errors", () => {
        let buttonComponent = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "btnUploadPhotoInsurance");
        buttonComponent.simulate("press");
        let modalComponent = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then('I am find the testId btn_camera insurance',()=>{
        const camera_btn = customformaddvehicleBlock.findWhere(
            (node) => node.prop("testID") === "btn_camera")
        camera_btn.simulate("press")
        let imageShow = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "uploadImageTestInsurance");
        expect(imageShow.exists()).toBe(true)
        const signUp = customformaddvehicleBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverDocument")
        signUp.simulate("press")
    }) 

    then('I am find the testId btn_gallery insurance',()=>{
        const galleryBtn = customformaddvehicleBlock.findWhere(
            (node) => node.prop("testID") === "btn_gallery")
        galleryBtn.simulate("press")

        let imageShow = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "uploadImageTestInsurance");
        expect(imageShow.exists()).toBe(true)

        const signUp = customformaddvehicleBlock.findWhere(
            (node) => node.prop("testID") === "btnUploadDriverDocument")
        signUp.simulate("press")
    })

    then('I am find the testId btn_cancelMedia',()=>{
        const signUp = customformaddvehicleBlock.findWhere(
            (node) => node.prop("testID") === "btn_cancelMedia")
        signUp.simulate("press")
        let modalComponent = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(false);
        
    }) 

    then("I can click on upload photo button store with out errors", () => {
        let buttonComponent = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "btnUploadDriverDocument");
        buttonComponent.simulate("press");
        expect(buttonComponent.exists()).toBe(true);
    });

    then("I can click on retake photo button store with out errors", () => {
        let buttonComponent = customformaddvehicleBlock.findWhere((node) => node.prop("testID") ==="btnRetakePhoto");
        buttonComponent.simulate("press");
        let modalComponent = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
        expect(modalComponent.prop("visible")).toBe(true);
    });

    then("I can click on retake insurance photo button store with out errors", () => {
        let buttonComponent = customformaddvehicleBlock.findWhere((node) => node.prop("testID") ==="btnRetakePhotoInsurance");
        buttonComponent.simulate("press");
        let modalComponent = customformaddvehicleBlock.findWhere((node) => node.prop("testID") === "cameraModalCheck");
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
        instance.uploadDriverAddVehicleApiCallId = msgLogInErrorRestAPI.messageId
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
        const signUp = customformaddvehicleBlock.findWhere(
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
          "errors": [{registration_number:"Please enter License Number with a valid format."}]
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.uploadDriverAddVehicleApiCallId = msgLogInErrorRestAPI.messageId
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
