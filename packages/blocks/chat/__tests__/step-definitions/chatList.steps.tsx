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
import ChatList from '../../src/ChatList';
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
  id: 'ChatList',
};

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

const feature = loadFeature("./__tests__/features/chatList-scenario.feature");
const mockgetStorageData = jest.spyOn(storageData, "getStorageData");

global.FormData = require('react-native/Libraries/Network/FormData');

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to ChatList', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;

    let instance: ChatList;

    given('I am a User loading ChatList', () => {
      mockgetStorageData.mockImplementation(() =>
        Promise.resolve(`"renter"`)
      );
      exampleBlockA = shallow(<ChatList {...(screenProps as any)} />);
    });

    when('I navigate to the ChatList', async () => {
      instance = exampleBlockA.instance() as ChatList;

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

    then("User can get error for chat list data", () => {
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
          'data': []
        }
      );
      instance.getChatListApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)

    })

    then("User can get chat list data", () => {
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
          "data": [
            {
              "id": "164",
              "type": "chat_only",
              "attributes": {
                "id": 164,
                "name": "order chat",
                "candidate_name": "chandni garg",
                "unread_message_count": 0,
                "is_mark_read": true,
                "last_message_type": "wishlist",
                "candidate_role": "buyer"
              },
              "relationships": {
                "accounts": {
                  "data": [
                    {
                      "id": "1200",
                      "type": "account"
                    },
                    {
                      "id": "1177",
                      "type": "account"
                    }
                  ]
                }
              }
            },
            {
              "id": "165",
              "type": "chat_only",
              "attributes": {
                "id": 165,
                "name": "order chat",
                "candidate_name": "chandni garg",
                "unread_message_count": 0,
                "is_mark_read": true,
                "last_message_type": "wishlist",
                "candidate_role": "buyer"
              },
              "relationships": {
                "accounts": {
                  "data": [
                    {
                      "id": "1200",
                      "type": "account"
                    },
                    {
                      "id": "1177",
                      "type": "account"
                    }
                  ]
                }
              }
            }
          ]
        }
      );
      instance.onChangeSearchBar('search')
      instance.getChatListApiCallId = msgValidationAPI.messageId;
      const { receive: mockReceive } = instance;
      mockReceive("unit test", msgValidationAPI)
    })

    then("Setting data in a flatlist", () => {
      let getChatlist = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "RenderChatList"
      );

      let flatlistWrapper = shallow(
        getChatlist.props().renderItem({
          item: {
            "id": "164",
            "type": "chat_only",
            "attributes": {
              "id": 164,
              "name": "order chat",
              "candidate_name": "chandni garg",
              "unread_message_count": 1,
              "is_mark_read": true,
              "last_message_type": "wishlist",
              "candidate_role": "buyer"
            },
            "relationships": {
              "accounts": {
                "data": [
                  {
                    "id": "1200",
                    "type": "account"
                  },
                  {
                    "id": "1177",
                    "type": "account"
                  }
                ]
              }
            }
          }
        }
        )
      )

      getChatlist.props().keyExtractor({
        item: {
          "id": "164",
          "type": "chat_only",
          "attributes": {
            "id": 164,
            "name": "order chat",
            "candidate_name": "chandni garg",
            "unread_message_count": 2,
            "is_mark_read": true,
            "last_message_type": "wishlist",
            "candidate_role": "buyer"
          },
          "relationships": {
            "accounts": {
              "data": [
                {
                  "id": "1200",
                  "type": "account"
                },
                {
                  "id": "1177",
                  "type": "account"
                }
              ]
            }
          }
        }
      }
      )

      let chatID = flatlistWrapper.findWhere(
        (node) => node.prop("testID") === "NavigateToFunc"
      );
      chatID.simulate("press");
    })

    then("Search input for chat", () => {
      let getChat = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "searchInput"
      );
      getChat.props().onChangeText("ABc")
      instance.renderItemSeperator();
      mockFunction(instance,'componentWillUnmount')
    })
  });

  test('User navigates to ChatList to search data', ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;

    let instance: ChatList;

    given('I am a User loading ChatList to search data', () => {
      mockgetStorageData.mockImplementation(() =>
        Promise.resolve(`"renter"`)
      );
      exampleBlockA = shallow(<ChatList {...(screenProps as any)} />);
    });

    when('I navigate to the ChatList to search data', async () => {
      instance = exampleBlockA.instance() as ChatList;

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

    then("Search input for chat to search data", () => {
      let getChat = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "searchInput"
      );
      getChat.props().onChangeText("ABc")
      mockFunction(instance,'componentWillUnmount')
    })
  });
});

// Customizable Area End
