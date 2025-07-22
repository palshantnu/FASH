import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";

import React from "react";
import AddProduct from "../../src/AddProduct";
import { jest, beforeEach, expect } from "@jest/globals";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: () => {},
    addListener: (param: string, callback: any) => {
      callback();
    },
  },
  id: "AddProduct",
};

const feature = loadFeature("./__tests__/features/addproduct-scenario.feature");

const categoryMockData = {
  data: [
    {
      id: "61",
      type: "category",
      attributes: {
        id: 61,
        name: "New Arrivals",
        status: "active",
        created_at: "2023-09-26T13:16:14.144Z",
        updated_at: "2023-12-14T10:59:32.550Z",
        image:
          "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0VDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2c0f94a1617712d435117e462e7815fcb5bd0f62/tshirt.jpg",
      },
    },
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
};

const subCategoryMockData = {
  data: [
    {
      id: "470",
      type: "sub_category",
      attributes: {
        id: 470,
        name: "Women's New In",
        created_at: "2023-12-08T10:31:08.939Z",
        updated_at: "2023-12-14T11:01:57.062Z",
        image:
          "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0lDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--585919f0cbb296aa4fadb91bb4dec8cdb3f944e6/captain.jpg",
      },
    },
    {
      id: "472",
      type: "sub_category",
      attributes: {
        id: 472,
        name: "Kids' New In",
        created_at: "2023-12-08T10:31:09.085Z",
        updated_at: "2023-12-19T12:56:32.862Z",
        image:
          "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcVFDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cd216fa32c1e54c023b4f42ebfad35e78fa51d32/1.2MB.jpg",
      },
    },
  ],
};

const subsubCategoryMock = {
  data: [
    {
      id: "117",
      type: "sub_sub_category",
      attributes: {
        id: 117,
        name: "Latest Dresses",
        created_at: "2023-12-08T10:31:08.952Z",
        updated_at: "2023-12-08T10:31:08.952Z",
        image: "",
      },
    },
    {
      id: "118",
      type: "sub_sub_category",
      attributes: {
        id: 118,
        name: "New Tops",
        created_at: "2023-12-08T10:31:08.966Z",
        updated_at: "2023-12-15T10:31:49.921Z",
        image:
          "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcElDIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9ee2f4d6678f2544ddc65d06820def93ef63f9bd/pexels-lisa-fotios-1540258.jpg",
      },
    },
  ],
};

const productNameMockData = {
  exists: true,
};

const productNameMockFalseData = {
  exists: false,
};

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.spyOn(runEngine, "sendMessage");
  });

  test("User navigates to addproduct", ({ given, when, then }) => {
    let addProductWrapper: ShallowWrapper;
    let instance: AddProduct;

    given("I am a User loading addproduct", () => {
      addProductWrapper = shallow(<AddProduct {...screenProps} />);
    });

    when("I navigate to the addproduct", () => {
      instance = addProductWrapper.instance() as AddProduct;
    });

    then("addproduct will load with out errors", () => {
      expect(addProductWrapper).toBeTruthy();
    });
    then("Set token from session response", () => {
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const receivedReqApiMessage = new Message(
        getName(MessageEnum.AccoutLoginSuccess)
      );

      receivedReqApiMessage.addData(
        getName(MessageEnum.AuthTokenDataMessage),
        "tokenstring"
      );
      instance.receive("from", receivedReqApiMessage);

      runEngine.sendMessage("Unit Test", receivedReqApiMessage);
    });
    when("As a user i can enter the product name", () => {
      const buttonNavigateNext = addProductWrapper.findWhere(
        (node) => node.prop("testID") == "Nextbutton"
      );
      buttonNavigateNext.simulate("press");
      let touchWithoutFeed = addProductWrapper.findWhere(
        (node) => node.prop("testID") == "touchWithoutFeed"
      );
      touchWithoutFeed.simulate("press");
      let inpProductName = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductName"
      );
      inpProductName.props().onSubmitEditing();

      inpProductName.simulate("changeText", "");

      expect(addProductWrapper.state("productName")).toBe("");
    });

    then("I can select gender", () => {
      let inpGender = addProductWrapper.findWhere(
        (node) => node.prop("testID") == "selectGender"
      );

      inpGender.simulate("press");
    });

    then("I can select category", () => {
      let inpCategory = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "selectCategory"
      );

      inpCategory.simulate("focus");

      const categoryApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      categoryApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        categoryApi.messageId
      );
      categoryApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        categoryMockData
      );
      instance.getcategoriesApiCallMsgId = categoryApi.messageId;
      runEngine.sendMessage("Test", categoryApi);
      inpCategory.simulate("press");
    });

    then("I can select subcategory", () => {
      instance.setState({
        categoriesSelectedIdForSubCategories: 61,
      });
      let inpCategorys = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "selectSubCategory"
      );

      inpCategorys.simulate("focus");
      let inpCategory = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "selectSubCategory"
      );

      inpCategory.simulate("focus");
      const categoryApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      categoryApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        categoryApi.messageId
      );
      categoryApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        subCategoryMockData
      );
      instance.getSubcategoriesApiCallMsgId = categoryApi.messageId;
      runEngine.sendMessage("Test", categoryApi);
      inpCategory.simulate("press");
    });

    then("I can select subSubcategory", () => {
      instance.setState({
        subCategory: "470",
      });
      let inpCategory = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "selectSubSubCategory"
      );

      inpCategory.simulate("focus");
      const categoryApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      categoryApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        categoryApi.messageId
      );
      categoryApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        subsubCategoryMock
      );
      instance.getSubSubCategoriesApiCallMsgId = categoryApi.messageId;
      runEngine.sendMessage("Test", categoryApi);
      inpCategory.simulate("press");
    });

    when("As a user i can enter the brand name", () => {
      let inpBrand = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputBrand"
      );

      inpBrand.simulate("changeText", "Nike");
      expect(addProductWrapper.state("brand")).toBe("Nike");
    });

    then("As a user i can select listed button", () => {
      let btnDropDownComponent = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "listRadioBtn"
      );
      btnDropDownComponent.simulate("press");
      instance.setState({ isListed: true });

      expect(addProductWrapper).toBeTruthy();
    });

    then("As a user i can select unlisted button", () => {
      let btnDropDownComponent = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "unlistRadioBtn"
      );
      btnDropDownComponent.simulate("press");
      instance.setState({ isUnlisted: true });

      expect(addProductWrapper).toBeTruthy();
    });

    when("As a user i can enter the material name", () => {
      // instance.handleProductNameExistingResponse(productNameMockData)
      let txtInputMaterial = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputMaterial"
      );

      txtInputMaterial.simulate("changeText", "cotan");
      expect(addProductWrapper.state("material")).toBe("cotan");
    });

    when("As a user i can enter the fit", () => {
      let txtInputFit = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputFit"
      );

      txtInputFit.simulate("changeText", "small");
      expect(addProductWrapper.state("fit")).toBe("small");
    });

    when("As a user i can enter the product care", () => {
      let txtInputProductCare = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductCare"
      );

      txtInputProductCare.simulate("changeText", "aaaa");
      expect(addProductWrapper.state("productCare")).toBe("aaaa");
    });

    when("As a user i can enter the product description", () => {
      let txtInputProductDescription = addProductWrapper.findWhere(
        (node) => node.prop("testID") === "txtInputProductDescription"
      );

      txtInputProductDescription.simulate("changeText", "this is the");
      expect(addProductWrapper.state("productDescription")).toBe("this is the");
    });

    when(
      "As a user i enter the all the details and checking unique name",
      () => {
        let inpProductName = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputProductName"
        );
        let inpProductNameArabic = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputProductNameArabic"
        );
        let txtInputMaterialArabic = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputMaterialArabic"
        );
        let txtInputMaterial = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputMaterial"
        );
        let txtInputFit = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputFit"
        );
        let txtInputFitArabic = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputFitArabic"
        );
        let txtInputProductCare = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputProductCare"
        );
        let txtInputProductCareArabic = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputProductCareArabic"
        );

        let txtInputProductDescription = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputProductDescription"
        );
        let txtInputProductDescriptionArabic = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputProductDescriptionArabic"
        );
        let inpGender = addProductWrapper.findWhere(
          (node) => node.prop("testID") == "selectGender"
        );

        inpGender.simulate("press");
        txtInputProductCare.simulate("changeText", "kk ramn");
        txtInputProductCareArabic.simulate("changeText", "kk ramn arabic");
        txtInputFit.simulate("changeText", "full");
        txtInputFitArabic.simulate("changeText", "full Arabic");

        txtInputMaterial.simulate("changeText", "cotten");
        txtInputMaterialArabic.simulate("changeText", "cotten arabic");

        inpProductName.simulate("changeText", "wagon t-shirt");
        inpProductNameArabic.simulate("changeText", "product name");
        txtInputProductDescription.simulate("changeText", "big t shiers");
        txtInputProductDescriptionArabic.simulate(
          "changeText",
          "big t shiers arabic"
        );
        let inpBrand = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputBrand"
        );

        inpBrand.simulate("changeText", "Nike");
        instance.setState({
          categoriesSelectedIdForSubCategories: 61,
          subCategory: "470",
        });

        const categoryApi = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        categoryApi.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          categoryApi.messageId
        );
        categoryApi.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          productNameMockData
        );
        instance.getProductNameExistingApiCallMsgId = categoryApi.messageId;
        runEngine.sendMessage("Test", categoryApi);
      }
    );

    then(
      "As a user enter the next button without entering the value it throws an error",
      () => {
        let inpProductName = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputProductName"
        );
        let txtInputMaterial = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputMaterial"
        );
        let txtInputFit = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputFit"
        );
        let txtInputProductCare = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputProductCare"
        );

        let txtInputProductDescription = addProductWrapper.findWhere(
          (node) => node.prop("testID") === "txtInputProductDescription"
        );
        txtInputProductCare.simulate("changeText", "");

        txtInputFit.simulate("changeText", "");

        txtInputMaterial.simulate("changeText", "");

        inpProductName.simulate("changeText", "");
        txtInputProductDescription.simulate("changeText", "");

        const categoryApi = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        categoryApi.addData(
          getName(MessageEnum.RestAPIResponceDataMessage),
          categoryApi.messageId
        );
        categoryApi.addData(
          getName(MessageEnum.RestAPIResponceSuccessMessage),
          productNameMockFalseData
        );
        instance.getProductNameExistingApiCallMsgId = categoryApi.messageId;
        runEngine.sendMessage("Test", categoryApi);
      }
    );

    then("I can click back Icon with out errors", () => {
      const msgToken = new Message(getName(MessageEnum.SessionResponseMessage));
      msgToken.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", msgToken);

      const buttonNavigateBack = addProductWrapper.findWhere(
        (node) => node.prop("testID") == "btnBackCatalogue"
      );
      buttonNavigateBack.simulate("press");


      const buttonBack = addProductWrapper.findWhere(
        (node) => node.prop("testID") == "btnBack"
      );
      buttonBack.simulate("press");
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(addProductWrapper).toBeTruthy();
    });

    when("i add data in input product name", () => {
      const txtInputProductName = addProductWrapper.findWhere(
        (node) => node.prop("testID") == "txtInputProductName"
      );
      txtInputProductName.simulate("changeText", "hh");
    });
    then("i can see the added input", () => {
      const txtInputProductName = addProductWrapper.findWhere(
        (node) => node.prop("testID") == "txtInputProductName"
      );
      expect(txtInputProductName.props().value).toBe("hh");
    });
  });

  test("User navigates to hide scroll indicator", ({ given, when, then }) => {
    let addProductWrapper: ShallowWrapper;
    let instance: AddProduct;

    given("I am a User loading to hide scroll indicator", () => {
      addProductWrapper = shallow(<AddProduct {...screenProps} />);
    });

    when("I navigate to hide scroll indicator", () => {
      instance = addProductWrapper.instance() as AddProduct;
    });

    then("i can see the to hide scroll indicatort", () => {
      const txtInputProductName = addProductWrapper.findWhere(
        (node) => node.prop("testID") == "txtInputProductName"
      );
      expect(txtInputProductName.props().value).toBe("");
      instance.handleSelctGender({ label: "string", value: "1" });
      instance.handleSelctGender({ label: "string", value: "2" });
      instance.handleSelctGenderArabic({ label: "string", value: "1" });
      instance.handleSelctGenderArabic({ label: "string", value: "2" });
    });
  });
});
