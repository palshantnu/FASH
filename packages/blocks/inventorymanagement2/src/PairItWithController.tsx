import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start

export interface InventoryItem {
    id: string;
    type: string;
    attributes: {
        id: string;
        catalogue_id: number;
        product_name: string;
        product_description: string;
        sku: string;
        stock_qty: number;
        low_stock_threshold: number;
        is_listed: boolean;
        price: string;
        size: string;
        colour: string;
        gender: string;
        front_image: string;
        brand_name: string;
    };
}
export const configJSON = require("./config");

type Errors = | [
  {
    message: string;
  }
] | null

interface PairItWithData {
  data: InventoryItem[];
  errors: Errors;
  error: string;
}
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
  PairItWithList: InventoryItem[]
 AllPairedList: InventoryItem[]
  PairItWithearchText: string;
 
 
  errorMsg: {
    errorHeader: string,
    errorTitle: string
  }
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PairItWithController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getPairWithListApiCallId: string = "";
  postPairItWithId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.AccoutLoginSuccess),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionSaveMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      token: "",
    
      PairItWithearchText: "",
      PairItWithList: [
        
      ],
   AllPairedList:[],
      errorMsg: {
          "errorHeader": "",
          "errorTitle": ""
      },
     
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));


      if (apiRequestCallId) {
        if (apiRequestCallId === this.getPairWithListApiCallId) {
          this.handleGetStorelistResponseInAssign(responseJson)
        }
      
      }
    }
    if(!this.state.token){
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token }, () => {
      
        this.fetchThePairItWithList()
      });
    }
}
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
   
    this.getTokenInAssign();
    
  
  }

  getTokenInAssign = () => {
    if(!this.state.token){
      const msg: Message = new Message(
        getName(MessageEnum.SessionRequestMessage)
      );
      this.send(msg);
      }
   
  };

  handleGetStorelistResponseInAssign = (responseJson: PairItWithData) => {
    if (responseJson && responseJson.data && !responseJson.errors) {
   
      this.setState({
        PairItWithList: responseJson.data,
      
      })
      if(this.state.AllPairedList.length===0){

      this.setState({
        AllPairedList: responseJson.data,
      
      })
      }
    } 
    else {
      this.setState({
        PairItWithList: [],
      
      })
    }
    this.setState({ loading: false })
  }

  updateTheSearchTextInAssign = (text: string) => {
    const newText = text.replace(/[^a-zA-Z0-9\s]/g, '').trimStart();
    this.setState({ PairItWithearchText: newText });

  }

  searchPairItWithInAssign = () => {
    this.fetchThePairItWithList(this.state.PairItWithearchText)
  }


 

 

  


  fetchThePairItWithList = async (searchTxt?: string) => {

    const headerAssign = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPairWithListApiCallId = requestMessageAssign.messageId;
    if (searchTxt) {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getPairItWithSearchListEndPoint + searchTxt
      );
    } else {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getPairItWithListEndPoint
      );
    }

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerAssign)
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);
  };


 navigationToPairItWithDescription=(variant:InventoryItem)=>{
    const {AllPairedList}=this.state
    const formattedVariantList = AllPairedList
    .filter((item:InventoryItem) => item.attributes.id !== variant.attributes.id) 
    .map(item => ({ id: item.attributes.id, sku: item.attributes.sku }));

    
    const msg: Message = new Message(
        getName(MessageEnum.NavigationPairItWithDescriptionMessage)
      );
      msg.addData(getName(MessageEnum.PairItWithDataPayloadMessage), {variant,formattedVariantList});
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
 } 


  
  // Customizable Area End
}
