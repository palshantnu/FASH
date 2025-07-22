import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import ImagePicker, { Image } from "react-native-image-crop-picker";
import { showMessage } from "react-native-flash-message";
import i18n from "../../../components/src/i18n/i18n.config";
import { getStorageData } from "framework/src/Utilities";
interface AttachmentsProps {
  type: string;
  uri: string;
  name: string;
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
  loading: boolean;
  token: string;
  productName: string;
  productNameError: boolean;
  productNameErrorMessage: string;
  productDescription: string;
  productDescriptionError: boolean;
  productDescriptionErrorMessage: string;
  productColor: string;
  productColorError: boolean;
  productColorErrorMessage: string;
  productSizes: string;
  productSizesError: boolean;
  productSizesErrorMessage: string;
  minPrice: string;
  minPriceError: boolean;
  minPriceErrorMessage: string;
  maxPrice: string;
  maxPriceError: boolean;
  maxPriceErrorMessage: string;
  quantity: string;
  quanntityError: boolean;
  quanntityErrorMessage: string;
  mediamodal: boolean;
  selectImage: string;
  selectImageType: string;
  selectImageError: boolean;
  attachmentData: AttachmentsProps;
  selectInsuranceImage: string;
  selectInsuranceImageError: boolean;
  attachmentInsuranceData: AttachmentsProps;
  photoErrorMessage: string;
  genderErrorMsg: string;
  gender: string;
  genderText: string;
  genderError: boolean;
  localCurrency:string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class CustomformSourceProductContorller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  submitSourceProductApiCallId = "";
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
      loading: false,
      token: "",
      productName: "",
      productNameError: false,
      productNameErrorMessage: i18n.t("* Please enter your product name"),
      productDescription: "",
      productDescriptionError: false,
      productDescriptionErrorMessage: i18n.t("* Please enter your product description"),
      productColor: "",
      productColorError: false,
      productColorErrorMessage: i18n.t("* Please enter your product color"),
      productSizes: "",
      productSizesError: false,
      productSizesErrorMessage: i18n.t("* Please enter your product sizes"),
      minPrice: "",
      minPriceError: false,
      minPriceErrorMessage:   i18n.t("* Please enter your min price"),
      maxPrice: "",
      maxPriceError: false,
      maxPriceErrorMessage: i18n.t("* Please enter your max price"),
      mediamodal: false,
      selectImage: "",
      selectImageType: "",
      selectImageError: false,
      attachmentData: { name: "", type: "", uri: "" },
      selectInsuranceImage: "",
      selectInsuranceImageError: false,
      attachmentInsuranceData: { name: "", type: "", uri: "" },
      photoErrorMessage: i18n.t("* Please select product photo"),
      genderErrorMsg: "",
      genderError: false,
      gender: "",
      genderText: "",
      quantity: "",
      quanntityError: false,
      quanntityErrorMessage: i18n.t("* Please enter your quantity"),
      localCurrency:""
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      if (token) {
        this.setState({ token: token });
      }
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiRequestCallId != null) {
        if (apiRequestCallId === this.submitSourceProductApiCallId) {
          this.setState({ loading: false });
          this.uploadAfterSuccess(responseJson);
        }
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.getToken();
    this.props.navigation.addListener("willFocus", async() => {
      let currencyGet = await getStorageData('currencyIcon', true)
      this.setState({ localCurrency: currencyGet })      
      this.getToken();
    });
    // Customizable Area End
  }

  // Customizable Area Start

  uploadAfterSuccess = async (responseJson: any) => {
    if (responseJson.errors === undefined) {
      showMessage({
        message: i18n.t("Product Sourcing Request created successfully."),
        position: { top: 8 },
        type: "success",
      });
      this.props.navigation.goBack();
      this.setState({
        productName: "",
        productDescription: "",
        productColor: "",
        productSizes: "",
        minPrice: "",
        maxPrice: "",
        quantity: "",
        gender: "",
        photoErrorMessage: "",
        selectImage: "",
        selectImageError: false,
        attachmentData: {
          name: "",
          type: "",
          uri: "",
        },
      });
    } else {
      alert(
        "Error in uploading product" + JSON.stringify(responseJson.errors[0])
      );
    }
  };

  getToken = () => {
    const msgToken: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msgToken);
  };

  callingApi = (
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

  validateFields = (): boolean => {
    const fields = [
      {
        value: this.state.productName.trim(),
        errorField: "productNameError",
        errorMessageField: "productNameErrorMessage",
        errorMessage: i18n.t("* Product name is required"),
        validate: (value: string) => !!value,
      },
      {
        value: this.state.productDescription.trim(),
        errorField: "productDescriptionError",
        errorMessageField: "productDescriptionErrorMessage",
        errorMessage: i18n.t("* Product description is required"),
        validate: (value: string) => !!value,
      },
      {
        value: this.state.productColor.trim(),
        errorField: "productColorError",
        errorMessageField: "productColorErrorMessage",
        errorMessage:
          i18n.t('productColorErrorMessage'),
        validate: (value: string) =>
          !!value && /^\s*([a-zA-Z]+(?:\s*,\s*[a-zA-Z]+)*)\s*$/.test(value),
      },
      {
        value: this.state.productSizes.trim(),
        errorField: "productSizesError",
        errorMessageField: "productSizesErrorMessage",
        errorMessage:
          i18n.t('productSizesErrorMessage'),
        validate: (value: string) =>
         !!value && /^\s*([a-zA-Z]+(?:\s*,\s*[a-zA-Z]+)*)\s*$/.test(value),
      },
      {
        value: this.state.minPrice.trim(),
        errorField: "minPriceError",
        errorMessageField: "minPriceErrorMessage",
        errorMessage: i18n.t("* Valid minimum price is required"),
        validate: (value: string) =>
          !!value && !isNaN(Number(value)) && Number(value) > 0,
      },
      {
        value: this.state.maxPrice.trim(),
        errorField: "maxPriceError",
        errorMessageField: "maxPriceErrorMessage",
        errorMessage: i18n.t("* Valid maximum price is required"),
        validate: (value: string) =>
          !!value &&
          !isNaN(Number(value)) &&
          Number(value) > 0 &&
          Number(value) >= Number(this.state.minPrice),
      },
      {
        value: this.state.quantity.trim(),
        errorField: "quanntityError",
        errorMessageField: "quanntityErrorMessage",
        errorMessage: i18n.t("* Valid product quantity is required"),
        validate: (value: string) =>
          !!value && !isNaN(Number(value)) && Number(value) > 0,
      },
      {
        value: this.state.gender.trim(),
        errorField: "genderError",
        errorMessageField: "genderErrorMsg",
        errorMessage: i18n.t("* Gender is required"),
        validate: (value: string) => !!value,
      },
      {
        value: this.state.selectImage.trim(),
        errorField: "selectImageError",
        errorMessageField: "photoErrorMessage",
        errorMessage: i18n.t("* Image is required"),
        validate: (value: string) => !!value,
      },
    ];

    let isValid = true;

    fields.forEach((field) => {
      if (!field.validate(field.value)) {
        this.setState((prevState) => ({
          ...prevState,
          [field.errorField]: true,
          [field.errorMessageField]: field.errorMessage,
        }));
        isValid = false;
      } else {
        this.setState((prevState) => ({
          ...prevState,
          [field.errorField]: false,
          [field.errorMessageField]: "",
        }));
      }
    });

    return isValid;
  };

  sendDataToAPI = () => {
    if (!this.validateFields()) {
      return;
    }

    const colorList = this.state.productColor
      .split(",")
      .map((color) => color.trim());
    const sizeList = this.state.productSizes
    .split(/[, ]+/)
    .filter((size) => size.trim() !== "")
    .map((size) => size.trim());
    this.setState({ loading: true });    
    let header = {
      "Content-Type": configJSON.validationFormContentType,
      token: this.state.token,
    };
    let selectedImageData: string | Blob = this.state
      .attachmentData as unknown as Blob;

    const formData = new FormData();
    formData.append("product_name", this.state.productName);
    formData.append("description", this.state.productDescription);
    formData.append("colours[]", colorList.join(","));
    formData.append("sizes[]", sizeList.join(","));
    formData.append("min_price", this.state.minPrice);
    formData.append("max_price", this.state.maxPrice);
    formData.append("images[]", selectedImageData);
    formData.append("gender", this.state.gender);
    formData.append("quantity", this.state.quantity);

    this.callingApi(
      configJSON.submitSourceProductApiEndPoint,
      configJSON.submitSourceProductApiMethod,
      header,
      formData,
      (messageId) => {
        this.submitSourceProductApiCallId = messageId;
      }
    );
  };

  checkBoarderColor(stateValue1: boolean) {
    if (stateValue1) {
      return "red";
    } else {
      return "#A9A9A9";
    }
  }

  launchGallery = async () => {
    return new Promise((resolve, reject) => {
      ImagePicker.openPicker({
        mediaType: "photo",
        maxWidth: 300,
        maxHeight: 400,
        includeBase64: true,
        includeExif: true,
        compressImageQuality: 0.4,
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  Galleryopen = () => {
    this.launchGallery()
      .then((objImage) => {
        const imageResult = objImage as Image;
        this.updateImageGalleryData(imageResult);
      })
      .catch((error) => {
        this.setState({ mediamodal: false });
      });
  };

  isEmpty = (str: string) => {
    return !str.trim();
  };

  launchCamera = async () => {
    return new Promise((resolve, reject) => {
      ImagePicker.openCamera({
        maxWidth: 300,
        maxHeight: 400,
        includeBase64: true,
        includeExif: true,
        compressImageQuality: 0.4,
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  updateImageGalleryData = (objImage: Image) => {
    let finaldata = "data:" + objImage.mime + ";base64," + objImage.data;

    let objData: AttachmentsProps = {
      name: "profile.jpg",
      type: objImage.mime,
      uri: objImage.path,
    };

    this.setState({
      selectImage: finaldata,
      mediamodal: false,
      selectImageError: false,
      attachmentData: objData,
    });
  };

  Camerapopen = async () => {
    this.launchCamera()
      .then((objImage) => {
        const imageResultCamera = objImage as Image;
        this.updateImageGalleryData(imageResultCamera);
      })
      .catch((error) => {
        this.setState({ mediamodal: false });
      });
  };

  openCameraGallery = (imageType: string) => {
    this.setState({ mediamodal: true, selectImageType: imageType });
  };

  closeCameraGallery = () => {
    this.setState({ mediamodal: false });
  };

  updateProductName = (productNameget: string) => {
    const regex = /^[A-Za-z\u0600-\u06FF\s]+$/;
    if (productNameget === '' || regex.test(productNameget)) {
      this.setState({ productName: productNameget, productNameError: false });
    }
  };

  updateProductDescription = (productDescription: string) => {
    this.setState({
      productDescription: productDescription,
      productDescriptionError: false,
    });
  };

  checkValidProductSizez = (input : string) => {
    const regex = /^[A-Za-z0-9\s,]*$/;
    return regex.test(input);
  }

  checkValidInput = (input: string): boolean => {
    const regex = /^[A-Za-z0-9\s,]*$/;
    return regex.test(input);
  };

  updateProductColor = (productColor: string) => {
    if (productColor === '' || this.checkValidInput(productColor)) {
      this.setState({ productColor: productColor, productNameError: false });
    }
  };

  updateProductSizes = (productSizes: string) => {
    if (productSizes === '' || this.checkValidProductSizez(productSizes)) {
      this.setState({ productSizes: productSizes, productSizesError: false });
    }
  };

  checkValidQuantity = (quantity: string) => {
    const regex = /^\d*$/;
    return regex.test(quantity);
  };

  updateQuantity = (quantity: string) => {
    if(quantity === '' || this.checkValidQuantity(quantity)) {
      this.setState({ quantity: quantity, quanntityError: false });
    }
  };

  updateMinPrice = (minPrice: string) => {
  // Remove the currency symbol based on the current localCurrency
  const currencySymbol = this.state.localCurrency === "$" ? "$" : "KWD ";
  const quote_Price = minPrice.replace(currencySymbol, "");
  this.setState({ minPrice: quote_Price, minPriceError: false });

    // const min_Price = minPrice.replace("$", "");
    // this.setState({ minPrice: min_Price, minPriceError: false });
  };

  updateMaxPrice = (maxPrice: string) => {
  const currencySymbol = this.state.localCurrency === "$" ? "$" : "KWD ";
  const quote_Price = maxPrice.replace(currencySymbol, "");  
  this.setState({ maxPrice: quote_Price, maxPriceError: false });
  };

  handleSelctGender = (item: { label: string; value: string }) => {
    this.setState({
      gender: item.value,
      genderText: item.label,
      genderErrorMsg: "",
    });
  };

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

  // Customizable Area End
}
