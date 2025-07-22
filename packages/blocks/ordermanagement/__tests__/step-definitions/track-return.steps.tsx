import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { loadFeature, defineFeature } from "jest-cucumber";
import { jest, beforeAll, expect } from "@jest/globals";

import * as utils from "../../../../framework/src/Utilities";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../../framework/src/RunEngine";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  id: "TrackReturnOrder",
};

import TrackReturn from "../../src/TrackReturn";

const feature = loadFeature(
  "./__tests__/features/track-order-scenario.feature"
);

defineFeature(feature, (test) => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest
      .spyOn(utils, "getStorageData")
      .mockImplementation(() => Promise.resolve("token"));
  });

  test("I am a seller checking status of return item", ({
    given,
    when,
    then,
  }) => {
    let screen: ReturnType<typeof render>;

    given("I have opned the page", () => {
      screen = render(<TrackReturn {...screenProps} />);
    });

    when("data is loaded", () => {
      const payload = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      payload.initializeFromObject({
        [getName(MessageEnum.NavigationOrderSummaryData)]: {
          pickedUpAt: "2024-08-16T08:18:10.831Z",
          completeAt: null,
          otp: null,
          latitude: 1,
          longitude: 1,
          eta: null,
        },
        [getName(MessageEnum.NavigationOrderStatusId2)]: "OD009",
      });
      runEngine.sendMessage("UNIT TEST", payload);

      const navigationPayload2 = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navigationPayload2.initializeFromObject({
        [getName(MessageEnum.NavigationOrderStatusId2)]: "OD009",
        [getName(MessageEnum.NavigationOrderSummaryData)]: {
          pickedUpAt: "2024-08-16T08:18:10.831Z",
          completeAt: "2024-08-16T08:19:10.870Z",
          otp: 1234,
          latitude: 1,
          longitude: 1,
          eta: "5 mins",
        },
      });
      runEngine.sendMessage("UNIT TEST", navigationPayload2);
    });

    then("I can see the map and timeline", () => {
      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          orders: {
            data: [
              {
                id: "999",
                type: "seller_order_seller",
                attributes: {
                  id: 999,
                  status: "return_in_process",
                  accept_order_upload_time: null,
                  status_humanize: "Return in process",
                  order_items: [
                    {
                      id: "1684",
                      type: "order_item_seller",
                      attributes: {
                        status: "return_confirmed",
                        placed_at: "2024-08-09T07:06:18.249Z",
                        confirmed_at: "2024-08-09T07:06:52.411Z",
                        in_transit_at: "2024-08-09T07:34:55.752Z",
                        delivered_at: "2024-08-09T07:35:13.876Z",
                        cancelled_at: null,
                        rejected_at: null,
                        process_at: "2024-08-09T07:33:45.954Z",
                        shipped_at: null,
                        return_at: null,
                        return_cancel_at: null,
                        return_pick_at: "2024-08-11T12:53:22.334Z",
                        return_placed_at: "2024-08-09T07:44:43.069Z",
                        return_confirmed_at: "2024-08-09T08:57:36.326Z",
                        return_reject_at: null,
                        returned_assign_at: "2024-08-11T12:52:19.186Z",
                        quantity: 1,
                        unit_price: "29.0",
                        total_price: "29.0",
                        reason_of_rejection: null,
                        reason_of_return: "aise hi",
                        refunded_cancel_at: null,
                        reason_refunded_cancel: null,
                        refunded_at: null,
                        status_humanize: "Return confirmed",
                        catalogue_name: "Show Time Merchandise",
                        brand_name: "ShowTime",
                        catalogue_variant_color: "Black",
                        catalogue_variant_sku: "ST00001",
                        catalogue_variant_size: "Medium",
                        catalogue_variant_back_image: "",
                        catalogue_variant_side_image: "",
                        driver_name: "Heavy Driver",
                        driver_latitude: 21.8812053,
                        driver_longitude: 87.7589865,
                        driver_phone_number: "96522659594",
                        otp: null,
                        store_name: "Show Time",
                      },
                    },
                  ],
                  order_management_order: {
                    id: "1299",
                    type: "order_seller_side",
                    attributes: {
                      order_number: "OD00000417",
                      account: "Stingy Buyer",
                      sub_total: "29.0",
                      total: "93.22",
                      status: "return_order",
                      placed_at: "2024-08-09T07:06:18.180Z",
                      confirmed_at: "2024-08-09T07:06:52.457Z",
                      in_transit_at: "2024-08-09T07:34:55.796Z",
                      delivered_at: "2024-08-09T07:35:13.907Z",
                      created_at: "2024-08-09T07:02:57.495Z",
                      updated_at: "2024-08-11T12:53:22.398Z",
                      order_return_date: "10-08-2024",
                      order_return_time: "7 AM",
                      status_humanize: "Return order",
                      delivery_addresses: {
                        id: "782",
                        type: "delivery_address",
                        attributes: {
                          name: "Stingy Buyer",
                          country_code: "+965",
                          phone_number: "22653505",
                          contact_number: "+96522653505",
                          street: "Nachinda, West Bengal 721444, India",
                          zip_code: "",
                          area: "Nachinda",
                          block: "Contai",
                          city: null,
                          house_or_building_number: "N/A",
                          address_name: "Work",
                          is_default: true,
                          latitude: 21.8747184,
                          longitude: 87.7522512,
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
      });
      screen.container.instance.searchWithOrderId = message.messageId;
      runEngine.sendMessage("UNIT TEST", message);

      const mapView = screen.getByTestId("mapView");
      expect(mapView).not.toBe(null);

      fireEvent(mapView, "layout");
      jest.advanceTimersByTime(500);

      fireEvent.press(screen.getByTestId("backBtn"));
    });
  });
});
