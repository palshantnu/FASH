import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { getStorageData,setStorageData } from "framework/src/Utilities";
import { showMessage } from "react-native-flash-message";
export interface DropDownListType {
  id: string;
  sku: string
}
export const configJSON = require("./config");
import i18n from '../../../components/src/i18n/i18n.config';

// Customizable Area End

export interface Props {
  // Customizable Area Start
  navigation: any;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string | null;
  loading: boolean;
  selectedModeIndex:number,
  orderId:number
  selectedMode:string
  orderReturnID:number[],
  delivery_charges:number,
  currencyLocal:string,
  returnTypeThere:string;
  modalVisible:boolean
  modalAlreadyOpen:boolean
  confirmed:boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class OrderReturnModeController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getReturnModeDetailApiCallId = "";
  setReturnModeApiCallId= "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      token: "",
      selectedModeIndex:0,
      orderId:0,
      selectedMode:'',
      orderReturnID:[],
      delivery_charges:0,
      currencyLocal:"",
      returnTypeThere:'',
      modalVisible:false,
      modalAlreadyOpen:false,
      confirmed:false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleStoreApiResponsesReturn(message);
    }
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const returnType = message.getData(
        getName(MessageEnum.SessionResponseData)
      )
      this.setState({selectedModeIndex:returnType=='request_delivery_partner'?1:0, returnTypeThere:returnType})
    }
    // Customizable Area End
  }

  // Customizable Area Start
  handleStoreApiResponsesReturn = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    this.setState({loading:false})
    if (responseJson) {
      if (apiRequestCallId === this.getReturnModeDetailApiCallId) {
        if(responseJson.errors === undefined)
        {   
          let orderData=responseJson.data
          this.setResponceSummerys(orderData)
        }
      }
      if ( apiRequestCallId === this.setReturnModeApiCallId) {
        if(responseJson.errors === undefined)
        { 
          
          showMessage({
            message: i18n.t("ModeofReturnupdated"),
            position: { top: 0 },
          });
         this.navigationToOredrSummary()
        }
      }
    }
  }
  setResponceSummerys=(orderData:{attributes:{delivery_charges:string,order_items:{ id:number,
    attributes:{driver_name: string;
        quantity: number,
        catalogue_name: string,
        catalogue_variant_color: string,
        catalogue_variant_size:string,
        catalogue_variant_front_image:string|null,
        store_name:string,
        status: string,
        reason_of_return: string,}}[]}})=>{
    let orderReturnID:number[]=[]
    orderData.attributes?.order_items.forEach((element:{id:number,attributes:{status:string}},index:number )=> {
      if(element.attributes.status==="return_placed" ||  element.attributes.status==="return_confirmed"){
        orderData.attributes?.order_items.splice(index,1)
        orderReturnID.push(element.id)
        
      }
    });
      this.setState({orderReturnID:orderReturnID,delivery_charges:parseFloat(orderData.attributes.delivery_charges)})  
  }
  async componentDidMount() {
    
      this.getTokenInAssign();

      const currencyLocal = await getStorageData("currencyIcon", true);
      this.setState({currencyLocal})
   
    this.props.navigation.addListener("willFocus", () => {
      this.getTokenInAssign();

    });
  }

  getTokenInAssign = async() => {
    const token = await getStorageData("token", true);
    const orderId = await getStorageData("orderId", true);
    this.setState({ token,orderId },()=>{
      this.getOrderDetails(token)
    })
  };

  buttonDisable = () => {
    const { selectedModeIndex, returnTypeThere } = this.state;
    return returnTypeThere === (selectedModeIndex === 0 ? 'self_drop_off' : 'request_delivery_partner');
  };
  
  updateStatusMode = (value: number) => {
    const { returnTypeThere } = this.state;
    let newMode = value;
    if (returnTypeThere) {
      newMode = returnTypeThere === 'self_drop_off' ? 1 : 0;
    }
    this.updateMode(newMode);
  };
  
  openModalConfirmation = () => {
    const { selectedModeIndex, returnTypeThere, confirmed } = this.state;
    if (returnTypeThere && returnTypeThere !== (selectedModeIndex === 0 ? 'self_drop_off' : 'request_delivery_partner') && !confirmed) {
      this.setState({ modalVisible: true });
    }
  };
  
  updateMode = (value: number) => {
    this.setState({ selectedModeIndex: value }, this.openModalConfirmation);
  };
  
  closeModal = () => {
    const previousIndex = this.state.returnTypeThere === 'self_drop_off' ? 0 : 1;
    this.setState({ modalVisible: false, selectedModeIndex: previousIndex });
  };
  
  confirmYes = () => {
    this.setState({ modalVisible: false,confirmed:true });
  };

  getOrderDetails = (token:string) => {
    this.setState({loading:true})     
    const header = {
        "Content-Type": configJSON.apiContentType,
        token: token,
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getReturnModeDetailApiCallId = requestMessage.messageId;

    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getOrderDetailBuyerStoreApiEndPoint+this.state.orderId
    );

    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.listOfOrdersMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
}
returnRequestModeSelect = () => {
  this.setState({loading:true})
  const header = {
    "Content-Type": configJSON.apiContentType,
    token: this.state.token,
};
const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
);

this.setReturnModeApiCallId = requestMessage.messageId;
let setMode=this.state.selectedModeIndex===0?"self_drop_off":"request_delivery_partner"
  
requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    configJSON.setReturnModeEndpoint+"?return_type="+setMode+"&seller_order_id="+this.state.orderId+"&order_item_ids=["+this.state.orderReturnID.toString()+"]"
);

requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
);
requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    configJSON.putMethod
);
runEngine.sendMessage(requestMessage.id, requestMessage);   
 
}
  navigationToOredrSummary=async()=>{
    await setStorageData("selectedMode",JSON.stringify(this.state.selectedModeIndex))
    const message: Message = new Message(
      getName(MessageEnum.NavigationOrderReturnModeConfirm)
    );

    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);

    
  }
  
  // Customizable Area End
}
