import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import {
   BusinessItem
} from "../../productdescription3/src/response";
export const configJSON = require("./config");

import i18n from '../../../components/src/i18n/i18n.config'
type Errors = | [
  {
    message: string;
  }
] | null

interface AssignStoreData {
  data: BusinessItem[];
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
  assignStore: BusinessItem[]
  isThisAssignStore: boolean;
  assignStoreSearchText: string;
  isSelectAll: boolean;
  selectedItem: (string | number) [];
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

export default class AssignStoresController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getAllStoreApiCallId: string = "";
  postAssignStoreId: string = "";
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
      isThisAssignStore: false,
      assignStoreSearchText: "",
      assignStore: [
        
      ],
      isSelectAll: false,
      errorMsg: {
          "errorHeader": "",
          "errorTitle": ""
      },
      selectedItem: [],
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
        if (apiRequestCallId === this.getAllStoreApiCallId) {
          this.handleGetStorelistResponseInAssign(responseJson)
        }
        if (apiRequestCallId === this.postAssignStoreId) {
          this.handleCreateCatalogueApiResponseInAssign(responseJson)
        }
      }
    }
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token }, () => {
        this.fetchTheStoreDetailsInAssign()
      });
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getTokenInAssign();
    this.props.navigation.addListener("willFocus", () => {
      this.getTokenInAssign();
    });
  }

  getTokenInAssign = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  handleGetStorelistResponseInAssign = (responseJson: AssignStoreData) => {
    if (responseJson && responseJson.data && !responseJson.errors) {
      const storeId = this.props.navigation.state && this.props.navigation.state.params.storeId
      const removeSelectedStore = responseJson.data.filter((x: BusinessItem) => x.id !== storeId)
      this.setState({
        assignStore: removeSelectedStore,
      })
    } 
    this.setState({ loading: false })
  }

  updateTheSearchTextInAssign = (text: string) => {
    const newText = text.replace(/[^a-zA-Z0-9\s]/g, '').trimStart();
    this.setState({ assignStoreSearchText: newText });

  }

  searchAssignStoreInAssign = () => {
    this.fetchTheStoreDetailsInAssign(this.state.assignStoreSearchText)
  }


  toggleItemSelectionInAssign = (id: string | number) => {
    const index = this.state.selectedItem.indexOf(id);
    if (index === -1) {
      this.setState({
        selectedItem: [...this.state.selectedItem, id],
      }, () => {
        if(this.state.selectedItem.length == this.state.assignStore.length){
          this.setState({isSelectAll: true})
        }
      })
    } else {
      this.setState({
        selectedItem: (this.state.selectedItem.filter((item: string | number) => item !== id)),
        isSelectAll: false
      },()=> {
        if(this.state.selectedItem.length == this.state.assignStore.length){
          this.setState({isSelectAll: true})
        }
      })
    }
  }

  handleCreateCatalogueApiResponseInAssign = (responseJson: AssignStoreData) => {
    if (responseJson && !responseJson.errors && !responseJson.error) {
      const msg = new Message(getName(MessageEnum.NavigationInventoryManagement));
      msg.initializeFromObject({
        [getName(MessageEnum.NavigationPropsMessage)]: this.props,
      });
      this.send(msg);
      showMessage({
        message: i18n.t('assignedProduct'),
        position: { top: 0 },
      });
    } else {
      if (responseJson.errors) {
        this.showAlert("Alert", JSON.stringify(responseJson.errors));
      }
    }
    this.setState({ loading: false })
  }

  toggleSelectAllInAssign = () => {
    const { assignStore } = this.state;
    const { isSelectAll } = this.state;

    if (!isSelectAll) {
      const allIds = assignStore.map((item: BusinessItem) => item.id);
      this.setState({
        selectedItem: allIds,
        isSelectAll: true
      });
    } else {
      this.setState({
        selectedItem: [],
        isSelectAll: false
      });
    }
  };


  fetchTheStoreDetailsInAssign = async (searchTxt?: string) => {

    const headerAssign = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllStoreApiCallId = requestMessageAssign.messageId;
    if (searchTxt) {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAllStoreApiEndPoint + "&search=" + searchTxt
      );
    } else {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAllStoreApiEndPoint
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


  assignStoresFunction = () => {
    if (this.state.selectedItem.length > 0) {
      this.submitAssignStoresAPI()
      this.setState({
        errorMsg: {
          errorHeader: "",
          errorTitle: ""
        }
      });
    }
    else {

      this.setState({
        errorMsg: {
          errorHeader: i18n.t('storeRequired'),
          errorTitle: i18n.t('pleaseSelectStore')
        }
      });

    }

  }

  submitAssignStoresAPI = () => {
    const headerSubmit = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };

    const productsIdsData = this.props.navigation && this.props.navigation.state && this.props.navigation.state.params.productIds
    const payLoadInSubmit = {
      "catalogue_variant_ids": productsIdsData,
      "store_ids": this.state.selectedItem
  }

    const requestMessageSubmit = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.postAssignStoreId = requestMessageSubmit.messageId;
      requestMessageSubmit.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.assignStoreEndpoint
      );

    requestMessageSubmit.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerSubmit)
    );

    requestMessageSubmit.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleAPiMethod
    );

    requestMessageSubmit.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payLoadInSubmit)
    );

    this.setState({ loading: true })
    runEngine.sendMessage(requestMessageSubmit.id, requestMessageSubmit);
  }
  
  // Customizable Area End
}
