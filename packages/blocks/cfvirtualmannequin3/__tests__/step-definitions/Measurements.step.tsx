import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';

import React from 'react';
import { Dimensions } from 'react-native';
import Measurements from '../../src/Measurements';
import { Message } from '../../../../framework/src/Message';
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../../framework/src/RunEngine';
const navigation = require('react-navigation');

const screenProps = {
    navigation: {
        goBack: jest.fn()
    },
    id: 'Measurements',
};

const feature = loadFeature('./__tests__/features/Measurements-scenario.feature');

defineFeature(feature, (test) => {
    let dimensionsGetSpy: jest.SpyInstance;
    let dimensionsAddEventListenerSpy: jest.SpyInstance;
    let forcedUpdateSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'ios' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'ios');

        dimensionsGetSpy = jest.spyOn(Dimensions, 'get').mockImplementation((dim: 'window' | 'screen') => ({
            width: 320,
            height: 640,
            scale: 1,
            fontScale: 1,
        }));

        dimensionsAddEventListenerSpy = jest.spyOn(Dimensions, 'addEventListener');

        forcedUpdateSpy = jest.spyOn(Measurements.prototype, 'forceUpdate');
    });

    test('User basic details', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: Measurements;

        given('I am a User loading Measurements', () => {
            exampleBlockA = shallow(<Measurements {...screenProps} />);
        });

        when('I navigate to the Measurements', () => {
            instance = exampleBlockA.instance() as Measurements;
        });

        then('Measurements will load without errors', () => {
            expect(exampleBlockA.exists()).toBe(true);
        });

        then('I can handle next page navigation', () => {
            const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
            msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
            runEngine.sendMessage("Unit Test", msgTokenAPI)

            let handleNavigationNextPage = exampleBlockA.findWhere(node => node.prop('testID') === 'handleNavigationNextPage');
            handleNavigationNextPage.simulate('press');

            let backPress = exampleBlockA.findWhere(node => node.prop('testID') === 'btnBackAddAddress');
            backPress.simulate('press')
        });

        then('Handle text input data', () => {
            let NeckBase = exampleBlockA.findWhere(node => node.prop('testID') === 'NeckBase');
            NeckBase.props().onChangeText("NeckBase");

            let AcrossShoulderFront = exampleBlockA.findWhere(node => node.prop('testID') === 'AcrossShoulderFront');
            AcrossShoulderFront.props().onChangeText("AcrossShoulderFront");

            let AcrossShoulderBack = exampleBlockA.findWhere(node => node.prop('testID') === 'AcrossShoulderBack');
            AcrossShoulderBack.props().onChangeText("AcrossShoulderBack");

            let Chest = exampleBlockA.findWhere(node => node.prop('testID') === 'Chest');
            Chest.props().onChangeText("Chest");

            let Bicep = exampleBlockA.findWhere(node => node.prop('testID') === 'Bicep');
            Bicep.props().onChangeText("Bicep");

            let Waist = exampleBlockA.findWhere(node => node.prop('testID') === 'Waist');
            Waist.props().onChangeText("Waist");

            let HighHip = exampleBlockA.findWhere(node => node.prop('testID') === 'HighHip');
            HighHip.props().onChangeText("HighHip");
        });

    });

});
