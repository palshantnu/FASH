import { defineFeature, loadFeature } from "jest-cucumber";
import { render, fireEvent } from "@testing-library/react-native";
import { jest, expect, beforeEach } from "@jest/globals";
import { shallow, ShallowWrapper } from "enzyme";
import * as helpers from "../../../../framework/src/Helpers";
import * as utils from "../../../../framework/src/Utilities";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import ShoppingCartOrders from "../../src/ShoppingCartOrders";

export const configJSON = require("../../config.json");
import { _ } from "../../../../framework/src/IBlock";
import { CartWithItemsResponse } from "../../src/response";

import * as alert from "../../../../components/src/CustomAlert";

const listenerMap = new Map<string, (...args: unknown[]) => unknown>();

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    addListener: (_name: string, _callback: (..._x: unknown[]) => unknown) => {
      listenerMap.set(_name, _callback);
      return {
        remove: () => listenerMap.delete(_name),
      };
    },
  },
  id: "ShoppingCartOrders",
};

const feature = loadFeature(
  "./__tests__/features/shopppingcart-orders-scenario.feature"
);

const testCartData = {
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
      applied_discount: "0.0",
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
            quantity: 1,
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
};

const updateQuantitySuccess = {
  data: {
    id: "181",
    type: "order_item",
    attributes: {
      id: 181,
      order_management_order_id: 120,
      variant_availability: "available",
      quantity: 2,
      unit_price: "1000.0",
      total_price: "2000.0",
      old_unit_price: null,
      status: "in_cart",
      catalogue_id: 221,
      catalogue_variant_id: 369,
      order_status_id: 1,
      placed_at: null,
      confirmed_at: null,
      in_transit_at: null,
      delivered_at: null,
      cancelled_at: null,
      refunded_at: null,
      manage_placed_status: false,
      manage_cancelled_status: false,
      created_at: "2024-04-18T05:52:57.941Z",
      updated_at: "2024-04-18T10:48:41.351Z",
      reason_of_rejection: null,
      rejected_at: null,
      estimated_delivery_time: "2024-04-20T10:48:41.395Z",
      accept_order_upload_time: null,
      item_return_date: null,
      item_return_time: null,
      order_statuses: {
        order_number: "OD00000104",
        placed_at: null,
        confirmed_at: null,
        in_transit_at: null,
        delivered_at: null,
        cancelled_at: null,
        refunded_at: null,
      },
      catalogue: {
        id: "221",
        type: "catalogue",
        attributes: {
          name: "Brand1",
          brand: null,
          tags: {
            data: [],
          },
          reviews: [],
          sku: null,
          description: "Lorem Ipsum",
          manufacture_date: null,
          length: null,
          breadth: null,
          height: null,
          stock_qty: null,
          availability: null,
          weight: null,
          price: null,
          recommended: null,
          on_sale: null,
          sale_price: null,
          discount: null,
          is_wishlist: null,
          product_number: null,
          primary_image: null,
          primary_price: "1000.0",
          gender: "female",
          brand_name: "H&M",
          material: "Cotton",
          fit: "Slim Fit",
          prodcut_care: "Machine Wash",
          list_the_product: "listed",
          fit_discription: "Lorem Ipsum",
          category: {
            id: "66",
            type: "category",
            attributes: {
              id: 66,
              name: "Men's Clothing",
              status: "active",
              created_at: "2023-12-08T10:31:07.151Z",
              updated_at: "2023-12-19T12:56:16.170Z",
              image:
                "https://fash.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcU1DIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--635331413d8dd9a04239ed860f9fe9565c5b2a77/1.2MB.jpg",
            },
          },
          sub_category: {
            id: "442",
            type: "sub_category",
            attributes: {
              id: 442,
              name: "Shirts",
              created_at: "2023-12-08T10:31:07.164Z",
              updated_at: "2023-12-08T10:31:07.164Z",
              image: "",
            },
          },
          sub_sub_category: {
            id: "24",
            type: "sub_sub_category",
            attributes: {
              id: 24,
              name: "Dress Shirts",
              created_at: "2023-12-08T10:31:07.178Z",
              updated_at: "2023-12-08T10:31:07.178Z",
              image: "",
            },
          },
          service: null,
          average_rating: 0,
          catalogue_variants: [
            {
              id: "369",
              type: "catalogue_variant",
              attributes: {
                id: 369,
                catalogue_id: 221,
                catalogue_variant_color_id: 7,
                catalogue_variant_color: {
                  id: 7,
                  name: "Grey",
                  created_at: "2023-10-05T05:19:28.122Z",
                  updated_at: "2023-10-05T05:19:28.122Z",
                },
                catalogue_variant_size_id: 10,
                catalogue_variant_size: {
                  id: 10,
                  name: "L",
                  created_at: "2024-03-29T11:16:18.686Z",
                  updated_at: "2024-03-29T11:16:18.686Z",
                },
                price: "1000.0",
                stock_qty: 20,
                on_sale: null,
                sale_price: null,
                discount_price: null,
                length: null,
                breadth: null,
                height: null,
                created_at: "2024-04-16T07:19:31.600Z",
                updated_at: "2024-04-16T07:37:09.006Z",
                sku: "ABCD222",
                deactivate: false,
                low_stock_threshold: 0,
                is_listed: true,
                front_image: "",
                back_image: "",
                side_image: "",
                pair_it_with: [],
              },
            },
          ],
          catalogue_variants_with_store: [
            {
              id: "369",
              type: "catalogue_variant",
              attributes: {
                id: 369,
                catalogue_id: 221,
                catalogue_variant_color_id: 7,
                catalogue_variant_color: {
                  id: 7,
                  name: "Grey",
                  created_at: "2023-10-05T05:19:28.122Z",
                  updated_at: "2023-10-05T05:19:28.122Z",
                },
                catalogue_variant_size_id: 10,
                catalogue_variant_size: {
                  id: 10,
                  name: "L",
                  created_at: "2024-03-29T11:16:18.686Z",
                  updated_at: "2024-03-29T11:16:18.686Z",
                },
                price: "1000.0",
                stock_qty: 20,
                on_sale: null,
                sale_price: null,
                discount_price: null,
                length: null,
                breadth: null,
                height: null,
                created_at: "2024-04-16T07:19:31.600Z",
                updated_at: "2024-04-16T07:37:09.006Z",
                sku: "ABCD222",
                deactivate: false,
                low_stock_threshold: 0,
                is_listed: true,
                front_image: "",
                back_image: "",
                side_image: "",
                pair_it_with: [],
              },
              store_info: {},
            },
          ],
        },
      },
      catalogue_variant: {
        id: "369",
        type: "catalogue_variant",
        attributes: {
          id: 369,
          catalogue_id: 221,
          catalogue_variant_color_id: 7,
          catalogue_variant_color: {
            id: 7,
            name: "Grey",
            created_at: "2023-10-05T05:19:28.122Z",
            updated_at: "2023-10-05T05:19:28.122Z",
          },
          catalogue_variant_size_id: 10,
          catalogue_variant_size: {
            id: 10,
            name: "L",
            created_at: "2024-03-29T11:16:18.686Z",
            updated_at: "2024-03-29T11:16:18.686Z",
          },
          price: "1000.0",
          stock_qty: 20,
          on_sale: null,
          sale_price: null,
          discount_price: null,
          length: null,
          breadth: null,
          height: null,
          created_at: "2024-04-16T07:19:31.600Z",
          updated_at: "2024-04-16T07:37:09.006Z",
          sku: "ABCD222",
          deactivate: false,
          low_stock_threshold: 0,
          is_listed: true,
          front_image: "",
          back_image: "",
          side_image: "",
          pair_it_with: [],
        },
        store_info: null,
      },
    },
  },
};

