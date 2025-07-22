import React from "react";
import { jest, beforeEach, expect } from "@jest/globals";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, fireEvent,waitFor } from "@testing-library/react-native";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import Wishlist2 from "../../src/Wishlist2";
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
  id: "Wishlist2",
};

const feature = loadFeature("./__tests__/features/wishlist2-scenario.feature");

defineFeature(feature, (test) => {
  beforeEach(() => {});

  test("user opens the screen",({given,then,when})=>{
    let screen: ReturnType<typeof render>;
    let spyMessage = jest.spyOn(runEngine, "sendMessage");
    given("page loads and user can see the screen", () => {
      screen = render(<Wishlist2 {...screenProps} />);
    })
    when("page loads and user receives navigation params",()=>{
      const navMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      // message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      navMessage.addData(getName(MessageEnum.wishlistIdMessage), {data:57,fromWishlist:true});
  
      runEngine.sendMessage("UNIT TEST", navMessage);
     
    })
    then("abc",async()=>{
      await waitFor(async () => {
        let  mycompo= screen.findByTestId("fromstylist")
        expect(mycompo).not.toBe(null);
      });
     
      // console.log(conditionOne,"conditionOne")
  //  screen.debug()
  })

  then("for list empty components",()=>{
screen.container.instance.setState({wishlist:{data:[]},loading:false,fromWishlist:true,youMayAlsoLike:[{id:1,type:"string",attributes:{}}]})
const x=screen.getByTestId("navigateToProduct")
fireEvent.press(x)
const y=screen.getByTestId("goTocategory")
fireEvent.press(y)
fireEvent.press(screen.getByTestId("goBackIcon"));
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



  test("Buyer opens wishlist2", ({ given, then, and, when }) => {
    let screen: ReturnType<typeof render>;
    let spyMessage = jest.spyOn(runEngine, "sendMessage");
    given("buyer has some products in wishlist2", () => {
      screen = render(<Wishlist2 {...screenProps} />);

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

      const ymalMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      ymalMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          ymalMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          error: "No catalogue found",
        },
      });
      screen.container.instance.getYouMayAlsoLikeApiCallId =
        ymalMessage.messageId;
      runEngine.sendMessage("UNIT TEST", ymalMessage);

      const ymalMessage2 = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      ymalMessage2.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          ymalMessage2.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          mockSuggestionData,
      });
      screen.container.instance.getYouMayAlsoLikeApiCallId =
        ymalMessage2.messageId;
      runEngine.sendMessage("UNIT TEST", ymalMessage2);
    });

    then("buyer can see the wishlisted products", () => {
      expect(screen.queryAllByTestId("wishlistedItem").length).toBe(
        mockWishlistData.data.length
      );
     
      
    });

    then("buyer can remove wishlisted products", () => {
      const removeButtons = screen.getAllByTestId("removeWishlist");
      fireEvent.press(removeButtons[0]);

      const removeWLMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      removeWLMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          removeWLMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          message: "Destroyed successfully",
        },
      });
      screen.container.instance.removeWishlistApiCallId =
        removeWLMessage.messageId;
      runEngine.sendMessage("UNIT TEST", removeWLMessage);

      expect(screen.queryAllByTestId("wishlistedItem").length).toBe(
        mockWishlistData.data.length - 1
      );
    });

    and("buyer can add wishlist from suggetions", () => {
      const addButtons = screen.getAllByTestId("addWishlist");
      fireEvent.press(addButtons[0]);

      const addWishlsitMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addWishlsitMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          addWishlsitMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: mockWishlistData,
      });
      screen.container.instance.addWishlistApiCallId =
        addWishlsitMessage.messageId;
      runEngine.sendMessage("UNIT TEST", addWishlsitMessage);

      const ymalMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      ymalMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          ymalMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          mockSuggestionData,
      });
      screen.container.instance.getYouMayAlsoLikeApiCallId =
        ymalMessage.messageId;
      runEngine.sendMessage("UNIT TEST", ymalMessage);

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

      expect(screen.queryAllByTestId("wishlistedItem").length).toBe(
        mockWishlistData.data.length
      );
    });

    when("user clicks on add to cart", () => {
      fireEvent.press(screen.getByTestId("move-to-cart-0"));
    });

    then("user navigates to product description", () => {
      const lastCall = spyMessage.mock.calls[spyMessage.mock.calls.length - 1];
      expect(lastCall[1].id).toBe("NavigationProductDetailsMessage");
    });

    when("user clicks on the product", () => {
      fireEvent.press(screen.getByTestId("goBackIcon"));
      const products = screen.getAllByTestId("navigateToProduct");
      fireEvent.press(products[0]);
    });

    then("user navigates to product description", () => {
      const lastCall = spyMessage.mock.calls[spyMessage.mock.calls.length - 1];
      expect(lastCall[1].id).toBe("NavigationProductDetailsMessage");
    });
    when("item gets rendered in order",()=>{
      let mydata:any={...mockWishlistData}
      mydata.data.push({forStylist:true})
      screen.container.instance.setState({wishlist:mydata})
    })

 then("userClicks on add more",()=>{

  fireEvent.press(screen.getByTestId("renderCondition"));
  const wishlistMessage = new Message(
    getName(MessageEnum.RestAPIResponceMessage)
  );
  let mydata:any={...mockWishlistData}
  mydata.data.push({forStylist:true})
  wishlistMessage.initializeFromObject({
    [getName(MessageEnum.RestAPIResponceDataMessage)]:
      wishlistMessage.messageId,
    [getName(MessageEnum.RestAPIResponceSuccessMessage)]: mydata,
  });
  screen.container.instance.apiForStylistWishlistCallId =
    wishlistMessage.messageId;
  runEngine.sendMessage("UNIT TEST", wishlistMessage);
  
 })

    when("buyer has no products in wishlist", () => {
      listener.simulateListener("willFocus");
      const wishlistMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      wishlistMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          wishlistMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: { data: [] },
      });
      screen.container.instance.getWishlistApiCallId =
        wishlistMessage.messageId;
      runEngine.sendMessage("UNIT TEST", wishlistMessage);

      const ymalMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      ymalMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          ymalMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          mockSuggestionData,
      });
      screen.container.instance.getYouMayAlsoLikeApiCallId =
        ymalMessage.messageId;
      runEngine.sendMessage("UNIT TEST", ymalMessage);
    });

    then("buyer get empty wishlist message", () => {
      expect(screen.queryByTestId("emptyWishList")).toEqual(null);
    });

    when("component mounts and stylist go to client wishlist",()=>{
      screen.container.instance.state.fromWishlist=true
      listener.simulateListener("willFocus");
     
    })

    when("screen loads for stylist",()=>{
      // listener.simulateListener("willFocus");
      // const wishlistMessage = new Message(
      //   getName(MessageEnum.RestAPIResponceMessage)
      // );
      // wishlistMessage.initializeFromObject({
      //   [getName(MessageEnum.RestAPIResponceDataMessage)]:
      //     wishlistMessage.messageId,
      //   [getName(MessageEnum.RestAPIResponceSuccessMessage)]: { data: mockWishlistData },
      // });
      // screen.container.instance.getWishlistApiCallId =
      //   wishlistMessage.messageId;
      // runEngine.sendMessage("UNIT TEST", wishlistMessage);
      screen.container.instance.setState({wishlist:mockWishlistData})
    })
     then("stylist remove an item form favorite",()=>{
      const removeButtons = screen.getAllByTestId("removeWishlist");
      fireEvent.press(removeButtons[0]);


     })


  });

  test("stylist Opens wishlist",({given,then,when})=>{
    let screen: ReturnType<typeof render>;
    let spyMessage = jest.spyOn(runEngine, "sendMessage");
    given("page loads and user can see the screen", () => {
      screen = render(<Wishlist2 {...screenProps} />);
    })
    when("page loads and user receives navigation params",()=>{
      const navMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      // message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      navMessage.addData(getName(MessageEnum.NavigationPayLoadMessage),{fromDashboardAsBuyer:true,data:57,stylistPersonal:true,clientWshlistName:""});
  
      runEngine.sendMessage("UNIT TEST", navMessage);
     
    })
    then("Stylist can see rendered component",async()=>{
      await waitFor(async () => {
        let  mycompo= screen.findByTestId("fromstylist")
        expect(mycompo).not.toBe(null);
      });
  })
  then("button Component is found",async()=>{
    let  mycompo= screen.findByTestId("extra")
    expect(mycompo).not.toBe(null);
})
then("language is changed acordingly",async()=>{
  screen.container.instance.setState({selectedLanguage:"en"})
  screen.container.instance.setState({selectedLanguage:"ar"})

  let  mycompo= screen.findByTestId("extra")
  expect(mycompo).not.toBe(null);
})

  })


  test("stylist Opens wishlist for language",({given,then,when})=>{
    let screen: ReturnType<typeof render>;
    let spyMessage = jest.spyOn(runEngine, "sendMessage");
    given("page loads and user can see the screen for language", () => {
      screen = render(<Wishlist2 {...screenProps} />);
    })
    when("page loads and user receives navigation params for language",()=>{
      const navMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      // message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      navMessage.addData(getName(MessageEnum.NavigationPayLoadMessage),{fromDashboardAsBuyer:true,data:57,stylistPersonal:true,clientWshlistName:""});
  
      runEngine.sendMessage("UNIT TEST", navMessage);
     
    })

    then("language is changed acordingly for language",async()=>{
      screen.container.instance.setState({selectedLanguage:"en"})
      screen.container.instance.setState({selectedLanguage:"ar"})

      let  mycompo= screen.findByTestId("extra")
      expect(mycompo).not.toBe(null);
    })

    then("language is changed acordingly for language for then",async()=>{
      screen.container.instance.setState({selectedLanguage:"en"})
      screen.container.instance.setState({selectedLanguage:"ar"})
    })

  })

});
