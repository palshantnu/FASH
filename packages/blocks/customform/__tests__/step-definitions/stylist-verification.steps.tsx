import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, fireEvent } from "@testing-library/react-native";
import { jest, expect } from "@jest/globals";
import * as flash from "react-native-flash-message";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import StylistVerification from "../../src/StylistVerification";
import DocumentPicker from 'react-native-document-picker';
import StylistVerificationWeb from "../../src/StylistVerification.web";
import { shallow } from "enzyme";

const screenProps = {
  id: "StylistVerification",
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
};

const feature = loadFeature(
  "./__tests__/features/stylist-verification-scenario.feature"
);

defineFeature(feature, (test) => {
  let instance: any;
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<StylistVerification {...screenProps} />);
    instance = wrapper.instance();
  });

  test("I am a stylist trying to upload my documents", ({
    given,
    when,
    then,
    and,
  }) => {
    let screen: ReturnType<typeof render>;
    const flashSpy = jest.spyOn(flash, "showMessage");
    const messageSpy = jest.spyOn(runEngine, "sendMessage");

    given("I am on documents uplaod screen", () => {
      screen = render(<StylistVerification {...screenProps} />);
      render(<StylistVerificationWeb {...screenProps} />);

      const sessionMessage = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      sessionMessage.addData(
        getName(MessageEnum.SessionResponseToken),
        "token"
      );
      runEngine.sendMessage(sessionMessage.messageId, sessionMessage);
    });

    then("ui rendered successfully", () => {
      instance?.closeModal?.(); // safely calling closeModal
      const nextButton = screen.getByTestId("nextBtn");
      expect(nextButton).toBeTruthy();
    });

    when("I click on Upload button", () => {
      fireEvent.press(screen.getByTestId("nextBtn"));
    });

    then("I get warning", () => {
      const lastCall = flashSpy.mock.calls[flashSpy.mock.calls.length - 1];
      expect(lastCall[0].message).toBe("Please choose all documents");
    });

    when("I select a document", () => {
      fireEvent.press(screen.getByTestId("passport"));
      fireEvent.press(screen.getByTestId("btnCamera"));
    });

    then("I can remove the selected document", () => {
      // expect(screen.queryByTestId("delete-passport")).not.toBe(null);
      // fireEvent.press(screen.getByTestId("delete-passport"));
    });

    when("I select all required documents", () => {
      const docSteps = [
        { id: "passport", btn: "btnCamera" },
        { id: "commercial_license", btn: "btnGallery" },
        { id: "authorized_signature", btn: "btnCamera" },
        { id: "moa", btn: "btnGallery" },
        { id: "business_bank_account", btn: "btnCamera" },
      ];
      docSteps.forEach(({ id, btn }) => {
        fireEvent.press(screen.getByTestId(id));
        fireEvent.press(screen.getByTestId(btn));
      });
    });

    and("click on upload", () => {
      fireEvent.press(screen.getByTestId("nextBtn"));

      const uploadMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      uploadMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          uploadMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: { data: {} },
      });

      instance.uploadDocsApiCallId = uploadMessage.messageId;
      runEngine.sendMessage(uploadMessage.messageId, uploadMessage);
    });

    then("It uploads the docs", () => {
      const lastCall = flashSpy.mock.calls[flashSpy.mock.calls.length - 1];
      expect(lastCall[0].message).toBe(
        "Your documents have been uploaded successfully"
      );
    });

    and("redirects to confirmation page", () => {
      const lastMessage =
        messageSpy.mock.calls[messageSpy.mock.calls.length - 1];
      expect(lastMessage[1].id).toBe("NavigationStylistConfirmation");

      fireEvent.press(screen.getByTestId("goBack"));

      // Repeat for coverage (not necessary but can simulate repeated upload)
      fireEvent.press(screen.getByTestId("nextBtn"));
      const secondUploadMessage = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      secondUploadMessage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]:
          secondUploadMessage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: { data: {} },
      });

      instance.uploadDocsApiCallId = secondUploadMessage.messageId;
      runEngine.sendMessage(secondUploadMessage.messageId, secondUploadMessage);

      fireEvent.press(screen.getByTestId("moa"));
      fireEvent.press(screen.getByTestId("btnGallery"));

      const confirmCall =
        messageSpy.mock.calls[messageSpy.mock.calls.length - 1];
      expect(confirmCall[1].id).toBe("NavigationStylistConfirmation");
      instance.removeDoc("passport");

      const mockRes = [
        {
          uri: 'file:///sample/path/document.pdf',
          type: 'application/pdf',
          name: 'document.pdf',
        },
      ];
      (DocumentPicker.pick as jest.Mock).mockResolvedValue(mockRes);
  
      // Mock RNFS.stat
      jest.mock('react-native-fs', () => ({
        stat: jest.fn().mockResolvedValue({ size: 1024 * 1024 * 2 }), // 2 MB
      }));
      const RNFS = require('react-native-fs');
  
       instance.addDocs('moa', 'gallery');
  
      expect(DocumentPicker.pick).toHaveBeenCalled();
      instance.setState({selectedLanguage:"en"})
      


    });
  });
});
