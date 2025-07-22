import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import React from "react";
import StylishProfileDashboard from "../../src/StylishProfileDashboard"
import { Message } from "../../../../framework/src/Message";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        goBack: jest.fn(),
        isFocused: jest.fn().mockImplementation(() => true),
        addListener: jest.fn().mockImplementation((event, callback: any) => {
            callback();
        }),
    },
    id: "StylishProfileDashboard"
}

const feature = loadFeature('./__tests__/features/StylishProfileDashboard-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to StylishProfileDashboard', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: StylishProfileDashboard;

        given('I am a User loading StylishProfileDashboard', () => {
            exampleBlockA = shallow(<StylishProfileDashboard {...screenProps} />);
        });

        when('I navigate to the StylishProfileDashboard', () => {
            instance = exampleBlockA.instance() as StylishProfileDashboard
            const tokenMsg: Message = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );
            tokenMsg.addData(
                getName(MessageEnum.SessionResponseToken),
                'token-string'
            );
            runEngine.sendMessage('Unit Test', tokenMsg);
        });

        then('StylishProfileDashboard will load with out errors', () => {
            const getpostlistRefresh: Message = new Message(
                getName(MessageEnum.NavigationPayLoadMessage)
            );
            getpostlistRefresh.addData(getName(MessageEnum.SessionResponseData), {
                item: {
                    item: {
                        portfolio_image_id: 1,
                        url: 'image',
                        description: 'description'
                    }
                }
            });

            runEngine.sendMessage("Unit Test", getpostlistRefresh);
            const msgLogInSucessRestAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            expect(exampleBlockA).toBeTruthy();
        });

        then("User can set the empty data for stylist images successfully", () => {
            const mockFunction = jest.spyOn(instance, "chunkArray")
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
                    data: [
                        {
                            "id": "31",
                            "type": "portfolio",
                            "attributes": {
                                "images": [
                                    {
                                        "portfolio_image_id": 3,
                                        "description": "image :-1. Description for image 1",
                                        "image_id": 2290,
                                        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdk1JIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--515697057057df34de91f8e92d0d3b623a9509e2/tshirt.jpg"
                                    },
                                    {
                                        "portfolio_image_id": 4,
                                        "description": "image :-1. Description for image 2",
                                        "image_id": 2291,
                                        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdlFJIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--dec35da7110ebdc8f1c39b1b263f2368a0da62c7/daihana-monares-oWFPDjxuyUM-unsplash.jpg"
                                    }
                                ]
                            }
                        },
                        {
                            "id": "33",
                            "type": "portfolio",
                            "attributes": {
                                "images": [
                                    {
                                        "portfolio_image_id": 7,
                                        "description": "image :-1. Description for image 1",
                                        "image_id": 2294,
                                        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdmNJIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5f4947b5458608594b55383494d70af8b67bbca7/Navigation_Not_Working.mp4"
                                    },
                                    {
                                        "portfolio_image_id": 8,
                                        "description": "image :-1. Description for image 2",
                                        "image_id": 2295,
                                        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdmdJIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--62a68a662416deddcbe97590c95fee2879331cec/Driver_Issue.mp4"
                                    }
                                ]
                            }
                        },
                    ]
                }
            );
            instance.getPortfolioApiCallID = msgValidationAPI.messageId;
            const { receive: mockReceive } = instance;
            mockReceive("unit test", msgValidationAPI)

            expect(mockFunction).toHaveBeenCalled()
        })

        then("User can handle the error for stylist images successfully", () => {
            const mockFunction = jest.spyOn(instance, "chunkArray")
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
                    errors: {
                        message: "error"
                    }
                }
            );
            instance.getPortfolioApiCallID = msgValidationAPI.messageId;
            const { receive: mockReceive } = instance;
            mockReceive("unit test", msgValidationAPI)

            expect(mockFunction).toHaveBeenCalled()
        })

        then("User can set the data for stylist images successfully", () => {
            const mockFunction = jest.spyOn(instance, "chunkArray")
            const msgValidationAPI = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                msgValidationAPI.messageId
            );
            msgValidationAPI.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                // responseJson.data[0]?.attributes?.images
                {
                    data: [
                        { attributes: { images: 'image' } }
                    ]
                }

            );
            instance.getPortfolioApiCallID = msgValidationAPI.messageId;
            const { receive: mockReceive } = instance;
            mockReceive("unit test", msgValidationAPI)

            expect(mockFunction).toHaveBeenCalled()
        })

        then('user can load image list with out errors', () => {
            let reviewFlatList = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "imageList"
            );
            let imagewrapper = shallow(
                reviewFlatList.props().renderItem({
                    item: [
                        {
                            "portfolio_image_id": 37,
                            "description": "Asdasd",
                            "image_id": 3386,
                            "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
                        },
                        {
                            "portfolio_image_id": 38,
                            "description": "Asdasd",
                            "image_id": 3386,
                            "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
                        },
                        {
                            "portfolio_image_id": 39,
                            "description": "Asdasd",
                            "image_id": 3386,
                            "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
                        }
                    ],
                    index: 0
                }
                )
            )
            let imageView = imagewrapper.findWhere(
                (node) => node.prop("testID") === "image01"
            );
            imageView.simulate("press");

            let imageView01 = imagewrapper.findWhere(
                (node) => node.prop("testID") === "image11"
            );
            imageView01.simulate("press");

            let imageView12 = imagewrapper.findWhere(
                (node) => node.prop("testID") === "image12"
            );
            imageView12.simulate("press");

            shallow(
                reviewFlatList.props().renderItem({
                    item: [
                        {
                            "portfolio_image_id": 37,
                            "description": "Asdasd",
                            "image_id": 3386,
                            "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
                        },
                    ],
                    index: 0
                }
                )
            )
            let imageWrapper2 = shallow(reviewFlatList.props().renderItem({
                item: [{
                    "portfolio_image_id": 37,
                    "description": "Asdasd",
                    "image_id": 3386,
                    "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
                }],
                index: 1
            }
            ))

            let image20 = imageWrapper2.findWhere(
                (node) => node.prop("testID") === "image20"
            );
            image20.simulate("press");
            let imageWrapper3 = shallow(reviewFlatList.props().renderItem({
                item: [
                    {
                        "portfolio_image_id": 37,
                        "description": "Asdasd",
                        "image_id": 3386,
                        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
                    },
                    {
                        "portfolio_image_id": 38,
                        "description": "Asdasd",
                        "image_id": 3386,
                        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
                    },
                    {
                        "portfolio_image_id": 39,
                        "description": "Asdasd",
                        "image_id": 3386,
                        "url": "rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBanNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1ce1488fa8d55026ecc4683ba1e0a473a47eab22/portfolio_2.jpeg"
                    }
                ],
                index: 2
            }
            ))
            let image30 = imageWrapper3.findWhere(
                (node) => node.prop("testID") === "image30"
            );
            image30.simulate("press");
            let image31 = imageWrapper3.findWhere(
                (node) => node.prop("testID") === "image31"
            );
            image31.simulate("press");
            let image32 = imageWrapper3.findWhere(
                (node) => node.prop("testID") === "image32"
            );
            image32.simulate("press");

            expect(reviewFlatList.length).toBe(1);
        });
    });


});
