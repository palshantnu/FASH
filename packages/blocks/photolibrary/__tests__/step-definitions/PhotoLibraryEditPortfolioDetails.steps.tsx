import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PhotoLibraryEditPortfolioDetails from "../../src/PhotoLibraryEditPortfolioDetails"
import { Alert, Platform } from "react-native";

const screenProps = {
  navigation: {
    state: {
      params: {
        isEditQuestionnaire: true
      }
    },
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn()
  },
  id: "PhotoLibraryEditPortfolioDetails"
}

const feature = loadFeature('./__tests__/features/PhotoLibraryEditPortfolioDetails-scenario.feature');

jest.mock("../../../../framework/src/StorageProvider", () => ({
  get: jest.fn().mockImplementation(() => Promise.resolve([]))
}));

defineFeature(feature, (test) => {

  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    jest.useFakeTimers();
  });

  test('User navigates to PhotoLibraryEditPortfolioDetails', ({ given, when, then }) => {
    let PhotoLibraryEditPortfolio: ShallowWrapper;
    let instance: PhotoLibraryEditPortfolioDetails;

    given('I am a User loading PhotoLibraryEditPortfolioDetails', () => {
      PhotoLibraryEditPortfolio = shallow(<PhotoLibraryEditPortfolioDetails {...screenProps} />);
      Platform.OS = "ios"
      PhotoLibraryEditPortfolio = shallow(<PhotoLibraryEditPortfolioDetails {...screenProps} />);
    });

    when('I navigate to the PhotoLibraryEditPortfolioDetails', () => {
      instance = PhotoLibraryEditPortfolio.instance() as PhotoLibraryEditPortfolioDetails
    });

    when("User navigate to the PhotoLibraryEditPortfolioDetails", () => {
      instance = PhotoLibraryEditPortfolio.instance() as PhotoLibraryEditPortfolioDetails;

      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(
        getName(MessageEnum.SessionResponseToken),
        'token-string'
      );
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", tokenMsg);

      const message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      message.addData(getName(MessageEnum.NavigationPayLoadMessage), {
        item: {
          description: "description",
          url: "image.png",
          portfolio_image_id: 0
        }
      });
      mockReceive("Unit Test", message);
    });

    then("User can update detail view", () => {
      let cancleDet = PhotoLibraryEditPortfolio.findWhere((node) => node.prop("testID") === "cancleDetails");
      cancleDet.simulate("press");

      let BackBtnClick = PhotoLibraryEditPortfolio.findWhere((node) => node.prop("leftTestId") === "BackBtnClick");
      BackBtnClick.props().onLeftPress();

      let deleteIconBtn = PhotoLibraryEditPortfolio.findWhere((node) => node.prop("testID") === "DeleteIconBtn");
      deleteIconBtn.simulate("press");

      let replaceImageBtn = PhotoLibraryEditPortfolio.findWhere((node) => node.prop("testID") === "ReplaceImageBtn");
      replaceImageBtn.simulate("press");

      let openCamera = PhotoLibraryEditPortfolio.findWhere((node) => node.prop("testID") === "OpenCamera");
      openCamera.simulate("press");
      
      let openGallery = PhotoLibraryEditPortfolio.findWhere((node) => node.prop("testID") === "OpenGallery");
      openGallery.simulate("press");
      
      let CloseDetailsPickerModal = PhotoLibraryEditPortfolio.findWhere((node) => node.prop("testID") === "CloseDetailsPickerModal");
      CloseDetailsPickerModal.simulate("press");

      let OnEditDetailsInputChange = PhotoLibraryEditPortfolio.findWhere((node) => node.prop("testID") === "OnEditDetailsInputChange");
      OnEditDetailsInputChange.props().onChangeText("test")

      const updateDetails = jest.spyOn(instance, "updateDetailsView");
      let updateDet = PhotoLibraryEditPortfolio.findWhere((node) => node.prop("testID") === "UpdatedetailsView");
      updateDet.simulate("press");
      expect(updateDetails).toHaveBeenCalled();
    })

    then("Api call for deleting data of portfolio", () => {
      const mockedHandleApiResponseMessages = jest.spyOn(
        instance,
        "receive"
      );
      const reasonErrorApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      reasonErrorApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        reasonErrorApi.messageId
      );
      reasonErrorApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "message": "Portfolio Image updated successfully."
        }
      );
      const mockAlert = jest.spyOn(Alert, 'alert')
      instance.deletePortfolioApicall = reasonErrorApi.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", reasonErrorApi);
      mockAlert.mock.calls[0][2]![0].onPress!()
      expect(mockAlert).toHaveBeenCalled();
      mockAlert.mockClear()

      reasonErrorApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "error": "error"
        }
      );
      instance.deletePortfolioApicall = reasonErrorApi.messageId;
      mockReceive("Unit Test", reasonErrorApi);
    })

    when("Api call for updating data of portfolio", () => {
      const mockedHandleApiResponseMessages = jest.spyOn(
        instance,
        "receive"
      );
      const reasonErrorApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      reasonErrorApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        reasonErrorApi.messageId
      );
      reasonErrorApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "message": "Portfolio Image updated successfully."
        }
      );
      instance.updatePortfolioAPI = reasonErrorApi.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", reasonErrorApi);

      reasonErrorApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "error": "error"
        }
      );
      instance.updatePortfolioAPI = reasonErrorApi.messageId;
      mockReceive("Unit Test", reasonErrorApi);
      instance.ImagePickerModal()
      jest.spyOn(instance, 'openCamera');
    jest.spyOn(instance, 'openGallery');
    jest.spyOn(instance, 'closeDetailsPickerModal');

    instance.setState({ detailsMediaModal: true })
    PhotoLibraryEditPortfolio.find({ testID: 'OpenGallery' }).props().onPress();
    expect(instance.openGallery).toHaveBeenCalled();
    })
  });
});
