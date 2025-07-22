import React, { useEffect, useRef, useState } from "react";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { useRunEngine } from "../../utilities/src/hooks/useRunEngine";
import { useBlockHelpers } from "../../utilities/src/hooks/useBlockHelpers";

import StripePaymentsView from "./StripePaymentsView";

// Customizable Area Start
import type { IPaymentMethod, ChangeEvent } from "./types";
// Customizable Area End

export const configJSON = require("./config");

export interface ViewProps {
  // Customizable Area Start
  testID: string;
  isPaymentMethodsLoading: boolean;
  paymentMethods: IPaymentMethod[];
  infoText: string;
  modalProps: {
    open: boolean;
    visible: boolean;
    onClose: () => void;
    onRequestClose: () => void;
  };
  errorModalProps: {
    message: string | null;
    open: boolean;
    visible: boolean;
    onClose: () => void;
    onRequestClose: () => void;
  };
  orderIdInputProps: {
    disabled: boolean;
    editable: boolean;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeText: (payload: string) => void;
  };
  cardNumberInputProps: {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeText: (payload: string) => void;
  };
  expiryDateInputProps: {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeText: (payload: string) => void;
  };
  cvcInputProps: {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeText: (payload: string) => void;
  };
  btnCreatePaymentMethodProps: {
    disabled: boolean;
    onClick: () => void;
    onPress: () => void;
  };
  btnCancelProps: {
    disabled: boolean;
    onClick: () => void;
    onPress: () => void;
  };
  btnAddPaymentMethodProps: {
    disabled: boolean;
    onClick: () => void;
    onPress: () => void;
  };
  btnConfirmPaymentProps: {
    disabled: boolean;
    onClick: () => void;
    onPress: () => void;
  };
  btnOkProps: {
    onClick: () => void;
    onPress: () => void;
  };
  radioGroupProps: {
    value: string;
    selectedId: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (item: IPaymentMethod) => void;
  };
  formControlLabelProps: {
    disabled: boolean;
  };
  // Customizable Area End
}

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

const subscribedMessages = [
  // Customizable Area Start
  MessageEnum.RestAPIResponceMessage,
  MessageEnum.SessionResponseMessage,
  // Customizable Area End
];

