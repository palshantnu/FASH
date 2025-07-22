import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";
const navigation = require("react-navigation")
// Customizable Area Start
interface RequestList {
    id: number,
    attributes: {
        stylist_id: number,
        gender: string,
        colour: string,
        min_price: number,
        max_price: number,
        status: string,
        buyer_name: string,
        buyer_profile: string,
        stylist_name: string,
        stylist_profile: string,
        chat_id:string
    }
}

interface MyRequestResponse {
    data: RequestList[]
}
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
    navigation: typeof navigation;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}
interface S {
    // Customizable Area Start
    isLoading: boolean;
    requestListArr: RequestList[];
    // Customizable Area End
}
interface SS {
    id: number;
}

export default class MyRequestsontroller extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    myRequestListApiCallId: string = "";
    deleteApiCallId: string = "";
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
            isLoading: false,
            requestListArr: []
        };
        // Customizable Area End
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async componentDidMount() {
        // Customizable Area Start
        super.componentDidMount();
        this.props.navigation.addListener("willFocus", () => {
            this.setState({ isLoading: true }, () => {
                this.myRequestlist();
            })
        });
        this.myRequestlist();

        // Customizable Area End
    }

    // Customizable Area Start
    navigateToStylishProfile = () => {
        const message = new Message(getName(MessageEnum.NavigationMessage));
        message.addData(getName(MessageEnum.NavigationTargetMessage), 'UserProfileBasicBlock');
        message.addData(getName(MessageEnum.NavigationPropsMessage), this.props)
        this.send(message)
    }

    async receive(from: string, message: Message) {

        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );
            let apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );
            if (apiRequestCallId != null) {
                if (apiRequestCallId === this.myRequestListApiCallId) {
                    this.setState({ isLoading: false })
                    this.callBackListSuccess(responseJson)
                }
                if (apiRequestCallId === this.deleteApiCallId) {
                    this.setState({ isLoading: false })
                    this.deleteResponseSuccess(responseJson)
                }
            }
        }
    }
    callBackListSuccess(responseJson: MyRequestResponse) {
        if (responseJson.data) {
            this.setState({ requestListArr: responseJson.data || [] })
        } else {
            this.setState({ requestListArr: [] })
        }
    }

    deleteResponseSuccess(responseJson: string) {
        this.myRequestlist()
    }

    myRequestlist = async () => {
        let token = await getStorageData('token', true)
        this.setState({ isLoading: true, })
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.myRequestListApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getMtRequestApiEndPoint
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

    onDelete = async (id: number) => {
        this.setState({ isLoading: true, })
        let token = await getStorageData('token', true)
        this.setState({ isLoading: true, })
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.deleteApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `bx_block_custom_form/hire_stylist_custom_forms/${id}`
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.deleteAPiMethod
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    navigateFromHiredStylish = (userID: any) => {
        const messageHire: Message = new Message(
          getName(MessageEnum.NavigationMessage)
        );
        messageHire.addData(
          getName(MessageEnum.NavigationTargetMessage),
          'Chat'
        );
        messageHire.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    
        const raiseMessageHire: Message = new Message(
          getName(MessageEnum.NavigationPayLoadMessage)
        );
    
        raiseMessageHire.addData(getName(MessageEnum.SessionResponseData), {
          userID
        });
        messageHire.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessageHire);
        this.send(messageHire);
      } 

    onNavigateRequirements = (id: number) => {
        const message = new Message(getName(MessageEnum.NavigationMessage));
        message.addData(getName(MessageEnum.NavigationTargetMessage), "RequirementForm");
        const raiseMessage: Message = new Message(
            getName(MessageEnum.NavigationPayLoadMessage)
        )
        message.addData(getName(MessageEnum.NavigationPropsMessage), this.props)
        raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
            stylistId: id, type: "Edit"
        });
        message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
        this.send(message)


    }
    // Customizable Area End
}