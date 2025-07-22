import { defineFeature, loadFeature } from 'jest-cucumber';
import { shallow, ShallowWrapper } from 'enzyme';

import * as helpers from '../../../../framework/src/Helpers';
import { runEngine } from '../../../../framework/src/RunEngine';
import { Message } from '../../../../framework/src/Message';
import * as storageData from "../../../../framework/src/Utilities";
import { Linking, Modal, Platform } from 'react-native';

import MessageEnum, {
  getName,
} from '../../../../framework/src/Messages/MessageEnum';
import React from 'react';
import Chat from '../../src/Chat'
jest.useFakeTimers();
const screenProps = {
  navigation: {
    goBack: jest.fn(),
    navigate: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback: any) => {
      callback();
    }),
    state: {
      params: {
        id: 90,
      },
    },
  },
  id: 'Chat',
};

let DummyResponse1 = {
  "data": {
    "attributes": {
      "accounts_chats": [
        {
          "attributes": {
            "account_name": "John Doe",
            "account_phone": "1234567890",
            "role": "sender",
            "account_id": 101
          }
        },
        {
          "attributes": {
            "account_name": "Jane Smith",
            "account_phone": "0987654321",
            "role": "receiver",
            "account_id": 202
          }
        }
      ],
      "messages": [
        {
          "id": 1,
          "content": "Hello!",
          "timestamp": "2024-01-01T12:00:00Z"
        }
      ],
      "wishlist": {
        "id": 55
      }
    }
  },
  "current_user_role": "admin"
}

let DummyResponse2 = {
  "data": {
    "attributes": {
      "accounts_chats": [
        {
          "attributes": {
            "account_name": "Alice",
            "account_phone": "5555555555",
            "role": "sender",
            "account_id": 303
          }
        },
        {
          "attributes": {
            "account_name": "Bob",
            "account_phone": "4444444444",
            "role": "receiver",
            "account_id": 404
          }
        }
      ],
      "messages": [],
      "wishlist": {
        "id": 77
      }
    }
  },
  "current_user_role": "user"
}

let DummyResponse3 = {
  "message": "Something went wrong"
}

let DummyResponse4 = {
  "data": {
    "attributes": {
      "accounts_chats": [],
      "messages": [
        {
          "id": 2,
          "content": "Hi there!",
          "timestamp": "2024-01-02T13:00:00Z"
        }
      ],
      "wishlist": {
        "id": 99
      }
    }
  },
  "current_user_role": "guest"
}

let DummyResponse5 = {
  "data": {
    "attributes": {
      "accounts_chats": [
        {
          "attributes": {
            "account_name": "Tom",
            "account_phone": "3333333333",
            "role": "sender",
            "account_id": 505
          }
        },
        {
          "attributes": {
            "account_name": "Jerry",
            "account_phone": "2222222222",
            "role": "receiver",
            "account_id": 606
          }
        }
      ]
    }
  },
  "current_user_role": "member"
}



const mockFunction = (
  instance: any,
  functionName: string,
  data?: any,
  data1?: any
) => {
  // Check if the function exists on the object
  if (typeof instance[functionName] === 'function') {
    // Call the function on the object with the provided
    if (data1) {
      instance[functionName](data,data1);
    } else {
      instance[functionName](data);
    }
  } else {
    console.error(
      `Function ${functionName} does not exist on the provided object`
    );
  }
};

const feature = loadFeature("./__tests__/features/chat-scenario.feature");
const mockgetStorageData = jest.spyOn(storageData, "getStorageData");

