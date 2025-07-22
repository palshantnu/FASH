import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { getStorageData } from "framework/src/Utilities";

// Customizable Area Start
import ImagePicker from 'react-native-image-crop-picker';
import { Alert } from "react-native";
import i18n from "../../../components/src/i18n/i18n.config";
const navigation = require("react-navigation")
interface APIPayloadType {
  endPoint: string;
  method: string;
  body?: object;
  token?: string;
  contentType?: string;
  type?: string;
}

interface ValidResponseType {
  message: object;
  data: {
    id: number;
    attributes: {
      gender?: string;
      images: [],
      min_price: string;
      max_price: string;
      colour?: string;
      detail?: string;
    }
  };
  stylist: object;
}
interface ImageData {
  id: number;
  uri: string;
  type: string;
  name: string;
}
interface InvalidResponseType {
  errors: Array<string>;
}
// Customizable Area End

export const configJSON = require("./config.js");

export interface Props {
  navigation: typeof navigation;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}
interface S {
  // Customizable Area Start
  gender: null | string;
  colorPreference: string | null;
  minPrice:null | string 
  maxPrice: null | string;
  moreDetails: null | string;
  selectImage: { uri: string, id: number }[];
  selectImageError: boolean;
  mediamodal: boolean
  imageFileName: string;
  profileImageData: ImageData[];
  stylistId: string;
  isLoading: boolean;
  apiType?: string;
  isErrorGender?: boolean;
  isErrorColor?: boolean;
  isErrorDetails?: boolean;
  isErrorImage?: boolean;
  isErrorMax: boolean;
  isErrorMin: boolean;
  errorMessage?: string;
  localCurrency: string;
  // Customizable Area End
}
interface SS {
  id: number;
}

