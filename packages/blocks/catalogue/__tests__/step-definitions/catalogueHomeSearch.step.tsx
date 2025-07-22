import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { render, fireEvent } from "@testing-library/react-native";
import { jest, beforeEach, expect, describe, test } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import * as utils from "../../../../framework/src/Utilities";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";

import { Listener } from "../../__mock__/eventlistener";
import CatalogueHomeSearch from "../../src/CatalogueHomeSearch";

const listener = new Listener();
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: (_keyName: string) => {
      return {
        sizes: [1],
        colors: [1],
        minPrice: "10",
        maxPrice: "100",
      };
    },
    addListener: listener.addEventListener,
  },
  id: "Catalogue",
};

const catalogueArr = {
  data: [
    {
      id: "45",
      type: "catalogue",
      attributes: {
        sub_category: {
          id: 369,
          name: "Latest Dresses",
          created_at: "2023-09-26T13:16:14.163Z",
          updated_at: "2023-09-26T13:16:14.163Z",
          parent_id: null,
          rank: null,
        },
        brand: null,
        tags: [],
        reviews: [],
        name: "Catalogue TEST",
        sku: "123123AAA",
        description: "Test Desc",
        manufacture_date: "2023-09-26T00:00:00.000Z",
        length: null,
        breadth: null,
        height: null,
        stock_qty: 5,
        availability: "in_stock",
        weight: null,
        price: null,
        recommended: null,
        on_sale: null,
        sale_price: null,
        discount: null,
        is_wishlist: false,
        product_number: "333222",
        category: {
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
        service: null,
        images: null,
        average_rating: 0,
        catalogue_variants: [
          {
            id: "54",
            type: "catalogue_variant",
            attributes: {
              id: 54,
              catalogue_id: 45,
              catalogue_variant_color_id: 7,
              catalogue_variant_color: {
                id: 7,
                name: "Grey",
                created_at: "2023-10-05T05:19:28.122Z",
                updated_at: "2023-10-05T05:19:28.122Z",
              },
              catalogue_variant_size_id: 3,
              catalogue_variant_size: {
                id: 3,
                name: "Large",
                created_at: "2023-09-22T04:45:48.783Z",
                updated_at: "2023-09-22T04:45:48.783Z",
              },
              price: "1500.0",
              stock_qty: 4448,
              on_sale: null,
              sale_price: null,
              discount_price: null,
              length: null,
              breadth: null,
              height: null,
              created_at: "2023-11-02T13:52:02.806Z",
              updated_at: "2023-11-14T05:27:08.431Z",
              images: null,
            },
          },
        ],
      },
    },
  ],
  meta: {
    total_pages: 1,
    current_page: 1,
    total_record: 6,
    prev_page: null,
    next_page: null,
  },
};

const feature = loadFeature(
  "./__tests__/features/cataloguehomesearch-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to catalogue", ({ given, when, then }) => {
    let exampleBlockA: ShallowWrapper;
    let instance: CatalogueHomeSearch;

    given("I am a User loading catalogue", () => {
      exampleBlockA = shallow(<CatalogueHomeSearch {...screenProps} />);
    });

    when("I navigate to the catalogue", () => {
      instance = exampleBlockA.instance() as CatalogueHomeSearch;
    });

    then("catalogue will load with out errors", () => {
      expect(exampleBlockA).toBeTruthy();
    });

    then("I can click back Icon with out errors", () => {
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

      const buttonNavigate = exampleBlockA.findWhere(
        (node) => node.prop("testID") == "btnBackCatalogue"
      );
      buttonNavigate.simulate("press");
      expect(buttonNavigate.exists()).toBe(true)
    });

    then(
      "I can show token and navigation payload data with out errors",
      async () => {
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
        msgPlayloadAPI.addData(
          getName(MessageEnum.subCategoryNameMessage),
          "User-Token"
        );
        runEngine.sendMessage("Unit Test", msgPlayloadAPI);
      }
    );

    then("I can call api catalogue with out errors", async () => {
      const msggetdata = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        catalogueArr
      );

      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata.messageId
      );
      instance.getProductApiCallId = msggetdata.messageId;
      runEngine.sendMessage("Unit Test", msggetdata);
    });

    then("I can show all catalogue with list view and with out errors", () => {
      const flatlist = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "catalogue_show_flatlist_list"
      );
      flatlist.simulate("endReached");
      const item = catalogueArr.data[0];
      const renderItem = flatlist.renderProp("renderItem")({
        item: item,
        index: 0,
      });
      const buttonNavigate = renderItem.findWhere(
        (node) => node.prop("testID") == "btnCatalogueListRedirection"
      );
      buttonNavigate.simulate("press");
      flatlist.renderProp("ListEmptyComponent")({});
      expect(flatlist.exists()).toBe(true)
    });

    then("I can call api catalogue with errors", async () => {
      const msggetdata = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
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
      instance.getProductApiCallId = msggetdata.messageId;
      runEngine.sendMessage("Unit Test", msggetdata);
    });

    then("I can enter a catalogue name with out errors", () => {
      let textInputComponent = exampleBlockA.findWhere(
        (node) => node.prop("testID") === "txt_enter_catalogue"
      );
      textInputComponent.simulate("changeText", "Boss");
      textInputComponent.simulate("submitEditing");
      expect(instance.state.catalogueSearchTxt).toBe("Boss");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(exampleBlockA).toBeTruthy();
    });
  });

  test("User applied some filters", ({ given, when, then }) => {
    beforeAll(() => {
      jest
        .spyOn(utils, "getStorageData")
        .mockImplementation(async (keyName, _parse) => {
          if (keyName === "FA_LOGIN_MODE") {
            return "seller";
          }
          return "random";
        });
    });

    let screen: ReturnType<typeof render>;

    given("I am a user who applied filters", () => {
      screen = render(<CatalogueHomeSearch {...screenProps} />);
    });

    when("I visit catalogue screen", () => {
      listener.simulateListener("willFocus");

      const msggetdata = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata
      );
      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        catalogueArr
      );

      msggetdata.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msggetdata.messageId
      );
      screen.container.instance.getProductApiCallId = msggetdata.messageId;
      runEngine.sendMessage("Unit Test", msggetdata);
    });

    then("I see filtered results", () => {
      expect(
        screen.queryAllByTestId("btnCatalogueListRedirection").length
      ).toBeGreaterThan(0);
    });
  });
});

