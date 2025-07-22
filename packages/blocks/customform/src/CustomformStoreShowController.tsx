import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { addNewStoreIcon,addNewStoreIconArabic } from "./assets";
import { ResponseStore } from "./responseStore";
import i18n from '../../../components/src/i18n/i18n.config';
import {
  removeStorageData,
  getStorageData,
} from "../../../framework/src/Utilities";
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
  token: string;
  storeSearchTxt: string;
  storeArr: ResponseStore[];
  storeArrUpdate: ResponseStore[];
  loading: boolean;
  searchStoreEmptyMessage: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class CustomformStoreShowController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getStoreApiCallId = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      token: "",
      storeSearchTxt: "",
      storeArrUpdate: [],
      storeArr: [
        {
          id: "0",
          type: "",
          attributes: {
            store_name: "",
            description: "",
            area: "",
            block: "",
            mall_name: "",
            floor: "",
            unit_number: 0,
            city: "Wrewee",
            zipcode: "274342",
            driver_instruction: "Wqweff",
            average_shipping_time: "15 mins",
            is_open: false,
            payment_mode: ["CREDIT CARD"],
            store_operating_hours: {
              monday: {
                open: "12:33",
                close: "12:35",
                is_open: false,
              },
              tuesday: {
                open: "12:47",
                close: "12:57",
                is_open: true,
              },
              wednesday: {
                open: "13:37",
                close: "13:47",
                is_open: true,
              },
              thursday: {
                open: "14:47",
                close: "14:47",
                is_open: true,
              },
              friday: {
                open: "17:48",
                close: "17:48",
                is_open: true,
              },
              saturday: {
                open: "18:48",
                close: "18:48",
                is_open: true,
              },
              sunday: {
                open: "23:58",
                close: "23:59",
                is_open: true,
              },
            },
            status: "Approved",
            latitude: 52.343078,
            longitude: -3.829673,
            image: i18n.language === 'ar' ? addNewStoreIcon:addNewStoreIconArabic,
            email: "seller1@mailinator.com",
            contact_number: {
              country_code: "+92",
              phone_number: "8862687619",
            },
            expected_delivery_time: "2024-03-12T04:47:40.688+00:00",
          },
        },
      ],
      loading: false,
      searchStoreEmptyMessage: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
      this.getAllStore(token);
    } else if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (responseJson) {
        if (apiRequestCallId === this.getStoreApiCallId) {
          this.setState({ loading: false });
          if (responseJson.errors === undefined) {
            this.myStoreGetApiResponseSuccess(responseJson.data);
          }
        }
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getTokenStore();
    this.props.navigation.addListener("willFocus", () => {
      this.getTokenStore();
    });

    this.props.navigation.addListener("willBlur", () => {
      this.setState({ storeSearchTxt: "" });
    });
    // Customizable Area End
  }

  myStoreGetApiResponseSuccess = (responseJson: ResponseStore[]) => {
    if (responseJson) {
      let storeArr = [
        {
          id: "0",
          type: "",
          attributes: {
            store_name: "",
            description: "ewt",
            area: "wet",
            block: "wet",
            mall_name: "ewt",
            floor: "wet",
            unit_number: 0,
            city: "Wree",
            zipcode: "234342",
            driver_instruction: "Weff",
            average_shipping_time: "10 mins",
            is_open: true,
            payment_mode: ["UPI,COD"],
            store_operating_hours: {
              monday: {
                open: "15:47",
                close: "15:47",
                is_open: true,
              },
              wednesday: {
                open: "15:47",
                close: "15:47",
                is_open: true,
              },
              tuesday: {
                open: "15:47",
                close: "15:47",
                is_open: true,
              },
              thursday: {
                open: "15:47",
                close: "15:47",
                is_open: true,
              },
              saturday: {
                open: "15:48",
                close: "15:48",
                is_open: true,
              },
              sunday: {
                open: "15:48",
                close: "15:48",
                is_open: true,
              },
              friday: {
                open: "15:48",
                close: "16:48",
                is_open: true,
              },
            },
            status: "Pending",
            latitude: 53.342078,
            longitude: -2.729673,
            image: addNewStoreIcon,
            email: "seller@mailinator.com",
            contact_number: {
              country_code: "+91",
              phone_number: "8962687619",
            },
            expected_delivery_time: "2024-02-12T04:45:40.668+00:00",
          },
        },
      ];
      this.setState({
        storeArr: [...storeArr, ...responseJson],
        storeArrUpdate: [...storeArr, ...responseJson],
      });
    }
  };

  getTokenStore = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  manageBackStore = async () => {
    const status = await getStorageData("SELLER_STATUS");
    if (status === "Document_uploaded") {
      this.props.navigation.pop(3);
    } else {
      this.props.navigation.goBack();
    }
  };

  getAllStore = (token: string) => {
    this.setState({ loading: true });
    const header = {
      "Content-Type": configJSON.sellerDetailsApiContentType,
      token: token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getStoreApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAllStoreApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  searchStore = () => {
    //passing the inserted text in textinput
    let text = this.state.storeSearchTxt.trimEnd();
    let data1 = this.state.storeArrUpdate;
    if (data1 != undefined) {
      const newData = data1.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.attributes.store_name
          ? item.attributes.store_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      if (newData.length > 0) {
        this.setState({
          storeArr: newData,
        });
      } else {
        this.setState({
          storeArr: [],
        });
      }
    }
  };

  addNewStore = () => {
    removeStorageData("createStoreArr");
    removeStorageData("storeAddressMap");
    const msg: Message = new Message(
      getName(MessageEnum.NavigationCustomformCreateStoreUploadMessage)
    );

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    this.send(msg);
  };

  uploadDocumentRedirection = async () => {
    const status = await getStorageData("SELLER_STATUS");
    const msg: Message = new Message(
      getName(
        status === "Document_uploaded"
          ? MessageEnum.NavigationCustomformConfirmationMessage
          : MessageEnum.NavigationCustomformCreateStoreUploadDocumentMessage
      )
    );

    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    this.send(msg);
  };
  // Customizable Area End
}
