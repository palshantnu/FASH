import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData, setStorageData } from "../../../framework/src/Utilities";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config'
import { DeviceEventEmitter } from "react-native";
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
  selectedModeIndex: number;
  selectedLanguageIndex: number;
  selectedCurrencyIndex: number;
  token:string;
  loading:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Settings2LanguageController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getLanguageCurrencyApiCallID = "";
  updateLanguageAndCurrencyApiCallID = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    this.receive = this.receive.bind(this);

    this.state = {
      // Customizable Area Start
      selectedModeIndex: 0,
      selectedLanguageIndex: 0,
      selectedCurrencyIndex: 0,
      token:'',
      loading:false
      // Customizable Area End
    };

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
    ];
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.apiResponseManage(message)
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getLanguageAndCurrencyApi()
    this.props.navigation.addListener("willFocus", () => {
      this.getLanguageAndCurrencyApi()
    });
    // Customizable Area End
  }

  // Customizable Area Start

  apiResponseManage = (message:Message) =>
    {
        const apiRequestCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
        );

        let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
        );

        let errorReponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
        )

        if (responseJson.error === undefined) {
            if (apiRequestCallId === this.updateLanguageAndCurrencyApiCallID) {
                this.setState({loading:false})
                showMessage({
                  message: i18n.t('languageUpdateSuccesMsgText'),
                  type: "success",
                  position: { top: 8 },
                });
                this.updateLocalLanguage(this.state.selectedLanguageIndex)
                this.setCurrencyUpdate() 
                this.props.navigation.goBack()
                // DeviceEventEmitter.emit('updatedLanguage',this.state.selectedLanguageIndex)
                
            }
            if(apiRequestCallId === this.getLanguageCurrencyApiCallID)
            {
              let languageArr = ["English", "Arabic"]
              let currencyArr = ["Dollar", "Dinar"];
              let languageIndex = languageArr.indexOf(responseJson.data.attributes.language)
              let currencyIndex = currencyArr.indexOf(responseJson.data.attributes.currency)
              this.setState({selectedLanguageIndex:languageIndex,selectedCurrencyIndex:currencyIndex,loading:false})             
            }
        }else{
          this.setState({loading:false})
          this.parseApiErrorResponse(errorReponse)
        }
    }

  get languages() {
    return [i18n.t('englishText'), i18n.t('arabicText')];
  }

  get currencies() {
    return [i18n.t('dollarText'), i18n.t('dinnarText')];
  }

  extractKeys = (item: string, index: number) =>
    `${item.replace(/ /g, "-")}-${index + 1}`;

  updateLanguage = (index: number) => {
    this.setState({ selectedLanguageIndex: index });
  };

  updateCurrency = (index: number) => {
    this.setState({ selectedCurrencyIndex: index });
  };

  getLanguageAndCurrencyApi = async()=>{
    this.setState({loading:true})
    let token = await getStorageData('token',true)
    if(token === null)
    {
      this.getLocalLanguage()
      this.getLocalCurrency()
      this.setState({loading:false})
      return;
    }
    const header = {
        "Content-Type": configJSON.validationApiContentType,
        token: token,
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getLanguageCurrencyApiCallID = requestMessage.messageId;

    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getLanguageCurrencyApiEndPoint
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
  }

  updateLanguageAndCurrencyApi = async()=>{
    this.setState({loading:true})
    let token = await getStorageData('token',true)
    if(token === null)
    {
      showMessage({
        message: i18n.t('languageUpdateSuccesMsgText'),
        type: "success",
        position: { top: 8 },
      });
      this.updateLocalLanguage(this.state.selectedLanguageIndex)
      this.setCurrencyUpdate() 
      this.props.navigation.goBack()
      return;
    }
    const header = {
        "Content-Type": configJSON.validationApiContentType,
        token: token,
    };
    const requestMessage = new Message(
        getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updateLanguageAndCurrencyApiCallID = requestMessage.messageId;

    requestMessage.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.updateLanguageCurrencyApiEndPoint+'?language='+this.state.selectedLanguageIndex+'&currency='+this.state.selectedCurrencyIndex
    );

    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestHeaderMessage),
        JSON.stringify(header)
    );
    requestMessage.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.APiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }

  getLocalLanguage = async() => {
    let language = i18n.language;
    let index;
    if(language === "en")
    {
      index = 0
    }
    else{
      index = 1
    }
    this.setState({selectedLanguageIndex:index})
  }

  getLocalCurrency = async() => {
    let currency = await getStorageData('currencyIcon',true)
    let currencyIndex = currency.indexOf('$') === 0? 0 : 1
    this.setState({selectedCurrencyIndex:currencyIndex})
  }

  updateLocalLanguage = (index: number) => {
    let selectedLanguage = ""
    if(index === 0)
    {
      selectedLanguage="en"
    }
    else{
      selectedLanguage="ar"
    }
    setStorageData('FA_LANGUAGE_ST',selectedLanguage)
    i18n.changeLanguage(selectedLanguage)
    
  };

  setCurrencyUpdate = ()=>{
    let currencyIndex = this.state.selectedCurrencyIndex
    let currencyIconS = '';
    let currency = '';
    if(currencyIndex === 1)
    {
      currency = 'Dinar';
      currencyIconS = 'KWD ';
    }else{
      currency = 'Dolar'
      currencyIconS = '$';
    }
    setStorageData('currencyIcon',JSON.stringify(currencyIconS))
    setStorageData("FA_CURRENCY",currency);
  }
  // Customizable Area End
}
