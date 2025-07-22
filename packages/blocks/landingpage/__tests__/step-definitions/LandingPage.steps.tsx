import React from "react";
import { Alert, AlertButton, AlertOptions, PermissionsAndroid, Platform } from "react-native";
import { jest, beforeEach, expect, afterEach } from "@jest/globals";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { render } from "@testing-library/react-native";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import * as utils from "../../../../framework/src/Utilities";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import {
  CarouselMockData,
  CatalogueListMockData,
  dummyCart,
} from "../__mocks__/responses";
import LandingPage from "../../src/LandingPage";
import * as alert from "../../../../components/src/CustomAlert";
import  getStoreDataAddress  from '../../src/LandingPageController';
import { getStorageData } from "../../../../framework/src/Utilities";


const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: () => { },
    addListener: jest.fn((event, callback: () => void) => {
      if (event === 'willFocus') {
        callback();
      }
      if (event === 'willBlur') {
        callback();
      }
    }),
    triggerWillFocus: jest.fn(),
    triggerWillBlur: jest.fn(),
  },
  id: "LandingPage",
};

const homeCategoryNameArr = [
  {
    id: 1,
    name: "TRENDING",
    value: "trending",
  },

  {
    id: 2,
    name: "NEW LAUNCHES",
    value: "new_launches",
  },
];

