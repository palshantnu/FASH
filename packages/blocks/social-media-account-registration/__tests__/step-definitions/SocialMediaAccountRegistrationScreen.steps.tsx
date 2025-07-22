import React from "react";
import { shallow, ShallowWrapper } from 'enzyme'

import SocialMediaAccountRegistration from "../../src/SocialMediaAccountRegistrationScreen";
import { jest, test, expect,describe,beforeEach } from '@jest/globals';

const screenProps = {
  id: "SocialMediaAccountRegistration",
  navigation: {},
};

let SocialMediaAccountRegistrationData = <SocialMediaAccountRegistration {...screenProps}/>

describe("SocialMediaAccountRegistration", () => {
  let splashWrapper:ShallowWrapper;
  splashWrapper= shallow(SocialMediaAccountRegistrationData)
  let instance:SocialMediaAccountRegistration; 

  instance = splashWrapper.instance() as SocialMediaAccountRegistration

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test("social login with facebook button should be define inside render", () => {
    const facebookLoginBtn = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnFacebookLogIn")
    facebookLoginBtn.simulate("press")
    expect(facebookLoginBtn).toBeDefined();
  });

  test("social login with google button should be define inside render", () => {
    const googleLoginBtn = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnGoogleLogIn")
    googleLoginBtn.simulate("press")
    expect(googleLoginBtn).toBeDefined();
  });
});
