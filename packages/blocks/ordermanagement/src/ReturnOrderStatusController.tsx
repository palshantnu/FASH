import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import { BlockComponent } from "framework/src/BlockComponent";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";
import { runEngine } from "framework/src/RunEngine";

// Customizable Area Start
import React from "react";
import { Image, StyleProp, TextStyle } from "react-native";
import moment from "moment";
import { deviceWidth, getStorageData } from "framework/src/Utilities";
import { activeStatus, inActiveStatus, notFocus } from "./assets";

import i18n from '../../../components/src/i18n/i18n.config' 
export const configJSON = require("./config");

export interface TimingArrProps {
  time: string;
  title: string;
  description: string;
  icon: JSX.Element;
  lineColor: string;
  titleStyle: StyleProp<TextStyle>;
}

export interface OrderSummaryResponse {
  return_placed_at: string | null;
  return_cancel_at: string | null;
  return_confirmed_at: string | null;
  return_reject_at: string | null;
  return_pick_at: string | null;
  returned_assign_at: string | null;
  return_at: string | null;
  order_number: string | null;
  placed_at: string | null;
  reason: string | null;
  refunded_cancel_at: string | null;
  reason_refunded_cancel: string | null;
  refunded_at: string | null;
  otp: string | null;
  longitude: number;
  latitude: number;
  estimated_delivery_time: string | null;
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
  orderId: string;
  timeline: TimingArrProps[];
  orderNumber: string;
  placetAt: string;
  showFooter: boolean;
  orderSummary: OrderSummaryResponse;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class RejectOrderStatusController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  orderStatusApicallId = "";
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
      orderId: "",
      timeline: [],
      orderNumber: "",
      placetAt: "",
      showFooter: false,
      orderSummary: {} as OrderSummaryResponse,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    moment.locale(i18n.language) 
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const orderId = message.getData(
        getName(MessageEnum.NavigationOrderStatusId)
      );
      if (orderId) {
        const token = await getStorageData("token", true);
        return this.setState({ orderId, token }, this.fetchOrderSummary);
      }
    }
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiCallId === this.orderStatusApicallId) {
        this.handleOrderSummary(responseJson);
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  fetchOrderSummary = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));

    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.getOrderSummaryEndpoint + this.state.orderId,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
      },
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.getMethod,
    });

    this.orderStatusApicallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  handleOrderSummary = (response: OrderSummaryResponse) => {
    const activeIndex = this.getActiveIndex(response);
    const status: Partial<Record<keyof OrderSummaryResponse, TimingArrProps>> =
      {
        return_placed_at: {
          time: this.getLeftDate(response.return_placed_at),
          description: `${i18n.t('weHaveReceivedYour')} ${moment(
            response.return_placed_at
          ).format("DD MMMM")}`,
          title: i18n.t('returnPlaced'),
          icon: this.parseIcon(0, activeIndex),
          lineColor: this.parseLineColor(0, activeIndex),
          titleStyle: this.parseTitleStyle(0, activeIndex),
        },
        return_confirmed_at: {
          time: this.getLeftDate(response.return_confirmed_at),
          description: `${i18n.t('weHaveBeenConfirmed')} ${this.getLeftDate(
            response.return_confirmed_at
          )}`,
          title: i18n.t('returnConfirmed'),
          icon: this.parseIcon(1, activeIndex),
          lineColor: this.parseLineColor(1, activeIndex),
          titleStyle: this.parseTitleStyle(1, activeIndex),
        },
        returned_assign_at: {
          time: this.getLeftDate(response.returned_assign_at),
          description:
            `${i18n.t('deliveryPartnerOnTheWay')}` +
            this.getDescriptionDate(response.returned_assign_at),
          title: i18n.t('outForPickup'),
          icon: this.parseIcon(2, activeIndex),
          lineColor: this.parseLineColor(2, activeIndex),
          titleStyle: this.parseTitleStyle(2, activeIndex),
        },
        return_pick_at: {
          time: this.getLeftDate(response.return_pick_at),
          description:
            `${i18n.t('deliveryPartnerHasPicked')}` +
            this.getDescriptionDate(response.return_pick_at),
          title: i18n.t('orderPickedUp'),
          icon: this.parseIcon(3, activeIndex),
          lineColor: this.parseLineColor(3, activeIndex),
          titleStyle: this.parseTitleStyle(3, activeIndex),
        },
        return_at: {
          time: this.getLeftDate(response.return_at),
          description:
            `${i18n.t('deliveryPartnerHasReturned')}` +
            this.getDescriptionDate(response.return_at),
          title: i18n.t('returnComplete'),
          icon: this.parseIcon(4, activeIndex),
          lineColor: this.parseLineColor(4, activeIndex),
          titleStyle: this.parseTitleStyle(4, activeIndex),
        },
       
      };
      moment.locale('en') 
     let placedDate=moment(response.placed_at).format("DD MMM, YYYY") 
    this.setState({
      orderSummary: response,
      timeline: Object.entries(status).map(
        ([_key, value]) => value as unknown as TimingArrProps
      ),
      showFooter: Boolean(response.return_at || response.return_pick_at),
      orderNumber: response.order_number!,
      placetAt: placedDate,
      loading: false,
    });
  };

  getLeftDate = (date: string | null) => {
    if (date) {
      return moment(date).format("DD MMM");
    }
    return "";
  };

  getDescriptionDate = (date: string | null) => {
    if (date) {
      return moment(date).format("DD MMM");
    } else {
      return " ";
    }
  };

  getActiveIndex = (response: OrderSummaryResponse) => {
    const arrayKeys: Array<keyof OrderSummaryResponse> = [
      "return_placed_at",
      "return_confirmed_at",
      "returned_assign_at",
      "return_pick_at",
      "return_at",
      "refunded_at",
      "refunded_at",
    ];
    let active = -1;
    let iter = 0;
    for (const arrKey of arrayKeys) {
      if (!response[arrKey]) {
        active = iter - 1;
        break;
      }
      iter++;
    }
    return active;
  };

  parseIcon = (keyIndex: number, activeIndex: number) => {
    if (keyIndex === activeIndex) {
      const size = deviceWidth * 0.06;
      return (
        <Image source={activeStatus} style={{ height: size, width: size }} />
      );
    }
    return keyIndex < activeIndex ? inActiveStatus : notFocus;
  };

  parseLineColor = (keyIndex: number, activeIndex: number) => {
    return keyIndex < activeIndex ? "#CCBEB1" : "#CBD5E1";
  };

  parseTitleStyle = (keyIndex: number, activeIndex: number) => {
    return { color: keyIndex > activeIndex ? "#94A3B8" : "#375280" };
  };

  goBack = () => this.props.navigation.goBack();

  goToTrackOrder = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));

    const payload = new Message(getName(MessageEnum.NavigationPayLoadMessage));
    payload.initializeFromObject({
      [getName(MessageEnum.NavigationOrderStatusId2)]: this.state.orderNumber,
      [getName(MessageEnum.NavigationOrderSummaryData)]: {
        pickedUpAt: this.state.orderSummary.return_pick_at,
        completeAt: this.state.orderSummary.return_at,
        otp: this.state.orderSummary.otp,
        latitude: this.state.orderSummary.latitude,
        longitude: this.state.orderSummary.longitude,
        eta: this.state.orderSummary.estimated_delivery_time,
      },
    });

    message.initializeFromObject({
      [getName(MessageEnum.NavigationTargetMessage)]: "TrackReturn",
      [getName(MessageEnum.NavigationPropsMessage)]: this.props,
      [getName(MessageEnum.NavigationRaiseMessage)]: payload,
    });

    this.send(message);
  };
  // Customizable Area End
}
