import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert } from "react-native";
import { getStorageData } from "../../../framework/src/Utilities";
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
    accountId: any;
    chatID: any
    reason: string
    amount: string;
    localCurrency: string;
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class PaymentRequestController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    getPaymentRequestApiCallId: string = "";
    sendMessageRequestApiCallId: string = "";
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);
        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            // Customizable Area Start
            getName(MessageEnum.SessionResponseMessage),
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.NavigationPayLoadMessage),
            getName(MessageEnum.SessionRequestMessage),
            getName(MessageEnum.SessionResponseToken),
            // Customizable Area End
        ];

        this.state = {
            // Customizable Area Start
            token: "",
            accountId: 0,
            chatID: 0,
            amount: "",
            reason: "",
            localCurrency: "",
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
            const chatOrderID = message.getData(
                getName(MessageEnum.SessionResponseData)
            );
            const { userId, chatId } = chatOrderID
            this.setState({ accountId: userId, chatID: chatId })
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

        if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
            this.sendMessageRequestApiCallId &&
            apiRequestCallId === this.sendMessageRequestApiCallId
        ) {
            if (responseJson.data) {
                this.props.navigation.navigate("Chat")
            } else {
                Alert.alert("Something went wrong!", "Please try after sometime")
            }
        }
        // Customizable Area End
    }

    // Customizable Area Start
    async componentDidMount() {
        super.componentDidMount();
        this.getToken();
        let currencyGet = await getStorageData('currencyIcon', true)
        this.setState({ localCurrency: currencyGet }) 
        if (!this.isPlatformWeb()) {
            this.props.navigation.addListener("willFocus", () => {
                this.getToken();
            });
        }
    }

    getToken = () => {
        const message: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(message);
    };

    leftBtnClick = () => {
        this.props.navigation.goBack()
    }

    onReasonText = (value: string) => {
        this.setState({ reason: value })
    }

    onAmountText = (value: string) => {
        this.setState({ amount: value })
    }

    sendMessageRequest = async () => {
        const { accountId, chatID, reason, amount } = this.state
        if (!reason && !amount) {
            Alert.alert("Something went wrong!", "Please enter a reason and amount field.");
            return true;
        } else{

        const header = {
            "Content-Type": 'multipart/form-data',
            token: this.state.token
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        const formData = new FormData();
        formData.append("account_id", accountId)
        formData.append("reason", reason)
        formData.append("amount", amount)
        formData.append("chat_id", chatID)

        this.sendMessageRequestApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `/bx_block_custom_form/stylist_payment_requests`
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

        runEngine.sendMessage(requestMessage.id, requestMessage);
    }
    };

    manageCurrencyValue = () => {
        const { localCurrency, amount } = this.state;
        
        if (!amount) return this.state.localCurrency;
        return localCurrency === "$"
            ? `$${amount}`
            : `KWD ${amount}`;
    };

    updateAmount = (price: string) => {
        const currencySymbol = this.state.localCurrency === "$" ? "$" : "KWD ";
        const quote_Price = price.replace(currencySymbol, "");  
        this.setState({ amount: quote_Price });
        };
    // Customizable Area End
}
