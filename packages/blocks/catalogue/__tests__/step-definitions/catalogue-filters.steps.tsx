import React from "react";

import { jest, expect } from "@jest/globals";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import { runEngine } from "framework/src/RunEngine";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";

import CatalogueFilter from "../../src/CatalogueFilter";
import {
  categoriesMock,
  colorsMock,
  storesMock,
  sizesMock,
  subCategoriesMock,
} from "../../__mock__/responses.mock";

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
  },
  id: "CatalogueFilter",
};

const sortByMock = [
  {
    id: 1,
    value: "most_recent",
    name: "Most Recent",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    selected: false,
  },
  {
    id: 2,
    value: "oldest_first",
    name: "Oldest First",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    selected: false,
  },

  {
    id: 3,
    value: "price_asc",
    name: "Price Low to High",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    selected: false,
  },
  {
    id: 4,
    value: "price_desc",
    name: "Price High to Low",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    selected: false,
  },
  {
    id: 5,
    value: "popularity",
    name: "Popularity",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    selected: false,
  },
];

const feature = loadFeature(
  "./__tests__/features/catalogue-filters-scenario.feature"
);

defineFeature(feature, (test) => {
  test("user navigates to catalogue filters page", ({
    given,
    when,
    then,
    and,
  }) => {
    let screen: ReturnType<typeof render>;

    given("I am an user loading filters page", () => {
      screen = render(<CatalogueFilter {...screenProps} />);
    });

    when("I open filters page", () => {
      // Navigation Payload
      const navMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navMessage.addData(getName(MessageEnum.CatalogueFilters), {
        filters: { sizes: [], colors: [] },
        backKey: "random-key",
      });
      runEngine.sendMessage("UNIT TEST", navMessage);

      // Colors List Response
      const colorsMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      colorsMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          colorsMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: colorsMock,
      });
      screen.container.instance.getColorsApiCallId = colorsMessage.messageId;
      runEngine.sendMessage("UNIT TEST", colorsMessage);

      // Stores List Response
      const storesMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      storesMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          storesMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: storesMock,
      });
      screen.container.instance.getStoresApiCallId = storesMessage.messageId;
      runEngine.sendMessage("UNIT TEST", storesMessage);

      // Sizes List Response
      const sizesMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      sizesMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          sizesMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: sizesMock,
      });
      screen.container.instance.getSizesApiCallId = sizesMessage.messageId;
      runEngine.sendMessage("UNIT TEST", sizesMessage);

      // Categories List Response
      const categoriesMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      categoriesMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          categoriesMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: categoriesMock,
      });
      screen.container.instance.getCategoriesApiCallId =
        categoriesMessage.messageId;
      runEngine.sendMessage("UNIT TEST", categoriesMessage);

      // Sub Categories List Response
      const subCategoriesMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      subCategoriesMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          subCategoriesMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: subCategoriesMock,
      });
      screen.container.instance.getSubCategoriesApiCallId =
        subCategoriesMessage.messageId;
      runEngine.sendMessage("UNIT TEST", subCategoriesMessage);

      // Test default break;
      const uselessMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      uselessMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          uselessMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {},
      });
      runEngine.sendMessage("UNIT TEST", uselessMessage);
    });

    then("filters loads without errors", () => {
      expect(screen.queryByTestId("filter-main")).not.toBe(null);
    });

    and("I can update minimum price", () => {
      const minInput = screen.getByTestId("minPriceInput");
      fireEvent.changeText(minInput, "50");
      expect(minInput.props.value).toBe("50");
    });

    and("I can update maximum price", () => {
      const maxInput = screen.getByTestId("maxPriceInput");
      fireEvent.changeText(maxInput, "50");
      expect(maxInput.props.value).toBe("50");
    });

    when("I click on size tab", () => {
      fireEvent.press(screen.getByTestId("size-button"));
    });

    then("I can see available sizes", () => {
      expect(
        screen.queryByTestId(`size-button-${sizesMock.data.length - 1}`)
      ).not.toBe(null);
    });

    and("I can toggle sizes", () => {
      const radio = screen.getByTestId("size-button-0");
      const defaultStyle = radio.props.style;
      fireEvent(radio, "onValueChange");
    });

    when("I click on colors tab", () => {
      fireEvent.press(screen.getByTestId("color-button"));
    });

    then("I can see colors", () => {
      expect(
        screen.queryByTestId(`color-button-${colorsMock.data.length - 1}`)
      ).not.toBe(null);
    });

    and("I can toggle colors", () => {
      const radio = screen.getByTestId("color-button-0");
      const defaultStyle = radio.props.style;
      fireEvent(radio, "onValueChange");
    });

    when("I click on sort by tab", () => {
      screen.container.instance.setState({
        from: "home",
      });
      fireEvent.press(screen.getByTestId("sort-button"));
    });

    then("I can see sort by", () => {
      expect(
        screen.queryByTestId(`sort-button-${sortByMock.length - 1}`)
      ).not.toBe(null);
    });

    and("I can toggle sort by", () => {
      const radio = screen.getByTestId("sort-button-0");
      const defaultStyle = radio.props.style;
      fireEvent(radio, "onSelect");
      const selectedStyle = radio.props.style;
      expect(defaultStyle).not.toEqual(selectedStyle);
    });


    when("I click a category", () => {
      fireEvent.press(screen.getByTestId("category-button"));
    });

    then("I can select category", () => {
      const categoryApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      categoryApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        categoryApi.messageId
      );
      categoryApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        categoriesMock
      );
      screen.container.instance.getcategoriesApiCallMsgId =
        categoryApi.messageId;
      runEngine.sendMessage("Test", categoryApi);
      fireEvent.press(screen.getByTestId("Category-dropdown"));
      const selectedItem = categoriesMock.data[0];
      waitFor(() =>
        fireEvent.press(screen.getByTestId(selectedItem.attributes.name))
      );
      waitFor(() => screen.getByTestId("Sub-Category-dropdown"));
    });

    then("I can select subcategory", () => {
      screen.container.instance.setState({
        category: [61],
      });

      waitFor(() => screen.getByTestId("Sub-Category-dropdown"));

      fireEvent.press(screen.getByTestId("Sub-Category-dropdown"));

      const subCategoryApi = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      subCategoryApi.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        subCategoryApi.messageId
      );
      subCategoryApi.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        subCategoriesMock
      );
      screen.container.instance.getSubcategoriesApiCallMsgId =
        subCategoryApi.messageId;
      runEngine.sendMessage("Test", subCategoryApi);
      const item = subCategoriesMock.data[0];
      waitFor(() =>
        fireEvent.press(screen.getByTestId(item.attributes.name))
      );
      fireEvent.press(screen.getByTestId("Sub-Category-dropdown"));
    });

    and("I can click on cross icon on selected sub category", () => {
      const item = subCategoriesMock.data[0];
      const item1 = subCategoriesMock.data[1];
      const item2 = subCategoriesMock.data[2];
      
      fireEvent.press(screen.getByTestId("Sub-Category-dropdown"));
      waitFor(() =>
        fireEvent.press(screen.getByTestId(item.attributes.name))
      );
      waitFor(() =>
        fireEvent.press(screen.getByTestId(item1.attributes.name))
      );
      waitFor(() =>
        fireEvent.press(screen.getByTestId(item2.attributes.name))
      );
      fireEvent.press(screen.getByTestId("Sub-Category-dropdown"));
      waitFor(() =>
        fireEvent.press(screen.getByTestId(`remove-item-${item1.attributes.name}`))
      );
      expect(
        screen.queryByTestId(`remove-item-${item1.attributes.name}`)
      ).toBe(null);
    });

    when("I click on Stores tab", () => {
      fireEvent.press(screen.getByTestId("stores-button"));
    });

    then("I can see stores", async () => {
      expect(
        screen.getByTestId(`store-block`)
      ).not.toBe(null);
      expect(
        screen.queryByTestId(`store-button-${storesMock.data.length - 1}`)
      ).not.toBe(null);
    });

    and("I can toggle stores", () => {
      const radio = screen.getByTestId("store-button-0");
      const defaultStyle = radio.props.style;
      fireEvent(radio, "onValueChange");
    });

    when("I click on apply filters", () => {
      fireEvent.press(screen.getByTestId("apply"));
    });

    then("I go back with applied filters", () => {
      const calls = screenProps.navigation.dispatch.mock.calls;
      expect(calls[0][0]).toMatchObject({
        type: "Navigation/SET_PARAMS",
      });
    });

    when("I click clear all filters", () => {
      fireEvent.press(screen.getByTestId("clearAll"));
    });

    then("Filters are removed", () => {
      fireEvent.press(screen.getByTestId("color-button"));
      expect(
        screen.queryByTestId(`color-button-${colorsMock.data.length - 1}`)
      ).not.toBe(null);
      // selected this filter before clearAll
      const radioSelected = screen.getByTestId("color-button-0");
      // untouched filter
      const radioNotSelected = screen.getByTestId("color-button-1");

      // can't write multiple expects due to guidelines
      expect(radioSelected.props.style).toEqual(radioNotSelected.props.style);
      screen.container.instance.setState({
        from: "store",
      });
      fireEvent.press(screen.getByTestId("apply"));
      screen.container.instance.setState({
        from: "catalogue",
      });
      fireEvent.press(screen.getByTestId("apply"));
    });
  });
});