const StripePayments: React.FC<Props> = (props) => {
  // Customizable Area Start
  const getPaymentMethodsCallId = useRef("");
  const createPaymentMethodCallId = useRef("");
  const createPaymentCallId = useRef("");
  const confirmPaymentCallId = useRef("");
  // Customizable Area End

  // Customizable Area Start
  const initialCardDetails = {
    number: "",
    expiry: {
      month: "",
      year: "",
    },
    cvc: "",
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isPaymentMethodsLoading, setIsPaymentMethodsLoading] =
    React.useState(false);
  const [isConfirmingPayment, setIsConfirmingPayment] = React.useState(false);
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);
  const [cardDetails, setCardDetails] = React.useState(initialCardDetails);
  const [orderId, setOrderId] = React.useState("");
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    React.useState("");
  const [token, setToken] = useState<string>("");

  const tokenRef = useRef<string>("");
  tokenRef.current = token;
  // Customizable Area End

  // Customizable Area Start
  const {
    sendBlockMessage,
    sendNetworkRequest,
    setReceiveCallback,
    subscribe,
    debugLog,
    unsubscribeFromMessage,
  } = useRunEngine();

  const { extractNetworkResponse } = useBlockHelpers();

  const getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    sendBlockMessage(message);
  };

  const getPaymentMethods = (tokenArg?: string) => {
    setIsPaymentMethodsLoading(true);
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: tokenArg || tokenRef.current,
    };

    sendNetworkRequest(
      getPaymentMethodsCallId,
      configJSON.getPaymentMethodsMethod,
      configJSON.paymentMethodEndpoint,
      headers
    );
  };

  const createPaymentMethod = () => {
    setIsPaymentMethodsLoading(true);
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };

    const httpBody = {
      number: cardDetails.number,
      exp_month: cardDetails.expiry.month,
      exp_year: cardDetails.expiry.year,
      cvc: cardDetails.cvc,
    };

    sendNetworkRequest(
      createPaymentMethodCallId,
      configJSON.createPaymentMethodMethod,
      configJSON.paymentMethodEndpoint,
      headers,
      httpBody
    );
  };

  const createPayment = () => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token,
    };

    const httpBody = {
      order_id: orderId,
      payment_method_id: selectedPaymentMethodId,
    };

    sendNetworkRequest(
      createPaymentCallId,
      configJSON.createPaymentMethod,
      configJSON.paymentEndpoint,
      headers,
      httpBody
    );
  };

  const confirmPayment = (paymentIntentId: string, paymentMethodId: string) => {
    const headers = {
      "Content-Type": configJSON.apiContentType,
      token: tokenRef.current,
    };

    const httpBody = {
      payment_intent_id: paymentIntentId,
      payment_method_id: paymentMethodId,
    };

    sendNetworkRequest(
      confirmPaymentCallId,
      configJSON.confirmPaymentMethod,
      configJSON.confirmPaymentEndpoint,
      headers,
      httpBody
    );
  };

  const openInfoPage = () => {
    const msg = new Message(getName(MessageEnum.NavigationMessage));

    msg.addData(getName(MessageEnum.NavigationTargetMessage), "InfoPage");

    msg.addData(getName(MessageEnum.NavigationPropsMessage), props);

    const raiseMessage = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(
      getName(MessageEnum.InfoPageTitleMessage),
      configJSON.stripePayment
    );
    raiseMessage.addData(
      getName(MessageEnum.InfoPageBodyMessage),
      configJSON.successMessage
    );

    raiseMessage.addData(
      getName(MessageEnum.InfoPageButtonTextMessage),
      configJSON.ok
    );

    const buttonNavigationMessage = new Message(
      getName(MessageEnum.NavigationHomeScreenMessage)
    );

    buttonNavigationMessage.addData(
      getName(MessageEnum.NavigationPropsMessage),
      props
    );

    raiseMessage.addData(
      getName(MessageEnum.InfoPageNavigationScreenMessage),
      buttonNavigationMessage
    );
    msg.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    msg.addData(
      getName(MessageEnum.NavigationScreenNameMessage),
      configJSON.stripePayments
    );

    sendBlockMessage(msg);
  };
  // Customizable Area End

  const receive = (from: string, message: Message) => {
    resetErrorMessage();
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let resToken = message.getData(getName(MessageEnum.SessionResponseToken));
      debugLog("TOKEN", resToken);
      setToken(resToken);
      if (resToken) {
        getPaymentMethods(resToken);
      }
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const { apiRequestCallId, responseJson } =
        extractNetworkResponse(message);
      debugLog("API Message Received", message);
      if (responseJson.data) {
        if (apiRequestCallId === getPaymentMethodsCallId.current) {
          setPaymentMethods(responseJson.data);
          setIsPaymentMethodsLoading(false);
          getPaymentMethodsCallId.current = "";
        } else if (apiRequestCallId === createPaymentMethodCallId.current) {
          const receivedPaymentMethodId = responseJson.data.id;
          setSelectedPaymentMethodId(receivedPaymentMethodId);
          getPaymentMethods();
          setCardDetails(initialCardDetails);
          setIsModalOpen(false);
          setIsPaymentMethodsLoading(false);
          createPaymentMethodCallId.current = "";
        } else if (apiRequestCallId === createPaymentCallId.current) {
          const receivedPaymentIntentId = responseJson.data.id;
          const receivedPaymentMethodId =
            responseJson.data.attributes.payment_method;
          confirmPayment(receivedPaymentIntentId, receivedPaymentMethodId);
          createPaymentCallId.current = "";
        } else if (apiRequestCallId === confirmPaymentCallId.current) {
          openInfoPage();
          setIsConfirmingPayment(false);
          confirmPaymentCallId.current = "";
        }
      } else if (responseJson.errors) {
        setErrorMessage(responseJson.errors[0].stripe);
        setIsPaymentMethodsLoading(false);
        setIsConfirmingPayment(false);
      }
    }
    // Customizable Area End
  };

  // Customizable Area Start
  useEffect(() => {
    setReceiveCallback(receive);

    subscribedMessages.forEach((message) => subscribe(message));

    if (!token) {
      getToken();
    }

    return () => {
      subscribedMessages.forEach((message) => unsubscribeFromMessage(message));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const resetErrorMessage = () => {
    setErrorMessage(null);
  };

  const handleOrderIdChange = (payload: string) => {
    setOrderId(payload);
  };

  const handleCardNumberChange = (payload: string) => {
    setCardDetails({ ...cardDetails, number: payload });
  };

  const handleExpiryChange = (payload: string) => {
    const { 0: month, 1: year } = payload.split("/");

    setCardDetails({
      ...cardDetails,
      expiry: { ...cardDetails.expiry, month, year },
    });
  };

  const handleCvcChange = (payload: string) => {
    setCardDetails({ ...cardDetails, cvc: payload });
  };

  const handleCreatePaymentMethod = () => {
    createPaymentMethod();
  };

  const handleConfirmPayment = () => {
    setIsConfirmingPayment(true);
    createPayment();
  };

  const infoText: string = token
    ? configJSON.noPaymentMethods
    : configJSON.loginToSeePaymentMethods;

  const modalProps: ViewProps["modalProps"] = {
    open: isModalOpen,
    visible: isModalOpen,
    onClose: () => {
      if (!isPaymentMethodsLoading) {
        hideModal();
      }
    },
    onRequestClose: () => {
      if (!isPaymentMethodsLoading) {
        hideModal();
      }
    },
  };

  const errorModalProps: ViewProps["errorModalProps"] = {
    message: errorMessage,
    open: !!errorMessage,
    visible: !!errorMessage,
    onClose: resetErrorMessage,
    onRequestClose: resetErrorMessage,
  };

  const orderIdInputProps: ViewProps["orderIdInputProps"] = {
    disabled: !token,
    editable: !!token,
    value: orderId,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      handleOrderIdChange(event.target.value),
    onChangeText: handleOrderIdChange,
  };

  const cardNumberInputProps: ViewProps["cardNumberInputProps"] = {
    value: cardDetails.number,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      handleCardNumberChange(event.target.rawValue),
    onChangeText: handleCardNumberChange,
  };

  const expiryDateInputProps: ViewProps["expiryDateInputProps"] = {
    value: `${cardDetails.expiry.month}${cardDetails.expiry.year}`,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      handleExpiryChange(event.target.value),
    onChangeText: handleExpiryChange,
  };

  const cvcInputProps: ViewProps["cvcInputProps"] = {
    value: cardDetails.cvc,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      handleCvcChange(event.target.value),
    onChangeText: handleCvcChange,
  };

  const btnCreatePaymentMethodProps: ViewProps["btnCreatePaymentMethodProps"] =
    {
      disabled: isPaymentMethodsLoading,
      onClick: handleCreatePaymentMethod,
      onPress: handleCreatePaymentMethod,
    };

  const btnCancelProps: ViewProps["btnCancelProps"] = {
    disabled: isPaymentMethodsLoading,
    onClick: hideModal,
    onPress: hideModal,
  };

  const btnAddPaymentMethodProps: ViewProps["btnAddPaymentMethodProps"] = {
    disabled: !token || !orderId || isConfirmingPayment,
    onClick: showModal,
    onPress: showModal,
  };

  const btnConfirmPaymentProps: ViewProps["btnConfirmPaymentProps"] = {
    disabled: !token || !orderId || isConfirmingPayment,
    onClick: handleConfirmPayment,
    onPress: handleConfirmPayment,
  };

  const btnOkProps: ViewProps["btnOkProps"] = {
    onClick: resetErrorMessage,
    onPress: resetErrorMessage,
  };

  const radioGroupProps: ViewProps["radioGroupProps"] = {
    value: selectedPaymentMethodId,
    selectedId: selectedPaymentMethodId,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedPaymentMethodId(event.target.value);
    },
    onSelect: (item: IPaymentMethod) => {
      setSelectedPaymentMethodId(item.id);
    },
  };

  const formControlLabelProps: ViewProps["formControlLabelProps"] = {
    disabled: !orderId,
  };

  const viewProps: ViewProps = {
    testID: "StripePaymentsView",
    paymentMethods,
    isPaymentMethodsLoading,
    infoText,
    modalProps,
    errorModalProps,
    orderIdInputProps,
    cardNumberInputProps,
    expiryDateInputProps,
    cvcInputProps,
    btnCreatePaymentMethodProps,
    btnCancelProps,
    btnAddPaymentMethodProps,
    btnConfirmPaymentProps,
    btnOkProps,
    formControlLabelProps,
    radioGroupProps,
  };
  // Customizable Area End

  return <StripePaymentsView {...viewProps} />;
};

export default StripePayments;
