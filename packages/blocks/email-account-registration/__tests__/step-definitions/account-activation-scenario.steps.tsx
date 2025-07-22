import { defineFeature, loadFeature} from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import {runEngine} from '../../../../framework/src/RunEngine'
import {Message} from "../../../../framework/src/Message"
import { jest, expect,beforeEach } from '@jest/globals';
import MessageEnum, {getName} from "../../../../framework/src/Messages/MessageEnum"; 
import React from "react";
import AccountActivation from "../../src/AccountActivation"
import * as utils from "../../../../framework/src/Utilities"


const screenProps = {
    navigation: {
        addListener: jest.fn().mockImplementation((event, callback:any) => {
            callback();
            //returning value for `navigationSubscription`
            return {
               remove: jest.fn()
            }
        }),
      goBack: jest.fn(),
      navigate: jest.fn(),
    },
    id: "AccountActivation",
  };
 
  
  const dummyCountryList = [
    {
      numeric_code: "+992",
      country_full_name: "Tajikistan",
      country_code: "TJ",
      country_flag: "🇹🇯",
    },
    {
      numeric_code: "+1",
      country_full_name: "Jamaica",
      country_code: "JM",
      country_flag: "🇯🇲",
    },
    {
      numeric_code: "+509",
      country_full_name: "Haiti",
      country_code: "HT",
      country_flag: "🇭🇹",
    },
    {
      numeric_code: "+965",
      country_full_name: "Kuwait",
      country_code: "KW",
      country_flag: "🇰🇼",
    },
  ];
 

  const sendMessage = jest.spyOn(runEngine, "sendMessage");
const feature = loadFeature('./__tests__/features/account-activation-scenario.feature');


