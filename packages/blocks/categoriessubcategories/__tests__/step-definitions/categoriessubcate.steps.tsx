import React from "react";
import { jest, describe, expect, test, beforeAll } from "@jest/globals";
import { shallow, ShallowWrapper } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import CategoriesSubCate from "../../src/CategoriesSubCate";

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
  id: "CategoriesSubCate",
};

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

const mock = jest.fn();
let CategoriesSubCateData = <CategoriesSubCate {...screenProps} />;

describe("category catalogue page first", () => {
  let splashWrapper: ShallowWrapper;
  splashWrapper = shallow(<CategoriesSubCate {...screenProps} />);
  let instance: CategoriesSubCate;

  instance = splashWrapper.instance() as CategoriesSubCate;
  instance.isFocused.current = true;

  test("should render other category subcategory page show drawing screen without crashing", async () => {
    const rendered = render(CategoriesSubCateData);
    expect(rendered).toBeTruthy();
  });

  test("should find the testId btnBackSubSubCategory", () => {
    const testTestName = "btnBackSubSubCategory";
    const { getByTestId } = render(CategoriesSubCateData);
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
    msgPlayloadAPI.addData(getName(MessageEnum.categoryIdMessage), 1);
    runEngine.sendMessage("Unit Test", msgPlayloadAPI);

    const msgPlayloadCategoryAPI = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    msgPlayloadCategoryAPI.addData(
      getName(MessageEnum.categoryArrMessage),
      categoryObject
    );
    runEngine.sendMessage("Unit Test", msgPlayloadCategoryAPI);
  });

  test("I can show all category view sub category", () => {
    const flatlist = splashWrapper.findWhere(
      (node) => node.prop("testID") === "category_data_show"
    );
    const item = categoryObject.data[0];
    const renderItem = flatlist.renderProp("renderItem")({
      item: item,
      index: 0,
    });

    const buttonNavigate = renderItem.findWhere(
      (node) => node.prop("testID") == "btn_selected_category"
    );
    buttonNavigate.simulate("press");
    flatlist.renderProp("keyExtractor")("3");
    flatlist.renderProp("ItemSeparatorComponent")({});
  });

  test("I can enter a sub sub category with out errors", () => {
    let textInputComponent = splashWrapper.findWhere(
      (node) => node.prop("testID") === "txt_enter_sub_subcategory"
    );
    textInputComponent.simulate("changeText", "Boss");
    textInputComponent.simulate("submitEditing");
    expect(instance.state.subCategorySearchTxt).toBe("Boss");
  });

  test("when i reach end it should go for lazy loading in sub category", async () => {
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
    instance.getSubCategoryApiCallId = msggetdata.messageId;
    runEngine.sendMessage("Unit Test", msggetdata);
  });

  test("I can show all sub category view and show sub-sub category", () => {
    const flatlist = splashWrapper.findWhere(
      (node) => node.prop("testID") === "subcategory_list_show"
    );
    const item = categoryObject.data[0];
    const renderItem = flatlist.renderProp("renderItem")({
      item: item,
      index: 0,
    });

    const buttonNavigate = renderItem.findWhere(
      (node) => node.prop("testID") == "btn_select_subCategory"
    );
    buttonNavigate.simulate("press");
    flatlist.renderProp("keyExtractor")("3");
    flatlist.renderProp("ItemSeparatorComponent")({});
  });

  test("when i reach end it should go for lazy loading in sub-sub- category", async () => {
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
    instance.getSubSubCategoryApiCallId = msggetdata.messageId;
    runEngine.sendMessage("Unit Test", msggetdata);
  });

  test("I can show all sub category view and redriect to catalogue", () => {
    const flatlist = splashWrapper.findWhere(
      (node) => node.prop("testID") === "sub_sub_cate_show_flatlist"
    );
    const item = categoryObject.data[0];
    const renderItem = flatlist.renderProp("renderItem")({
      item: item,
      index: 0,
    });

    const buttonNavigate = renderItem.findWhere(
      (node) => node.prop("testID") == "btnSubCateCatalogueRedirect"
    );
    buttonNavigate.simulate("press");
    flatlist.renderProp("keyExtractor")("3");
  });

  test("when i reach end it should go for lazy loading in sub category with errors", async () => {
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
    instance.getSubCategoryApiCallId = msggetdata.messageId;
    runEngine.sendMessage("Unit Test", msggetdata);
  });
});

describe("category catalogue seller point of view", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    screen = render(<CategoriesSubCate {...screenProps} />);

    const tokenMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("Unit Test", tokenMsg);

    screen.container.instance.isFocused.current = true;
    const nav = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    nav.initializeFromObject({
      [getName(MessageEnum.ShowByStoreId)]: "88",
      [getName(MessageEnum.categoryIdMessage)]: "55",
      [getName(MessageEnum.categoryArrMessage)]: [
        {
          id: "65",
          type: "category",
          attributes: {
            id: 65,
            name: "Women's Clothing",
            status: "active",
            created_at: "2023-12-08T10:31:06.580Z",
            updated_at: "2023-12-14T10:56:24.931Z",
            image:
              "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--65f399f30c77e45c14e0b766609fbb5797fdfc56/White.jpg",
          },
        },
      ],
      [getName(MessageEnum.categoryArrNameMessage)]: "Women's Clothing",
    });
    runEngine.sendMessage("Unit Test", nav);
  });

  test("Seller can see sub categories", () => {
    const subCategoryMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    subCategoryMsg.initializeFromObject({
      [getName(
        MessageEnum.RestAPIResponceDataMessage
      )]: subCategoryMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        data: [
          {
            id: "435",
            type: "sub_category",
            attributes: {
              id: 435,
              name: "Dresses",
              created_at: "2023-12-08T10:31:06.697Z",
              updated_at: "2023-12-08T10:31:06.697Z",
              image: "",
            },
          },
        ],
      },
    });
    screen.container.instance.getSubCategoryApiCallId =
      subCategoryMsg.messageId;
    runEngine.sendMessage("Unit Test", subCategoryMsg);
  });

  test("Seller can fetch sub sub categories", () => {
    const subCategory = screen.getByTestId("btn_select_subCategory");
    fireEvent.press(subCategory);
  });
});
