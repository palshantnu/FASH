import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config'
import { getStorageData } from "framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
    navigation: any;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}
interface S {
    // Customizable Area Start
    loading: boolean;
    token: string;
    productId: string;
    data: any;
    refreshing: boolean;
    acceptModalVisible: boolean;
    rejectModalVisible: boolean;
    selectedRequestId: string;
    localCurrency:string;
    // Customizable Area End
}
interface SS {
    id: any;
}

export default class BuyerProductSourcingDetailedController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    getProductDataCallId = "";
    acceptQuoteCallId = "";
    rejectQuoteCallId = "";
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
            loading: false,
            token: "",
            productId: "",
            data: null,
            refreshing: false,
            acceptModalVisible: false,
            rejectModalVisible: false,
            selectedRequestId: "",
            localCurrency:""
        };
        // Customizable Area End
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        runEngine.debugLog("Message Recived", message);
        if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            let token = message.getData(getName(MessageEnum.SessionResponseToken));
            runEngine.debugLog("TOKEN", token);
            if (token) {
                this.setState({ token: token });
            }
        }
        if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
            const Data = message.getData(
                getName(MessageEnum.BuyerProductSourcingView)
            );
            this.setState({ productId: Data.productId });
            this.getProductData(this.state.token);
        }
        if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
            this.handleApiResponse(message);
        }
        // Customizable Area End
    }

    async componentDidMount() {
        // Customizable Area Start
     super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", async() => {
        let currencyGet = await getStorageData('currencyIcon',true)
          this.setState({localCurrency:currencyGet})
       });
        // Customizable Area End
    }

    // Customizable Area Start

    handleApiResponse = (message: Message) => {
        const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
        );
        const responseJson = message.getData(
            getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        if (apiRequestCallId === this.getProductDataCallId) {
            this.setState({ loading: false });
            if (!responseJson.errors) {
                this.setState({ data: responseJson.data });
            }
        }
        if (apiRequestCallId === this.acceptQuoteCallId) {
            this.setState({ loading: false });
            if (!responseJson.errors) {
                this.setState({ loading: false });
                this.refreshData();
                showMessage({
                    message: i18n.t('productQuoteAcceptedSuccessfully'),
                    position: { top: 0 },
                });
            }
        }
        if (apiRequestCallId === this.rejectQuoteCallId) {
            this.setState({ loading: false });
            if (!responseJson.errors) {
                this.setState({ loading: false });
                this.refreshData();
                showMessage({
                    message: i18n.t('productQuoteRejectedSuccessfully'),
                    position: { top: 0 },
                });
            }
        }
    }

    getToken = () => {
        const message: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(message);
    };

    funToCallApi = (
        link: string,
        method: string,
        header: unknown,
        body: unknown,
        setMessageId: (messageId: string) => void
    ) => {
        const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
        message.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            link
        );
        message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
        message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
        message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
        setMessageId(message.messageId);
        runEngine.sendMessage(message.messageId, message);
    };

    refreshData = () => {
        this.setState({ refreshing: true });
        this.getProductData(this.state.token);
        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 2000);
    };

    getProductData = async (token: string) => {
        this.setState({ loading: true });
        const header = {
            token: token,
        };
        this.funToCallApi(
            configJSON.getProductListApiEndPoint + this.state.productId,
            configJSON.apiMethodTypeGet,
            header,
            null,
            (messageId) => {
                this.getProductDataCallId = messageId;
            }
        );
    }
    
    formatNumber = (num : number) => {
        const number = Number(num);
        return Number.isInteger(number) ? number.toFixed(0) : number.toFixed(2);
      };
      
    acceptOrRejectQuote = (action: string) => {
        this.setState({ loading: true });
        this.closeModals();
        const header = {
            token: this.state.token
        };
        const formData = new FormData();
        formData.append("product_sourcing_request_id", this.state.productId);
        formData.append("stylist_offer_request_id", this.state.selectedRequestId);
        formData.append("status", action == "accept" ? "accepted" : "rejected");
        if (action == "accept") {
            this.funToCallApi(
                configJSON.putAcceptRejectApiEndPoint,
                configJSON.updateAPiMethod,
                header,
                formData,
                (messageId) => {
                    this.acceptQuoteCallId = messageId;
                }
            )
        } else {
            this.funToCallApi(
                configJSON.putAcceptRejectApiEndPoint,
                configJSON.updateAPiMethod,
                header,
                formData,
                (messageId) => {
                    this.rejectQuoteCallId = messageId;
                }
            )
        }
        
    }

    closeModals = () => {
        this.setState({
            acceptModalVisible: false,
            rejectModalVisible: false,
            selectedRequestId: ""
        });
    };

    handelAcceptModal = (id: string) => {
        this.setState({ acceptModalVisible: true, selectedRequestId: id });
    };

    handelRejectModal = (id: string) => {
        this.setState({ rejectModalVisible: true, selectedRequestId: id });
    };

    navigateToChat = (userID: string) => {
        const message: Message = new Message(
            getName(MessageEnum.NavigationMessage)
        );
        message.addData(
            getName(MessageEnum.NavigationTargetMessage),
            'Chat'
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
    }

    navigateToOrderDetails = () => {
        const message = new Message(
            getName(MessageEnum.NavigationProductSourcingOrderDetailsMessage)
          );
          message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
          message.addData(getName(MessageEnum.ProductSourcingOrderDetailsData), {
            data : {
                id : this.state.productId,
            },
          });
      
          this.send(message);
    }

    // Customizable Area End
}