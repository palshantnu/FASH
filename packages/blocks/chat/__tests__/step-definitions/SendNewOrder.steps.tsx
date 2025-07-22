import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from '../../../../framework/src/Message';
import * as storageData from "../../../../framework/src/Utilities";

import MessageEnum, {
  getName,
} from '../../../../framework/src/Messages/MessageEnum';
import React from 'react';
import SendNewOrder from '../../src/SendNewOrder';
jest.useFakeTimers();
const screenProps = {
  navigation: {
    goBack: jest.fn(),
    navigate: jest.fn(),
    state: {
      params: {
        id: 90,
      },
    },
  },
  id: 'SendNewOrder',
};

const feature = loadFeature("./__tests__/features/SendNewOrder-scenario.feature");
const mockgetStorageData = jest.spyOn(storageData, "getStorageData");

global.FormData = require('react-native/Libraries/Network/FormData');

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to SendNewOrder', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;

    let instance: SendNewOrder;

    given('I am a User loading SendNewOrder', () => {
      mockgetStorageData.mockImplementation(() =>
        Promise.resolve(`"renter"`)
      );
      exampleBlockA = shallow(<SendNewOrder {...(screenProps as any)} />);
    });

    when('I navigate to the SendNewOrder', async () => {
      instance = exampleBlockA.instance() as SendNewOrder;

      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);

      const getpostlistRefresh: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      getpostlistRefresh.addData(getName(MessageEnum.SessionResponseData), {
        chatId: 1
      });
      runEngine.sendMessage("Unit Test", getpostlistRefresh);
    });

    then("User can make functional button", () => {
      let goBackButton = exampleBlockA.findWhere(
        (node) => node.prop("leftTestId") === "goBackButton"
      )
      goBackButton.simulate("leftPress")

      const testIdsOfSettingOptions = [
        "MediaUploadPortfolio",
        "sendRequest",
        "OpenCamera",
        "OpenGallery",
        "CloseDetailsPickerModal"
      ];
      testIdsOfSettingOptions.forEach((testID) => {
        const optionButton = exampleBlockA.findWhere(
          (node) => node.prop("testID") === testID
        );
        optionButton.simulate("press");
        instance.setState({profilePhotoDetails:{uri:"test",name:"test",type:"png"}})
      });
    })

    then("User can select from drop down", () => {
      const mockFunction = jest.spyOn(instance, "onChangeDropBtn")
      let dropDown = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "dropDown"
      )
      dropDown.props().onFocus()
      dropDown.props().onBlur()
      dropDown.props().onChange()

      expect(mockFunction).toHaveBeenCalled()
    })

    then("User can change product name", () => {
      const mockFunction = jest.spyOn(instance, "onProductNameChange")
      let productName = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "productName"
      )
      productName.props().onChangeText()
      expect(mockFunction).toHaveBeenCalled()
    })

    then("User can render the input component successfully", () => {
      const mockFunction = jest.spyOn(instance, "renderInputComponents")
      let dropDown = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "renderInputComp"
      )
      let inputComponentWrapper = dropDown.renderProp("renderItem")({
        item: {
          key: 1,
          heading: "Size",
          inputTxt: "Product size"
        }, index: 0
      });

      let changeInputValue = inputComponentWrapper.findWhere(
        (node) => node.prop("testID") === "changeInputValue"
      )
      changeInputValue.props().onChangeText()

      expect(mockFunction).toHaveBeenCalled()
    })

    then("User can send new order request successfully", () => {
      let msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "1",
            name: "xyz",
          }
        }
      );
      instance.sendNewRequestApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
    })

    then("User can send new order request unsuccessfully", () => {
      let msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          error: "Error"
        }
      );
      instance.sendNewRequestApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
    })

  });

  test('User navigates to SendNewOrder', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;

    let instance: SendNewOrder;

    given('I am a User loading SendNewOrder', () => {
      mockgetStorageData.mockImplementation(() =>
        Promise.resolve(`"renter"`)
      );
      exampleBlockA = shallow(<SendNewOrder {...(screenProps as any)} />);
    });

    when('I navigate to the SendNewOrder', async () => {
      instance = exampleBlockA.instance() as SendNewOrder;

      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);

      const getpostlistRefresh: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      getpostlistRefresh.addData(getName(MessageEnum.SessionResponseData), {
        chatId: 1
      });
      runEngine.sendMessage("Unit Test", getpostlistRefresh);
    });

    then("User can make functional button", () => {
      let goBackButton = exampleBlockA.findWhere(
        (node) => node.prop("leftTestId") === "goBackButton"
      )
      goBackButton.simulate("leftPress")

      const testIdsOfSettingOptions = [
        "MediaUploadPortfolio",
        "sendRequest",
        "OpenCamera",
        "OpenGallery",
        "CloseDetailsPickerModal"
      ];
      testIdsOfSettingOptions.forEach((testID) => {
        const optionButton = exampleBlockA.findWhere(
          (node) => node.prop("testID") === testID
        );
        optionButton.simulate("press");
        instance.setState({profilePhotoDetails:{uri:"",name:"",type:""}})
      });
    })

    then("User can select from drop down", () => {
      const mockFunction = jest.spyOn(instance, "onChangeDropBtn")
      let dropDown = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "dropDown"
      )
      dropDown.props().onFocus()
      dropDown.props().onBlur()
      dropDown.props().onChange()

      expect(mockFunction).toHaveBeenCalled()
    })

    then("User can change product name", () => {
      const mockFunction = jest.spyOn(instance, "onProductNameChange")
      let productName = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "productName"
      )
      productName.props().onChangeText()
      expect(mockFunction).toHaveBeenCalled()
    })

    then("User can render the input component successfully", () => {
      const mockFunction = jest.spyOn(instance, "renderInputComponents")
      let dropDown = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "renderInputComp"
      )
      let inputComponentWrapper = dropDown.renderProp("renderItem")({
        item: {
          key: 1,
          heading: "Size",
          inputTxt: "Product size"
        }, index: 0
      });

      let changeInputValue = inputComponentWrapper.findWhere(
        (node) => node.prop("testID") === "changeInputValue"
      )
      changeInputValue.props().onChangeText()

      expect(mockFunction).toHaveBeenCalled()
    })

    then("User can send new order request successfully", () => {
      let msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            id: "1",
            name: "xyz",
          }
        }
      );
      instance.sendNewRequestApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
    })

    then("User can send new order request unsuccessfully", () => {
      let msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          error: "Error"
        }
      );
      instance.sendNewRequestApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
    })

  then('should show error if productName is empty', () => {
      instance.setState({
        productName: '',
        productDescription: 'desc',
        value: 'male',
        productData: { '1': 'M', '2': 'Red', '3': '2', '4': '100', '5': '10' },
      });
    const result = instance.validateNewRequestFields();
    expect(result).toBe(false);

      instance.setState({
        productName: 'Shirt',
        productDescription: '',
        value: 'male',
        productData: { '1': 'F', '2': 'White', '3': '20', '4': '700', '5': '1' },
      });
      instance.setState({
        productName: 'Shirt',
        productDescription: 'desc',
        value: '',
        productData: { '1': 'M', '2': 'Yellow', '3': '5', '4': '600', '5': '5' },
      })
      instance.setState({
        productName: 'Shirt',
        productDescription: '',
        value: 'male',
        productData: { '1': 'F', '2': 'Black', '3': '9', '4': '900', '5': '11' },
      })
  })

  then('should show error if product image is missing', () => {
    instance.setState({
      productName: 'Shirt',
      productDescription: 'desc',
      value: 'male',
      productData: { '1': 'F', '2': 'Green', '3': '6', '4': '800', '5': '10' },
    });
    instance.setState({
      productName: 'Shirt',
      productDescription: 'desc',
      value: 'male',
      productData: { '1': 'M', '2': 'blue', '3': '9', '4': '300', '5': '12' },
    });
    instance.setState({
      productName: '',
      productDescription: 'desc',
      value: 'male',
      productData: { '1': 'M', '2': 'red', '3': '8', '4': '400', '5': '8' },
    });
  });
  then('should show error if gender is not selected', () => {
    instance.setState({
      productName: 'Shirt',
      productDescription: 'desc',
      value: '',
      productData: { '1': 'M', '2': 'Red', '3': '2', '4': '100', '5': '10' },
    });
    instance.setState({
      productName: 'Shirt',
      productDescription: 'desc',
      value: '',
      productData: { '1': 'F', '2': 'Yellow', '3': '1', '4': '900', '5': '12' },
    });
  })
  });
});

// Customizable Area End
