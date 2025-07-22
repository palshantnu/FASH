import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { fireEvent, render } from "@testing-library/react-native";

import * as helpers from "../../../../framework/src/Helpers";
import YetToBeDeveloped from "../../src/YetToBeDeveloped";

const screenProps = {
  navigation: {
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "YetToBeDeveloped",
};

const feature = loadFeature(
  "./__tests__/features/yet-to-be-developed.feature"
)

defineFeature(feature, test => {
  beforeEach(() => {
    // jest.doMock('react-native', () => ({ Platform: { OS: 'web' } }))
    // jest.spyOn(helpers, 'getOS').mockImplementation(() => 'web');
  });

  let yetToBeDevelopedInstance: ReturnType<typeof render>
  
  test('User navigates to Yet To be developed screen', ({
    given,
    when,
    then,
    and
  }) => {
    given('I am a User attempting to open a screen not developed yet', () => {
      yetToBeDevelopedInstance = render(<YetToBeDeveloped {...screenProps} />)
    });

    when('The screen loads', async () => {

    });

    then('I should get no errors', async () => {
      expect(await yetToBeDevelopedInstance.findByTestId("yetToBeDeveeloped"))
        .toBeDefined()
    });

    and('I should be able to go to sign in screen again', async () => {
      const button = await yetToBeDevelopedInstance.findByTestId("goBackButton")
      fireEvent.press(button);
    });
  });
});