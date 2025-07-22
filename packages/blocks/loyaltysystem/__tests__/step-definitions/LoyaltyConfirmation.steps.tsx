import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import LoyaltyConfirmation from "../../src/LoyaltyConfirmation"
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
    id: "LoyaltyConfirmation"
  }
const feature = loadFeature('./__tests__/features/LoyaltyConfirmation-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to LoyaltyConfirmation', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:LoyaltyConfirmation; 

        given('I am a User loading LoyaltyConfirmation', () => {
            exampleBlockA = shallow(<LoyaltyConfirmation {...screenProps}/>);
        });

        when('I navigate to the LoyaltyConfirmation', () => {
             instance = exampleBlockA.instance() as LoyaltyConfirmation;
        });

        then('LoyaltyConfirmation will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
            const getNavData: Message = new Message(
                getName(MessageEnum.NavigationPayLoadMessage)
              );
              getNavData.addData(getName(MessageEnum.LoyaltyConfirmationData), {
                "message": "Perk applied successfully!",
                "promo_code": {
                    "id": 1,
                    "perk_code": "Test123",
                    "perk_type": "discount",
                    "description": "get 10 % of discount",
                    "discount_percentage": 10.0,
                    "points_needed": 10,
                    "created_at": "2025-03-03T11:32:06.348Z",
                    "updated_at": "2025-03-03T11:32:06.348Z"
                }
              });
        
              runEngine.sendMessage("Unit Test", getNavData);
        });

       

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnBackConfirmation');
            buttonComponent.simulate('press');
        
        });

        then('I can click on button catalogue redirect with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnCatalogueRedirect');
            buttonComponent.simulate('press');
        
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
