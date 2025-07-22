import React from "react";
import { jest, expect, beforeAll, describe, it, test } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";

import * as helpers from "framework/src/Helpers";
import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import * as utils from "../../../../framework/src/Utilities";
import Checkout from "../../src/Checkout";
import { CartWithItemsResponse } from "../../src/response";

const config = require("../../src/config");

class EventListener {
  listeners: Map<string, Array<(...args: unknown[]) => unknown>>;
  constructor() {
    this.listeners = new Map();
  }

  addEventListener = (event: string, func: (...args: unknown[]) => unknown) => {
    const callbacks = this.listeners.get(event);
    this.listeners.set(event, callbacks ? [...callbacks, func] : [func]);

    return {
      remove: () => {
        this.listeners.delete(event);
      },
    };
  };

  simulateListener = async (event: string, args: unknown[] = []) => {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      for (const callback of callbacks) {
        await callback(...args);
      }
    }
  };
}

const listener = new EventListener();

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    addListener: listener.addEventListener,
    goBack: jest.fn(),
  },
  id: "Checkout",
};

const testOrderData = {
  data: {
    id: "120",
    type: "cart_order",
    attributes: {
      id: 120,
      order_number: "OD00000104",
      title: "Order Summary",
      amount: null,
      order_item_count: 1,
      account_id: 423,
      coupon_code_id: null,
      delivery_address_id: 10,
      sub_total: "20000.0",
      total: "23600.0",
      status: "created",
      custom_label: null,
      applied_discount: "2",
      cancellation_reason: null,
      order_date: null,
      is_gift: false,
      placed_at: null,
      confirmed_at: null,
      in_transit_at: null,
      delivered_at: null,
      cancelled_at: null,
      refunded_at: null,
      source: null,
      shipment_id: null,
      delivery_charges: null,
      tracking_url: null,
      schedule_time: null,
      payment_failed_at: null,
      payment_pending_at: null,
      returned_at: null,
      tax_charges: "0.0",
      deliver_by: null,
      tracking_number: null,
      is_error: false,
      delivery_error_message: null,
      order_status_id: 1,
      is_group: true,
      is_availability_checked: false,
      shipping_charge: "50.0",
      shipping_discount: "50.0",
      shipping_net_amt: "0.0",
      shipping_total: "0.0",
      total_tax: 3600.0,
      created_at: "2024-04-18T05:52:57.886Z",
      updated_at: "2024-04-18T10:27:30.872Z",
      order_deliver_date: null,
      order_deliver_time: null,
      delivery_addresses: {
        id: "9",
        type: "delivery_address",
        attributes: {
          name: "Arnab",
          country_code: "+91",
          phone_number: "8910369200",
          contact_number: "+918910369200",
          street: "A.B. Road",
          zip_code: "125133",
          area: "Vijay Nagar",
          block: "D",
          city: "Bhopal",
          house_or_building_number: "207",
          address_name: "Home",
          is_default: true,
          latitude: 33.755787,
          longitude: -116.359998,
        },
      },
      order_return_date: null,
      order_return_time: null,
      razorpay_order_id: null,
      charged: null,
      invoice_id: null,
      invoiced: null,
      order_items: [
        {
          id: "181",
          type: "order_item_seller",
          attributes: {
            quantity: 20,
            unit_price: "1000.0",
            total_price: "20000.0",
            estimated_delivery_time: "2024-04-20T10:45:56.030Z",
            reason_of_rejection: null,
            catalogue_name: "Brand1",
            brand_name: "H&M",
            catalogue_variant_color: "Grey",
            catalogue_variant_sku: "ABCD222",
            store_name: null,
            catalogue_variant_size: "L",
            catalogue_variant_front_image: "",
            catalogue_variant_back_image: "",
            catalogue_variant_side_image: "",
          },
        },
      ],
      payment_detail: null,
    },
  },
} as CartWithItemsResponse;

