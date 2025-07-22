import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ResponseStore } from "./responseStore";
// Customizable Area Start

export interface StoreAttrProps {
    store_name:string;
    image:string|null;
    is_open:boolean;
}

export interface AllOrderArrProps {
    id:string,
    attributes:StoreAttrProps
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
  allSellerStore:AllOrderArrProps[];
  allSellerStoreUpdate:ResponseStore[];
  token: string;
  loading:boolean;
  storeSearchTxt:string;
  allStoreOpenCloseStatus:boolean;
  storeSelectedIndex:number;
  storeOpenType:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class DashboardSelectStore extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getSellerStoreApiCallId = "";
  storeStatusUpadateApiCallId = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
        getName(MessageEnum.NavigationPayLoadMessage),
        getName(MessageEnum.SessionResponseMessage),
        getName(MessageEnum.RestAPIResponceMessage),
    ];

    this.state = {
        allSellerStore:[],
        allSellerStoreUpdate:[],
        token: "",
        loading:false,
        storeSearchTxt:'',
        allStoreOpenCloseStatus:true,
        storeSelectedIndex:-1,
        storeOpenType:'all'
    };


    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

    async receive(_from: string, message: Message) {
    // Customizable Area Start
      this.getReceiveTokenData(message)
      if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
        this.getReceiveApiData(message)
      }
    // Customizable Area End
    }

  // Customizable Area Start

    async componentDidMount() {
        // Customizable Area Start
        super.componentDidMount();
        this.getTokenStore();
        this.props.navigation.addListener("willFocus", () => {
            this.getTokenStore();
        });
        // Customizable Area End
    }


    getTokenStore = () => {
      const msgToken: Message = new Message(
          getName(MessageEnum.SessionRequestMessage)
      );
      this.send(msgToken);
    };

    getReceiveTokenData = (message:Message)=>{
      if (getName(MessageEnum.SessionResponseMessage) === message.id) {
        let token = message.getData(getName(MessageEnum.SessionResponseToken));
        runEngine.debugLog("TOKEN", token);
        this.setState({token:token})
        this.getAllStore(token);
      } 
    }

    getReceiveApiData = (message:Message)=>{
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (responseJson) {
        if (apiRequestCallId === this.getSellerStoreApiCallId) {
          if (responseJson.errors === undefined) {
            this.setState({allStoreOpenCloseStatus:responseJson.meta.all_businesses_open,loading:false})
            this.myStoreSellerGetApiResponseSuccess(responseJson.data);
          }
        }

        if (apiRequestCallId === this.storeStatusUpadateApiCallId) {
          this.setState({ loading: false });
          if (responseJson.errors === undefined) {
            this.getAllStore(this.state.token)
          }
        }
      }
    }

    myStoreSellerGetApiResponseSuccess = (responseJson: ResponseStore[]) => {
      if (responseJson) {
        this.setState({
          allSellerStore: responseJson,
          allSellerStoreUpdate: responseJson,
        });
      }
    };

    checkSpecialCharacter = (value: string) => {
        let regexSp = /[*|\":<>[\]{}`\\()';@&$%#]/;
        if (!regexSp.test(value)) {
          this.setState({ storeSearchTxt: value.trimStart() });
        }
    }

    toggleStoreStatus = (openType:string,storeStatus:boolean,storeId:string,storeIndex:number)=>{
      this.setState({storeSelectedIndex:storeIndex,storeOpenType:openType})
      this.storeStatusUpdate(storeStatus,storeId,openType)
    }

    storeDashboardRedirection = (storeInformation:{})=>{
        const msgNavigate: Message = new Message(
            getName(MessageEnum.NavigationDashboardSpecificStore)
          );
      
        msgNavigate.addData(getName(MessageEnum.ManageTimingStoreIdPayloadMessage), storeInformation);
    
        msgNavigate.addData(getName(MessageEnum.navigationTokenMessage), this.state.token);
    
        msgNavigate.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
        );
    
        this.send(msgNavigate);
    }

    dashBoardBackManage = ()=>{
      const msgNavigate: Message = new Message(
          getName(MessageEnum.NavigationSellerDashboard)
        );
      msgNavigate.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msgNavigate);
    }

    getAllStore = (token: string) => {
      this.setState({ loading: true });
      const header = {
        "Content-Type": configJSON.dashboarContentType,
        token: token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.getSellerStoreApiCallId = requestMessage.messageId;
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAllStoreApiEndPoint+'?approved='+true
      );
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.dashboarApiMethodType
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    };
  
    searchStore = () => {
      //passing the inserted text in textinput
      let text = this.state.storeSearchTxt.trimEnd();
      let data1 = this.state.allSellerStoreUpdate;
      if (data1 != undefined) {
        const newData = data1.filter(function(item) {
          //applying filter for the inserted text in search bar
          const itemData = item.attributes.store_name
            ? item.attributes.store_name.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        if (newData.length > 0) {
          this.setState({
            allSellerStore: newData,
          });
        } else {
          this.setState({
            allSellerStore: [],
          });
        }
      }
    };

    openCloseStatusText = (isOpen:boolean)=>{
      if(isOpen)
      {
        return 'Open'
      }else{
        return 'Closed'
      }
    }

    storeStatusUpdate = (statusSend: boolean,storeId:string,openType:string) => {
      this.setState({ loading: true });
      const header = {
        "Content-Type": configJSON.dashboarContentType,
        token: this.state.token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.storeStatusUpadateApiCallId = requestMessage.messageId;
      
      if(openType === 'all')
      {
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.storeStatusApiEndPoint+'?&status='+!statusSend
        );
      }else{
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          configJSON.storeStatusApiEndPoint+'?id='+storeId+"&status="+!statusSend
        );
      }
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
      );
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.dashboardPutApiMethodType
      );
      runEngine.sendMessage(requestMessage.id, requestMessage);
    };
  // Customizable Area End
}
