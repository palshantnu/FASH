import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ImageListType, SelectedImage } from "./types";
import { Alert, ImageSourcePropType } from "react-native";
import { getOS, getStorageData } from "../../../framework/src/Utilities";
import ImagePicker, { Options, Image } from "react-native-image-crop-picker";
import { launchImageLibrary } from "react-native-image-picker";
// Customizable Area End

export const configJSON = require("./config");

// Customizable Area Start
// Customizable Area End

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  isAddImageModalVisible: boolean;
  isViewImageModalVisible: boolean;
  isVisibleDeleteCheckbox: boolean;
  isShareModalVisible: boolean;
  imageData: ImageListType[];
  selectedImage: SelectedImage;
  viewSelectedImage: SelectedImage;
  selectedImageId: string | undefined;
  addImageError: boolean;
  photoLibraryId: string;
  inputAccountId: string;
  inputAccountIdError: boolean;
  profileShift: boolean;
  checked: boolean;
  loader: boolean;
  loading:boolean;
  selectMultipleCheck: boolean;
  portfolioMediaModal: boolean;
  mediaUpload: boolean;
  selectPortfolioImage: string;
  photoData: { image_id: string, images: ImageSourcePropType, isSelected: boolean, portfolio_image_id: number }[]
  editPortfolioDetailDesc: string;
  editPortfolioDetailProfile: string
  portfolioImageID: string
  portfolio: Array<{
    uri: string;
    name: string;
    type: string;
    description: string;
  }>;
  errorKey:
  | keyof Pick<
    S, | "portfolio"
  >
  | "";
  selectMultiple: boolean;
  mediaModal: boolean;
  error: string,
  profilePhoto: {
    uri: string;
    name: string;
    type: string;
  };
  onChangeTxt: string;
  deleteID: number[]
  detailsMediaModal: boolean
  profilePhotoDetails: {
    uri: string;
    name: string;
    type: string;
  };
  errorMessage: boolean,
  isChecked: boolean;
  isSelect: boolean
  // Customizable Area End
}

