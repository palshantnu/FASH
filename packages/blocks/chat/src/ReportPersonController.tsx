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
    // Customizable Area Start
    reportReason: string
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class ReportPersonController extends BlockComponent<
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
            reportReason: ""
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
            const reportRsn = message.getData(
                getName(MessageEnum.SessionResponseData)
            );
            const {reason} = reportRsn
            this.setState({reportReason: reason})
        }
        // Customizable Area End
    }

    // Customizable Area Start
    leftBtnClick = () => {
        this.props.navigation.pop(4)
    }

    clientNavigationBtn = () => {
        this.props.navigation.navigate("ClientsAndChatTab")
    }
    // Customizable Area End
}
