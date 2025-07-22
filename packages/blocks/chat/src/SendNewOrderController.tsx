import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert } from "react-native";
import ImagePicker, { Options, Image } from "react-native-image-crop-picker";
import { showMessage } from 'react-native-flash-message';
import i18n from "../../../components/src/i18n/i18n.config";
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
    productName: string;
    productDescription: string;
    isFocus: boolean
    value: any
    productData: any
    mediaModal: boolean
    profilePhotoDetails: {
        uri: string;
        name: string;
        type: string;
    };
    chatID: string
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class SendNewOrderController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    gender = [
        {
            value: 1,
            label: i18n.t("Male"),
        },
        {
            value: 2,
            label: i18n.t("Female"),
        },
        {
            value: 3,
            label: i18n.t("Other"),
        },
    ]
    inputComponent = [
        {
            key: 1,
            heading: i18n.t("size"),
            inputTxt: i18n.t("proctSize")
        },
        {
            key: 2,
            heading: i18n.t("color"),
            inputTxt: i18n.t("Product Colour")
        },
        {
            key: 3,
            heading: i18n.t("Product Quantity"),
            inputTxt: i18n.t("In units")
        },
        {
            key: 4,
            heading: i18n.t("Price Per Unit"),
            inputTxt: i18n.t("amount")
        },
        {
            key: 5,
            heading: i18n.t("Shipping Cost"),
            inputTxt: i18n.t("amount")
        },
    ]
    sendNewRequestApiCallId: string = ""
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
            productName: "",
            productDescription: "",
            isFocus: false,
            value: null,
            productData: {},
            mediaModal: false,
            profilePhotoDetails: {
                uri: "",
                name: "",
                type: ""
            },
            chatID: ""
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
            const { accountId } = chatOrderID
            if (accountId) {
                this.setState({ chatID: accountId })
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

        if (getName(MessageEnum.RestAPIResponceMessage) === message.id &&
            this.sendNewRequestApiCallId &&
            apiRequestCallId === this.sendNewRequestApiCallId
        ) {
            if (responseJson.data) {
                this.navigateToChat(this.state.chatID)
            } else {
                Alert.alert("Error!", responseJson.error)
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

    getToken = () => {
        const message: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(message);
    };

    goBackBtn = () => {
        this.props.navigation.goBack()
    }

    onProductNameChange = (value: string) => {
        this.setState({ productName: value })
    }

    onProductDescriptionChange = (value: string) => {
        this.setState({ productDescription: value })
    }

    onFocusBtn = () => {
        this.setState({ isFocus: true })
    }

    onBlurBtn = () => {
        this.setState({ isFocus: false })
    }

    onChangeDropBtn = (item: any) => {
        this.setState({ value: item?.label })
        this.setState({ isFocus: false })
    }

    onChangeInputValues = (value: string, key: number) => {
        this.setState((prevState) => ({
            productData: {
                ...prevState.productData,
                [key]: value,
            },
        }));
    };

    mediaUploadPortfolio = () => {
        this.setState({ mediaModal: true })
    }

    closeDetailsPickerModal = () => {
        this.setState({ mediaModal: false })
    }

    openCamera = async () => {
        const options: Options = {
            mediaType: "photo",
            cropping: true,
            height: 500,
            width: 500,
        };
        try {
            const response: Image = await ImagePicker.openCamera(options);
            this.setState({
                profilePhotoDetails: {
                    uri: response.path,
                    type: response.mime,
                    name: `profile_photo.${response.mime.split("/")[1]}`,
                },
                mediaModal: false
            });
        } catch (_error) {
            Alert.alert("Something went wrong!", "Please try after sometime")
            this.setState({ mediaModal: false })
        }
    }

    openGallery = async () => {
        const options: Options = {
            mediaType: "photo",
            cropping: true,
            height: 500,
            width: 500,
        };
        try {
            const response: Image = await ImagePicker.openPicker(options);
            this.setState({
                profilePhotoDetails: {
                    uri: response.path,
                    type: response.mime,
                    name: `profile_photo.${response.mime.split("/")[1]}`,
                },
                mediaModal: false
            });
        } catch (_error) {
            Alert.alert("Something went wrong!", "Please try after sometime")
            this.setState({ mediaModal: false })
        }
    }
// istanbul ignore next
    shouldDisableButton = () => {
        const { productName, productDescription, value, productData, profilePhotoDetails } = this.state;
      
        return (
          !productName?.trim() ||
          !productDescription?.trim() ||
          !value ||
          !productData?.["1"]?.trim() ||
          !productData?.["2"]?.trim() ||
          !productData?.["3"]?.trim() ||
          !productData?.["4"]?.trim() ||
          !productData?.["5"]?.trim() ||
          !profilePhotoDetails?.uri
        );
      };

    sendNewRequest = () => {
       const header = {
            "Content-Type": 'multipart/form-data',
            token: this.state.token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        let selectedImageData: string | Blob = this.state

        .profilePhotoDetails as unknown as Blob;

        const formData = new FormData();
        formData.append("order_request[product_name]", this.state.productName)
        formData.append("order_request[product_desc]", this.state.productDescription)
        formData.append("order_request[gender]", this.state.value)
        formData.append("order_request[size]", this.state.productData["1"])
        formData.append("order_request[color]", this.state.productData["2"])
        formData.append("order_request[product_quantity]", this.state.productData["3"])
        formData.append("order_request[price_per_unit]", this.state.productData["4"])
        formData.append("order_request[shipping_cost]", this.state.productData["5"])
        formData.append("order_request[product_display_image]", selectedImageData)
        formData.append("chat_id", this.state.chatID)

        this.sendNewRequestApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            `/bx_block_chat/create_order_request_message`
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

    navigateToChat = (chatId: string) => {
        const messageOrder: Message = new Message(
            getName(MessageEnum.NavigationMessage)
        );
        messageOrder.addData(
            getName(MessageEnum.NavigationTargetMessage),
            'Chat'
        );
        messageOrder.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        const raiseMessageOrder: Message = new Message(
            getName(MessageEnum.NavigationPayLoadMessage)
        );
        raiseMessageOrder.addData(getName(MessageEnum.SessionResponseData), {
            chatId
        });
        messageOrder.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessageOrder);
        this.send(messageOrder);
    }
    // Customizable Area End
}
