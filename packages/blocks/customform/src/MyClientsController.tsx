import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Message } from "../../../framework/src/Message";
const navigation = require("react-navigation");

// Customizable Area Start
import { getStorageData } from "../../../framework/src/Utilities";

interface ClientAttributes{
    full_name:string;
    service_status:string
}
interface ClientListData{
  id: string,
  attributes: ClientAttributes
}
interface ClientList{
  data:ClientListData[],
  errors:object
}
interface APIPayloadType {
    endPoint: string;
    method: string;
    body?: object;
    token?: string;
    contentType?: string;
    type?: string;
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
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
    navigation: typeof navigation;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    // Customizable Area Start
    clientList:ClientListData[]
    isLoading: boolean;
    clientDetails:ClientDetailType,
    clientId:number|string
    first_name:string
    // Customizable Area End
}

interface SS {
    id: any;
}

export default class MyClientsController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    clientListApiCallID: string = '';
    createWishlistApiCallId:string="";
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
        clientList:[],
        isLoading: false,
        clientDetails:{id:"",type:"",attributes:{ id: 0,
          stylist_id: 0,
          payment_status:"",
          service_status: "",
          service_informations_id: 0,
          start_date:"",
          end_date: "",
          amount: "",
          buyer_name: "",
          service_information_name: ""}},
          clientId:0,
          first_name:""
        // Customizable Area End
        };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
        // Customizable Area Start
        // Customizable Area End
    }

    async componentDidMount() {
        super.componentDidMount();
        // Customizable Area Start
        this.getClientList()
        // Customizable Area End
    }
    async receive(from: string, message: Message) {
        // Customizable Area Start 
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
          const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
          );
    
          let responseJson = message.getData(
            getName(MessageEnum.RestAPIResponceSuccessMessage)
          );
          if (apiRequestCallId != null) {
              if (apiRequestCallId === this.clientListApiCallID) {
                this.clientListSuccessResponse(responseJson)
              }
              if (apiRequestCallId === this.createWishlistApiCallId) {
                this.createWishlistApiCallId = "";
          this.navigateTowishlist(responseJson.data.id)
              }
          }
          
        }
        // Customizable Area End
      }
    // Customizable Area Start
    clientListSuccessResponse = (response:ClientList) => {
        if(response.data && !response.errors){
          this.setState({ isLoading: false, clientList: response.data })
        }else{
          this.clientListFailureResponse(response) 
        }
        
    
      }
      clientListFailureResponse = (error: object) => {
        this.setState({ isLoading: false, clientList:[]})
      }
    
      apiCall = async (data:APIPayloadType) => {
        this.setState({ isLoading: true })
        let token = await getStorageData('token', true)
        const { contentType, method, endPoint, body } = data;
        const header = {
          "Content-Type": contentType,
          token: token,
        };
    
        const requestMessage = new Message(
          getName(MessageEnum.RestAPIRequestMessage)
        );
        requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage),JSON.stringify(header));
    
        requestMessage.addData(
          getName(MessageEnum.RestAPIResponceEndPointMessage),
          endPoint
        );
    
        requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage),method);
    
        body &&
          requestMessage.addData(
            getName(MessageEnum.RestAPIRequestBodyMessage),
            JSON.stringify(body)
          );
    
        runEngine.sendMessage(requestMessage.id, requestMessage);
        return requestMessage.messageId;
      };
    
      getClientList = async () => {
        this.setState({isLoading:true})
        this.clientListApiCallID = await this.apiCall({
          method: configJSON.validationApiMethodType,
          endPoint: 'account_block/hire_stylists/list_stylists_clients',
          contentType: configJSON.validationApiContentType,
        })
    
      }

      createWishlist =async (item:any) => {
        this.setState({clientId:item.id,first_name:item.attributes.first_name})
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
        data: { name:item.attributes.full_name,shareable_id:this.state.clientId },
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
    let wishlistName=this.state.first_name[0].toUpperCase() +this.state.first_name .slice(1)+"s"+" Wishlist"
    message.addData(getName(MessageEnum.wishlistIdMessage), {data:wishListId,fromWishlist:true,clientWshlistName:wishlistName});
    this.send(message);
   
  };
    // Customizable Area End

}