defineFeature(feature, (test) => {


    beforeEach(() => {
        jest.resetModules();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' }}));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to AccountActivation', ({ given, when, then }) => {
        let accountActivationWrapper:ShallowWrapper;
        let instance:AccountActivation; 

        given('I am a User loading AccountActivation', () => {
            accountActivationWrapper = shallow(<AccountActivation {...screenProps}/>);
        });

        when('I navigate to the AccountActivation', () => {
             instance = accountActivationWrapper.instance() as AccountActivation
           
        });

      

        then("Set token from session response", () => {

            const reciveToken = new Message(
                getName(MessageEnum.SessionResponseMessage)
            );

            reciveToken.addData(
                getName(MessageEnum.SessionResponseToken),
                "tokenstring"
            );
            runEngine.sendMessage("Unit Test", reciveToken);
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                    expect.anything(),
                    expect.objectContaining({ id: "SessionResponseMessage" }),
                ])
            );
        });

        then("I can fetch the country list",()=>{
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                dummyCountryList
            );
            instance.countryCodeApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                    expect.anything(),
                    expect.objectContaining({ id: "SessionResponseMessage" }),
                ])
            );
        })

        then("I can fill the form in first page",()=>{

            const NextBtn = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "btnNext"
            )
            NextBtn.simulate("press")
            const inputFullName = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "inputFullName"
            )
            inputFullName.simulate("changeText","nishanth")
            inputFullName.simulate("submitEditing")
            const inputEmail = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "inputEmail"
            )
            inputEmail.simulate("changeText","nishanth@gmail.com")
            inputEmail.simulate("submitEditing")
            const inputFirstSocial = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "inputFirstSocial"
            )
            inputFirstSocial.simulate("changeText","bsbsjhb.com")
            inputFirstSocial.simulate("submitEditing")
            const inputSecondSocial = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "inputSecondSocial"
            )
            inputSecondSocial.simulate("changeText","bsbsjhb.com")
            inputSecondSocial.simulate("submitEditing")
            const inputThirdSocial = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "inputThirdSocial"
            )
            inputThirdSocial.simulate("changeText","bsbsjhb.com")
            inputThirdSocial.simulate("submitEditing")
            const inputFourthSocial = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "inputFourthSocial"
            )
            inputFourthSocial.simulate("changeText","bsbsjhb.com")
            inputFourthSocial.simulate("submitEditing")
            const inputIbanNum = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "inputIbanNum"
            )
            inputIbanNum.simulate("changeText","8386886876gvdgd3")
            const inputBankName = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "inputBankName"
            )
            inputBankName.simulate("changeText","nishanth")
            const inputBankAccNum = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "inputBankAccNum"
            )
            inputBankAccNum.simulate("changeText","8386886876gvdgd3")
            expect(inputBankAccNum.props().value).toBe("");

        
        })

        then('I can fill the form in second page',()=>{
            const NextBtn = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "btnNext"
            )
            NextBtn.simulate("press")
            const apiTestMsg1 = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg1.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg1.messageId
            );
            apiTestMsg1.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    owner_contact_valid: false,
                    company_contact_valid: false
                }
            );
            instance.checkIfMobileNumberIsValidApiCallId = apiTestMsg1.messageId;
            runEngine.sendMessage("Test", apiTestMsg1);
            accountActivationWrapper.setState({activePage:'second'})
            const ownerAddress = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "ownerAddress"
            )
            ownerAddress.simulate("changeText","bangalore")
            ownerAddress.simulate("submitEditing")

            const ownerzipcode = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "ownerzipcode"
            )
            ownerzipcode.simulate("changeText","571101")
            ownerzipcode.simulate("submitEditing")

            const ownerMobileInput = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "ownerMobileInput"
            )
            ownerMobileInput.simulate("valueChange","9123456787")
           
            const companyAddress = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "companyAddress"
            )
            companyAddress.simulate("changeText","belgum")
            companyAddress.simulate("submitEditing")

            const companyZipCode = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "companyZipCode"
            )
            companyZipCode.simulate("changeText","676677")
            companyZipCode.simulate("submitEditing")
            const companyMobileNumber = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "companyMobileNumber"
            )
            companyMobileNumber.simulate("valueChange","8884924979")
            companyMobileNumber.simulate("submitEditing")
            
            NextBtn.simulate("press")
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
                    owner_contact_valid: false,
                    company_contact_valid: false
                }
            );
            instance.checkIfMobileNumberIsValidApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            NextBtn.simulate("press")
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {
                    owner_contact_valid: true,
                    company_contact_valid: true
                }
            );
            instance.checkIfMobileNumberIsValidApiCallId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            const statusTxt = accountActivationWrapper.findWhere(node => node.text() === "Upload");
            expect(statusTxt.exists()).toBe(true);
        })

        then("I can Upload the Images",()=>{
            const NextBtn = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "btnNext"
            )
            NextBtn.simulate("press")
            const civilidUploadBtn = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "civilidUploadBtn"
            )
            civilidUploadBtn.simulate("press")
            const btn_gallery = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "btn_gallery"
            )
            btn_gallery.simulate("press")
            const commercialLicUploadBtn = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "commercialLicUploadBtn"
            )
            commercialLicUploadBtn.simulate("press")

            const btn_camera = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "btn_camera"
            )
            btn_camera.simulate("press")
            commercialLicUploadBtn.simulate("press")
            btn_gallery.simulate("press")
            const authSignUploadBtn = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "authSignUploadBtn"
            )
            authSignUploadBtn.simulate("press")
           
            btn_gallery.simulate("press")
            const moaUploadBtn = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "moaUploadBtn"
            )
            moaUploadBtn.simulate("press")

           
            btn_camera.simulate("press")
            moaUploadBtn.simulate("press")
            btn_gallery.simulate("press")
            const businessBankAccUploadBtn = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "businessBankAccUploadBtn"
            )
            businessBankAccUploadBtn.simulate("press")
           
            btn_gallery.simulate("press")
            const NextBtns = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "btnNext"
            )
            NextBtns.simulate("press")
            const statusTxt = accountActivationWrapper.findWhere(node => node.text() === "Next");
            expect(statusTxt.exists()).toBe(false);
          
        })

        then("I can Upload the details to api",()=>{
          
            const NextBtn = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "btnNext"
            )
            NextBtn.simulate("press")
            const statusTxt = accountActivationWrapper.findWhere(node => node.text() === "Upload");
            expect(statusTxt.exists()).toBe(true);
            
            const apiTestMsg = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceDataMessage),
                apiTestMsg.messageId
            );
            apiTestMsg.addData(
                getName(MessageEnum.RestAPIResponceSuccessMessage),
                {seller_owner_account:{
                    data:"hhjjh"
                }}
            );
            instance.postAccountActivationMsgId = apiTestMsg.messageId;
            runEngine.sendMessage("Test", apiTestMsg);
            const backBtn = accountActivationWrapper.findWhere(
                (node) => node.prop("testID") == "btnBackCatalogue"
            )
            backBtn.simulate("press")
            backBtn.simulate("press")
            backBtn.simulate("press")
        })

        
    });


});
