import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CategoriesCatalogue from "../../src/CategoriesCatalogue";
const navigation = require("react-navigation");

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    pop: jest.fn(),
    addListener: jest.fn().mockImplementation((event, callback: any) => {
      if (event === "focus") {
        callback();
      }
      if (event === "willFocus") {
        callback();
      }
      if (event === "didFocus") {
        callback();
      }
      if (event === "willBlur") {
        callback();
      }
      if (event === "didBlur") {
        callback();
      }
    }),
  },
  id: "CategoriesCatalogue"
};

const feature = loadFeature(
  "./__tests__/features/categoriesCatalogue-scenario.feature"
);
const unitTestData={
  data: {attributes:{id_proof:{record:{role:""}}}}
}

const unitTest = {
  data: [
    {
      id: "4",
      type: "category",
      attributes: {
        id: 4,
        name: "category_3",
        created_at: "2020-10-07T06:56:28.270Z",
        updated_at: "2020-10-07T06:56:28.270Z",
        sub_categories: [
          {
            id: 4,
            name: "sub_category_1",
            created_at: "2020-10-07T06:57:11.436Z",
            updated_at: "2020-10-07T06:57:11.436Z"
          }
        ]
      }
    }
  ]
}

defineFeature(feature, test => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to CategoriesCatalogue", ({ given, when, then }) => {
    let categoryWrapper: ShallowWrapper;
    let categoryInstance: CategoriesCatalogue;

    given("I am a User loading CategoriesCatalogue", () => {
      categoryWrapper = shallow(<CategoriesCatalogue {...screenProps} />);
      categoryInstance = categoryWrapper.instance() as CategoriesCatalogue;
    });

    when("I navigate to the CategoriesCatalogue", () => {
      categoryInstance = categoryWrapper.instance() as CategoriesCatalogue;
    });

    then("CategoriesCatalogue will load with out errors", () => {
      const getCategoriesAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCategoriesAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoriesAPI.messageId
      );
      getCategoriesAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        unitTestData
      );
      categoryInstance.getUserApiCallIDs = getCategoriesAPI.messageId;
      runEngine.sendMessage("Unit Test", getCategoriesAPI);
      const CustomCheckBoxssss = categoryWrapper.findWhere(
        (node) => node.prop("testID") == "btnStoreRedirect"
      )
      CustomCheckBoxssss.simulate('press')
      const CustomCheckBox = categoryWrapper.findWhere(
        (node) => node.prop("testID") == "btnCategoryRedirect"
      )
      CustomCheckBox.simulate('press')
    });

    then("I can leave the screen with out errors", () => {
      categoryInstance.getCategoriresData('ar')
      const getCategoriesAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCategoriesAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCategoriesAPI.messageId
      );
      getCategoriesAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        unitTest
      );
      categoryInstance.getCategorysApiCallId = getCategoriesAPI.messageId;
      runEngine.sendMessage("Unit Test", getCategoriesAPI);
      const CustomCheckBox = categoryWrapper.findWhere(
        (node) => node.prop("testID") == "btnBackCatalogue"
      )
      CustomCheckBox.simulate('press')
      
    });
    then("either it is loaded from stylist or buyer",()=>{
      categoryInstance.setState({isItfromstylist:true})
      categoryInstance.setState({isItfromstylist:false})
      const CustomCheckBox = categoryWrapper.findWhere(
        (node) => node.prop("testID") == "btnBackCatalogue"
      )
      CustomCheckBox.simulate('press')
    })
  });


});
