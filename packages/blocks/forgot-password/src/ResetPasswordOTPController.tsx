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
    inputBoxLength: number;
    otp: any;
    emailORnumber: string;
    verifyEmail:string;
    verifyPhone: string;
    token: string;
    isOtp: boolean;
    loginType: string;
    emailVerified: boolean;
    OtpArray: any[];
    showOtpErrorMess: boolean;
    isLoading: boolean;
    newEmail:string
    maskedEmail: any;
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class ResetPasswordOTPController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    verifyOTPApiCallID: any;
    resendOTPApiCallID: any
    otpTextInput: any = [];
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        this.state = {
            // Customizable Area Start
            timeout: configJSON.timeout,
            inputBoxLength: 4,
            otp: [],
            emailORnumber: '',
            verifyPhone: '',
            verifyEmail:'bhavesh@gmail.com',
            token: '',
            isOtp: false,
            loginType: '',
            emailVerified: true,
            OtpArray: ["", "", "", ""],
            showOtpErrorMess: false,
            isLoading: false,
            newEmail:'',
            maskedEmail: ""
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
        this.setState({
            emailORnumber: this.props.navigation.state.params.item.email_or_full_phone_number,
            token: this.props.navigation.state.params.item.token,
            loginType: this.props.navigation.state.params.item.type,
            verifyEmail: this.props.navigation.state.params.item.emailAddress,
            verifyPhone:this.props.navigation.state.params.item.phoneNumber
        }, () => {
            this.setState({
                maskedEmail: this.maskEmail()
            })
        })
        if (this.props.navigation.state.params.item.emailAddress) {
            this.setState({emailVerified :false})
        }
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
                this.successResponseJson(apiRequestCallId, responseJson)
            } else if (responseJson && responseJson.errors) {
                this.failureResponseJson(apiRequestCallId, responseJson)
            } else if (errorReponse) {
                this.parseApiCatchErrorResponse(errorReponse);
            }
        }
        // Customizable Area End
    }

    // Customizable Area Start
    successResponseJson = (apiRequestCallId: any, responseJson: any) => {
        if (apiRequestCallId === this.verifyOTPApiCallID) {
            this.verifyOTPSucessCallBack(responseJson)
        }
        if (apiRequestCallId === this.resendOTPApiCallID) {
            this.resendOTPSucessCallBack(responseJson)
        }
    }

    maskEmail = () => {
        const { verifyEmail } = this.state;
        if(verifyEmail) {
            const [username, domain] = verifyEmail.split('@');
            const maskedUsername = username.slice(0, 1) + '*'.repeat(username.length - 2) + username.split('').reverse().join('').slice(0, 1);
            return maskedUsername + '@' + domain;
        }
    }

    // Customizable Area End
    // Customizable Area Start
    /*istanbul ignore next*/
    failureResponseJson = (apiRequestCallId: any, responseJson: any) => {
        if (apiRequestCallId === this.verifyOTPApiCallID) {
            this.verifyOTPFailureCallBack(responseJson)
        }
        if (apiRequestCallId === this.resendOTPApiCallID) {
            this.resendOTPFailureCallBack(responseJson)
        }
    }
    verifyOTPSucessCallBack = (responseJson: any) => {
        this.props.navigation.navigate('ResetNewPasswoord', { item: this.state.token })

    }
    verifyOTPFailureCallBack = (responseJson: any) => {
        // @ts-ignore
        if (responseJson?.errors[0]?.otp) {
            Alert.alert("Error", "Invalid OTP code")
        } else {
            Alert.alert("Error", "Someting wents wrong please try again later.")
        }
    }

    resendOTPSucessCallBack = (responseJson: any) => {
        this.setState({ token: responseJson?.meta?.token })
    }
    resendOTPFailureCallBack = (responseJson: any) => {
        console.log("@@@===Resend OTP failure call back", responseJson)
    }

    // Customizable Area Start
    resetprevoiusFocus = (key: any, index: number) => {
        if (key == 'Backspace' && index !== 0) {
            this.otpTextInput[index - 1].focus()

            const otp = this.state.OtpArray
            otp[index] = '';

            let stringOtp = ""
            otp.forEach(
                (item, index) => {
                    stringOtp += item
                })
            this.setState({ OtpArray: otp, otp: stringOtp });
        }
    }

    resetchangeFocus = (value: any, index: number) => {

        if (index < this.otpTextInput.length - 1 && value) {
            this.otpTextInput[index + 1].focus();
        }
        if (index === this.otpTextInput.length - 1) {
            this.otpTextInput[index].blur();
        }
        const otp = this.state.OtpArray;
        otp[index] = value;
        let stringOtpFocus = ""
        otp.forEach(
            (item, index) => {
                stringOtpFocus += item
            }
        )
        this.setState({ OtpArray: otp, otp: stringOtpFocus, showOtpErrorMess: false, });
    }

    verifyAccount = async () => {
        this.setState({ isLoading: true })
        if (!this.state.otp || this.state.otp.length <= 3) {
            this.setState({ showOtpErrorMess: true, })
            this.setState({ isLoading: false })
            return false
        }
        else {
            let httpBody = {
                data: {
                    token: this.state.token,
                    otp_code: this.state.otp
                }
            }

            this.verifyOTPApiCallID = await this.apiCall({
                contentType: "application/json",
                method: "POST",
                endPoint: "forgot_password/otp_confirmation",
                body: httpBody,
            })
        }
    }

    resendOtp = async () => {
        this.setState({ isLoading: true })
        let httpBody = {
            data: {
                attributes: {
                    email_or_full_phone_number: this.state.emailORnumber
                }
            }
        }

        this.resendOTPApiCallID = await this.apiCall({
            contentType: "application/json",
            method: "POST",
            endPoint: "forgot_password/otp",
            body: httpBody,
        })
    }

    apiCall = async (data: any) => {
        const { contentType, method, endPoint, body } = data;
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
        let header = {
            "Content-Type": contentType,
        }
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            endPoint
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            method
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
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
}
