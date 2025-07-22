import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect, beforeEach } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import StylistDashboard from "../../src/StylistDashboard";
import StylistDashboardWeb from "../../src/StylistDashboard.web";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  refreshData: jest.fn(),
  id: "StylistDashboard",
};

const dummyRequestResponse = {
  data: [
    {
      id: "23",
      type: "hire_stylist_custom_form",
      attributes: {
        stylist_id: 972,
        gender: "male",
        colour: "Red",
        detail: "Blah blah blah",
        min_price: 100,
        max_price: 3000,
        status: "rejected",
        buyer_name: "Test Test",
        buyer_profile: null,
        stylist_name: "fashion fashion",
        stylist_profile: null,
        images: [
          {
            url: "AF9571FC872.jpg",
          },
        ],
        created_at: "06:29am",
      },
    },
    {
      id: "26",
      type: "hire_stylist_custom_form",
      attributes: {
        stylist_id: 972,
        gender: "female",
        colour: "Red",
        detail: "Be8dnnd he7djnc sigxbc",
        min_price: 20,
        max_price: 50,
        status: "pending",
        buyer_name: "buyer chandni",
        buyer_profile: null,
        stylist_name: "fashion fashion",
        stylist_profile: null,
        images: [
          {
            url: "1000237960.jpg",
          },
        ],
        created_at: "08:49am",
      },
    },
  ],
  meta: {
    total_pages: 1,
    current_page: 1,
    total_record: 2,
    prev_page: null,
    next_page: null,
  },
};

const dummyOrderResponse = {
  orders: {
    data: [
      {
        id: "1373",
        type: "seller_order_seller",
        attributes: {
          id: 1373,
          status: "new_order",
          accept_order_upload_time: null,
          created_at: "2024-09-18T09:38:30.354Z",
          updated_at: "2024-09-18T09:38:30.354Z",
          status_humanize: "New order",
          estimated_arrival_time: null,
          order_items: [
            {
              id: "2491",
              type: "order_item_seller",
              attributes: {
                status: "placed",
                placed_at: "2024-09-18T09:38:30.334Z",
                confirmed_at: null,
                in_transit_at: null,
                delivered_at: null,
                cancelled_at: null,
                rejected_at: null,
                process_at: null,
                shipped_at: null,
                return_at: null,
                return_cancel_at: null,
                return_pick_at: null,
                return_placed_at: null,
                return_confirmed_at: null,
                return_reject_at: null,
                returned_assign_at: null,
                quantity: 1,
                unit_price: "900.0",
                total_price: "900.0",
                reason_of_rejection: null,
                reason_of_return: null,
                refunded_cancel_at: null,
                reason_refunded_cancel: null,
                refunded_at: null,
                return_type: null,
                status_humanize: "Placed",
                catalogue_name: "Pantaloons",
                brand_name: "H&M",
                catalogue_variant_color: "Black",
                catalogue_variant_sku: "ABCfD22452",
                catalogue_variant_size: "Small",
                catalogue_variant_front_image: "",
                catalogue_variant_back_image: "",
                catalogue_variant_side_image: "",
                driver_name: null,
                driver_latitude: null,
                driver_longitude: null,
                driver_phone_number: null,
                otp: null,
                stylist_full_name: "fashion fashion",
                stylist_id: 972,
              },
            },
          ],
          order_management_order: {
            id: "1924",
            type: "order_seller_side",
            attributes: {
              order_number: "OD00000958",
              account: "Test Test",
              sub_total: "900.0",
              total: "900.0",
              status: "placed",
              placed_at: "2024-09-18T09:38:30.268Z",
              confirmed_at: null,
              in_transit_at: null,
              delivered_at: null,
              cancelled_at: null,
              refunded_at: null,
              returned_at: null,
              deliver_by: null,
              order_status_id: 2,
              created_at: "2024-09-18T09:38:30.139Z",
              updated_at: "2024-09-18T09:38:30.305Z",
              order_deliver_date: "09-12-2024",
              order_deliver_time: "2PM",
              delivery_addresses: {
                id: "1320",
                type: "delivery_address",
                attributes: {
                  name: "Priyanh",
                  country_code: "+91",
                  phone_number: "8899787678",
                  contact_number: "+918899787678",
                  street: "Indore, Madhya Pradesh, India",
                  zip_code: "452002",
                  area: "New area",
                  block: "Block",
                  city: null,
                  house_or_building_number: "34",
                  address_name: "Home",
                  is_default: true,
                  latitude: 22.7195687,
                  longitude: 75.8577258,
                },
              },
              order_return_date: null,
              order_return_time: null,
              returned_assign_at: null,
              refunded_cancel_at: null,
              reason_refunded_cancel: null,
              applied_discount: "0.0",
              status_humanize: "Placed",
              payment_detail: null,
              applied_coupon_code: null,
            },
          },
        },
      },
    ],
  },
};

