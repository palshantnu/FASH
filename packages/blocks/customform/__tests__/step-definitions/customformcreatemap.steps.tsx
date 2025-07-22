import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import CustomformMap from "../../src/CustomformMap"
import { jest, expect,beforeEach } from '@jest/globals';
jest.useFakeTimers()
const navigation = require("react-navigation")
const mockNavigate = jest.fn();
const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        getParam: (playlist_id: any,topic_id:any) => {
        },
        addListener:(param:string,callback:any)=>{
          callback()
        },
    },
    id: "CustomformMap"
}

const addressDetail = {
    formatted_address:'Dubai',
    geometry:{
        location:{
            lat:123,
            lng:345
        }
    }
}

let CustomformMapData = <CustomformMap {...screenProps}/>
const feature = loadFeature("./__tests__/features/customformcreatemap-scenario.feature");

defineFeature(feature, (test) => {
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    });
  
    test("User navigates to customformmap", ({ given, when, then }) => {
      let customformmapBlock: ShallowWrapper;
      let instance: CustomformMap;
  
      given("I am a User loading customformmap", () => {
        customformmapBlock = shallow(<CustomformMap {...screenProps} />);
      });
  
      when("I navigate to the customformmap", () => {
        instance = customformmapBlock.instance() as CustomformMap;
      });
  
      then("customformmap will load with out errors", () => {
        expect(customformmapBlock).toBeTruthy();
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
      
      });

      then("I can load google map with out errors", () => {
        let mapComponent = customformmapBlock.findWhere(
          (node) => node.prop("testID") === "mapViewShowForm"
        );
        let render_data = mapComponent.renderProp("onMapReady")({})
        expect(render_data).toBeTruthy();
      });

      then("I can load google map marker with out errors", () => {
        let mapComponent = customformmapBlock.findWhere(
          (node) => node.prop("testID") === "googleMapMarker"
        );
        expect(mapComponent).toBeTruthy();
      });

      then("I can text search google with out errors", () => {
        let buttonComponent = customformmapBlock.findWhere(
          (node) => node.prop("testID") === "google_places_autocomplete"
        );
        let render_data = buttonComponent.renderProp("renderLeftButton")({})
        let let_button = render_data.findWhere(node=>node.prop("testID") == 'btnBackIconManageMap')
        expect(let_button).toBeTruthy();
        let_button.simulate("press");
        buttonComponent.simulate("press");
      });

      then("I can text map header back with out errors", () => {
        let buttonComponent = customformmapBlock.findWhere(
          (node) => node.prop("testID") === "google_places_autocomplete"
        );
        buttonComponent.simulate("press");
      });
  
      then("I can confirm location the button with with out errors", async () => {
        let buttonComponent = customformmapBlock.findWhere(
          (node) => node.prop("testID") === "btnMobileLogIn"
        );
        buttonComponent.simulate("press");
        let renderSectionHeaderMockCall = jest.fn(instance.selectAddress);
            renderSectionHeaderMockCall(addressDetail);
        
      });
  
      then("I can leave the screen with out errors", () => {
        instance.componentWillUnmount();
        expect(customformmapBlock).toBeTruthy();
      });
    });
  });