const testOrderDataWithStore = [
  {
    id: 2,
    type: "order",
    attributes: {
      status: "scheduled",
      total_fees: 0.0,
      total_items: 0,
      total_tax: 0.0,
      customer: {
        data: {
          id: 1,
          type: "account",
          attributes: {
            activated: true,
            country_code: null,
            email: "tester@me.com",
            first_name: "test",
            full_phone_number: "",
            last_name: "account",
            phone_number: null,
            type: "EmailAccount",
            created_at: "2022-01-11T15:22:38.266Z",
            updated_at: "2022-01-11T15:22:38.266Z",
            device_id: null,
            unique_auth_id: null
          }
        }
      },
      address: {
        data: null
      },
      order_items: [
        {
          "id": "2352",
          "type": "order_item_seller",
          "attributes": {
              "status": "in_cart",
              "placed_at": null,
              "confirmed_at": null,
              "in_transit_at": null,
              "delivered_at": null,
              "cancelled_at": null,
              "rejected_at": null,
              "process_at": null,
              "shipped_at": null,
              "return_at": null,
              "return_cancel_at": null,
              "return_pick_at": null,
              "return_placed_at": null,
              "return_confirmed_at": null,
              "return_reject_at": null,
              "returned_assign_at": null,
              "quantity": 1,
              "unit_price": "6000.0",
              "total_price": "6000.0",
              "reason_of_rejection": null,
              "reason_of_return": null,
              "refunded_cancel_at": null,
              "reason_refunded_cancel": null,
              "refunded_at": null,
              "return_type": null,
              "status_humanize": "In cart",
              "catalogue_name": "Partwear gown long",
              "brand_name": "Asopalav",
              "catalogue_variant_color": "Maroon",
              "catalogue_variant_sku": "re1",
              "catalogue_variant_size": "XL",
              "catalogue_variant_front_image": null,
              "catalogue_variant_back_image": null,
              "catalogue_variant_side_image": "",
              "driver_name": null,
              "driver_latitude": null,
              "driver_longitude": null,
              "driver_phone_number": null,
              "otp": null,
              "store_name": "VenHuesen"
          }
      },
      {
          "id": "2359",
          "type": "order_item_seller",
          "attributes": {
              "status": "in_cart",
              "placed_at": null,
              "confirmed_at": null,
              "in_transit_at": null,
              "delivered_at": null,
              "cancelled_at": null,
              "rejected_at": null,
              "process_at": null,
              "shipped_at": null,
              "return_at": null,
              "return_cancel_at": null,
              "return_pick_at": null,
              "return_placed_at": null,
              "return_confirmed_at": null,
              "return_reject_at": null,
              "returned_assign_at": null,
              "quantity": 1,
              "unit_price": "1000.0",
              "total_price": "1000.0",
              "reason_of_rejection": null,
              "reason_of_return": null,
              "refunded_cancel_at": null,
              "reason_refunded_cancel": null,
              "refunded_at": null,
              "return_type": null,
              "status_humanize": "In cart",
              "catalogue_name": "Nature",
              "brand_name": "H&M",
              "catalogue_variant_color": "Black",
              "catalogue_variant_sku": "abc12",
              "catalogue_variant_size": "Small",
              "catalogue_variant_front_image": "",
              "catalogue_variant_back_image": "",
              "catalogue_variant_side_image": "",
              "driver_name": null,
              "driver_latitude": null,
              "driver_longitude": null,
              "driver_phone_number": null,
              "otp": null
          }
        }
      ]
    }
  }
]

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    jest.mock("react-native-flash-message", () => ({ showMessage: jest.fn() }));
    jest
      .spyOn(utils, "getStorageData")
      .mockImplementationOnce(async () => "")
      .mockImplementationOnce(async () => "true");
  });

  test("User navigates to ShoppingCartOrders", ({ given, when, then, and }) => {
    let rendered: ReturnType<typeof render>;
    let ShoppingCartOrdersWrapper: ShallowWrapper
    let shoppingInstance: ShoppingCartOrders
    given("I am a User loading ShoppingCartOrders", () => {
      rendered = render(<ShoppingCartOrders {...screenProps} />);
      listenerMap.get("willFocus")!();
      ShoppingCartOrdersWrapper = shallow(<ShoppingCartOrders {...screenProps} />)
    });

    when("I navigate to the ShoppingCartOrders", () => {
      shoppingInstance = ShoppingCartOrdersWrapper.instance() as ShoppingCartOrders
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const responseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      rendered.container.instance.getCartApiCallId = responseMessage.messageId;
      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMessage.messageId
      );
      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        testCartData
      );
      runEngine.sendMessage("Unit Test", responseMessage);
    });

    then("ShoppingCartOrders will load with out errors", () => {
      const header = rendered.getByTestId("countHeaderText");
      expect(header.props.children.join("")).toBe("1 items");
      shoppingInstance.getRenderCost({
        sub_total : 100,
        total_tax : 10,
        shipping_total : 10,
        total : 10,
      })
      shoppingInstance.getRenderCost({
        sub_total : null,
        total_tax : null,
        shipping_total : null,
        total : null,
      })
    });

    and("I can see my cart items", () => {
      const cartItems = rendered.getAllByTestId("cartItem");
      expect(cartItems.length).toBe(
        testCartData.data.attributes.order_items.length
      );
      const itemImage = rendered.getByTestId("catalogueItem_0");
      fireEvent.press(itemImage);
    });

    when("I click the plus button", () => {
      const incrementButton = rendered.getByTestId("incrementBtn");
      fireEvent.press(incrementButton);
    });

    then("Cart item quantity gets increased", () => {
      const increaseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      increaseMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          increaseMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          updateQuantitySuccess,
      });
      rendered.container.instance.updateQuantityApiCallId =
        increaseMessage.messageId;
      runEngine.sendMessage("Unit Test", increaseMessage);

      const getCartMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCartMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          getCartMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {
            ...testCartData.data,
            attributes: {
              ...testCartData.data.attributes,
              order_items: [
                {
                  ...testCartData.data.attributes.order_items[0],
                  attributes: {
                    ...testCartData.data.attributes.order_items[0].attributes,
                    quantity: 2,
                  },
                },
              ],
              applied_copon_code: "FASH99",
              applied_discount: "1.2",
            },
          },
        } as CartWithItemsResponse,
      });
      rendered.container.instance.getCartApiCallId = getCartMessage.messageId;
      runEngine.sendMessage("Unit Test", getCartMessage);

      expect(rendered.getByTestId("quantityValue").children[0]).toBe("2");
    });

    when("I click on minus button", () => {
      const decrementButton = rendered.getByTestId("decrementBtn");
      fireEvent.press(decrementButton);
    });

    then("Cart item quantity gets decreased", () => {
      const increaseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      increaseMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          increaseMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {
            ...updateQuantitySuccess.data,
            attributes: {
              ...updateQuantitySuccess.data.attributes,
              quantity: 1,
            },
          },
        },
      });
      rendered.container.instance.updateQuantityApiCallId =
        increaseMessage.messageId;
      runEngine.sendMessage("Unit Test", increaseMessage);
      const getCartMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCartMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          getCartMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {
            ...testCartData.data,
            attributes: {
              ...testCartData.data.attributes,
              order_items: [
                {
                  ...testCartData.data.attributes.order_items[0],
                  attributes: {
                    ...testCartData.data.attributes.order_items[0].attributes,
                    quantity: 1,
                  },
                },
              ],
            },
          },
        },
      });
      rendered.container.instance.getCartApiCallId = getCartMessage.messageId;
      runEngine.sendMessage("Unit Test", getCartMessage);

      expect(rendered.getByTestId("quantityValue").children[0]).toBe("1");
    });

    when("I click on Checkout button", () => {
      fireEvent.press(rendered.getByTestId("checkout"));
    });

    then("I can leave the screen with out errors", () => {
      const backButton = rendered.getByTestId("btnBackCatalogue");
      fireEvent(backButton, "onPress");

      listenerMap.get("willBlur")!();
      rendered.unmount();

      const getOrderStatusMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      getOrderStatusMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getOrderStatusMessage.messageId
      );

      getOrderStatusMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: testOrderDataWithStore,
        }
      );
      shoppingInstance.getOrdersApiCallId = getOrderStatusMessage.messageId;
      runEngine.sendMessage("Unit Test", getOrderStatusMessage);
      shoppingInstance.setState({languageSet:'en'})
      shoppingInstance.getToken()

      let render_item = ShoppingCartOrdersWrapper.findWhere(
        (node) => node.prop("testID") === "cartItemsFlatList"
        );
        let render_data = render_item.renderProp("renderItem")({item: testOrderDataWithStore[0].attributes.order_items[1],index: 0,});
    });
  });

  test("Cart item removes", ({ given, when, then }) => {
    let rendered: ReturnType<typeof render>;
    given("Cart item quantity is one", () => {
      rendered = render(<ShoppingCartOrders {...screenProps} />);
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const responseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      rendered.container.instance.getCartApiCallId = responseMessage.messageId;
      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMessage.messageId
      );
      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        testCartData
      );
      runEngine.sendMessage("Unit Test", responseMessage);
    });

    when("I click on minus button", () => {
      const decrementButton = rendered.getByTestId("decrementBtn");
      fireEvent.press(decrementButton);

      const removeApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      removeApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        removeApiMessage.messageId
      );
      removeApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Order Items are deleted successfully",
          data: {},
        }
      );
      rendered.container.instance.removeItemApiCallId =
        removeApiMessage.messageId;
      runEngine.sendMessage("Unit Test", removeApiMessage);
      rendered.container.instance.updateDelieveryAdd =
        removeApiMessage.messageId;
      runEngine.sendMessage("Unit Test", removeApiMessage);

      const getCartMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      rendered.container.instance.getCartApiCallId = getCartMsg.messageId;
      getCartMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCartMsg.messageId
      );
      getCartMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        message: "cart not found, please add products in cart, to create cart!",
      });
      runEngine.sendMessage("Unit Test", getCartMsg);
    });

    then("Cart item gets removed", () => {
      expect(rendered.getByTestId("emptyView")).toBeDefined();
    });
  });

  test("Cart item remains same", ({ given, when, then }) => {
    let rendered: ReturnType<typeof render>;
    given("Cart item quantity is set to maximum stock", () => {
      rendered = render(<ShoppingCartOrders {...screenProps} />);
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const responseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      rendered.container.instance.getCartApiCallId = responseMessage.messageId;
      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMessage.messageId
      );
      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            ...testCartData.data,
            attributes: {
              ...testCartData.data.attributes,
              order_items: testCartData.data.attributes.order_items.map(
                (item) => ({
                  ...item,
                  attributes: {
                    ...item.attributes,
                    quantity: 2,
                  },
                })
              ),
            },
          },
        } as CartWithItemsResponse
      );
      runEngine.sendMessage("Unit Test", responseMessage);
    });

    when("I click on plus button", () => {
      const incrementButton = rendered.getByTestId("incrementBtn");
      const responseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      rendered.container.instance.updateQuantityApiCallId =
        responseMessage.messageId;

      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMessage.messageId
      );
      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { error: "Temp" }
      );
      runEngine.sendMessage("UNIT TEST", responseMessage);

      fireEvent.press(incrementButton);
    });

    then("I get warning", () => {
      expect(rendered.getByTestId("quantityValue").children[0]).toBe("2");
    });
  });

  test("Guest user creates cart", ({ given, when, then }) => {
    let rendered: ReturnType<typeof render>;
    const alertSpy = jest.spyOn(alert, "showAlert");

    given("Guest can see his cart", () => {
      rendered = render(<ShoppingCartOrders {...screenProps} />);

      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const responseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      rendered.container.instance.getCartApiCallId = responseMessage.messageId;
      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMessage.messageId
      );
      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        testCartData
      );
      runEngine.sendMessage("Unit Test", responseMessage);
    });

    when("Guest clicks plus", () => {
      const incrementButton = rendered.getByTestId("incrementBtn");
      fireEvent.press(incrementButton);

      const increaseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      increaseMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          increaseMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          updateQuantitySuccess,
      });
      rendered.container.instance.updateQuantityApiCallId =
        increaseMessage.messageId;
      runEngine.sendMessage("Unit Test", increaseMessage);

      const getCartMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCartMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          getCartMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {
            ...testCartData.data,
            attributes: {
              ...testCartData.data.attributes,
              order_items: [
                {
                  ...testCartData.data.attributes.order_items[0],
                  attributes: {
                    ...testCartData.data.attributes.order_items[0].attributes,
                    quantity: 2,
                  },
                },
              ],
            },
          },
        },
      });
      rendered.container.instance.getCartApiCallId = getCartMessage.messageId;
      runEngine.sendMessage("Unit Test", getCartMessage);
    });

    then("quantity increases", () => {
      expect(rendered.getByTestId("quantityValue").children[0]).toBe("2");
    });

    when("Guest clicks minus", () => {
      const decrementButton = rendered.getByTestId("decrementBtn");
      fireEvent.press(decrementButton);

      const increaseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      increaseMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          increaseMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {
            ...updateQuantitySuccess.data,
            attributes: {
              ...updateQuantitySuccess.data.attributes,
              quantity: 1,
            },
          },
        },
      });
      rendered.container.instance.updateQuantityApiCallId =
        increaseMessage.messageId;
      runEngine.sendMessage("Unit Test", increaseMessage);
      const getCartMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getCartMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          getCartMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          data: {
            ...testCartData.data,
            attributes: {
              ...testCartData.data.attributes,
              order_items: [
                {
                  ...testCartData.data.attributes.order_items[0],
                  attributes: {
                    ...testCartData.data.attributes.order_items[0].attributes,
                    quantity: 1,
                  },
                },
              ],
            },
          },
        },
      });
      rendered.container.instance.getCartApiCallId = getCartMessage.messageId;
      runEngine.sendMessage("Unit Test", getCartMessage);
    });

    then("quantity decreases", () => {
      expect(rendered.getByTestId("quantityValue").children[0]).toBe("1");
    });

    when("Guest clicks checkout button", () => {
      fireEvent.press(rendered.getByTestId("checkout"));
    });

    then("guest should get sign in warning", () => {
      expect(alertSpy).toHaveBeenCalled();
    });
  });

  test("Cart item update address", ({ given, when, then }) => {
    let rendered: ReturnType<typeof render>;
    given("Cart item update address", () => {
      rendered = render(<ShoppingCartOrders {...screenProps} />);
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const responseMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      rendered.container.instance.getCartApiCallId = responseMessage.messageId;
      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        responseMessage.messageId
      );
      responseMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        testCartData
      );
      runEngine.sendMessage("Unit Test", responseMessage);
    });

    when("I click on minus button update address", () => {
      const decrementButton = rendered.getByTestId("decrementBtn");
      fireEvent.press(decrementButton);

      const removeApiMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      removeApiMessage.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        removeApiMessage.messageId
      );
      removeApiMessage.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Order Items are deleted successfully",
          data: {},
        }
      );
      rendered.container.instance.updateDelieveryAdd =
        removeApiMessage.messageId;
      runEngine.sendMessage("Unit Test", removeApiMessage);

      const getCartMsg = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      rendered.container.instance.getCartApiCallId = getCartMsg.messageId;
      getCartMsg.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getCartMsg.messageId
      );
      getCartMsg.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
        message: "cart not found, please add products in cart, to create cart!",
      });
      runEngine.sendMessage("Unit Test", getCartMsg);
    });

    then("Cart item gets removed update address", () => {
      expect(rendered.getByTestId("emptyView")).toBeDefined();
    });
  });
});
