import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';

import React from 'react';
import { Dimensions } from 'react-native';
import Cfvirtualmannequin3 from '../../src/Cfvirtualmannequin3';
import { Message } from '../../../../framework/src/Message';
import MessageEnum, { getName } from '../../../../framework/src/Messages/MessageEnum';
import { runEngine } from '../../../../framework/src/RunEngine';
const navigation = require('react-navigation');

const screenProps = {
	navigation: {
		goBack: jest.fn()
	},
	id: 'Cfvirtualmannequin3',
};

const feature = loadFeature('./__tests__/features/cfvirtualmannequin3-scenario.feature');

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

		forcedUpdateSpy = jest.spyOn(Cfvirtualmannequin3.prototype, 'forceUpdate');
	});

	test('User selects an avatar', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Cfvirtualmannequin3;

		given('I am a User loading cfvirtualmannequin3', () => {
			exampleBlockA = shallow(<Cfvirtualmannequin3 {...screenProps} />);
		});

		when('I navigate to the cfvirtualmannequin3', () => {
			instance = exampleBlockA.instance() as Cfvirtualmannequin3;
		});

		then('cfvirtualmannequin3 will load without errors', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can select the male avatar', () => {
			const addAddressListAPI = new Message(
				getName(MessageEnum.RestAPIResponceMessage)
			);

			addAddressListAPI.addData(
				getName(MessageEnum.RestAPIResponceSuccessMessage),
				{}
			);
			runEngine.sendMessage("Unit Test", addAddressListAPI);

			const maleAvatar = exampleBlockA.findWhere(node => node.prop('testID') === 'maleAvatar');
			maleAvatar.simulate('press');

			let handleNavigationNextPage = exampleBlockA.findWhere(node => node.prop('testID') === 'handleNavigationNextPage');
			handleNavigationNextPage.simulate('press');

			let handleNavigationNextPageafterClickImage = exampleBlockA.findWhere(node => node.prop('testID') === 'handleNavigationNextPageafterClickImage');
			handleNavigationNextPageafterClickImage.simulate('press');

			let backPress = exampleBlockA.findWhere(node => node.prop('testID') === 'btnBackAddAddress');
			backPress.simulate('press')
		});

		then('I can select the female avatar', () => {
			const femaleAvatar = exampleBlockA.findWhere(node => node.prop('testID') === 'femaleAvatar');
			femaleAvatar.simulate('press');

			let confirmBtn = exampleBlockA.findWhere(node => node.prop('testID') === 'confirmBtn');
			confirmBtn.simulate('press');

			let selectMediaImage = exampleBlockA.findWhere(node => node.prop('testID') === 'selectMediaImage');
			selectMediaImage.simulate('press');


			let CancelButton = exampleBlockA.findWhere(node => node.prop('testID') === 'CancelButton');
			CancelButton.simulate('press');

			let ConfirmButton = exampleBlockA.findWhere(node => node.prop('testID') === 'ConfirmButton');
			ConfirmButton.simulate('press');
		});

	});


	test('User selects an avatar video', ({ given, when, then }) => {
		let exampleBlockA: ShallowWrapper;
		let instance: Cfvirtualmannequin3;

		given('I am a User loading cfvirtualmannequin3 avatar video', () => {
			exampleBlockA = shallow(<Cfvirtualmannequin3 {...screenProps} />);
		});

		when('I navigate to the cfvirtualmannequin3 avatar video', () => {
			instance = exampleBlockA.instance() as Cfvirtualmannequin3;
		});

		then('cfvirtualmannequin3 will load without errors avatar video', () => {
			expect(exampleBlockA.exists()).toBe(true);
		});

		then('I can select the female avatar video', () => {
			const femaleAvatar = exampleBlockA.findWhere(node => node.prop('testID') === 'femaleAvatar');
			femaleAvatar.simulate('press');

			let confirmBtn = exampleBlockA.findWhere(node => node.prop('testID') === 'confirmBtn');
			confirmBtn.simulate('press');

			let selectMediaVideo = exampleBlockA.findWhere(node => node.prop('testID') === 'selectMediaVideo');
			selectMediaVideo.simulate('press');

			let CancelButton = exampleBlockA.findWhere(node => node.prop('testID') === 'CancelButton');
			CancelButton.simulate('press');

			let ConfirmButton = exampleBlockA.findWhere(node => node.prop('testID') === 'ConfirmButton');
			ConfirmButton.simulate('press');
		});

	});



});
