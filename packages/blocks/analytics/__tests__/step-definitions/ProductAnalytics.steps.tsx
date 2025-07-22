import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import { jest, beforeEach, expect } from '@jest/globals';
import ProductAnalytics from "../../src/ProductAnalytics"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Analytics"
  }
const res ={
    "data": {
        "filter_range": "this week",
        "sold_units": 0,
        "returned_units": 0,
        "appeared_in_search": 12,
        "total_revenue": "0.0",
        "impression_and_sales": {
            "sold_units": {
                "Monday": 0,
                "Tuesday": 0,
                "Wednesday": 0,
                "Thursday": 0
            },
            "appeared_in_search": {
                "Monday": 0,
                "Tuesday": 0,
                "Wednesday": 0,
                "Thursday": 12
            }
        }
    }
}

const res1 = {
  "url": ""
}
const feature = loadFeature('./__tests__/features/ProductAnalytics-scenario.feature');
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {

  beforeEach(() => {
      jest.useFakeTimers();
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');

    });

    test('User navigates to Analytics', ({ given, when, then }) => {
        let analyticsBlock:ShallowWrapper;
        let instance:ProductAnalytics;

        given('I am a User loading Analytics', () => {
            analyticsBlock = shallow(<ProductAnalytics {...screenProps}/>)
        });

        when('I navigate to the Analytics', () => {
             instance = analyticsBlock.instance() as ProductAnalytics
        });

        then('Analytics will load with out errors', () => {
            let saveButton = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "btnBackAddAddress"
              );
              saveButton.simulate("press");

              analyticsBlock.setState({selectedValue: "pdf"})
              let Button = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "editProductBtn"
              );
              Button.simulate("press");

              analyticsBlock.setState({selectedValue: ""})
              let Button1 = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "editProductBtn"
              );
              Button1.simulate("press");

            expect(analyticsBlock).toBeTruthy()

            const msgTokenAPI = new Message(
                getName(MessageEnum.SessionResponseMessage)
              );
              msgTokenAPI.addData(
                getName(MessageEnum.SessionResponseToken),
                "User-Token"
              );
              runEngine.sendMessage("Unit Test", msgTokenAPI);
              
              expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                  expect.anything(),
                  expect.objectContaining({ id: "SessionResponseMessage" }),
                ])
              );
        });

          then('I navigate to graph screen', ()=> {
            const Button = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "downloadId"
            );
            Button.simulate("press");

            const Button1 = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btn"
            );
            Button1.simulate("press");

            const Button2 = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btn1"
            );
            Button2.simulate("press");

            const Button3 = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btn2"
            );
            Button3.simulate("press");

            const msgTokenAPI2 = new Message(
                getName(MessageEnum.NavigationPayLoadMessage)
              );
              msgTokenAPI2.addData(getName(MessageEnum.PlayLoadSignupId), "User-Token");
              runEngine.sendMessage("Unit Test", msgTokenAPI2);
              expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                  expect.anything(),
                  expect.objectContaining({ id: "NavigationPayLoadMessage" }),
                ])
              );

              const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
              );
              apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                res1
              );
              instance.getDownloadFileId = apiTestMsg.messageId;
              runEngine.sendMessage("Test", apiTestMsg);
              
          })

        then('I can leave the screen with out errors', () => {
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
              );
              apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                res
              );
              instance.getDataId = apiTestMsg.messageId;
              runEngine.sendMessage("Test", apiTestMsg);
        
              expect(analyticsBlock.length).toBeGreaterThan(0);

              const openModel = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "filterId"
              );
              openModel.simulate("press");
            instance.componentWillUnmount()
            expect(analyticsBlock).toBeTruthy()
        });
    });


});
