import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData,removeStorageData,setStorageData } from "framework/src/Utilities";
// Customizable Area Start

export interface ProductAttrProps {
    name:string;
    primary_image:string|null;
    is_open:boolean;
}

export interface AllProductArrProps {
    id:string,
    attributes:ProductAttrProps
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
  allSellerProduct:AllProductArrProps[];
  allSellerProductUpdate:AllProductArrProps[];
  token: string;
  loading:boolean;
  productSearchTxt:string;
  productSelectedIndex:number;
  productSelectedId:string;
  productSelectedName:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AnalyticsSelectProductController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getSellerProductApiCallId = "";
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
        allSellerProduct:[],
        allSellerProductUpdate:[],
        token: "",
        loading:false,
        productSearchTxt:'',
        productSelectedIndex:-1,
        productSelectedId:'',
        productSelectedName:''
    };


    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

    async receive(_from: string, message: Message) {
    // Customizable Area Start
      if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
        this.getProductReceiveApiData(message)
      }
    // Customizable Area End
    }

  // Customizable Area Start

    async componentDidMount() {
        // Customizable Area Start
        super.componentDidMount();
        this.getAllProduct();
        this.props.navigation.addListener("willFocus", () => {
          this.getAllProduct()
        });
        // Customizable Area End
    }


    myProductSellerGetApiResponseSuccess = async(responseJson: AllProductArrProps[]) => {
      if (responseJson) {
        this.setState({
          allSellerProduct: responseJson,
          allSellerProductUpdate: responseJson,
        },async()=>{
          let productData = await getStorageData('AnalyticsProductDetail',true);
          this.setState({productSelectedId:productData.productSelectedId,productSelectedName:productData.productSelectedName})
        });
      }
    };

    getProductReceiveApiData = (message:Message)=>{
        let responseJson = message.getData(
          getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );
        
        if (responseJson) {
          if (apiRequestCallId === this.getSellerProductApiCallId) {
            if (!responseJson.errors) {
              this.setState({loading:false})
              this.myProductSellerGetApiResponseSuccess(responseJson.data);
            } else{
              this.setState({loading:false})
            }
          }
        }
    }

    checkSpecialCharacterP = (value: string) => {
        let regexSpP = /[*|\":<>[\]{}`\\()';@&$%#]/;
        if (!regexSpP.test(value)) {
          this.setState({ productSearchTxt: value.trimStart() });
        }
    }

    selectProductStatus = (productId:string,productName:string)=>{
      this.setState({productSelectedId:productId,productSelectedName:productName})
    }

    getAllProduct = async() => {
      this.setState({ loading: true });
      let token = await getStorageData('token',true)
      const header = {
        "Content-Type": configJSON.validationApiContentType,
        token: token,
      };
      const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
      );
  
      this.getSellerProductApiCallId = requestMessage.messageId;
  
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAllProductApiEndPoint
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
  
    searchProduct = () => {
      //passing the inserted text in textinput
      let text = this.state.productSearchTxt.trimEnd();
      let data1 = this.state.allSellerProductUpdate;
      if (data1 != undefined) {
        const newData = data1.filter(function(item) {
          //applying filter for the inserted text in search bar
          const itemData = item.attributes.name
            ? item.attributes.name.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        if (newData.length > 0) {
          this.setState({
            allSellerProduct: newData,
          });
        } else {
          this.setState({
            allSellerProduct: [],
          });
        }
      }
    };

    btnProductConfirm = ()=>{
      if(this.state.productSelectedId === '0')
      {
        removeStorageData('AnalyticsProductDetail')
      }else{
        let localObject = {
          productSelectedId :this.state.productSelectedId,
          productSelectedName:this.state.productSelectedName
        }
  
        setStorageData('AnalyticsProductDetail',JSON.stringify(localObject))
      }
      this.props.navigation.goBack()
    }
  // Customizable Area End
}
