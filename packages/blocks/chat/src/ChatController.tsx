import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
const config = require("../../../framework/src/config");
import { Root, Message as IChatMessage, OrderRequest } from "./types";
import { Alert, Dimensions, FlatList, Linking, ScrollView, EmitterSubscription } from "react-native";
import { getOS } from "../../../framework/src/Helpers";
import React, { MutableRefObject, RefObject } from "react";
import { showMessage } from "react-native-flash-message";
import Scale from "../../../components/src/Scale";
//@ts-expect-error
import { ActionCable, Cable, } from '@kesha-antonov/react-native-action-cable'
import { getStorageData } from "framework/src/Utilities";
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from "react-native-document-picker";
import i18n from "../../../components/src/i18n/i18n.config";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
export interface IChat extends IChatMessage { }

interface AttachmentsUploadProps {
  type: string|null;
  uri: string;
  name: string;
}
// Customizable Area End
export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  isSendingMessage: boolean;
  accountId: number;
  chatScreenMessage: string;
  chatMessages: IChat[];
  loader: boolean;
  moreModal: boolean
  blockModal: boolean
  orderId: number
  accountName: string
  accountPhoneNumber: string
  receiverName: string
  errorMessage: boolean
  currentUser: string
  wishlistId: number,
  userId: number,
  receiverId : number,
  isLoading: boolean
  paymentWebView: boolean
  webURL: string
  chargeID: string,
  paymentFlag: boolean,
  localCurrency:string;
  documentPickerModal: boolean;
  documentFile : string;
  docIdRes:AttachmentsUploadProps;
  loading : boolean;
  isBlock:boolean;
  isSendEnable:boolean
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class ChatController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getChatListApiCallId: string = "";
  createChatRoomApiCallId: string = "";
  sendChatMessageApiCallId: string = "";
  blockChatApiCallId: string = "";
  FlatListRef: MutableRefObject<FlatList | null>;
  imageHeight = (Dimensions.get("window").width * 0.8 - Scale(25) - 30) / 4
  acceptOrderRequestApiCallID: string = "";
  actionCable: any;
  makePaymentApiCallId: string = "";
  retriveChargeApiCallId: string = "";
  scrollRef: RefObject<ScrollView> = { current: null };
  focusListener = { remove: () => {} } as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionRequestMessage),
      getName(MessageEnum.SessionResponseToken),
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      getName(MessageEnum.RestAPIRequestBodyMessage),
      getName(MessageEnum.RestAPIRequestMethodMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      accountId: 0,
      isSendingMessage: false,
      chatScreenMessage: "",
      chatMessages: [],
      loader: true,
      moreModal: false,
      blockModal: false,
      orderId: 0,
      accountName: "",
      accountPhoneNumber: "",
      receiverName: "",
      errorMessage: false,
      currentUser: "",
      wishlistId: 0,
      userId: 0,
      receiverId : 0,
      isLoading: false,
      paymentWebView: false,
      webURL: "",
      chargeID: "",
      paymentFlag: false,
      localCurrency: "",
      documentPickerModal: false,
      documentFile : "",
      docIdRes:{ name: "", type: "", uri: "" },
      loading : false,
      isBlock:false,
      isSendEnable:false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.FlatListRef = React.createRef();
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        let currencyGet = await getStorageData('currencyIcon',true)
        this.setState({localCurrency:currencyGet})
        this.getToken();
        this.chatDetailsActioncable()
      }
    );
    if (!this.isPlatformWeb()) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
        // this.getChatList()
        this.chatDetailsActioncable()
      });
    }
  }

  async componentWillUnmount() {
    this.getChatList()
    this.chatDetailsActioncable()
    this.focusListener.remove();
  }

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  getChatList = async () => {
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getChatListApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_chat/chats/${this.state.accountId}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  createChatAPI = async () => {
    this.setState({loader: true})
    const header = {
      "Content-Type": configJSON.apiContentType,
      token: this.state.token,
    };

    const data = {
      "name": "order chat",
      "order_management_order_id": this.state.userId ? null : this.state.orderId,
      "user_id": this.state.userId ? this.state.userId : null
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.createChatRoomApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_chat/chats`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(data)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };
  // istanbul ignore next
  sendMessage = async (isWishlist = false) => {
    this.setState({isSendEnable:true})
    let userAccount: any = ""
    if(this.state.accountId) {
      userAccount = this.state.accountId
    } else if(this.state.userId) {
      userAccount = this.state.userId
    } else {
      userAccount = this.state.orderId
    }
    if(this.state.isBlock){
      showMessage({
        message: i18n.t("isBlockedChat"),
        position: { top: 0 },
      });
      this.setState({chatScreenMessage:""})
      return
    }
    
    const formData = new FormData();

    if (this.state.docIdRes.name !== "") {
      let documentLicense: string | Blob = {
        'name': this.state.docIdRes.name,
        'type':  this.state.docIdRes.type,
        'uri':  this.state.docIdRes.uri
        } as unknown as Blob;
      formData.append("message[attachments]",documentLicense);
      if (this.state.chatScreenMessage !== "") {
        formData.append("message[message]", this.state.chatScreenMessage);
      }
      this.hitSendMsgAPI(userAccount, formData);
      return;
    }
  
    if (isWishlist) {
      formData.append("message[wishlist_id]", this.state.wishlistId.toString())
      this.setState({
        moreModal : false
      })
      this.hitSendMsgAPI(userAccount, formData);
    } else {
      if (this.state.chatScreenMessage !== "") {
        formData.append("message[message]", this.state.chatScreenMessage);
        this.hitSendMsgAPI(userAccount, formData);
      }
    }
  };

  hitSendMsgAPI = async (userAccount : string, formData: FormData) => {
    const header = {
      "Content-Type": 'multipart/form-data',
      token: this.state.token,
      
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.sendChatMessageApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_chat/chats/${userAccount}/messages`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );
    this.setState({ isSendingMessage: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  async receive(from: string, message: Message) {
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const chatOrderID = message.getData(
        getName(MessageEnum.SessionResponseData)
      );
      if(chatOrderID?.userID || chatOrderID?.chatId) {
        const { order_management_order_id, chatId, userID } = chatOrderID
        if (order_management_order_id || userID) {
          this.setState({ orderId: order_management_order_id, userId: userID }, () => { this.createChatAPI() })
        } else {
          this.setState({ accountId: chatId }, () => { 
            this.getChatList() 
            this.chatDetailsActioncable() 
          })
        }
      } else{
        return;
      }
    }

    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      runEngine.debugLog("TOKEN", token);
      if (token) {
        this.setState({ token });
      }
    }

    switch (apiRequestCallId) {
      case this.getChatListApiCallId:
        this.getChatListApi(responseJson)
        break;

      case this.sendChatMessageApiCallId:
        this.sendChatMessageApi(responseJson)
        break;

      case this.blockChatApiCallId:
        this.blockChatApiCalls(responseJson)
        break;

      case this.createChatRoomApiCallId:
        this.createChatRoomApiCalls(responseJson)
        break;

      case this.acceptOrderRequestApiCallID:
        this.orderRequestAcceptApiCalls(responseJson)
        break;

      case this.makePaymentApiCallId:
        this.makePaymentApiCall(responseJson)
        break;
        
      default:
        break;
    }
  }

  renderInputMessage = (text: string) => {
    if (text.trim() === "" && text !== "") {
      return;
    }
    this.setState({ chatScreenMessage: text, isSendEnable:false });
  }

  settingData = (response: any) => {
    if (response.data) {
      this.setState({
        chatMessages: response.data.attributes.messages,
        loader: false,
        accountName: response.data.attributes.accounts_chats[0].attributes.account_name,
        accountPhoneNumber: response.data.attributes.accounts_chats[0].attributes.account_phone
      })
    } else {
      Alert.alert("No data found!")
    }
  }

  moreModalOpen = () => {
    this.setState({ moreModal: true })
  }

  reportPersonFn = () => {
    this.setState({ moreModal: false }, () => {
      const message: Message = new Message(
        getName(MessageEnum.NavigationMessage)
      );
      message.addData(
        getName(MessageEnum.NavigationTargetMessage),
        'ChatView'
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

      const raiseMessage: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );

      raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
        chatId: this.state.accountId
      });

      message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
      this.send(message);
    })
  }

  blockModalOpen = () => {
    this.setState({ blockModal: true, moreModal: false })
  }

  closeBlockModal = () => {
    this.setState({ blockModal: false })
  }

  blockApiCall = () => {
    const header = {
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.blockChatApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_chat/chats/${this.state.accountId}/block_chat`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  previousScreen = () => {
    this.props.navigation.goBack()
  }
  modalContainer = () => {
    this.setState({ moreModal: false })
  }

  makeCall = async () => {
    let phoneNumber = '';
    const operatingSystem = getOS()
    if (operatingSystem === 'android') {
      phoneNumber = `tel:${this.state.accountPhoneNumber}`;
    } else {
      phoneNumber = `telprompt:${this.state.accountPhoneNumber}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(() => {
        return Linking.openURL(phoneNumber);
      })
      .catch((err) => Alert.alert('An error occurred', err));
  };
// istanbul ignore next
  getChatListApi = (responseJson: any) => {
    const response: Root = responseJson;
    if(response?.message == 'This chat is blocked and cannot be accessed.'){
      this.setState({isBlock:true, loader: false})
      showMessage({
        message: i18n.t("isBlockedChat"),
        position: { top: 0 },
      });
          }
    if (response?.message) {
      this.setState({ loader: false, errorMessage: true, });
      return;
    }
  
    const { data, current_user_role } = response;
    const { attributes } = data;
    const { accounts_chats, messages, wishlist } = attributes;
  
    const firstAccount = accounts_chats?.[0]?.attributes;
    this.setState({ 
      accountName: firstAccount?.account_name,
      accountPhoneNumber: firstAccount?.account_phone,
    });
  
    let receiverName = "", userId = 0, receiverId = 0, accountPhone = "";
  
    accounts_chats?.forEach(({ attributes: { role, account_name, account_id ,account_phone} }) => {
      if (role === "receiver") {receiverName = account_name; accountPhone = account_phone};
      if (role === "sender") userId = account_id;
      if (role === "receiver") receiverId = account_id;
    });
  
    this.setState({ receiverName, userId, receiverId , accountPhoneNumber : accountPhone, isBlock:false, errorMessage: false,});
  
    if (messages?.length > 0) {
      this.setState({
        chatMessages: messages,
        loader: false,
        currentUser: current_user_role,
        wishlistId: wishlist?.id,
      });
    } else {
      this.setState({ errorMessage: true, loader: false, isBlock:false,  });
    }
  
    this.chatDetailsActioncable();
  };
  

  sendChatMessageApi = (responseJson: any) => { 
    const response: IChat = responseJson?.data
    this.setState({docIdRes:{ name: "", type: "", uri: "" },})
    this.updateResponse(response)
  }

  removeDuplicates = (array: IChat[], key: string) => {
    return array.filter((item : any, index, self) =>
      index === self.findIndex((t : any) => (
        t[key] === item[key]
      ))
    );
  };

  updateResponse = (response : any) => {
    if (response !== undefined && response !== null && response.id) {
      this.setState((prevState) => {
        const updatedChatMessages = [response, ...prevState.chatMessages];
        const uniqueChatMessages = this.removeDuplicates(updatedChatMessages, 'id');
        return {
          chatMessages: uniqueChatMessages,
          chatScreenMessage: "",
          errorMessage: false,
          documentFile: "", 
          docIdRes: { name: "", type: "", uri: "" },
          isSendingMessage: false,
        };
      });
    }
  }

  openAttachment = (link : string) => {
    Linking.canOpenURL(link)
      .then(() => {
        return Linking.openURL(link);
      })
      .catch((err) => Alert.alert('An error occurred', err));
  }

  blockChatApiCalls = (responseJson: any) => {
    if (responseJson?.message) {
      this.getChatList()
      this.setState({ blockModal: false, moreModal: false }, () => {
        Alert.alert(responseJson?.message)
      })
    } else {
      this.setState({ blockModal: false, moreModal: false }, () => {
        Alert.alert("Something went wrong!")
      })
    }
  }

  createChatRoomApiCalls = (responseJson: any) => {
    this.setState({ accountId: responseJson?.data?.attributes?.id }, () => {
      this.getChatList()
      this.chatDetailsActioncable()
    })
  }

  orderRequestAcceptApiCalls = (responseJson: any) => {
    this.setState({loading: false});
    if (responseJson.error) {
      Alert.alert("Error!", responseJson.error)
    } else {
      this.getChatList() 
      this.navigateToChatCart(responseJson.order.data.id)
      showMessage({
        message: "Order Accepted and added successfully",
        position: { top: 0 },
      });
    }
  }

  sendOrderRequest = () => {
    this.setState({ moreModal: false }, () => {
      const { accountId } = this.state

      const message: Message = new Message(
        getName(MessageEnum.NavigationMessage)
      );
      message.addData(
        getName(MessageEnum.NavigationTargetMessage),
        'SendNewOrder'
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

      const raiseMessage: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );

      raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
        accountId
      });
      message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
      this.send(message);

    })
  }

  acceptOrderRequest = (order_info : OrderRequest) => {   
    if (order_info.status === "in_cart") {
      this.navigateToChatCart(order_info.order_request_id)
    } 
    else if (order_info.status === "pending") {
      this.hitAcceptOrderRequestApi(order_info);
    }
  }

  hitAcceptOrderRequestApi = (order_info : OrderRequest) => {
    const header = {
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.acceptOrderRequestApiCallID = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `bx_block_chat/order_request/accept_the_order_request?id=${order_info.order_request_id}`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putApiMethod);
    runEngine.sendMessage(requestMessage.id, requestMessage);
    this.setState({loading: true});
    this.send(requestMessage);
  }

  navigateToChatCart = (order_info : any) => {
    const message = new Message(
      getName(MessageEnum.NavigationChatCartMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.NavigationChatCartData), {
      order_info
    });

    this.send(message);  
  }

  paymentRequestNavigation = () => {
    this.setState({ moreModal: false }, () => {
      const message: Message = new Message(
        getName(MessageEnum.NavigationMessage)
      );
      message.addData(
        getName(MessageEnum.NavigationTargetMessage),
        'PaymentRequest'
      );
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

      const raiseMessage: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );

      raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
        userId: this.state.receiverId,
        chatId: this.state.accountId
      });

      message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
      this.send(message);
    })
  }

  renderImage(data : any){
    if (data.includes("jpeg") || data.includes("png") || data.includes("jpg")|| data.includes("gif")) {
      return true;
    }else return false;
  } 

  chatDetailsActioncable = async () => {
    const configFrameWork = require("../../../framework/src/config.js");
    const hostUrl = configFrameWork.baseURL.substring(8);
    let token = this.state.token;
    this.actionCable = ActionCable.createConsumer(`wss://${hostUrl}/cable?token=${token}`)
    const cable = new Cable({
      channel: `ChatChannel`,
    })
    
    const channel = cable.setChannel(
      `ChatChannel`,
      this.actionCable.subscriptions.create({
          channel: "ChatChannel",
          id: this.state.accountId
      })
    );
    channel
      .on("received", (event: any) => {
        this._onRecieved(event)
      }
      )
      .on("disconnected", () => {
        this.actionCable.disconnect();
      })
  }
  _onRecieved = (event: any) => {
    const response: any = event?.data
    this.updateResponse(response)
  }

  makePaymentApi = (paymentId: any) => {
    this.setState({isLoading: true})
    const header = {
      "Content-Type": 'application/json',
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    const data = {
      payment_request_id: paymentId,
      redirect_url: config.baseURL + "/admin",
    }

    const httpBody = {
      data: data
    }

    this.makePaymentApiCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/bx_block_tappaymentsintegration/tappayment/stylist_payment_request_charge`
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  makePaymentApiCall = (responseJson: any) => {
    if(responseJson?.error) {
      Alert.alert(responseJson?.error[0]?.message)
    } else {
      this.setState({ isLoading: false})
      const charge = responseJson;
        if (charge.transaction.url) {
          const message = new Message(getName(MessageEnum.NavigationTapPaymentsViewMessage));
          message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
          message.addData(getName(MessageEnum.NavigationTapPaymentsViewMessageData), {
                WebUrl: charge.transaction.url,
                token: this.state.token,
                chargeId: charge.id,
          });
          this.send(message);
        } else{
          Alert.alert("Something went wrong!" + JSON.stringify(responseJson))
        }
    }
  }

  navigateTowishlist = (wishListId:number|string) => {
    const message = new Message(
      getName(MessageEnum.NavigationWishlist2Message)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    let wishlistName=this.state.receiverName[0].toUpperCase() +this.state.receiverName.slice(1)+"s"+" Wishlist"
    message.addData(getName(MessageEnum.wishlistIdMessage), {data:wishListId,fromWishlist:true,clientWshlistName:wishlistName});
    this.send(message);
   
  }; 
  
  navigateToWishlist = async () => {
    let wishlist_id = await getStorageData("wishlist_id", true)
    if(this.state.currentUser === "stylist"){
      this.navigateTowishlist(wishlist_id)
      return;
    }
    const message: Message = new Message(
      getName(MessageEnum.NavigationMessage)
    );
    message.addData(
      getName(MessageEnum.NavigationTargetMessage),
      'ExploreWishlist'
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
      wishlist_id
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message);
  }

  openDocumentPicker = () => {
    this.setState({ documentPickerModal: true })
  }

  launchCameraDoc = async (crop: any) => {
    return new Promise((resolve, reject) => {
      ImagePicker.openCamera({
        maxWidth: 300,
        maxHeight: 400,
        includeBase64: true,
        includeExif: true,
        compressImageQuality: 0.4,
      }).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      });
    })
  }

  CameraDocOpen = async () => {
    this.launchCameraDoc(true).then((obj: any) => {
      let finaldata = 'data:' + obj.mime + ';base64,' + obj.data
      let objData: AttachmentsUploadProps = {
        name: obj.filename ? obj.filename : 'image.jpg',
        type: obj.mime,
        uri: obj.path,
      };
      this.setState({ documentFile: finaldata, documentPickerModal: false, docIdRes: objData, isSendEnable:false })
    }).catch((error) => {
      this.setState({ documentPickerModal: false })
    })
  }

  removeFile = () => {
    this.setState({
      documentFile: "", documentPickerModal: false, docIdRes: { name: "", type: "", uri: "" }
    })
  }

  openImageFile = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
      });
      this.setState({ documentFile: response.uri, documentPickerModal: false, docIdRes: response, isSendEnable:false })
    } catch (error) {
      this.setState({documentPickerModal:false})
      if (DocumentPicker.isCancel(error)) {
        runEngine.debugLog("Message Recived", "User Canceled Picker");
      } else {
        runEngine.debugLog("Message Recived", error);
      }
    }
  }
  // Customizable Area End
}
