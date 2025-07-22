import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import {isEmpty} from "../../../framework/src/Utilities"
import { CountryData } from "../../../components/src/MobileWithCountryCodesInput";
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
  token:string;
  agencyName:string;
  address:string;
  zipcode:string;
  nameError:boolean;
  addressError:boolean;
  zipcodeError:boolean;
  loading:boolean;
  dropdownOpen: boolean;
  selectedCodeIndex: number;
  selectedCountryCode: string;
  countryList: Array<CountryData>;
  phoneNumber:string;
  phoneNumberError:boolean;
  selectedCountryName:string;
  area:string;
  areaError:boolean;
  block:string;
  blockError:boolean;
  houseNumber:string;
  houseNumberError:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformDriverAgencyInfoController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  addContactUsDrivercallApiId:string = "";
  countryCodeApiCallId:string=""
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
    ];

    this.state = {
      token:'',
      agencyName:'',
      address:'',
      zipcode:'',
      nameError:false,
      addressError:false,
      zipcodeError:false,
      loading:false,
      dropdownOpen: false,
      selectedCodeIndex: 0,
      selectedCountryCode: "+965",
      countryList: [],
      phoneNumber:'',
      phoneNumberError:false,
      selectedCountryName:'KW',
      area:'',
      areaError:false,
      block:'',
      blockError:false,
      houseNumber:'',
      houseNumberError:false
    };

    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken()
    this.fetchCountryCodes()
    this.props.navigation.addListener("willFocus", () => {
      this.getToken();
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    this.getTokenAndValue(message)
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.apiResponseManage(message)
    }
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const msgToken: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msgToken);
  };

  getTokenAndValue = (message:Message)=>{
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.setState({ token: token });
    } 
  }

  apiResponseManage = (message:Message) =>
  {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    let errorReponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    )

    if (responseJson) {
      this.setState({loading:false})
      this.checkAllApiCallIdStatus(message)
      
    }else{
      this.setState({loading:false})
      this.parseApiErrorResponse(errorReponse)
    }
  }

  checkAllApiCallIdStatus = (message:Message)=>{
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      if (apiRequestCallId === this.countryCodeApiCallId) {
        const kuwaitIndex = responseJson.findIndex(
            ({ country_code }: CountryData) => country_code === "KW"
          );
          this.setState({
            countryList: responseJson,
            selectedCountryCode: responseJson[kuwaitIndex].numeric_code,
            selectedCodeIndex: kuwaitIndex,
            loading: false,
        });
    }
    if (apiRequestCallId === this.addContactUsDrivercallApiId) {
      this.setState({agencyName:'',address:'',zipcode:'',area:'',block:'',houseNumber:''})
      this.manageNavigationNextPage()
    }
  }

  checkBoarderColor(stateValue1:boolean){
    if(stateValue1){
      return 'red';
    }
    else{
      return '#A9A9A9';
    }
  }


  agencyInformationSubmitDriver = ()=>{
    if(isEmpty(this.state.agencyName))
    {
      this.setState({nameError:true})
      return false;
    }
    if(isEmpty(this.state.phoneNumber))
    {
        this.setState({phoneNumberError:true})
        return false;
    }
    if(isEmpty(this.state.address))
    {
      this.setState({addressError:true})
      return false;
    }
    if(isEmpty(this.state.area))
    {
        this.setState({areaError:true})
        return false;
    }
    if(isEmpty(this.state.block))
    {
      this.setState({blockError:true})
      return false;
    }
    if(isEmpty(this.state.houseNumber))
    {
      this.setState({houseNumberError:true})
      return false;
    }
   
    this.afterCallApiAgency()
  }

  afterCallApiAgency = () =>{
    const header = {
      "Content-Type": configJSON.sellerDetailsApiContentType,
      token: this.state.token
    };

    let attrs = {
        account_type:'Agency',
        area:this.state.area,
        address:this.state.address,
        agency_name:this.state.agencyName,
        agency_contact_number:this.state.selectedCountryCode+this.state.phoneNumber,
        block:this.state.block,
        house_or_building_number:this.state.houseNumber,
        zip_code:this.state.zipcode
    }

    const dataBody = {
        attributes: attrs
      };
  
      const httpBody = {
        data: dataBody,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.addContactUsDrivercallApiId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addAgencyInformationApiEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBody)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.sellerDetailsAPIMethodPOST
    );
    this.setState({loading:true})
    runEngine.sendMessage(requestMessage.id, requestMessage);
    return true;
  }

    onAgencyNameChange = (name:string)=>{
        this.setState({ agencyName: name,nameError:false });
    }

    onAddressChange = (address:string)=>{
        this.setState({ address: address,addressError:false });
    }

    onzipcodeChange = (zipcode:string)=>{
        this.setState({ zipcode: zipcode,zipcodeError:false });
    }

  fetchCountryCodes = () => {
    this.setState({ loading: true });
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.countryCodeApiCallId = message.messageId;

    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.countryCodeApiEndPoint
    );
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getSellersAPIMethod
    );

    runEngine.sendMessage(message.id, message);
  };

  handleMobileChange = (text: string) => {
    if (text !== undefined && text !== null) {
      this.setState({
        phoneNumber: text.replace(/\s/g, ""),
      });
    }
    this.setState({ phoneNumberError: false });
  };

    toggleCountryDropdown = (open: boolean) => {
        this.setState({ dropdownOpen: !open });
    };

  handleCountrySelect = (index: number, { numeric_code,country_code }: CountryData) => {
    this.setState({
      selectedCodeIndex: index,
      dropdownOpen: false,
      selectedCountryCode: numeric_code,
      selectedCountryName: country_code
    });
  };

    manageNavigationNextPage = ()=>{
        const msgNavigation: Message = new Message(
            getName(MessageEnum.NavigationDriverAgencyDocumentMessage)
        );
      
        msgNavigation.addData(
            getName(MessageEnum.NavigationPropsMessage),
            this.props
        );

        this.send(msgNavigation);
    }

    onHouseNumberChange = (houseNumber:string)=>{
      this.setState({ houseNumber: houseNumber,houseNumberError:false });
    }

    onBlockChange = (block:string)=>{
        this.setState({ block: block,blockError:false });
    }

    onAreaChange = (name:string)=>{
      this.setState({ area: name,areaError:false });
    }
  // Customizable Area End
}
