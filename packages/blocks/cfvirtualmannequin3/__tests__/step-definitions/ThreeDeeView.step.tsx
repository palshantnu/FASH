import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';

import React from 'react';
import { Dimensions } from 'react-native';
import ThreeDeeView from '../../src/ThreeDeeView';
import { Message } from '../../../../framework/src/Message';
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../../framework/src/RunEngine';
const navigation = require('react-navigation');

const screenProps = {
    navigation: {
        goBack: jest.fn()
    },
    id: 'ThreeDeeView',
};

const feature = loadFeature('./__tests__/features/ThreeDeeView-scenario.feature');

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

        forcedUpdateSpy = jest.spyOn(ThreeDeeView.prototype, 'forceUpdate');
    });

    test('User basic details ThreeDeeView', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: ThreeDeeView;

        given('I am a User loading ThreeDeeView', () => {
            exampleBlockA = shallow(<ThreeDeeView {...screenProps} />);
        });

        when('I navigate to the ThreeDeeView', () => {
            instance = exampleBlockA.instance() as ThreeDeeView;
        });

        then('ThreeDeeView will load without errors', () => {
            expect(exampleBlockA.exists()).toBe(true);
        });

        then('I can handle next page navigation', () => {
            const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
            msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
            runEngine.sendMessage("Unit Test", msgTokenAPI)

            let backPress = exampleBlockA.findWhere(node => node.prop('testID') === 'btnBackAddAddress');
            backPress.simulate('press')

            let carouselflatlistStyles = exampleBlockA.findWhere((node) => node.prop("testID") === "Assignstore_show_flatlist_styles")
            let renderFlateListStyle = carouselflatlistStyles.renderProp('renderItem')({ item:  { id: 1, colorName: 'black' } })
            let selectStyle = renderFlateListStyle.findWhere((node) => node.prop('testID') === 'stylingRender');
            selectStyle.simulate('press')
             
        });
    });

});
