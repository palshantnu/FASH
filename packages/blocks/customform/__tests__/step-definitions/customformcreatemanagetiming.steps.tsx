import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { shallow, ShallowWrapper } from "enzyme";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect, test, it } from "@jest/globals";
import * as helpers from "../../../../framework/src/Helpers";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import CustomformCreateManageTiming from "../../src/CustomformCreateManageTiming";
import moment from "moment";

const itemObject = [
  {
    id: 1,
    day: "Mon *",
    startTime: "",
    endTime: "",
    status: false,
    dayFromError: false,
    dayToError: false,
    errorMsg: "",
    startTimeTf: "",
    endTimeTf: "",
  },
  {
    id: 2,
    day: "Tue *",
    startTime: "",
    endTime: "",
    status: false,
    dayFromError: false,
    dayToError: false,
    errorMsg: "",
    startTimeTf: "",
    endTimeTf: "",
  },
  {
    id: 3,
    day: "Wed *",
    startTime: "",
    endTime: "",
    status: false,
    dayFromError: false,
    dayToError: false,
    errorMsg: "",
    startTimeTf: "",
    endTimeTf: "",
  },
  {
    id: 4,
    day: "Thu *",
    startTime: "",
    endTime: "",
    status: false,
    dayFromError: false,
    dayToError: false,
    errorMsg: "",
    startTimeTf: "",
    endTimeTf: "",
  },
  {
    id: 5,
    day: "Fri *",
    startTime: "",
    endTime: "",
    status: false,
    dayFromError: false,
    dayToError: false,
    errorMsg: "",
    startTimeTf: "",
    endTimeTf: "",
  },
  {
    id: 6,
    day: "Sat *",
    startTime: "",
    endTime: "",
    status: false,
    dayFromError: false,
    dayToError: false,
    errorMsg: "",
    startTimeTf: "",
    endTimeTf: "",
  },
  {
    id: 7,
    day: "Sun *",
    startTime: "",
    endTime: "",
    status: false,
    dayFromError: false,
    dayToError: false,
    errorMsg: "",
    startTimeTf: "",
    endTimeTf: "",
  },
];

const localObject = {
    "store_operating_hours": {
        "monday": {
            "open": "16:13",
            "close": "16:13",
            "is_open": true
        },
        "tuesday": {
            "open": "16:13",
            "close": "16:13",
            "is_open": true
        },
        "wednesday": {
            "open": "16:13",
            "close": "16:13",
            "is_open": true
        },
        "thursday": {
            "open": "16:13",
            "close": "16:13",
            "is_open": true
        },
        "friday": {
            "open": "16:13",
            "close": "16:14",
            "is_open": true
        },
        "saturday": {
            "open": "16:14",
            "close": "16:14",
            "is_open": true
        },
        "sunday": {
            "open": "16:14",
            "close": "16:14",
            "is_open": true
        }
    },
    "average_shipping_time": "20 mins"
}

const screenProps = {
  navigation: {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    getParam: (playlist_id: any, topic_id: any) => {},
    addListener: (param: string, callback: any) => {
      callback();
    },
  },
  id: "CustomformCreateManageTiming",
};

const sellerIdObject = {
  data: {
    id: "498",
    type: "account",
    attributes: {
      activated: true,
      country_code: "965",
      email: "seller.john@yopmail.com",
      first_name: null,
      full_phone_number: "96522583690",
      last_name: null,
      full_name: "Arnab Seller",
      phone_number: "22583690",
      type: null,
      created_at: "2024-02-29T05:38:45.797Z",
      updated_at: "2024-03-04T07:29:09.851Z",
      device_id: null,
      unique_auth_id: "5vZVlTBu58FlQSyKZtzHPAtt",
      id_proof: {
        name: "id_proof",
        record: {
          id: 498,
          approve_status: "Approved",
          seller_status: "Store_created",
        },
      },
      license: {
        name: "license",
        record: {
          id: 498,
          approve_status: "Approved",
          seller_status: "Store_created",
        },
      },
      seller_status: "Store_created",
    },
  },
};

