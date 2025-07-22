import { defineFeature, loadFeature } from "jest-cucumber";
import { jest, beforeEach, expect } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react-native";
import { shallow, ShallowWrapper } from "enzyme";

import * as helpers from "../../../../framework/src/Helpers";
import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";
import React from "react";
import AddAddress from "../../src/AddAddress";
import Addresses from "../../src/Addresses";
import { Alert, AlertButton, AlertOptions } from "react-native";

const screenProps = {
  navigation: {
    addListener: jest.fn().mockImplementation((event, callback) => {
      if (event === "willFocus") {
        (callback as Function)();
      }
      if (event === "focusListener") {
        (callback as Function)();
      }
    }),
    state: {
      params: {
        countryIndex: 118,
        data: {},
        comingFrom: "edit",
      },
    },
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
  id: "AddressManagement",
};

const feature = loadFeature(
  "./__tests__/features/AddressManagement-scenario.feature"
);

const addressArray = {
  data: [
    {
      id: "126",
      type: "address",
      attributes: {
        name: "Random USER",
        country_code: "+91",
        phone_number: "+918910369200",
        contact_number: "+918910369200",
        street: "A.B. Road",
        zipcode: "125133",
        area: "Vijay Nagar",
        block: "D",
        city: "Bhopal",
        house_or_building_number: "207",
        floor: null,
        address_name: "Home",
        is_default: false,
        latitude: 33.755787,
        longitude: -116.359998,
      },
    },
    {
      id: "127",
      type: "address",
      attributes: {
        name: "Random USER",
        country_code: "+91",
        phone_number: "+918910369200",
        contact_number: "+918910369200",
        street: "A.B. Road",
        zipcode: "125133",
        area: "Vijay Nagar",
        block: "D",
        city: "Bhopal",
        house_or_building_number: "207",
        floor: null,
        address_name: "Home",
        is_default: false,
        latitude: 33.755787,
        longitude: -116.359998,
      },
    },
    {
      id: "128",
      type: "address",
      attributes: {
        name: "Random USER",
        country_code: "+91",
        phone_number: "+918910369200",
        contact_number: "+918910369200",
        street: "A.B. Road",
        zipcode: "125133",
        area: "Vijay Nagar",
        block: "D",
        city: "Bhopal",
        house_or_building_number: "207",
        floor: null,
        address_name: "Home",
        is_default: false,
        latitude: 33.755787,
        longitude: -116.359998,
      },
    },
  ],
  meta: {
    message: "List of all addresses",
  },
};

let mockAlert: Object;
defineFeature(feature, (test) => {
  beforeEach(() => {
    // jest.resetModules();
    jest.doMock("react-native", () => ({ Platform: { OS: "web" } }));
    jest.spyOn(helpers, "getOS").mockImplementation(() => "web");
    mockAlert = jest
      .spyOn(Alert, "alert")
      .mockImplementation(
        (
          title: string,
          message?: string | undefined,
          button?: AlertButton[] | undefined,
          options?: AlertOptions | undefined
        ) => {
          button && button[1].onPress && button[1].onPress();
        }
      );
  });

  test("User navigates to AddAddress", ({ given, when, then }) => {
    let addressManagementBlock: ShallowWrapper;
    let instance: AddAddress;

    given("I am a User loading AddAddress", () => {
      addressManagementBlock = shallow(<AddAddress {...screenProps} />);
    });

    when("I navigate to the AddAddress", () => {
      instance = addressManagementBlock.instance() as AddAddress;
      const messsage = new Message(getName(MessageEnum.RestAPIResponceMessage));
      messsage.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: messsage.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: [
          {
            numeric_code: "+992",
            country_full_name: "Tajikistan",
            country_code: "TJ",
            country_flag: "🇹🇯",
          },
          {
            numeric_code: "+1",
            country_full_name: "Jamaica",
            country_code: "JM",
            country_flag: "🇯🇲",
          },
          {
            numeric_code: "+509",
            country_full_name: "Haiti",
            country_code: "HT",
            country_flag: "🇭🇹",
          },
          {
            numeric_code: "+965",
            country_full_name: "Kuwait",
            country_code: "KW",
            country_flag: "🇰🇼",
          },
        ],
      });

      instance.countryCodeApiCallId = messsage.messageId;
      runEngine.sendMessage("UNIT TEST", messsage);
    });

    then("AddAddress will load with out errors", () => {
      instance.componentDidMount();
      expect(addressManagementBlock).toBeTruthy();
    });

    then("I can press navigate to go back", () => {
      let btnBackAddress = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "btnBackAddAddress"
      );
      btnBackAddress.simulate("press");
    });

    then("I can enter text with out errors", () => {
      let textInputComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "txtInputFirstName"
      );
      textInputComponent.simulate("changeText", "sumail");
      textInputComponent.simulate("submitEditing");
      textInputComponent.simulate("onFocus")

      instance.setState({ isName: true });
      expect(instance.state.isName).toBe(true);
      expect(textInputComponent).toBeTruthy();

      textInputComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "txtInputArea"
      );
      textInputComponent.simulate("changeText", "Bessie");
      textInputComponent.simulate("submitEditing");
      textInputComponent.simulate("onFocus")

      instance.setState({ isArea: true });
      expect(instance.state.isArea).toBe(true);
      expect(textInputComponent).toBeTruthy();

      textInputComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "txtInputBlock"
      );
      textInputComponent.simulate("changeText", "bellaer");
      textInputComponent.simulate("submitEditing");
      textInputComponent.simulate("onFocus")

      instance.setState({ isBlock: true });
      expect(instance.state.isBlock).toBe(true);
      expect(textInputComponent).toBeTruthy();

      textInputComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "txtInputAddress"
      );
      textInputComponent.simulate("changeText", "2972 Al-Salam Street");
      textInputComponent.simulate("submitEditing");
      textInputComponent.simulate("onFocus")

      instance.setState({ isAddress: true });
      expect(instance.state.isAddress).toBe(true);
      expect(textInputComponent).toBeTruthy();

      let addAddressBtn = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "btnRedirectGps"
      );
      addAddressBtn.simulate("press");

      textInputComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "txtInputHouseNumber"
      );
      textInputComponent.simulate("changeText", "297");
      textInputComponent.simulate("submitEditing");
      textInputComponent.simulate("onFocus")

      instance.setState({ isHouseNumber: true });
      expect(instance.state.isHouseNumber).toBe(true);
      expect(textInputComponent).toBeTruthy();

      textInputComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "txtInputZipCode"
      );
      textInputComponent.simulate("changeText", "12367");
      textInputComponent.simulate("submitEditing");
      textInputComponent.simulate("onFocus")

      instance.setState({ isZipCode: true });
      expect(instance.state.isZipCode).toBe(true);
      expect(textInputComponent).toBeTruthy();

      textInputComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "txtInputAddressname"
      );
      textInputComponent.simulate("changeText", "home");
      textInputComponent.simulate("submitEditing");
      textInputComponent.simulate("onFocus")

      instance.setState({ isAddressName: true });
      expect(instance.state.isAddressName).toBe(true);
      expect(textInputComponent).toBeTruthy();

      instance.setState({ isContactNumber: true });
      expect(instance.state.isContactNumber).toBe(true);
      expect(textInputComponent).toBeTruthy();
    });

    then("I can select the button with with out errors", () => {
      let buttonComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "Background"
      );
      buttonComponent.simulate("press");
      expect(addressManagementBlock).toBeTruthy();
      buttonComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "btnSaveAdress"
      );
      instance.setState({ isEditAdddress: true });
      buttonComponent.simulate("press");
      instance.setState({ isEditAdddress: true });
    });

    then("I can select the edit button with with out errors", () => {
      let buttonComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "Background"
      );
      buttonComponent.simulate("press");
      expect(addressManagementBlock).toBeTruthy();
      buttonComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "btnSaveAdress"
      );
      instance.setState({ isEditAdddress: false });
      buttonComponent.simulate("press");
      instance.setState({ isEditAdddress: false });
    });

    then("Add address API Should Fail", () => {
      // expect(instance.handleSavePressed()).toBe(false);

      const msgAddAddressErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgAddAddressErrorRestAPI
      );
      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              name:
                "must have a unique combination of Apartment Number, Building/House, and Block",
            },
          ],
        }
      );

      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgAddAddressErrorRestAPI.messageId
      );
      instance.apiAddAddressCallId = msgAddAddressErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgAddAddressErrorRestAPI);
    });

    then("add address should succeed", () => {
      // expect(instance.handleSavePressed()).toBe(true);
      const addAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addAddressAPI
      );
      addAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        addressArray
      );

      addAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addAddressAPI.messageId
      );
      instance.apiAddAddressCallId = addAddressAPI.messageId;
      runEngine.sendMessage("Unit Test", addAddressAPI);
    });

    then("edit address should succeed", () => {
      // expect(instance.handleSavePressed()).toBe(true);
      const addAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      addAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addAddressAPI
      );
      addAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        addressArray
      );

      addAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        addAddressAPI.messageId
      );
      instance.apiEditAddressCallId = addAddressAPI.messageId;
      runEngine.sendMessage("Unit Test", addAddressAPI);
    });

    then("edit address API Should Fail", () => {
      // expect(instance.handleSavePressed()).toBe(false);

      const msgAddAddressErrorRestAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgAddAddressErrorRestAPI
      );
      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              name:
                "must have a unique combination of Apartment Number, Building/House, and Block",
            },
          ],
        }
      );

      msgAddAddressErrorRestAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        msgAddAddressErrorRestAPI.messageId
      );
      instance.apiEditAddressCallId = msgAddAddressErrorRestAPI.messageId;
      runEngine.sendMessage("Unit Test", msgAddAddressErrorRestAPI);
    });

    then("Call RestAPIs without errors", () => {
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const addAddressListAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      addAddressListAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: {
            name: "Sumail",
            area: "Kuwait",
            block: "989",
            street: "BC Road",
            apartment_number: "90",
            city: "Kuwait",
            zipcode: "898877",
            contact_number: "9988766543",

            building_house: "99",
            floor: "221B",
          },
        }
      );
      instance.apiAddAddressCallId = addAddressListAPI.messageId;
      runEngine.sendMessage("Unit Test", addAddressListAPI);
      expect(addressManagementBlock).toBeTruthy();
    });

    then("I can toggle default address", () => {
      let buttonComponent = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "defaultAddressBtn"
      );
      buttonComponent.at(0).prop("onValueChange")(true);

      expect(buttonComponent).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      instance.componentWillUnmount();
      expect(addressManagementBlock).toBeTruthy();
    });
  });

  test("User adding empty address", ({ given, when, then }) => {
    let addressManagementBlock: ShallowWrapper;
    let instance: AddAddress;

    given("I am a User loading AddAddress", () => {
      addressManagementBlock = shallow(<AddAddress {...screenProps} />);
    });

    when("I navigate to the AddAddress", () => {
      instance = addressManagementBlock.instance() as AddAddress;
    });

    then("I failed validation error name", () => {
      // instance.editAddresshandler(addressArray.data[0]);
      instance.setState({
        name: "",
      });
      instance.addNewAddress();
      if (instance.state.name.length === 0) {
        instance.setState({ isName: true });
        return;
      }
    });

    then("I failed validation error area", () => {
      instance.setState({
        name: "pops",
        area: "",
      });
      instance.addNewAddress();
      if (instance.state.area.length === 0) {
        instance.setState({ isArea: true });
        return;
      }
    });

    then("I failed validation error block", () => {
      instance.setState({
        name: "pops",
        area: "area",
        block: "",
      });
      instance.addNewAddress();
      if (instance.state.block.length === 0) {
        instance.setState({ isBlock: true });
        return;
      }
    });

    then("I failed validation error address", () => {
      instance.setState({
        name: "pops",
        area: "area",
        block: "block",
        address: "",
      });
      instance.addNewAddress();
      if (instance.state.address.length === 0) {
        instance.setState({ isAddress: true });
        return;
      }
    });

    then("I failed validation error housenumber", () => {
      instance.setState({
        houseNumber: "",
      });
      instance.filedsValidation();
      if (instance.state.houseNumber.length === 0) {
        instance.setState({ isHouseNumber: true });
        return;
      }
    });

    then("I failed validation error city", () => {
      instance.setState({
        houseNumber: "houseNumber",
        city: "",
      });
      instance.filedsValidation();
      if (instance.state.city.length === 0) {
        instance.setState({ isCity: true });
        return;
      }
    });

    then("I failed validation error zipcode", () => {
      instance.setState({
        houseNumber: "houseNumber",
        city: "city",
        zipCode: "",
      });
      instance.filedsValidation();
      if (instance.state.zipCode.length === 0) {
        instance.setState({ isZipCode: true });
        return;
      }
    });

    then("I failed validation error contactnumber", () => {
      instance.setState({
        contactNumber: "",
        houseNumber: "houseNumber",
        city: "city",
        zipCode: "676657",
      });
      instance.filedsValidation();
      if (instance.state.contactNumber.length === 0) {
        instance.setState({ isContactNumber: true });
        return;
      }
      instance.handleSavePressed();
    });
  });

  test("User navigates to Addresses", ({ given, when, then }) => {
    let addressManagementBlock: ShallowWrapper;
    let instance: Addresses;
    let screen: ReturnType<typeof render>;

    given("I am a User loading Addresses", () => {
      addressManagementBlock = shallow(<Addresses {...screenProps} />);
      instance = addressManagementBlock.instance() as Addresses;
    });

    when("I navigate to the Addresses", () => {
      instance = addressManagementBlock.instance() as Addresses;
    });

    then("Addresses will load with out errors", () => {
      const message0 = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message0.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message0.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          ...addressArray,
          data: addressArray.data.slice(0, 1),
        } as typeof addressArray,
      });
      // screen.container.instance.apiGetAllAddressCallId = message0.messageId;
      runEngine.sendMessage("UNIT TEST", message0);

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: addressArray,
      });
      instance.apiGetAllAddressCallId = message.messageId;
      runEngine.sendMessage("UNIT TEST", message);
      expect(addressManagementBlock).toBeTruthy();
    });

    then("I can show all address with list view and with out errors", () => {
      const flatlist = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "address_flatlist_list"
      );
      flatlist.simulate("endReached");
      const item = addressArray.data[0];

      const renderItem = flatlist.renderProp("renderItem")({
        item: item,
        index: 0,
      });
      flatlist.renderProp("keyExtractor")("3");
      let editdata = {
        id: "3",
      };
      let editAddressBtn = renderItem.findWhere(
        (node) => node.prop("testID") === "editAddressBtn"
      );
      editAddressBtn.at(0).prop("onPress")();
      // editAddressBtn.simulate("press")

      let deleteAddressBtn = renderItem.findWhere(
        (node) => node.prop("testID") === "deleteAddressBtn"
      );
      deleteAddressBtn.simulate("press");
    });

    then(
      "I can show all address with list view with address type and with out errors",
      () => {
        const flatlist = addressManagementBlock.findWhere(
          (node) => node.prop("testID") === "address_flatlist_list"
        );
        flatlist.simulate("endReached");
        const item = addressArray.data[1];

        const renderItem = flatlist.renderProp("renderItem")({
          item: item,
          index: 0,
        });
        // flatlist.renderProp("ListEmptyComponent")({})
        flatlist.renderProp("keyExtractor")("3");
        let editdata = {
          id: "3",
        };
        let editAddressBtn = renderItem.findWhere(
          (node) => node.prop("testID") === "editAddressBtn"
        );
        editAddressBtn.at(0).prop("onPress")();
        // editAddressBtn.simulate("press")

        let deleteAddressBtn = renderItem.findWhere(
          (node) => node.prop("testID") === "deleteAddressBtn"
        );
        deleteAddressBtn.simulate("press");
      }
    );

    then("I can show all address with list view with null address type", () => {
      const flatlist = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "address_flatlist_list"
      );
      flatlist.simulate("endReached");
      const item = addressArray.data[2];

      const renderItem = flatlist.renderProp("renderItem")({
        item: item,
        index: 0,
      });
      // flatlist.renderProp("ListEmptyComponent")({})
      flatlist.renderProp("keyExtractor")("3");
      let editdata = {
        id: "3",
      };
      let editAddressBtn = renderItem.findWhere(
        (node) => node.prop("testID") === "editAddressBtn"
      );
      editAddressBtn.at(0).prop("onPress")();
      // editAddressBtn.simulate("press")

      let deleteAddressBtn = renderItem.findWhere(
        (node) => node.prop("testID") === "deleteAddressBtn"
      );
      deleteAddressBtn.simulate("press");
    });

    then("get address should succeed", () => {
      // expect(instance.handleSavePressed()).toBe(true);
      const getAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getAddressAPI
      );
      getAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "25",
              type: "address",
              attributes: {
                name: "Sumail",
                contact_number: "+919876543210",
                street: "2972 Al-Salam Street",
                zipcode: "12345",
                area: "Bessie",
                block: "bellaer",
                city: "Kuwait",
                building_house: "2972",
                floor: "4",
                apartment_number: "12454",
                address_type: null,
              },
            },
          ],
          meta: {
            message: "List of all addresses",
          },
        }
      );

      getAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getAddressAPI.messageId
      );
      instance.apiGetAllAddressCallId = getAddressAPI.messageId;
      runEngine.sendMessage("Unit Test", getAddressAPI);

      const getContryList = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getContryList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContryList
      );
      getContryList.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              numeric_code: "+93",
              country_full_name: "Afghanistan",
              country_code: "AF",
              country_flag: "AF",
            },
          ],
        }
      );

      getContryList.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getContryList.messageId
      );
      instance.countryCodeApiCallId = getContryList.messageId;
      runEngine.sendMessage("Unit Test", getContryList);
      expect(addressManagementBlock).toBeTruthy();
    });

    then("get address should fail", () => {
      // expect(instance.handleSavePressed()).toBe(true);
      const getAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getAddressAPI
      );
      getAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              contact_number: "is not a valid phone number",
            },
          ],
        }
      );

      getAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getAddressAPI.messageId
      );
      instance.apiGetAllAddressCallId = getAddressAPI.messageId;
      runEngine.sendMessage("Unit Test", getAddressAPI);
    });

    then("delete address should succeed", () => {
      // expect(instance.handleSavePressed()).toBe(true);
      const deleteAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteAddressAPI
      );
      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "Address deleted succesfully!",
        }
      );

      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteAddressAPI.messageId
      );
      instance.apiDeleteAddressCallId = deleteAddressAPI.messageId;
      runEngine.sendMessage("Unit Test", deleteAddressAPI);
    });

    then("delete address should fail", () => {
      // expect(instance.handleSavePressed()).toBe(true);
      const deleteAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteAddressAPI
      );
      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          errors: [
            {
              contact_number: "is not a valid phone number",
            },
          ],
        }
      );

      deleteAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        deleteAddressAPI.messageId
      );
      instance.apiDeleteAddressCallId = deleteAddressAPI.messageId;
      runEngine.sendMessage("Unit Test", deleteAddressAPI);
    });

    then("get empty address should succeed", () => {
      // expect(instance.handleSavePressed()).toBe(true);
      const getAddressAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );
      getAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getAddressAPI
      );
      getAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          message: "No Address is present",
        }
      );

      getAddressAPI.addData(
        getName(MessageEnum.RestAPIResponceDataMessage),
        getAddressAPI.messageId
      );
      instance.apiGetAllAddressCallId = getAddressAPI.messageId;
      runEngine.sendMessage("Unit Test", getAddressAPI);
    });

    then("Call RestAPIs without errors", () => {
      addressManagementBlock = shallow(<Addresses {...screenProps} />);
      instance = addressManagementBlock.instance() as Addresses;
      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const getAddressListAPI = new Message(
        getName(MessageEnum.RestAPIResponceMessage)
      );

      getAddressListAPI.addData(
        getName(MessageEnum.RestAPIResponceSuccessMessage),
        {
          data: [
            {
              id: "27",
              type: "address",
              attributes: {
                name: "Sumail",
                contact_number: "+919876543210",
                street: "2972 Al-Salam Street",
                zipcode: "12345",
                area: "Bessie",
                block: "bellaer",
                city: "Kuwait",
                building_house: "2972",
                floor: "4",
                apartment_number: "12454",
                address_type: null,
              },
            },
          ],
        }
      );
      expect(addressManagementBlock).toBeTruthy();
    });

    then("I can leave the screen with out errors", () => {
      let btnBackAddress = addressManagementBlock.findWhere(
        (node) => node.prop("testID") === "btnBackAddress"
      );
      btnBackAddress.simulate("press");

      instance.componentWillUnmount();
      expect(addressManagementBlock).toBeTruthy();
    });
  });

  test("User navigates to Assign Addresses", ({ given, when, then }) => {
    let sendMessage = jest.spyOn(runEngine, "sendMessage");
    jest.useFakeTimers();
    let screen: ReturnType<typeof render>;

    let addressManagementBlock: ShallowWrapper;
    let instance: Addresses;

    given("I am a user loading select address", () => {
      addressManagementBlock = shallow(<Addresses {...screenProps} />);
      instance = addressManagementBlock.instance() as Addresses;


    });

    when("The page loads", () => {

      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const navMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );

      navMessage.addData(getName(MessageEnum.AddAddressMessage), {
        id: 1,
        data: addressArray.data[0].attributes,
        comingFrom: "edit",
      });
      runEngine.sendMessage("Unit Test", navMessage);

      navMessage.addData(getName(MessageEnum.CheckoutAddressMessage), {
        id: 1,
      });
      navMessage.addData(getName(MessageEnum.AddAddressMessage), null);
      runEngine.sendMessage("Unit Test", navMessage);

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: addressArray,
      });
      instance.apiGetAllAddressCallId = message.messageId;
      runEngine.sendMessage("UNIT TEST", message);
    });

    then("I can see Addresses", () => {
      instance.toggleAssignAddress("126")
    });

    when("I click on Add New Addresses", () => {

    });

    then("I go to add address", () => {
      
    });

    when("I click on checkbox", () => {
     

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          message: "done",
        },
      });
      instance.assignAddressToOrderApiCallId =
        message.messageId;
      runEngine.sendMessage("UNIT TEST", message);
    });

    then("It assigns the address to order", () => {

    });

    when("I click on checkout", () => {
    });

    then("I can go to checkout", () => {
      expect(screenProps.navigation.goBack).toHaveBeenCalled();
    });
  });

  test("User navigates to Assign Addresses From Chat", ({ given, when, then }) => {
    let sendMessage = jest.spyOn(runEngine, "sendMessage");
    jest.useFakeTimers();
    let screen: ReturnType<typeof render>;

    let addressManagementBlock: ShallowWrapper;
    let instance: Addresses;

    given("I am a user loading select address", () => {
      addressManagementBlock = shallow(<Addresses {...screenProps} />);
      instance = addressManagementBlock.instance() as Addresses;


    });

    when("The page loads", () => {

      const tokenMsg: Message = new Message(
        getName(MessageEnum.SessionResponseMessage)
      );
      tokenMsg.addData(getName(MessageEnum.SessionResponseToken), "TOKEN");
      runEngine.sendMessage("Unit Test", tokenMsg);

      const navMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );

      navMessage.addData(getName(MessageEnum.AddAddressMessage), {
        id: 1,
        data: addressArray.data[0].attributes,
        comingFrom: "edit",
      });
      runEngine.sendMessage("Unit Test", navMessage);

      navMessage.addData(getName(MessageEnum.CheckoutAddressMessage), {
        id: 1,
        from : "cart"
      });
      navMessage.addData(getName(MessageEnum.AddAddressMessage), null);
      runEngine.sendMessage("Unit Test", navMessage);

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: addressArray,
      });
      instance.apiGetAllAddressCallId = message.messageId;
      runEngine.sendMessage("UNIT TEST", message);
    });

    then("I can see Addresses", () => {
      instance.toggleAssignAddress("126")
    });

    when("I click on Add New Addresses", () => {

    });

    then("I go to add address", () => {
      
    });

    when("I click on checkbox", () => {
     

      const message = new Message(getName(MessageEnum.RestAPIResponceMessage));
      message.initializeFromObject({
        [getName(MessageEnum.RestAPIResponceDataMessage)]: message.messageId,
        [getName(MessageEnum.RestAPIResponceSuccessMessage)]: {
          message: "done",
        },
      });
      instance.assignAddressToOrderApiCallId =
        message.messageId;
      runEngine.sendMessage("UNIT TEST", message);
    });

    then("It assigns the address to order", () => {
      instance.getStoreDataAddress()
      instance.fetchCountryCodesInAddress()
    });

    when("I click on checkout", () => {
    });

    then("I can go to checkout", () => {
      expect(screenProps.navigation.goBack).toHaveBeenCalled();
    });
  });
});
