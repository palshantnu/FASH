import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import CustomformCreateUploadDocument from "../../src/CustomformCreateUploadDocument"
import { jest, expect,beforeEach } from '@jest/globals';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
jest.useFakeTimers()
const navigation = require("react-navigation")
const mockNavigate = jest.fn();
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
    id: "CustomformCreateUploadDocument"
}

global.FormData = require("react-native/Libraries/Network/FormData");
const feature = loadFeature("./__tests__/features/customformcreateuploaddocument-scenario.feature");

defineFeature(feature, (test) => {
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
      jest.spyOn(DocumentPicker, 'pickSingle').mockImplementation(() => {
        const response: DocumentPickerResponse = { name: "testFile", uri: 'testUri', size: 100, fileCopyUri: "testCopyUri", type: "testFileType" };
        return Promise.resolve(response);
      });
      jest.spyOn(runEngine, "sendMessage");
    });
  
    test("User navigates to customformcreateuploaddocument", ({ given, when, then }) => {
      let CustomformCreateUploadDocumentBlock: ShallowWrapper;
      let instance: CustomformCreateUploadDocument;
  
      given("I am a User loading customformcreateuploaddocument", () => {
        CustomformCreateUploadDocumentBlock = shallow(<CustomformCreateUploadDocument {...screenProps} />);
      });
  
      when("I navigate to the customformcreateuploaddocument", () => {
        instance = CustomformCreateUploadDocumentBlock.instance() as CustomformCreateUploadDocument;
      });
  
      then("customformcreateuploaddocument will load with out errors", () => {
        expect(CustomformCreateUploadDocumentBlock).toBeTruthy();
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
      
      });

      then("I can click on back button store with out errors", () => {
        let buttonComponent = CustomformCreateUploadDocumentBlock.findWhere(
          (node) => node.prop("testID") === "btnBackDocUpload"
        );
        buttonComponent.simulate("press");
      });

      then("I can click on upload id proof with out errors", () => {
        let buttonComponent = CustomformCreateUploadDocumentBlock.findWhere(
          (node) => node.prop("testID") === "btnAttachmentIdOpen"
        );
        buttonComponent.simulate("press");
      });

      then("I can click on open image with out errors", () => {
        let buttonComponent = CustomformCreateUploadDocumentBlock.findWhere(
          (node) => node.prop("testID") === "btn_camera"
        );
        buttonComponent.simulate("press");
        const signUp = CustomformCreateUploadDocumentBlock.findWhere(
            (node) => node.prop("testID") === "btnStoreUpload")
        signUp.simulate("press")
        expect(instance.setState({documentFileIdProof:'url'})).toBeTruthy()
      });

      then("I can click on open document with out errors", () => {
        let buttonComponent = CustomformCreateUploadDocumentBlock.findWhere(
          (node) => node.prop("testID") === "btn_gallery"
        );
        buttonComponent.simulate("press");
        const signUp = CustomformCreateUploadDocumentBlock.findWhere(
            (node) => node.prop("testID") === "btnStoreUpload")
        signUp.simulate("press")
        expect(instance.setState({documentFileIdLicense:'url'})).toBeTruthy()
        jest.spyOn(DocumentPicker, 'pickSingle').mockImplementation(() => {
            throw new Error();
          });
          let renderSectionHeaderMockCall = jest.fn(instance.openImageFile);
          renderSectionHeaderMockCall();
          jest.spyOn(DocumentPicker, 'isCancel').mockImplementation(() => {
            return true;
          });
          let renderSectionHeaderMockCallSecond = jest.fn(instance.openImageFile);
          renderSectionHeaderMockCallSecond();
      });

      then("I can click on upload license with out errors", () => {
        let buttonComponent = CustomformCreateUploadDocumentBlock.findWhere(
          (node) => node.prop("testID") === "btnAttachmentLicenseOpen"
        );
        buttonComponent.simulate("press");
      });

      then("I can click on cancel model with out errors", () => {
        let buttonComponent = CustomformCreateUploadDocumentBlock.findWhere(
          (node) => node.prop("testID") === "btn_cancelMedia"
        );
        buttonComponent.simulate("press");
      });

      then("I can send api data with out errors", () => {
        const signUp = CustomformCreateUploadDocumentBlock.findWhere(
            (node) => node.prop("testID") === "btnStoreUpload")
        signUp.simulate("press")
    })

    then("I Update profile Should Pass and update data", () => {

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
        instance.uploadDocumentCallApiId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);  
    
    }) 
  
      then("I can leave the screen with out errors", () => {
        instance.componentWillUnmount();
        expect(CustomformCreateUploadDocumentBlock).toBeTruthy();
      });
    });
  });