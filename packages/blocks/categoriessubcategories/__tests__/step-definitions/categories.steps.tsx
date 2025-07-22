import React from "react";
import { jest, describe, expect, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
import { shallow, ShallowWrapper } from "enzyme";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import Categories from "../../src/Categories";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: (playlist_id: any, topic_id: any) => {},
    addListener: (param: string, callback: any) => {
      callback();
    },
    dispatch: jest.fn(),
  },
  id: "Categories",
};

const mock = jest.fn();
const CategoriesData = <Categories {...screenProps} />;

const categoryObject = {
  data: [
    {
      id: "3",
      type: "category",
      attributes: {
        id: 3,
        name: "Accessories",
        status: "active",
        created_at: "2023-09-20T11:34:56.213Z",
        updated_at: "2023-10-06T05:21:39.204Z",
        image: "",
      },
    },
    {
      id: "61",
      type: "category",
      attributes: {
        id: 61,
        name: "New Arrivals",
        status: "active",
        created_at: "2023-09-26T13:16:14.144Z",
        updated_at: "2023-10-27T04:50:03.073Z",
        image:
          "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBNUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--900ce3a3c57ed0c3c6f95e4b2098110a86a3731c/Image%20Pasted%20at%202023-9-13%2018-22%20(1).png",
      },
    },
  ],
};

const shopObject = {
  data: {
    data: [
      {
        id: "8",
        type: "bussiness",
        attributes: {
          store_name: "store 13",
          registration_number: "reg 1113rrr",
          name: null,
          contact_number: null,
          street: null,
          zipcode: null,
          area: "dgdfg",
          block: null,
          city: "dgd",
          building_house: null,
          floor: null,
          apartment_number: null,
          no_of_stores: 1,
          driver_instruction: null,
          store_operating_hours: null,
          additional_time_slot: null,
          average_shipping_time: null,
          images: null,
        },
      },
      {
        id: "3",
        type: "bussiness",
        attributes: {
          store_name: "store 1111",
          registration_number: "reg 111",
          name: null,
          contact_number: null,
          street: null,
          zipcode: null,
          area: "dgdfg",
          block: null,
          city: "dgd",
          building_house: null,
          floor: null,
          apartment_number: null,
          no_of_stores: 1,
          driver_instruction: null,
          store_operating_hours: null,
          additional_time_slot: null,
          average_shipping_time: null,
          images: null,
        },
      },
    ],
  },
  meta: {
    total_pages: 1,
    current_page: 1,
    total_record: 6,
    prev_page: null,
    next_page: null,
  },
};

describe("Landing page first", () => {
  let splashWrapper: ShallowWrapper;
  splashWrapper = shallow(<Categories {...screenProps} />);
  let instance: Categories;

  instance = splashWrapper.instance() as Categories;

  test("should render other landing page show drawing screen without crashing", async () => {
    const rendered = render(CategoriesData);
    expect(rendered).toBeTruthy();
  });

  test("should find the testId btnBackCategory", () => {
    const testTestName = "btnBackCategory";
    const { getByTestId } = render(CategoriesData);
    const foundButton = getByTestId(testTestName);
    fireEvent.press(getByTestId(testTestName));
    expect(foundButton).toBeTruthy();
  });

  test("when i reach end and get token and navigation playload", async () => {
    const msgTokenAPI = new Message(
      getName(MessageEnum.SessionResponseMessage)
    );
    msgTokenAPI.addData(
      getName(MessageEnum.SessionResponseToken),
      "User-Token"
    );
    runEngine.sendMessage("Unit Test", msgTokenAPI);

    const msgPlayloadAPI = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    msgPlayloadAPI.addData(getName(MessageEnum.catalogueType), "category");
    runEngine.sendMessage("Unit Test", msgPlayloadAPI);
  });

  test("when i reach end it should go for lazy loading in category", async () => {
    const msggetdata = new Message(getName(MessageEnum.RestAPIResponceMessage));
    msggetdata.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msggetdata
    );
    msggetdata.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      categoryObject
    );

    msggetdata.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msggetdata.messageId
    );
    instance.getCategoryApiCallId = msggetdata.messageId;
    runEngine.sendMessage("Unit Test", msggetdata);
  });

  test("I can show all category view sub category and redirect to product", () => {
    const flatlist = splashWrapper.findWhere(
      (node) => node.prop("testID") === "cate_show_flatlist_list"
    );
    const item = categoryObject.data[0];
    const renderItem = flatlist.renderProp("renderItem")({
      item: item,
      index: 0,
    });

    const buttonNavigate = renderItem.findWhere(
      (node) => node.prop("testID") == "btnSubCateRedirectListView"
    );
    buttonNavigate.simulate("press");
    flatlist.renderProp("keyExtractor")("3");
    flatlist.renderProp("ListEmptyComponent")({});
  });

  test("I can enter a shop name with out errors", () => {
    const msgPlayloadAPI = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    msgPlayloadAPI.addData(getName(MessageEnum.catalogueType), "store");
    runEngine.sendMessage("Unit Test", msgPlayloadAPI);
    let textInputComponent = splashWrapper.findWhere(
      (node) => node.prop("testID") === "txt_enter_shippment_shipper"
    );
    textInputComponent.simulate("changeText", "Boss");
    textInputComponent.simulate("submitEditing");
    expect(instance.state.shopSearchTxt).toBe("Boss");
  });

  test("when i reach end it should go for lazy loading in shop", async () => {
    const msggetdata = new Message(getName(MessageEnum.RestAPIResponceMessage));
    msggetdata.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msggetdata
    );
    msggetdata.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      shopObject
    );

    msggetdata.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msggetdata.messageId
    );
    instance.getShopApiCallId = msggetdata.messageId;
    runEngine.sendMessage("Unit Test", msggetdata);

    const flatlist = splashWrapper.findWhere(
      (node) => node.prop("testID") === "shopShowFlatlist"
    );

    flatlist.simulate("endReached");
  });

  test("I can show all shop and redirect to shop detail", () => {
    const flatlist = splashWrapper.findWhere(
      (node) => node.prop("testID") === "shopShowFlatlist"
    );
    const item = categoryObject.data[0];
    const renderItem = flatlist.renderProp("renderItem")({
      item: item,
      index: 0,
    });

    const buttonNavigate = renderItem.findWhere(
      (node) => node.prop("testID") == "btnShopDetailRedirect"
    );
    buttonNavigate.simulate("press");
    flatlist.renderProp("ListEmptyComponent")({});
  });

  test("when i reach end it should go for lazy loading in shop with errors", async () => {
    const msggetdata = new Message(getName(MessageEnum.RestAPIResponceMessage));
    msggetdata.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msggetdata
    );
    msggetdata.addData(getName(MessageEnum.RestAPIResponceErrorMessage), {
      error: "",
    });

    msggetdata.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msggetdata.messageId
    );
    instance.getShopApiCallId = msggetdata.messageId;
    runEngine.sendMessage("Unit Test", msggetdata);
  });

});
