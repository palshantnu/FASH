import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';

import React from 'react';
import { Dimensions } from 'react-native';
import BasicdetailsScreen from '../../src/BasicdetailsScreen';
import { Message } from '../../../../framework/src/Message';
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../../framework/src/RunEngine';
const navigation = require('react-navigation');

const screenProps = {
    navigation: {
        goBack: jest.fn()
    },
    id: 'BasicdetailsScreen',
};

const feature = loadFeature('./__tests__/features/BasicdetailsScreen-scenario.feature');

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

        forcedUpdateSpy = jest.spyOn(BasicdetailsScreen.prototype, 'forceUpdate');
    });

    test('User basic details', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: BasicdetailsScreen;

        given('I am a User loading BasicdetailsScreen', () => {
            exampleBlockA = shallow(<BasicdetailsScreen {...screenProps} />);
        });

        when('I navigate to the BasicdetailsScreen', () => {
            instance = exampleBlockA.instance() as BasicdetailsScreen;
        });

        then('BasicdetailsScreen will load without errors', () => {
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

            let avatar_name = exampleBlockA.findWhere(node => node.prop('testID') === 'avatar_name');
            avatar_name.props().onChangeText("Name");

            let avatar_age = exampleBlockA.findWhere(node => node.prop('testID') === 'avatar_age');
            avatar_age.props().onChangeText("Age");

            let avatar_height = exampleBlockA.findWhere(node => node.prop('testID') === 'avatar_height');
            avatar_height.props().onChangeText("Height");
        });

    });

});
