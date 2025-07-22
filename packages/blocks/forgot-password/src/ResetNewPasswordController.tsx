import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { Alert } from 'react-native'
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
    timeout: any;
    password: string
    token: string;
    confirmPassword: string;
    hidePassword: boolean;
    hidePasswordConfirm: boolean
    isPassword: boolean;
    isComPassword: boolean;
    errorMessage: string;
    isLoading: boolean
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class ResetNewPasswordController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    resetNewPasswordApiCallID: any;
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        this.state = {
            // Customizable Area Start
            timeout: configJSON.timeout,
            password: '',
            confirmPassword: '',
            token: '',
            hidePassword: false,
            hidePasswordConfirm: false,
            isPassword: false,
            isComPassword: false,
            errorMessage: '',
            isLoading: false
            // Customizable Area End
        };

        // Customizable Area Start
        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.NavigationPayLoadMessage),
            getName(MessageEnum.CountryCodeMessage)
        ];
        // Customizable Area End

        runEngine.attachBuildingBlock(this, this.subScribedMessages);
    }

    async componentDidMount() {
        super.componentDidMount();
        // Customizable Area Start
        this.setState({ token: this.props.navigation?.state?.params?.item })
        // Customizable Area End
    }


    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );

            let responseJson = message.getData(
                getName(MessageEnum.RestAPIResponceSuccessMessage)
            );
            let errorReponse = message.getData(
                getName(MessageEnum.RestAPIResponceErrorMessage)
            );
            this.setState({ isLoading: false })
            if (responseJson && !responseJson.errors) {
                this.resetNewPasswordSucessCallBack(responseJson)
            } else if (responseJson.errors?.length > 0) {
                this.resetNewPasswordFailureCallBack(responseJson)
            } else if (errorReponse) {
                this.parseApiCatchErrorResponse(errorReponse);
            }
        }
        // Customizable Area End
    }

    // Customizable Area Start
    resetNewPasswordSucessCallBack = (responseJson: any) => {
        this.setState({ isLoading: false })
        Alert.alert('Success', 'Password reset successfully', [
            { text: 'OK', onPress:this.navigateToEmailLogin},
        ]);
    }
    resetNewPasswordFailureCallBack = (responseJson: any) => {
        this.setState({ isLoading: false })
        // @ts-ignore
        if (responseJson?.errors?.length > 0 && responseJson?.errors[0]?.otp ||
            responseJson?.errors?.length > 0 && responseJson?.errors[0]?.token ) {
            Alert.alert('Error', 'Token invalid', [
                { text: 'OK', onPress:this.navigateToResetPassword },
            ]);
        } else if (responseJson?.errors?.length > 0 && responseJson?.errors[0]?.base) {
            Alert.alert("Error", "New password is already in use, Please enter another new password.")
        }
    }

    navigateToEmailLogin =() =>{
     this.props.navigation.navigate('EmailAccountLoginBlock')
    }

    navigateToResetPassword = () => {
        this.props?.navigation?.navigate('ResetPassword');
    };

    apiCall = async (data: any) => {
        const { contentType, method, endPoint, body } = data;
        let header = {
            "Content-Type": contentType,
        }

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            method
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            endPoint
        );
        body &&
            requestMessage.addData(
                getName(MessageEnum.RestAPIRequestBodyMessage),
                JSON.stringify(body)
            )
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return requestMessage.messageId;
    };
    // Customizable Area End
    // Customizable Area Start
    /*istanbul ignore next*/
    handleContinue = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        if (this.state.password.length === 0) {
            this.setState({ isPassword: true, errorMessage: '* Please enter your new password' })
            return;
        }
        if (!passwordRegex.test(this.state.password)) {
            this.setState({ isPassword: true, errorMessage: '* Your new password must contain at least 8 characters and contain a number, an uppercase and a special character.' })
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ isComPassword: true, errorMessage: `* Confirm New Password must be same as New Password.` })
            return false;
        } else {
            this.setState({ isLoading: true })
            let httpBody = {
                data: {
                    token: this.state.token,
                    new_password: this.state.password
                }
            }
            this.resetNewPasswordApiCallID = await this.apiCall({
                contentType: "application/json",
                method: "POST",
                endPoint: "forgot_password/password",
                body: httpBody,
            })
        }
    };
    // Customizable Area End
}
