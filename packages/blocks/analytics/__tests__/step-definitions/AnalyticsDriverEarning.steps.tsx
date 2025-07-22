import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AnalyticsDriverEarning from "../../src/AnalyticsDriverEarning"
import { Calendar } from "react-native-calendars"
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
    id: "AnalyticsDriverEarning"
  }

const filterArr=[
    {
        earningName:'Daily',
        status:false
    },
    {
        earningName:'Weekly',
        status:false
    },
    {
        earningName:'Monthly',
        status:false
    },
];

const feature = loadFeature('./__tests__/features/AnalyticsDriverEarning-scenario.feature');
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AnalyticsDriverEarning', ({ given, when, then }) => {
        let analyticsBlock:ShallowWrapper;
        let instance:AnalyticsDriverEarning; 

        given('I am a User loading AnalyticsDriverEarning', () => {
            analyticsBlock = shallow(<AnalyticsDriverEarning {...screenProps}/>)
        });

        when('I navigate to the AnalyticsDriverEarning', () => {
             instance = analyticsBlock.instance() as AnalyticsDriverEarning
        });

        then('AnalyticsDriverEarning will load with out errors', () => {
          let dataSend = {
            activeType:'Daily',
            startDate:new Date(),
            endDate:new Date(),
            apiSelectEarningStatus:'daily_earnings'
          }

          const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
          msgPlayloadAPI.addData(getName(MessageEnum.DriverAnalyticsPayloadMessage), dataSend);
          runEngine.sendMessage("Unit Test", msgPlayloadAPI)

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
              (node) => node.prop("testID") === "btnBackEarningAnyt"
            );
            buttonComponent.simulate("press");
            expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
        });

        then("I should render show earning analytics api with out errors", () => {
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
                login_time: "0 min",
                total_earning: 0.00,
                deliveries: 0,
                earnings_by_date:{
                    '2024-07-11':500.00
                }
              }
            );
      
            getCategoryMessage.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              getCategoryMessage.messageId
            );
            instance.getDriverAnalyticCallApiId = getCategoryMessage.messageId;
            runEngine.sendMessage("Unit Test", getCategoryMessage);
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                expect.anything(),
                expect.objectContaining({ id: "RestAPIResponceMessage" }),
                ])
            );
        });

        then("I should render earning data in flatlist with out errors",() => {
              let render_item = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "earning_data_show"
              );
              let render_data = render_item.renderProp("renderItem")({
                item: filterArr[0],
                index: 0,
              });
              render_item.renderProp("ItemSeparatorComponent")({});
              expect(render_data.exists()).toBeTruthy();
        });

        then("I can click on calendar open with out errors", () => {
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnCalendarOpen"
            );
            buttonComponent.simulate("press");
            expect(buttonComponent.exists()).toBe(true);
        });

        then("I can click on calendar on change with out errors", () => {
            
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "calendarTestWork"
            );
            buttonComponent.simulate("dateChange")
            expect(buttonComponent.exists()).toBe(true);
        });

        then("I can click on calendar close with out errors", () => {
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnCalendarClose"
            );
            buttonComponent.simulate("press");
            expect(buttonComponent.exists()).toBe(true);
        });

        then("I should render earning data in flatlist and click weekly with out errors",() => {
            let render_item = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "earning_data_show"
            );
            let render_data = render_item.renderProp("renderItem")({
              item: filterArr[1],
              index: 0,
            });
            render_item.renderProp("ItemSeparatorComponent")({});
            expect(render_data).toBeTruthy();

            let buttonComponent = render_data.findWhere(
            (node) => node.prop("testID") == "btn_selected_earning"
                );
            buttonComponent.simulate("press");

        });

        then("I can click on weekly calendar on change with out errors", () => {
            let buttonComponentModal = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "btnCalendarOpen"
              );
              buttonComponentModal.simulate("press");

            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "calendarTestWorkRange"
            );
            buttonComponent.simulate("dateChange")
            expect(buttonComponent.exists()).toBe(true);
        });

        then("I should render earning data in flatlist and click monthly with out errors",() => {
            let render_item = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "earning_data_show"
            );
            let render_data = render_item.renderProp("renderItem")({
              item: filterArr[2],
              index: 0,
            });
            render_item.renderProp("ItemSeparatorComponent")({});
            render_item.renderProp("keyExtractor")({});
            expect(render_data).toBeTruthy();

            let buttonComponent = render_data.findWhere(
            (node) => node.prop("testID") == "btn_selected_earning"
                );
            buttonComponent.simulate("press");

        });

        then("I can click on monthly calendar on change with out errors", () => {
            let buttonComponentModal = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "btnCalendarOpen"
              );
              buttonComponentModal.simulate("press");

            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "calendarTestWorkRange"
            );
            buttonComponent.simulate("dateChange")
            expect(buttonComponent.exists()).toBe(true);
        });

        then("I should render show earning analytics api with errors", () => {
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
        });

        then("I can click on see earning activity with out errors", () => {
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnSeeEarningActiv"
            );
            buttonComponent.simulate("press");
            expect(buttonComponent.exists()).toBe(true);
        });
    });


});
