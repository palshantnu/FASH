import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { fashionOne, fashionThree, fashionTwo } from "./assets";
type CardDataList = {
  [key: string]: string;
};
import { Message } from "../../../framework/src/Message";
import { getStorageData } from "../../../framework/src/Utilities";
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface ClientDetailType{
  id: string |number;
  type: string,
  attributes: {
      id: number,
      stylist_id: number,
      payment_status: string,
      service_status: string,
      service_informations_id: number,
      start_date:string| null,
      end_date: string| null,
      amount: string,
      buyer_name: string,
      service_information_name: string
  }
}

interface S {
  // Customizable Area Start
  fashionImageList: any[];
  cardDataList: CardDataList;
  token:string;
  clientId:number;
  clientDetails:ClientDetailType
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class MyClientsDetailsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  createWishlistApiCallId=""
  getClientDetailsApiCallId=""
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionSaveMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      fashionImageList: [fashionOne, fashionThree, fashionTwo],
      cardDataList: {
        Budget: "$1000",
        Gender: "Male",
        "Plan Type": "Premium",
        "Start Date": "19 Feb 2024",
        "End Date": "25 Feb 2024",
        Payment: "Paid",
      },
      token:"",
      clientId:0,
      clientDetails:{id:"",type:"",attributes:{ id: 0,
        stylist_id: 0,
        payment_status:"",
        service_status: "",
        service_informations_id: 0,
        start_date:"",
        end_date: "",
        amount: "",
        buyer_name: "",
        service_information_name: ""}}
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    // Customizable Area End
    this.getClientDetails()
  }
  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({token:token})
      return;
    }
    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const msgData = message.getData(
        getName(MessageEnum.myClientsItem)
      );
      if(msgData)
        {
          this.setState({clientId:msgData?.id})
        }
    }
    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      return this.handleApiResponses(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  handleApiResponses = (message: Message) => {
    const apiCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );
    const response = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (apiCallId === this.createWishlistApiCallId) {
      this.createWishlistApiCallId = "";
this.navigateTowishlist(response.data.id)
    }
    if(apiCallId===this.getClientDetailsApiCallId){
      this.getClientDetailsApiCallId=""
      this.setState({clientDetails:response.data[0]})
    }
  }
  goBack = () => {
    this.props.navigation.goBack();
  };
  createWishlist =async () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    let token = await getStorageData('token', true)
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.createWishList,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.apiMethodTypePost,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: token,
        "Content-Type": "application/json",
      },
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        data: { name:this.state.clientDetails.attributes.buyer_name,shareable_id:this.state.clientId },
      }),
    });
    this.createWishlistApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };
  navigateTowishlist = (wishListId:number|string) => {
    const message = new Message(
      getName(MessageEnum.NavigationWishlist2Message)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    message.addData(getName(MessageEnum.wishlistIdMessage), {data:wishListId,fromWishlist:true,clientWshlistName:this.getClientFirstName()});
    this.send(message);
   
  };
  getClientDetails =async () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    let token = await getStorageData('token', true)
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.getClientDetails+'?buyer_id='+this.state.clientId,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]: configJSON.apiMethodTypeGet,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: token,
        "Content-Type": "application/json",
      },
    });
    this.getClientDetailsApiCallId = message.messageId;
    runEngine.sendMessage(message.messageId, message);
  };
  getClientFirstName=()=>{
let s=this.state.clientDetails.attributes.buyer_name.split(" ")[0]+ "'s"+" Wishlist"
    return s[0].toUpperCase() + s.slice(1);

  }
  // Customizable Area End
}
