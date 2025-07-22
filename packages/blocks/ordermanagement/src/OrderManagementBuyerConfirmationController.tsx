import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";
import { RefObject } from "react";
import MapView from "react-native-maps";
// Customizable Area Start
interface RegionProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const orderData =
  {
  id: 566,
  type: "order_seller",
  attributes: {
    otp: "" ,
    driver_latitude: 10,
    driver_name: "" ,
    order_number: 0,
    account: "",
    order_item_count: 0,
    sub_total: 0,
    total: 0,
    status: "",
    placed_at: "",
    confirmed_at: "",
    in_transit_at: "",
    delivered_at: null,
    process_at: "",
    shipped_at: "",
    return_at: null,
    return_cancel_at: "",
    return_pick_at: "",
    cancelled_at: "",
    cancellation_reason: "",
    rejected_at: "",
    refunded_at: "",
    returned_at: "",
    deliver_by: "",
    order_status_id: 0,
    created_at: "",
    updated_at: "",
    order_deliver_date: "",
    order_deliver_time: "",
    delivery_addresses: {
        id: "",
        type: "",
        attributes: {
            name: "",
            country_code: "",
            phone_number: "",
            contact_number: "",
            street: "",
            zip_code: "",
            area: "",
            block: "",
            city: "",
            house_or_building_number: "",
            address_name: "",
            is_default: "",
            latitude: 34,
            longitude: 34
          }
      },
    order_return_date: "",
    order_return_time: "",
    order_items: [
          {
            id: "",
            type: "",
            attributes: {
                status: "",
                placed_at: "",
                confirmed_at: "",
                in_transit_at: "",
                delivered_at: "",
                cancelled_at: "",
                rejected_at: "",
                process_at: "",
                shipped_at: "",
                return_at: "",
                return_cancel_at: "",
                return_pick_at: "",
                quantity: 34,
                unit_price: 34,
                total_price: 34,
                reason_of_rejection: "",
                catalogue_name:"",
                brand_name: "",
                catalogue_variant_color: "",
                catalogue_variant_sku: "",
                store_name: "",
                catalogue_variant_size: "",
                catalogue_variant_front_image: "",
                catalogue_variant_back_image:"",
                catalogue_variant_side_image: "",
                driver_name: "",
                driver_latitude: 34,
                driver_longitude: 36,
                driver_phone_number: 36,
                otp: 36
              }
          }
      ],
    payment_detail: "",
    buyer_latitude: 36,
    buyer_longitude: 36
  }
}

// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start

  
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  latitude: number;
  longitude: number;
  region: RegionProps;
  token: string;
  orderStatusList: any,
  orderId: number;
  trackId: number;
  matchedOrderItem: any ;
  orderManagementOrderId: number
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class OrderManagementBuyerConfirmationController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  marker = "";
  getBuyerOrderDetailApiCallId : string = "";
  mapRef: RefObject<MapView> = { current: null };
  // Customizable Area End
  
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      latitude: 29.378586,
      longitude: 47.990341,
      region: {
        latitude: 29.3117,
        longitude: 47.4818,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      token: "",
      orderStatusList: {},
      orderId: 56,
      trackId: 2,
      matchedOrderItem: orderData,
      orderManagementOrderId: 0
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token })
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId === this.getBuyerOrderDetailApiCallId) {
        this.setState({
          orderStatusList: responseJson.data,
          orderManagementOrderId: responseJson?.data?.attributes?.payment_detail?.order_management_order_id
        });
        
        const matchedOrderItem = this.state.orderStatusList.attributes.order_items.find(
          (item: { id: number }) => item.id
        );
        this.setState({matchedOrderItem: matchedOrderItem})
          let region = {
              latitude: matchedOrderItem.attributes.driver_latitude,
              longitude: matchedOrderItem.attributes.driver_longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
          };
  
          this.setState({
              region: region
          });
      }}
      if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
        const orderData = message.getData(getName(MessageEnum.LoginOptionsNavigationDataMessage));
        const { orderId, trackId } = orderData;
        this.setState({ orderId: orderId, trackId: trackId }, () => {
          this.getOrderDetail(orderId);
      });
        
      }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getTokenForOrderStatus();

    this.props.navigation.addListener("willFocus", () => {
      this.getTokenForOrderStatus();
    });
    // Customizable Area End
  }

  backToHomeRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationLandingPageMessage)
      );

    msgNavigation.addData(
    getName(MessageEnum.NavigationPropsMessage),
    this.props
    );

    this.send(msgNavigation);
  }

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

  getTokenForOrderStatus = () => {
    const msgTokenOrder: Message = new Message(
        getName(MessageEnum.SessionRequestMessage)
    )
    this.send(msgTokenOrder)
    }

  getOrderDetail = async (orderId: number) => {
    let token = await getStorageData('token', true)
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: token,
    };
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getBuyerOrderDetailApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getOrderDetailBuyerStoreApiEndPoint + orderId
    );
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header)
    );
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.listOfOrdersMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  chatNavigation = (userID: string) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "Chat"
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      userID
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message);
    return true;
  }
  formatTravelTime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
  
    const timeParts: string[] = [];
    if (days > 0) timeParts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) timeParts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) timeParts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (!days && !hours) timeParts.push(`${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`);
  
    return timeParts.join(' ').trim();
  };
  // Customizable Area End
}
