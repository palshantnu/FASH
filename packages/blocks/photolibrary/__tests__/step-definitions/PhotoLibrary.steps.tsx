import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import PhotoLibrary from "../../src/PhotoLibrary";
import { Alert } from "react-native";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback: any) => {
      callback();
    }),
  },
  id: "PhotoLibrary"
};

const feature = loadFeature(
  "./__tests__/features/PhotoLibrary-scenario.feature"
);

jest.mock("../../../../framework/src/StorageProvider", () => ({
  get: jest.fn().mockImplementation(() => Promise.resolve([]))
}));

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
  });

  test("User navigates to PhotoLibrary", ({ given, when, then }) => {
    let photoLibrary: ShallowWrapper;
    let instance: PhotoLibrary;

    given("I am a User loading PhotoLibrary", () => {
      photoLibrary = shallow(<PhotoLibrary {...screenProps} />);
    });

    when("User navigate to the PhotoLibrary", () => {
      instance = photoLibrary.instance() as PhotoLibrary;

      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(
        getName(MessageEnum.SessionResponseToken),
        'token-string'
      );
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", tokenMsg);
    });

    when("Api call for getting error of portfolio", () => {
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
          data: []
        }
      );
      instance.setState({
        portfolio: [{
          uri: "string",
          name: "string",
          type: "string",
          description: "string"
        }]
      })
      instance.apiGetPortfolio = reasonErrorApi.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", reasonErrorApi);
    })

    when("Api call for getting data of portfolio", () => {
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
          "data": [
            {
              "id": "44",
              "type": "portfolio",
              "attributes": {
                "images": [
                  {
                    "portfolio_image_id": 93,
                    "description": "Description for image 1",
                    "image_id": 4081,
                    "url": "image.png"
                  },
                  {
                    "portfolio_image_id": 92,
                    "description": "C Sykmbcfdedaaaa",
                    "image_id": 4080,
                    "url": "image.png"
                  },
                ]
              }
            }
          ]
        }
      );
      instance.apiGetPortfolio = reasonErrorApi.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", reasonErrorApi);
    })

    then("List view data", () => {
      const mockFunction = jest.spyOn(instance, "onEditImageClick")
      let reviewFlatList = photoLibrary.findWhere(
        (node) => node.prop('testID') === 'renderEditImage'
      );
      const listItem = shallow(
        reviewFlatList.props().renderItem({
          item: {
            url: "images.png",
          }
        })
      )
      let listView = listItem.findWhere((node) => node.prop("testID") === "onEditImagePress");
      listView.simulate("press");
      expect(mockFunction).toHaveBeenCalled();
      instance.getPortfolioDetails()
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
          "data": [
            {
              "id": "44",
              "type": "portfolio",
              "attributes": {
                "images": [
                  {
                    "portfolio_image_id": 93,
                    "description": "Description for image 1",
                    "image_id": 4081,
                    "url": "image.png"
                  },
                  {
                    "portfolio_image_id": 92,
                    "description": "C Sykmbcfdedaaaa",
                    "image_id": 4080,
                    "url": "image.png"
                  },
                ]
              }
            }
          ]
        }
      );
      instance.apiGetPortfolio = reasonErrorApi.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", reasonErrorApi);
    })

    then("User can edit portfolio", () => {
      const mockShiftEditPortfolio = jest.spyOn(
        instance,
        "shiftEditPortfolio"
      );
      const shiftEditPortfolio = photoLibrary.findWhere(
        (node) => node.prop("testID") === "EditPortfolio"
      );
      shiftEditPortfolio.simulate("press");
      expect(mockShiftEditPortfolio).toHaveBeenCalled();
    })

    then("User can change checked values", () => {
      const mockCheckBoxValueChange = jest.spyOn(
        instance,
        "checkBoxValueChange"
      );
      const checkBoxValueChange = photoLibrary.findWhere(
        (node) => node.prop("testID") === "CheckBoxValues"
      );
      checkBoxValueChange.simulate("valueChange");
      expect(mockCheckBoxValueChange).toHaveBeenCalled();
      instance.setState({isChecked:false})
    })

    then("User can upload portfolio", () => {
      const mockShiftUploadPortfolio = jest.spyOn(
        instance,
        "shiftUploadPortfolio"
      );
      const shiftUploadPortfolio = photoLibrary.findWhere(
        (node) => node.prop("testID") === "UploadPortfolio"
      );
      shiftUploadPortfolio.simulate("press");
      expect(mockShiftUploadPortfolio).toHaveBeenCalled();
    })

    then("I can enter a description for portfolio image with out errors", () => {
      let reasonTextInput = photoLibrary.findWhere(
        (node) => node.prop("testID") === "txt_enter_description"
      );
      reasonTextInput.simulate("changeText", "Dummy reason to cancel");
      let simulatedReasonTextInput = photoLibrary.findWhere(
        (node) => node.prop("testID") === "txt_enter_description"
      );
      expect(simulatedReasonTextInput.prop("value")).toBe("Dummy reason to cancel");
    });

    then("User can close modal", () => {
      const mockClosePickerModal = jest.spyOn(
        instance,
        "closePickerModal"
      );
      const closePickerModal = photoLibrary.findWhere(
        (node) => node.prop("testID") === "CloseModal"
      );
      closePickerModal.simulate("press");
      expect(mockClosePickerModal).toHaveBeenCalled();
    })

    then("User can upload media for single portfolio", () => {
      const mockedHideKeyboard = jest.spyOn(instance, "mediaUploadPortfolio");
      let outerClick = photoLibrary.findWhere((node) => node.prop("testID") === "MediaUploadPortfolio");
      outerClick.simulate("press");
      expect(mockedHideKeyboard).toHaveBeenCalled();
    })

    then("User can choose photos from gallery", () => {
      let CapturePhoto = photoLibrary.findWhere((node) => node.prop("testID") === "CapturePhoto");
      CapturePhoto.simulate("press");

      let backBtnClick = photoLibrary.findWhere((node) => node.prop("leftTestId") === "backBtn");
      backBtnClick.props().onLeftPress();

      const choosePhotoPortfolio = jest.spyOn(instance, "choosePhoto");
      let choosePhoto = photoLibrary.findWhere((node) => node.prop("testID") === "ChoosePhoto");
      choosePhoto.simulate("press");
      expect(choosePhotoPortfolio).toHaveBeenCalled();

      const openMultiModal = jest.spyOn(instance, "openMultiModal");
      let openMultiPhotos = photoLibrary.findWhere((node) => node.prop("testID") === "uploadMultiplePhotos");
      openMultiPhotos.simulate("press");
      expect(openMultiModal).toHaveBeenCalled();

      let uploadPortfolioApi = photoLibrary.findWhere((node) => node.prop("testID") === "UploadPortfolioApi");
      uploadPortfolioApi.simulate("press");

      instance.setState({
        portfolio: [], profilePhoto: {
          uri: "string",
          name: "string",
          type: "string",
        }
      })
      uploadPortfolioApi.simulate("press");
      instance.setState({
        portfolio: [], profilePhoto: {
          uri: "",
          name: "",
          type: "",
        }
      })

      uploadPortfolioApi.simulate("press");
      CapturePhoto.simulate("press");
      choosePhoto.simulate("press");
    })

    then("User can show data for portfolio", () => {
      let commoditiesFlatList = photoLibrary.findWhere((node) => node.prop('testID') === 'portfolioFlatlist')
      commoditiesFlatList.props().keyExtractor("image-name-0")
      commoditiesFlatList.at(0).prop('renderItem')({
        item: {
          uri: "image.png",
          name: "name",
          type: "type",
          description: "description",
        }, index: 0
      })
      let itemWrapper = shallow(commoditiesFlatList.at(0).prop('renderItem')({
        item: {
          uri: "image.png",
          name: "name",
          type: "type",
          description: "description",
        }, index: 0
      }))
      let dotMenuButton = itemWrapper.findWhere((node) => node.prop('testID') === 'deleteButton0');
      dotMenuButton.simulate('press')

      let uploadMultipleDesc = itemWrapper.findWhere((node) => node.prop('testID') === 'port-desc-0');
      uploadMultipleDesc.simulate('changeText', 'Upload multiple description')

      let deletePort = photoLibrary.findWhere((node) => node.prop("testID") === "deletePortfolio");
      deletePort.simulate("press");

    })

    then("User can shift to edit screen", () => {
      const shiftEditScreen = jest.spyOn(instance, "shiftEditPortfolio");
      let shiftEdit = photoLibrary.findWhere((node) => node.prop("testID") === "EditPortfolio");
      shiftEdit.simulate("press");
      expect(shiftEditScreen).toHaveBeenCalled();
    })

    then("User can delete photos from portfolio screen", () => {
      const deletePhotoPortfolio = jest.spyOn(instance, "deleteAllEditPortfolio");
      let deletePhoto = photoLibrary.findWhere((node) => node.prop("testID") === "DeleteAllEditPortfolio");
      deletePhoto.simulate("press");
      expect(deletePhotoPortfolio).toHaveBeenCalled();
    })

    when("Api call for deleting data of portfolio", () => {
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
          "message": "All portfolio images have been successfully deleted."
        }
      );
      instance.deleteAllEditPortfolioApicall = reasonErrorApi.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", reasonErrorApi);
    })

    then("Api call for uploding portfolio data", () => {
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
          "data": {
            "id": "44",
            "type": "portfolio",
            "attributes": {
              "images": [
                {
                  "portfolio_image_id": 94,
                  "description": "Description for image 1",
                  "image_id": 4082,
                  "url": "image.png"
                },
                {
                  "portfolio_image_id": 95,
                  "description": "Description for image 1",
                  "image_id": 4083,
                  "url": "image.png"
                },
                {
                  "portfolio_image_id": 96,
                  "description": "Description for image 1",
                  "image_id": 4084,
                  "url": "image.png"
                },
              ]
            }
          }
        }
      );
      const mockAlert = jest.spyOn(Alert, 'alert')
      instance.uploadPortfolioAPICallId = reasonErrorApi.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("Unit Test", reasonErrorApi);
      mockAlert.mock.calls[0][2]![0].onPress!()
      expect(mockAlert).toHaveBeenCalled();
      mockAlert.mockClear()
    })

    then("I can leave the screen with out errors", () => {
      instance.handleError("error");
      instance.handleError(new Error("error"));

      const mockedUnmount = jest.spyOn(
        instance,
        "componentWillUnmount"
      );
      photoLibrary.unmount();
      expect(mockedUnmount).toHaveBeenCalled();
    });
    

  });

  test("User navigates to PhotoLibrary2", ({ given, when, then }) => {
    let photoLibrary: ShallowWrapper;
    let instance: PhotoLibrary;

    given("I am a User loading PhotoLibrary", () => {
      photoLibrary = shallow(<PhotoLibrary {...screenProps} />);
    });

    when("User navigate to the PhotoLibrary", () => {
      instance = photoLibrary.instance() as PhotoLibrary;

      let choosePhoto = photoLibrary.findWhere((node) => node.prop("testID") === "ChoosePhoto");
      choosePhoto.simulate("press");
    })
    then("PhotoLibrary will load without error", () => {
      expect(photoLibrary.exists()).toBe(true);

      const instance = photoLibrary.instance() as PhotoLibrary;
      instance.checkBoxValueChange();
      expect(photoLibrary.state('checked')).toBe(true);

      const item = {
        image_id: 1,
        portfolio_image_id: 'abc123',
      };

      instance.checkBoxItemChange(item);
      expect(photoLibrary.state('deleteID')).toContain('abc123');



      jest.spyOn(instance, 'callAfterOk').mockImplementation(() => {});
      jest.spyOn(Alert, 'alert');
      instance.setState = jest.fn();
      const responseJson = {
        data: {
          attributes: {
            images: ['img1', 'img2'],
          },
        },
      };

      instance.portfolioUploadApi(responseJson);

    expect(instance.setState).toHaveBeenCalledWith({ loading: false });
    expect(Alert.alert).toHaveBeenCalledWith(
      'Success',
      'Your portfolio has been uploaded successfully!',
      [
        {
          text: 'OK',
          onPress: expect.any(Function),
        },
      ]
    );

    const okPress = (Alert.alert as jest.Mock).mock.calls[0][2][0].onPress;
    okPress();
    expect(instance.callAfterOk).toHaveBeenCalled();

    const responseJsons = {
      data: {
        attributes: {
          images: [],
        },
      },
    };

    instance.portfolioUploadApi(responseJsons);

    expect(instance.setState).toHaveBeenCalledWith({ loading: false });
    expect(Alert.alert).toHaveBeenCalledWith(
      'Something went wrong!',
      'Please try again'
    );

    instance.portfolioUploadApi(responseJson);

    expect(instance.setState).toHaveBeenCalledWith({ loading: false });
    expect(Alert.alert).toHaveBeenCalledWith(
      'Something went wrong!',
      'Please try again'
    );

    instance.setState = jest.fn();
    const expectedPhotos = [
      { portfolio_image_id: 1, isSelected: true },
      { portfolio_image_id: 2, isSelected: true },
    ];
    const expectedDeleteIDs = [1, 2];

    expect(instance.setState).toHaveBeenCalledWith({
      checked: true,
      deleteID: expectedDeleteIDs,
      photoData: expectedPhotos,
    });

    instance.checkBoxValueChange();

    const expectedPhotoss = [
      { portfolio_image_id: 1, isSelected: false },
      { portfolio_image_id: 2, isSelected: false },
    ];

    expect(instance.setState).toHaveBeenCalledWith({
      checked: false,
      deleteID: [],
      photoData: expectedPhotoss,
    });

    instance.checkBoxItemChange('')
    instance.isStringNullOrBlank('')
    instance.updateDetailsView()
    let formData: FormData;
    let appendSpy: jest.SpyInstance;
    formData = new FormData();
    appendSpy = jest.spyOn(formData as any, 'append');
    const state = {
      profilePhotoDetails: {
        uri: 'file://photo.jpg',
        name: 'photo.jpg',
        type: 'image/jpeg',
      }
    };

    if (state.profilePhotoDetails.uri) {
      formData.append(
        "images[]",
        state.profilePhotoDetails as unknown as Blob
      );
    }

    expect(appendSpy).toHaveBeenCalledWith(
      "images[]",
      expect.any(Blob)
    );

    if (state.profilePhotoDetails.uri) {
      formData.append(
        "images[]",
        state.profilePhotoDetails as unknown as Blob
      );
    }

    expect(appendSpy).not.toHaveBeenCalled();


    const photoDataMock = [
      {
        image_id: 'img1',
        images: { uri: 'https://example.com/1.jpg' }, // or a mock ImageSourcePropType
        isSelected: false,
        portfolio_image_id: 1,
      },
      {
        image_id: 'img2',
        images: { uri: 'https://example.com/2.jpg' },
        isSelected: false,
        portfolio_image_id: 2,
      },
    ];

    instance.setState({
      isChecked: false,
      checked: false,
      deleteID: [],
      photoData: photoDataMock,
    });

    instance.checkBoxValueChange();

    const updatedState = instance.state;

    expect(updatedState.isChecked).toBe(true);
    expect(updatedState.checked).toBe(true);
    expect(updatedState.photoData.every(item => item.isSelected)).toBe(true);
    expect(updatedState.deleteID).toEqual(['1', '2']);

    instance.checkBoxValueChange();

    expect(updatedState.isChecked).toBe(false);
    expect(updatedState.photoData.every(item => !item.isSelected)).toBe(true);
    expect(updatedState.deleteID).toEqual([]);
    expect(updatedState.checked).toBe(false);

    const photoDataMocks = [
      { image_id: 'img1', images: {}, isSelected: false, portfolio_image_id: 1 },
      { image_id: 'img2', images: {}, isSelected: false, portfolio_image_id: 2 },
    ];
  
    instance.setState({ photoData: photoDataMocks });
  
    const clickedItem = { image_id: 'img1', portfolio_image_id: 1 };
  
    instance.checkBoxItemChange(clickedItem);
  
    const updatedPhotoData = instance.state.photoData;
    const updatedDeleteID = instance.state.deleteID;
    const isChecked = instance.state.isChecked;
  
    expect(updatedPhotoData[0].isSelected).toBe(true);
    expect(updatedDeleteID).toContain(1);
    expect(isChecked).toBe(false);
    })
  })
});