const feature = loadFeature(
  "./__tests__/features/LandingPage-scenario.feature"
);
const sendMessage = jest.spyOn(runEngine, "sendMessage");
const loactionData = {
  formatted_address: "",
  geometry: { location: { lat: "", lng: "" } }
}
let mockAlert: Object;
defineFeature(feature, (test) => {
  const mockItem = {
    item: {
      attributes: {
        title: "Title Text",
        subtitle: "Subtitle Text",
        description: "Description Text",
        app_image: "image_url.jpg",
      },
    },
  }

  const mockTruncate = jest.fn((text) => text);
  const mockHandleSliderPress = jest.fn();

  beforeEach(() => {
    // jest.resetModules();
    jest.useFakeTimers();
    jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    mockAlert = jest
      .spyOn(Alert, "alert")
      .mockImplementation(
        (
          title: string,
          message?: string | undefined,
          button?: AlertButton[] | undefined,
          options?: AlertOptions | undefined
        ) => {
          button && button[1].onPress && button[1].onPress();
        }
      );
  });

  afterEach(() => {
    jest.clearAllTimers(); // Clear all timers
  });

  test("User navigates to LandingPage", ({ given, when, then, and }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: LandingPage;
    let screen: ReturnType<typeof render>;
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });
    given("I am a User loading LandingPage", () => {
      landingPageBlock = shallow(<LandingPage {...screenProps} />);
      // screen = render(<LandingPage {...screenProps} />);
    });

    when("I navigate to the LandingPage", () => {
      let Item = {
        id: '110',
        type: 'test',
        attributes: {
          name: 'string',
          description: 'string',
          primary_image: 'string',
          primary_price: 'string',
          is_wishlist: false,
          primary_discounted_percentage: 'string',
          primary_main_price: 'string',
          primary_store_name: "string",
          primary_brand_name: "string",
        }
      }
      instance = landingPageBlock.instance() as LandingPage;
      instance.requestFromLocation('granted');
      instance.fetchTheCarouselList();
      instance.handleCarsouelImageChange(1);
      instance.addWishlist(1);
      instance.rmWishlist(1);
      instance.navigateToSignIn()
      instance.requestFromLocationAgain()
      instance.requestPermission()
      instance.priceConvertValue('100')
      instance.toggleWishlistData(Item)
    });

    then("I can load token with out erros", async () => {
      instance.getTitleContentApiFun();
      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "SessionResponseMessage" }),
        ])
      );
      // cart with items
      const cartAmountMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      cartAmountMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        cartAmountMessage.messageId
      );
      cartAmountMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyCart
      );
      instance.cartApiCallId = cartAmountMessage.messageId;
      runEngine.sendMessage("Unit Test", cartAmountMessage);

      // cart with no items
      cartAmountMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "No active cart found",
        }
      );
      runEngine.sendMessage("Unit Test", cartAmountMessage);
    });

    then("I can load the carsouel list", () => {
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        CarouselMockData
      );
      instance.getCarouselListApiMsgCallId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({
            properties: expect.objectContaining({
              RestAPIResponceSuccessMessage: expect.objectContaining({
                data: CarouselMockData.data,
              }),
            }),
          }),
        ])
      );

      let Item1 = {
        item: {
          attributes: {
            link_type: "single_product",
            link_id: 125
          }
        }
      }

      let Item2 = {
        item: {
          attributes: {
            link_type: "trending",
            link_id: 125
          }
        }
      }
      let Item3 = {
        item: {
          attributes: {
            link_type: "store_link",
            link_id: 125
          }
        }
      }
      let Item4 = {
        item: {
          attributes: {
            link_type: "loyalty_point",
            link_id: 125
          }
        }
      }
      let Item5 = {
        item: {
          attributes: {
            link_type: "about_us",
            link_id: 125
          }
        }
      }

      let Item6 = {
        item: {
          attributes: {
            link_type: "product_category_sub_category",
            link_id: 125
          }
        }
      }

      let Item7 = {
        item: {
          attributes: {
            link_type: "store_category",
            link_id: 125
          }
        }
      }

      instance.handleSliderPress(Item1);
      instance.handleSliderPress(Item2);
      instance.handleSliderPress(Item3);
      instance.handleSliderPress(Item4);
      instance.handleSliderPress(Item5);
      instance.handleSliderPress(Item6);
      instance.handleSliderPress(Item7);
      instance.handleSliderPress({ item: { attributes: {} } })
      instance.loadAddresses('fgfdg')
      instance.setState({ addressList: [{ "id": "388", "type": "address", "attributes": { "name": "Buyer hir", "country_code": "+965", "phone_number": "22004070", "contact_number": "+96522004070", "street": "20 W 34th St., New York, NY 10001, USA", "zipcode": "382445", "area": "Pushpam bunglows", "block": "A", "city": "Ahemedabad", "house_or_building_number": "10", "floor": null, "address_name": "Office", "is_default": false, "is_default_1": false, "latitude": 40.7484405, "longitude": -73.9856644 } }, { "id": "398", "type": "address", "attributes": { "name": "nora", "country_code": "+965", "phone_number": "25254598", "contact_number": "+96525254598", "street": "boulevard lobeau ", "zipcode": "50000", "area": "aera", "block": "12", "city": "ville", "house_or_building_number": "32", "floor": null, "address_name": "31 address meknes ", "is_default": true, "is_default_1": false, "latitude": 33.755787, "longitude": -116.359998 } }], })
      instance.toggleAssignAddress("388")
      instance.handleDefaultAddress("388")
      instance.selectAddress({
        formatted_address: "sdfdsfds",
        geometry: { location: { lat: 767, lng: 54654 } }
      })
      instance.getOneTimeLocation()
      const titleContentApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      titleContentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        titleContentApi.messageId
      );
      titleContentApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": {
            "id": "5",
            "type": "landing_page_content",
            "attributes": {
              "id": 5,
              "rank": 3,
              "created_at": "2023-10-27T10:02:21.237Z",
              "updated_at": "2024-11-07T06:36:50.652Z",
              "link_type": "single_product",
              "link_id": 158,
              "title": "sg",
              "subtitle": "xzv",
              "description": "Good Product",
              "image": "pop.jpeg"
            }
          }
        },
      );

      titleContentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        titleContentApi.messageId
      );
      instance.getTitleContentApiCallId = titleContentApi.messageId;
      instance.isFocused.current = true
      instance.setState({ token: "fffffkfrjrkfrd3555" });
      instance.getTitleContentApiFun();
      runEngine.sendMessage("Test", titleContentApi);
    });

    then("I can load the catalogue list", () => {
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        CatalogueListMockData
      );
      instance.getCatalogueApiMsgCallId = apiTestMsg.messageId;
      instance.getCatalogueApiMsgCallId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({
            properties: expect.objectContaining({
              RestAPIResponceSuccessMessage: expect.objectContaining({
                data: CatalogueListMockData.data,
              }),
            }),
          }),
        ])
      );

      instance.addWishlistApiCallId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      instance.removeWishlistApiCallId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);
    });

    then("I can see the list of catalogues", () => {
      const flatlist = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "cate_show_flatlist_list"
      );
      flatlist.simulate("endReached");
      const item = CatalogueListMockData.data[0];
      const renderItem = flatlist.renderProp("renderItem")({
        item: item,
        index: 0,
      });
      const buttonNavigate = renderItem.findWhere(
        (node) => node.prop("testID") === "btnCatalogueListRedirection"
      );
      buttonNavigate.simulate("press");
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationProductDetailsMessage" }),
        ])
      );
      flatlist.renderProp("keyExtractor")("3");
      flatlist.renderProp("ListEmptyComponent")({});
      const header = flatlist.renderProp("ListHeaderComponent")({
        item: item,
        index: 0,
      });
      const horizontalCategory = header.findWhere(
        (node) => node.prop("testID") === "category_data_show"
      );
      const item3 = homeCategoryNameArr[0];
      const renderItem3 = horizontalCategory.renderProp("renderItem")({
        item: item3,
        index: 0,
      });
      const buttonNavigate3 = renderItem3.findWhere(
        (node) => node.prop("testID") == "btn_selected_home_category"
      );
      buttonNavigate3.simulate("press");
    });

    when("There is error in response", async () => {
      Platform.OS = 'android'
      instance.requestFromLocation('denied')

      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: "Error",
      });

      instance.getCatalogueApiMsgCallId = apiTestMsg.messageId;

      const carouselMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      carouselMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          carouselMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          errors: "Error",
        },
      });

      instance.getCarouselListApiMsgCallId = carouselMsg.messageId;


      runEngine.sendMessage("Test", apiTestMsg);
      runEngine.sendMessage("Test", carouselMsg);

      instance.getCategorysApiCallId = carouselMsg.messageId;


      runEngine.sendMessage("Test", carouselMsg);

    });

    then("User sees alert", () => {
      const loader = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "custom-loader"
      );
      expect(loader).toHaveLength(0);
    });

    then("I can enter a product name with out error", () => {
      let textInputComponent = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "txt_enter_product"
      );
      textInputComponent.simulate("changeText", "Boss");
      textInputComponent.simulate("submitEditing");

      expect(textInputComponent.exists()).toBe(true);
    });

    and("I can go to cart screen", () => {
      const cartButton = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "goToCart"
      );
      cartButton.simulate("press");

      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({
            id: "NavigationShoppingCartOrdersMessage",
          }),
        ])
      );
    });

    and("I can go to notification screen", () => {
      const cartButton = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "btnNotifcationBuyerRedirection"
      );
      cartButton.simulate("press");

      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({
            id: "NavigationNotificationsBuyer",
          }),
        ])
      );
    });

    given("I am on landing page", () => {
      landingPageBlock = shallow(<LandingPage {...screenProps} />);
      // screen = render(<LandingPage {...screenProps} />);
    });

    then("I can see the search bar", () => {
      let textinputComponent = landingPageBlock.findWhere((node) => node.prop('testID') === 'txt_enter_product');
      textinputComponent.props().onFocus();
      let buttonComponent5 = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "locationShowModel"
      );
      buttonComponent5.simulate("press");
      jest.spyOn(utils, "getStorageData").mockImplementation((key): any => {

        if (key === "address_id") {

          return "388";
        }

      })
      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data:
            [{ "id": "388", "type": "address", "attributes": { "name": "Buyer hir", "country_code": "+965", "phone_number": "22004070", "contact_number": "+96522004070", "street": "20 W 34th St., New York, NY 10001, USA", "zipcode": "382445", "area": "Pushpam bunglows", "block": "A", "city": "Ahemedabad", "house_or_building_number": "10", "floor": null, "address_name": "Office", "is_default": false, "latitude": 40.7484405, "longitude": -73.9856644 } }, { "id": "398", "type": "address", "attributes": { "name": "nora", "country_code": "+965", "phone_number": "25254598", "contact_number": "+96525254598", "street": "boulevard lobeau ", "zipcode": "50000", "area": "aera", "block": "12", "city": "ville", "house_or_building_number": "32", "floor": null, "address_name": "31 address meknes ", "is_default": true, "latitude": 33.755787, "longitude": -116.359998 } }],
        }
      });
      instance.apiGetAllAddressCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);
      let textInputComponent = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "google_places_autocomplete"
      );
      // textInputComponent.simulate("changeText", "submit");
      // textInputComponent.simulate("submitEditing");
      let btnAddAdress = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "btnAddAdress"
      );
      btnAddAdress.simulate("press");
      let enableLocationAgain = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "enableLocationAgain"
      );
      enableLocationAgain.simulate("press");
      const flatlist = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "address_flatlist_list"
      );
      flatlist.simulate("endReached");
      const item = { "id": "388", "type": "address", "attributes": { "name": "Buyer hir", "country_code": "+965", "phone_number": "22004070", "contact_number": "+96522004070", "street": "20 W 34th St., New York, NY 10001, USA", "zipcode": "382445", "area": "Pushpam bunglows", "block": "A", "city": "Ahemedabad", "house_or_building_number": "10", "floor": null, "address_name": "Office", "is_default": false, "latitude": 40.7484405, "longitude": -73.9856644 } };

      const renderItem = flatlist.renderProp("renderItem")({
        item: item,
        index: 0,
      });
      flatlist.renderProp("keyExtractor")("3");
      let editdata = {
        id: "3",
      };

      let google_places_autocomplete = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "google_places_autocomplete"
      );
      // google_places_autocomplete.renderProp("renderRightButton");
      instance.crossButtonView()
      instance.editAddress("388")

      let btnBackAddress = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "btnBackAddress"
      );
      btnBackAddress.simulate("press");

      let deleteAddressBtn = renderItem.findWhere(
        (node) => node.prop("testID") === "deleteAddressBtn"
      );
      deleteAddressBtn.simulate("press");
      let singleItem = renderItem.findWhere(
        (node) => node.prop("testID") === "addressItem"
      );
      singleItem.simulate("press");
    });

    then("data for carosal", () => {
      const carosalData = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "corouselHomeBannerImages"
      );
      const items = {
        item: {
          "attributes": {
            "app_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb01jIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9b5fe80956f790730da4c83466aa56021fba1118/test%20shirt.jpg",
            "created_at": "2023-10-25T07:18:20.408Z",
            "description": "Demo",
            "id": 3,
            "link_id": null,
            "link_type": "product_category_sub_category",
            "rank": 2,
            "subtitle": "DEMO1",
            "title": "TEST1",
            "updated_at": "2024-12-18T08:39:53.114Z",
            "web_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb1FjIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ea7091fb1df4cbd509ecc66d337b135f5ff1d0d/test%20shirt.jpg"
          },
          "id": "3",
          "type": "landing_page_content"
        }
      }

      instance.renderItemSlider(items)
      let editdata = {
        id: "3",
      };
    });

    then("update address should succeed", () => {
      const updateAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateAddressAPI
      );
      updateAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Address deleted succesfully!",
        }
      );

      updateAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateAddressAPI.messageId
      );
    });

    then("delete address should succeed", () => {
      const deleteAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteAddressAPI
      );
      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Address deleted succesfully!",
        }
      );

      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteAddressAPI.messageId
      );
      instance.apiDeleteAddressCallId = deleteAddressAPI.messageId;
      runEngine.sendMessage("Unit Test", deleteAddressAPI);
    });

    then("wishlist add should succeed", () => {
      const AddWishlist = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      AddWishlist.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        AddWishlist
      );
      AddWishlist.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Address deleted succesfully!",
        }
      );

      AddWishlist.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        AddWishlist.messageId
      );
      instance.addWishlistApiCallId = AddWishlist.messageId;
      runEngine.sendMessage("Unit Test", AddWishlist);
    });

    then("wishlist remove should succeed", () => {
      const removeWishlist = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      removeWishlist.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        removeWishlist
      );
      removeWishlist.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Address deleted succesfully!",
        }
      );

      removeWishlist.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        removeWishlist.messageId
      );
      instance.removeWishlistApiCallId = removeWishlist.messageId;
      runEngine.sendMessage("Unit Test", removeWishlist);
    });

  });

  test("User navigates to LandingPage checkLocation permission", ({ given, when, then, and }) => {
    let landingPageBlock: ShallowWrapper;
    let instance: LandingPage;
    let screen: ReturnType<typeof render>;
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });
    given("I am a User loading LandingPage checkLocation permission", () => {
      landingPageBlock = shallow(<LandingPage {...screenProps} />);
      // screen = render(<LandingPage {...screenProps} />);
    });

    when("I navigate to the LandingPage checkLocation permission", () => {
      instance = landingPageBlock.instance() as LandingPage;

      let Item = {
        id: '110',
        type: 'test',
        attributes: {
          name: 'string',
          description: 'string',
          primary_image: 'string',
          primary_price: 'string',
          is_wishlist: false,
          primary_discounted_percentage: 'string',
          primary_main_price: 'string',
          primary_store_name: "string",
          primary_brand_name: "string",
        }
      }

      instance.requestFromLocation('granted');
      instance.fetchTheCarouselList();
      instance.handleCarsouelImageChange(1);
      instance.addWishlist(1);
      instance.rmWishlist(1);
      instance.navigateToSignIn()
      instance.requestFromLocationAgain()
      instance.requestPermission()
      instance.updateSuccessMessage()
      instance.priceConvertValue(null)
      instance.toggleWishlistData(Item)
    });

    then("I can load token with out erros checkLocation permission", async () => {
      instance.getTitleContentApiFun();
      const msgTokenAPI = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      msgTokenAPI.addData(
        getName(MessageEnum.SessionResponseToken),
        "User-Token"
      );
      runEngine.sendMessage("Unit Test", msgTokenAPI);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "SessionResponseMessage" }),
        ])
      );
      // cart with items
      const cartAmountMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      cartAmountMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        cartAmountMessage.messageId
      );
      cartAmountMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        dummyCart
      );
      instance.cartApiCallId = cartAmountMessage.messageId;
      runEngine.sendMessage("Unit Test", cartAmountMessage);

      // cart with no items
      cartAmountMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "No active cart found",
        }
      );
      runEngine.sendMessage("Unit Test", cartAmountMessage);
    });

    then("I can load the carsouel list checkLocation permission", () => {
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        CarouselMockData
      );
      instance.getCarouselListApiMsgCallId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({
            properties: expect.objectContaining({
              RestAPIResponceSuccessMessage: expect.objectContaining({
                data: CarouselMockData.data,
              }),
            }),
          }),
        ])
      );

      instance.loadAddresses('fgfdg')
      instance.setState({ addressList: [{ "id": "388", "type": "address", "attributes": { "name": "Buyer hir", "country_code": "+965", "phone_number": "22004070", "contact_number": "+96522004070", "street": "20 W 34th St., New York, NY 10001, USA", "zipcode": "382445", "area": "Pushpam bunglows", "block": "A", "city": "Ahemedabad", "house_or_building_number": "10", "floor": null, "address_name": "Office", "is_default": false, "is_default_1": false, "latitude": 40.7484405, "longitude": -73.9856644 } }, { "id": "398", "type": "address", "attributes": { "name": "nora", "country_code": "+965", "phone_number": "25254598", "contact_number": "+96525254598", "street": "boulevard lobeau ", "zipcode": "50000", "area": "aera", "block": "12", "city": "ville", "house_or_building_number": "32", "floor": null, "address_name": "31 address meknes ", "is_default": true, "is_default_1": false, "latitude": 33.755787, "longitude": -116.359998 } }], })
      instance.toggleAssignAddress("388")
      instance.handleDefaultAddress("388")
      instance.selectAddress({
        formatted_address: "sdfdsfds",
        geometry: { location: { lat: 767, lng: 54654 } }
      })
      instance.getOneTimeLocation()
      const titleContentApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      titleContentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        titleContentApi.messageId
      );
      titleContentApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "data": {
            "id": "5",
            "type": "landing_page_content",
            "attributes": {
              "id": 5,
              "rank": 3,
              "created_at": "2023-10-27T10:02:21.237Z",
              "updated_at": "2024-11-07T06:36:50.652Z",
              "link_type": "single_product",
              "link_id": 158,
              "title": "sg",
              "subtitle": "xzv",
              "description": "Good Product",
              "image": "pop.jpeg"
            }
          }
        },
      );

      titleContentApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        titleContentApi.messageId
      );
      instance.getTitleContentApiCallId = titleContentApi.messageId;
      instance.isFocused.current = true
      instance.setState({ token: "fffffkfrjrkfrd3555" });
      instance.getTitleContentApiFun();
      runEngine.sendMessage("Test", titleContentApi);
    });

    then("I can load the catalogue list checkLocation permission", () => {
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        CatalogueListMockData
      );
      instance.getCatalogueApiMsgCallId = apiTestMsg.messageId;
      instance.getCatalogueApiMsgCallId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({
            properties: expect.objectContaining({
              RestAPIResponceSuccessMessage: expect.objectContaining({
                data: CatalogueListMockData.data,
              }),
            }),
          }),
        ])
      );

      instance.addWishlistApiCallId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);

      instance.removeWishlistApiCallId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);
    });

    then("I can see the list of catalogues checkLocation permission", () => {
      const flatlist = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "cate_show_flatlist_list"
      );
      flatlist.simulate("endReached");
      const item = CatalogueListMockData.data[0];
      const renderItem = flatlist.renderProp("renderItem")({
        item: item,
        index: 0,
      });
      const buttonNavigate = renderItem.findWhere(
        (node) => node.prop("testID") === "btnCatalogueListRedirection"
      );
      buttonNavigate.simulate("press");

      const wishlistNav = renderItem.findWhere(
        (node) => node.prop("testID") === "wishlistToggle"
      );
      wishlistNav.simulate("press");

      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "NavigationProductDetailsMessage" }),
        ])
      );
      flatlist.renderProp("keyExtractor")("3");
      flatlist.renderProp("ListEmptyComponent")({});
      const header = flatlist.renderProp("ListHeaderComponent")({
        item: item,
        index: 0,
      });
      const horizontalCategory = header.findWhere(
        (node) => node.prop("testID") === "category_data_show"
      );
      const item3 = homeCategoryNameArr[0];
      const renderItem3 = horizontalCategory.renderProp("renderItem")({
        item: item3,
        index: 0,
      });
      const buttonNavigate3 = renderItem3.findWhere(
        (node) => node.prop("testID") == "btn_selected_home_category"
      );
      buttonNavigate3.simulate("press");
    });

    when("There is error in response checkLocation permission", async () => {
      Platform.OS = 'android'
      instance.requestFromLocationAgain()
      instance.requestPermission()
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        errors: "Error",
      });

      instance.getCatalogueApiMsgCallId = apiTestMsg.messageId;

      const carouselMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      carouselMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          carouselMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          errors: "Error",
        },
      });

      instance.getCarouselListApiMsgCallId = carouselMsg.messageId;


      runEngine.sendMessage("Test", apiTestMsg);
      runEngine.sendMessage("Test", carouselMsg);

      instance.getCategorysApiCallId = carouselMsg.messageId;


      runEngine.sendMessage("Test", carouselMsg);

    });

    then("User sees alert checkLocation permission", () => {
      const loader = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "custom-loader"
      );
      expect(loader).toHaveLength(0);
    });

    then("I can enter a product name with out error checkLocation permission", () => {
      let textInputComponent = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "txt_enter_product"
      );
      textInputComponent.simulate("changeText", "Boss");
      textInputComponent.simulate("submitEditing");

      expect(textInputComponent.exists()).toBe(true);
    });

    and("I can go to cart screen checkLocation permission", () => {
      const cartButton = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "goToCart"
      );
      cartButton.simulate("press");

      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({
            id: "NavigationShoppingCartOrdersMessage",
          }),
        ])
      );
    });

    and("I can go to notification screen checkLocation permission", () => {
      const cartButton = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "btnNotifcationBuyerRedirection"
      );
      cartButton.simulate("press");

      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({
            id: "NavigationNotificationsBuyer",
          }),
        ])
      );
    });

    given("I am on landing page checkLocation permission", () => {
      landingPageBlock = shallow(<LandingPage {...screenProps} />);
      // screen = render(<LandingPage {...screenProps} />);
    });

    then("I can see the search bar checkLocation permission", () => {
      let textinputComponent = landingPageBlock.findWhere((node) => node.prop('testID') === 'txt_enter_product');
      textinputComponent.props().onFocus();
      let buttonComponent5 = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "locationShowModel"
      );
      buttonComponent5.simulate("press");
      jest.spyOn(utils, "getStorageData").mockImplementation((key): any => {

        if (key === "address_id") {

          return null;
        }

      })
      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data:
            [{ "id": "388", "type": "address", "attributes": { "name": "Buyer hir", "country_code": "+965", "phone_number": "22004070", "contact_number": "+96522004070", "street": "20 W 34th St., New York, NY 10001, USA", "zipcode": "382445", "area": "Pushpam bunglows", "block": "A", "city": "Ahemedabad", "house_or_building_number": "10", "floor": null, "address_name": "Office", "is_default": false, "latitude": 40.7484405, "longitude": -73.9856644 } }, { "id": "398", "type": "address", "attributes": { "name": "nora", "country_code": "+965", "phone_number": "25254598", "contact_number": "+96525254598", "street": "boulevard lobeau ", "zipcode": "50000", "area": "aera", "block": "12", "city": "ville", "house_or_building_number": "32", "floor": null, "address_name": "31 address meknes ", "is_default": true, "latitude": 33.755787, "longitude": -116.359998 } }],
        }
      });
      instance.apiGetAllAddressCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);
      let textInputComponent = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "google_places_autocomplete"
      );
      let crossButton = textInputComponent.findWhere(
        (node) => node.prop("testID") === "crossButtonPress"
      );
      // crossButton.simulate("press");
      let btnAddAdress = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "btnAddAdress"
      );
      btnAddAdress.simulate("press");
      let enableLocationAgain = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "enableLocationAgain"
      );
      enableLocationAgain.simulate("press");
      const flatlist = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "address_flatlist_list"
      );
      flatlist.simulate("endReached");
      const item = { "id": "388", "type": "address", "attributes": { "name": "Buyer hir", "country_code": "+965", "phone_number": "22004070", "contact_number": "+96522004070", "street": "20 W 34th St., New York, NY 10001, USA", "zipcode": "382445", "area": "Pushpam bunglows", "block": "A", "city": "Ahemedabad", "house_or_building_number": "10", "floor": null, "address_name": "Office", "is_default": false, "latitude": 40.7484405, "longitude": -73.9856644 } };

      const renderItem = flatlist.renderProp("renderItem")({
        item: item,
        index: 0,
      });
      flatlist.renderProp("keyExtractor")("3");
      let editdata = {
        id: "3",
      };

      let btnBackAddress = landingPageBlock.findWhere(
        (node) => node.prop("testID") === "btnBackAddress"
      );
      btnBackAddress.simulate("press");

      // instance.editAddress("388")
      let editAddressBtn = renderItem.findWhere(
        (node) => node.prop("testID") === "editAddressBtn"
      );
      editAddressBtn.simulate("press");
      let deleteAddressBtn = renderItem.findWhere(
        (node) => node.prop("testID") === "deleteAddressBtn"
      );
      deleteAddressBtn.simulate("press");
    });

    then("update address should succeed checkLocation permission", () => {
      // expect(instance.handleSavePressed()).toBe(true);
      const updateAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      updateAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateAddressAPI
      );
      updateAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Address deleted succesfully!",
        }
      );

      updateAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        updateAddressAPI.messageId
      );
      instance.componentWillUnmount();
      instance.setState({ addressName: "Delivering to" })
      instance.handleLanguageChange();
      instance.setState({ addressName: "التوصيل الى" })
      instance.handleLanguageChange();
    });

    then("delete address should succeed checkLocation permission", () => {
      // expect(instance.handleSavePressed()).toBe(true);
      const deleteAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteAddressAPI
      );
      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Address deleted succesfully!",
        }
      );

      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteAddressAPI.messageId
      );
      instance.apiDeleteAddressCallId = deleteAddressAPI.messageId;
      runEngine.sendMessage("Unit Test", deleteAddressAPI);
    });

    then("I can get api call and get empty data with out error", () => {
      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {}
      });
      instance.apiGetAllAddressCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);
      const state = instance.state;
      expect(state.nextPage).toBe(null);
      const validResponse = {
        data: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
        ],
        errors: '',
        meta: {
          total_pages: 1,
          current_page: 1,
          prev_page: null,
          next_page: 2,
        },
      };

      const emptyResponse = {
        data: [],
        errors: 'No items found',
        meta: {
          total_pages: 0,
          current_page: 1,
          prev_page: null,
          next_page: null,
        },
      };

    });

  });

  test("User trying to utilise wishlist", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    let instance: LandingPage;
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });

    given("I am an user using the LandingPage and not signed in", () => {
      // screen = render(<LandingPage {...screenProps} />);

      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          CatalogueListMockData,
      });
      // instance.getCatalogueApiMsgCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);

      const carousal = new Message(getName(MessageEnum.RestAPIResponceMessage));
      carousal.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: carousal.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          CatalogueListMockData,
      });
      // instance.getCarouselListApiMsgCallId =
      // carousal.messageId;
      runEngine.sendMessage("UNIT TEST", carousal);
    });



    then("I get sign in alert", () => {
    });

    given("I am signed in", () => {
      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", session);

      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          CatalogueListMockData,
      });
      // instance.getCatalogueApiMsgCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);
    });

    when("I click on add to wishlist icon", () => {

      const wishlistMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      wishlistMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: wishlistMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          { message: "catalogue added to wishlist" },
      });
      // instance.updateWishlistApiCallId = wishlistMsg.messageId;
      runEngine.sendMessage("UNIT TEST", wishlistMsg);
    });

    then("The catalogue is added to wishlist", () => {
    });

    when("I click the icon again", () => {

      const wishlistMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      wishlistMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: wishlistMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          { message: "catalogue is removed from wishlist" },
      });
      // instance.getCatalogueApiMsgCallId = wishlistMsg.messageId;
      runEngine.sendMessage("UNIT TEST", wishlistMsg);

      const getCategoryMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage);
      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "message": 'Added'
        });

      getCategoryMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getCategoryMessage.messageId);
      // instance.addWishlistApiCallId = getCategoryMessage.messageId
      runEngine.sendMessage("Unit Test", getCategoryMessage);

      const removeWhislist = new Message(getName(MessageEnum.RestAPIResponceMessage))
      removeWhislist.addData(getName(MessageEnum.RestAPIResponceDataMessage), removeWhislist);
      removeWhislist.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          "message": 'Removed'
        });

      removeWhislist.addData(getName(MessageEnum.RestAPIResponceDataMessage), removeWhislist.messageId);
      // instance.removeWishlistApiCallId = removeWhislist.messageId
      runEngine.sendMessage("Unit Test", removeWhislist);

    });

    then("It gets removed from wishlist", () => {


    });
  });

  test("User trying to save address", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    let instance: LandingPage;
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });

    given("I am signed in to save address", () => {
      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", session);

      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          CatalogueListMockData,
      });
      // instance.getCatalogueApiMsgCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);
    });

    when("I click on add to address", () => {

      const wishlistMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      wishlistMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: wishlistMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          { message: "catalogue added to wishlist" },
      });
      // instance.updateWishlistApiCallId = wishlistMsg.messageId;
      runEngine.sendMessage("UNIT TEST", wishlistMsg);
    });

    then("Save address to UI", () => {
    });

  });

  test("User trying to save address for home text", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    let instance: LandingPage;
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });

    given("I am signed in to save address for home text", () => {
      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", session);

      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          CatalogueListMockData,
      });
      // instance.getCatalogueApiMsgCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);
    });

    when("I click on add to address for home text", () => {

      const wishlistMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      wishlistMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: wishlistMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          { message: "catalogue added to wishlist" },
      });
      // instance.updateWishlistApiCallId = wishlistMsg.messageId;
      runEngine.sendMessage("UNIT TEST", wishlistMsg);
    });

    then("Save address to UI for home text", () => {
      const mockData = { address: "ABC Street" };

    // Mock the async storage method
    (getStorageData as jest.Mock).mockResolvedValue(mockData);
    const props = { navigation: {} };
    const wrapper = shallow(<LandingPage id={""} {...props} />);
    const getStoreAddressSpy = jest.spyOn(wrapper.instance() as any, "getStoreAddress");
     (wrapper.instance() as any).getStoreDataAddress();
    wrapper.setState({ addressName: "Delivering to" });

    wrapper.findWhere((node) => typeof node.props === "function").forEach((n) => {
      if (n.name() === "handleLanguageChange") {
        n.simulate("press");
      }
    });
    (wrapper.instance() as any).handleLanguageChange();
    });

  });

  test("User trying to save address for default", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    let instance: LandingPage;
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });

    given("I am signed in to save address for default", () => {
      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", session);

      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          CatalogueListMockData,
      });
      // instance.getCatalogueApiMsgCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);
    });

    when("I click on add to address for default", () => {

      const wishlistMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      wishlistMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: wishlistMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          { message: "catalogue added to wishlist" },
      });
      // instance.updateWishlistApiCallId = wishlistMsg.messageId;
      runEngine.sendMessage("UNIT TEST", wishlistMsg);
    });

    then("Save address to UI for default", () => {
    });

  });

  test("User trying to save address for selected address", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    let instance: LandingPage;
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });

    given("I am signed in to save address for selected address", () => {
      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", session);

      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          CatalogueListMockData,
      });
      // instance.getCatalogueApiMsgCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);
    });

    when("I click on add to address for selected address", () => {

      const wishlistMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      wishlistMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: wishlistMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          { message: "catalogue added to wishlist" },
      });
      // instance.updateWishlistApiCallId = wishlistMsg.messageId;
      runEngine.sendMessage("UNIT TEST", wishlistMsg);
    });

    then("Save address to UI for selected address", () => {
    });

  });

  test("User trying to save address to load image", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    let instance: LandingPage;
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });

    given("I am signed in to save address to load image", () => {

      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", session);

      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          CatalogueListMockData,
      });
      // instance.getCatalogueApiMsgCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);
    });

    when("I click on add to address to load image", () => {

      const wishlistMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      wishlistMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: wishlistMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          { message: "catalogue added to wishlist" },
      });
      // instance.updateWishlistApiCallId = wishlistMsg.messageId;
      runEngine.sendMessage("UNIT TEST", wishlistMsg);
    });

    then("Save address to UI to load image", () => {
    });

  });

  test("User trying to save address to load image for carousel", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    let instance: LandingPage;
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });

    given("I am signed in to save address to load image for carousel", () => {
      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", session);

      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          CatalogueListMockData,
      });
      // instance.getCatalogueApiMsgCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);
    });

    when("I click on add to address to load image for carousel", () => {

      const wishlistMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      wishlistMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: wishlistMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          { message: "catalogue added to wishlist" },
      });
      // instance.updateWishlistApiCallId = wishlistMsg.messageId;
      runEngine.sendMessage("UNIT TEST", wishlistMsg);
    });

    then("Save address to UI to load image for carousel", () => {
    });

    then('should call getStoreAddress with data from getStorageData', () => {
      const mockAddressData = {
        addressselected: 'Test Address',
        latitude: 28.61,
        longitude: 77.21,
      };
      let wrapper :any ;
      const instance = wrapper.instance() 
      const getStoreAddressSpy = jest.spyOn(instance, 'getStoreAddress');
      instance.getStoreDataAddress();
      expect(getStoreAddressSpy).toHaveBeenCalledWith(mockAddressData);
    });
    

  });

  test("User trying to remove address check", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    let instance: LandingPage;
    const alertSpy = jest
      .spyOn(alert, "showAlert")
      .mockImplementation(({ okButton }) => {
        if (okButton.onPress) {
          okButton.onPress();
        }
      });

    given("I am signed in to remove address check", () => {
      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", session);

      const catalogues = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      catalogues.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogues.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          CatalogueListMockData,
      });
      // instance.getCatalogueApiMsgCallId = catalogues.messageId;
      runEngine.sendMessage("UNIT TEST", catalogues);
    });

    when("I click on to remove address check", () => {

      const wishlistMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      wishlistMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: wishlistMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          { message: "catalogue added to wishlist" },
      });
      // instance.updateWishlistApiCallId = wishlistMsg.messageId;
      runEngine.sendMessage("UNIT TEST", wishlistMsg);
    });

    then("should set address, latitude, longitude and call fetchTheCatalogues", () => {
      const localObjectMock = {
        addressselected: "Test Address",
        latitude: 12.9716,
        longitude: 77.5946,
      };
      let wrapper: any;
      const instance = wrapper.instance();
      instance.setState = jest.fn((stateUpdate, cb) => {
      })
      expect(instance.setState).toHaveBeenCalledWith({
        address: "Test Address",
        latitude: 12.9716,
        longitude: 77.5946,
      }, expect.any(Function));
      expect(Function).toHaveBeenCalledWith(
        instance.state.categorySelectStatus.value,
        1
      );
    });
  });  
});