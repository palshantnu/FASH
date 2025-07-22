import { shallow, ShallowWrapper } from 'enzyme'
import {render, fireEvent} from '@testing-library/react-native';

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import ContactUsSupport from "../../src/ContactUsSupport"
import { jest, test, expect,describe } from '@jest/globals';

const navigation = require("react-navigation")
const mockNavigate = jest.fn();
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
    id: "ContactUsSupport"
}

let ContactUsSupportData = <ContactUsSupport {...screenProps}/>

describe('ContactUsSupport page',()=>{

    let splashWrapper:ShallowWrapper;
    splashWrapper= shallow(<ContactUsSupport {...screenProps}/>)
    let instance:ContactUsSupport; 

    instance = splashWrapper.instance() as ContactUsSupport

    test('should render other terms page show drawing screen without crashing',async()=>{
        const rendered=render(ContactUsSupportData);
        expect(rendered).toBeTruthy();
    })  

    test('should find the testId btnBackContactSupport',()=>{
        const testTestName = 'btnBackContactSupport'
        const {getByTestId} = render(ContactUsSupportData);
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();
    }) 
    test('when i reach end and get token',async()=>{
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
    }) 

    test('should find the testId btnContactCallRedirection',()=>{
        const testTestName = 'btnContactCallRedirection'
        const {getByTestId} = render(ContactUsSupportData);
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();
    }) 
    test('should find the testId btnContactFormAdminRedirection',()=>{
        const testTestName = 'btnContactFormAdminRedirection'
        const {getByTestId} = render(ContactUsSupportData);
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();
    }) 
})