global.FormData = require("react-native/Libraries/Network/FormData");
const feature = loadFeature("./__tests__/features/customformcreatemanagetiming-scenario.feature");

defineFeature(feature, (test) => {

    beforeEach(() => {
        jest.doMock("react-native", () => ({ Platform: { OS: "android" } }));
        jest.spyOn(helpers, "getOS").mockImplementation(() => "");
      });
    
      test("User navigates to CustomformCreateManageTiming", ({ given, when, then }) => {
        let CustomformCreateManageTimingBlock: ShallowWrapper;
        let instance: CustomformCreateManageTiming;
    
        given("I am a User loading CustomformCreateManageTiming", () => {
          CustomformCreateManageTimingBlock = shallow(<CustomformCreateManageTiming {...screenProps} />);
        });
    
        when("I navigate to the CustomformCreateManageTiming", () => {
          instance = CustomformCreateManageTimingBlock.instance() as CustomformCreateManageTiming;
        });
    
        then("CustomformCreateManageTiming will load with out errors", () => {
          expect(CustomformCreateManageTimingBlock).toBeTruthy();
          const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage))
          msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
          runEngine.sendMessage("Unit Test", msgTokenAPI)
        
        });

        then("I should render week day monday start time empty data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 0,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(0);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[0].startTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day monday data with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 0,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(0);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[0].startTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day monday empty to time data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 0,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(0);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[0].endTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day monday data end time with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 0,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(0);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[0].endTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day tuesday start time empty data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 1,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(1);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[1].startTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day tuesday data start time with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 1,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(1);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[1].startTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day tuesday empty to time data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 1,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(1);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[1].endTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day tuesday data end time with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 1,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(1);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[1].endTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day wednesday start time empty data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 2,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(2);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[2].startTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day wednesday data with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 2,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(2);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[2].startTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day wednesday empty to time data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 2,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(2);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[2].endTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day wednesday data end time with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 2,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(2);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[2].endTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day thursday start time empty data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 3,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(3);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[3].startTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day thursday data with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 3,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(3);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[3].startTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day thursday empty to time data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 3,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(3);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[3].endTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day thursday data end time with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 3,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(3);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[3].endTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day friday start time empty data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 4,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(4);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[4].startTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day friday data with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 4,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(4);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[4].startTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day friday empty to time data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 4,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(4);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[4].endTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day friday data end time with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 4,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(4);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[4].endTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day saturday start time empty data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 5,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(5);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[5].startTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day saturday data with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 5,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(5);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[5].startTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day saturday empty to time data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 5,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(5);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[5].endTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day saturday data end time with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 5,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(5);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[5].endTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day sunday start time empty data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 6,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(6);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[6].startTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day sunday data with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 6,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimeFromEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(6);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_from_time_edit"
            );
            expect(instance.state.weekDayArr[6].startTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day sunday empty to time data show", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 6,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(6);

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[6].endTime).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I should render week day sunday data end time with out errors", async () => {
            let render_item = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "weekday_data_show_edit"
            );
            let render_data = render_item.renderProp("renderItem")({
            item: itemObject,
            index: 6,
            });
            expect(render_data).toBeTruthy();

            let let_button = render_data.findWhere(
            (node) => node.prop("testID") == "btnShowTimePickerToEdit"
            );
            expect(let_button).toBeTruthy();
            let_button.simulate("press");
            expect(instance.state.currentIndex).toBe(6);

            let let_button_date = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") == "dateTimePickerEdit"
            );
            expect(let_button_date).toBeTruthy();
            let_button_date.simulate("confirm");

            let textInputComponent = render_data.findWhere(
            (node) => node.prop("testID") == "txt_enter_to_time_edit"
            );
            expect(instance.state.weekDayArr[6].endTime).toBe(
            moment(new Date()).format("hh:mm A")
            );
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
            render_item.renderProp("ItemSeparatorComponent")({})
        });

        then("I am trying to manage timing update with empty avg time", () => {
            const genderDropDown = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "avgTimeDropdownEdit"
            );
            const event_check = { label: "10 Min", value: "" };
            genderDropDown.simulate("change", event_check);
            expect(instance.state.orderAvgTiming).toBe("");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });

        then("I can select avg timing of user with out errors", () => {
            const genderDropDown = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "avgTimeDropdownEdit"
            );
            const event_check = { label: "10 Min", value: "10 Min" };
            genderDropDown.simulate("change", event_check);
            expect(instance.state.orderAvgTiming).toBe("10 Min");
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnUpdateStoreTimings"
            );
            signUp.simulate("press");
        });


        then("I Update store timing Should Pass and update data", () => {
            const msgLogInErrorRestAPI = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
            );
            msgLogInErrorRestAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            msgLogInErrorRestAPI
            );
            msgLogInErrorRestAPI.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {
                data: [
                {
                    failed_login: "Data send",
                },
                ],
            }
            );

            msgLogInErrorRestAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            msgLogInErrorRestAPI.messageId
            );
            instance.updateTimingsCallApiId = msgLogInErrorRestAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
        });

        then("I Update store timing Should Pass and update data with errors undefined", () => {
            const msgLogInErrorRestAPI = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
            );
            msgLogInErrorRestAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            msgLogInErrorRestAPI
            );
            msgLogInErrorRestAPI.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {
                errors: {
                test: "Data send",
                },
            }
            );

            msgLogInErrorRestAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            msgLogInErrorRestAPI.messageId
            );
            instance.updateTimingsCallApiId = msgLogInErrorRestAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
        });

        then("I Update store timing Should Pass and update data with errors", () => {
            const msgLogInErrorRestAPI = new Message(
            getName(MessageEnum.RestAPIResponceMessage)
            );
            msgLogInErrorRestAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            msgLogInErrorRestAPI
            );
            msgLogInErrorRestAPI.addData(
            getName(MessageEnum.RestAPIResponceSuccessMessage),
            {
                errors: [
                {
                    message: "Invalid Token",
                },
                ],
            }
            );

            msgLogInErrorRestAPI.addData(
            getName(MessageEnum.RestAPIResponceDataMessage),
            msgLogInErrorRestAPI.messageId
            );
            instance.updateTimingsCallApiId = msgLogInErrorRestAPI.messageId;
            runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
        });

        then("I should find the testId btnBackManageTiming", () => {
            const signUp = CustomformCreateManageTimingBlock.findWhere(
            (node) => node.prop("testID") === "btnBackManageTiming"
            );
            signUp.simulate("press");
        });

        then("I should get api with store timings with out errors", () => {
            const msgPlayloadAPI = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPI.addData(getName(MessageEnum.ManageTimingStoreIdPayloadMessage), "1");
            runEngine.sendMessage("Unit Test", msgPlayloadAPI)

            const msgPlayloadAPIToken = new Message(getName(MessageEnum.NavigationPayLoadMessage))
            msgPlayloadAPIToken.addData(getName(MessageEnum.navigationTokenMessage), "token");
            runEngine.sendMessage("Unit Test", msgPlayloadAPIToken)

            const getStoreTimingMessage = new Message(getName(MessageEnum.RestAPIResponceMessage))
            getStoreTimingMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getStoreTimingMessage);
            getStoreTimingMessage.addData(getName(MessageEnum.RestAPIResponceSuccessMessage),
            localObject);

            getStoreTimingMessage.addData(getName(MessageEnum.RestAPIResponceDataMessage), getStoreTimingMessage.messageId);
            instance.getStoreTimingsApiCallId = getStoreTimingMessage.messageId
            runEngine.sendMessage("Unit Test", getStoreTimingMessage);
          
        });

        then("I can leave the screen with out errors", () => {
            instance.componentWillUnmount();
            expect(CustomformCreateManageTimingBlock).toBeTruthy();
        });
    });
})