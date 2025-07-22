import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CustomformDriverShowVehicle from "../../src/CustomformDriverShowVehicle";

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        pop:jest.fn(),
        getParam: (playlist_id: any,topic_id:any) => {
        },
        addListener:(param:string,callback:any)=>{
          callback()
        },
    },
    id: "CustomformDriverShowVehicle",
};

const vehicleObject = [
    {
        id:'1',
        attributes:{
            type:'',
            vehicleNumber:'',
        }
    },
    {
        id:'2',
        attributes:{
            type:'',
            vehicleNumber:'',
        }
    },
]

const feature = loadFeature("./__tests__/features/customformdrivershowvehicle-scenario.feature");
const sendMessage = jest.spyOn(runEngine, "sendMessage");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "");
  });

  test("User navigates to customformdrivershowvehicle", ({ given, when, then }) => {
    let customformdrivershowvehicleBlock: ShallowWrapper;
    let instance: CustomformDriverShowVehicle;

    given("I am a User loading customformdrivershowvehicle", () => {
        customformdrivershowvehicleBlock = shallow(<CustomformDriverShowVehicle {...screenProps} />);
    });

    when("I navigate to the customformdrivershowvehicle", () => {
      instance = customformdrivershowvehicleBlock.instance() as CustomformDriverShowVehicle;
    });

    then("customformdrivershowvehicle will load with out errors", () => {
      
      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);
      expect(sendMessage.mock.calls).toContainEqual(
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({ id: "SessionResponseMessage" }),
        ])
      );
    
    });

    then("I can click on back button vehicles with out errors", () => {
        let buttonComponent = customformdrivershowvehicleBlock.findWhere(
          (node) => node.prop("testID") === "btnBackShowVehicle"
        );
        buttonComponent.simulate("press");
        expect(screenProps.navigation.goBack).toHaveBeenCalledTimes(0);
    });

    then("I can load vehicle api with out errors", () => {

        const msgLogInErrorRestAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI);
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
            "data": [
                {
                    "failed_login": "Data send"
                }
            ]
        });
  
        msgLogInErrorRestAPI.addData(getName(MessageEnum.RestAPIResponceDataMessage), msgLogInErrorRestAPI.messageId);
        instance.getAllVehicleApiCallId = msgLogInErrorRestAPI.messageId
        runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI); 
        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "RestAPIResponceMessage" }),
          ])
        ); 
    }) 

    then('I can render vehicle flatlist with out errors',async()=>{
        const flatlist = customformdrivershowvehicleBlock.findWhere(
            (node)=>node.prop("testID") === "showVehiclesFlatData"
        )
        const item = vehicleObject[0]
        flatlist.renderProp("renderItem")({item:item,index:0})
        flatlist.renderProp("ListEmptyComponent")({})
        expect(flatlist.exists()).toBe(true)
    })

    then("I can click on add vehicle button with out errors", () => {
        let buttonComponent = customformdrivershowvehicleBlock.findWhere(
          (node) => node.prop("testID") === "btnAddVehicle"
        );
        buttonComponent.simulate("press");

        expect(sendMessage.mock.calls).toContainEqual(
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({ id: "NavigationSelectVehicle" }),
          ])
        );
    });

  });
});
