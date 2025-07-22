import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import CsvFileUpload from "../../src/CsvFileUpload"

import DocumentPicker from 'react-native-document-picker'
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        goBack: jest.fn(),
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
    },
    id: "CsvFileUpload"
}

const feature = loadFeature('./__tests__/features/CsvFileUpload-scenario.feature');

defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules()
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
       
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
        jest.spyOn(DocumentPicker, "pick").mockImplementation(() => {
            return Promise.resolve([{ "fileCopyUri": null, "name": "Catalogue.csv", "size": 497, "type": "text/comma-separated-values", "uri": "content://com.asus.filemanager.OpenFileProvider/file/sdcard/Download/Catalogue.csv" }])
        })
        jest.spyOn(global, 'setTimeout').mockImplementation(((callback: Function) => {
            callback()
        }) as any)
    });

    test('User navigates to CsvFileUpload', ({ given, when, then }) => {
        let CsvFileUploadblock: ShallowWrapper;
        let instance: CsvFileUpload;

        given('I am a User loading CsvFileUpload', () => {
            CsvFileUploadblock = shallow(<CsvFileUpload {...screenProps} />)
        });

        when('I navigate to the CsvFileUpload', () => {
            instance = CsvFileUploadblock.instance() as CsvFileUpload
        });

        then('CsvFileUpload will load with out errors', () => {
            expect(CsvFileUploadblock).toBeTruthy()
        });

        then("I can click back button to goback", () => {
            const goBackmock = jest.spyOn(instance, "goBack")
            const btnBack = CsvFileUploadblock.findWhere(
                (node) => node.prop("testID") === "btnBack"
            )
            btnBack.simulate("press")

            expect(goBackmock).toHaveBeenCalled()
        }) 

        then("I can pick file", () => {
            const goBackmock = jest.spyOn(instance, "pickFileCSV")
            const pickCSVfile = CsvFileUploadblock.findWhere(
                (node) => node.prop("testID") === "pickCSVfile"
            )
            pickCSVfile.simulate("press")

            expect(goBackmock).toHaveBeenCalled()
        })

        then("Set token from session response", () => {
            const tokenFunction = jest.spyOn(instance, "handleResponseTokenUpload")
            const reciveToken = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );

            reciveToken.addData(
                getName(MessageEnum.SessionResponseToken),
                "tokenstring"
            );
            instance.receive("from", reciveToken);

            runEngine.sendMessage("Unit Test", reciveToken);
            expect(tokenFunction).toHaveBeenCalled()
        });

        then("I pick or reupload CSV file", async () => {
            const mockGoBack = jest.spyOn(instance, "goBack")
            let btnConfirm = CsvFileUploadblock.findWhere(
                (node) => node.prop("testID") === "pickCSVfile"
            )
            jest.spyOn(DocumentPicker, "pick").mockImplementation(() => {
                return Promise.resolve([{
                    "fileCopyUri": null, "name": "Catalogue.csv", "size": 497, "type": "text/csv", "uri": "content://com.asus.filemanager.OpenFileProvider/file/sdcard/Download/Catalogue.csv"
                }])
            })

            btnConfirm = CsvFileUploadblock.findWhere(
                (node) => node.prop("testID") === "btnConfirm"
            )
            btnConfirm.simulate("press")

            
            btnConfirm = CsvFileUploadblock.findWhere(
                (node) => node.prop("testID") === "btnBackFileUpload"
            )
            btnConfirm.simulate("press")
            btnConfirm = CsvFileUploadblock.findWhere(
                (node) => node.prop("testID") === "reUploadCSV"
            )
            btnConfirm.simulate("press")
            jest.spyOn(DocumentPicker, "isCancel").mockImplementation(() => true)

            expect(mockGoBack).toHaveBeenCalled()
        })


        then("I call upload CSV Api successfully", () => {
            const mockfunction = jest.spyOn(instance, "goBack")
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
            const {receive: mockReceive} = instance;
      mockReceive("unit test", apiTestMsg) 

      expect(mockfunction).toHaveBeenCalled()
        })
        

        then('I can leave the screen with out errors', () => {
            expect(CsvFileUploadblock).toBeTruthy()
        });
    });
});
