import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { fireEvent, render } from "@testing-library/react-native";
import { jest, expect, describe, test, it } from "@jest/globals";

import { runEngine } from "../../../../framework/src/RunEngine";
import { Message } from "../../../../framework/src/Message";

import MessageEnum, {
  getName,
} from "../../../../framework/src/Messages/MessageEnum";

import CustomformCreateStoreTiming from "../../src/CustomformCreateStoreTiming";
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
  storeImage: "",
  storeImageUpload: { name: "", type: "", uri: "" },
  storeName: "",
  storeNameArabic:'',
  storeDes: "",
  storeDesArabic:'',
  address: "",
  latitude: "",
  longitude: "",
  area: "",
  areaArabic:'',
  block: "",
  blockArabic:"",
  mallName: "",
  mallNameArabic:"",
  floor: "",
  floorArabic:'',
  unitNumber: "",
  city: "",
  cityArabic:'',
  zipCode: "",
  reachDriver: "",
  reachDriverArabic:"",
  countryCode: "",
  phoneNumber: "",
  weekDayArr: [],
  orderShip: "",
};

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
  id: "CustomformCreateStoreTiming",
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

describe("CustomformCreateStoreTiming page", () => {
  let splashWrapper: ShallowWrapper;
  splashWrapper = shallow(<CustomformCreateStoreTiming {...screenProps} />);
  let storeTimingInstance: CustomformCreateStoreTiming;

  storeTimingInstance = splashWrapper.instance() as CustomformCreateStoreTiming;

  test("should find the testId btnBackStoreTiming", () => {
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnBackStoreTiming"
    );
    signUp.simulate("press");
  });

  test("when i reach end and get token", async () => {
    const msgTokenAPI = new Message(
      getName(MessageEnum.SessionResponseMessage)
    );
    msgTokenAPI.addData(
      getName(MessageEnum.SessionResponseToken),
      "User-Token"
    );
    runEngine.sendMessage("Unit Test", msgTokenAPI);
  });

  it("should render week day monday start time empty data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 0,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(0);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[0].startTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day monday data with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 0,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(0);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[0].startTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day monday empty to time data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 0,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(0);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[0].endTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day monday data end time with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 0,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(0);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[0].endTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day tuesday start time empty data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 1,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(1);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[1].startTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day tuesday data start time with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 1,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(1);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[1].startTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day tuesday empty to time data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 1,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(1);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[1].endTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day tuesday data end time with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 1,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(1);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[1].endTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day wednesday start time empty data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 2,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(2);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[2].startTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day wednesday data with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 2,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(2);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[2].startTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day wednesday empty to time data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 2,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(2);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[2].endTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day wednesday data end time with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 2,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(2);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[2].endTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day thursday start time empty data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 3,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(3);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[3].startTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day thursday data with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 3,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(3);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[3].startTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day thursday empty to time data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 3,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(3);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[3].endTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day thursday data end time with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 3,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(3);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[3].endTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day friday start time empty data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 4,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(4);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[4].startTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day friday data with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 4,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(4);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[4].startTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day friday empty to time data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 4,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(4);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[4].endTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day friday data end time with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 4,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(4);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[4].endTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day saturday start time empty data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 5,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(5);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[5].startTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day saturday data with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 5,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(5);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[5].startTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day saturday empty to time data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 5,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(5);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[5].endTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day saturday data end time with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 5,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(5);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[5].endTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day sunday start time empty data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 6,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(6);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[6].startTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day sunday data with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 6,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimeFrom"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(6);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_from_time"
    );
    expect(storeTimingInstance.state.weekDayArr[6].startTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day sunday empty to time data show", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 6,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(6);

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[6].endTime).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  it("should render week day sunday data end time with out errors", async () => {
    let render_item = splashWrapper.findWhere(
      (node) => node.prop("testID") === "weekday_data_show"
    );
    let render_data = render_item.renderProp("renderItem")({
      item: itemObject,
      index: 6,
    });
    expect(render_data).toBeTruthy();

    let let_button = render_data.findWhere(
      (node) => node.prop("testID") == "btnShowTimePickerTo"
    );
    expect(let_button).toBeTruthy();
    let_button.simulate("press");
    expect(storeTimingInstance.state.currentIndex).toBe(6);

    let let_button_date = splashWrapper.findWhere(
      (node) => node.prop("testID") == "dateTimePicker"
    );
    expect(let_button_date).toBeTruthy();
    let_button_date.simulate("confirm");

    let textInputComponent = render_data.findWhere(
      (node) => node.prop("testID") == "txt_enter_to_time"
    );
    expect(storeTimingInstance.state.weekDayArr[6].endTime).toBe(
      moment(new Date()).format("hh:mm A")
    );
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  test("I am trying to create store with empty avg time", () => {
    const genderDropDown = splashWrapper.findWhere(
      (node) => node.prop("testID") === "avgTimeDropdown"
    );
    const event_check = { label: "10 Min", value: "" };
    genderDropDown.simulate("change", event_check);
    expect(storeTimingInstance.state.orderAvgTiming).toBe("");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  test("i can select avg timing of user with out errors", () => {
    const genderDropDown = splashWrapper.findWhere(
      (node) => node.prop("testID") === "avgTimeDropdown"
    );
    const event_check = { label: "10 Min", value: "10 Min" };
    genderDropDown.simulate("change", event_check);
    expect(storeTimingInstance.state.orderAvgTiming).toBe("10 Min");
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");
  });

  test("i can send api data with out errors", () => {
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnCreateStore"
    );
    signUp.simulate("press");    
    let renderSectionHeaderMockCall = jest.fn(storeTimingInstance.dataSetApiCalling);
    renderSectionHeaderMockCall(localObject, "UPI,COD");
  });

  test("Update profile Should Pass and update data", () => {
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
    storeTimingInstance.addStoreCallApiId = msgLogInErrorRestAPI.messageId;
    runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
  });

  test("Update profile Should Pass and update data with errors undefined", () => {
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
    storeTimingInstance.addStoreCallApiId = msgLogInErrorRestAPI.messageId;
    runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
  });

  test("Update profile Should Pass and update data with errors", () => {
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
            contact_number: "Data send",
          },
        ],
      }
    );

    msgLogInErrorRestAPI.addData(
      getName(MessageEnum.RestAPIResponceDataMessage),
      msgLogInErrorRestAPI.messageId
    );
    storeTimingInstance.addStoreCallApiId = msgLogInErrorRestAPI.messageId;
    runEngine.sendMessage("Unit Test", msgLogInErrorRestAPI);
    storeTimingInstance.setState({languageUpdate:'ar'})
  });

  test("should find the testId btnTimingBack", () => {
    const signUp = splashWrapper.findWhere(
      (node) => node.prop("testID") === "btnTimingBack"
    );
    signUp.simulate("press");
  });
});

