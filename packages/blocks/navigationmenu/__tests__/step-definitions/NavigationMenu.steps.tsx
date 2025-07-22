import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import NavigationMenu from "../../src/NavigationMenu"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        getParam: () => { },
        addListener: (param: string, callback: any) => {
          callback();
        },
      },
    id: "NavigationMenu"
  }

const feature = loadFeature('./__tests__/features/navigationmenu-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}))
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to NavigationMenu', ({ given, when, then }) => {
        let navigationMenuBlock:ShallowWrapper;
        let instance:NavigationMenu; 

        given('I am a User loading NavigationMenu', () => {
            navigationMenuBlock = shallow(<NavigationMenu {...screenProps}/>)
        });

        when('I navigate to the NavigationMenu', () => {
             instance = navigationMenuBlock.instance() as NavigationMenu
        });

        then('NavigationMenu will load with out errors', () => {

            const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
            tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
            runEngine.sendMessage("Unit Test", tokenMsg);
      
            let data = '{"data":{"id":"4","type":"navigation_menu","attributes":{"id":4,"position":"row1","items":[]}}},{"data":{"id":"2","type":"navigation_menu","attributes":{"id":2,"position":"right","items":[{"name":"Builder.ai","url":"http://builder.ai/"}]}}},{"data":{"id":"1","type":"navigation_menu","attributes":{"id":1,"position":"left","items":[{"name":"Builder.ai","url":"http://builder.ai/"},{"name":"Home","url":"Home"}]}}},{"data":{"id":"3","type":"navigation_menu","attributes":{"id":3,"position":"center","items":[{"name":"Builder.ai","url":"http://builder.ai/"},{"name":"Builder.aiw","url":"http://builder.aieee/"}]}}}'
            const msgNavigastionMenuAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
            msgNavigastionMenuAPI.addData(
              getName(MessageEnum.RestAPIResponceDataMessage),
              msgNavigastionMenuAPI.messageId);
              msgNavigastionMenuAPI.addData(
              getName(MessageEnum.RestAPIResponceSuccessMessage), 
              data
            );

            runEngine.sendMessage("Unit Test", msgNavigastionMenuAPI)

            expect(navigationMenuBlock).toBeTruthy()
      
        });

        then("I can click and view the analytics",()=>{
            const  analyticsBtn= navigationMenuBlock.findWhere(
                (node) => node.prop("testID") === "analyticsBtn"
            )
            analyticsBtn.simulate("press")

        })

        then("I can click and view the sales report",()=>{
            const  salesBtn= navigationMenuBlock.findWhere(
                (node) => node.prop("testID") === "salesBtn"
            )
            salesBtn.simulate("press")
        })
        then("I can click and view the revenue",()=>{
            const revenueBtn = navigationMenuBlock.findWhere(
                (node) => node.prop("testID") === "revenueBtn"
            )
            revenueBtn.simulate("press")
        })
        then("I can click and view the activity",()=>{
            const  activityBtn= navigationMenuBlock.findWhere(
                (node) => node.prop("testID") === "activityBtn"
            )
            activityBtn.simulate("press")
        })
        when("I click the logout button",()=>{
            const  logout= navigationMenuBlock.findWhere(
                (node) => node.prop("testID") === "logout"
            )
            logout.simulate("press")
        })
        then("I can see the confirm modal for logout",()=>{
            expect(navigationMenuBlock.state("logoutModal")).toBe(true);

            const  btnCancelLogoutModal= navigationMenuBlock.findWhere(
                (node) => node.prop("testID") === "btnCancelLogoutModal"
            )
            btnCancelLogoutModal.simulate("press")
            const  logout= navigationMenuBlock.findWhere(
                (node) => node.prop("testID") === "logout"
            )
            logout.simulate("press")
        })
        then("I can confirm and logout from the app",()=>{
            const  btnLogoutModal= navigationMenuBlock.findWhere(
                (node) => node.prop("testID") === "btnLogoutModal"
            )
            btnLogoutModal.simulate("press")
        })
        then("I can click close icon to close the app",()=>{
            const  cancelIcon= navigationMenuBlock.findWhere(
                (node) => node.prop("testID") === "cancelIcon"
            )
            cancelIcon.simulate("press")
        })


        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(navigationMenuBlock).toBeTruthy()
        });
    });


});