export default class RequirementFormController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  customFormAPIcallId: string = "";
  stylistDetailsApiCallId: string = "";
  updateFormAPIcallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);
    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      gender: null,
      colorPreference: null,
      minPrice: '$',
      maxPrice: '$',
      moreDetails: null,
      selectImageError: false,
      selectImage: [],
      mediamodal: false,
      imageFileName: '',
      profileImageData: [],
      stylistId: "",
      isLoading: false,
      apiType: 'create',
      isErrorGender: false,
      isErrorColor: false,
      isErrorDetails: false,
      isErrorImage: false,
      isErrorMax: false,
      isErrorMin: false,
      errorMessage: '',
      localCurrency: '',
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.setState({apiType:'create'})
    let currencyGet = await getStorageData('currencyIcon', true)
    this.setState({ localCurrency: currencyGet })      
    // Customizable Area End
  }

  // Customizable Area Start
  navigateToStylishProfile = () => {
    if (this.state.apiType === 'Edit') {
      const message = new Message(getName(MessageEnum.NavigationMessage));
      message.addData(getName(MessageEnum.NavigationTargetMessage), 'MyRequest');
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props)
      this.send(message)
    } else {
      const message = new Message(getName(MessageEnum.NavigationMessage));
      message.addData(getName(MessageEnum.NavigationTargetMessage), 'StylistDetailedProfile');
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props)
      this.send(message)
    }
  }


  Galleryopen = () => {
    ImagePicker.openPicker({
      multiple: true,
      cropping: false,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      //mediaType: 'photo',
    })
      .then(image => {
        let imageArr: { uri: string, id: number }[] = [];
        let imageFileArr: { id: number, uri: string; type: string; name: string; }[] = [];

        image.forEach((img, index) => {
          imageArr.push({ uri: img.path, id: index + 1 });

          let fileName = img.path.substring(img.path.lastIndexOf('/') + 1);

          let imgObj: ImageData = {
            id: index + 1,
            uri: img.path,
            type: img.mime,
            name: fileName
          };
          imageFileArr.push(imgObj);
        });
        this.setState({ selectImage: [...this.state.selectImage, ...imageArr], selectImageError: false, profileImageData: [...this.state.profileImageData, ...imageFileArr], isErrorImage: false });
      })
      .catch(error => {
        Alert.alert(i18n.t("error"), i18n.t("invalidImageSelected"));
      });
  }


  apiCall = async (apiData: APIPayloadType) => {
    const { contentType, method, endPoint, body, type } = apiData;
    let token = await getStorageData('token', true);
    const header = {
      "Content-Type": contentType,
      token: token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      endPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      method
    );
    body && type !== "formData"
      ?
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        JSON.stringify(body)
      )
      :
      requestMessage.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        body
      );
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return requestMessage.messageId;
  };
  async receive(from: string, message: Message) {

    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const data = message.getData(
        getName(MessageEnum.SessionResponseData)
      );
      this.setState({
        stylistId: data.stylistId,
        apiType: data.type ? data.type:"create"
      }, () => {
        this.onGetStylistDetails()
      })
    }

    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      let apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      if (this.isValidResponse(responseJson)) {
        this.apiSucessCall(apiRequestCallId, responseJson);
      }
      if (responseJson && responseJson.errors) {
        this.apiFailureCall(apiRequestCallId, responseJson);
      }
    }
  }

  isValidResponse = (responseJson: ValidResponseType) => {
    return (responseJson && responseJson.data) || responseJson.message || responseJson.stylist || responseJson
  };

  customFormAPi = async () => {    
    this.setState({ isLoading: true });
    const minPriceValue = this.state.minPrice ? parseFloat(this.state.minPrice.replace(/[^0-9.-]+/g, '')) : 0;
    const maxPriceValue = this.state.maxPrice ? parseFloat(this.state.maxPrice.replace(/[^0-9.-]+/g, '')) : 0;
    const formdata = new FormData();

    formdata.append("stylist_id", this.state.stylistId);
    formdata.append("colour", this.state.colorPreference as string);
    formdata.append("detail", this.state.moreDetails as string);
    formdata.append("gender", this.state.gender as string);
    formdata.append("min_price", minPriceValue as unknown as string);
    formdata.append("max_price", maxPriceValue as unknown as string);

    for (let i = 0; i < this.state.profileImageData.length; i++) {
      const image = {
        uri: this.state.profileImageData[i].uri,
        type:this.state.profileImageData[i].type || 'image/jpeg',  // Default to 'image/jpeg' if type is not provided
        name: this.state.profileImageData[i].name || `photo_${i}.jpg`,  // Ensure name is not empty
      } as ImageData;
      formdata.append("images", image as unknown as Blob);
    }

    this.customFormAPIcallId = await this.apiCall({
      method: configJSON.exampleAPiMethod,
      contentType:'multipart/form-data',
      endPoint: configJSON.customFormEndPoint,
      type: "formData",
      body: formdata
    });

  }

  apiSucessCall = async (apiRequestCallId: string, responseJson: ValidResponseType) => {
    if (apiRequestCallId === this.customFormAPIcallId) {
      this.customFormPicSucessCallBack(responseJson);
    }
    if (apiRequestCallId === this.stylistDetailsApiCallId) {
      this.stylistDetailsApiSucessCallBack(responseJson);
    }
    if (apiRequestCallId === this.updateFormAPIcallId) {
      this.updateFormSuccessCallback(responseJson);
    }
  };

  apiFailureCall = async (apiRequestCallId: string, responseJson: ValidResponseType) => {
    if (apiRequestCallId === this.customFormAPIcallId) {
      this.customFormFailureCallBack(responseJson);
    }
    if (apiRequestCallId === this.stylistDetailsApiCallId) {
      this.stylistDetailsFailureCallback(responseJson);
    }
    if (apiRequestCallId === this.updateFormAPIcallId) {
      this.updateFailureCallBack(responseJson);
    }
  };

  customFormFailureCallBack = (responseJson: ValidResponseType) => {
    this.setState({ isLoading: false });
  };

  customFormPicSucessCallBack = (responseJson: ValidResponseType) => {
    this.setState({ isLoading: false }, () => {
      if (responseJson.data){
        this.navigateToConfirmation()
      }
      else{
        if (Object.keys(responseJson).length > 0) {
          // Collect all error messages
          const allErrors = Object.entries(responseJson)
            .map(([field, messages]) => `${field}: ${messages[0]}`)
            .join('\n'); // Join them with a new line
    
          // Show the error in an alert
          alert(allErrors);
        }
      }
    });
  };

  updateFormSuccessCallback = (responseJson: ValidResponseType) => {
    this.setState({ isLoading: false }, () => {
      this.navigateToMyRequest()
    })
  }

  updateFailureCallBack = (responseJson: ValidResponseType) => {
    this.setState({ isLoading: false })
  }

  getFileTypeFromURL(url: string) {
    const segments = url.split('.');
    const extension = segments[segments.length - 1];
    return extension.toLowerCase();
  }

  stylistDetailsApiSucessCallBack = (responseJson: ValidResponseType) => {
    let imageArr: { uri: string, id: number }[] = [];
    let imageFileArr: { id: number, uri: string; type: string; name: string; }[] = [];
    responseJson?.data?.attributes?.images.map((img: { url: string }, index: number) => {
      imageArr.push({ uri: img.url, id: responseJson?.data?.id + index + 1 })
      let imageName = img.url.substring(img.url.lastIndexOf('/') + 1)
      let imageType = this.getFileTypeFromURL(img.url);
      let imgObj: ImageData = {
        id: responseJson?.data?.id + index + 1,
        uri: img.url,
        type: `image/${imageType}`,
        name: imageName
      };
      imageFileArr.push(imgObj);
    })
    this.setState({
      gender: responseJson?.data?.attributes?.gender || '',
      colorPreference: responseJson?.data?.attributes?.colour || '',
      minPrice: responseJson?.data?.attributes?.min_price.toString() || '',
      maxPrice: responseJson?.data?.attributes?.max_price.toString() || '',
      selectImage: imageArr,
      moreDetails: responseJson?.data?.attributes?.detail || '',
    }, () => {
      this.setState({
        profileImageData: imageFileArr,
        isLoading: false,
      })
    })
  }

  stylistDetailsFailureCallback = (responseJson: ValidResponseType) => {
    this.setState({ isLoading: false })

  }

  onUpdateForm = async () => {
    this.setState({ isLoading: true });
    const formdata = new FormData();
    formdata.append("gender", this.state.gender as string);
    formdata.append("colour", this.state.colorPreference as string);
    formdata.append("max_price", this.state.maxPrice as string);
    formdata.append("detail", this.state.moreDetails as string);
    formdata.append("min_price", this.state.minPrice as string);
    for (let i = 0; i < this.state.profileImageData.length; i++) {
      const image = {
        uri: this.state.profileImageData[i].uri,
        type: this.state.profileImageData[i].type || 'image/jpeg',  // Default to 'image/jpeg' if type is not provided
        name: this.state.profileImageData[i].name || `photo_${i}.jpg`,  // Ensure name is not empty
      } as ImageData;
      formdata.append("images", image as unknown as Blob);
    }
    this.updateFormAPIcallId = await this.apiCall({
      method: configJSON.putApiMethod,
      contentType:'multipart/form-data',
      endPoint: `${configJSON.customFormEndPoint}/${this.state.stylistId}`,
      type: "formData",
      body: formdata
    });
  }

  onGetStylistDetails = async () => {
    this.stylistDetailsApiCallId = await this.apiCall({
      contentType: configJSON.validationApiContentType,
      method: configJSON.validationApiMethodType,
      endPoint: `bx_block_custom_form/hire_stylist_custom_forms/${this.state.stylistId}`,
    });
  }

  navigateToConfirmation = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), 'Confirmation');
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props)
    this.send(message)
  }

  navigateToMyRequest = () => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(getName(MessageEnum.NavigationTargetMessage), 'MyRequest');
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props)
    this.send(message)
  }

  onRemoveImage = async (id: number) => {
    const updatedArray = this.state.selectImage.filter(item => item.id !== id);
    const updatedSecArray = this.state.profileImageData.filter(item => item.id !== id);
    this.setState({ selectImage: updatedArray, profileImageData: updatedSecArray })
  }
  onSetColor = (text:string | null) =>{
    this.setState({ colorPreference: text, isErrorColor: false })
  }
  checkValidation = (gender:string |null,colorPreference:string|null,minPrice:string |null,maxPrice:string |null,moreDetails:string |null,profileImageData:ImageData[]) =>{
   let isValid = true;
      const minPriceValue = minPrice ? parseFloat(minPrice.replace(/[^0-9.-]+/g, '')) : 0;
      const maxPriceValue = maxPrice ? parseFloat(maxPrice.replace(/[^0-9.-]+/g, '')) : 0;
    if (!gender) {
      this.setState({isErrorGender: true})
      isValid = false;
    }

    if (!colorPreference) {
      this.setState({isErrorColor: true})
      isValid = false;
    }

    if (moreDetails == null ) {
      this.setState({isErrorDetails: true})
      isValid = false;
    }

    if (!minPriceValue || isNaN(Number(minPriceValue)) || !maxPriceValue || isNaN(Number(maxPriceValue))) {
      this.setState({errorMessage: i18n.t("minMaxError"),isErrorMin: true ,isErrorMax: true});
      isValid = false;
    }

    if (minPrice && maxPriceValue && minPriceValue > maxPriceValue) {
      this.setState({ errorMessage: i18n.t("minLessMaxError"), isErrorMin: true });
      isValid = false;
    }

    if (profileImageData.length === 0) {
      this.setState({isErrorImage: true});
      isValid = false;
    }
    
    if(this.state.apiType === 'Edit' && isValid){
     this.onUpdateForm()
    }else if(this.state.apiType === 'create' && isValid){
      this.customFormAPi()
    }
  }

  manageCurrencyValue = () =>{
    const { localCurrency, minPrice } = this.state;
    if (!minPrice) return this.state.localCurrency;
    return localCurrency === "$"
        ? `$${minPrice}`
        : `KWD ${minPrice}`;
  }

  manageCurrencyValueMax = () => {
    const { localCurrency, maxPrice } = this.state;
    console.log('maxPricemaxPricemaxPricemaxPricemaxPrice',maxPrice);
    
    if (!maxPrice) return this.state.localCurrency;
    return localCurrency === "$"
        ? `$${maxPrice}`
        : `KWD ${maxPrice}`;
};

updateMinPrice = (minPrice: string) => {
  // Remove the currency symbol based on the current localCurrency
  const currencySymbol = this.state.localCurrency === "$" ? "$" : "KWD ";
  const quote_Price = minPrice.replace(currencySymbol, "");
  this.setState({ minPrice: quote_Price, isErrorMin: false });

  };

  updateMaxPrice = (maxPrice: string) => {
  const currencySymbol = this.state.localCurrency === "$" ? "$" : "KWD ";
  const quote_Price = maxPrice.replace(currencySymbol, "");  
  this.setState({ maxPrice: quote_Price, isErrorMax: false });
  };

  // Customizable Area End

}