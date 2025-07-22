import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';

import React from 'react';
import { Dimensions } from 'react-native';
import Tryonit from '../../src/Tryonit';
import { Message } from '../../../../framework/src/Message';
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../../framework/src/RunEngine';
const navigation = require('react-navigation');

const screenProps = {
    navigation: {
        goBack: jest.fn()
    },
    id: 'Tryonit',
};

const feature = loadFeature('./__tests__/features/Tryonit-scenario.feature');

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

        forcedUpdateSpy = jest.spyOn(Tryonit.prototype, 'forceUpdate');
    });

    test('User basic details Tryonit', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: Tryonit;

        given('I am a User loading Tryonit', () => {
            exampleBlockA = shallow(<Tryonit {...screenProps} />);
        });

        when('I navigate to the Tryonit', () => {
            instance = exampleBlockA.instance() as Tryonit;
        });

        then('Tryonit will load without errors', () => {
            expect(exampleBlockA.exists()).toBe(true);
        });

        then('I can handle next page navigation', () => {
            const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
            msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
            runEngine.sendMessage("Unit Test", msgTokenAPI)

            let handleNavigationNextPage = exampleBlockA.findWhere(node => node.prop('testID') === 'handleNavigationNextPage');
            handleNavigationNextPage.simulate('press');

            let handleNavigationon3dPress = exampleBlockA.findWhere(node => node.prop('testID') === 'handleNavigationon3dPress');
            handleNavigationon3dPress.simulate('press');
        });

        then('Handle text input data', () => {

            let backPress = exampleBlockA.findWhere(node => node.prop('testID') === 'btnBackAddAddress');
            backPress.simulate('press')

            let personHairs = exampleBlockA.findWhere(node => node.prop('testID') === 'personHairs');
            personHairs.simulate('press')

            let personBodyType = exampleBlockA.findWhere(node => node.prop('testID') === 'personBodyType');
            personBodyType.simulate('press')

            let personPose = exampleBlockA.findWhere(node => node.prop('testID') === 'personPose');
            personPose.simulate('press')

            let personSkinTone = exampleBlockA.findWhere(node => node.prop('testID') === 'personSkinTone');
            personSkinTone.simulate('press')

            let carouselflatlistheader = exampleBlockA.findWhere((node) => node.prop("testID") === "Assignstore_show_flatlist_color")
            let renderFlateList1 = carouselflatlistheader.renderProp('renderItem')({ item: { id: 1, colorName: 'black' } })
            let selectColour = renderFlateList1.findWhere((node) => node.prop('testID') === 'selectColour');
            selectColour.simulate('press')

            let carouselflatlistSize = exampleBlockA.findWhere((node) => node.prop("testID") === "Assignstore_show_flatlist_size")
            let renderFlateListSize = carouselflatlistSize.renderProp('renderItem')({ item: { id: 1, colorName: 'black' } })
            let selectSize = renderFlateListSize.findWhere((node) => node.prop('testID') === 'selectSize');
            selectSize.simulate('press')

            let carouselflatlistStyles = exampleBlockA.findWhere((node) => node.prop("testID") === "Assignstore_show_flatlist_styles")
            let renderFlateListStyle = carouselflatlistStyles.renderProp('renderItem')({ item: { id: 1, colorName: 'black' } })
            let selectStyle = renderFlateListStyle.findWhere((node) => node.prop('testID') === 'stylingRender');
            selectStyle.simulate('press')
        });
    });

});
