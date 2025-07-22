import { defineFeature, loadFeature } from "jest-cucumber"
import { shallow, ShallowWrapper } from 'enzyme'

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"
import * as utils from "../../../../framework/src/Utilities";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Settings2 from "../../src/Settings2"
import CustomLoader from "../../../../components/src/CustomLoader"
const navigation = require("react-navigation")

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
        addListener: jest.fn().mockImplementation((event, callback: any) => {
            if (event === "focus") {
              callback();
            }
            if (event === "willFocus") {
              callback();
            }
            if (event === "didFocus") {
              callback();
            }
            if (event === "willBlur") {
              callback();
            }
            if (event === "didBlur") {
              callback();
            }
          }),
    },
    id: "Settings2"
}
jest.mock("../../../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if (keys === "token") {
        return "Token";
      }
     return null;
    }),
    setStorageData: jest.fn(),
    removeStorageData: jest.fn()
  };
});

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    useTranslation: () => {
      return {
        t: (str: string) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
          // You can include here any property your component may use
        },
      }
    },
  }))
  
  

const sendMessage = jest.spyOn(runEngine, "sendMessage");
const feature = loadFeature('./__tests__/features/settings2-scenario.feature');

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.useFakeTimers();
        jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
        jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
    });

    test('User navigates to settings2', ({ given, when, then }) => {
        let Settings2Block: ShallowWrapper;
        let instance: Settings2;

        given('I am a User loading settings2', () => {
            Settings2Block = shallow(<Settings2 {...screenProps} />);
        });

        when('I navigate to the settings2', () => {
            instance = Settings2Block.instance() as Settings2
        });

        then('settings2 will load with out errors', () => {
            instance.componentDidMount();
            instance.setState({isLoading:true})
            {
                instance.state.isLoading &&
                <CustomLoader />
            }

            expect(Settings2Block).toBeTruthy();

            const msgToken = new Message(getName(MessageEnum.AccoutLoginSuccess));
            msgToken.addData(getName(MessageEnum.AuthTokenDataMessage), "TOKEN");
            runEngine.sendMessage("Unit Test", msgToken);
            const userDetailsResponce = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              userDetailsResponce.initializeFromObject({
                [getName(
                  MessageEnum.RestAPIResponceDataMessage
                )]: userDetailsResponce.messageId,
                [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {data:{id:1}}}
              );
             instance.getUserDetailsApiCallID =
             userDetailsResponce.messageId;
              runEngine.sendMessage(userDetailsResponce.messageId, userDetailsResponce);
        });

        then('I can press processing btn', () => {
            let processingButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'processingID');
            processingButtonComponent.simulate('press');
            expect(processingButtonComponent).toBeTruthy();
        });

        then('I can press saved cards btn', () => {
            let savedCardsButton = Settings2Block.findWhere((node) => node.prop('testID') === 'savedCardsID');
            savedCardsButton.simulate('press');
            expect(savedCardsButton).toBeTruthy();
        });

        then('I can press delivered btn', () => {
            let processingButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'deliveredID');
            processingButtonComponent.simulate('press');
            expect(processingButtonComponent).toBeTruthy();
        });

        then('I can press return btn', () => {
            let processingButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'returnsID');
            processingButtonComponent.simulate('press');
            expect(processingButtonComponent).toBeTruthy();
        });

        then('I can press all order btn', () => {
            let processingButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'allOrdersID');
            processingButtonComponent.simulate('press');
            expect(processingButtonComponent).toBeTruthy();
        });

        then('I can press my profile btn', () => {
            let profileButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'myProfileBtnId');
            profileButtonComponent.simulate('press',);
            expect(profileButtonComponent).toBeTruthy();
        });

        then('I can press fav stylist btn', () => {
            let profileButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'stylistID');
            profileButtonComponent.simulate('press');
            expect(sendMessage.mock.calls).toContainEqual(
                expect.arrayContaining([
                  expect.anything(),
                  expect.objectContaining({ id: "NavigationCustomformBuyerfavStylist" }),
                ])
            );
        });

        then('I can press address btn', () => {
            let profileButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'addressesID');
            profileButtonComponent.simulate('press',);
            expect(profileButtonComponent).toBeTruthy();
        });

        then('I can press payment history btn', () => {
            let profileButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'paymentHistoryID');
            profileButtonComponent.simulate('press',);
            expect(profileButtonComponent).toBeTruthy();
        });

        then('I can press contact us btn', () => {
            let profileButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'customerServiceID');
            profileButtonComponent.simulate('press',);
            expect(profileButtonComponent).toBeTruthy();
        });

        then('I can press faq us btn', () => {
            let profileButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'faqID');
            profileButtonComponent.simulate('press');
            expect(profileButtonComponent).toBeTruthy();
        });

        then('I can press goToTNC btn', () => {
            let goToTNCButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'goToTNCId');
            goToTNCButtonComponent.simulate('press');
            expect(goToTNCButtonComponent).toBeTruthy();
        });

        then('I can press goToPnCId btn', () => {
            let goToPnCButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'goToPnCId');
            goToPnCButtonComponent.simulate('press');
            expect(goToPnCButtonComponent).toBeTruthy();
        });

        then('I can press goToShippingPlcyID btn', () => {
            let goToshippingPButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'goToShippingPlcyID');
            goToshippingPButtonComponent.simulate('press');
            expect(goToshippingPButtonComponent).toBeTruthy();
        });

        then('I can press goToReturnPlcyId btn', () => {
            let goToReturnButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'goToReturnPlcyId');
            goToReturnButtonComponent.simulate('press');
            expect(goToReturnButtonComponent).toBeTruthy();
        });

        then('I can press language currency btn', () => {
            let goToReturnButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'languageCurrencyBtn');
            goToReturnButtonComponent.simulate('press');
            expect(goToReturnButtonComponent).toBeTruthy();
        });

        then('I can press logout btn with out errors', () => {
            let goToReturnButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'logoutBtn');
            goToReturnButtonComponent.simulate('press');
            expect(goToReturnButtonComponent).toBeTruthy();
        });

        then('I can press logout confirm btn with out errors', () => {
            let goToReturnButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'btnLogoutModal');
            goToReturnButtonComponent.simulate('press');
            expect(goToReturnButtonComponent).toBeTruthy();
        });

        then('I can press cancel btn with out errors', () => {
            let goToReturnButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'btnCancelLogoutModal');
            goToReturnButtonComponent.simulate('press');
            expect(goToReturnButtonComponent).toBeTruthy();
        });
        then('I can press delete btn with out errors', () => {
            let goToReturnButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'deleteBtn');
            goToReturnButtonComponent.simulate('press');
            expect(goToReturnButtonComponent).toBeTruthy();
        });

        then('I can press delete confirm btn with out errors', () => {
            let goToReturnButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'btnDeleteModal');
            goToReturnButtonComponent.simulate('press');
            const userDeleteResponce = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              userDeleteResponce.initializeFromObject({
                [getName(
                  MessageEnum.RestAPIResponceDataMessage
                )]: userDeleteResponce.messageId,
                [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {data:{id:1}}}
              );
             instance.deleteAccountApiCallId =
             userDeleteResponce.messageId;
              runEngine.sendMessage(userDeleteResponce.messageId, userDeleteResponce);
            expect(goToReturnButtonComponent).toBeTruthy();

            instance.loginAction();
        });

        then('I can press delete cancel btn with out errors', () => {
            let goToReturnButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'btnCancelDeleteModal');
            goToReturnButtonComponent.simulate('press');
            expect(goToReturnButtonComponent).toBeTruthy();
        });

        then('I can press loyalty points btn', () => {
          let goToLoyatltyPointsButtonComponent = Settings2Block.findWhere((node) => node.prop('testID') === 'loyaltyPointsId');
          goToLoyatltyPointsButtonComponent.simulate('press');
          expect(goToLoyatltyPointsButtonComponent).toBeTruthy();
      });
        then('I can leave the screen with out errors', () => {
          jest.spyOn(utils, "getStorageData").mockImplementation((key, _):any => {
            if (key === "token") {
              return null
            }
         
        })
        instance.componentDidMount()
            const userDeleteResponce = new Message(
                getName(MessageEnum.RestAPIResponceMessage)
              );
              userDeleteResponce.initializeFromObject({
                [getName(
                  MessageEnum.RestAPIResponceDataMessage
                )]: userDeleteResponce.messageId,
                [getName(MessageEnum.RestAPIResponceErrorMessage)]: {data:{id:1}}}
              );
             instance.deleteAccountApiCallId =
             userDeleteResponce.messageId;
              runEngine.sendMessage(userDeleteResponce.messageId, userDeleteResponce);
            instance.componentDidMount();
            expect(Settings2Block).toBeTruthy();
        });
    });


});
