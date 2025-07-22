import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';

import React from 'react';
import { Dimensions } from 'react-native';
import LowerMesurements from '../../src/LowerMesurements';
import { Message } from '../../../../framework/src/Message';
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../../framework/src/RunEngine';
const navigation = require('react-navigation');

const screenProps = {
    navigation: {
        goBack: jest.fn()
    },
    id: 'LowerMeasurementScreen-scenario',
};

const feature = loadFeature('./__tests__/features/LowerMeasurementScreen-scenario.feature');

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

        forcedUpdateSpy = jest.spyOn(LowerMesurements.prototype, 'forceUpdate');
    });

    test('User basic details for measurements', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: LowerMesurements;

        given('I am a User loading LowerMesurements', () => {
            exampleBlockA = shallow(<LowerMesurements {...screenProps} />);
        });

        when('I navigate to the LowerMesurements', () => {
            instance = exampleBlockA.instance() as LowerMesurements;
        });

        then('LowerMesurements will load without errors', () => {
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
            let NeckBase = exampleBlockA.findWhere(node => node.prop('testID') === 'LowHip');
            NeckBase.props().onChangeText("sonali");

            let AcrossShoulderFront = exampleBlockA.findWhere(node => node.prop('testID') === 'UpperThigh');
            AcrossShoulderFront.props().onChangeText("sonali");

            let AcrossShoulderBack = exampleBlockA.findWhere(node => node.prop('testID') === 'LowerThigh');
            AcrossShoulderBack.props().onChangeText("sonali");

            let Chest = exampleBlockA.findWhere(node => node.prop('testID') === 'Knee');
            Chest.props().onChangeText("sonali");

            let Bicep = exampleBlockA.findWhere(node => node.prop('testID') === 'Calf');
            Bicep.props().onChangeText("sonali");
        });

    });

});
