import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import UploadCSV from "../../src/UploadCSV"
import DocumentPicker from 'react-native-document-picker'

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            if (event === "willFocus") {
                callback()
            }
        }),
        state: {
            params: {
                title: 'Assign Store',
                subTitle: 'sub head'
            }
        },
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "UploadCSV"
}

const feature = loadFeature('./__tests__/features/uploadcsv-scenario.feature');

global.FormData = require('react-native/Libraries/Network/FormData');

jest.useFakeTimers();

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(DocumentPicker, "pick").mockImplementation(() => {
            return Promise.resolve([{ "fileCopyUri": null, "name": "Catalogue.csv", "size": 497, "type": "text/comma-separated-values", "uri": "content://com.asus.filemanager.OpenFileProvider/file/sdcard/Download/Catalogue.csv" }])
        })
        jest.spyOn(global, 'setTimeout').mockImplementation(((callback: Function) => {
            callback()
        }) as any)

    });

    test('User navigates to uploadcsv', ({ given, when, then }) => {
        let exampleBlockA: ShallowWrapper;
        let instance: UploadCSV;

        given('I am a User loading uploadcsv', () => {
            exampleBlockA = shallow(<UploadCSV {...screenProps} />);
        });

        when('I navigate to the CSV screen', () => {
            instance = exampleBlockA.instance() as UploadCSV
        });

        then('uploadcsv will load with out errors', () => {
            expect(exampleBlockA).toBeTruthy();
        });

        then("Set token from session response", () => {

            const reciveToken = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );

            reciveToken.addData(
                getName(MessageEnum.SessionResponseToken),
                "tokenstring"
            );
            instance.receive("from", reciveToken);

            runEngine.sendMessage("Unit Test", reciveToken);
            expect(exampleBlockA).toBeTruthy();
        });
        then("I can click back button to goback", () => {
            const btnConfirm = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "btnBackInCSV"
            )
            btnConfirm.simulate("press")
            jest.runAllTimers();
        })
        when("I pick or reupload CSV file", async () => {

            const btnConfirm = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "pickCSVfile"
            )
            btnConfirm.simulate("press")
            jest.spyOn(DocumentPicker, "pick").mockImplementation(() => {
                return Promise.resolve([{
                    "fileCopyUri": null, "name": "Catalogue.csv", "size": 497, "type": "text/csv", "uri": "content://com.asus.filemanager.OpenFileProvider/file/sdcard/Download/Catalogue.csv"
                }])
            })
            btnConfirm.simulate("press")

            jest.spyOn(DocumentPicker, "pick").mockImplementation(() => {
                return Promise.resolve([{
                    "fileCopyUri": null, "name": "Catalogue.pdf", "size": 497, "type": "text/pdf", "uri": "content://com.asus.filemanager.OpenFileProvider/file/sdcard/Download/Catalogue.pdf"
                }])
            })
            btnConfirm.simulate("press")
            jest.spyOn(DocumentPicker, "pick").mockImplementation(() => {
                return Promise.reject(new Error("Test message"))
            })
            jest.spyOn(DocumentPicker, "isCancel").mockImplementation(() => true)

            btnConfirm.simulate("press")
        })
        then("It will upload", () => {
            const btnConfirm = exampleBlockA.findWhere(
                (node) => node.prop("testID") === "btnConfirm"
            )
            btnConfirm.simulate("press")
            expect(exampleBlockA).toBeTruthy();
        })
                when("I call upload CSV Api", () => {
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    "data": [],
                    "meta": {
                        "message": "Assigned catalogues to stores"
                    }
                }
            );
            instance.uploadCSVAPIid = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            expect(exampleBlockA).toBeTruthy();
        })
        then("I can leave the screen with out errors", () => {
            instance.componentWillUnmount();
            expect(exampleBlockA).toBeTruthy();
        });


    });


});
