import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AnalyticsSalesRevenueSeller from "../../src/AnalyticsSalesRevenueSeller"

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
    id: "AnalyticsSalesRevenueSeller"
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

const salesRevenueObject = {
  "data": {
      "filter_range": "monthly",
      "max_value": "33000.0",
      "average_order_value": "4188.0625",
      "sales_volume": 45,
      "graph_data": {
          "total_revenue": {
              "Jan": "0.0",
              "Feb": "0.0",
              "Mar": "0.0",
              "Apr": "0.0",
              "May": "0.0",
              "Jun": "0.0",
              "Jul": "33000.0",
              "Aug": "5200.0"
          }
      }
  }
}

const feature = loadFeature('./__tests__/features/AnalyticsSalesRevenueSeller-scenario.feature');
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AnalyticsSalesRevenueSeller', ({ given, when, then }) => {
        let analyticsBlock:ShallowWrapper;
        let Analyticsinstance:AnalyticsSalesRevenueSeller; 

        given('I am a User loading AnalyticsSalesRevenueSeller', () => {
            analyticsBlock = shallow(<AnalyticsSalesRevenueSeller {...screenProps}/>)
        });

        when('I navigate to the AnalyticsSalesRevenueSeller', () => {
             Analyticsinstance = analyticsBlock.instance() as AnalyticsSalesRevenueSeller
        });

        then('AnalyticsSalesRevenueSeller will load with out errors', () => {
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
              (node) => node.prop("testID") === "btnBackSalesRevenue"
            );
            buttonComponent.simulate("press");
            expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
        });

        then("I can call seller revenue api with out errors",()=>{
          const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),salesRevenueObject);
    
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
          Analyticsinstance.getSellerSalesRevenueApiCallId = getCategoryMessage.messageId
          runEngine.sendMessage("Unit Test", getCategoryMessage);
          expect(getCategoryMessage).toBeTruthy();
        })

        then("I am trying to filter with out errors", () => {
          const genderDropDown = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "avgTimeDropdownEdit")
          const event_check = { label: "Monhtly", value: "monthly" }
          genderDropDown.simulate("change", event_check)
        })

        then("I can check bar chart click with out errors", () => {
          const genderDropDown = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "barChartSalesRevenue")
          genderDropDown.renderProp("formatYLabel")({})
          genderDropDown.renderProp("renderTooltip")({})
        })


        then("I can click on download button with out errors", () => {
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnDownloadModal"
            );
            buttonComponent.simulate("press");
            expect(buttonComponent.exists()).toBe(true);

            let buttonComponentPdf = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "btnDownloadPdf"
              );
            buttonComponentPdf.simulate("press");

            let buttonComponentDoc = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "btnDownloadDoc"
              );
            buttonComponentDoc.simulate("press");

            let buttonComponentjpg = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "btnDownloadJpg"
              );
            buttonComponentjpg.simulate("press");

            let buttonComponentCancel = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "btnCancelFilterModal"
              );
            buttonComponentCancel.simulate("press");

            let buttonComponentConfirm = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "btnConfirmFilterModal"
              );
            buttonComponentConfirm.simulate("press");
        });

        then("I can click on sales store button with out errors", () => {
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnStoreSales"
            );
            buttonComponent.simulate("press");
            expect(buttonComponent.exists()).toBe(true);
        });

        then("I can click on select store button with out errors", () => {
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnRedirectStoreSelect"
            );
            buttonComponent.simulate("press");
            expect(buttonComponent.exists()).toBe(true);
        });

        then("I can click on sales product button with out errors", () => {
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnProductSales"
            );
            buttonComponent.simulate("press");
            expect(buttonComponent.exists()).toBe(true);
        });

        then("I can click on select product button with out errors", () => {
          Analyticsinstance.barClick({label:'Jan',value:20,frontColor:'#fff'})
          Analyticsinstance.setState({analyticsType:'product'})
          Analyticsinstance.getSellerSalesRevenue()
          Analyticsinstance.donwloadSalesDocument('pdf')
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnRedirectStoreSelect"
            );
            buttonComponent.simulate("press");
            expect(buttonComponent.exists()).toBe(true);
        });

        then("I can call seller revenue download api with out errors",()=>{
          const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),salesRevenueObject);
    
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
          Analyticsinstance.downloadDocumentSalesRevenueApiCallId = getCategoryMessage.messageId
          runEngine.sendMessage("Unit Test", getCategoryMessage);
          expect(getCategoryMessage).toBeTruthy();
        })


        then("I can check with store id with out errors", () => {
          Analyticsinstance.setState({analyticsType:'store',selectedId:'1'})
          Analyticsinstance.getSellerSalesRevenue()
          Analyticsinstance.donwloadSalesDocument('pdf')
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnRedirectStoreSelect"
            );
            buttonComponent.simulate("press");
            expect(buttonComponent.exists()).toBe(true);
        });

    });


});