interface SS {
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

export default class PhotoLibraryController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiGetPortfolio = "";
  updatePortfolioAPI = "";
  deleteAllEditPortfolioApicall = "";
  deletePortfolioApicall: string = ""
  uploadPortfolioAPICallId: string = ""
  unsubscribe: any;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.RestAPIResponceDataMessage),
      getName(MessageEnum.RestAPIResponceSuccessMessage),
      getName(MessageEnum.RestAPIResponceErrorMessage),
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: "",
      isAddImageModalVisible: false,
      isViewImageModalVisible: false,
      isVisibleDeleteCheckbox: false,
      isShareModalVisible: false,
      selectedImage: { uri: "" },
      viewSelectedImage: { uri: "" },
      selectedImageId: "",
      addImageError: false,
      imageData: [],
      photoLibraryId: "",
      inputAccountId: "",
      inputAccountIdError: false,
      profileShift: false,
      checked: false,
      loader: true,
      loading:false,
      portfolioMediaModal: false,
      selectMultipleCheck: false,
      mediaUpload: false,
      selectPortfolioImage: "",
      photoData: [],
      editPortfolioDetailDesc: "",
      editPortfolioDetailProfile: "",
      portfolioImageID: "",
      selectMultiple: false,
      mediaModal: false,
      error: "",
      portfolio: [],
      profilePhoto: { uri: "", name: "", type: "" },
      errorKey: "",
      onChangeTxt: "",
      deleteID: [],
      detailsMediaModal: false,
      profilePhotoDetails: { uri: "", name: "", type: "" },
      errorMessage: false,
      isChecked: false,
      isSelect: false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    this.isStringNullOrBlank = this.isStringNullOrBlank.bind(this);
    // Customizable Area End
  }
  
  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    const apiCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    const responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token: string = message.getData(
        getName(MessageEnum.SessionResponseToken)
      );
      runEngine.debugLog("TOKEN", token);
      if (token) {
        this.setState({ token: token }, () => {
          this.getPortfolioDetails()
        });
      }
    }

    if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      const termsCondsData = message.getData(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      const { item } = termsCondsData;
      if (item) {
        this.setState({
          editPortfolioDetailDesc: item.description,
          editPortfolioDetailProfile: item.url,
          portfolioImageID: item.portfolio_image_id,
          loading:false
        })
      }
    }

    switch (apiCallId) {
      case this.apiGetPortfolio:
        this.getPortfolioApi(responseJson)
        break;

      case this.deleteAllEditPortfolioApicall:
        this.deleteAllApi(responseJson)
        break;

      case this.updatePortfolioAPI:
        this.updatePortfolioApi(responseJson)
        break;

      case this.deletePortfolioApicall:
        this.deletePortfolioApi(responseJson)
        break;

      case this.uploadPortfolioAPICallId:
        this.portfolioUploadApi(responseJson)
        break;

      default:
        break;
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken();
    this.unsubscribe = this.props.navigation.addListener("willFocus", async () => {
      this.getToken()
      this.getPortfolioDetails()
    });
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };
  isStringNullOrBlank = (stri: string) => {
    return stri === null || stri.length === 0;
  };

  shiftEditPortfolio = () => {
    this.setState({ profileShift: false })
  }

  shiftUploadPortfolio = () => {
    this.setState({ profileShift: true })
  }

  mediaUploadPortfolio = () => {
    this.setState({ mediaModal: true })
  } 
  checkBoxValueChange = () => {
    const { isChecked, photoData } = this.state;
    const newChecked = !isChecked;
  
    const updatedPhotos = photoData.map(item => ({
      ...item,
      isSelected: newChecked,
    }));
  
    const updatedDeleteID = newChecked ? updatedPhotos.map(item => item.portfolio_image_id) : [];
  
    this.setState({ isChecked: newChecked, checked: true, photoData: updatedPhotos, deleteID: updatedDeleteID });
    updatedDeleteID.length===0 && this.state.checked && this.setState({checked: false})
  };
  checkBoxItemChange = (clickedItem: any) => {
    const updatedPhotos = [...this.state.photoData];
    const selectedIndex = updatedPhotos.findIndex(
      item => item.image_id === clickedItem.image_id
    );
  
    if (selectedIndex !== -1) {
      // Toggle the selection
      updatedPhotos[selectedIndex].isSelected = !updatedPhotos[selectedIndex].isSelected;
    }
  
    const updatedDeleteID = updatedPhotos
      .filter(item => item.isSelected)
      .map(item => item.portfolio_image_id);
  
    const allSelected = updatedPhotos.every(item => item.isSelected);
  
    this.setState({
      photoData: updatedPhotos,
      deleteID: updatedDeleteID,
      isChecked: allSelected,
      checked: true
    });
  };
  

  closePickerModal = () => {
    this.setState({ mediaModal: false })
  }

  onEditImageClick = (item: any) => {
    const message = new Message(getName(MessageEnum.NavigationMessage));
    message.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "PhotoLibraryEditPortfolioDetails"
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(getName(MessageEnum.NavigationPayLoadMessage), {
      item: item
    });
    message.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    this.send(message);
    return true;
  }

  getPortfolioDetails = async () => {
    let userId = await getStorageData('userID')
    const header = {
      "Content-Type": configJSON.loginApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiGetPortfolio = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `accounts/portfolio`
    );    

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  onEditDetailsInputChange = (text: string) => {
    this.setState({ editPortfolioDetailDesc: text })
  }

  cancelDetailsView = () => {
    this.props.navigation.goBack()
  } 
  updateDetailsView = async () => {
    const header = {
      "Content-Type": configJSON.loginApiContentType,
      token: this.state.token
    };
    if(!this.state.profilePhotoDetails.uri){
      return
    }
    let formdata = new FormData()
    formdata.append("description", this.state.editPortfolioDetailDesc);
    this.state.profilePhotoDetails.uri && formdata.append("images[]", this.state.profilePhotoDetails as unknown as Blob ) 
    
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.updatePortfolioAPI = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `portfolio/update_portfolio_image?portfolio_image_id=${this.state.portfolioImageID}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.putApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  deleteAllPortfolio = async () => {
    this.setState({ portfolio: [] });
  }

  openMultiModal = () => {
    this.setState({ selectMultiple: true, mediaModal: true, errorKey: "" });
  };

  deletePortfolioItem = (pIndex: number) => {
    this.setState(({ portfolio }) => {
      const newData = [...portfolio];
      newData.splice(pIndex, 1);
      return { portfolio: newData };
    });
  };

  updatePortfolioDesc = (text: string, pIndex: number) => {
    this.setState(({ portfolio }) => {
      const newData = [...portfolio];
      newData[pIndex].description = text;
      return { portfolio: newData };
    });
  };

  choosePhoto = () => this.selectPhoto("gallery", this.state.selectMultiple);
  capturePhoto = () => this.selectPhoto("camera", this.state.selectMultiple);

  selectPhoto = async (type: "camera" | "gallery", multiple: boolean) => {
    const options: Options = {
      mediaType: "photo",
      cropping: true,
      height: 500,
      width: 500,
    };

    if (multiple) {
      try {
        const response =
          type === "gallery"
            ? await this.selectMultiple(options)
            : await ImagePicker.openCamera({ ...options, multiple: true });
        if (response) {
          const portfolio = response.map((image, imageIndex) => ({
            uri: image.path!,
            type: image.mime!,
            name: `portfolio_${imageIndex + 1}.${image.mime!.split("/")[1]}`,
            description: "",
          }));
          this.setState({ portfolio });
        }
      } catch (_error) {
        Alert.alert("Something went wrong!")
      }
      this.setState({ mediaModal: false });
      return;
    } else {
      try {
        const response: Image =
          type === "gallery"
          ? await ImagePicker.openPicker(options)
          : await ImagePicker.openCamera(options);
      
        if (response && response.path && response.mime) {
          this.setState({
            profilePhoto: {
              uri: response.path,
              type: response.mime,
              name: `profile_photo.${response.mime.split("/")[1]}`,
            },
          });
        } else {
          Alert.alert("Invalid image received");
        }
      } catch (error) {
        this.handleError(error);
      }
      this.setState({ mediaModal: false });
      return
    }
  };

  handleError = (error: any) => {
    if (error.message) {
      Alert.alert("Alert", error.message);
    } else {
      Alert.alert("Something went wrong!");
    }
  };

  selectMultiple = async (options: Options) => {
    if (getOS() === "ios") {
      return await ImagePicker.openPicker({ ...options, multiple: true });
    }
    return (
      await launchImageLibrary({
        mediaType: "photo",
        selectionLimit: 10,
      })
    ).assets!.map((value) => ({
      path: value.uri,
      mime: value.type,
    }));
  };

  onChangeSinglePhotoUpload = (text: string) => {
    this.setState({ onChangeTxt: text })
  }

  deleteAllEditPortfolio = async () => {
    this.setState({loading:true})
    const header = {
      "Content-Type": configJSON.loginApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deleteAllEditPortfolioApicall = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `portfolio/destroy_selected?portfolio_image_ids[]=${this.state.deleteID}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  backBtnClick = () => {
    this.props.navigation.goBack()
  }

  replaceImageBtn = () => {
    this.setState({ detailsMediaModal: true })
  }

  closeDetailsPickerModal = () => {
    this.setState({ detailsMediaModal: false })
  }

  openCamera = async () => {
    const options: Options = {
      mediaType: "photo",
      cropping: true,
      height: 500,
      width: 500,
    };
    try {
      const response: Image = await ImagePicker.openCamera(options);

      this.setState({
        profilePhotoDetails: {
          uri: response.path,
          type: response.mime,
          name: `profile_photo.${response.mime.split("/")[1]}`,
        },
        detailsMediaModal: false
      });
    } catch (_error) {
      Alert.alert("Something went wrong!", "Please try after sometime")
      this.setState({ detailsMediaModal: false })
    }
  }

  openGallery = async () => {
    const options: Options = {
      mediaType: "photo",
      cropping: true,
      height: 500,
      width: 500,
    };
    try {
      const response: Image = await ImagePicker.openPicker(options);
      this.setState({
        profilePhotoDetails: {
          uri: response.path,
          type: response.mime,
          name: `profile_photo.${response.mime.split("/")[1]}`,
        },
        detailsMediaModal: false
      });
    } catch (_error) {
      Alert.alert("Something went wrong!", "Please try after sometime")
      this.setState({ detailsMediaModal: false })
    }
  }

  deleteIconBtn = async () => {
    const header = {
      "Content-Type": configJSON.loginApiContentType,
      token: this.state.token
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.deletePortfolioApicall = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      `/portfolio/delete_image?portfolio_image_id=${this.state.portfolioImageID}`
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }

  getPortfolioApi = (responseJson: any) => {    
    let extractedImagesArray = []
    if (responseJson.data && Array.isArray(responseJson.data) && responseJson.data.length > 0) {
      const extractedImages = responseJson.data
        .map((item: any) => item.attributes.images)
        .filter((imagesArray: any) => imagesArray.length > 0)
        .flat();
        extractedImagesArray = extractedImages
    }

    if(responseJson.data.length > 0) {

      this.setState({ photoData: extractedImagesArray,errorMessage: false ,loader: false, })
    } else {
      this.setState({errorMessage: true, loader: false})
    }
  }

  deleteAllApi = (responseJson: any) => {
    alert(responseJson?.message)
    this.setState({ checked: false,loading:false })
    this.getPortfolioDetails()
  }

  updatePortfolioApi = (responseJson: any) => {
    if (responseJson?.message) {
      Alert.alert("Success", "Your portfolio has been updated successfully!");
    } else {
      Alert.alert("Something went wrong!", "Please try again later");
    }
  }

  deletePortfolioApi = (responseJson: any) => {
    if (responseJson?.message) {
      Alert.alert("Success", "Your portfolio has been deleted successfully!", [
        {
          text: 'OK', onPress: () => this.props.navigation.navigate("PhotoLibrary")
        }
      ]);
    } else {
      Alert.alert("Something went wrong!", "Please try again later");
    }
  }

  uploadPortfolioApi = async () => {
    const header = {
      token: this.state.token,
      "Content-Type": "multipart/form-data",
    };

    let formdata = new FormData()
    if (this.state.portfolio.length > 0) {
      this.state.portfolio.forEach((data) => {
        let selectedImageData: string | Blob = data as unknown as Blob;
        formdata.append("images[]", selectedImageData);
        formdata.append("image_descriptions[]", data.description);
      });
    }else if (this.state.profilePhoto.uri !== "" || null) {
      let selectedImageData: string | Blob =  this.state.profilePhoto as unknown as Blob;
      formdata.append("images[]", selectedImageData);
      formdata.append("image_descriptions[]", this.state.onChangeTxt);
    } else {
      alert("Please select a photo")
      return;
    }
    this.setState({loading:true})

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.uploadPortfolioAPICallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.accountsAPI
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formdata
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.postApiMethod
    );
    
    runEngine.sendMessage(requestMessage.id, requestMessage);

    return true;
  }
  portfolioUploadApi = (responseJson: any) => {
    this.setState({loading:false})
    if (responseJson?.data.attributes.images.length > 0) {
      Alert.alert("Success", "Your portfolio has been uploaded successfully!", [
        {
          text: 'OK', onPress: () => {
            this.callAfterOk()
          }
        }
      ]);
    } else {
      Alert.alert("Something went wrong!", "Please try again")
    }
  }

  callAfterOk = () => {
    this.setState({
      onChangeTxt: "",
      profilePhoto: {
        uri: "",
        name: "",
        type: ""
      },
      portfolio: []
    });
    this.getPortfolioDetails();
  }
  // Customizable Area End
}
