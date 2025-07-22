import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { showMessage } from "react-native-flash-message";
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
    loading:boolean;
    token:string;
    orderInvoicesPush:boolean;
    orderConfirmationPush:boolean;
    deliveryConfirmationPush:boolean;
    reviewsFeedbackPush:boolean;
    refundPaymentPush:boolean;
    marketingEmailsPush:boolean;
    productStockPush:boolean;
    orderInvoicesEmail:boolean;
    orderConfirmationEmail:boolean;
    deliveryConfirmationEmail:boolean;
    reviewsFeedbackEmail:boolean;
    refundPaymentEmail:boolean;
    marketingEmailsEmail:boolean;
    productStockEmail:boolean;
    // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Customisableuserprofiles2sellerprofilenotificationController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
   getNotificationStatusApiCallID="";
   notificationStatusUpdateCallID="";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading:false,
      token:'',
      orderInvoicesPush:false,
      orderConfirmationPush:false,
      deliveryConfirmationPush:false,
      reviewsFeedbackPush:false,
      refundPaymentPush:false,
      marketingEmailsPush:false,
      productStockPush:false,
      orderInvoicesEmail:false,
      orderConfirmationEmail:false,
      deliveryConfirmationEmail:false,
      reviewsFeedbackEmail:false,
      refundPaymentEmail:false,
      marketingEmailsEmail:false,
      productStockEmail:false,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

    async componentDidMount(): Promise<void> {
        this.getToken()
        this.props.navigation.addListener('didFocus', async() => {
        this.getToken()
        })
    }

    async receive(from: string, message: Message) {
        runEngine.debugLog("Message Recived", message);
        // Customizable Area Start
        this.getTokenAdminValue(message)
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
        
        if (responseJson && !responseJson.errors) {
            if (apiRequestCallId === this.getNotificationStatusApiCallID) {
                let notificationPushData = responseJson.data.attributes.notification.push_notification
                let notificationEmailData = responseJson.data.attributes.notification.email_notification
                this.setState({ loading: false,orderInvoicesPush:notificationPushData.order_invoices,orderConfirmationPush:notificationPushData.order_confirmations,deliveryConfirmationPush:notificationPushData.delivery_confirmation,reviewsFeedbackPush:notificationPushData.reviews_and_feedback_requests,refundPaymentPush:notificationPushData.refund_or_payment_complete,marketingEmailsPush:notificationPushData.marketing_emails,productStockPush:notificationPushData.product_stock_updates,orderInvoicesEmail:notificationEmailData.order_invoices,orderConfirmationEmail:notificationEmailData.order_confirmations,deliveryConfirmationEmail:notificationEmailData.delivery_confirmation,reviewsFeedbackEmail:notificationEmailData.reviews_and_feedback_requests,refundPaymentEmail:notificationEmailData.refund_or_payment_complete,marketingEmailsEmail:notificationEmailData.marketing_emails,productStockEmail:notificationEmailData.product_stock_updates });
            }

            if(apiRequestCallId === this.notificationStatusUpdateCallID)
            {
                this.setState({loading:false})
                showMessage({
                    message: responseJson.message,
                    position: { top: 0 },
                });
            }

        }else if (errorReponse) {
            this.setState({ loading: false });
            this.parseApiErrorResponse(errorReponse)
        }
        }
        // Customizable Area End
    }

    getToken = () => {
        const msg: Message = new Message(
        getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msg);
    };

    getTokenAdminValue = (message:Message)=>{
        if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            let token = message.getData(getName(MessageEnum.SessionResponseToken));
            this.setState({token:token})
            this.getAllNotificationStatusData(token)
        }
    }

    getAllNotificationStatusData = async(token:string)=>{

        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token:token
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getNotificationStatusApiCallID = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getNotificationStatusEndPoint
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.validationApiMethodType
        );

        this.setState({ loading: true })

        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    }

    notificationStatusUpdate = (stateKey:string,notificationValue:boolean,notificationType:string,notificationKey:string)=>{
        this.setState({[stateKey]: notificationValue} as unknown as Pick<S, keyof S>)

        const header = {
           "Content-Type": "multipart/form-data",
            token: this.state.token
        };

        let formdata = new FormData()
        formdata.append("notification_type",notificationType);
        formdata.append("notification_key",notificationKey);
        formdata.append("notification_value",notificationValue.toString());

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
          );
        this.notificationStatusUpdateCallID = requestMessage.messageId;
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.updateNotificationStatusEndPoint
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
            configJSON.putApiMethod
        );
        this.setState({loading:true})
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return true;
    }
  // Customizable Area End
}
