import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
    navigation: any;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;
    // Customizable Area Start
    token: string;
    chatListData: any
    loader: boolean
    errorMessage: boolean
    searchTxt: string
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class ChatListController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    getChatListApiCallId: string = "";
    createChatRoomApiCallId: string = "";
    sendChatMessageApiCallId: string = "";
    blockChatApiCallId: string = "";
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
            txtInputValue: "",
            txtSavedValue: "A",
            enableField: false,
            token: "",
            chatListData: [],
            loader: true,
            errorMessage: false,
            searchTxt: ""
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }

    async receive(from: string, message: Message) {
        // Customizable Area Start
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
                this.setState({ token }, () => {
                    this.getChatListApi()
                });
            }
        }

        if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
            this.getChatListApiCallId &&
            apiRequestCallId === this.getChatListApiCallId
        ) {
            if (responseJson.data.length > 0) {
                this.setState({ chatListData: responseJson.data, loader: false, errorMessage: false })
            } else {
                this.setState({ errorMessage: true, loader: false })
            }
        }

        // Customizable Area End
    }

    // Customizable Area Start
    async componentDidMount() {
        super.componentDidMount();
        this.getToken();
        if (!this.isPlatformWeb()) {
            this.props.navigation.addListener("willFocus", () => {
                this.getToken();
            });
        }
    }
    async componentWillUnmount() {
        this.setState({ loader: true }, () =>
            this.getChatListApi()
        )
    }

    getToken = () => {
        const message: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(message);
    };

    getChatListApi = async () => {
        const header = {
            "Content-Type": configJSON.apiContentType,
            token: this.state.token,
        };
        let urlQueryParams = "?query=" + this.state.searchTxt
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getChatListApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `/bx_block_chat/chat_list` + urlQueryParams
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

    navigateToChat = (chatId: string) => {
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
            chatId
        });
        message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
        this.send(message);
    }

    onChangeSearchBar = (value: string) => {
        this.setState({ searchTxt: value }, () => { this.getChatListApi() })
    }
    // Customizable Area End
}
