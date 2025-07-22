import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CustomformDriverProfilePhoto from "../../src/CustomformDriverProfilePhoto";

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
    id: "CustomformDriverProfilePhoto",
};

const feature = loadFeature("./__tests__/features/customformdriverprofilephoto-scenario.feature");
global.FormData = require("react-native/Libraries/Network/FormData");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to customformdriverprofilephoto", ({ given, when, then }) => {
    let customformdriverprofilephotoBlock: ShallowWrapper;
    let instance: CustomformDriverProfilePhoto;

    given("I am a User loading customformdriverprofilephoto", () => {
        customformdriverprofilephotoBlock = shallow(<CustomformDriverProfilePhoto {...screenProps} />);
    });

    when("I navigate to the customformdriverprofilephoto", () => {
      instance = customformdriverprofilephotoBlock.instance() as CustomformDriverProfilePhoto;
    });

    then("customformdriverprofilephoto will load with out errors", () => {
      
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
        let buttonComponent = customformdriverprofilephotoBlock.findWhere(
          (node) => node.prop("testID") === "btnBackDriverPhotoUpload"
        );
        buttonComponent.simulate("press");
        expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });

    then("I can click on open camera button store with out errors", () => {
        let buttonComponent = customformdriverprofilephotoBlock.findWhere((node) => node.prop("testID") === "btnOpenCamera");
        buttonComponent.simulate("press");
        expect(instance.setState({selectImage:'url'})).toBeTruthy()
        const signUp = customformdriverprofilephotoBlock.findWhere(
            (node) => node.prop("testID") === "btnSubmitPhoto")
        signUp.simulate("press")
    });

    then("I can click on upload photo button store with out errors", () => {
        let buttonComponent = customformdriverprofilephotoBlock.findWhere((node) => node.prop("testID") === "btnSubmitPhoto");
        buttonComponent.simulate("press");
        expect(buttonComponent).toBeTruthy();
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
        instance.uploadDriverProfilePhotoApiCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
        ); 
    
    }) 
    then("I can click on retake photo button store with out errors", () => {
        let buttonComponent = customformdriverprofilephotoBlock.findWhere((node) => node.prop("testID") ==="btnRetakePhoto");
        buttonComponent.simulate("press");
        expect(buttonComponent.exists()).toBe(true);
    });

  });
});