describe("Checkout Screen", () => {
  let screen: ReturnType<typeof render>;

  beforeAll(() => {
    jest.useFakeTimers();
    screen = render(<Checkout {...screenProps} />);
    listener.simulateListener("willFocus");
  });

  it("should render loading screen", () => {
    expect(screen.queryByTestId("loader")).not.toBeNull();
  });

  test("should render no address when no address added", () => {

    const tokenMsg: Message = new Message(
      getName(MessageEnum.SessionResponseMessage)
    );
    tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
    runEngine.sendMessage("UNIT TEST", tokenMsg);

    const getCartMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    getCartMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        getCartMessage.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        data: {
          ...testOrderData.data,
          attributes: {
            ...testOrderData.data.attributes,
            delivery_addresses: null,
            delivery_address_id: null,
          },
        },
      } as CartWithItemsResponse,
    });
    screen.container.instance.cartApiCallId = getCartMessage.messageId;
    runEngine.sendMessage("UNIT TEST", getCartMessage);

    expect(screen.queryByTestId("addAddress")).not.toBeNull();
  });

  test("user can go to add address page", () => {
    const addAddress = screen.getByTestId("addAddress");
    fireEvent.press(addAddress);
  });

  test("should render address when available", async() => {
   
    jest.spyOn(utils, "getStorageData").mockImplementation((key):any => {
     
      if (key === "buyNowOrderID") {
       
        return null;
      }
     
  })
    const getCartMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );

    getCartMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        getCartMessage.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: testOrderData,
    });
    screen.container.instance.cartApiCallId = getCartMessage.messageId;
    runEngine.sendMessage("UNIT TEST", getCartMessage);
    expect(screen.queryByTestId("editAddress")).not.toBeNull();
  });

  test("user can go to edit address page", () => {
    const editAddress = screen.getByTestId("editAddress");
    fireEvent.press(editAddress);
  });

  test("user click and dismiss coupon input", async() => {
   
    fireEvent.press(screen.getByTestId("focusArea"));
    const coupon = screen.getByTestId("couponInput");
    fireEvent(coupon, "focus");
    fireEvent(coupon, "blur");
    expect(coupon.props.value).toBe(config.promoPlaceHolder);
  });

  test("user can't submit empty coupon", () => {
    const coupon = screen.getByTestId("couponInput");
    fireEvent(coupon, "focus");
    fireEvent(coupon, "onSubmitEditing");
    expect(coupon.props.value).toBe('');
  });

  test("user can't submit placeholder coupon", () => {
    const coupon = screen.getByTestId("couponInput");
    fireEvent.changeText(coupon, config.promoPlaceHolder);
    fireEvent(coupon, "onSubmitEditing");
    expect(screen.getByTestId("promoError")).not.toBeNull();
  });

  test("user can enter coupon", () => {
    const coupon = screen.getByTestId("couponInput");
    fireEvent.changeText(coupon, "MYCOUPON");
    expect(coupon.props.value).toBe("MYCOUPON");
  });

  test("user can apply coupon", () => {
    // fireEvent.press(screen.getByTestId("applyCoupon"));
    const coupon = screen.getByTestId("couponInput");
    fireEvent(coupon, "submitEditing");

    const apiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
    apiMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: apiMessage.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        data: {
          message: "Coupon Applied Successfully",
          coupon: {
            data: {
              ...testOrderData.data,
              attributes: {
                ...testOrderData.data.attributes,
                applied_discount: "1.2",
                applied_copon_code: "MYCOUPON",
              },
            },
          } as CartWithItemsResponse,
        },
      },
    });
    screen.container.instance.applyCouponApiCallId = apiMessage.messageId;
    runEngine.sendMessage(apiMessage.messageId, apiMessage);
  });

  test("user can remove coupon", () => {
    const rmbutton = screen.getByTestId("removeCoupon");
    fireEvent.press(rmbutton);

    const apiMessage = new Message(getName(MessageEnum.RestAPIResponceMessage));
    apiMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: apiMessage.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        data: {
          message: "Coupon Applied Successfully",
          data: {
            ...testOrderData.data,
            attributes: {
              ...testOrderData.data.attributes,
              applied_discount: "0.0",
              applied_copon_code: null,
            },
          },
        },
      },
    });
    screen.container.instance.removeCouponApiCallId = apiMessage.messageId;
    runEngine.sendMessage(apiMessage.messageId, apiMessage);

    const coupon = screen.getByTestId("couponInput");
    expect(coupon.props.value).toBe(config.promoPlaceHolder);

    const failMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    failMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: failMessage.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        message: "coupon not found",
      },
    });
    screen.container.instance.applyCouponApiCallId = failMessage.messageId;
    runEngine.sendMessage("UNIT TEST", failMessage);
  });

  test("user can checkout", () => {
    const checkout = screen.getByTestId("checkoutBtn");

    const getCartMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    getCartMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        getCartMessage.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        data: {
          ...testOrderData.data,
          attributes: {
            ...testOrderData.data.attributes,
            delivery_address_id: null,
            delivery_addresses: null,
          },
        },
      } as CartWithItemsResponse,
    });
    screen.container.instance.cartApiCallId = getCartMessage.messageId;
    runEngine.sendMessage("UNIT TEST", getCartMessage);

    fireEvent.press(checkout);

    getCartMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      testOrderData
    );
    runEngine.sendMessage("UNIT TEST", getCartMessage);

    const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        transaction: {
          url: "http://example.com",
        },
        id: "charge_007",
      },
    });
    screen.container.instance.placeCartApiCallId = message.messageId;
    runEngine.sendMessage("UNIT TEST", message);
  });

  test("user can checkout for address", () => {
    const checkout = screen.getByTestId("checkoutBtn");

    const getCartMessage = new Message(
      getName(MessageEnum.RestAPIResponceMessage)
    );
    getCartMessage.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]:
        getCartMessage.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        data: {
          ...testOrderData.data,
          attributes: {
            ...testOrderData.data.attributes,
            delivery_address_id: null,
            delivery_addresses: null,
          },
        },
      } as CartWithItemsResponse,
    });
    screen.container.instance.cartApiCallId = getCartMessage.messageId;
    runEngine.sendMessage("UNIT TEST", getCartMessage);

    fireEvent.press(checkout);

    getCartMessage.addData(
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      testOrderData
    );
    runEngine.sendMessage("UNIT TEST", getCartMessage);

    fireEvent.press(checkout);

    const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
      [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
        transaction: {
          url: "http://example.com",
        },
        id: "charge_007",
      },
    });
    screen.container.instance.placeCartApiCallId = message.messageId;
    runEngine.sendMessage("UNIT TEST", message);

    listener.simulateListener("willBlur");
  });
});
