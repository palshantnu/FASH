import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";

import CreateOffer from "../../src/CreateOffer";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
   
    addListener: (param: string, callback: any) => {
      callback();
    },
  },
  id: "CreateOffer",
};

const feature = loadFeature("./__tests__/features/CreateOffer-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

 

  test("User navigates to createOffer", ({ given, when, then }) => {
    let promoCodeBlock: ShallowWrapper;
    let promoCodeDatilsBlock: ShallowWrapper;
    let instance: CreateOffer;
    
    given("I am a User loading createOffer", () => {
      promoCodeBlock = shallow(<CreateOffer {...screenProps} />);
      promoCodeDatilsBlock = shallow(<CreateOffer {...screenProps} />);
    });

    when("I navigate to the createOffer", () => {
      instance = promoCodeBlock.instance() as CreateOffer;
      
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
    });
    then("I can leave the screen with out errors", () => {
      const showModels = promoCodeBlock.findWhere(
        (node) => node.prop("leftTestId") === "customHeader")
        showModels.props().onLeftPress()
  
      expect(promoCodeBlock.exists()).toBe(true);
      
    });
    then("createOffer will load with out errors", () => {
      const flatlist = promoCodeBlock.findWhere(
        (node) => node.prop("testID") === "flatlistID"
    )

    
    const renderItem = flatlist.renderProp("renderItem")({ item: {id:1, header:"Create offer"}, index: 0 })
    const buttonNavigate = renderItem.findWhere(
        (node) => node.prop("testID") == "selectHeader1"
    )
    buttonNavigate.simulate("press")
    const navigateToCreateNewOffer = promoCodeBlock.findWhere(
      (node) => node.prop("testID") == "navigateToCreateNewOffer"
  )
  navigateToCreateNewOffer.simulate("press")
  const navigationBtn = promoCodeBlock.findWhere(
    (node) => node.prop("testID") == "navigationBtn"
)
navigationBtn.simulate("press")
const msgLogInErrorRestAPI = new Message(
  getName(MessageEnum.RestAPIResponceMessage)
);
msgLogInErrorRestAPI.addData(
  getName(MessageEnum.RestAPIResponceDataMessage),
  msgLogInErrorRestAPI
);
msgLogInErrorRestAPI.addData(
  getName(MessageEnum.RestAPIResponceSuccessMessage),
  {
    data: [
      {
        "id": 1,
        "type": 'product',
        "attributes": {
            "id": 1,
            "code": 'dgdsg',
            "isActive": true,
            "discount_type": 'Store',
            "discount": 10,
            "valid_from": '2024-01-01T00:00:00.000Z',
            "valid_to": '2024-01-01T00:00:00.000Z',
            "min_cart_value": '20000',
            "max_cart_value": '3000',
            "applicable_for": 'all_users',
            "discount_cap": '200',
            "coupon_catalogues":[{
              "id": 1,
              "coupon_code_id": 12,
              "catalogue_variant_id": 30,
            }],
            "coupon_business_informations": []
        }
      }
    ],
  }
);

msgLogInErrorRestAPI.addData(
  getName(MessageEnum.RestAPIResponceDataMessage),
  msgLogInErrorRestAPI.messageId
);
instance.getOfferListApiCallId = msgLogInErrorRestAPI.messageId;
runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);


const newRender=flatlist.renderProp("renderItem")({ item: {id:2, header:"Track Offer"}, index: 0 })
    const buttonNavigatess = newRender.findWhere(
        (node) => node.prop("testID") == "selectHeader2"
    )
    buttonNavigatess.simulate("press")
const flatlists = promoCodeBlock.findWhere(
  (node) => node.prop("testID") === "Assignstore_show_flatlist_list"
)


const renderItems = flatlists.renderProp("renderItem")({ item:  {
  "id": 1,
  "type": 'product',
  "attributes": {
      "id": 1,
      "code": 'dgdsg',
      "isActive": true,
      "discount_type": 'Store',
      "discount": 10,
      "valid_from": '2024-01-01T00:00:00.000Z',
      "valid_to": '2024-01-01T00:00:00.000Z',
      "min_cart_value": '20000',
      "max_cart_value": '3000',
      "applicable_for": 'all_users',
      "discount_cap": '200',
      "coupon_catalogues":[{
        "id": 1,
        "coupon_code_id": 12,
        "catalogue_variant_id": 30,
      }],
      "coupon_business_informations": []
  }
}, index: 0 })
const buttonNavigates = renderItems.findWhere(
  (node) => node.prop("testID") == "showModel"
)

buttonNavigates.simulate("press")
const CustomCheckBox = renderItems.findWhere(
  (node) => node.prop("testID") == "CustomCheckBox0"
)
CustomCheckBox.props().onValueChange()
const manualBtn = promoCodeBlock.findWhere(
  (node) => node.prop("testID") == "manualBtn"
)
manualBtn.simulate("press")
const deleteBtn = promoCodeBlock.findWhere(
  (node) => node.prop("testID") == "deleteBtn"
)
deleteBtn.simulate("press")
jest.runAllTimers();
const btndeleteModal = promoCodeBlock.findWhere(
  (node) => node.prop("testID") == "btndeleteModal"
)
btndeleteModal.simulate("press")
const btnCanceldeleteModal = promoCodeBlock.findWhere(
  (node) => node.prop("testID") == "btnCanceldeleteModal"
)
btnCanceldeleteModal.simulate("press")
const cancelBtn = promoCodeBlock.findWhere(
  (node) => node.prop("testID") == "cancelBtn"
)
cancelBtn.simulate("press")
const closeBtn = promoCodeBlock.findWhere(
  (node) => node.prop("testID") == "closeBtn"
)
closeBtn.simulate("press")
const modal = promoCodeBlock.findWhere(
  (node) => node.prop("testID") == "modal"
)
modal.props().onRequestClose()

expect(promoCodeBlock.exists()).toBe(true);
const msgLogInErrorRestAPIs = new Message(
  getName(MessageEnum.RestAPIResponceMessage)
);
msgLogInErrorRestAPIs.addData(
  getName(MessageEnum.RestAPIResponceDataMessage),
  msgLogInErrorRestAPIs
);
msgLogInErrorRestAPIs.addData(
  getName(MessageEnum.RestAPIResponceSuccessMessage),
  {
    data: [
      {
        "id": 1,
        "type": 'product',
        "attributes": {
            "id": 1,
            "code": 'dgdsg',
            "isActive": true,
            "discount_type": 'Store',
            "discount": 10,
            "valid_from": '2024-01-01T00:00:00.000Z',
            "valid_to": '2024-01-01T00:00:00.000Z',
            "min_cart_value": '20000',
            "max_cart_value": '3000',
            "applicable_for": 'all_users',
            "discount_cap": '200',
            "coupon_catalogues":[{
              "id": 1,
              "coupon_code_id": 12,
              "catalogue_variant_id": 30,
            }],
            "coupon_business_informations": []
        }
      }
    ],
  }
);

msgLogInErrorRestAPIs.addData(
  getName(MessageEnum.RestAPIResponceDataMessage),
  msgLogInErrorRestAPIs.messageId
);
instance.getDeleteOfferApiCallId = msgLogInErrorRestAPIs.messageId;
runEngine.sendMessage("Unit Test", msgLogInErrorRestAPIs);
const msgLogInErrorRestAPIsNew = new Message(
  getName(MessageEnum.RestAPIResponceMessage)
);
msgLogInErrorRestAPIsNew.addData(
  getName(MessageEnum.RestAPIResponceDataMessage),
  msgLogInErrorRestAPIsNew
);
msgLogInErrorRestAPIsNew.addData(
  getName(MessageEnum.RestAPIResponceSuccessMessage),
  {
    data: [
      {
        "id": 1,
        "type": 'product',
        "attributes": {
            "id": 1,
            "code": 'dgdsg',
            "isActive": true,
            "discount_type": 'Store',
            "discount": 10,
            "valid_from": '2024-01-01T00:00:00.000Z',
            "valid_to": '2024-01-01T00:00:00.000Z',
            "min_cart_value": '20000',
            "max_cart_value": '3000',
            "applicable_for": 'all_users',
            "discount_cap": '200',
            "coupon_catalogues":[{
              "id": 1,
              "coupon_code_id": 12,
              "catalogue_variant_id": 30,
            }],
            "coupon_business_informations": []
        }
      }
    ],
  }
);

msgLogInErrorRestAPIsNew.addData(
  getName(MessageEnum.RestAPIResponceDataMessage),
  msgLogInErrorRestAPIsNew.messageId
);
instance.getUpdateOfferApiCallId = msgLogInErrorRestAPIsNew.messageId;
runEngine.sendMessage("Unit Test", msgLogInErrorRestAPIsNew); 
    });


  });
});
