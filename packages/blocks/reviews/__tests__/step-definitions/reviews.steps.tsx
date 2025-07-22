import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { jest, expect, beforeEach } from "@jest/globals";

import * as helpers from "../../../../framework/src/Helpers";
import React from "react";
import Reviews from "../../src/Reviews";
import AddReviews from "../../src/AddReview"
const navigation = require("react-navigation");

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
export const configJSON = require("../../config.json");
import MessageEnum, {
  getName
} from "../../../../framework/src/Messages/MessageEnum";
import { _ } from "../../../../framework/src/IBlock";

const screenProps = {
  navigation: navigation,
  id: "Reviews"
};

const feature = loadFeature("./__tests__/features/reviews-scenario.feature");

defineFeature(feature, test => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
  });

  test("User navigates to Reviews", ({ given, when, then }) => {
    let ReviewsWrapper: ShallowWrapper;
    let instance: Reviews;

    given("I am a User loading Reviews", () => {
      ReviewsWrapper = shallow(<Reviews {...screenProps} />);
    });

    when("I navigate to the Reviews", () => {

      instance = ReviewsWrapper.instance() as Reviews;

      const tokenMsg: Message = new Message(getName(MessageEnum.SessionResponseMessage));
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const getReviewsAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      getReviewsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { data: [{ "id": "10", "type": "Review", "attributes": { "name": "Tester", "email": "test@me.com", "phone_number": "13015551212", "description": "None", "created_at": "2021-03-08T23:17:49.068Z", "user": "Firstname Lastname" } }] }
      );
      instance.reviewsApiCallId = getReviewsAPI.messageId;
      runEngine.sendMessage("Unit Test", getReviewsAPI);

      const deleteReviewsAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      instance.deleteReviewApiCallId = deleteReviewsAPI.messageId;
      runEngine.sendMessage("Unit Test", deleteReviewsAPI);


      const createReviewsAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      createReviewsAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        { "errors": [{ "Review": ["Phone number invalid"] }] }
      );

      instance.reviewsApiCallId = createReviewsAPI.messageId;
      runEngine.sendMessage("Unit Test", createReviewsAPI);

    });




    then("Reviews will load with out errors", () => {
      expect(ReviewsWrapper).toBeTruthy();

      const hideModal = ReviewsWrapper.findWhere((node)=> node.prop('testID') === 'hideModalBtn');
      hideModal.simulate('press');
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(ReviewsWrapper).toBeTruthy();
    });
  });

  test("User navigates to addReviews", ({ given, when, then }) => {
    let AddReviewsWrapper: ShallowWrapper;
    let instance: AddReviews;

    given("I am a User loading addReviews", () => {
      AddReviewsWrapper = shallow(<AddReviews {...screenProps} />);
    });

    when("I navigate to the addReviews", () => {
      instance = AddReviewsWrapper.instance() as AddReviews;

      let buttonComponent = AddReviewsWrapper.findWhere((node) => node.prop('testID') === 'btnSubmit');
      buttonComponent.simulate('press');

      let textInputComponent = AddReviewsWrapper.findWhere((node) => node.prop('testID') === 'txtReviews');
      textInputComponent.simulate('changeText', 'N/A');

      buttonComponent.simulate('press');

    });

    then("addReviews will load with out errors", () => {
      expect(AddReviewsWrapper).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(AddReviewsWrapper).toBeTruthy();
    });
  });

});
