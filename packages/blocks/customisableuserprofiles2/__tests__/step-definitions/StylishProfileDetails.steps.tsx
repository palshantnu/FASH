import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import StylishProfileDetails from "../../src/StylishProfileDetails"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
import { message } from "../../src/assets";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        goBack: jest.fn(),
        isFocused: jest.fn().mockImplementation(() => true),
        addListener: jest.fn().mockImplementation((event, callback: any) => {
            callback();
        }),
    },
    id: "StylishProfileDetails"
}

const feature = loadFeature('./__tests__/features/StylishProfileDetails-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to StylishProfileDetails', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: StylishProfileDetails;

        given('I am a User loading StylishProfileDetails', () => {
            exampleBlockA = shallow(<StylishProfileDetails {...screenProps} />);
        });

        when('I navigate to the StylishProfileDetails', () => {
            instance = exampleBlockA.instance() as StylishProfileDetails
            const tokenMsg: Message = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );
            tokenMsg.addData(
                getName(MessageEnum.SessionResponseToken),
                'token-string'
            );
            runEngine.sendMessage('Unit Test', tokenMsg);
            const getpostlistRefresh: Message = new Message(
                getName(MessageEnum.NavigationPayLoadMessage)
            );
            getpostlistRefresh.addData(getName(MessageEnum.SessionResponseData), {
                "data": {
                    "id": "129",
                    "type": "portfolio_image",
                    "attributes": {
                        "id": 129,
                        "description": "Jsjeieie ieieoe ieieoe djid",
                        "image_url": "portfolio_1.jpeg",
                        "stylist_id": 658,
                        "bio": "lorem biography",
                        "profile_picture": null,
                        "name": "style Kio"
                    }
                },
                "meta": {
                    "is_fav": true,
                    "is_hired": true
                }
            });
            runEngine.sendMessage("Unit Test", getpostlistRefresh);
            getpostlistRefresh.addData(getName(MessageEnum.SessionResponseData), 
                "hello"
            );  
            runEngine.sendMessage("Unit Test", getpostlistRefresh);
            getpostlistRefresh.addData(getName(MessageEnum.SessionResponseData), { item: { item: { portfolio_image_id: 129, description: 'Jsjeieie ieieoe ieieoe djid', image_id: 4440, url: 'portfolio_1.jpeg' } } });

            runEngine.sendMessage("Unit Test", getpostlistRefresh);
            

        });

        then('StylishProfileDetails will load with out errors', () => {
            let StylistsPortfolios = exampleBlockA.findWhere(
                (node) => node.prop("leftTestId") === "backBtn"
            );
            StylistsPortfolios.props().onLeftPress()
            expect(exampleBlockA).toBeTruthy();
        });

        then("User can get the data for stylist details portfolio successfully", () => {
            const mockFunction = jest.spyOn(instance, "settingDetailsPortfolio")
            const msgValidationAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgValidationAPI.messageId
            );


            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    data: {
                        "id": "3",
                        "type": "portfolio_image",
                        "attributes": {
                            "id": 3,
                            "description": "image :-1. Description for image 1",
                            "image_url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdk1JIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--515697057057df34de91f8e92d0d3b623a9509e2/tshirt.jpg",
                            "stylist_id": 658,
                            "bio": "lorem biography",
                            "profile_picture": null,
                            "name": "style Kio"
                        }
                    },
                    meta: {
                        "is_fav": true,
                        "is_hired": false
                    }
                }

            );
            instance.getPortfolioDetailsApiCallID = msgValidationAPI.messageId;
            const { receive: mockReceive1 } = instance;
            mockReceive1("unit test", msgValidationAPI)

            let HeartFun1 = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "HeartFunc"
            );
            HeartFun1.simulate('press')

            
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    data: {
                        "id": "3",
                        "type": "portfolio_image",
                        "attributes": {
                            "id": 3,
                            "description": "image :-1. Description for image 1",
                            "image_url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdk1JIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--515697057057df34de91f8e92d0d3b623a9509e2/tshirt.jpg",
                            "stylist_id": 658,
                            "bio": "lorem biography",
                            "profile_picture": null,
                            "name": "style Kio"
                        }
                    },
                    meta: {
                        "is_fav": false,
                        "is_hired": false
                    }
                }

            );
            instance.getPortfolioDetailsApiCallID = msgValidationAPI.messageId;
            const { receive: mockReceive } = instance;
            mockReceive("unit test", msgValidationAPI)
        })

        then("User can navigate to stylish profile successfully", () => {
            const mockFunction = jest.spyOn(instance, "stylistProfileBtn")
            let StylishButton = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "StylishButton"
            );
            StylishButton.simulate('press')
            expect(mockFunction).toHaveBeenCalled()
        })

        then("User can add to favorite successfully", () => {
            const mockFunction = jest.spyOn(instance, "heartFunc")
            let HeartFun = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "HeartFunc"
            );
            HeartFun.simulate('press')
            expect(mockFunction).toHaveBeenCalled()
        })

        then("User can add data to favorite successfully", () => {
            const mockFunction = jest.spyOn(instance, "settingDetailsPortfolio")
            const msgValidationAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgValidationAPI.messageId
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "id": 658
                }

            );
            instance.favoriteApiCallID = msgValidationAPI.messageId;
            const { receive: mockReceive } = instance;
            mockReceive("unit test", msgValidationAPI)

            expect(mockFunction).toHaveBeenCalled()
        })

        then("User can remove from favorite successfully", () => {
            const mockFunction = jest.spyOn(instance, "heartFunc")
            let HeartFun = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "HeartFunc"
            );
            HeartFun.simulate('press')
            expect(mockFunction).toHaveBeenCalled()
        })

        then("User can remove data from favorite successfully", () => {
            const mockFunction = jest.spyOn(instance, "settingDetailsPortfolio")
            const msgValidationAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgValidationAPI.messageId
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "message": "abc"
                }
            );
            instance.unFavoriteApiCallID = msgValidationAPI.messageId;
            const { receive: mockReceive } = instance;
            mockReceive("unit test", msgValidationAPI)

            expect(mockFunction).toHaveBeenCalled()

            instance.favortieApi({message : "hello"})
        })

    });


});
