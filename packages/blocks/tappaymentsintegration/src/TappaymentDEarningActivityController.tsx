import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { rightSignIcon } from "./assets";
import moment from "moment";
import 'moment/locale/ar-dz';
import i18n from '../../../components/src/i18n/i18n.config';

interface EarningPickupProps {
    address:string;
    area:string;
    block:string;
    zip_code:string;
}

interface EarningDeliveryProps {
    area:string;
    block:string;
    house_or_building_number:string;
    street:string;
    zip_code:string;
}

export interface EarningActivityProps {
    id:string;
    amount:number;
    date:string;
    time:string;
    order_number:string;
    pick_up_store:EarningPickupProps;
    delivery_address:EarningDeliveryProps;
}

export interface EarningArrProps {
    time: string;
    title: string;
    description: string;
    icon: JSX.Element;
    lineColor: string;
  }
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
  token:string;
  loading:boolean;
  earningActivityArr:EarningActivityProps[];
  localLanguage:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class TappaymentDEarningActivityController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getDriverEarningActivityCallApiId:string = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];

    this.state = {
        token:'',
        loading:false,
        earningActivityArr:[],
        localLanguage:i18n.language
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken()
    this.props.navigation.addListener("willFocus", () => {
      if(this.state.localLanguage === 'en')
      {
        moment.locale('en')
      }else{
        moment.locale('ar-dz')
      }
      this.getToken();
    });
    // Customizable Area End
  }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        runEngine.debugLog("Message Recived", message);
        this.getTokenAndValue(message)
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            this.apiResponseEarningActivity(message)
        }
        // Customizable Area End
    }

  // Customizable Area Start
    getToken = () => {
        const msgToken: Message = new Message(
        getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msgToken);
    };

    getTokenAndValue = (message:Message)=>{
        if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            let token = message.getData(getName(MessageEnum.SessionResponseToken));
            runEngine.debugLog("TOKEN", token);
            this.setState({ token: token });
            this.getDriverEarningActivity(token)
        } 
    }

    apiResponseEarningActivity = (message:Message) =>
    {
      const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
      );
  
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
  
      let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      )
  
      if (responseJson.error === undefined) {
          if (apiRequestCallId === this.getDriverEarningActivityCallApiId) {
              this.setState({earningActivityArr:responseJson.order,loading:false})
          }
        
      }else{
        this.setState({loading:false,earningActivityArr:[]})
        this.parseApiErrorResponse(errorReponse)
      }
    }

    getDriverEarningActivity = (token:string) => {
        this.setState({loading:true})

        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };

        const requestMessageActivity = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getDriverEarningActivityCallApiId = requestMessageActivity.messageId;

        requestMessageActivity.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getDriverEarningApiCallId
        );

        requestMessageActivity.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessageActivity.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.validationApiMethodType
        );

        runEngine.sendMessage(requestMessageActivity.id, requestMessageActivity);
    }

    convertDateActivity = (currentDate:string)=>{
        return moment(currentDate).format('DD-MMM-YYYY')
    }

    convertTimeActivity = (currentTime:string)=>{
        return moment(currentTime).format('hh:mm A')
    }

    convertAddress = (pickupStore:EarningPickupProps,deliveryStore:EarningDeliveryProps)=>
    {
        let pickupStoreAdd = pickupStore?.block+', '+pickupStore?.address+', '+pickupStore?.area+', '+pickupStore?.zip_code;
        let deliveryStoreAdd = '';
        if(deliveryStore != null)
        {
            deliveryStoreAdd = deliveryStore.house_or_building_number+', '+deliveryStore.street+', '+deliveryStore.block+', '+deliveryStore.area+', '+deliveryStore.zip_code;
        }
        let earningStatusArr=[
            {
            time: '09:00', title: i18n.t('pickupStoreText'), description: pickupStoreAdd, icon: rightSignIcon,
            lineColor: ""
            },
            {
            time: '10:45', title: i18n.t('deliveredText'), description: deliveryStoreAdd, icon: rightSignIcon,
            lineColor: ""
            },
        ]

        return earningStatusArr;
    }

  timelineFlatListArabicManage = (languageGet:string)=>{
    if(languageGet === 'ar')
    {
      return 'single-column-right'
    }else{
      return 'single-column-left'
    }
  }

  // Customizable Area End
}