test("CustomformCreateStoreTiming when seller is approved", () => {
  const { getAllByTestId, getByTestId, container } = render(
    <CustomformCreateStoreTiming {...screenProps} />
  );

  const msgTokenAPI = new Message(getName(MessageEnum.SessionResponseMessage));
  msgTokenAPI.addData(getName(MessageEnum.SessionResponseToken), "User-Token");
  runEngine.sendMessage("Unit Test", msgTokenAPI);

  const msg = new Message(getName(MessageEnum.RestAPIResponceMessage));
  msg.addData(getName(MessageEnum.RestAPIResponceDataMessage), msg.messageId);
  msg.addData(
    getName(MessageEnum.RestAPIResponceSuccessMessage),
    sellerIdObject
  );
  container.instance.getSellerDetailsApiCallId = msg.messageId;
  runEngine.sendMessage("UNIT TEST", msg);

  const msg2 = new Message(getName(MessageEnum.RestAPIResponceMessage));
  msg2.addData(getName(MessageEnum.RestAPIResponceDataMessage), msg2);
  msg2.addData(getName(MessageEnum.RestAPIResponceSuccessMessage), {
    data: [
      {
        failed_login: "Data send",
      },
    ],
  });

  msg2.addData(getName(MessageEnum.RestAPIResponceDataMessage), msg2.messageId);
  container.instance.addStoreCallApiId = msg2.messageId;
  runEngine.sendMessage("Unit Test", msg2);

  const textFrom = getAllByTestId("txt_enter_from_time");
  for (const txtFrom of textFrom) {
    fireEvent.changeText(txtFrom, "09:30 AM");
  }

  const textTo = getAllByTestId("txt_enter_to_time");
  for (const txtFrom of textFrom) {
    fireEvent.changeText(txtFrom, "09:30 PM");
  }

  const avgTimeDd = getByTestId("avgTimeDropdown");
  const event_check = { label: "10 Min", value: "" };
  fireEvent(avgTimeDd, "change", event_check);

  const createButton = getByTestId("btnCreateStore");
  fireEvent.press(createButton);
});
