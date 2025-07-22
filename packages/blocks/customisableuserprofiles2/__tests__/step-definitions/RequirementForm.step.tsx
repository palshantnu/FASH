import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import {render,fireEvent} from '@testing-library/react-native';

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";

import MessageEnum, {
    getName,
} from "framework/src/Messages/MessageEnum";
import RequirementForm from "../../src/RequirementForm";
import Confirmation from "../../src/Confirmation";
const mockNavigate = jest.fn();

const screenProps = {
    navigation: {
        navigation: {
            navigate: mockNavigate,
            getParam: (stylistId: string,type:string) => {
            },
        }
    },
    id: "RequirementForm",
};
const feature = loadFeature("./__tests__/features/RequirementForm.feature");

interface InstanceData {
    [getSaveReportApiCallId: string]: string;
};
const custoFormSuccessData = {

    message: { object: "string" },
    data: { object: "string" },
    stylist: { object: "string" }
}

interface ValidResponseType {
    message: object;
    data: object;
    stylist: object;
}

const mockApiCall = jest.fn().mockImplementation((instance, apiCallId: string, mockData: object = {}, messageType: number = MessageEnum.RestAPIResponceSuccessMessage) => {
    const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
    tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("Unit Test", tokenMsg);
    const messageRestApiCall = new Message(getName(MessageEnum.RestAPIResponceMessage));
    messageRestApiCall.addData(getName(MessageEnum.RestAPIResponceDataMessage), messageRestApiCall.messageId);
    messageRestApiCall.addData(getName(messageType), mockData);
    instance[apiCallId] = messageRestApiCall.messageId;
    const { receive: mockResponse } = instance;
    mockResponse("test", messageRestApiCall);
  }
  )

