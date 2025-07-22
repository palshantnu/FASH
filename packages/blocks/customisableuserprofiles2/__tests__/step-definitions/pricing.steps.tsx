import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { Listener } from "../../../catalogue/__mock__/eventlistener";
import Pricing from "../../src/Pricing";
import PricingWeb from "../../src/Pricing.web";
const listener = new Listener();

jest.mock("react-native-flash-message", () => ({
  showMessage: jest.fn(),
  hideMessage: jest.fn(),
}));

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: listener.addEventListener,
  },
  id: "Pricing",
};

const dummyData = {
  "data": [
      {
          "id": "108",
          "type": "service",
          "attributes": {
              "name": "weekly_plan",
              "styling_per_week": 5,
              "discussion_time": "30",
              "voice_call_facility": true,
              "video_call_facility": true,
              "service_charges": 100.0
          }
      },
      {
          "id": "109",
          "type": "service",
          "attributes": {
              "name": "monthly_plan",
              "styling_per_week": 5,
              "discussion_time": "30",
              "voice_call_facility": false,
              "video_call_facility": true,
              "service_charges": 200.0
          }
      },
      {
          "id": "110",
          "type": "service",
          "attributes": {
              "name": "quarterly_plan",
              "styling_per_week": 5,
              "discussion_time": "30",
              "voice_call_facility": true,
              "video_call_facility": false,
              "service_charges": 500.0
          }
      }
  ]
}

const dummyResponse = {
  "data": {
      "id": "26",
      "type": "hire_stylist",
      "attributes": {
          "id": 26,
          "stylist_id": 972,
          "payment_status": "pending",
          "service_status": "current",
          "service_informations_id": 108,
          "start_date": null,
          "end_date": null,
          "amount": "100.0",
          "buyer_name": "Test Test",
          "service_information_name": "weekly_plan"
      }
  }
}

const dummyChargeResponse = {
  "id": "chg_TS07A1320241509Fi132708986",
  "object": "charge",
  "live_mode": false,
  "customer_initiated": true,
  "api_version": "V2",
  "method": "CREATE",
  "status": "INITIATED",
  "amount": 100.000,
  "currency": "KWD",
  "threeDSecure": true,
  "card_threeDSecure": false,
  "save_card": true,
  "product": "GOSELL",
  "metadata": {
      "order_id": "26",
      "account_id": "1082"
  },
  "order": {},
  "transaction": {
      "timezone": "UTC+03:00",
      "created": "1724771353986",
      "url": "na",
      "expiry": {
          "period": 30,
          "type": "MINUTE"
      },
      "asynchronous": false,
      "amount": 100.000,
      "currency": "KWD"
  },
  "response": {
      "code": "100",
      "message": "Initiated"
  },
  "receipt": {
      "email": true,
      "sms": true
  },
  "customer": {
      "id": "cus_TS01A3020240737Rt472208565",
      "first_name": "Test Test",
      "email": "buyergupta@gmail.com"
  },
  "merchant": {
      "country": "KW",
      "currency": "KWD",
      "id": "30476196"
  },
  "source": {
      "object": "source",
      "id": "src_card",
      "on_file": false
  },
  "redirect": {
      "status": "PENDING",
      "url": "/admin"
  },
  "post": {
      "status": "PENDING",
      "url": "na"
  },
  "activities": [
      {
          "id": "activity_TS04A1420241509g6D62708674",
          "object": "activity",
          "created": 1724771353986,
          "status": "INITIATED",
          "currency": "KWD",
          "amount": 100.000,
          "remarks": "charge - created",
          "txn_id": "chg_TS07A1320241509Fi132708986"
      }
  ],
  "auto_reversed": false
}

const feature = loadFeature(
  "./__tests__/features/Pricing-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Buyer opens up Pricing", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Buyer is on Pricing screen", () => {
      screen = render(<Pricing {...screenProps} />);
      render(<PricingWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      listener.simulateListener("willFocus");
      const navDataMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      navDataMsg.addData(getName(MessageEnum.Pricing), {
        stylistId: "STYLIST_ID",
      });
      runEngine.sendMessage("UNIT TEST", navDataMsg);

      const apiMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        apiMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
        dummyData,
      });
      screen.container.instance.getPricingApiCallId = apiMsg.messageId;
      runEngine.sendMessage("UNIT TEST", apiMsg);
    });

    then("Buyer can see the page without errors", () => {
      expect(screen.queryByTestId("Pricing")).not.toBe(null);
    });

    then("Buyer can Press various buttons", () => {
      let backButton = screen.getByTestId("backButtonID");
      fireEvent.press(backButton);
      let monthly_plan = screen.getByTestId("monthly_plan");
      fireEvent.press(monthly_plan);
      let quarterly_plan = screen.getByTestId("quarterly_plan");
      fireEvent.press(quarterly_plan);
      let nextButton = screen.getByTestId("nextButton");
      fireEvent.press(nextButton);
      let tAndCLink = screen.getByTestId("tAndC");
      fireEvent.press(tAndCLink);
      let tAndC = screen.getByTestId("store-button");
      fireEvent.press(tAndC);
      screen.container.instance.toggleTAndC();
      fireEvent.press(nextButton);
      const apiMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMsg.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        apiMsg.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
        dummyResponse,
      });
      screen.container.instance.hireStylistApiCallId = apiMsg.messageId;
      runEngine.sendMessage("UNIT TEST", apiMsg);
      const apiMsg1 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      apiMsg1.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        apiMsg1.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
        dummyChargeResponse,
      });
      screen.container.instance.createHireStylistChargesApiCallId = apiMsg1.messageId;
      runEngine.sendMessage("UNIT TEST", apiMsg1);
      const navMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      navMsg.addData(getName(MessageEnum.Pricing), {
        stylistId: 1007,
        from : "price"
      });
      runEngine.sendMessage("UNIT TEST", navMsg);
    });
  });
});