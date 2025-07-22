import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import React, { createRef, RefObject } from "react";
import { Image, StyleProp, TextStyle } from "react-native";
import MapView from "react-native-maps";
import moment from "moment";

import { deviceWidth, getStorageData } from "../../../framework/src/Utilities";
import { activeStatus, inActiveStatus, notFocus } from "./assets";
import { SearchResponse } from "./types";

export const configJSON = require("./config");

export interface TimelineData {
  time: string;
  title: string;
  description: string;
  lineColor: string;
  icon: JSX.Element;
  titleStyle: StyleProp<TextStyle>;
}
// Customizable Area End

export interface Props {
  // Customizable Area Start
  navigation: any;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  loading: boolean;
  orderNumber: string;
  start: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  driver: string;
  otp: string;
  eta: string;
  timeline: Array<TimelineData>;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class TrackReturnController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  searchWithOrderId = "";
  mapRef: RefObject<MapView> = { current: null };
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      loading: true,
      orderNumber: "",
      start: {
        latitude: 0,
        longitude: 0,
      },
      destination: {
        latitude: 0,
        longitude: 0,
      },
      timeline: [],
      driver: "",
      eta: "",
      otp: "****",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.mapRef = createRef();
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const orderNumber = message.getData(
        getName(MessageEnum.NavigationOrderStatusId2)
      );
      const summary = message.getData(
        getName(MessageEnum.NavigationOrderSummaryData)
      );
      if (orderNumber && summary) {
        return this.handlePayload(orderNumber, summary);
      }
    }
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiCallId === this.searchWithOrderId) {
        this.handleSearchOrder(responseJson);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  fetchOrderSummary = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));

    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.orderSummaryGetOrders +
        "return_and_refund&search=" +
        this.state.orderNumber,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.getMethod,
    });

    this.searchWithOrderId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  parseLineColor = (keyIndex: number, activeIndex: number) => {
    return keyIndex < activeIndex ? "#CCBEB1" : "#CBD5E1";
  };

  parseIcon = (keyIndex: number, activeIndex: number) => {
    if (keyIndex === activeIndex) {
      const size = deviceWidth * 0.06;
      return (
        <Image
          source={activeStatus}
          style={{ height: size, width: size }}
          resizeMode="contain"
        />
      );
    }
    return keyIndex < activeIndex ? inActiveStatus : notFocus;
  };

  parseTitleStyle = (keyIndex: number, activeIndex: number) => {
    return { color: keyIndex > activeIndex ? "#94A3B8" : "#375280" };
  };

  handlePayload = async (
    orderNumber: string,
    summary: {
      pickedUpAt: string;
      completeAt: string | null;
      otp: string | null;
      latitude: number;
      longitude: number;
      eta: string | null;
    }
  ) => {
    const token = await getStorageData("token", true);
    const activeIndex = summary.completeAt ? 1 : 0;
    const timeline: S["timeline"] = [
      {
        time:
          moment(summary.pickedUpAt).format("hh:mm A") +
          "\n" +
          moment(summary.pickedUpAt).format("DD MMM"),
        title: "Order Picked Up",
        description: "Delivery partner has picked up the Return",
        icon: this.parseIcon(0, activeIndex),
        lineColor: this.parseLineColor(0, activeIndex),
        titleStyle: this.parseTitleStyle(0, activeIndex),
      },
      {
        time: summary.completeAt
          ? moment(summary.completeAt).format("hh:mm A") +
            "\n" +
            moment(summary.completeAt).format("DD MMM")
          : " ".repeat(10),
        title: "Return Completed",
        description: "Delivery partner has returned the order",
        icon: this.parseIcon(1, activeIndex),
        lineColor: this.parseLineColor(1, activeIndex),
        titleStyle: this.parseTitleStyle(1, activeIndex),
      },
    ];
    this.setState(
      {
        orderNumber,
        timeline,
        token,
        otp: summary.otp || "****",
        destination: {
          latitude: summary.latitude,
          longitude: summary.longitude,
        },
        eta: this.getEta(summary.eta),
      },
      this.fetchOrderSummary
    );
  };

  handleSearchOrder = (response: SearchResponse) => {
    if (response.orders) {
      const order = response.orders.data[0];
      this.setState({
        start: {
          latitude:
            order.attributes.order_management_order.attributes
              .delivery_addresses.attributes.latitude,
          longitude:
            order.attributes.order_management_order.attributes
              .delivery_addresses.attributes.longitude,
        },
        driver: order.attributes.order_items[0].attributes.driver_name,
        loading: false,
      });
    }
  };

  getEta = (time: string | null) => {
    if (!time) {
      return "";
    }

    return "Delivering in : " + time;
  };

  fitElements = () => {
    setTimeout(() => {
      this.mapRef.current!.fitToSuppliedMarkers(["start", "end"], {
        animated: true,
        edgePadding: {
          left: 80,
          right: 80,
          top: 40,
          bottom: 40,
        },
      });
    }, 500);
  };

  get GMAP_API_KEY() {
    return configJSON.mapApiKey;
  }

  goBack = () => this.props.navigation.goBack();
  // Customizable Area End
}
