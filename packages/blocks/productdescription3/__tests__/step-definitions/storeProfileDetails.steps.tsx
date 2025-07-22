import { defineFeature, loadFeature } from "jest-cucumber";
import { render, shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import StoreDetailsScreen from "../../src/StoreDetailsScreen";
import CustomLoader from "../../../../components/src/CustomLoader";

const navigation = require("react-navigation");

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            if (event === "willFocus") {
                callback();
            }
        }),
        navigate: jest.fn(),
        goBack: jest.fn(),
        state: {
            params: {
                item: {
                    token: 'dasndbhkb3b43q4jb3jb5'
                }
            }
        }
    },
    id: "storeProfileDetails"
};


const feature = loadFeature("./__tests__/features/storeprofileDetails-scenario.feature");

defineFeature(feature, test => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to storeprofiledetails", ({ given, when, then }) => {
        let storeprofileWrapper: ShallowWrapper;
        let instancestoreprofiledetails: StoreDetailsScreen;

        given("I am a User loading storeprofiledetails", () => {
            storeprofileWrapper = shallow(<StoreDetailsScreen {...screenProps} />);
            instancestoreprofiledetails = storeprofileWrapper.instance() as StoreDetailsScreen;
        });

        when('I navigate to the storeprofiledetails Screen', () => {
            instancestoreprofiledetails = storeprofileWrapper.instance() as StoreDetailsScreen
            expect(storeprofileWrapper).toBeTruthy();
        });

        then('I can check loader', () => {
            instancestoreprofiledetails.setState({ isloading: true })
            {instancestoreprofiledetails.state.isloading && <CustomLoader />}
        });

        then('I can check imh is null', () => {
            instancestoreprofiledetails.setState({imgState:''})
            let bgimg = storeprofileWrapper.findWhere((node) => node.prop('testID') === 'bgImgID');
            expect(bgimg).toBeDefined();
        });

        then('I can press a navigate to back screen', () => {
            let backButton = storeprofileWrapper.findWhere((node) => node.prop('testID') === 'backButtonID');
            backButton.simulate('press',);
            expect(storeprofileWrapper).toBeTruthy();
        });

        then('renders operating hours when is_open is true', () => {
            const storeData = {
                store_operating_hours: {
                    monday: {
                        close: '08:00',
                        open: '08:00',
                        is_open: true
                    },
                    tuesday: {
                        close: '08:00',
                        open: '08:00',
                        is_open: true
                    },
                    wednesday: {
                        close: '08:00',
                        open: '08:00',
                        is_open: true
                    },
                    thursday: {
                        close: '08:00',
                        open: '08:00',
                        is_open: true
                    },
                    friday: {
                        close: '08:00',
                        open: '08:00',
                        is_open: true
                    },
                    saturday: {
                        close: '08:00',
                        open: '08:00',
                        is_open: true
                    },
                    sunday: {
                        close: '08:00',
                        open: '08:00',
                        is_open: true
                    },


                }
            };
            instancestoreprofiledetails.renderTime();
        });
    });
});
