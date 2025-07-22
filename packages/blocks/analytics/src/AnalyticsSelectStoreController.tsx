import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { ResponseStore } from "./responseStore";
import { getStorageData,setStorageData } from "framework/src/Utilities";
import { removeStorageData } from "../../../framework/src/Utilities";
// Customizable Area Start

export interface StoreAttrProps {
    store_name:string;
    image:string|null;
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
  storeSelectedId:string;
  selectedName:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AnalyticsSelectStoreController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getSellerStoreApiCallId = "";
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
        storeSelectedId:'',
        selectedName:''
    };


    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

    async receive(_from: string, message: Message) {
    // Customizable Area Start
      if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
        this.getReceiveApiData(message)
      }
    // Customizable Area End
    }

  // Customizable Area Start

    async componentDidMount() {
        // Customizable Area Start
        super.componentDidMount();
        this.getAllStore();
        this.props.navigation.addListener("willFocus", () => {
          this.getAllStore()
        });
        // Customizable Area End
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
      }
    }

    myStoreSellerGetApiResponseSuccess = async(responseJson: ResponseStore[]) => {
      if (responseJson) {
        let localObject = [
          {
            id:'0',
            attributes:{
              store_name:'All Stores',
              image:null
            }
          }
        ]
        this.setState({
          allSellerStore: [...localObject,...responseJson],
          allSellerStoreUpdate: [...localObject,...responseJson],
        },async()=>{
          let storeId = await getStorageData('AnalyticsStoreDetail',true);
          this.setState({storeSelectedId:storeId.selectedId,selectedName:storeId.selectedName})
        });
      }
    };

    checkSpecialCharacter = (value: string) => {
        let regexSp = /[*|\":<>[\]{}`\\()';@&$%#]/;
        if (!regexSp.test(value)) {
          this.setState({ storeSearchTxt: value.trimStart() });
        }
    }

    selectStoreStatus = (storeId:string,storeName:string)=>{
      this.setState({storeSelectedId:storeId,selectedName:storeName})
    }

    dashBoardBackManage = ()=>{
      this.props.navigation.goBack()
    }

    getAllStore = async() => {
      this.setState({ loading: true });
      let token = await getStorageData('token',true)
      const header = {
        "Content-Type": configJSON.validationApiContentType,
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
        configJSON.validationApiMethodType
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

    btnStoreConfirm = ()=>{
      if(this.state.storeSelectedId === '0')
      {
        removeStorageData('AnalyticsStoreDetail')
      }else{
        let localObject = {
          selectedId :this.state.storeSelectedId,
          SelectedName:this.state.selectedName
        }
  
        setStorageData('AnalyticsStoreDetail',JSON.stringify(localObject))
      }
      this.props.navigation.goBack()
    }
  // Customizable Area End
}
