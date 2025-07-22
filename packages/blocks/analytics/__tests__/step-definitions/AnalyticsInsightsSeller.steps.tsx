import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import { render } from "@testing-library/react-native";
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AnalyticsInsightsSeller from "../../src/AnalyticsInsightsSeller"
import AnalyticsInsightsSellerWeb from "../../src/AnalyticsInsightsSeller.web";
const navigation = require("react-navigation")
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
    id: "AnalyticsInsightsSeller"
  }

const feature = loadFeature('./__tests__/features/AnalyticsInsightsSeller-scenario.feature');
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AnalyticsInsightsSeller', ({ given, when, then }) => {
        let analyticsBlock:ShallowWrapper;
        let instance:AnalyticsInsightsSeller; 

        given('I am a User loading AnalyticsInsightsSeller', () => {
            analyticsBlock = shallow(<AnalyticsInsightsSeller {...screenProps}/>)
        });

        when('I navigate to the AnalyticsInsightsSeller', () => {
             instance = analyticsBlock.instance() as AnalyticsInsightsSeller
        });

        then('AnalyticsInsightsSeller will load with out errors', () => {
            let dataRender = render(<AnalyticsInsightsSellerWeb {...screenProps} />);
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

        then("I can click on back button with out errors", () => {
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnBackAnalyticInsights"
            );
            buttonComponent.simulate("press");
            expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
        });

        then("I should render show analytics insights api with out errors", () => {
            const getCategoryMessage = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            getCategoryMessage.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              getCategoryMessage
            );
            getCategoryMessage.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                data:{
                    total_revenue:'0.0'
                }
              }
            );
      
            getCategoryMessage.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              getCategoryMessage.messageId
            );
            instance.getSelleeTotalRevenueCallApiId = getCategoryMessage.messageId;
            runEngine.sendMessage("Unit Test", getCategoryMessage);
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "RestAPIResponceMessage" }),
                ])
            );
        });

        then("I should render show analytics insights api with errors", () => {
            const getCategoryMessage = new Message(
              getName(MessageEnum.RestAPIResponceMessage)
            );
            getCategoryMessage.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              getCategoryMessage
            );
            getCategoryMessage.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage),
              {
                error:'Invalid Token'
              }
            );
      
            getCategoryMessage.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              getCategoryMessage.messageId
            );
            runEngine.sendMessage("Unit Test", getCategoryMessage);
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "RestAPIResponceMessage" }),
                ])
            );
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnGrowth"
            );
            buttonComponent.simulate("press");
            
        });

        then("I can click on sales revenue report for store  with out errors", () => {
          let buttonComponent = analyticsBlock.findWhere(
            (node) => node.prop("testID") === "btnSalesRevenueReport"
          );
          buttonComponent.simulate("press");
          expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationAnalyticsSalesRevenueSeller" }),
            ])
          );
        });

        then("I can click on sales volume report for store  with out errors", () => {
          let buttonComponent = analyticsBlock.findWhere(
            (node) => node.prop("testID") === "btnSalesVolumeStore"
          );
          buttonComponent.simulate("press");
          expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationAnalyticsSalesVolume" }),
            ])
          );
        });

        then("I can click on sales volume report for product with out errors", () => {
          let buttonComponent = analyticsBlock.findWhere(
            (node) => node.prop("testID") === "btnSalesProduct"
          );
          buttonComponent.simulate("press");
          expect(sendMessage.mock.calls).toContainEqual(
            expect.arrayContaining([
              expect.anything(),
              expect.objectContaining({ id: "NavigationAnalyticsSalesVolume" }),
            ])
          );
        });
    });


});
