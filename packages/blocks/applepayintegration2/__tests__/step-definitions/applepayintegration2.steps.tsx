import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import Applepayintegration2 from "../../src/Applepayintegration2"
const navigation = require("react-navigation")

const screenProps = {
    navigation: navigation,
    id: "Applepayintegration2"
  }

const feature = loadFeature('./__tests__/features/applepayintegration2-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to applepayintegration2', ({ given, when, then }) => {
        let exampleBlockA:ShallowWrapper;
        let instance:Applepayintegration2; 

        given('I am a User loading applepayintegration2', () => {
            exampleBlockA = shallow(<Applepayintegration2 {...screenProps}/>);
        });

        when('I navigate to the applepayintegration2', () => {
             instance = exampleBlockA.instance() as Applepayintegration2
        });

        then('applepayintegration2 will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then('I can enter text with out errors', () => {
            let textInputComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'txtInput');
            textInputComponent.simulate('changeText', 'hello@aol.com');
        });

        then('I can select the button with with out errors', () => {
            let buttonComponent = exampleBlockA.findWhere((node) => node.prop('testID') === 'btnExample');
            buttonComponent.simulate('press');
            expect(instance.state.txtSavedValue).toEqual("hello@aol.com");
        });

        then('I can leave the screen with out errors', () => {
            instance.componentWillUnmount()
            expect(exampleBlockA).toBeTruthy();
        });
    });


});