const dummyOrderResponse2 = {
  error: "No orders found.",
};

const feature = loadFeature(
  "./__tests__/features/stylist-dashboard-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.useFakeTimers();
  });

  test("Stylist opens up StylistDashboard", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;
    given("Stylist is on dashboard screen", () => {
      screen = render(<StylistDashboard {...screenProps} />);
      render(<StylistDashboardWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseData));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      // Fetch New requests
      const getRequestsMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getRequestsMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          getRequestsMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          dummyRequestResponse,
      });
      screen.container.instance.getRequestsApiCallId =
        getRequestsMessage.messageId;
      runEngine.sendMessage("UNIT TEST", getRequestsMessage);

      // Fetch New Orders
      const getOrdersMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getOrdersMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          getOrdersMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          dummyOrderResponse2,
      });
      screen.container.instance.getNewOrderListApiCallId =
        getOrdersMessage.messageId;
      runEngine.sendMessage("UNIT TEST", getOrdersMessage);
      getOrdersMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          getOrdersMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          dummyOrderResponse,
      });
      screen.container.instance.getNewOrderListApiCallId =
        getOrdersMessage.messageId;
      runEngine.sendMessage("UNIT TEST", getOrdersMessage);
    });

    then("stylist can see the page without errors", () => {
      expect(screen.queryByTestId("stylistDashboard")).not.toBe(null);
      jest.advanceTimersByTime(10000);
      screen.container.instance.setState({
        timeRemainingData: [
          { id: "1", timeRemaining: 5 },
          { id: "2", timeRemaining: 3 },
          { id: "3", timeRemaining: 1 },
        ],
      });
      screen.container.instance.startReducingTimer();
      jest.advanceTimersByTime(6000);
      screen.container.instance.navigateToStlistAsBuyer();
      screen.container.instance.navigateToStylistRequests();
      screen.container.instance.navigateToOrders();
      screen.container.instance.navigationHandler("id");
      screen.container.instance.navigationToRejectOrder("id");
      screen.container.instance.navigationToAcceptOrder("id");
      screen.container.instance.getGender("male");
      screen.container.instance.formatTime("08:49am");
      screen.container.instance.formatTime("12:00am");
      screen.container.instance.formatTime("01:00am");
      screen.container.instance.formatTime("11:59am");
      screen.container.instance.formatTime("12:00pm");
      screen.container.instance.formatTime("01:00pm");
      screen.container.instance.formatTime("06:45pm");
      screen.container.instance.formatTime("11:59pm");
      screen.container.instance.formatTime("8:49am");
      screen.container.instance.formatTime("13:00pm");
      screen.container.instance.formatTime("00:00am");
      screen.container.instance.formatTime("12:01pm");

      const scrollView = screen.getByTestId("scrollView-stylist-dashboard");
      fireEvent(scrollView, "onRefresh");
      screen.container.instance.refreshData();
      jest.advanceTimersByTime(4000);
    });

    then("I can click analytics for stylist with out errors", () => {
      const testTestName = "btnRedirectAnalytics";
      const { getByTestId } = render(<StylistDashboard {...screenProps} />);
      const foundButton = getByTestId(testTestName);
      fireEvent.press(getByTestId(testTestName));
      expect(foundButton).toBeTruthy();
    });
  });

  test("Stylist opens up StylistDashboard when profile is  under review", ({
    given,
    when,
    then,
  }) => {
    let screen: ReturnType<typeof render>;
    given("Stylist is on dashboard screen", () => {
      screen = render(<StylistDashboard {...screenProps} />);
      render(<StylistDashboardWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
      const tokenMsg = new Message(getName(MessageEnum.SessionResponseData));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("UNIT TEST", tokenMsg);

      // Fetch New requests
      const getRequestsMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getRequestsMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          getRequestsMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          dummyRequestResponse,
      });
      screen.container.instance.getRequestsApiCallId =
        getRequestsMessage.messageId;
      runEngine.sendMessage("UNIT TEST", getRequestsMessage);

      // Fetch New Orders
      const getOrdersMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getOrdersMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          getOrdersMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          dummyOrderResponse2,
      });
      screen.container.instance.getNewOrderListApiCallId =
        getOrdersMessage.messageId;
      runEngine.sendMessage("UNIT TEST", getOrdersMessage);
      getOrdersMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          getOrdersMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          dummyOrderResponse,
      });
      screen.container.instance.getNewOrderListApiCallId =
        getOrdersMessage.messageId;
      runEngine.sendMessage("UNIT TEST", getOrdersMessage);
      const requestmsg = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      requestmsg.addData(getName(MessageEnum.storeIDMessage), {
        underReview: true,
      });
      runEngine.sendMessage("UNIT TEST", requestmsg);
    });

    then("stylist can see the under review message on screen", () => {
      expect(screen.queryByTestId("stylistDashboard")).not.toBe(null);
    });
  });
});
