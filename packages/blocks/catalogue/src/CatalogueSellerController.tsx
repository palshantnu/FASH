import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum"
// Customizable Area Start
import { getStorageData } from "framework/src/Utilities";
export interface CatalogueItem {
  id: string;
  type: string;
  attributes: {
    primary_image: string | null;
    name: string;
    description: string;
    primary_price: string | null;
    
  };
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  token:string | null;
  loading: boolean;
  modalVisible: boolean;
  catalougeList:CatalogueItem[];
  current_page:number;
  next_page:number | null;
  total_pages:number;
  prev_page:number | null;
  page_size: number;
  catalogueSearchTxt:string;
  searchEmptyMessage:string;
  isProductList:boolean;
  currencyLocal:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CatalogueSellerController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getAllCatalogueApiCallId:any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionSaveMessage),
      // Customizable Area End
    ];

    this.state = {
      enableField: false,
      txtInputValue: "",
      txtSavedValue: "A",
      // Customizable Area Start
      loading: false,
      modalVisible: false,
      token:"",
      catalougeList: [],
      current_page:0,
      next_page:1,
      prev_page:0,
      total_pages:0,
      page_size:10,
      catalogueSearchTxt:'',
      searchEmptyMessage:'',
      isProductList:false,
      currencyLocal:''
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start

    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.setState({ txtSavedValue: value });
    }


    // Customizable Area Start
    this.getTokenAndValueId(message)
    if (
      getName(MessageEnum.RestAPIResponceMessage) === message.id &&
      this.getAllCatalogueApiCallId != null &&
      this.getAllCatalogueApiCallId ===
        message.getData(getName(MessageEnum.RestAPIResponceDataMessage))
    ) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (responseJson && !responseJson.errors && responseJson.data) {
        this.successData(responseJson)
      } else {
        this.setState({loading:false})
        let errorReponse = message.getData(
          getName(MessageEnum.RestAPIResponceErrorMessage)
        );
        this.parseApiCatchErrorResponse(errorReponse);
      }
    }
    // Customizable Area End
  }
  // Customizable Area Start
  async componentDidMount() {
   
    this.getToken();
   
   
    
    this.props.navigation.addListener("willFocus", async() => {
      this.getToken();
      let currencyGet = await getStorageData('currencyIcon',true)
      this.setState({
        currencyLocal:currencyGet,
        prev_page:0,
        current_page:0,
        next_page:1,
        total_pages:0, 
        catalougeList:[],
        catalogueSearchTxt:""
      },()=>  this.getListRequest('normal'))

      });
    
   
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  
  };

  getTokenAndValueId = (message:Message)=>{
    let token = '';

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      

      token = message.getData(getName(MessageEnum.SessionResponseToken));
      if (token) {
        this.setState({ token: token });
      } else {
        this.parseApiCatchErrorResponse( configJSON.loginAlertMessage);
       
      }
    }
    

  }

  priceConvertValue = (value: string | null) => {
    if (value === null) {
      return "0";
    } else return parseFloat(value);
  };

  defaultPaginationCatalogue = () =>
  {
    this.setState({
      prev_page:0,
      current_page:0,
      next_page:1,
      total_pages:0, 
      catalougeList:[]
    })
  }

  successData = (responseJson:any)=>{
    const data = responseJson.data
    
    if(data.length>0){
      this.setState({isProductList:true})
    }
    const prev_data = this.state.catalougeList

  
    const pagination = responseJson.meta
    let updatedCatalogueList;

    
    const addProductAlreadyInserted = prev_data.some((item:CatalogueItem) => item.type === "addProduct");
  
    if (data != null) {
     
      if (!addProductAlreadyInserted) {
        updatedCatalogueList = [{ type: "addProduct", id: 1 }, ...prev_data, ...data];
      } else {
        updatedCatalogueList = [...prev_data, ...data];
      }
  
      // Update the state with the new catalogue list
      this.setState({
        loading: false,
        catalougeList: updatedCatalogueList,
        next_page: pagination.next_page,
        prev_page: pagination.prev_page,
        total_pages: pagination.total_pages,
        current_page: pagination.current_page
      });
    }
    else{
        this.setState({loading:false,catalougeList:[],current_page:0,next_page:1,prev_page:0,total_pages:0})
    }
  }
  searchCatalogue = ()=>{
    this.setState({
      prev_page:0,
      current_page:0,
      next_page:1,
      total_pages:0, 
      catalougeList:[]
    },()=>{  this.getListRequest('normal',this.state.catalogueSearchTxt.trimStart())})
    
   
  }

  getListRequest = (callingType:string,searchTxt:string='') => {
    let nextPage = this.state.next_page
    if(callingType == 'normal')
    { if(this.state.total_pages === 1)
      {
        nextPage = 1
      }
        this.defaultPaginationCatalogue()
    }else{
        if(this.state.next_page == null)
        {
        return false
        }
    }
    this.setState({loading:true})
    if(nextPage){
    
    
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getAllCatalogueApiCallId = requestMessage.messageId;
  
    if(searchTxt.length ===0)
    {
    
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.catalogueListEndpoint+'?my_catalogues='+true+'&page='+nextPage+'&per_page='+this.state.page_size
      );
    }else{
      this.setState({searchEmptyMessage:searchTxt,next_page:nextPage})
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.catalogueListEndpoint+'?my_catalogues='+true+'&search='+searchTxt+'&page='+nextPage+'&per_page='+this.state.page_size
      );
    }
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
    }
  };

  updateTheSearchText=(text:string)=>{
    const newText = text.replace(/[^a-zA-Z0-9\s]/g, '').trimStart();
    this.setState({catalogueSearchTxt:newText});
    
  }

  redirectToProductdetails=(id:string)=>{
   
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPoductdescriptionSellerMessage)
    );
    msg.addData(getName(MessageEnum.ProductDescriptionSellerCatalogueId), id);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }

  navigationHandler = (navigateScreen: string) => {
    this.setState({modalVisible: false})
    this.props.navigation.navigate(navigateScreen)
  }
  // Customizable Area End
}
