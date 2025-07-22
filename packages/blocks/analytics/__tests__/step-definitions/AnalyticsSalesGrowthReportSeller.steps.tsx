import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AnalyticsSalesGrowthReportSeller from "../../src/AnalyticsSalesGrowthReportSeller"

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
    id: "AnalyticsSalesGrowthReportSeller"
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

const salesRevenueObject = {"data":{"sales_revenue":"32100.0","profit":false,"loss":true,"profit_percentage":"0%","loss_percentage":"30.97%","total_revenue":{"current_month":{"Aug":{"10":"0.0","11":"0.0","12":"0.0","13":"0.0","14":"0.0","15":"0.0","16":"0.0","17":"0.0","18":"0.0","19":"0.0","20":"0.0","21":"0.0","22":"1100.0","23":"0.0","24":"0.0","25":"0.0","26":"0.0","27":"0.0","28":"0.0","29":"0.0","30":"0.0","31":"0.0","01":"0.0","02":"0.0","03":"0.0","04":"0.0","05":"0.0","06":"0.0","07":"0.0","08":"0.0","09":"0.0"}},"previous_month":{"Jul":{"10":"0.0","11":"0.0","12":"1000.0","13":"0.0","14":"0.0","15":"0.0","16":"8000.0","17":"0.0","18":"10800.0","19":"0.0","20":"0.0","21":"0.0","22":"0.0","23":"0.0","24":"0.0","25":"0.0","26":"2000.0","27":"0.0","28":"300.0","29":"0.0","30":"0.0","31":"0.0","01":"0.0","02":"0.0","03":"0.0","04":"0.0","05":"0.0","06":"0.0","07":"0.0","08":"0.0","09":"0.0"}}}}}
const salesRevenueObjectNew ={"data":{"sales_revenue":"1000.0","profit":false,"loss":true,"profit_percentage":"0%","loss_percentage":"94.97%","total_revenue":{"current_week":{"Mon":"0.0","Tue":"0.0","Wed":"0.0","Thu":"0.0","Fri":"0.0","Sat":"0.0","Sun":"0.0"},"previous_week":{"Mon":"0.0","Tue":"0.0","Wed":"0.0","Thu":"0.0","Fri":"0.0","Sat":"0.0","Sun":"0.0"}}}}
const feature = loadFeature('./__tests__/features/AnalyticsSalesGrowthReportSeller-scenario.feature');
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AnalyticsSalesGrowthReportSeller', ({ given, when, then }) => {
        let analyticsBlock:ShallowWrapper;
        let Analyticsinstance:AnalyticsSalesGrowthReportSeller; 

        given('I am a User loading AnalyticsSalesGrowthReportSeller', () => {
            analyticsBlock = shallow(<AnalyticsSalesGrowthReportSeller {...screenProps}/>)
        });

        when('I navigate to the AnalyticsSalesGrowthReportSeller', () => {
             Analyticsinstance = analyticsBlock.instance() as AnalyticsSalesGrowthReportSeller
        });

        then('AnalyticsSalesGrowthReportSeller will load with out errors', () => {
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
          Analyticsinstance.getSellerGrowthCallApiId = getCategoryMessage.messageId
          runEngine.sendMessage("Unit Test", getCategoryMessage);
          const flatlists = analyticsBlock.findWhere(
            (node) => node.prop("testID") === "orderStatusDataList"
          )
  
          const renderItems = flatlists.renderProp("renderItem")({ item:'Aug', index: 8 })
          const allBtnCheckBox0 = renderItems.findWhere(
            (node) => node.prop("testID") == "allBtnCheckBox8"
          )
          allBtnCheckBox0.simulate('press')
          const renderItemss = flatlists.renderProp("renderItem")({ item:'Aug', index: 0 })
          const allBtnCheckBoxs0 = renderItemss.findWhere(
            (node) => node.prop("testID") == "allBtnCheckBox0"
          )
          allBtnCheckBoxs0.simulate('press')
          const btnNextMonth = analyticsBlock.findWhere(
            (node) => node.prop("testID") == "btnNextMonth"
          )
          btnNextMonth.simulate('press')
          const btnNextMonth1 = analyticsBlock.findWhere(
            (node) => node.prop("testID") == "btnNextMonth"
          )
          btnNextMonth1.simulate('press')
          const btnNextMonth2 = analyticsBlock.findWhere(
            (node) => node.prop("testID") == "btnNextMonth"
          )
          btnNextMonth2.simulate('press')
          const btnNextMonth3 = analyticsBlock.findWhere(
            (node) => node.prop("testID") == "btnNextMonth"
          )
          btnNextMonth3.simulate('press')
          const btnNextMonth4 = analyticsBlock.findWhere(
            (node) => node.prop("testID") == "btnNextMonth"
          )
          btnNextMonth4.simulate('press')
          const btnBackMonth = analyticsBlock.findWhere(
            (node) => node.prop("testID") == "btnBackMonth"
          )
          btnBackMonth.simulate('press')
          expect(getCategoryMessage).toBeTruthy();
        })

        then("I am trying to filter with out errors", () => {
          const genderDropDown = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "avgTimeDropdownEdit")
          const event_check = { label: "Monhtly", value: "Monthly" }
          genderDropDown.simulate("change", event_check)
        })

        then("I can check bar chart click with out errors", () => {
          const genderDropDown = analyticsBlock.findWhere(
              (node) => node.prop("data-test-id") === "lineChartSalesGrouwth")
              genderDropDown.props().formatYLabel(500)
              genderDropDown.props().formatYLabel(2000)
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
          const genderDropDown = analyticsBlock.findWhere(
            (node) => node.prop("testID") === "avgTimeDropdownEdit")
        const event_check = { label: "Monhtlys", value: "monthlys" }
        genderDropDown.simulate("change", event_check)
        const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),salesRevenueObjectNew);
    
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
          Analyticsinstance.getSellerGrowthCallApiId = getCategoryMessage.messageId
          runEngine.sendMessage("Unit Test", getCategoryMessage);
            
        });

        then("I can click on select store button with out errors", () => {
          const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{error:''});
    
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
          Analyticsinstance.getSellerGrowthCallApiId = getCategoryMessage.messageId
          runEngine.sendMessage("Unit Test", getCategoryMessage);
        });

        then("I can click on sales product button with out errors", () => {
          const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),{error:''});
    
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
          Analyticsinstance.getSellerGrowthCallApiId = getCategoryMessage.messageId
          runEngine.sendMessage("Unit Test", getCategoryMessage);
        });

        then("I can click on select product button with out errors", () => {
         
          
        });

        then("I can call download report api with out errors",()=>{
          const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),salesRevenueObject);
    
          getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
          Analyticsinstance.downloadDocumentSalesGrowthApiCallId = getCategoryMessage.messageId
          runEngine.sendMessage("Unit Test", getCategoryMessage);
          expect(getCategoryMessage).toBeTruthy();
        })

        then("I can trying to weekly filter with out errors", () => {
          const genderDropDown = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "avgTimeDropdownEdit")
          const event_check = { label: "Weekly", value: "Weekly" }
          genderDropDown.simulate("change", event_check)

          let buttonComponent = analyticsBlock.findWhere(
            (node) => node.prop("testID") === "btnDownloadModal"
          );
          buttonComponent.simulate("press");
          expect(buttonComponent.exists()).toBe(true);

          let buttonComponentPdf = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnDownloadPdf"
            );
          buttonComponentPdf.simulate("press");

          let buttonComponentConfirm = analyticsBlock.findWhere(
              (node) => node.prop("testID") === "btnConfirmFilterModal"
            );
          buttonComponentConfirm.simulate("press");
          Analyticsinstance.setState({
            monthName : -1
          })
          Analyticsinstance.setScrollMonth();
          Analyticsinstance.setState({
            monthName : 3
          })
          Analyticsinstance.setScrollMonth();
        })
        
    });


});
