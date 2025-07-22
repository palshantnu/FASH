import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {
  ProductData, PairWith,
} from "../../productdescription3/src/response";
export const configJSON = require("./config");

import i18n from '../../../components/src/i18n/i18n.config'
import { showMessage } from "react-native-flash-message";
type Errors = | [
  {
    message: string;
  }
] | null

interface GetStoreProductsType {
  data: PairWith[]
  errors:  Errors
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
  storeProducts: PairWith[]
  isThisStoreProducts: boolean;
  storeProductsSearchText: string;
  isSelectAll: boolean;
  selectedItem: (string | number) [];
  catalougeDetails: ProductData;
  errorMsg: {
    errorHeader: string,
    errorTitle: string
  }
  deleteModal: boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SelectStoreProductsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getAllStoreProductsApiCallId: string = "";
  deleteProductsApiCallId: string = "";
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
      storeProducts: [
        
      ],
      isThisStoreProducts: false,
      storeProductsSearchText: "",
      isSelectAll: false,
      selectedItem: [],
      catalougeDetails: {
          addProductDetails: {
              brand: "",
              category: "",
              fit: "",
              gender: "",
              isListed: "",
              material: "",
              productCare: "",
              productDescription: "",
              productName: "",
              subCategory: "",
              subSubCategory: ""
          },
          variants: []
      },
      errorMsg: {
          "errorHeader": "",
          "errorTitle": ""
      },
      deleteModal: false,
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
      this.setState({ token: token }, () => {
        this.fetchTheStoreDetailsStoreProducts()
      });
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));

      if (apiRequestCallId) {
        if (apiRequestCallId === this.getAllStoreProductsApiCallId) {
          this.handleGetStorelistResponseStoreProducts(responseJson)
        }
        else if (apiRequestCallId === this.deleteProductsApiCallId) {
          if (responseJson && !responseJson.errors) {
            this.setState({ loading: false })
            this.setState({deleteModal: false})
            this.props.navigation.goBack()
            showMessage({
              message: i18n.t('productDeleteSuccessfully'),
              position: { top: 0 },
            });
          }
          else {
            this.setState({ loading: false })
            this.parseApiErrorResponse(responseJson);
          }
        }

      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.getTokenStoreProducts();
    this.props.navigation.addListener("willFocus", () => {
      this.getTokenStoreProducts();
    });
  }

  getTokenStoreProducts = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  handleGetStorelistResponseStoreProducts = (responseJson: GetStoreProductsType) => {
    if (responseJson && responseJson.data && !responseJson.errors) {
      this.setState({
        storeProducts: responseJson.data,
      })
      if (!this.state.storeProductsSearchText) {
        this.setState({ isThisStoreProducts: responseJson.data.length > 0 })
      }
    } else {
      this.setState({ storeProducts: [], selectedItem: [] });
    }
    this.setState({ loading: false })
  }

  updateTheSearchTextStoreProducts = (text: string) => {
    const newText = text.replace(/[^a-zA-Z0-9\s]/g, '').trimStart();
    this.setState({ storeProductsSearchText: newText });
  }

  searchAssignStoreStoreProducts = () => {
    this.fetchTheStoreDetailsStoreProducts(this.state.storeProductsSearchText)
  }

  toggleSelectAllStoreProducts = () => {
    const { storeProducts } = this.state;
    const { isSelectAll } = this.state;

    if (!isSelectAll) {
      const allIds = storeProducts.map((item: PairWith) => item.id);
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

  toggleItemSelectionStoreProducts = (id: string | number) => {
    const index = this.state.selectedItem.indexOf(id);
    if (index === -1) {
      this.setState({
        selectedItem: [...this.state.selectedItem, id],
      }, () => {
        if(this.state.selectedItem && this.state.selectedItem.length == this.state.storeProducts.length){
          this.setState({isSelectAll: true})
        }
      })
    } else {
      this.setState({
        selectedItem: (this.state.selectedItem.filter((item: string | number) => item !== id)),
        isSelectAll: false
      }, () => {
        if(this.state.selectedItem && this.state.selectedItem.length == this.state.storeProducts.length){
          this.setState({isSelectAll: true})
        }
      })
    }

  }

  fetchTheStoreDetailsStoreProducts = async (searchTxt?: string) => {
    const headerStoreProducts = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    const storeId = this.props.navigation.state && this.props.navigation.state.params.storeId
    this.getAllStoreProductsApiCallId = requestMessageAssign.messageId;
    if (searchTxt) {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getStoreProductsApiEndPoint + "?search=" + searchTxt + "&store_id=" + storeId
      );
    } else {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getStoreProductsApiEndPoint + "?store_id=" + storeId
      );
    }

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerStoreProducts)
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);
  };

  selectProductFunction = () => {
    if (this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params.comingFrom == 'bulkActions') {
      this.setState({ deleteModal: true })
    }
    else {
      this.props.navigation.navigate("AssignStores", { productIds: this.state.selectedItem, storeId: this.props.navigation.state && this.props.navigation.state.params.storeId })
    }

    this.setState({
      errorMsg: {
        errorHeader: "",
        errorTitle: ""
      }
    });
  }

  deleteProducts = () => {

    const payLoadDeleteProducts ={
      "catalogue_variant_ids": this.state.selectedItem
    }
    const headerDeleteProducts = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };

    const requestMessagedeleteProducts = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteProductsApiCallId = requestMessagedeleteProducts.messageId;

    requestMessagedeleteProducts.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.deleteProductsEndMethode
    );

    requestMessagedeleteProducts.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerDeleteProducts)
    );

    requestMessagedeleteProducts.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(payLoadDeleteProducts)
    );

    requestMessagedeleteProducts.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethodType
    );

    runEngine.sendMessage(requestMessagedeleteProducts.id, requestMessagedeleteProducts);
  }

  // Customizable Area End
}
