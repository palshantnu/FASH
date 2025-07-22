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

interface ImageData {
  id: number;
  url: string;
}

interface NavData {
  for: string;
  minPrice: number;
  maxPrice: number;
  id: string;
  product_description?: string;
  quote_price?: string;
  images?: ImageData[];
  request_id?: string;
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
  navData: NavData;
  camModal: boolean;
  images: AttachmentsProps[];
  selectedImage: string[];
  productDescription: string;
  productDescriptionError: boolean;
  productDescriptionErrorMessage: string;
  quotePrice: string;
  quotePriceError: boolean;
  quotePriceErrorMessage: string;
  imageError: boolean;
  imageErrorMessage: string;
  localCurrency:string;
  // Customizable Area End
}
interface SS {
  id: any;
}

export default class BidYourQuoteController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getStylistOfferApiCallId: string = "";
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
      loading: false,
      token: "",
      navData: {
        for: "Add",
        minPrice: 0,
        maxPrice: 0,
        id: ""
      },
      camModal: false,
      images: [],
      selectedImage: [],
      productDescription: "",
      productDescriptionError: false,
      productDescriptionErrorMessage: i18n.t("* Please enter your product description"),
      quotePrice: "",
      quotePriceError: false,
      quotePriceErrorMessage: i18n.t("* Please enter your quote price"),
      imageError: false,
      imageErrorMessage: i18n.t("* Please select product photo"),
      localCurrency:''
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);
    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const data = message.getData(
        getName(MessageEnum.BidYourQuote)
      );
      this.setState({ navData: data });
      if (data.for === "Edit") {
        let dummyImages = data.images.map((image: ImageData) => {
          return image.url;
        });
        const initialImages = data.images.map((image: ImageData) => ({
          name: "image.jpg",
          type: "image/jpg", 
          uri: image.url,
        }));
        this.setState({ productDescription: data.product_description, quotePrice: data.quote_price , images: initialImages, selectedImage: dummyImages });
      }
    }
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

      if (apiRequestCallId === this.getStylistOfferApiCallId) {
        this.setState({ loading: false });
        if (!responseJson.errors) {
          showMessage({
            message: i18n.t("Bid submitted successfully."),
            position: { top: 8 },
            type: "success",
          });
          this.props.navigation.goBack();
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
      let currencyGet = await getStorageData('currencyIcon',true)
        this.setState({localCurrency:currencyGet})
      this.getToken();
    });
    // Customizable Area End
  }

  // Customizable Area Start
  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  updateTheOffer = () => {
    const header = {
      token: this.state.token,
    };

    let formData = new FormData();
    formData.append("quote_price", this.state.quotePrice);
    this.state.images.forEach((image) => {
      let selectedImageData: string | Blob = image as unknown as Blob;
      formData.append("images[]", selectedImageData);
    });
    formData.append("product_description", this.state.productDescription);


    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createStylistOfferApiEndPoint + "/" + this.state.navData.request_id
    );
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.updateAPiMethod);
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), formData);
    this.getStylistOfferApiCallId = message.messageId;

    this.setState({ loading: true });

    runEngine.sendMessage(message.messageId, message);
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

  removeImage = (index: number) => {
    this.setState((prevState) => {
      const images = [...prevState.images];
      const selectedImage = [...prevState.selectedImage];
      images.splice(index, 1);
      selectedImage.splice(index, 1);
      return { images, selectedImage };
    });
  };

  updateImageGalleryData = (objImage: Image) => {
    let finalData = "data:" + objImage.mime + ";base64," + objImage.data;

    let objData: AttachmentsProps = {
      name: "image.jpg",
      type: objImage.mime,
      uri: objImage.path,
    };

    this.setState((prevState) => ({
      imageError: false,
      images: [...prevState.images, objData],
      selectedImage: [...prevState.selectedImage, finalData],
      camModal: false,
    }));

  };

  createStylistOffer = () => {
    if (this.state.navData.for === "Edit") {
      this.updateTheOffer()
      return;
    }
    const header = {
      token: this.state.token,
    };

    let formData = new FormData();
    formData.append("request_id", this.state.navData.id);
    formData.append("product_description", this.state.productDescription);
    formData.append("quote_price", this.state.quotePrice);
    this.state.images.forEach((image) => {
      let selectedImageData: string | Blob = image as unknown as Blob;
      formData.append("images[]", selectedImageData);
    });


    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.createStylistOfferApiEndPoint
    );
    message.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.apiMethodTypePost);
    message.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), header);
    message.addData(getName(MessageEnum.RestAPIRequestBodyMessage), formData);
    this.getStylistOfferApiCallId = message.messageId;

    runEngine.sendMessage(message.messageId, message);
  };

  OpenGallery = () => {
    this.launchGallery()
      .then((objImage) => {
        const imageResult = objImage as Image;
        this.updateImageGalleryData(imageResult);
      })
      .catch((error) => {
        this.setState({ camModal: false });
      });
  };

  updateProductDescription = (productDescription: string) => {
    this.setState({
      productDescription: productDescription,
      productDescriptionError: false,
    });
  };

  updateQuotePrice = (quotePrice: string) => {
    // Remove the currency symbol based on the current localCurrency
    const currencySymbol = this.state.localCurrency === "$" ? "$" : "KWD ";
    const quote_Price = quotePrice.replace(currencySymbol, "");
    this.setState({ quotePrice: quote_Price, quotePriceError: false });
};


  OpenCamera = async () => {
    this.launchCamera()
      .then((objImage) => {
        const imageResultCamera = objImage as Image;
        this.updateImageGalleryData(imageResultCamera);
      })
      .catch((error) => {
        this.setState({ camModal: false });
      });
  };

  closeCameraGallery = () => {
    this.setState({ camModal: false });
  };

  openCameraGallery = () => {
    this.setState({ camModal: true });
  };

  isEmpty = (str: string) => {
    return !str.trim();
  };

  validateForm = () => {
    const { productDescription, quotePrice } = this.state;
    let hasError = false;

    if (this.isEmpty(productDescription)) {
      this.setState({
        productDescriptionError: true,
        productDescriptionErrorMessage: i18n.t("* Please enter your product description"),
      });
      hasError = true;
    }
    if (this.state.navData.minPrice > parseInt(quotePrice)) {
      this.setState({
        quotePriceError: true,
        quotePriceErrorMessage: i18n.t("* Quote price must be greater than minimum price"),
      });
      hasError = true;
    }
    if (parseInt(quotePrice) > this.state.navData.maxPrice) {
      this.setState({
        quotePriceError: true,
        quotePriceErrorMessage: i18n.t("* Quote price must be less than maximum price"),
      });
      hasError = true;
    }
    if (this.isEmpty(quotePrice)) {
      this.setState({
        quotePriceError: true,
        quotePriceErrorMessage: i18n.t("* Please enter a quote price"),
      });
      hasError = true;
    }
    if (this.state.images.length === 0) {
      this.setState({
        imageError: true,
        imageErrorMessage: i18n.t("* Please select at least one attachment"),
      });
      hasError = true;
    }

    return hasError;
  };

  handleSubmit = () => {
    this.setState({ loading: true });
    if (this.validateForm()) {
      this.setState({ loading: false });
      return;
    }
    this.createStylistOffer()
  }

  manageCurrencyValue = (valuePrice:any,localCurrency:string) =>{
    // Add code to check currency value
     if (!valuePrice) return "";
    return localCurrency === "$"
        ? `$${valuePrice}`
        : `KWD ${valuePrice}`;
  }

  // Customizable Area End
}