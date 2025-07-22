import { shallow, ShallowWrapper } from 'enzyme'
import {render, fireEvent} from '@testing-library/react-native';

import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Customisableuserprofiles2Faq from "../../src/Customisableuserprofiles2Faq"
import { jest, describe, expect, test } from '@jest/globals';
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        getParam: (playlist_id: any,topic_id:any) => {
        },
        addListener:(param:string,callback:any)=>{
          callback()
        },
        dispatch: jest.fn()
      },
    id: "Customisableuserprofiles2Faq"
  }

  const mock = jest.fn()
  let Customisableuserprofiles2FaqData = <Customisableuserprofiles2Faq {...screenProps}/>

  const categoryObject = {
    "data": [
        {
            "id":1,
            "attributes":{
                "question":"Question",
                "answer":"Answer",
                "status":false
            }
        },
        {
            "id":2,
            "attributes":{
                "question":"Question",
                "answer":"Answer",
                "status":false
            }
        }
    ]
}

  describe('Landing page first',()=>{

    let splashWrapper:ShallowWrapper;
    splashWrapper= shallow(<Customisableuserprofiles2Faq {...screenProps}/>)
    let instance:Customisableuserprofiles2Faq; 

    instance = splashWrapper.instance() as Customisableuserprofiles2Faq

    test('should render other landing page show drawing screen without crashing',async()=>{
        const rendered=render(Customisableuserprofiles2FaqData);
        expect(rendered).toBeTruthy();
    })  

    test('should find the testId btnBackFaq',()=>{
        const testTestName = 'btnBackFaq'
        const {getByTestId} = render(Customisableuserprofiles2FaqData);
        const foundButton = getByTestId(testTestName);
        fireEvent.press(getByTestId(testTestName));
        expect(foundButton).toBeTruthy();
    }) 


    test('when i reach end and get token and navigation playload',async()=>{
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
    }) 

    test('when i reach end it should go for lazy loading in faq',async()=>{

        const msggetdata = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata);
        msggetdata.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {});

        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata.messageId);
        instance.getFaqApiCallID = msggetdata.messageId
        runEngine.sendMessage("Unit Test", msggetdata);
        msggetdata.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        categoryObject);

        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata.messageId);
        instance.getFaqApiCallID = msggetdata.messageId
        runEngine.sendMessage("Unit Test", msggetdata);
    }) 

    test('I can show all Faq get',async()=>{
        const flatlist = splashWrapper.findWhere(
            (node)=>node.prop("testID") === "faq_flat_data"
        )
        const item = categoryObject.data[0]
        const renderItem = flatlist.renderProp("renderItem")({item:item,index:0})

        const buttonNavigate = renderItem.findWhere(
            (node) => node.prop("testID") == "select_faq_btn"
        )
        buttonNavigate.simulate("press")
        flatlist.renderProp("ListEmptyComponent")({})
    })

    test("I can empty subcategory name with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_faq"
        );
        textInputComponent.simulate("changeText", "");
        textInputComponent.simulate("submitEditing");
    });

    test("I can enter a subcategory name with out errors", () => {
        let textInputComponent = splashWrapper.findWhere(
          (node) => node.prop("testID") === "txt_enter_faq"
        );
        textInputComponent.simulate("changeText", "Bags");
        textInputComponent.simulate("submitEditing");
        expect(instance.state.faqSearchText).toBe("Bags");
    });

    test('when i reach end it should go for lazy loading in shop with errors',async()=>{

        const msggetdata = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata);
        msggetdata.addData(getName(MessageEnum.RestAPIResponceErrorMessage),
        {
            'error':'',
        });

        msggetdata.addData(getName(MessageEnum.RestAPIResponceDataMessage), msggetdata.messageId);
        instance.getFaqApiCallID = msggetdata.messageId
        runEngine.sendMessage("Unit Test", msggetdata);
    })

})