describe("Catalogue based on store id", () => {
  let screen: ReturnType<typeof render>;
  const dummyData = {
    data: [
      {
        id: "185",
        type: "catalogue",
        attributes: {
          name: "Puff Sleeves Neck Ruched Mini-Dress",
          brand: null,
          tags: {
            data: [],
          },
          reviews: [],
          sku: null,
          description: "sweetheart neck, short, black a-lines, ruched detail",
          manufacture_date: null,
          length: null,
          breadth: null,
          height: null,
          stock_qty: null,
          availability: null,
          weight: null,
          price: null,
          recommended: null,
          on_sale: null,
          sale_price: null,
          discount: null,
          is_wishlist: false,
          product_number: null,
          primary_image:
            "http://temp.image/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb1lFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6f7bfaa795d357a32a9ff749bbb13225a32ff296/profile.jpg",
          primary_price: "49.0",
          gender: "female",
          brand_name: "AAHWAN",
          material: "Polyester ",
          fit: "Slim",
          prodcut_care: "Machine Wash",
          list_the_product: "listed",
          fit_discription: null,
          category: {
            id: "65",
            type: "category",
            attributes: {
              id: 65,
              name: "Women's Clothing",
              status: "active",
              created_at: "2023-12-08T10:31:06.580Z",
              updated_at: "2023-12-14T10:56:24.931Z",
              image:
                "http://temp.image/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0FDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--65f399f30c77e45c14e0b766609fbb5797fdfc56/White.jpg",
            },
          },
          sub_category: {
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
          sub_sub_category: {
            id: "4",
            type: "sub_sub_category",
            attributes: {
              id: 4,
              name: "Midi Dresses",
              created_at: "2023-12-08T10:31:06.796Z",
              updated_at: "2023-12-08T10:31:06.796Z",
              image: "",
            },
          },
          service: null,
          average_rating: 0,
          catalogue_variants: [
            {
              id: "249",
              type: "catalogue_variant",
              attributes: {
                id: 249,
                catalogue_id: 185,
                catalogue_variant_color_id: 12,
                catalogue_variant_color: {
                  id: 12,
                  name: "Black",
                  created_at: "2024-03-06T06:42:44.507Z",
                  updated_at: "2024-03-06T06:42:44.507Z",
                },
                catalogue_variant_size_id: 1,
                catalogue_variant_size: {
                  id: 1,
                  name: "Small",
                  created_at: "2023-09-22T04:45:35.966Z",
                  updated_at: "2023-09-22T04:45:35.966Z",
                },
                price: "49.0",
                stock_qty: 50,
                on_sale: null,
                sale_price: null,
                discount_price: null,
                length: null,
                breadth: null,
                height: null,
                created_at: "2024-03-06T06:44:06.399Z",
                updated_at: "2024-03-06T06:44:06.408Z",
                sku: "AAHWANSB00001",
                low_stock_threshold: 0,
                is_listed: true,
                front_image:
                  "http://temp.image/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb1lFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6f7bfaa795d357a32a9ff749bbb13225a32ff296/profile.jpg",
                back_image:
                  "http://temp.image/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2NFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--48640e602cfa3b5382c64e9e81cf71f31e2428bc/profile.jpg",
                side_image: "",
                pair_it_with: [],
              },
            },
            {
              id: "250",
              type: "catalogue_variant",
              attributes: {
                id: 250,
                catalogue_id: 185,
                catalogue_variant_color_id: 12,
                catalogue_variant_color: {
                  id: 12,
                  name: "Black",
                  created_at: "2024-03-06T06:42:44.507Z",
                  updated_at: "2024-03-06T06:42:44.507Z",
                },
                catalogue_variant_size_id: 9,
                catalogue_variant_size: {
                  id: 9,
                  name: "Medium",
                  created_at: "2024-03-06T05:53:50.617Z",
                  updated_at: "2024-03-06T05:53:50.617Z",
                },
                price: "45.0",
                stock_qty: 40,
                on_sale: null,
                sale_price: null,
                discount_price: null,
                length: null,
                breadth: null,
                height: null,
                created_at: "2024-03-06T06:44:06.408Z",
                updated_at: "2024-03-06T06:44:06.416Z",
                sku: "AAHWANMB00001",
                low_stock_threshold: 0,
                is_listed: true,
                front_image:
                  "http://temp.image/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2dFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--67a14eb4f58916799a5098914c918bb5ee2c058b/profile.jpg",
                back_image:
                  "http://temp.image/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2tFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7c84360994240d98961d082161d600f232fc393c/profile.jpg",
                side_image: "",
                pair_it_with: [],
              },
            },
          ],
        },
      },
    ],
    meta: {
      total_pages: 1,
      current_page: 1,
      total_record: 1,
      prev_page: null,
      next_page: null,
    },
  };

  beforeEach(() => {
    screen = render(<CatalogueHomeSearch {...screenProps} />);

    const navMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    navMsg.initializeFromObject({
      [getName(MessageEnum.SubCategoryIdMessage)]: "4",
      [getName(MessageEnum.subCategoryNameMessage)]: "Mini Dress",
      [getName(MessageEnum.ShowByStoreId)]: "",
      [getName(MessageEnum.navigationTokenMessage)]: "TOKEN",
    });
    runEngine.sendMessage("Unit Test", navMsg);
    navMsg.addData(getName(MessageEnum.ShowByStoreId), "");
    runEngine.sendMessage("Unit Test", navMsg);

    const sessionMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    sessionMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("Unit Test", sessionMsg);

    const { container } = screen;
    const catalogueMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    catalogueMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: catalogueMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyData,
    });
    container.instance.getProductApiCallId = catalogueMsg.messageId;
    runEngine.sendMessage("Unit Test", catalogueMsg);
  });

  test("Seller can see his store catalogues", () => {
    const { queryByTestId } = screen;
    expect(queryByTestId("emptyComp")).toBeNull();
  });

  test("Seller can search his catalogues based on store", () => {
    const { getByTestId, container } = screen;

    const navMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    navMsg.initializeFromObject({
      [getName(MessageEnum.SubCategoryIdMessage)]: "4",
      [getName(MessageEnum.subCategoryNameMessage)]: "Mini Dress",
      [getName(MessageEnum.ShowByStoreId)]: "88",
      [getName(MessageEnum.navigationTokenMessage)]: "TOKEN",
    });
    runEngine.sendMessage("Unit Test", navMsg);
    const sessionMsg = new Message(getName(MessageEnum.SessionResponseMessage));
    sessionMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("Unit Test", sessionMsg);

    const search = getByTestId("txt_enter_catalogue");

    // Success
    fireEvent.changeText(search, "Ruched");
    fireEvent(search, "onSubmitEditing");
    const catalogueSuccessMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    catalogueSuccessMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        catalogueSuccessMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: dummyData,
    });
    container.instance.getProductApiCallId = catalogueSuccessMsg.messageId;
    runEngine.sendMessage("Unit Test", catalogueSuccessMsg);

    // Failure
    fireEvent.changeText(search, "random");
    fireEvent(search, "onSubmitEditing");
    const catalogueErrorMsg = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    catalogueErrorMsg.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        catalogueErrorMsg.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        errors: "Catalogues not found.",
      },
    });
    container.instance.getProductApiCallId = catalogueErrorMsg.messageId;
    runEngine.sendMessage("Unit Test", catalogueErrorMsg);
  });
});
