import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Loyaltysystem from "../../src/Loyaltysystem"
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
    id: "Loyaltysystem"
  }
const feature = loadFeature('./__tests__/features/loyaltysystem-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to loyaltysystem', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:Loyaltysystem; 

        given('I am a User loading loyaltysystem', () => {
            exampleBlockA = shallow(<Loyaltysystem {...screenProps}/>);
        });

        when('I navigate to the loyaltysystem', () => {
             instance = exampleBlockA.instance() as Loyaltysystem
            let flatList = exampleBlockA.findWhere(node => node.prop('testID') === "loyaltyDataFlatlist");
            flatList.renderProp('renderItem')({
                item: { id: 0,  
                        orderID:'Order #4564-4678',
                        date:"Credited on March 20, 2024",
                        points:122 
                    },
                index: 0
            })
            
            instance.setEnableField();
            instance.doButtonPressed();
        });

        then('loyaltysystem will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

       

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnBackAssignstore');
            buttonComponent.simulate('press');
            let loyalButtonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'loyaltyPointBtn');
            loyalButtonComponent.simulate('press');
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
