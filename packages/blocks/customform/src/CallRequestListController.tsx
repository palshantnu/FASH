import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "../../../framework/src/Utilities";
import {Linking } from "react-native";
const navigation = require("react-navigation");

// Customizable Area Start
interface StylistCallRequestAttributes {
    stylist_id: number;
    reason: string;
    hour: number;
    minute: number;
    status: string;
    stylist_name: string;
    buyer_phone_number: string;
    buyer_name: string;
}

// Define the interface for the main data object
export interface StylistCallRequest {
    id: string;
    type: string;
    attributes: StylistCallRequestAttributes;
}

// Define the interface for the overall data structure
interface Data {
    data: StylistCallRequest[];
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
    navigation: typeof navigation;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    callRequestList: StylistCallRequest[];
    loading: boolean;
    token: string
    // Customizable Area End
}

interface SS {
    id: number;
}

export default class CallRequestListController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    callBackListApiCallId : string = "";
    callBackStatusApiCallId: string = "";
    // Customizable Area End
    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        // Customizable Area Start
        this.subScribedMessages = [
            getName(MessageEnum.SessionResponseMessage),
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.NavigationPayLoadMessage),
        ];
        this.state = {
            // Customizable Area Start
            callRequestList: [],
            loading: true,
            token: '',
            // Customizable Area End
        };
        // Customizable Area End
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            let token = message.getData(getName(MessageEnum.SessionResponseToken));
            runEngine.debugLog("TOKEN", token);
            this.setState({ token: token });
        }

        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );

            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );

            if (apiRequestCallId != null) {
                if (apiRequestCallId === this.callBackListApiCallId) {
                    this.setState({ loading: false })
                    this.callBackListSuccess(responseJson)
                }
                if (apiRequestCallId === this.callBackStatusApiCallId) {
                    this.setState({ loading: false })
                    this.callBackStatusSuccess()
                }
            }
        }
        // Customizable Area End
    }

    async componentDidMount() {
        // Customizable Area Start
        super.componentDidMount();
        this.getToken();
        this.callBacklist()
        this.props.navigation.addListener("willFocus", () => {
            this.getToken();
            this.callBacklist()
        });
        // Customizable Area End
    }


    // Customizable Area Start
    callBackListSuccess = (responseJson: Data) => {
        if (responseJson.data) {
            this.setState({ callRequestList: responseJson.data,loading: false });
        }
    }

    callBackStatusSuccess = () => {
       this.callBacklist()
    }

    getToken = () => {
        const msgToken: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msgToken);
    };

    callBacklist = async () => {
        let token = await getStorageData('token', true)
        this.setState({ loading: true, token: token })
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.callBackListApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getCallBackListApiEndPoint
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
    }
    
    updateCallStatus = async (status:string,id:string) => {
        let token = await getStorageData('token', true)
        this.setState({ loading: true, token: token })
        let formdata = new FormData()
        formdata.append("status",status);
        const header = {
            "Content-Type": configJSON.validationFormContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.callBackStatusApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `bx_block_custom_form/stylist_call_requests/${id}/update_status`
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            formdata
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.sellerDetailsAPIMethodPUT
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    onMakeCall = (status: string, id: string, number : string) => {
        const phoneUrl = 'tel:' + number;
    
        Linking.canOpenURL(phoneUrl)
            .then((supported) => {
                if (supported) {
                    this.updateCallStatus(status, id);
                    return Linking.openURL(phoneUrl);
                }
            });
    };

    goBackScreen = () =>{
        const message = new Message(getName(MessageEnum.NavigationMessage));
        message.addData(getName(MessageEnum.NavigationTargetMessage), 'ClientsAndChatTab');
        message.addData(getName(MessageEnum.NavigationPropsMessage),this.props)
        this.send(message)
    }
    // Customizable Area End
}

