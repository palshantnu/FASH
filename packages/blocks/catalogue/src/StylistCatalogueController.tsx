import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Dimensions } from "react-native";
import { getStorageData } from "framework/src/Utilities";
import { PlanList } from "./response";
// Customizable Area Starts
import i18n from "../../../components/src/i18n/i18n.config";
import { State } from 'react-native-gesture-handler';
interface Route {
  key: string;
  title: string;
}

interface Plan {
    id: number;
    title: string;
  }
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
  // Customizable Area Start
  index: number;
  routes: Route[];
  layout: {};
  isVisibleModal: boolean;
  isRemoveModal: boolean;
  plan: Plan[];
  token: string;
  loading: boolean;
  getPlan: PlanList[],
  deletePlan: boolean,
  selectedPlanId: string;
  getParticularList: any,
  showToast: boolean;
  toastTimeout: any;
  modalVisible:boolean;
  isProductList:boolean;
  catalougeList:CatalogueItem[];
  current_page:number;
  next_page:number | null;
  total_pages:number;
  prev_page:number | null;
  page_size: number;
  updateLocalCurrency:string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class StylistCatalogueController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getPlanListId: string = "";
    deletePlanListId: string = "";
    getParticularPlanId: string = "";
    getAllCatalogueApiCallId: string = "";
    startX = 0;
    startY = 0;
    swipeDetected = false;
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];
    const { width, height } = Dimensions.get("window");
    this.state = {
      isProductList:false,
      index: 0,
      routes: [
        { key: "first", title: i18n.t("stylingServicesText") },
        { key: "second", title: i18n.t("productSourcingText") },
        { key: "third", title: i18n.t("cataloguesText") }
      ],
      layout: { width, height },
      isVisibleModal: false,
      isRemoveModal: false,
      plan: [
        { id: 1, title:  i18n.t("weeklyPlan") },
        { id: 2, title:  i18n.t("monthlyPlan") },
        { id: 3, title:  i18n.t("quarterlyPlan") }
      ],
      token: '',
      modalVisible:false,
      loading: false,
      getPlan:  [],
      deletePlan: false,
      selectedPlanId: "",
      getParticularList: "",
      showToast: false,
      toastTimeout: null ,
      catalougeList:[],
      current_page:0,
      next_page:1,
      prev_page:0,
      total_pages:0,
      page_size:10,
      updateLocalCurrency:''
      // Customizable Area End
    };

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    
    // Customizable Area Start

    // Customizable Area End
  }
  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
        const token = message.getData(getName(MessageEnum.SessionResponseToken));
        this.setState({ token: token }, ()=>{
            this.getPlanList();
        });
        
      }
      if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
        const apiRequestCallId = message.getData(
          getName(MessageEnum.RestAPIResponceDataMessage)
        );
        let responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage)
        );
      this.setApiResponse(apiRequestCallId,responseJson)
       
        }
    // Customizable Area End
  }

  // Customizable Area Start
  setApiResponse=(apiRequestCallId:string,responseJson:{success:boolean,data:[],errors:string})=>{
  
  if (apiRequestCallId === this.getPlanListId) {
    this.setState({
      getPlan: responseJson.data
    });
    this.setState({loading: false})
  }
  if (apiRequestCallId === this.deletePlanListId) {
      this.setState({
        deletePlan: responseJson.success
      });
      if(responseJson){
          this.getPlanList();
      }
    }
    if (apiRequestCallId === this.getParticularPlanId) {
      this.setState({
        getParticularList: responseJson?.data
      });
      if(responseJson?.data){
          this.fetchPlanData();
      }
    }
    if (apiRequestCallId === this.getAllCatalogueApiCallId &&  !responseJson.errors) {
      this.successData(responseJson)
    }
  }
  async componentDidMount() {
    this.getToken();
    this.props.navigation.addListener("willFocus", async() => {
      this.getToken();
      let currencyGet = await getStorageData('currencyIcon',true)
      this.setState({
        prev_page:0,
        current_page:0,
        next_page:1,
        total_pages:0, 
        catalougeList:[],
        updateLocalCurrency:currencyGet
        
      },()=>  this.getListRequest('normal'))
    });
  }
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
  getListRequest = (callingType:string) => {
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
  
  
    
      requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.catalogueListEndpoint+'?my_catalogues='+true+'&page='+nextPage+'&per_page='+this.state.page_size
      );
   
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
  redirectToProductdetails=(id:string)=>{
   
    const msg: Message = new Message(
      getName(MessageEnum.NavigationPoductdescriptionSellerMessage)
    );
    msg.addData(getName(MessageEnum.ProductDescriptionSellerCatalogueId), id);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  }
  priceConvertValue = (value: string | null) => {
    if (value === null) {
      return "0";
    } else return parseFloat(value);
  };
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
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  toggleModal = () => {
    this.setState({ isVisibleModal: !this.state.isVisibleModal });
  };

  removeModal = (id: string) => {
    this.setState({ isRemoveModal: !this.state.isRemoveModal, selectedPlanId: id });
  };

  setIndex = (index: number) => {
    this.setState({ index });
  };

  handleStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, translationY } = event.nativeEvent;
  
      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 0) {
          this.handleSwipeLeft();
        } else {
          this.handleSwipeRight();
        }
      }
    }
  };

  handleResponderStart = (event : any) => {
    const { pageX, pageY } = event.nativeEvent;
    this.startX = pageX;
    this.startY = pageY;
    this.swipeDetected = false; // Reset swipe detection
  };

  handleResponderMove = (event : any) => {
    if (this.swipeDetected) return; // Prevent multiple detections for the same swipe

    const { pageX, pageY } = event.nativeEvent;
    const diffX = pageX - this.startX;
    const diffY = pageY - this.startY;

    // Ignore vertical movements
    if (Math.abs(diffY) > Math.abs(diffX)) {
      return;
    }

    if (diffX > 40) {
      console.log('Right Swipe');
      this.handleSwipeLeft();
      this.swipeDetected = true; // Mark swipe as detected
    } else if (diffX < -40) {
      console.log('Left Swipe');
      this.handleSwipeRight();
      this.swipeDetected = true; // Mark swipe as detected
    }
  };

  handleResponderRelease = () => {
    // Reset values after gesture ends
    this.startX = 0;
    this.startY = 0;
    this.swipeDetected = false;
  };


  handleSwipeRight = () => {
    if (this.state.index === 2) {
      return;
    }
    this.setState({ index: this.state.index + 1 });
  }

  handleSwipeLeft = () => {
    if (this.state.index === 0) {
      return;
    }
    this.setState({ index: this.state.index - 1 });
  }

  handleShowToast = () => {
    this.setState({ showToast: true });
    const timeout = setTimeout(() => {
      this.setState({ showToast: false, toastTimeout: null });
    }, 3000);
    this.setState({ toastTimeout: timeout });
  };

  async componentWillUnmount() {
    if (this.state.toastTimeout) {
      clearTimeout(this.state.toastTimeout);
    }
  }

  handlePlanPress = (planId: number) => {
    this.setState({ isVisibleModal: !this.state.isVisibleModal });
    const selectedPlan = this.state.plan.find((plan) => plan.id === planId);
    if (!selectedPlan) {
      console.error("Plan not found");
      return;
    }
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "StylistWeeklyPlan"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(
      getName(MessageEnum.LoginOptionsNavigationDataMessage),
      {planTitle: selectedPlan.title }
    );
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    runEngine.sendMessage("MergeEngineUtilities", msgs);
  };

  getPlanList = async () => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPlanListId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.selectPlan
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);

  }

  deletePlanList = async (id: string) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deletePlanListId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.selectPlan+`/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteMethod
    );
    this.removeModal(id);
    this.handleShowToast();
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getPlanForId = async (id: any) => {
    const header = {
      "Content-Type": configJSON.productApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getParticularPlanId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.selectPlan+`/${id}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.apiMethodTypeGet
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);

  }

  fetchPlanData = () => {
    const msgs = new Message(getName(MessageEnum.NavigationMessage));
    msgs.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "StylistWeeklyPlan"
    );
    msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(
      getName(MessageEnum.PlayLoadSignupId),
      {planData: this.state.getParticularList }
    );
    msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    runEngine.sendMessage("MergeEngineUtilities", msgs);
  };

  handleBack = ()=> {
    this.props.navigation.goBack();
  }
  handleBackPage = ()=> {
    this.props.navigation.navigate('StylistLanding')
  }
  navigationHandler = (navigateScreen: string) => {
    this.setState({modalVisible: false})
    this.props.navigation.navigate(navigateScreen)
  }
  changeModelStatus(){
    this.setState({ modalVisible: !this.state.modalVisible })
  }
  // Customizable Area End
}