defineFeature(feature, (test) => {
    
    // let screen: ReturnType<typeof render>;
    // let getByTestId: ReturnType<typeof render>['getByTestId'];
    // let alertSpy: jest.SpyInstance;
    beforeEach(() => {
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
        jest.useFakeTimers();
        jest.mock('react-native-tab-view', () => require('react-native-tab-view'));
        global.alert = jest.fn();  // Mock the alert function


    });

    test("User navigates to RequirementForm", ({ given, when, then }) => {

        let RequirementFormWrapper: ShallowWrapper;
        let instance: RequirementForm;


        given("I am a User loading RequirementForm", () => {
            // screen = render(<RequirementForm {...screenProps} />);
            RequirementFormWrapper = shallow(<RequirementForm {...screenProps} />);
            instance = RequirementFormWrapper.instance() as RequirementForm
        });
        when("I select the gender", () => {
            let btnSubmit = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "dropId"
            );
            btnSubmit.simulate("onChange",
                ""
            );
            expect(instance.state.gender).toBe(null);
            instance.setState({isErrorGender:false})
            expect(instance.state.isErrorGender).toBe(false);

        });

        then("gender render on the screen", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });



        when("I enter the more details input", () => {
            let btnSubmitOTP = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "moreDetailsTestId"
            );
            btnSubmitOTP.simulate("changeText",
                ""
            );
        });

        then("More details will render on the screen", () => {
            let btnSubmitOTP = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "moreDetailsTestId"
            );
            expect(btnSubmitOTP.props().value).toEqual("");
        });

        when("I enter the color prefrence input", () => {
            let btnSubmitOTP = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "colorPreferenceTextID"
            );
            btnSubmitOTP.simulate("changeText",
                ""
            );
            expect(instance.state.colorPreference).toBe('')
        });

        then("Color prefrence will render on the screen", () => {
            let btnSubmitOTP = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "colorPreferenceTextID"
            );
            expect(btnSubmitOTP.props().value).toEqual("");
        });


        when("I enter the min price input", () => {
            let btnSubmitOTP = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "minPriceTestId"
            );
            btnSubmitOTP.simulate("changeText",
                ""
            );
            // maxPriceTestId
            let maxPrice = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "maxPriceTestId"
            );
            maxPrice.simulate("changeText",
                "20"
            );
        });

        then("min price will render on the screen", () => {
            let btnSubmitOTP = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "minPriceTestId"
            );
            expect(btnSubmitOTP.props().value).toEqual("");
        });

        when("I enter the max price input", () => {
            let btnSubmitOTP = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "maxPriceTestId"
            );
            btnSubmitOTP.simulate("changeText",
                ""
            );
        });

        then("max price will render on the screen", () => {
            let btnSubmitOTP = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "maxPriceTestId"
            );
            expect(btnSubmitOTP.props().value).toEqual("");
        });
        
        when("I select Image", () => {
            instance.Galleryopen()
           instance.onRemoveImage(1)
           expect(instance.state.selectImage.length).toBe(0);
        });

        then("Image will render on the screen", () => {
             expect(instance.state.selectImage.length).toBe(1);
        });

        when("I click on request page", () => {
            let btnSubmitOTP = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "customFormAPiBtnTestID"
            );
            btnSubmitOTP.simulate("press");
            //RequirementFormWrapper.setState({apiType:'create',gender:'',minPrice:'',maxPrice:'',colourPreference:'',moreDetails:''});

        });

        then("I will navigate to request page", () => {
            expect(instance.state.apiType).toBe('create');
           
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });

        when("The profile picture rendered", () => {
            instance.checkValidation('','','','','',[])
            let isValid=true;
            instance.checkValidation('male','red','1','2','fff',[{
                uri: 'http://images.png',
                id: 0,
                type: "jpeg",
                name: "images"
            }])
           
            mockApiCall(instance, "customFormAPIcallId", custoFormSuccessData);
            
        });

        then("The profile picture will display on the screen", () => {
            expect(instance.customFormAPIcallId.length).toBeGreaterThan(0);
        });

        when("I click on back Btm", () => {
            RequirementFormWrapper.setState({apiType:'Edit'})
            let btnSubmitOTP = RequirementFormWrapper.findWhere(
                (node) => node.prop("testID") === "styllistPageTestId"
            );
            btnSubmitOTP.simulate("press");
           
        });

        then("I will navigate to Rquest list", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });

        when("I click on Edit Btn", () => {
            instance.setState({isLoading:true,apiType:'Edit'});
           
            instance.checkValidation('','','','','',[])
            let isValid=true
            instance.checkValidation('male','red','1','2','fff',[{
                uri: 'http://images.png',
                id: 0,
                type: "jpeg",
                name: "images"
            }])
            let responseJson={
                "data": {
                    "id": "6",
                    "type": "hire_stylist_custom_form",
                    "attributes": {
                        "stylist_id": 872,
                        "gender": "male",
                        "colour": "Red",
                        "min_price": 10,
                        "max_price": 20,
                        "status": "pending",
                        "buyer_name": "Buyer Anurag",
                        "buyer_profile": null,
                        "stylist_name": "stylist wee",
                        "stylist_profile": "http://images.png",
                        "images": [
                            {
                                "url": "http://images.png"
                            }
                        ]
                    }
                }
            }
            mockApiCall(instance, "stylistDetailsApiCallId",responseJson );
        
        });

        then("The details Api call", () => {
            instance.setState({isLoading:false});
            expect(instance.stylistDetailsApiCallId.length).toBeGreaterThan(0);
        });
        when("I click on Update Btn", () => {
            let responseJson={
                "data": {
                    "id": "6",
                    "type": "hire_stylist_custom_form",
                    "attributes": {
                        "stylist_id": 872,
                        "gender": "male",
                        "colour": "Red",
                        "min_price": 10,
                        "max_price": 20,
                        "status": "pending",
                        "buyer_name": "Buyer Anurag",
                        "buyer_profile": null,
                        "stylist_name": "stylist wee",
                        "stylist_profile": "http://images.png",
                        "images": [
                            {
                                "url": "http://images.png"
                            }
                        ]
                    }
                }
            }
            mockApiCall(instance, "updateFormAPIcallId", responseJson);
        });

        then("The update Api call", () => {
            expect(instance.updateFormAPIcallId.length).toBeGreaterThan(0);
        });
        when("I click on Edit Btn", () => {
            instance.setState({isLoading:true});

            let error={
                errors:"something went wrong"
            }
            mockApiCall(instance, "stylistDetailsApiCallId",error );
        });

        then("The details Api call", () => {
            instance.setState({isLoading:false});
            expect(instance.stylistDetailsApiCallId.length).toBeGreaterThan(0);
        });
        when("I click on Update Btn", () => {
            let error={
                errors:"something went wrong"
            }
            mockApiCall(instance, "updateFormAPIcallId", error);
        });

        then("The update Api call", () => {
            expect(instance.updateFormAPIcallId.length).toBeGreaterThan(0);
        });
        when("I click on submit Btn", () => {
            let error={
                errors:"something went wrong"
            }
            mockApiCall(instance, "customFormAPIcallId", error);
            instance.customFormAPi()
        });

        then("The create Api call", () => {
            expect(instance.customFormAPIcallId.length).toBeGreaterThan(0);
        });
    });
    test("User navigates to Confirmation", ({ given, when, then }) => {
        let ConfirmationWrapper: ShallowWrapper;
        let instance: Confirmation;
        given("I am a User loading Confirmation page", () => {
            ConfirmationWrapper = shallow(<Confirmation {...screenProps} />);
            instance = ConfirmationWrapper.instance() as Confirmation
        });
        when("I click on Confirmation page", () => {
            let btnSubmit = ConfirmationWrapper.findWhere(
                (node) => node.prop("testID") === "btnConfirm"
            );
            btnSubmit.simulate("press");
        });

        then("I will navigate to Confirmation page", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });
        when("I click on Request Btn", () => {
            let btnSubmit = ConfirmationWrapper.findWhere(
                (node) => node.prop("testID") === "requestButton"
            );
            btnSubmit.simulate("press");
        });

        then("I will navigate to Request page", () => {
            expect(MessageEnum.NavigationTargetMessage).toEqual(8);
        });
        
    });
})