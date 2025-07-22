import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import RedeemScreen from "../../src/RedeemScreen"
const navigation = require("react-navigation")

// const screenProps = {
//     navigation: navigation,
//     id: "Loyaltysystem"
//   }
  const screenProps = {
    navigation: {
        
        state: {
            params: {
                
            }
         },
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "RedeemScreen"
  }
const feature = loadFeature('./__tests__/features/RedeemScreen-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to RedeemScreen', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:RedeemScreen; 

        given('I am a User loading RedeemScreen', () => {
            exampleBlockA = shallow(<RedeemScreen {...screenProps}/>);
        });

        when('I navigate to the RedeemScreen', () => {
             instance = exampleBlockA.instance() as RedeemScreen
             instance.openModalFunc();
        });

        then('RedeemScreen will load with out errors', () => {
            let flatList = exampleBlockA.findWhere(node => node.prop('testID') === "pointsDataFlatlist");
            flatList.renderProp('renderItem')({
                item: {  id:3,
                    title:'2 free deliveries',
                    earn_points:256 },
                index: 0
            })
            
            expect(exampleBlockA).toBeTruthy();
        });

       

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnBackInReddemScreen');
            buttonComponent.simulate('press');
            let redeemComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'redeemFunction');
            redeemComponent.simulate('press');
            let cancelBtn = exampleBlockA.findWhere((node) => node.prop('testID') === 'cancelBtn');
            cancelBtn.simulate('press');
            
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