global.FormData = require('react-native/Libraries/Network/FormData');
jest.mock('react-native-image-crop-picker', () => {
  return {
    openPicker: jest.fn().mockResolvedValue([{
      cropRect: { height: 1279, width: 960, x: 0, y: 0 },
      height: 1280,
      mime: "image/jpeg",
      modificationDate: "1678976186000",
      path:
        "image.url",
      size: 114368,
      width: 960,
    }]),
    openCamera: jest.fn(() => Promise.resolve('string')),
  };
});

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'iOS' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'iOS');
  });

  test('User navigates to Chat', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;

    let instance: Chat;

    given('I am a User loading Chat', () => {
      mockgetStorageData.mockImplementation(() =>
        Promise.resolve(`"renter"`)
      );
      exampleBlockA = shallow(<Chat {...(screenProps as any)} />);
    });

    when('I navigate to the Chat', async () => {
      instance = exampleBlockA.instance() as Chat;

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
        order_management_order_id: 0,
        userID: 1,
        chatId: 1,
      });

      runEngine.sendMessage("Unit Test", getpostlistRefresh);
      let ReportPersonFn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "ReportPersonFn"
      )
      ReportPersonFn.simulate("press")

      let BlockModalOpen = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "BlockModalOpen"
      )
      BlockModalOpen.simulate("press")

    });

    then('Chat will load with out errors', async () => {
      let mockFunction = jest.spyOn(instance, "settingData")
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
          "data": {
            "id": "13",
            "type": "chat",
            "attributes": {
              "id": 13,
              "name": "order chat!!!!!",
              "accounts_chats": [
                {
                  "id": "14",
                  "type": "accounts_chats",
                  "attributes": {
                    "account_id": 1082,
                    "muted": false,
                    "role": "sender",
                    "account_name": "Test Test",
                    "account_role": "buyer",
                    "account_phone": "918989565621"
                  }
                },
                {
                  "id": "15",
                  "type": "accounts_chats",
                  "attributes": {
                    "account_id": 1082,
                    "muted": false,
                    "account_name" : "Test Test",
                    "role": "receiver",
                    "account_role": "buyer",
                    "account_phone": "918989565621"
                  }
                }
              ],
              "messages": [
                {
                  "id": "766",
                  "type": "chat_message",
                  "attributes": {
                    "id": 765,
                    "account_id": 1082,
                    "chat_id": 329,
                    "created_at": "2025-01-21T05:44:43.570Z",
                    "updated_at": "2025-01-21T05:44:45.323Z",
                    "is_mark_read": true,
                    "message": [
                      {
                        "id": 7522,
                        "message": "World",
                        "url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--971fd09535d54e34c37801928887369d6f1726f0/Screenshot_2025-01-20-16-00-22-93_84eb1af3a729e5d540b6b78073938574.jpg"
                      }
                    ],
                    "role": "sender"
                  }
                },
                {
                  "id": "11",
                  "type": "chat_message",
                  "attributes": {
                    "id": 11,
                    "message": "helloddddQQQQ",
                    "account_id": 1082,
                    "chat_id": 13,
                    "created_at": "2024-08-09T11:37:53.904Z",
                    "updated_at": "2024-08-09T11:39:19.688Z",
                    "is_mark_read": true,
                    "attachments": null,
                    "role": "sender"
                  }
                },
                {
                  "id": "11",
                  "type": "chat_message",
                  "attributes": {
                    "id": 11,
                    "message": {
                      "wishlist_id": 58,
                      "wishlist_name": "Tsits",
                      "catalogues": [
                        {
                          "catalogue_id": 395,
                          "catalogue_name": "Na123",
                          "images": [
                            "dummy.jpg"
                          ]
                        },
                      ]
                    },
                    "account_id": 1082,
                    "chat_id": 13,
                    "created_at": "2024-08-09T11:37:53.904Z",
                    "updated_at": "2024-08-09T11:39:19.688Z",
                    "is_mark_read": true,
                    "attachments": null,
                    "role": "sender"
                  }
                },
                {
                  "id": "11",
                  "type": "chat_message",
                  "attributes": {
                    "id": 11,
                    "message": {
                      "order_request_id": 1,
                      "product_name": "H&M T shirt",
                      "gender": "male",
                      "size": "M",
                      "color": "blue",
                      "product_quantity": 2,
                      "price_per_unit": "200.0",
                      "shipping_cost": "50.0",
                      "product_display_image_url": null
                    },
                    "account_id": 1082,
                    "chat_id": 13,
                    "created_at": "2024-08-09T11:37:53.904Z",
                    "updated_at": "2024-08-09T11:39:19.688Z",
                    "is_mark_read": true,
                    "attachments": null,
                    "role": "sender"
                  }
                },
                {
                  "id": "766",
                  "type": "chat_message",
                  "attributes": {
                    "id": 766,
                    "account_id": 1082,
                    "chat_id": 329,
                    "created_at": "2025-01-21T05:44:43.570Z",
                    "updated_at": "2025-01-21T05:44:45.323Z",
                    "is_mark_read": true,
                    "message": [
                      {
                        "id": 7522,
                        "message" : "Hello",
                        "url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--971fd09535d54e34c37801928887369d6f1726f0/Screenshot_2025-01-20-16-00-22-93_84eb1af3a729e5d540b6b78073938574.jpg"
                      }
                    ],
                    "role": "sender"
                  }
                },
                {
                  "id": "302",
                  "type": "chat_message",
                  "attributes": {
                    "id": 302,
                    "account_id": 1177,
                    "chat_id": 164,
                    "created_at": "2024-10-14T11:13:32.009Z",
                    "updated_at": "2024-10-14T11:14:29.200Z",
                    "is_mark_read": true,
                    "message": {
                      "data": {
                        "id": "20",
                        "type": "stylist_payment_request",
                        "attributes": {
                          "id": 20,
                          "account_id": 1177,
                          "stylist_id": 1177,
                          "amount": "100.0",
                          "reason": "test",
                          "status": "pending",
                          "created_at": "2024-10-14T11:13:32.045Z",
                          "updated_at": "2024-10-14T11:13:32.045Z",
                          "chat_message_id": 302,
                          "chat_message": "stylist ask for money 100 to stylist"
                        }
                      }
                    },
                    "role": "sender"
                  }
                }
              ]
            },
            "relationships": {
              "accounts": {
                "data": [
                  {
                    "id": "1082",
                    "type": "account"
                  }
                ]
              }
            }
          },
          current_user_role: "stylist"
        }
      );
      instance.getChatListApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)

      let getChatlist = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "getChatlist"
      );

      getChatlist.props().renderItem({
        item: {
          "id": "11",
          "type": "chat_message",
          "attributes": {
            "id": 11,
            "message": "helloddddQQQQ",
            "account_id": 1082,
            "chat_id": 13,
            "created_at": "2024-08-09T11:37:53.904Z",
            "updated_at": "2024-08-09T11:39:19.688Z",
            "is_mark_read": true,
            "attachments": null,
          }
        },
        index: 0
      }
      )

      let renderWishlist = getChatlist.renderProp("renderItem")({
        item: {
          "id": "11",
          "type": "chat_message",
          "attributes": {
            "id": 11,
            "message": {
              "wishlist_id": 58,
              "wishlist_name": "Tsits",
              "catalogues": [
                {
                  "catalogue_id": 395,
                  "catalogue_name": "Na123",
                  "images": [
                    "dummy.jpg"
                  ]
                },
              ]
            },
            "account_id": 1082,
            "chat_id": 13,
            "created_at": "2024-08-09T11:37:53.904Z",
            "updated_at": "2024-08-09T11:39:19.688Z",
            "is_mark_read": true,
            "attachments": null,
            "role": "sender"
          }
        },
        index: 0
      }
      )

      let flatlistWrapper = getChatlist.renderProp("renderItem")({
        item: {
          "id": "11",
          "type": "chat_message",
          "attributes": {
            "id": 11,
            "message": {
              "order_request_id": 1,
              "product_name": "H&M T shirt",
              "gender": "male",
              "size": "M",
              "color": "blue",
              "product_quantity": 2,
              "price_per_unit": "200.0",
              "shipping_cost": "50.0",
              "product_display_image_url": null
            },
            "account_id": 1082,
            "chat_id": 13,
            "created_at": "2024-08-09T11:37:53.904Z",
            "updated_at": "2024-08-09T11:39:19.688Z",
            "is_mark_read": true,
            "attachments": null,
            "role": "sender"
          }
        }, index: 0
      })

      let payment = getChatlist.renderProp("renderItem")({
        item: {
          "id": "11",
          "type": "chat_message",
          "attributes": {
            "id": 303,
            "account_id": 1177,
            "chat_id": 164,
            "created_at": "2024-10-14T11:13:51.493Z",
            "updated_at": "2024-10-14T11:14:29.274Z",
            "is_mark_read": true,
            "message": {
              "data": {
                "id": "21",
                "type": "stylist_payment_request",
                "attributes": {
                  "id": 21,
                  "account_id": 1177,
                  "stylist_id": 1177,
                  "amount": "12340987.0",
                  "reason": "Jay",
                  "status": "pending",
                  "created_at": "2024-10-14T11:13:51.527Z",
                  "updated_at": "2024-10-14T11:13:51.527Z",
                  "chat_message_id": 303,
                  "chat_message": "stylist ask for money 12340987 to stylist"
                }
              }
            },
            "role": "sender"
          }
        },
        index: 0
      }
      )

      let acceptOrder = flatlistWrapper.findWhere(
        (node) => node.prop("testID") === "acceptOrder"
      )
      acceptOrder.simulate("press")


      let makePayment = payment.findWhere(
        (node) => node.prop("testID") === "makePayment"
      )
      makePayment.simulate("press")

      let navigateToWishlist = renderWishlist.findWhere(
        (node) => node.prop("testID") === "navigateWishlist"
      )
      navigateToWishlist.simulate("press")

      msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        null
      );
      instance.getChatListApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceiveError } = instance;
      mockReceiveError("unit test", msgValidationAPI)

      let ReportPersonFn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "ReportPersonFn"
      )
      ReportPersonFn.simulate("press")

      let sendMessage = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "sendMessage2"
      )
      sendMessage.simulate("press")

      let BlockModalOpen = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "BlockModalOpen"
      )
      BlockModalOpen.simulate("press")

      let paymentModule = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "paymentRequest"
      )
      paymentModule.simulate("press")

      let sendOrderRequest = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "sendOrderRequest"
      )
      sendOrderRequest.simulate("press")
    });

    then("User can type the message successfully", () => {
      const mockFunction = jest.spyOn(instance, "renderInputMessage")
      let typeMessage = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "typeMessage"
      );
      typeMessage.props().onChangeText("text")
      expect(mockFunction).toHaveBeenCalled()
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "message": "Chat has been successfully blocked."
        }
      );
      instance.blockChatApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
    })

    then("User can send message successfully", () => {
      const mockFunction = jest.spyOn(instance, "sendMessage")
      let sendMessage = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "sendMessage"
      );
      const {setState: mocksetState} = exampleBlockA
      mocksetState.call(exampleBlockA, {wishlistId: "ABC"})
      sendMessage.simulate('press')

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
          "data": {
            "id": "17",
            "type": "chat_message",
            "attributes": {
              "id": 17,
              "message": "LLKKKKDOKFDJNgdfgdfg",
              "account_id": 1118,
              "chat_id": 13,
              "created_at": "2024-08-09T12:47:26.444Z",
              "updated_at": "2024-08-09T12:47:26.444Z",
              "is_mark_read": false,
              "attachments": null,
              "role": "sender"
            }
          }
        }
      );
      instance.sendMessage(true)
      instance.renderChatComponent(true)

      instance.sendChatMessageApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)

      expect(mockFunction).toHaveBeenCalled()
    })

    then("User can send message with attachments successfully", () => {
      const mockFunction = jest.spyOn(instance, "sendMessage")
      let attachFile = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "openDocumentPicker"
      );
      attachFile.simulate('press')

      let docPickerModel = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "documentPickerModal"
      )
      expect(docPickerModel.props().visible).toBeTruthy()
      
      let buttonComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btn_camera"
      );
      buttonComponent.simulate("press");
      expect(instance.setState({documentFile:'url'})).toBeTruthy()
      
      let buttonComponentGallery = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btn_gallery"
      );

      buttonComponentGallery.simulate("press");

      let ButtonComponentCancle = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "btn_cancelMedia"
      )

      ButtonComponentCancle.simulate("press")

      let typeMessage = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "typeMessage"
      );
      typeMessage.props().onChangeText("Text")

      let sendMessage = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "sendMessage"
      );

      instance.renderInputMessage("  ")
      instance.renderInputMessage("")
      instance.renderInputMessage("Hello")
      
      
      const {setState: mocksetState} = exampleBlockA
      mocksetState.call(exampleBlockA, {wishlistId: "ABC", chatScreenMessage : "Text"})
      sendMessage.simulate('press')

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
          "data": {
            "id": "17",
            "type": "chat_message",
            "attributes": {
              "id": 17,
              "message": "LLKKKKDOKFDJNgdfgdfg",
              "account_id": 1118,
              "chat_id": 13,
              "created_at": "2024-08-09T12:47:26.444Z",
              "updated_at": "2024-08-09T12:47:26.444Z",
              "is_mark_read": false,
              "attachments": null,
              "role": "sender"
            }
          }
        }
      );
      instance.sendChatMessageApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)

      expect(mockFunction).toHaveBeenCalled()
    })

    then("User can open modal successfully", () => {
      const MockFunction = jest.spyOn(instance, "moreModalOpen")
      let moreModalOpen = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "MoreModalOpen"
      )
      moreModalOpen.simulate("press")

      let ReportPersonFn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "ReportPersonFn"
      )
      ReportPersonFn.simulate("press")

      let BlockModalOpen = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "BlockModalOpen"
      )
      BlockModalOpen.simulate("press")

      let modalContainer = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "ModalContainer"
      )
      modalContainer.simulate("press")
      let makeCall = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "MakeCall"
      )
      makeCall.simulate("press")
      jest.spyOn(helpers, 'getOS').mockImplementation(() => 'android');

      jest.spyOn(Linking, "canOpenURL").mockImplementation(() => {
        return Promise.reject("error")
      })
      makeCall.simulate("press")

      let CloseBlockModal = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "CloseBlockModal"
      )
      CloseBlockModal.simulate("press")

      let BlockApiCall = exampleBlockA.findWhere((node) => node.prop('testID') === 'BlockApiCall');
      BlockApiCall.simulate('press')

      let PreviousScreen = exampleBlockA.findWhere((node) => node.prop('testID') === 'PreviousScreen');
      PreviousScreen.simulate('press')

      expect(MockFunction).toHaveBeenCalled()
    })

    then("User can block person", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "message": "Chat has been successfully blocked."
        }
      );
      instance.blockChatApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
      instance.CameraDocOpen()
      


      const mockFunction = jest.spyOn(instance, "renderInputMessage")
      let typeMessage = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "typeMessage"
      );
      typeMessage.props().onChangeText("text")
      expect(mockFunction).toHaveBeenCalled()
      const msgValidationAPIs = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPIs.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPIs.messageId
      );
      msgValidationAPIs.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "message": "Chat has been successfully blocked."
        }
      );
      instance.blockChatApiCallId = msgValidationAPIs.messageId;
      const { receive: mockReceives } = instance;
      mockReceives("unit test", msgValidationAPI)

    })

    then("User can block person error message", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "errors": [
            {
              "token": "Invalid token"
            }
          ]
        }
      );
      instance.blockChatApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
      instance.setState({isBlock: false})
    })

    then("User can make payment", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "id": "chg_TS02A4320241442Tr430811777",
          "object": "charge",
          "live_mode": false,
          "customer_initiated": true,
          "api_version": "V2",
          "method": "CREATE",
          "status": "INITIATED",
          "amount": 100,
          "currency": "KWD",
          "threeDSecure": true,
          "card_threeDSecure": false,
          "save_card": true,
          "product": "GOSELL",
          "metadata": {
            "order_id": "26",
            "account_id": "1200"
          },
          "order": {},
          "transaction": {
            "timezone": "UTC+03:00",
            "created": "1731076963777",
            "url": "url",
            "expiry": {
              "period": 30,
              "type": "MINUTE"
            },
            "asynchronous": false,
            "amount": 100.000,
            "currency": "KWD"
          },
          "response": {
            "code": "100",
            "message": "Initiated"
          },
          "receipt": {
            "email": true,
            "sms": true
          },
          "customer": {
            "first_name": "chandni",
            "email": "buyer34new@yopmail.com"
          },
          "merchant": {
            "country": "KW",
            "currency": "KWD",
            "id": "30476196"
          },
          "source": {
            "object": "source",
            "id": "src_all",
            "on_file": false
          },
          "redirect": {
            "status": "PENDING",
            "url": "/admin"
          },
          "post": {
            "status": "PENDING",
            "url": "url"
          },
          "activities": [
            {
              "id": "activity_TS04A4520241442Lj6h0811993",
              "object": "activity",
              "created": 1731076963777,
              "status": "INITIATED",
              "currency": "KWD",
              "amount": 100.000,
              "remarks": "charge - created",
              "txn_id": "chg_TS02A4320241442Tr430811777"
            }
          ],
          "auto_reversed": false
        }
      );
      instance.makePaymentApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
    })

    then("User can create chat", () => {
      const msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": {
            "id": "43",
            "type": "chat",
            "attributes": {
              "id": 43,
              "name": "",
              "accounts_chats": [
                {
                  "id": "766",
                  "type": "chat_message",
                  "attributes": {
                    "id": 765,
                    "account_id": 1082,
                    "chat_id": 329,
                    "created_at": "2025-01-21T05:44:43.570Z",
                    "updated_at": "2025-01-21T05:44:45.323Z",
                    "is_mark_read": true,
                    "message": [
                      {
                        "id": 7522,
                        "message": "World",
                        "url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--971fd09535d54e34c37801928887369d6f1726f0/Screenshot_2025-01-20-16-00-22-93_84eb1af3a729e5d540b6b78073938574.jpg"
                      }
                    ],
                    "role": "sender"
                  }
                },
                {
                  "id": "766",
                  "type": "chat_message",
                  "attributes": {
                    "id": 769,
                    "account_id": 1082,
                    "account_name": "Test Test",
                    "chat_id": 329,
                    "created_at": "2025-01-21T05:44:43.570Z",
                    "updated_at": "2025-01-21T05:44:45.323Z",
                    "is_mark_read": true,
                    "message": [
                      {
                        "id": 7522,
                        "message": "World",
                        "url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--971fd09535d54e34c37801928887369d6f1726f0/Screenshot_2025-01-20-16-00-22-93_84eb1af3a729e5d540b6b78073938574.jpg"
                      }
                    ],
                    "role": "receiver"

                  }
                },
                {
                  "id": "50",
                  "type": "accounts_chats",
                  "attributes": {
                    "account_id": 1082,
                    "muted": false,
                    "role": "unknown",
                    "account_role": "buyer"
                  }
                },
                {
                  "id": "51",
                  "type": "accounts_chats",
                  "attributes": {
                    "account_id": 1189,
                    "muted": false,
                    "role": "unknown",
                    "account_role": "driver"
                  }
                }
              ],
              "messages": []
            },
            "relationships": {
              "accounts": {
                "data": [
                  {
                    "id": "1082",
                    "type": "account"
                  },
                  {
                    "id": "1189",
                    "type": "account"
                  }
                ]
              }
            }
          }
        }
      );
      instance.createChatRoomApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)

      const msgValidationAPI2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI2.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI2.messageId
      );
      msgValidationAPI2.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": {
            "id": "43",
            "type": "chat",
            "attributes": {
              "id": 43,
              "name": "",
              "accounts_chats": [
                {
                  "id": "766",
                  "type": "chat_message",
                  "attributes": {
                    "id": 765,
                    "account_id": 1082,
                    "chat_id": 329,
                    "created_at": "2025-01-21T05:44:43.570Z",
                    "updated_at": "2025-01-21T05:44:45.323Z",
                    "is_mark_read": true,
                    "message": [
                      {
                        "id": 7522,
                        "message": "World",
                        "url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--971fd09535d54e34c37801928887369d6f1726f0/Screenshot_2025-01-20-16-00-22-93_84eb1af3a729e5d540b6b78073938574.jpg"
                      }
                    ],
                    "role": "sender"
                  }
                },
                {
                  "id": "50",
                  "type": "accounts_chats",
                  "attributes": {
                    "account_id": 1082,
                    "muted": false,
                    "role": "unknown",
                    "account_role": "buyer"
                  }
                },
                {
                  "id": "51",
                  "type": "accounts_chats",
                  "attributes": {
                    "account_id": 1189,
                    "muted": false,
                    "role": "unknown",
                    "account_role": "driver"
                  }
                }
              ],
              "messages": []
            },
            "relationships": {
              "accounts": {
                "data": [
                  {
                    "id": "1082",
                    "type": "account"
                  },
                  {
                    "id": "1189",
                    "type": "account"
                  }
                ]
              }
            }
          }
        }
      );
      instance.createChatRoomApiCallId = msgValidationAPI2.messageId;
      const { receive: mockReceive2 } = instance;
      mockReceive2("unit test", msgValidationAPI2)

      const msgValidationAPI9 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI9.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI9.messageId
      );
      msgValidationAPI9.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),{
          "message": "Order request accepted successfully",
          "order": {
              "data": {
                  "id": "97",
                  "type": "order_request",
                  "attributes": {
                      "product_name": "Anurag bhai",
                      "product_desc": "Flower Print",
                      "status": "in_cart",
                      "gender": "male",
                      "size": "XL",
                      "color": "Olive green",
                      "quantity": 1,
                      "product_quantity": 6,
                      "accept_through": null,
                      "accept_time": null,
                      "primary_display_image": null,
                      "primary_image": null,
                      "price_per_unit": "60.0",
                      "shipping_cost": "50.0",
                      "total_amount": "410.0",
                      "sku": null,
                      "product_sourcing_request_id": null,
                      "stylist": "Anuraggg Rai",
                      "buyer": "Test Test",
                      "estimated_arrival_time": "2025-01-29T20:16:51.446Z",
                      "payment_method": null,
                      "shipping_address": [
                          {
                              "id": 553,
                              "country": null,
                              "latitude": 29.3413899,
                              "longitude": 47.9935975,
                              "address_name": "ba1",
                              "addressble_id": 1082,
                              "addressble_type": "AccountBlock::Account",
                              "address_type": null,
                              "created_at": "2025-01-24T06:42:18.817Z",
                              "updated_at": "2025-01-27T10:00:14.935Z",
                              "first_name": null,
                              "last_name": null,
                              "number": null,
                              "street": "8XRV+86W, Kuwait",
                              "zipcode": "452001",
                              "area": "Nuzha",
                              "block": "3",
                              "city": "Kuwait",
                              "house_or_building_number": "204",
                              "floor": null,
                              "apartment_number": null,
                              "name": "Jahin",
                              "contact_number": "+96523245875",
                              "is_default": true,
                              "country_code": "+965",
                              "phone_number": "23245875"
                          }
                      ]
                  }
              }
          }
      }
      );
      instance.acceptOrderRequestApiCallID = msgValidationAPI9.messageId;
      let { receive: mockReceive9 } = instance;
      mockReceive9("unit test", msgValidationAPI9)

      msgValidationAPI9.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),{
          "error" : "error"
      }
      );
      instance.acceptOrderRequestApiCallID = msgValidationAPI9.messageId;
      let { receive: mockReceive10 } = instance;
      mockReceive10("unit test", msgValidationAPI9)

      const msgValidationAPI3 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI3.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI3.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": {
            "id": "43",
            "type": "chat",
            "attributes": {
              "id": 43,
              "name": "",
              "accounts_chats": [
                {
                  "id": "50",
                  "type": "accounts_chats",
                  "attributes": {
                    "account_id": 1082,
                    "muted": false,
                    "role": "unknown",
                    "account_role": "buyer"
                  }
                },
                {
                  "id": "51",
                  "type": "accounts_chats",
                  "attributes": {
                    "account_id": 1189,
                    "muted": false,
                    "role": "unknown",
                    "account_role": "driver"
                  }
                }
              ],
              "messages": []
            },
            "relationships": {
              "accounts": {
                "data": [
                  {
                    "id": "1082",
                    "type": "account"
                  },
                  {
                    "id": "1189",
                    "type": "account"
                  }
                ]
              }
            }
          }
        }
      );
      instance.createChatRoomApiCallId = msgValidationAPI3.messageId;
      const { receive: mockReceive3 } = instance;
      mockReceive3("unit test", msgValidationAPI3)


      instance.renderChatMessage( {
        "id": "766",
        "type": "chat_message",
        "attributes": {
          "id": 766,
          "account_id": 1082,
          "chat_id": 329,
          "created_at": "2025-01-21T05:44:43.570Z",
          "updated_at": "2025-01-21T05:44:45.323Z",
          "is_mark_read": true,
          "message": [
            {
              "id": 7522,
              "url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--971fd09535d54e34c37801928887369d6f1726f0/Screenshot_2025-01-20-16-00-22-93_84eb1af3a729e5d540b6b78073938574.jpg"
            }
          ],
          "role": "sender"
        }
      })

      instance.renderChatMessage( {
        "id": "766",
        "type": "chat_message",
        "attributes": {
          "id": 766,
          "account_id": 1082,
          "chat_id": 329,
          "created_at": "2025-01-21T05:44:43.570Z",
          "updated_at": "2025-01-21T05:44:45.323Z",
          "is_mark_read": true,
          "message": [
            {
              "id": 7522,
              "url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--971fd09535d54e34c37801928887369d6f1726f0/Screenshot_2025-01-20-16-00-22-93_84eb1af3a729e5d540b6b78073938574.jpg"
            }
          ],
          "role": "reciver"
        }
      })

      instance.updateResponse({
        "id": "766",
        "type": "chat_message",
        "attributes": {
          "id": 766,
          "account_id": 1082,
          "chat_id": 329,
          "created_at": "2025-01-21T05:44:43.570Z",
          "updated_at": "2025-01-21T05:44:45.323Z",
          "is_mark_read": true,
          "message": [
            {
              "id": 7522,
              "url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--971fd09535d54e34c37801928887369d6f1726f0/Screenshot_2025-01-20-16-00-22-93_84eb1af3a729e5d540b6b78073938574.jpg"
            }
          ],
          "role": "sender"
        }
      })

      exampleBlockA.update();

      instance.removeFile()

      instance.setState({
        docIdRes : {
          name : "sender",
          type : "file",
          uri : "http://example.com"
        }
      })

      instance.renderChatMessage(null);

      exampleBlockA.update();

      instance.sendMessage(false)
      instance.renderChatComponent(false)
      mockFunction(instance,'componentWillUnmount')
    })

  });

  test('User navigates to Chat wishlist', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;

    let instance: Chat;

    given('I am a User loading Chat wishlist', () => {
      mockgetStorageData.mockImplementation(() =>
        Promise.resolve(`"renter"`)
      );
      exampleBlockA = shallow(<Chat {...(screenProps as any)} />);
    });

    when('I navigate to the Chat wishlist', async () => {
      instance = exampleBlockA.instance() as Chat;

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
        order_management_order_id: 0,
        userID: 1,
        chatId: 1,
      });

      runEngine.sendMessage("Unit Test", getpostlistRefresh);
      let ReportPersonFn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "ReportPersonFn"
      )
      ReportPersonFn.simulate("press")

      let BlockModalOpen = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "BlockModalOpen"
      )
      BlockModalOpen.simulate("press")

    });

    then('Chat will load with out errors wishlist', async () => {
      let mockFunction = jest.spyOn(instance, "settingData")
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
          "data": {
            "id": "13",
            "type": "chat",
            "attributes": {
              "id": 13,
              "name": "order chat!!!!!",
              "accounts_chats": [
                {
                  "id": "14",
                  "type": "accounts_chats",
                  "attributes": {
                    "account_id": 1082,
                    "muted": false,
                    "role": "sender",
                    "account_role": "buyer",
                    "account_name": "Test Test",
                    "account_phone": "918989565621"
                  }
                },
                {
                  "id": "15",
                  "type": "accounts_chats",
                  "attributes": {
                    "account_id": 1082,
                    "muted": false,
                    "account_name" : "Test Test",
                    "role": "receiver",
                    "account_role": "buyer",
                    "account_phone": "918989565621"
                  }
                }
              ],
              "messages": [
                {
                  "id": "766",
                  "type": "chat_message",
                  "attributes": {
                    "id": 765,
                    "account_id": 1082,
                    "chat_id": 329,
                    "created_at": "2025-01-21T05:44:43.570Z",
                    "updated_at": "2025-01-21T05:44:45.323Z",
                    "is_mark_read": true,
                    "message": [
                      {
                        "id": 7522,
                        "message": "World",
                        "url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--971fd09535d54e34c37801928887369d6f1726f0/Screenshot_2025-01-20-16-00-22-93_84eb1af3a729e5d540b6b78073938574.jpg"
                      }
                    ],
                    "role": "sender"
                  }
                },
                {
                  "id": "11",
                  "type": "chat_message",
                  "attributes": {
                    "id": 11,
                    "message": "helloddddQQQQ",
                    "account_id": 1082,
                    "chat_id": 13,
                    "created_at": "2024-08-09T11:37:53.904Z",
                    "updated_at": "2024-08-09T11:39:19.688Z",
                    "is_mark_read": true,
                    "attachments": null,
                    "role": "sender"
                  }
                },
                {
                  "id": "11",
                  "type": "chat_message",
                  "attributes": {
                    "id": 11,
                    "message": {
                      "wishlist_id": 58,
                      "wishlist_name": "Tsits",
                      "catalogues": [
                        {
                          "catalogue_id": 395,
                          "catalogue_name": "Na123",
                          "images": [
                            "dummy.jpg"
                          ]
                        },
                      ]
                    },
                    "account_id": 1082,
                    "chat_id": 13,
                    "created_at": "2024-08-09T11:37:53.904Z",
                    "updated_at": "2024-08-09T11:39:19.688Z",
                    "is_mark_read": true,
                    "attachments": null,
                    "role": "sender"
                  }
                },
                {
                  "id": "11",
                  "type": "chat_message",
                  "attributes": {
                    "id": 11,
                    "message": {
                      "order_request_id": 1,
                      "product_name": "H&M T shirt",
                      "gender": "male",
                      "size": "M",
                      "color": "blue",
                      "product_quantity": 2,
                      "price_per_unit": "200.0",
                      "shipping_cost": "50.0",
                      "product_display_image_url": null
                    },
                    "account_id": 1082,
                    "chat_id": 13,
                    "created_at": "2024-08-09T11:37:53.904Z",
                    "updated_at": "2024-08-09T11:39:19.688Z",
                    "is_mark_read": true,
                    "attachments": null,
                    "role": "sender"
                  }
                },
                {
                  "id": "766",
                  "type": "chat_message",
                  "attributes": {
                    "id": 766,
                    "account_id": 1082,
                    "chat_id": 329,
                    "created_at": "2025-01-21T05:44:43.570Z",
                    "updated_at": "2025-01-21T05:44:45.323Z",
                    "is_mark_read": true,
                    "message": [
                      {
                        "id": 7522,
                        "message" : "Hello",
                        "url": "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbUVkIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--971fd09535d54e34c37801928887369d6f1726f0/Screenshot_2025-01-20-16-00-22-93_84eb1af3a729e5d540b6b78073938574.jpg"
                      }
                    ],
                    "role": "sender"
                  }
                },
                {
                  "id": "302",
                  "type": "chat_message",
                  "attributes": {
                    "id": 302,
                    "account_id": 1177,
                    "chat_id": 164,
                    "created_at": "2024-10-14T11:13:32.009Z",
                    "updated_at": "2024-10-14T11:14:29.200Z",
                    "is_mark_read": true,
                    "message": {
                      "data": {
                        "id": "20",
                        "type": "stylist_payment_request",
                        "attributes": {
                          "id": 20,
                          "account_id": 1177,
                          "stylist_id": 1177,
                          "amount": "100.0",
                          "reason": "test",
                          "status": "pending",
                          "created_at": "2024-10-14T11:13:32.045Z",
                          "updated_at": "2024-10-14T11:13:32.045Z",
                          "chat_message_id": 302,
                          "chat_message": "stylist ask for money 100 to stylist"
                        }
                      }
                    },
                    "role": "sender"
                  }
                }
              ]
            },
            "relationships": {
              "accounts": {
                "data": [
                  {
                    "id": "1082",
                    "type": "account"
                  }
                ]
              }
            }
          },
          current_user_role: "stylist"
        }
      );
      instance.getChatListApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)

      let getChatlist = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "getChatlist"
      );

      getChatlist.props().renderItem({
        item: {
          "id": "11",
          "type": "chat_message",
          "attributes": {
            "id": 11,
            "message": "helloddddQQQQ",
            "account_id": 1082,
            "chat_id": 13,
            "created_at": "2024-08-09T11:37:53.904Z",
            "updated_at": "2024-08-09T11:39:19.688Z",
            "is_mark_read": true,
            "attachments": null,
          }
        },
        index: 0
      }
      )

      let renderWishlist = getChatlist.renderProp("renderItem")({
        item: {
          "id": "11",
          "type": "chat_message",
          "attributes": {
            "id": 11,
            "message": {
              "wishlist_id": 58,
              "wishlist_name": "Tsits",
              "catalogues": [
                {
                  "catalogue_id": 395,
                  "catalogue_name": "Na123",
                  "images": [
                    "dummy.jpg"
                  ]
                },
              ]
            },
            "account_id": 1082,
            "chat_id": 13,
            "created_at": "2024-08-09T11:37:53.904Z",
            "updated_at": "2024-08-09T11:39:19.688Z",
            "is_mark_read": true,
            "attachments": null,
            "role": "sender"
          }
        },
        index: 0
      }
      )

      let flatlistWrapper = getChatlist.renderProp("renderItem")({
        item: {
          "id": "11",
          "type": "chat_message",
          "attributes": {
            "id": 11,
            "message": {
              "order_request_id": 1,
              "product_name": "H&M T shirt",
              "gender": "male",
              "size": "M",
              "color": "blue",
              "product_quantity": 2,
              "price_per_unit": "200.0",
              "shipping_cost": "50.0",
              "product_display_image_url": null
            },
            "account_id": 1082,
            "chat_id": 13,
            "created_at": "2024-08-09T11:37:53.904Z",
            "updated_at": "2024-08-09T11:39:19.688Z",
            "is_mark_read": true,
            "attachments": null,
            "role": "sender"
          }
        }, index: 0
      })

      let payment = getChatlist.renderProp("renderItem")({
        item: {
          "id": "11",
          "type": "chat_message",
          "attributes": {
            "id": 303,
            "account_id": 1177,
            "chat_id": 164,
            "created_at": "2024-10-14T11:13:51.493Z",
            "updated_at": "2024-10-14T11:14:29.274Z",
            "is_mark_read": true,
            "message": {
              "data": {
                "id": "21",
                "type": "stylist_payment_request",
                "attributes": {
                  "id": 21,
                  "account_id": 1177,
                  "stylist_id": 1177,
                  "amount": "12340987.0",
                  "reason": "Jay",
                  "status": "pending",
                  "created_at": "2024-10-14T11:13:51.527Z",
                  "updated_at": "2024-10-14T11:13:51.527Z",
                  "chat_message_id": 303,
                  "chat_message": "stylist ask for money 12340987 to stylist"
                }
              }
            },
            "role": "sender"
          }
        },
        index: 0
      }
      )

     

      let acceptOrder = flatlistWrapper.findWhere(
        (node) => node.prop("testID") === "acceptOrder"
      )
      acceptOrder.simulate("press")

      let flatlistWrapper2 = getChatlist.renderProp("renderItem")({
        item: {
          "id": "800",
          "type": "chat_message",
          "attributes": {
            "id": 800,
            "account_id": 1253,
            "chat_id": 305,
            "created_at": "2025-01-24T06:07:38.567Z",
            "updated_at": "2025-01-24T06:08:03.677Z",
            "is_mark_read": true,
            "message": {
              "order_request_id": 92,
              "status": "in_cart",
              "product_name": "H&M T shirts",
              "product_desc": "Flower Print",
              "gender": "male",
              "size": "XL",
              "color": "Olive green",
              "product_quantity": 6,
              "price_per_unit": "60.0",
              "shipping_cost": "50.0",
              "total_amount": "410.0",
              "product_display_image_url": null
            },
            "role": "receiver"
          }
        }, index: 0
      })

      let acceptOrder1 = flatlistWrapper2.findWhere(
        (node) => node.prop("testID") === "acceptOrder"
      )
      acceptOrder1.simulate("press")

      let flatlistWrapper3 = getChatlist.renderProp("renderItem")({
        item: {
          "id": "800",
          "type": "chat_message",
          "attributes": {
            "id": 800,
            "account_id": 1253,
            "chat_id": 305,
            "created_at": "2025-01-24T06:07:38.567Z",
            "updated_at": "2025-01-24T06:08:03.677Z",
            "is_mark_read": true,
            "message": {
              "order_request_id": 92,
              "status": "pending",
              "product_name": "H&M T shirts",
              "product_desc": "Flower Print",
              "gender": "male",
              "size": "XL",
              "color": "Olive green",
              "product_quantity": 6,
              "price_per_unit": "60.0",
              "shipping_cost": "50.0",
              "total_amount": "410.0",
              "product_display_image_url": null
            },
            "role": "receiver"
          }
        }, index: 0
      })

      let acceptOrder2 = flatlistWrapper3.findWhere(
        (node) => node.prop("testID") === "acceptOrder"
      )
      acceptOrder2.simulate("press")

      let makePayment = payment.findWhere(
        (node) => node.prop("testID") === "makePayment"
      )
      makePayment.simulate("press")
      instance.setState({
        receiverName: "Test Test",
      })
      exampleBlockA.update();

      let navigateToWishlist = renderWishlist.findWhere(
        (node) => node.prop("testID") === "navigateWishlist"
      )
      navigateToWishlist.simulate("press")
      instance.sendMessage(false)
      instance.renderChatComponent(false)
      msgValidationAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId
      );
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        null
      );

      describe('Modal View Style', () => {
        it('should apply correct border styles', () => {
          const wrapper = shallow(<Modal/>);
          const view = wrapper.findWhere(node => node.prop('testID') === 'Modal');
      
          expect(view.exists()).toBe(true);
      
          const style = view.prop('style');
          const mergedStyle = Array.isArray(style)
            ? Object.assign({}, ...style)
            : style;
      
          expect(mergedStyle.borderWidth).toBe(2);
          expect(mergedStyle.borderColor).toBe('#FF5733');
          expect(mergedStyle.padding).toBe(10); 
        });
      });



      instance.getChatListApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceiveError } = instance;
      mockReceiveError("unit test", msgValidationAPI)

      let ReportPersonFn = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "ReportPersonFn"
      )
      ReportPersonFn.simulate("press")

      let sendMessage = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "sendMessage2"
      )
      sendMessage.simulate("press")

      let BlockModalOpen = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "BlockModalOpen"
      )
      BlockModalOpen.simulate("press")

      let paymentModule = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "paymentRequest"
      )
      paymentModule.simulate("press")

      let sendOrderRequest = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "sendOrderRequest"
      )
      sendOrderRequest.simulate("press")

      instance.getChatListApi(DummyResponse1)
      instance.getChatListApi(DummyResponse2)
      instance.getChatListApi(DummyResponse3)
      instance.getChatListApi(DummyResponse4)
      instance.getChatListApi(DummyResponse5)
      instance.setState({blockModal : true})

      const blockModalOpenMock = jest.fn();
      instance.blockModalOpen = blockModalOpenMock;
      instance.setState({ isBlock: true });
      instance.setState({ isBlock: false });
      const showMessageMock = jest.fn();
      instance.setState = jest.fn();
      instance.setState({ isBlock: true });
      expect(instance.setState).toHaveBeenCalledWith({ chatScreenMessage: "" });

      expect(blockModalOpenMock).toHaveBeenCalled();
      expect(showMessageMock).toHaveBeenCalledWith({
        message: "Unblock the user to enable chat messaging",
        position: { top: 0 },
      });
    });
  });
});

// Customizable Area End
