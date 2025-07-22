import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { InventoryItem } from "./PairItWithController";
import { showMessage } from "react-native-flash-message";

export interface DropDownListType {
  id: string;
  sku: string
}
export const configJSON = require("./config");

type Errors = | [
  {
    message: string;
  }
] | null

interface PairItWithData {
  data: InventoryItem[];
  errors: Errors;
  error: string;
  meta: { message: string }
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
  pairWithDropDownList: DropDownListType[]
  firstSelectedSku:  null|string
  secondSelectedSku: null|string
  thirdSelectedSku: null|string
  fourthSelectedSku: null|string
  fifthSelectedSku:null|string
  pairedVariantList: InventoryItem[]
  selectedVarinatData: InventoryItem | null
  errorMsg: {
    errorHeader: string,
    errorTitle: string
  },
  
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PairItWithDescriptionController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getPairedVariantLIstApiCallId: string = "";
  putPairedVariantApiCallId: string = "";

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

      pairWithDropDownList: [],
      firstSelectedSku: null,
      secondSelectedSku: null,
      thirdSelectedSku: null,
      fourthSelectedSku: null,
      fifthSelectedSku: null,
      pairedVariantList: [],
      selectedVarinatData: null,
      errorMsg: {
        "errorHeader": "",
        "errorTitle": ""
      },
    
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

      const paitwithListData = message.getData(
        getName(MessageEnum.PairItWithDataPayloadMessage));

      this.setState({
        pairWithDropDownList: paitwithListData.formattedVariantList,
        selectedVarinatData: paitwithListData.variant
      }, () => { this.fetchThePairItWithList() })
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));
      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      if (errorReponse) {
        this.setState({ loading: false })
        showMessage({
          message: 'something went wrong',
          position: { top: 0 },
        });
      }
this.handleApiResponseCallId(apiRequestCallId,responseJson)
     
    }
    if (!this.state.token) {
      if (getName(MessageEnum.SessionResponseMessage) === message.id) {
        const token = message.getData(getName(MessageEnum.SessionResponseToken));
        this.setState({ token: token });
      }
    }

    // Customizable Area End
  }

  // Customizable Area Start

handleApiResponseCallId=(apiRequestCallId:string,responseJson:PairItWithData)=>{
  if (apiRequestCallId && responseJson) {
    if (apiRequestCallId === this.getPairedVariantLIstApiCallId) {
      this.handleGetPairedVariantListResponse(responseJson)
    }else
    if (apiRequestCallId === this.putPairedVariantApiCallId) {
      this.handleUpdatePairItWithResponse(responseJson)
    }
    this.setState({ loading: false })

  }
}


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

  handleGetPairedVariantListResponse = (responseJson: PairItWithData) => {
    if (responseJson && responseJson.data && !responseJson.errors) {


      responseJson.data.forEach((item, index) => {
        if (index === 0) {
          this.setState({ firstSelectedSku: item.attributes.id });
        } else if (index === 1) {
          this.setState({ secondSelectedSku: item.attributes.id });
        } else if (index === 2) {
          this.setState({ thirdSelectedSku: item.attributes.id });
        } else if (index === 3) {
          this.setState({ fourthSelectedSku: item.attributes.id });
        } else if (index === 4) {
          this.setState({ fifthSelectedSku: item.attributes.id });
        }
      });
      this.setState({
        pairedVariantList: responseJson.data,
      })
    }
    this.setState({ loading: false })
  }

  handleUpdatePairItWithResponse = (responseJson: PairItWithData) => {

    if (responseJson && responseJson.data && responseJson.meta.message && !responseJson.error) {
      showMessage({
        message: responseJson.meta.message,
        position: { top: 0 },
      });
    this.props.navigation.goBack()
    } else if (responseJson.error) {
      showMessage({
        message: responseJson.error,
        position: { top: 0 },
      });
    }

  }








  fetchThePairItWithList = async () => {

    const headerAssign = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getPairedVariantLIstApiCallId = requestMessageAssign.messageId;

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPairedVariantList + this.state.selectedVarinatData?.attributes.id + "/paired_variants"
    );


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

  updateThePairItWithList = async (filteredArray:(string | null)[]) => {

    const headerAssign = {
      "Content-Type": configJSON.validationApiContentType,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.putPairedVariantApiCallId = requestMessageAssign.messageId;

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getPairedVariantList + this.state.selectedVarinatData?.attributes.id + "/pair_with"
    );


    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerAssign)
    );

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putMethod
    );
 

 
    const body = { pair_variant_ids: filteredArray }
    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(body)
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);
  };

setErrorStateAsEmpty=()=>{
  this.setState({
    errorMsg: {
      errorHeader: "",
      errorTitle: ""
    }
  });
}

  handleSelectFirstSku = (item: { sku: string; id: string }) => {
    this.setState({
      firstSelectedSku: item.id,

    });
    this.setErrorStateAsEmpty()
  };

  handleSelectSecondSku = (item: { sku: string; id: string }) => {
    this.setState({
      secondSelectedSku: item.id,

    });
    this.setErrorStateAsEmpty()
  };

  handleSelectThirdSku = (item: { sku: string; id: string }) => {
    this.setState({
      thirdSelectedSku: item.id,

    });
    this.setErrorStateAsEmpty()
  };

  handleSelectFourthSku = (item: { sku: string; id: string }) => {
    this.setState({
      fourthSelectedSku: item.id,

    });
    this.setErrorStateAsEmpty()
  };

  handleSelectFifthSku = (item: { sku: string; id: string }) => {
    this.setState({
      fifthSelectedSku: item.id,

    });
    this.setErrorStateAsEmpty()
  };

  handleSaveButton = () => {
    const { firstSelectedSku, secondSelectedSku, thirdSelectedSku, fourthSelectedSku, fifthSelectedSku } = this.state;


    let selectedSkus = [firstSelectedSku, secondSelectedSku, thirdSelectedSku, fourthSelectedSku, fifthSelectedSku];

   
    const filteredArray = selectedSkus.filter((value, index) => selectedSkus.indexOf(value) === index && value !== null);
    if(filteredArray.length>0){
    this.updateThePairItWithList(filteredArray)
    }
    else{
      this.setState({
        errorMsg: {
          errorHeader: "Sku is required",
          errorTitle: "Please select a sku"
        }
      });
    }
  }

 fiterTheDropDown=(removedData:any)=>{
  let filteredData = this.state.pairWithDropDownList.filter((item:DropDownListType) => !removedData.includes(item.id));
  return filteredData
 }
  // Customizable Area End
}
