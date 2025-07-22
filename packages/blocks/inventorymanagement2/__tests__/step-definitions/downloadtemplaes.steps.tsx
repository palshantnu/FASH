import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"

import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import DownloadTemplates from "../../src/DownloadTemplates"
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';

const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback) => {
            if (event === "willFocus") {
                callback()
            }
        }),
        goBack: jest.fn(),
        navigate: jest.fn(),
    },
    id: "DownloadTemplates"
}


const DownloadTemplatesMockData = {
    "data": [
        {
            "id": "1",
            "type": "download_file",
            "attributes": {
                "id": 1,
                "file_name": "Update Inventory",
                "file": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2NFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--63df373879929355d6a19b238acd2806bdf12a1f/CatalogueVariant.csv"
            }
        },
        {
            "id": "2",
            "type": "download_file",
            "attributes": {
                "id": 2,
                "file_name": "Assign Store",
                "file": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2dFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0e553df7fe01c2b19a66864a0ec612752d881a38/AssignStore.csv"
            }
        },
        {
            "id": "3",
            "type": "download_file",
            "attributes": {
                "id": 3,
                "file_name": "Add Products",
                "file": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc2tFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6a318c7a0e1f2359fc4d29f5f87d2eb72a3906b7/Catalogue.csv"
            }
        },
        {
            "id": "4",
            "type": "download_file",
            "attributes": {
                "id": 4,
                "file_name": "Edit Products",
                "file": "https://fashionaggregator-326157-ruby.b326157.dev.eastus.az.svc.builder.cafe/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc29FIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2c4c76134c4448886a9c71e7acb8b01de486c672/EditProduct.csv"
            }
        }
    ]
}





const feature = loadFeature('./__tests__/features/downloadtemplates-scenario.feature');

defineFeature(feature, (test) => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    });

    test("User navigates to DownloadTemplates", ({ given, when, then }) => {
        let DownloadTemplatesWrapper: ShallowWrapper;
        let instance: DownloadTemplates;

        given("I am a User loading DownloadTemplates", () => {
            DownloadTemplatesWrapper = shallow(<DownloadTemplates {...screenProps} />);
        });

        when("I navigate to the DownloadTemplates", () => {
            instance = DownloadTemplatesWrapper.instance() as DownloadTemplates;
        });

        then("DownloadTemplates will load with out errors", () => {
            expect(DownloadTemplatesWrapper).toBeTruthy();
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
            expect(DownloadTemplatesWrapper).toBeTruthy();
        });

        then('I can load the DownloadTemplates', () => {
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                DownloadTemplatesMockData
            );
            instance.getAllTemplateApiCallMsgId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);


            expect(DownloadTemplatesWrapper.state("downloadTemplateList")).toStrictEqual(DownloadTemplatesMockData.data)
        })
     
        then("I can show all DownloadTemplates list", () => {
            const flatlist = DownloadTemplatesWrapper.findWhere(
                (node) => node.prop("testID") === "DownloadTemplates_data_flatlist_list"
            )

            const item = DownloadTemplatesMockData.data[0]
            const renderItem = flatlist.renderProp("renderItem")({ item: item, index: 0 })
            const DownloadBtn = renderItem.findWhere(
                (node) => node.prop("testID") == "DownloadBtn"
            )
            DownloadBtn.simulate("press")

            const item2 = {}
            flatlist.renderProp("ListEmptyComponent")({ item: item2 })

            flatlist.props().ListEmptyComponent();


            expect(DownloadTemplatesWrapper).toBeTruthy();
        });

        then("I can leave the screen with out errors", () => {
            instance.componentWillUnmount();
            instance.handleDownload("", '')
            expect(DownloadTemplatesWrapper).toBeTruthy();
        });
        
        const mockFilePath = '/files/sample.pdf';
         const mockFileName = 'sample.pdf';
         
        expect(PermissionsAndroid.requestMultiple).toHaveBeenCalled();
        expect(RNFS.downloadFile).toHaveBeenCalledWith({
          fromUrl: expect.stringContaining(mockFilePath),
          toFile: expect.stringContaining(mockFileName),
        });
        expect.objectContaining({
            message: expect.stringContaining('Downloaded'),
            type: 'success',
          })
          Platform.OS = 'android';
          Platform.Version = 28;
          (PermissionsAndroid.requestMultiple as jest.Mock).mockResolvedValueOnce({
            'android.permission.READ_EXTERNAL_STORAGE': 'denied',
            'android.permission.WRITE_EXTERNAL_STORAGE': 'denied',
          });
        expect.objectContaining({
            message: 'Permission Denied',
            type: 'danger',
          })

    });
});
