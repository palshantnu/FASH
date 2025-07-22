import { shallow, ShallowWrapper } from 'enzyme'
import {render, fireEvent} from '@testing-library/react-native';

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 

import CustomformCreateStoreUpload from "../../src/CustomformCreateStoreUpload"
import {  test, expect,describe } from '@jest/globals';

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        dispatch: jest.fn(),
        goBack: jest.fn(),
        getParam: (playlist_id: any,topic_id:any) => {
        },
        addListener:(param:string,callback:any)=>{
          callback()
        },
    },
    id: "CustomformCreateStoreUpload"
}

JSON.parse = jest.fn().mockImplementation(() => {
    // return your what your code is returning.
  });

const localObject = {
    storeImage:'',
    storeImageUpload:{name: "", type: "", uri: ""},
    storeName:'',
    storeDes:'',
    storeNameArabic:'',
    storeDesArabic:''
  }

global.FormData = require("react-native/Libraries/Network/FormData");
let CustomformCreateStoreUploadData = <CustomformCreateStoreUpload {...screenProps}/>

describe('CustomformCreateStoreUpload page',()=>{
    let splashWrapper:ShallowWrapper;
    splashWrapper= shallow(<CustomformCreateStoreUpload {...screenProps}/>)
    let instance:CustomformCreateStoreUpload; 

    instance = splashWrapper.instance() as CustomformCreateStoreUpload

    test('should render other terms page show drawing screen without crashing',async()=>{
        const rendered=render(CustomformCreateStoreUploadData);
        expect(rendered).toBeTruthy();
        let renderSectionHeaderMockCall = jest.fn(instance.getLocalDataConfirm);
            renderSectionHeaderMockCall(null);
    })  

    test('should render other terms page show drawing screen without crashing',async()=>{
        let renderSectionHeaderMockCall = jest.fn(instance.getLocalDataConfirm);
        renderSectionHeaderMockCall(localObject);
    })  

    test('should find the testId btnBackStoreUpload',()=>{
        const testTestName = 'btnBackStoreUpload'
        const {getByTestId} = render(CustomformCreateStoreUploadData);
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();
    }) 

    test('when i reach end and get token',async()=>{
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
    })

    test('should find the testId btnAttachmentOpen',()=>{
        const testTestName = 'btnAttachmentOpen'
        const {getByTestId} = render(CustomformCreateStoreUploadData);
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();
    }) 

    test('should find the testId btn_camera',()=>{
        const testTestName = 'btn_camera'
        const {getByTestId} = render(CustomformCreateStoreUploadData);
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnNextAddress")
        signUp.simulate("press")
        expect(instance.setState({selectImage:'url'})).toBeTruthy()
    }) 

    test('should find the testId btn_gallery',()=>{
        const testTestName = 'btn_gallery'
        const {getByTestId} = render(CustomformCreateStoreUploadData);
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnNextAddress")
        signUp.simulate("press")
    }) 

    test('should find the testId btn_cancelMedia',()=>{
        const testTestName = 'btn_cancelMedia'
        const {getByTestId} = render(CustomformCreateStoreUploadData);
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();
    }) 

    test("I am trying to next with empty store name", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_name"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnNextAddress")
        signUp.simulate("press")
    });

    test("I can enter a store name with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_name"
        );
        textInputComponent.simulate("changeText", "Test");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.storeName).toBe("Test");
    });

    test("I am trying to next with empty store name arabic", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_arabic_store_name"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnNextAddress")
        signUp.simulate("press")
        expect(textInputComponent).toBeTruthy();
    });

    test("I can enter a store name arabic with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_arabic_store_name"
        );
        textInputComponent.simulate("changeText", "Test");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.storeName).toBe("Test");
        expect(textInputComponent).toBeTruthy();
    });

    test("I am trying to next with empty store description", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_description"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnNextAddress")
        signUp.simulate("press")

    });

    test("I can enter a store description with out errors", async() => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_store_description"
        );
        textInputComponent.simulate("changeText", "storeDes");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.storeDescription).toBe("storeDes");
    });

    test("I am trying to next with empty store description arabic", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_arabic_store_description"
        );
        textInputComponent.simulate("changeText", "");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnNextAddress")
        signUp.simulate("press")
        expect(signUp).toBeTruthy();

    });

    test("I can enter a store description arabic with out errors", async() => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_arabic_store_description"
        );
        textInputComponent.simulate("changeText", "storeDes");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.storeDescription).toBe("storeDes");
        const signUp = splashWrapper.findWhere(
            (node) => node.prop("testID") === "btnNextAddress")
        signUp.simulate("press")
        expect(textInputComponent).toBeTruthy();
    });

    test("I can set api with out errors",async() => {
        let renderSectionHeaderMockCall = jest.fn(instance.setDataForApi);
        renderSectionHeaderMockCall(localObject);
    });

    test('should find the testId btnCancelStore',()=>{
        const testTestName = 'btnCancelStore'
        const {getByTestId} = render(CustomformCreateStoreUploadData);
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();
    }) 

    test("I can check store name without errors",async() => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            exists:true
        });

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getStoreNameApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
    });

    test("I can check store name false without errors",async() => {
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            exists:false
        });

        getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
        instance.getStoreNameApiCallId = getCategoryMessage.messageId
        runEngine.sendMessage("Unit Test", getCategoryMessage);
    });

})