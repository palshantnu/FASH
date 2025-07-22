import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
import { showMessage } from "react-native-flash-message";

interface Root {
  message: string
  promo_code: PromoCode
}

interface PromoCode {
  id: number
  perk_code: string
  perk_type: string
  description: string
  discount_percentage: number
  points_needed: number
  created_at: string
  updated_at: string
}

interface LoyaltyRedeemAttr{
    id: number
    perk_code: string
    points_needed: number
    description: string
    perk_type: string
    discount_percentage: number
    created_at: string
    updated_at: string
    is_redem: boolean
}

export interface LoyaltyRedeemProps {
    id: string;
    type: string;
    attributes: LoyaltyRedeemAttr;
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
  loyaltyRedeemArr:LoyaltyRedeemProps[];
  beforeConfirmSelectStatus:string;
  languagueIcon:string;
  redeemModal:boolean;
  currentRedeemId:string;
  loyaltyPoints:number;
  current_order_id: number | null;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class LoyaltyRedeemController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getBuyerLoyaltyPointsPromoCallApiId:string = "";
  redeemLoyaltyPointCallApiId:string=""
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
        loyaltyRedeemArr:[],
        beforeConfirmSelectStatus:'',
        languagueIcon:'',
        redeemModal:false,
        currentRedeemId:'',
        loyaltyPoints:0,
        current_order_id: null
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getBuyerLoyaltyRedeemPoints()
    this.props.navigation.addListener("willFocus", async() => {
        this.getBuyerLoyaltyRedeemPoints()
    });
    // Customizable Area End
  }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        runEngine.debugLog("Message Recived", message);

        if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
          let data = message.getData(getName(MessageEnum.NavigationIdDataMassage));
          if (data != undefined) {
           this.setState({loyaltyPoints:data.loyaltyPoint})
          }
          return;
        }
        
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            this.apiResponseLoyaltyPointManage(message)
        }
        // Customizable Area End
    }

  // Customizable Area Start

    redeemModalClose = ()=>{
      this.setState({redeemModal:false})
    }

    redeemModalOpen = (is_redeem:boolean,redeemId:string)=>{
        if(is_redeem)
        {
            this.setState({currentRedeemId:redeemId,redeemModal:true})
        }
    }

    btnRedeemConfirm = ()=>{
      this.redeemModalClose()
      this.hitRedeemLPOfferAPI();
      
    }

    hitRedeemLPOfferAPI =async()=>{
      let token = await getStorageData('token',true)
        this.setState({loading:true})
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.redeemLoyaltyPointCallApiId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.redeemLPEndpoint + `temp_order_id=${this.state.current_order_id}&perk_code=${this.state.currentRedeemId}`
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.exampleAPiMethod
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    apiResponseLoyaltyPointManage = (message:Message) =>
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
            if (apiRequestCallId === this.getBuyerLoyaltyPointsPromoCallApiId) {
              this.setState({loyaltyRedeemArr:responseJson.loyalty_point_perks.data,loading:false,current_order_id:responseJson.active_order_id})
            } else if (apiRequestCallId === this.redeemLoyaltyPointCallApiId) {
              this.btnRedirectLoyaltyCongralution(responseJson);
            }
        
      }else{
        this.setState({loading:false})
        this.parseApiErrorResponse(errorReponse)
        showMessage({
          message: responseJson.error,
          position: { top: 8 },
          type: "success",
        });
      }
    }

    getBuyerLoyaltyRedeemPoints = async() => {
        let token = await getStorageData('token',true)
        this.setState({loading:true})
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };

        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getBuyerLoyaltyPointsPromoCallApiId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.loyaltyPointPromoApiEndPoint
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

    

    btnRedirectLoyaltyCongralution = (data : Root)=>{
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationLoyaltyConfirmation)
        );
    
        msgNavigation.addData(
            getName(MessageEnum.NavigationPropsMessage),
            this.props
        );

        msgNavigation.addData(
            getName(MessageEnum.LoyaltyConfirmationData),
            data
        );    
    
        this.send(msgNavigation);
    }
  // Customizable Area End
}
