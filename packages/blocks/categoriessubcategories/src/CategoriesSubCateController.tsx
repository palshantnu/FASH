import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import i18n from '../../../components/src/i18n/i18n.config';
import { createRef, MutableRefObject } from "react";
import {
  Category,
  SubCategory,
  SubCategorySuccessResponse,
  SubSubCategory,
} from "./response";

interface NavEvent {
  remove: () => unknown;
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
  categoryArr: Category[];
  categorySelectStatus: string;
  subCategoryArr: SubCategory[];
  subCategorySearchTxt: string;
  loading: boolean;
  token: string;
  selectedCategoryId: number;
  prevPage: number;
  currentPage: number;
  nextPage: number | null;
  totalPages: number;
  pageSize: number;
  subCategoryId: string;
  subSubCategoryArr: SubSubCategory[];
  subSubCategoryUpdateArr: SubSubCategory[];
  selectedSubCategoryId: number;
  selectedSubCategoryName: string;
  storeId: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CategoriesSubCateController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getSubCategoryApiCallId = "";
  getSubSubCategoryApiCallId = "";
  isFocused: MutableRefObject<boolean | null>;
  willFocusListener: NavEvent | null = null;
  willBlurListener: NavEvent | null = null;
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      categoryArr: [],
      categorySelectStatus: "",
      subCategoryArr: [],
      subCategorySearchTxt: "",
      loading: false,
      token: "",
      selectedCategoryId: 0,
      prevPage: 0,
      currentPage: 0,
      nextPage: null,
      totalPages: 0,
      pageSize: 10,
      subCategoryId: "",
      subSubCategoryArr: [],
      subSubCategoryUpdateArr: [],
      selectedSubCategoryId: 0,
      selectedSubCategoryName: "",
      storeId: "",
    };

    this.isFocused = createRef();
    this.isFocused.current = false;

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount(): Promise<void> {
    this.getToken();
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.isFocused.current = true;
        this.getToken();
      }
    );
    this.willBlurListener = this.props.navigation.addListener(
      "willBlur",
      () => {
        this.isFocused.current = false;
      }
    );
  }

  componentWillUnmount = async () => {
    this.willFocusListener!.remove();
    this.willBlurListener!.remove();
  };

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    this.handleToken(message);

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      this.handleNavigationPayload(message);
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      const errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      );
      this.handleRestApiResponse(apiRequestCallId, responseJson, errorReponse);
    }
    // Customizable Area End
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  handleToken = (message: Message) => {
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token });
    }
  };

  handleNavigationPayload = (message: Message) => {
    const categoryId = message.getData(getName(MessageEnum.categoryIdMessage));
    const storeId = message.getData(getName(MessageEnum.ShowByStoreId));
    const categoryArr = message.getData(
      getName(MessageEnum.categoryArrMessage)
    );
    const categoryName = message.getData(
      getName(MessageEnum.categoryNameMessage)
    );
    if (categoryId != undefined) {
      let localObject = {
        name: categoryName as string,
        id: categoryId as number,
      };
      this.setState({
        selectedCategoryId: categoryId,
        categoryArr: categoryArr,
        storeId: storeId ?? "",
      });
      this.selectStatus(localObject);
    }
  };

  handleRestApiResponse = (
    apiId: string,
    _responseJson: unknown,
    errorReponse: unknown
  ) => {
    const responseJson = _responseJson as
      | { data: unknown }
      | { errors: unknown };
    if (responseJson && !("errors" in responseJson)) {
      if (apiId === this.getSubCategoryApiCallId) {
        const response = responseJson as SubCategorySuccessResponse;
        this.setState({ loading: false, subCategoryArr: response.data }, () => {
          if (this.state.subCategoryArr.length) {
            this.selectSubSubCategoryStatus({
              name: this.state.subCategoryArr[0].attributes.name,
              id: this.state.subCategoryArr[0].attributes.id,
            });
          }
        });
      }

      if (apiId === this.getSubSubCategoryApiCallId) {
        const response = responseJson as { data: SubSubCategory[] };
        this.setState({
          loading: false,
          subSubCategoryArr: response.data,
          subSubCategoryUpdateArr: response.data,
        });
      }
    } else if (errorReponse) {
      this.setState({ loading: false });
      this.parseApiErrorResponse(errorReponse);
    }
  };

  selectStatus = (item: { name: string; id: number }) => {
    this.setState({
      categorySelectStatus: item.name,
      selectedCategoryId: item.id,
      subSubCategoryArr: [],
    });
    this.getSubCategorires(item.id, this.state.token,i18n.language);
  };

  selectSubSubCategoryStatus = (item: { name: string; id: number }) => {
    this.setState({
      selectedSubCategoryName: item.name,
      selectedSubCategoryId: item.id,
      subCategorySearchTxt: "",
    });
    this.getSubSubCategory(item.id,i18n.language);
  };

  getSubCategorires = async (categoryId: number, token: string,languageGet:string) => {
    if ((this.state.storeId && !token) || !this.isFocused.current) {
      return;
    }
    const header = {
      "Content-Type": configJSON.categoryApiContentType,
      token: token,
    };
    let endpoint = ''
    if(languageGet ==='ar')
    {
      endpoint = this.state.storeId
      ? configJSON.categoryByStoreIdEndpoint +
        "?get_feature=sub-category" +
        `&store_id=${this.state.storeId}` +
        `&category_id=${categoryId}`+'&language=arabic'
      : configJSON.subCategoryAPIEndPoint + `?category_id=${categoryId}`+'&language=arabic';
    }else{
      endpoint = this.state.storeId
      ? configJSON.categoryByStoreIdEndpoint +
        "?get_feature=sub-category" +
        `&store_id=${this.state.storeId}` +
        `&category_id=${categoryId}`
      : configJSON.subCategoryAPIEndPoint + `?category_id=${categoryId}`;
    }
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSubCategoryApiCallId = requestMessage.messageId;
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
      configJSON.httpGetType
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  getSubSubCategory = async (subCategoryId: number,languageUpdate:string) => {
    let endPointSubSub = '';
    if(languageUpdate === 'en')
    {
      endPointSubSub = this.state.storeId ? configJSON.categoryByStoreIdEndpoint +
        "?get_feature=sub-sub-category" +`&store_id=${this.state.storeId}` +
        `&category_id=${this.state.selectedCategoryId}` +`&sub_category_id=${subCategoryId}` : configJSON.subSubCategoryAPIEndPoint +"?sub_category_id=" +
        subCategoryId;
    }else{
      endPointSubSub = this.state.storeId ? configJSON.categoryByStoreIdEndpoint +"?get_feature=sub-sub-category" +`&store_id=${this.state.storeId}` +`&category_id=${this.state.selectedCategoryId}` +`&sub_category_id=${subCategoryId}`+'&language=arabic' : configJSON.subSubCategoryAPIEndPoint +"?sub_category_id=" +subCategoryId+'&language=arabic';
    }
    
    const header = {
      "Content-Type": configJSON.categoryApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.getSubSubCategoryApiCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPointSubSub
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.httpGetType
    );
    this.setState({ loading: true });
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  };

  subCategoryRedirection = (subCategoryData: SubCategory) => {
    const msg: Message = new Message(
      getName(MessageEnum.NavigationCatalogueMessage)
    );
    msg.addData(getName(MessageEnum.SubCategoryIdMessage), subCategoryData.id);
    msg.addData(
      getName(MessageEnum.subCategoryNameMessage),
      subCategoryData.attributes.name
    );
    msg.addData(getName(MessageEnum.ShowByStoreId), this.state.storeId);
    msg.addData(getName(MessageEnum.navigationTokenMessage), this.state.token);
    msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msg);
  };

  searchSubSubCategory = (searchTxt: string) => {
    //passing the inserted text in textinput
    this.setState({ subCategorySearchTxt: searchTxt });
    let text = searchTxt.trimEnd();
    let data1 = this.state.subSubCategoryUpdateArr;
    if (data1 != undefined) {
      const newData = data1.filter((item) => {
        //applying filter for the inserted text in search bar
        const itemData = item.attributes.name
          ? item.attributes.name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      if (newData.length > 0) {
        this.setState({
          subSubCategoryArr: newData,
        });
      } else {
        this.setState({
          subSubCategoryArr: [],
        });
      }
    }
  };

  // Customizable Area End
}
