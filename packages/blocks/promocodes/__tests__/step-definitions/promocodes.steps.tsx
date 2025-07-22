import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import Promocodes from "../../src/Promocodes";
import CustomHeader from "../../../../components/src/CustomHeader";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
   
    addListener: (param: string, callback: any) => {
      callback();
    },
  },
  id: "Promocodes",
};
const screenProps1 = {
  navigation: {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
   
    addListener: (param: string, callback: any) => {
      callback();
    },
  },
  
}


const feature = loadFeature("./__tests__/features/promocodes-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  let promoCodes = {"data":[{"id":"1","type":"promo_code","attributes":{"name":"SAVE50","status":"active","discount_type":"percentage","discount":5.0,"description":null,"terms_n_condition":null,"redeem_limit":100,"max_discount_amount":100.0,"min_order_amount":350.0,"from":"2020-12-30T16:00:00.000+05:30","to":"2027-12-01T16:00:00.000+05:30","malls":[{"id":1,"name":"VR Chennai"}],"restaurants":[{"id":45,"description":"Dummy"}]}},{"id":"3","type":"promo_code","attributes":{"name":"FLAT50","status":"active","discount_type":"fixed","discount":600.0,"description":null,"terms_n_condition":null,"redeem_limit":4,"max_discount_amount":null,"min_order_amount":200.0,"from":"2021-01-05T17:27:00.000+05:30","to":"2027-12-30T17:27:00.000+05:30","malls":[{"id":1,"name":"VR Chennai"}],"restaurants":[]}},{"id":"4","type":"promo_code","attributes":{"name":"Test","status":"active","discount_type":"percentage","discount":10.0,"description":"This is for testing","terms_n_condition":"Test T\u0026c","redeem_limit":1000,"max_discount_amount":250.0,"min_order_amount":250.0,"from":"2021-01-06T18:51:00.000+05:30","to":"2027-12-31T18:51:00.000+05:30","malls":[{"id":1,"name":"VR Chennai"}],"restaurants":[{"id":45,"description":"Dummy"}]}}]}

  test("User navigates to promocodes", ({ given, when, then }) => {
    let promoCodeBlock: ShallowWrapper;
    let promoCodeDatilsBlock: ShallowWrapper;
    let instance: Promocodes;

    given("I am a User loading promocodes", () => {
      promoCodeBlock = shallow(<Promocodes {...screenProps} />);
    });

    when("I navigate to the promocodes", () => {
      instance = promoCodeBlock.instance() as Promocodes;
      <CustomHeader  title={""} language={""} onLeftPress={() =>{}}
      {...screenProps1}/>
     
    });
    then("I can leave the screen with onLeftPress out errors", () => {
     
      const showModels = promoCodeBlock.findWhere(
        (node) => node.prop("leftTestId") === "customHeader")
        showModels.props().onLeftPress()
  
      expect(promoCodeBlock.exists()).toBe(true);
    });

    then("promocodes will load with out errors", () => {

      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const msgValidationAPI = new Message(getName(MessageEnum.RestAPIResponceMessage))
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgValidationAPI.messageId);
      msgValidationAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage), 
        promoCodes
      );
      instance.apiPromoCodeCallId = msgValidationAPI.messageId
      runEngine.sendMessage("Unit Test", msgValidationAPI)

      let buttonComponents = promoCodeBlock.findWhere((node) => node.prop('testID') === 'renderPromocodeRow');
      buttonComponents.forEach((button: any) => {
        button.simulate('press');
      });
      const handleNavigationMock = jest.spyOn(instance, 'handleScreen');
      promoCodeBlock.find({'testID': 'navigationBtn' }).simulate('press');
      expect(handleNavigationMock).toHaveBeenCalled();
      
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(promoCodeBlock).toBeTruthy();
    });
  });
});
