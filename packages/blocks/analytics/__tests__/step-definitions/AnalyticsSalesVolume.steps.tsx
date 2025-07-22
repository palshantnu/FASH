import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AnalyticsSalesVolume from "../../src/AnalyticsSalesVolume"
import { setStorageData } from "../../../../framework/src/Utilities"

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
    id: "AnalyticsSalesVolume"
  }

const monthArrObject=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

const salesRevenueObject = {
    "data": {
        "filter_range": "monthly",
        "sold_units": "33000.0",
        "returned_units": "4188.0625",
        "sales_volume": 45,
        "products":{
            name:'Demo'
        }
    }
}

const salesRevenueObjectWithError = {
  "data": {
      "filter_range": "monthly",
      "total_sold_units": 0,
      "returned_units": "4188.0625",
      "sales_volume": 45,
      "products":{
          name:'Demo'
      }
  }
}

const feature = loadFeature('./__tests__/features/AnalyticsSalesVolume-scenario.feature');
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AnalyticsSalesVolume', ({ given, when, then }) => {
        let analyticsBlock:ShallowWrapper;
        let Analyticsinstance:AnalyticsSalesVolume; 

        given('I am a User loading AnalyticsSalesVolume', () => {
            analyticsBlock = shallow(<AnalyticsSalesVolume {...screenProps}/>)
        });

        when('I navigate to the AnalyticsSalesVolume', () => {
             Analyticsinstance = analyticsBlock.instance() as AnalyticsSalesVolume
        });

        then('AnalyticsSalesVolume will load with out errors', () => {
            
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
              (node) => node.prop("testID") === "btnBackSalesVolume"
            );
            buttonComponent.simulate("press");
            expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(1);
        });

        then("I can call seller volume api with out errors",()=>{
          const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),salesRevenueObject);
    
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
          Analyticsinstance.getSellerSalesVolumeApiCallId = getCategoryMessage.messageId
          runEngine.sendMessage("Unit Test", getCategoryMessage);
          expect(getCategoryMessage).toBeTruthy();
        })

        then("I am trying to filter with out errors", () => {
            Analyticsinstance.setState({showData:true})
            const genderDropDown = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "selectPeriodChange")
            const event_check = { label: "Monhtly", value: "monthly" }
            genderDropDown.simulate("change", event_check)

            let render_item = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "monthFlatRender"
              );
            let render_data = render_item.renderProp("renderItem")({
                item: monthArrObject[1],
                index: 0,
              });
        
            let let_button = render_data.findWhere(
                (node) => node.prop("testID") == "btnSetMonthName"
              );
            let_button.simulate("press");
            expect(let_button).toBeTruthy();

            let let_buttonPrev = analyticsBlock.findWhere(
                (node) => node.prop("testID") == "btnMonthBack"
              );
            let_buttonPrev.simulate("press");


            let let_buttonNext = analyticsBlock.findWhere(
                (node) => node.prop("testID") == "btnMonthNext"
              );
            let_buttonNext.simulate("press");

        })

        then("I can check bar chart click with out errors", () => {
          const genderDropDown = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "pieChartSalesVolume")
          genderDropDown.renderProp("centerLabelComponent")({})
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

        then("I can call download report api with out errors",()=>{
            const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
            getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),salesRevenueObject);
      
            getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
            Analyticsinstance.downloadDocumentSalesVolumeApiCallId = getCategoryMessage.messageId
            runEngine.sendMessage("Unit Test", getCategoryMessage);
            expect(getCategoryMessage).toBeTruthy();
        })

        then("I can click on select store button with out errors", () => {
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnRedirectStoreSelect"
            );
            buttonComponent.simulate("press");
            expect(buttonComponent.exists()).toBe(true);
        });

        then("I can click on select product button with out errors", () => {
          Analyticsinstance.setState({analyticsType:'product'})
          Analyticsinstance.getSellerSalesVolume()
          Analyticsinstance.donwloadDocument('pdf')
            let buttonComponent = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnRedirectStoreSelect"
            );
            buttonComponent.simulate("press");
            expect(buttonComponent.exists()).toBe(true);
        });

        then("I can click on select store with id and with out errors", () => {
            Analyticsinstance.setState({analyticsType:'store',selectedId:'1'})
            Analyticsinstance.getSellerSalesVolume()
            Analyticsinstance.donwloadDocument('pdf')
              let buttonComponent = analyticsBlock.findWhere(
                (node) => node.prop("testID") === "btnRedirectStoreSelect"
              );
              buttonComponent.simulate("press");
              expect(buttonComponent.exists()).toBe(true);
          });

          then("I can call seller volume api with errors",()=>{
            const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
            getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),salesRevenueObjectWithError);
      
            getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
            Analyticsinstance.getSellerSalesVolumeApiCallId = getCategoryMessage.messageId
            runEngine.sendMessage("Unit Test", getCategoryMessage);
            expect(getCategoryMessage).toBeTruthy();
          })

    });


});
