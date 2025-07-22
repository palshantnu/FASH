import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render } from "@testing-library/react-native";
import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import MyBids from "../../src/MyBids";
import MyBidsWeb from "../../src/MyBids.web";

import { MyBidsData } from "../__mocks__/responses";
import { fireEvent } from "@testing-library/react-native";

jest.mock("../../../../framework/src/Utilities", () => {
  return {
    getStorageData: jest.fn().mockImplementation((keys) => {
      if (keys === "token") {
        return '181'
      }
     return null;
    }),
    setStorageData: jest.fn(),
  };
});

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    getParam: (playlist_id: any,topic_id:any) => {
    },
    addListener:(param:string,callback:any)=>{
      callback()
    },
},
  id: "MyBids",
};



const feature = loadFeature(
  "./__tests__/features/mybids-scenario.feature"
);

defineFeature(feature, (test) => {
  test("Stylist opens up MyBids", ({ given, when, then }) => {
    let screen: ReturnType<typeof render>;

    beforeEach(() => {
      jest.useFakeTimers();
      jest.clearAllMocks();
      jest.doMock("react-native", () => ({ Platform: { OS: "ios" } }));
      jest.spyOn(helpers, "getOS").mockImplementation(() => "ios");
      jest.spyOn(runEngine, "sendMessage");
      
    });

    given("Stylist is on MyBids screen", () => {
      screen = render(<MyBids {...screenProps} />);
      render(<MyBidsWeb {...screenProps} />);
    });

    when("The page loads completely", () => {
        // Fetch list of Product Source
        const sourceProductMessage = new Message(
          getName(MessageEnum.RestAPIResponceMessage)
        );
        sourceProductMessage.initializeFromObject({
          [getName(MessageEnum.RestAPIResponceDataMessage)]:
            sourceProductMessage.messageId,
          [getName(MessageEnum.RestAPIResponceSuccessMessage)]:
          MyBidsData,
        });
        screen.container.instance.getMyBidsApiCallId = sourceProductMessage.messageId;
        runEngine.sendMessage("UNIT TEST", sourceProductMessage);
      
    });

    then("stylist can see the page without errors", () => {
      expect(screen.queryByTestId("MyBids")).not.toBe(null);
    });

    then("stylist can press the back button", () => {
      const backButton = screen.getByTestId("backButton");
      fireEvent.press(backButton);
    });

    then("stylist can press the view button", () => {
      const data = MyBidsData.data[0];
      const viewButton = screen.getByTestId(`viewButton${data.id}`);
      fireEvent.press(viewButton);
    });

  });
});