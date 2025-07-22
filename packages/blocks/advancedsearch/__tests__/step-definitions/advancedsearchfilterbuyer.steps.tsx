import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from 'enzyme'
import * as helpers from "../../../../framework/src/Helpers";

import React from "react";
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"

import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import AdvancesSearchFilterBuyer from "../../src/AdvancesSearchFilterBuyer"
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
    id: "AdvancesSearchFilterBuyer"
}

const filterArrObject = [
        {
            id:'1',
            attributes:{
                name:'Size'
            }
        },
        {
            id:'1',
            attributes:{
                name:'Fit'
            }
        },
  
    ]
const feature = loadFeature("./__tests__/features/advancedsearchfilterbuyer-scenario.feature");

defineFeature(feature, (test) => {
    beforeEach(() => {
      jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "");
    });
  
    test("User navigates to advancedsearchfilterbuyer", ({ given, when, then }) => {
      let AdvancesSearchFilterBuyerBlock: ShallowWrapper;
      let instance: AdvancesSearchFilterBuyer;
  
      given("I am a User loading advancedsearchfilterbuyer", () => {
        AdvancesSearchFilterBuyerBlock = shallow(<AdvancesSearchFilterBuyer {...screenProps} />);
      });
  
      when("I navigate to the advancedsearchfilterbuyer", () => {
        instance = AdvancesSearchFilterBuyerBlock.instance() as AdvancesSearchFilterBuyer;
      });
  
      then("advancedsearchfilterbuyer will load with out errors", () => {
        expect(AdvancesSearchFilterBuyerBlock).toBeTruthy();
        const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
        msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
        runEngine.sendMessage("Unit Test", msgTokenAPI)
      
      });

      then("I can click on back button store with out errors", () => {
        let buttonComponent = AdvancesSearchFilterBuyerBlock.findWhere(
          (node) => node.prop("testID") === "btnBackFilter"
        );
        buttonComponent.simulate("press");
      });
  
      then("I can leave the screen with out errors", () => {
        instance.componentWillUnmount();
        expect(AdvancesSearchFilterBuyerBlock).toBeTruthy();
      });
    });
  });