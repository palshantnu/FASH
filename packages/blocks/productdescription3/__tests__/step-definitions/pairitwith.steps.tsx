import { defineFeature, loadFeature } from "jest-cucumber";
import { render, fireEvent } from "@testing-library/react-native";
import { beforeEach, jest, expect } from "@jest/globals";

import * as helpers from '../../../../framework/src/Helpers'
import { runEngine } from '../../../../framework/src/RunEngine'
import { Message } from "../../../../framework/src/Message"
import { Listener } from "../../../catalogue/__mock__/eventlistener"
import React from "react";
import MessageEnum, { getName } from "../../../../framework/src/Messages/MessageEnum";
import PairedProducts from "../../src/PairedProductsScreen";
const listener = new Listener();
const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    addListener: listener.addEventListener,
  },
  id: "PairedProducts"
}

const dummyVariant = {
  "id": 119,
  "catalogue": {
    "name": "Product Name",
    "id": "119"
  },
  "catalogue_id": 100,
  "catalogue_variant_color_id": 7,
  "catalogue_variant_color": {
    "id": 7,
    "name": "Grey",
    "created_at": "2023-10-05T05:19:28.122Z",
    "updated_at": "2023-10-05T05:19:28.122Z"
  },
  "catalogue_variant_size_id": 1,
  "catalogue_variant_size": {
    "id": 1,
    "name": "Small",
    "created_at": "2023-09-22T04:45:35.966Z",
    "updated_at": "2023-09-22T04:45:35.966Z"
  },
  "price": "1025.0",
  "stock_qty": 26,
  "on_sale": null,
  "sale_price": null,
  "discount_price": null,
  "length": null,
  "breadth": null,
  "height": null,
  "created_at": "2024-02-01T11:01:12.461Z",
  "updated_at": "2024-02-12T10:07:07.627Z",
  "low_stock_threshold": 0,
  "is_listed": true,
  "front_image": "https://lol.lol/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbU1EIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fa8c2ed446d105b83bac260ebb059333aa370c42/front_image.jpg",
  "back_image": "https://lol.lol/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVFEIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--834e1919245d405871fd7d89f408e540f392f901/back_image.jpg",
  "side_image": "",
  "pair_it_with": [
    {
      "id": "121",
      "type": "inventory_management",
      "attributes": {
        "id": 121,
        "catalogue_id": 102,
        "product_name": "Offer catalogue28",
        "product_description": "Lorem Ipsum",
        "sku": "A28",
        "stock_qty": 28,
        "low_stock_threshold": 0,
        "is_listed": true,
        "price": "1027.0",
        "size": "Small",
        "colour": "Grey",
        "gender": "male",
        "front_image": "",
        "discounted_percentage":"0"
      }
    },
    {
      "id": "120",
      "type": "inventory_management",
      "attributes": {
        "id": 120,
        "catalogue_id": 101,
        "product_name": "Offer catalogue27",
        "product_description": "Lorem Ipsum",
        "sku": "A27",
        "stock_qty": 3,
        "low_stock_threshold": 0,
        "is_listed": true,
        "price": "1026.0",
        "size": "Small",
        "colour": "Grey",
        "gender": "male",
        "front_image": "",
        "discounted_percentage":"1",
      }
    }
  ],
}

const feature = loadFeature('./__tests__/features/pairitwith-scenario.feature');

defineFeature(feature, test => {
  beforeEach(() => {
    jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }));
    jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  test('User navigates to Pair It With screen', ({
    given,
    then,
    when,
    and
  }) => {
    let pairScreen: ReturnType<typeof render>
    given('I am an user on pair it with screen', () => {
      pairScreen = render(<PairedProducts {...screenProps} />);

      const payloadMsg = new Message(getName(MessageEnum.NavigationPayLoadMessage));
      payloadMsg.addData(
        getName(MessageEnum.NavigationPayloadPairedProductsMessage),
        dummyVariant
      );
      runEngine.sendMessage("Unit Test", payloadMsg);

      payloadMsg.addData(
        getName(MessageEnum.NavigationPayloadPairedProductsMessage),
        {
          ...dummyVariant,
          front_image: "",
          back_image: "",
          side_image: ""
        }
      );
      runEngine.sendMessage("Unit Test", payloadMsg);
    });

    then('I can see the screen without errors', () => {
      expect(pairScreen.queryByTestId("paired-products")).toBeTruthy()
    });

    and('I can click on wishlist', () => {
      const similarproducts = pairScreen.getAllByTestId("wishlist");
      fireEvent.press(similarproducts[0]);
    });

    when('I click on a similar product', () => {
      listener.simulateListener("willFocus");
      const similarproducts = pairScreen.getAllByTestId("go-to-similar-product");
      fireEvent.press(similarproducts[0]);
    });

    then('I go to the product screen', () => {
      // fireEvent.press(pairScreen.getByTestId("btn-navigation-left"));
    });
  });
});