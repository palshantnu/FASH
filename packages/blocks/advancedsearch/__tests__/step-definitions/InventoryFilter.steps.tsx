import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
    getName,
} from "../../../../framework/src/Messages/MessageEnum";

import InventoryFilter from "../../src/InventoryFilter";
import InventoryFilterWeb from "../../src/InventoryFilter.web";
import { categoriesMock, colorsMock, subCategoriesMock } from "../__mock__/responses.mock";

const screenProps = {
    navigation: {
        navigate: jest.fn(),
        goBack: jest.fn(),
    },
    id: "InventoryFilter",
};

const feature = loadFeature(
    "./__tests__/features/InventoryFilter-scenario.feature"
);

defineFeature(feature, (test) => {
    test("Seller opens up InventoryFilter", ({ given, when, then }) => {
        let screen: ReturnType<typeof render>;
        given("Seller is on InventoryFilter screen", () => {
            screen = render(<InventoryFilter {...screenProps} />);
            render(<InventoryFilterWeb {...screenProps} />);
        });

        when("The page loads completely", () => {
            // Navigation Payload
            // Case 1: Test with empty filters
            let navMessage = new Message(
                getName(MessageEnum.NavigationPayLoadMessage)
            );
            navMessage.addData(getName(MessageEnum.NavigationInventoryFilterData), {
                filters: { colors: [], minPrice: null, maxPrice: null, categories: [], subCategory: null, subSubCategory: null }, 
                backKey: "",
            });
            runEngine.sendMessage("UNIT TEST", navMessage);

            // Case 2: Test with populated filters
            navMessage = new Message(
                getName(MessageEnum.NavigationPayLoadMessage)
            );
            navMessage.addData(getName(MessageEnum.NavigationInventoryFilterData), {
                filters: { colors: [], minPrice: "10", maxPrice: "100", categories: ["category1"], subCategory: ["sub1"], subSubCategory: ["subsub1"] },
                backKey: "",
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
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: subCategoriesMock
      });
      screen.container.instance.getSubCategoriesApiCallId =
        subCategoriesMessage.messageId;
      runEngine.sendMessage("UNIT TEST", subCategoriesMessage);

      // Sub Sub Categories List Response
       const subSubCategoriesMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      subSubCategoriesMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
        subSubCategoriesMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: subCategoriesMock
      });
      screen.container.instance.getSubSubCategoriesApiCallId =
      subSubCategoriesMessage.messageId;
      runEngine.sendMessage("UNIT TEST", subSubCategoriesMessage);

        });

        then("Seller can see the page without errors", () => {
            expect(screen.queryByTestId("InventoryFilter")).not.toBe(null);
        });

        when("I click on colors tab", () => {
            fireEvent.press(screen.getByTestId("color-button"));
          });
      
          then("I can see colors", () => {
            expect(
              screen.queryByTestId(`color-button-${colorsMock.data.length - 1}`)
            ).not.toBe(null);
          });
      
          then("I can toggle colors", () => {
            const radio = screen.getByTestId("color-button-0");
            const defaultStyle = radio.props.style;
            fireEvent(radio, "onValueChange");
          });

          when("I click on price tab", () => {
            fireEvent.press(screen.getByTestId("price-button"));
          });
          then("I can update minimum price", () => {
            const minInput = screen.getByTestId("minPriceInput");
            fireEvent.changeText(minInput, "50");
          });
      
          then("I can update maximum price", () => {
            const maxInput = screen.getByTestId("maxPriceInput");
            fireEvent.changeText(maxInput, "50");
          });

          then("I click on gender tab", () => {
            fireEvent.press(screen.getByTestId("gender-button"));
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
      
          then("I can click on cross icon on selected sub category", () => {
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
    });
});