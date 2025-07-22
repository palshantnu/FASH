import React from "react";
import { jest, beforeEach, expect } from "@jest/globals";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, fireEvent,waitFor } from "@testing-library/react-native";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import ExploreWishlist from "../../src/ExploreWishlist";
import { mockWishlistData, mockSuggestionData } from "../__mocks__/responses";


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
    goBack: jest.fn(),
    addListener: listener.addEventListener,
  },
  id: "ExploreWishlist",
};

const feature = loadFeature("./__tests__/features/exploreWishlist-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {});

  test("user opens the screen",({given,then,when})=>{
    let screen: ReturnType<typeof render>;
    let spyMessage = jest.spyOn(runEngine, "sendMessage");
    given("page loads and user can see the screen", () => {
      screen = render(<ExploreWishlist {...screenProps} />);
    })
    when("page loads and user receives navigation params",()=>{
      const navMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      navMessage.addData(getName(MessageEnum.wishlistIdMessage), {data:57,fromWishlist:true});
  
      runEngine.sendMessage("UNIT TEST", navMessage);
     
    })
    then("abc",async()=>{
      await waitFor(async () => {
        let  mycompo= screen.findByTestId("fromstylist")
        expect(mycompo).not.toBe(null);
      });
     
     
  })

  then("for list empty components",()=>{
screen.container.instance.setState({wishlist:{data:[]},loading:false,fromWishlist:true,youMayAlsoLike:[{id:1,type:"string",attributes:{}}]})

  })


  when("page loads and user receives navigation params of falsy value",()=>{
      
    const navMessage = new Message(getName(MessageEnum.NavigationPayLoadMessage))
    navMessage.addData(getName(MessageEnum.wishlistIdMessage), {
      data:"data",fromWishlist:false
    });
    runEngine.sendMessage("UNIT TEST", navMessage);
   
  })
  then("checking the conditional rendering",async()=>{
    await waitFor(async () => {
    let  mycompo= screen.findByTestId("emptyWishList")
    expect(mycompo).not.toBe(null);

  });

    })

  })



  test("Buyer opens exploreWishlist", ({ given, then, and, when }) => {
    let screen: ReturnType<typeof render>;
    let spyMessage = jest.spyOn(runEngine, "sendMessage");
    given("buyer has some products in exploreWishlist", () => {
      screen = render(<ExploreWishlist {...screenProps} />);

      const session = new Message(getName(MessageEnum.SessionResponseMessage));
      session.addData(getName(MessageEnum.SessionResponseToken), "token");
      runEngine.sendMessage("UNIT TEST", session);

      const wishlistMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      wishlistMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          wishlistMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: mockWishlistData,
      });
      screen.container.instance.getWishlistApiCallId =
        wishlistMessage.messageId;
      runEngine.sendMessage("UNIT TEST", wishlistMessage);

    });

    when("user clicks on add to cart", () => {
      
    });

    then("user navigates to product description", () => {
      const lastCall = spyMessage.mock.calls[spyMessage.mock.calls.length - 1];
     
    });

    when("user clicks on the product", () => {
      fireEvent.press(screen.getByTestId("goBackIcon"));
     
      const products = screen.getAllByTestId("navigateToProduct");

      fireEvent.press(products[0]);
    });

    then("user navigates to product description", () => {
      const lastCall = spyMessage.mock.calls[spyMessage.mock.calls.length - 1];
     
    });
   


  });

 
});
