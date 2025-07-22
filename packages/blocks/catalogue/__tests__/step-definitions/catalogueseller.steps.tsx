import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { beforeEach, jest, expect } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import React from "react";
import CatalogueSeller from "../../src/CatalogueSeller";

const screenProps = {
  navigation: {
    goBack: jest.fn(),
    navigate: jest.fn(),
    getParam: (playlist_id: any,topic_id:any) => {
    },
    addListener:(param:string,callback:any)=>{
      callback()
    },
  },
  id: "CatalogueSeller",
};

const AllCatalogueMockList={
  "data": [
    {
      "id": "147",
      "type": "catalogue",
      "attributes": {
        "primary_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ0lFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--40fb257dd1154ca9a67d12f3b37ffaf24d1630a0/profile.jpg",
        "name": "nna",
        "description": "nana",
        "primary_price": "10000.0"
      }
    },
    {
      "id": "148",
      "type": "catalogue",
      "attributes": {
        "primary_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ0lFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--40fb257dd1154ca9a67d12f3b37ffaf24d1630a0/profile.jpg",
        "name": "nna",
        "description": "nanass",
        "primary_price": "10000.0"
      }
    },
    {
      "id": "149",
      "type": "catalogue",
      "attributes": {
        "primary_image": null,
        "name": "nna",
        "description": "nanaaa",
        "primary_price": "10000.0"
      }
    },
    {
      "id": "150",
      "type": "catalogue",
      "attributes": {
        "primary_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ0lFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--40fb257dd1154ca9a67d12f3b37ffaf24d1630a0/profile.jpg",
        "name": "nna",
        "description": "nanaaa",
        "primary_price": null
      }
    },
    
    
   
  ],
  "meta": {
    "total_pages": 10,
    "current_page": 1,
    "total_record": 100,
    "prev_page": null,
    "next_page": 2
  }
}

const SearchCatalougeMockList={
  "data": [
    {
      "id": "147",
      "type": "catalogue",
      "attributes": {
        "primary_image": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ0lFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--40fb257dd1154ca9a67d12f3b37ffaf24d1630a0/profile.jpg",
        "name": "nna",
        "description": "nana",
        "primary_price": "10000.0"
      }
    }
  ],
  "meta": {
    "total_pages": 1,
    "current_page": 1,
    "total_record": 1,
    "prev_page": null,
    "next_page": null
  }
}



const feature = loadFeature(
  "./__tests__/features/catalogueseller-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to catalogueseller", ({ given, when, then }) => {
    let catalogueSellerWrapper: ShallowWrapper;
    let instance: CatalogueSeller;

    given("I am a User loading catalogueseller", () => {
      catalogueSellerWrapper = shallow(<CatalogueSeller {...screenProps} />);
    });

    when("I navigate to the catalogueseller", () => {
      instance = catalogueSellerWrapper.instance() as CatalogueSeller;
    });

    then("catalogueseller will load with out errors", () => {
      expect(catalogueSellerWrapper).toBeTruthy();
    });
    then("Set token from session response", () => {
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


    
    then("I can close the modal", () => {
      const backButton = catalogueSellerWrapper.findWhere(
        (node) => node.prop("testID") == "btnBackCatalogue"
      );
      backButton.simulate("press");

      const buttonNavigate = catalogueSellerWrapper.findWhere(
        (node) => node.prop("testID") == "closeBtn"
      );
      buttonNavigate.simulate("press");
      const manualButton = catalogueSellerWrapper.findWhere(
        (node) => node.prop("testID") == "manualBtn"
      );
      manualButton.simulate("press");

      const excelSheetButton = catalogueSellerWrapper.findWhere(
        (node) => node.prop("testID") == "excelsheetbtn"
      );
      excelSheetButton.simulate("press");

      const cancelBtn = catalogueSellerWrapper.findWhere(
        (node) => node.prop("testID") == "cancelBtn"
      );
      cancelBtn.simulate("press");
      instance.setState({ modalVisible: false });
    });

    then("show the catalogue list",()=>{
    
      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        AllCatalogueMockList
      );
      instance.getAllCatalogueApiCallId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);
      const expectedCatalougeList = [
        { "id": 1, "type": "addProduct" },
        ...AllCatalogueMockList.data
      ];
      
      expect(catalogueSellerWrapper.state("catalougeList")).toStrictEqual(expectedCatalougeList)
    })
    then("I can show all catalogue with list view and with out errors", () => {
      const flatlist = catalogueSellerWrapper.findWhere(
        (node)=>node.prop("testID") === "catalogue_show_flatlist_list"
      )
      flatlist.simulate("endReached")
      const item = AllCatalogueMockList.data[0]
      const renderItem = flatlist.renderProp("renderItem")({item:item,index:0})
      const buttonNavigate = renderItem.findWhere(
          (node) => node.prop("testID") == "btnCatalogueListRedirection"
      )
      buttonNavigate.simulate("press")
      const item1= { "id": 1, "type": "addProduct" }
      flatlist.renderProp("renderItem")({item:item1,index:0})
      const item2= { }
      flatlist.renderProp("ListEmptyComponent")({item:item2})
    });

   
    then("I can search the catalogue",()=>{
      const searchInputBox = catalogueSellerWrapper.findWhere(
        (node) => node.prop("testID") == "searchInputBox"
      );
      searchInputBox.simulate("changeText","nna")
      expect(catalogueSellerWrapper.state("catalogueSearchTxt")).toBe("nna");
    })
  

    then("I can see the that catalogue",()=>{
      const searchInputBox = catalogueSellerWrapper.findWhere(
        (node) => node.prop("testID") == "searchInputBox"
      );
      searchInputBox.simulate("submitEditing")

      const apiTestMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        apiTestMsg.messageId
      );
      apiTestMsg.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        SearchCatalougeMockList
      );
      instance.getAllCatalogueApiCallId = apiTestMsg.messageId;
      runEngine.sendMessage("Test", apiTestMsg);
      
      const expectedCatalougeList = [
        { "id": 1, "type": "addProduct" },
        ...SearchCatalougeMockList.data
      ];
      expect(catalogueSellerWrapper.state("catalougeList")).toStrictEqual(expectedCatalougeList)
    })
   

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(catalogueSellerWrapper).toBeTruthy();
    });
  });
});
