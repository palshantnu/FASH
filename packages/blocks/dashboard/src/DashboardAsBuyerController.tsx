import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";

// Customizable Area Start
import { CartResponses } from "../../landingpage/src/responses";
import { getUniqueId } from "react-native-device-info";
export interface Itemtype {
  id: string;
  type: string;
  attributes: ItemAttributes;
}
export interface WishlistType {
id:string;
type:string;
attributes:{
  id: number,
  account_id: number,
  name: string,
  shareable_id: number,
  wishlist_items:[],
  shareable_name:string
}
}

export interface ItemAttributes {
  name: string;
  description: string;
  catalogue_variants:[],
  primary_image:string,
  primary_price: string,
  is_wishlist: boolean;
}


// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  selected: number;
  modalTrue: boolean;
  ischeked: boolean[];
  stylistId:number |string;
  productType:string,
  productsArray:Itemtype[]|[];
  next:string|number|null;
  current:string|number
  wishlistData:WishlistType[]|[],
  selectedProductForWish:number|string
  loading:boolean;
  cartItemCount : string;
  stylistName:string;
  stylistWishlistId:string|number;
  ModalSearchValue:string;
  ModalsearchResult:WishlistType[]|[]
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class DashboardAsBuyerController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  createWishlistforStylist=""
  getProductDetailsApiCallId=""
  getNextProductDetailsApiCallId=""
  getWishListApiCallId=""
  addToWishListApiCallId=""
  removeWishlistitem=""
  cartApiCallId=""
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
    ];

    this.state = {
      selected: 1,
      modalTrue: false,
      ischeked: [false, false, false, false, false, false, false],
      stylistId:"",
      productType:"trending",
  productsArray:[],
  next:null,
  current:1,
  wishlistData:[],
  selectedProductForWish:0,
  loading:false,
  stylistName:"myname",
  stylistWishlistId:0,
  ModalSearchValue:"",
  ModalsearchResult:[],
  cartItemCount:""
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const responseId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      ) as string;
      this.responseHandleFunction(responseId,responseJson)
        if(this.getNextProductDetailsApiCallId===responseId)
          {
           this.setState({productsArray:[...this.state.productsArray,...responseJson.data],next:responseJson.meta.next_page,loading:false})
          }
        if(this.getWishListApiCallId==responseId)
          {
            let checkedArray=new Array(responseJson.data.length).fill(false);
           this.setState({wishlistData:responseJson.data,ischeked:checkedArray})
          }
          if(this.addToWishListApiCallId==responseId){
           this.setState({modalTrue:false,ischeked:new Array(this.state.wishlistData.length).fill(false)},()=>{
            this.getProductData(false)
           })
          }
          if(this.cartApiCallId==responseId)
            {
              this.handleCartResponse(responseJson)
            }
    }
    // Customizable Area End
  }
  async componentDidMount() {
    super.componentDidMount();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener('willFocus', async() => {
        let stylistId= await getStorageData("userID")
        let stylistName= await getStorageData("UserFullName")  
        this.setState({stylistId:stylistId,stylistName:stylistName},()=>{
          this.createWishlistForstylist()
        })
        this.getProductData(false)
        this.getCartCount()
      });
    }
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  responseHandleFunction=(responseId:string,responseJson:any)=>{
    if (this.createWishlistforStylist === responseId) {
      this.setState({stylistWishlistId:responseJson.data.id})
      this.getWishlist()
 }
 if(this.getProductDetailsApiCallId===responseId)
   {
     if(responseJson.errors)
       {
this.setState({productsArray:[]})
       }
       else{
         this.setState({productsArray:responseJson.data,next:responseJson.meta.next_page})

       }
       this.setState({loading:false})
   
   }
  }
