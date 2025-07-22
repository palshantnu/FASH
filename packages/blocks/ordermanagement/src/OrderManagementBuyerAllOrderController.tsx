import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData,setStorageData } from "framework/src/Utilities";
import moment from "moment";
import 'moment/locale/ar-dz';
import i18n from '../../../components/src/i18n/i18n.config'
// Customizable Area Start

export interface ItemAttributesOrderProps {
  quantity: number,
  catalogue_name: string,
  catalogue_variant_color: string,
  catalogue_variant_size:string,
  catalogue_variant_front_image:string|null
}
export interface ItemArrOrderProps {
    id:string,
    attributes:ItemAttributesOrderProps,
}

export interface DeliveryAttributesOrderProps {
  name:string,
  street: string,
  zip_code: string,
  area: string,
  block: string,
  city: string,
  house_or_building_number: string,
}

export interface DeliveryAddOrderProps {
  id:string,
  attributes:DeliveryAttributesOrderProps
}

export interface OrderAttributeOrdersProps {
  order_number:string,
  order_date:string,
  status:string,
  order_items:ItemArrOrderProps[],
  delivery_addresses:DeliveryAddOrderProps,
  placed_at:string
}

export interface AllOrderArrProps {
    id:string,
    attributes:OrderAttributeOrdersProps,
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
  allOrderArr:AllOrderArrProps[];
  allOrderArrUpdate:AllOrderArrProps[];
  token: string;
  loading:boolean;
  orderSearchTxt:string;
  filterSortValue:string;
  filterOrderStatus:string;
  filterOrderDate:string;
  languageOrder:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class OrderManagementBuyerAllOrderController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getBuyerAllOrderApiCallId = "";
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
        allOrderArr:[],
        allOrderArrUpdate:[],
        token: "",
        loading:false,
        orderSearchTxt:'',
        filterSortValue:'',
        filterOrderStatus:'',
        filterOrderDate:'',
        languageOrder:i18n.language
    };


    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

    async receive(_from: string, message: Message) {
    // Customizable Area Start
      if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
        this.handleAllOrderApiResponses(message);
      }
    // Customizable Area End
    }

  // Customizable Area Start

    async componentDidMount() {
        // Customizable Area Start
        super.componentDidMount();
        this.getBuyerAllOrder();

        this.props.navigation.addListener("willFocus", () => {
          this.getBuyerAllOrder();
        });
        // Customizable Area End
    }

    checkSpecialCharacter = (value: string) => {
        let regexSp = /[*|\":<>[\]{}`\\()';@&$%#]/;
        if (!regexSp.test(value)) {
          this.setState({ orderSearchTxt: value.trimStart() });
        }
    }

    orderDetailRedirect = async(orderId:string)=>{
      await setStorageData("orderId",orderId)
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationOrderBuyerSummary)
          );

        msgNavigation.addData(
        getName(MessageEnum.NavigationPropsMessage),
        this.props
        );
    
        this.send(msgNavigation);
    }
  
    getBuyerAllOrder = async() => {
      let token = await getStorageData('token',true)
      if(this.state.languageOrder === 'en')
      {
        moment.locale('en')
      }else{
        moment.locale('ar-dz')
      }
      let endpoint = `${configJSON.getBuyerOrderStatusApiEndPoint}?`;
      if(this.state.filterSortValue) {
        endpoint += `sort_by=${this.state.filterSortValue}&`;
      }
      if(this.state.filterOrderStatus) {
        endpoint += `status=${this.state.filterOrderStatus}&`;
      }
      if(this.state.filterOrderDate) {
        endpoint += `order_date=${this.state.filterOrderDate}&`;
       }
        this.setState({loading:true,token:token})
        const header = {
            "Content-Type": configJSON.apiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );
  
        this.getBuyerAllOrderApiCallId = requestMessage.messageId;
  
        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            endpoint
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

    handleAllOrderApiResponses = (message: Message) => {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      if (responseJson) {
        if (apiRequestCallId === this.getBuyerAllOrderApiCallId) {
          if(responseJson.errors === undefined)
          {
              this.setState({allOrderArr:responseJson.data,allOrderArrUpdate:responseJson.data,loading:false})
          }else{
            this.setState({loading:false})
          }
        }
      }
    }

    dateFormatChangeOrder = (date:string) => {
      let dateUpdate = moment(date).format("DD MMM YYYY");
      return dateUpdate
    }

    searchBuyerOrder = ()=>{
      let text = this.state.orderSearchTxt.trimEnd();
      let data1 = this.state.allOrderArrUpdate;
      if (data1 != undefined) {
        const newData = data1.filter((item) => {
          //applying filter for the inserted text in search bar
          const itemData = item.attributes.order_number
            ? item.attributes.order_number.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        if (newData.length > 0) {
          this.setState({
            allOrderArr: newData,
          });
        } else {
          this.setState({
            allOrderArr: [],
          });
        }
      }
    }

    firstLetterCapital = (statusGet:string)=>{
      return statusGet[0].toUpperCase() + statusGet.slice(1)
    }
    
    onFilterApiCall = (filterSort:string,filterOrderStatus:string,filterOrderDate:string) =>{
      this.setState({filterSortValue:filterSort,filterOrderStatus:filterOrderStatus,filterOrderDate:filterOrderDate,loading:true},()=>{
        this.getBuyerAllOrder()
      })
      
    }

    onFilterOrderScreen = () =>{
      const message = new Message(getName(MessageEnum.NavigationMessage));
      message.addData(getName(MessageEnum.NavigationTargetMessage), "FiltersOrders");
      const raiseMessage: Message = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
        )
      message.addData(getName(MessageEnum.NavigationPropsMessage),this.props)
      raiseMessage.addData(getName(MessageEnum.SessionResponseData), {
        param1: this.onFilterApiCall
      });
      message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
      this.send(message)
      }
  // Customizable Area End
}