createWishlistForstylist=async ()=>{
  let endpoint=configJSON.createWishlistForStylistEndPoint
 let method=configJSON.postMethod
 let body={
  data: {
    name: this.state.stylistName,
   shareable_id: this.state.stylistId
}
 }
 const token = await getStorageData("token", true);
 const header = {
  "Content-Type": configJSON.dashboarContentType,
  token:token,
};
  this.apiCall(endpoint,method,JSON.stringify(header),JSON.stringify(body) ,(messageId) => {
    this.createWishlistforStylist = messageId;
  })
}
getProductData=async(nextPage:boolean)=>{
  this.setState({loading:true})
  let selectedNumber=this.state.selected
  let productType
  if(selectedNumber==1)
    {
productType="trending"
    }
    else if(selectedNumber==2)
      {
productType="new_launches"
      }
      else{
productType="recommendations"
      }
  let endpoint=configJSON.getProductsEndPoint+`?page=${this.state.current}&per_page=10&sort=${productType}`
  let method=configJSON.getMethod

  const token = await getStorageData("token", true);
  const header = {
   "Content-Type": configJSON.dashboarContentType,
   token:token,
 };
 if(nextPage)
  {
    this.apiCall(endpoint,method,JSON.stringify(header),null ,(messageId) => {
      this.getNextProductDetailsApiCallId = messageId;
    })
  }
  else{
    this.apiCall(endpoint,method,JSON.stringify(header),null ,(messageId) => {
      this.getProductDetailsApiCallId = messageId;
    })
  }
  
}
getWishlist=async()=>{
  let endpoint=configJSON.getWishlist
  let method=configJSON.getMethod

  const token = await getStorageData("token", true);
  const header = {
   "Content-Type": configJSON.dashboarContentType,
   token:token,
 };

    this.apiCall(endpoint,method,JSON.stringify(header),null ,(messageId) => {
      this.getWishListApiCallId = messageId;
    })
}
addtoWishlist=async()=>{
  let endpoint=configJSON.addtoFavoiritesEndpoint
  let method=configJSON.postMethod

  const token = await getStorageData("token", true);
  const header = {
   "Content-Type": configJSON.dashboarContentType,
   token:token,
 };
 let wishListData=this.state.wishlistData
 let checkedOrNot=this.state.ischeked

 let requredArray:number[]=[]
 for(let i=0;i<wishListData.length;i++)
  {
    if(checkedOrNot[i])
      {
        requredArray.push(wishListData[i].attributes.id)
      }
  }
 
let body={
  data: {
    favouriteable_id: this.state.selectedProductForWish,
    wishlist_id :requredArray
}
}

    this.apiCall(endpoint,method,JSON.stringify(header),JSON.stringify(body) ,(messageId) => {
      this.addToWishListApiCallId = messageId;
    })
}
removeFromWishlist=async (myid:number|string)=>{
  let endpoint=`${configJSON.removeFavoiriteEndpoint}?favouriteable_id=${myid}`
  let method=configJSON.deleteMethod

  const token = await getStorageData("token", true);
  const header = {
   "Content-Type": configJSON.dashboarContentType,
   token:token,
 };
 let existingData=[...this.state.productsArray]
 for (let product of existingData) {
  if (product.id === myid) {
    product.attributes.is_wishlist = false;
  }
}
  this.setState({productsArray:existingData})
    this.apiCall(endpoint,method,JSON.stringify(header),null,(messageId) => {
      this.removeWishlistitem = messageId;
    })
}
fetchSomeMoreProductData=()=>{
  if(this.state.next)
    {
     
      this.setState({current:Number(this.state.current)+1,loading:true},()=>{
        this.getProductData(true)
      })
    }
}
  apiCall = (
    endpoint: string,
    method: string,
    header: unknown,
    body: unknown,
    setMessageId: (messageId: string) => void
  ) => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endpoint
    );
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), method);
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);
    setMessageId(message.messageId);
    runEngine.sendMessage(message.messageId, message);
  };


  selectLine = (number: number) => {
    this.setState({ selected: number },()=>{
     this.setState({current:1},()=>{
      this.getProductData(false)
     })
    });
  };
  parsePrice = (price: string) => {
    return "$" + parseFloat(price).toFixed(2);
  };
  makeModalTrueFalse = (isadded:boolean,id:number|string) => {
    if(!isadded)
      {
        this.setState({ modalTrue: !this.state.modalTrue,selectedProductForWish:id });
      }
      else{
        this.removeFromWishlist(id)
      }
  };
  makeModalFalse=()=>{
    this.setState({modalTrue:false})
  }
  goBack=()=>{
    this.props.navigation.goBack()
  }
  navigateTowishlist = () => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(getName(MessageEnum.NavigationTargetMessage), "stylistWishlist");
    msgs.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.NavigationPayLoadMessage), {fromDashboardAsBuyer:true,data:this.state.stylistWishlistId,stylistPersonal:true,clientWshlistName:""});
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(msgs)
  };
  ModalSearchTextChange=(text:string)=>{
this.setState({ModalSearchValue:text})
let searchResultArray=this.state.wishlistData.filter((el:WishlistType,index:number)=>{
  return  el.attributes?.shareable_name?.toLowerCase().includes(text.toLowerCase())
})
this.setState({ModalsearchResult:searchResultArray})
  }
  arrayForModalSearch=()=>{
    let wishlistArray:WishlistType[]
    if(this.state.ModalsearchResult.length==0)
  {
    wishlistArray=this.state.wishlistData
  }
  else{
    wishlistArray=this.state.ModalsearchResult
  }
  return wishlistArray
  }
  redirectToCategoryCatalogue=(screen:string)=>{
    const msg: Message = new Message(
      getName(MessageEnum.NavigationCategoriesMessage)
    );
    msg.addData(getName(MessageEnum.catalogueType), screen);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }
  btnNotificationRedirection = () => {
   // this.setState({hasNewNotification:false})
    const message = new Message(
      getName(MessageEnum.NavigationNotificationsBuyer)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  getCartCount = async () => {
    const token = await getStorageData("token", true);
    const header = {
      "Content-Type": configJSON.exampleApiContentType,
      token: token,
    };
    let method=configJSON.validationApiMethodType
    let body={
     data: {
       name: this.state.stylistName,
      shareable_id: this.state.stylistId
   }
    }
    const endpoint = configJSON.cartApiEndpoint +`?unique_token=${getUniqueId()}`;
     this.apiCall(endpoint,method,JSON.stringify(header),JSON.stringify(body) ,(messageId) => {
       this.cartApiCallId = messageId;
     })
   }

  handleCartResponse = (cart: CartResponses) => {
        this.setState({
          cartItemCount: cart.data ? String(cart.data.attributes.order_item_count) : "",
        });
  };
  navigateToCart = () => {
    const message = new Message(
      getName(MessageEnum.NavigationShoppingCartOrdersMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    runEngine.sendMessage(message.id, message);
  };
  orderPageRedirection = async (orderType:string)=>{
    let token = await getStorageData('token',true)
    const message: Message = new Message(
      getName(MessageEnum.NavigationOrderManagementBuyerOrderView)
    );

    message.addData(getName(MessageEnum.OrderTypeNavigationPayloadMessage), orderType);

    message.addData(getName(MessageEnum.navigationTokenMessage), token);

    message.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(message);
  }
  goToAllOrderRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationBuyerAllOrder)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }
  navigateToCatalogueHomeSearch = () => {
    const message = new Message(
      getName(MessageEnum.NavigationCatalogueHomeSearchMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };
  catalogueDetailRedirection = (catalogueId: string) => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationProductDetailsMessage)
    );
    message.addData(getName(MessageEnum.productIDMessage), catalogueId);
    message.addData(getName(MessageEnum.ShowByStoreId), false);
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };
  // Customizable Area End
}
