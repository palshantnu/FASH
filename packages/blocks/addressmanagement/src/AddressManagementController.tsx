import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import { EmitterSubscription } from "react-native";
import { CountryData } from "../../../components/src/MobileWithCountryCodesInput";
import {
  getStorageData,
  removeStorageData,
} from "../../../framework/src/Utilities";
import { AddressResponse, Address, Meta } from "./responses";
import { Alert } from "react-native";
import i18n from "../../../components/src/i18n/i18n.config";
import { setStorageData } from "framework/src/Utilities";

interface AddressProps {
  addressselected: string;
  latitude: string;
  longitude: string;
}
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

// Customizable Area Start
export interface AddressDataType {
  name: string;
  country_code: string;
  phone_number: string;
  contact_number: string;
  street: string;
  zipcode: string;
  area: string;
  block: string;
  city: string;
  house_or_building_number: string;
  floor: null | string;
  address_name: string;
  is_default: boolean;
  latitude: number;
  longitude: number;
}

export interface AddressType extends Address {}

export interface AddressValueType {
  value: string;
}

export const AdressTypeData = [
  {
    value: "Home",
    label: "Home",
  },
  {
    value: "Work",
    label: "Work",
  },
  {
    value: "Other",
    label: "Other",
  },
];
// Customizable Area End

interface S {
  // Customizable Area Start
  txtInputAddressValue: string;
  txtInputLatValue: string;
  txtInputLngValue: string;
  token: string;
  addressTypeValue: string;
  addressList: Array<Address> | null;
  name: string;
  area: string;
  block: string;
  address: string;
  houseNumber: string;
  city: string;
  zipCode: string;
  contactNumber: string;
  addressName: string;
  isDeafultAddress: boolean;
  isName: boolean;
  isArea: boolean;
  isBlock: boolean;
  isAddress: boolean;
  isHouseNumber: boolean;
  isCity: boolean;
  isZipCode: boolean;
  isContactNumber: boolean;
  isAddressName: boolean;
  loading: boolean;
  header: string;
  isEditAdddress: boolean;
  editId: string;
  dropdownOpen: boolean;
  selectedCodeIndex: number;
  countryList: CountryData[];
  countryCodeSelected: string;
  latitude: string;
  longitude: string;
  checkoutId: number;
  fromChat : boolean;
  assignedAddressId: number;
  backupDefaultAddressId: string;
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class AddressManagementController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiAddAddressCallId: string = "";
  apiGetAllAddressCallId: string = "";
  apiDeleteAddressCallId: string = "";
  apiEditAddressCallId: string = "";
  countryCodeApiCallId = "";
  assignAddressToOrderApiCallId = "";
  isFocused = true;
  willFocus = { remove: () => {} } as EmitterSubscription;
  willBlur = { remove: () => {} } as EmitterSubscription;
  focusListener = { remove: () => {} } as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      txtInputAddressValue: "",
      txtInputLatValue: "",
      txtInputLngValue: "",
      addressTypeValue: AdressTypeData[0].value,
      addressList: [],
      token: "",
      name: "",
      area: "",
      block: "",
      address: "",
      houseNumber: "",
      city: "",
      zipCode: "",
      contactNumber: "",
      addressName: "",
      isDeafultAddress: false,
      isName: false,
      isArea: false,
      isBlock: false,
      isAddress: false,
      isHouseNumber: false,
      isCity: false,
      isZipCode: false,
      isContactNumber: false,
      isAddressName: false,
      loading: true,
      header: "Add New",
      isEditAdddress: false,
      editId: "",
      dropdownOpen: false,
      selectedCodeIndex: -1,
      countryList: [],
      countryCodeSelected: "",
      latitude: "",
      longitude: "",
      checkoutId: 0,
      fromChat: false,
      assignedAddressId: 0,
      backupDefaultAddressId: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken();
    
    if (this.isPlatformWeb() === true) {
      this.willFocus = this.props.navigation.addListener("willFocus", () => {
        this.isFocused = true;
        this.getToken();
      });
      this.willBlur = this.props.navigation.addListener("willBlur", () => {
        this.isFocused = false;
      });
    }

    this.focusListener = this.props.navigation.addListener("willFocus", async () => {
      this.loadAddresses(this.state.token);
      this.getStoreDataAddress(); 
    });
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (!this.isFocused) {
      return;
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      return this.handleApiResponses(message);
    } else if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token }, () => {
        this.loadAddresses(token);
        this.fetchCountryCodesInAddress();
        this.getStoreDataAddress();
      });
      return;
    } else if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
      this.handleNavigationPayload(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start
  componentWillUnmount = async () => {
    this.willBlur.remove();
    this.willFocus.remove();
  };

  handleApiResponses = (message: Message) => {
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );

    let errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );
    runEngine.debugLog("API Message Recived", message);

    if (apiRequestCallId === this.apiGetAllAddressCallId) {
      this.setState({ loading: false });
      this.getAddressResponseHandler(responseJson, errorResponse);
    } else if (apiRequestCallId === this.apiAddAddressCallId) {
      this.setState({ loading: false });
      this.addAddressResponseHandler(responseJson, errorResponse);
    } else if (apiRequestCallId === this.apiDeleteAddressCallId) {
      this.setState({ loading: false });
      this.deleteAddressResponseHandler(responseJson, errorResponse);
    } else if (apiRequestCallId === this.apiEditAddressCallId) {
      this.setState({ loading: false });
      this.editAddressResponseHandler(responseJson, errorResponse);
    } else if (apiRequestCallId === this.countryCodeApiCallId) {
      const countryIndex = responseJson.findIndex(
        ({ country_code, numeric_code }: CountryData) => {
          if (this.state.countryCodeSelected) {
            return numeric_code === this.state.countryCodeSelected;
          }
          return country_code === "KW";
        }
      );
      this.setState({
        loading: false,
        countryList: responseJson,
        selectedCodeIndex: countryIndex,
        countryCodeSelected: responseJson[countryIndex].numeric_code,
      });
    } else if (apiRequestCallId === this.assignAddressToOrderApiCallId) {
      this.setState({ loading: false });
      showMessage({
        message: i18n.t("deliveryAddressUpdatedSuccessfully"),
        position: { top: 8 },
        type: "success",
      });
      this.props.navigation.goBack();
    }
  };

  getAddressResponseHandler = async (
    responseJson: AddressResponse,
    errorResponse: unknown
  ) => {
    if (responseJson !== null) {
      if ("data" in responseJson) {
        let addressesGet = responseJson.data;
        let backupDefaultaddress = "";

        try {
          const savedId = await getStorageData("address_id");
          addressesGet = addressesGet.map((item) => {
            this.setState({isDeafultAddress:item.attributes.is_default})
            const isDefaultValue = item.id === savedId;
            if (isDefaultValue) {
              backupDefaultaddress = item.id;
            }
            return {
              ...item,
              attributes: { ...item.attributes, is_default_1: isDefaultValue },
            };
          });
          return this.setState({
            addressList: addressesGet,
            backupDefaultAddressId: backupDefaultaddress,
            loading: false,
          });
        } catch (error) {
          console.error("Error accessing AsyncStorage:", error);
        }
      }
    }
    this.parseApiCatchErrorResponse(errorResponse);
  };

  addAddressResponseHandler = (
    responseJson: Address,
    errorResponse: unknown
  ) => {
    if (responseJson !== null) {
      if ("data" in responseJson) {
        showMessage({
          message: i18n.t("addressAddedSuccessfully"),
          position: { top: 8 },
          type: "info",
        });
        this.handleNavigation();
      } else {
        //Check Error Response
        this.parseApiErrorResponse(responseJson);
      }
    }
    this.parseApiCatchErrorResponse(errorResponse);
  };

  deleteAddressResponseHandler = (
    responseJson: Meta,
    errorResponse: unknown
  ) => {
    if (responseJson !== null) {
      if ("message" in responseJson) {
        showMessage({
          message: i18n.t("addressDeletedSuccessfully"),
          position: { top: 8 },
          type: "success",
        });
        this.loadAddresses(this.state.token);
      } else {
        // Check Error Response
        this.parseApiErrorResponse(responseJson);
      }
    }
    this.parseApiCatchErrorResponse(errorResponse);
  };

  editAddressResponseHandler = (
    responseJson: Address,
    errorResponse: unknown
  ) => {
    if (responseJson !== null) {
      if ("data" in responseJson) {
        showMessage({
          message: i18n.t("addressUpdatedSuccessfully"),
          position: { top: 8 },
        });
        this.handleNavigation();
      } else {
        //Check Error Response
        this.parseApiErrorResponse(responseJson);
      }
    }
    this.parseApiCatchErrorResponse(errorResponse);
  };

  editAddresshandler = (editAddressTypeGet: Address) => {
    let countryIndex = 0;
    if (this.state.countryList.length) {
      countryIndex = this.state.countryList.findIndex(
        ({ numeric_code }) =>
          numeric_code === editAddressTypeGet.attributes.country_code
      );
    }
    this.setState({
      addressName: editAddressTypeGet.attributes.address_name,
      houseNumber: editAddressTypeGet.attributes.house_or_building_number,
      area: editAddressTypeGet.attributes.area,
      block: editAddressTypeGet.attributes.block,
      city: editAddressTypeGet.attributes.city,
      countryCodeSelected: editAddressTypeGet.attributes.country_code,
      selectedCodeIndex: countryIndex,
      contactNumber: editAddressTypeGet.attributes.phone_number,
      name: editAddressTypeGet.attributes.name,
      address: editAddressTypeGet.attributes.street,
      zipCode: editAddressTypeGet.attributes.zipcode,
      latitude: editAddressTypeGet.attributes.latitude.toString(),
      longitude: editAddressTypeGet.attributes.longitude.toString(),
      header: "Edit",
      isEditAdddress: true,
      editId: editAddressTypeGet.id,
      isDeafultAddress: editAddressTypeGet.attributes.is_default,
    });
  };

  loadAddresses = (token: string) => {
    if (this.state.isEditAdddress || token === "") {
      return;
    }

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    const header = {
      "Content-Type": configJSON.getAddressApiContentType,
      token: token,
    };

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getAddressApiEndPoint
    );
    
    this.apiGetAllAddressCallId = requestMessage.messageId;
    
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.getAddressApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  getToken = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };

  handleNavigationPayload = (message: Message) => {
    const addAddressParams = message.getData(
      getName(MessageEnum.AddAddressMessage)
    );
    const checkoutParams = message.getData(
      getName(MessageEnum.CheckoutAddressMessage)
    );
    if (
      addAddressParams &&
      addAddressParams.data &&
      addAddressParams.comingFrom === "edit"
    ) {
      this.setState({
        countryCodeSelected: addAddressParams.data.attributes.country_code,
      });
      this.editAddresshandler(addAddressParams.data);
    }
    if (checkoutParams) {
      this.setState({ checkoutId: checkoutParams.id});
      if (checkoutParams.from == "cart") {
        this.setState({ fromChat: true });
      }
    }
  };

  addNewAddress = () => {
    if (this.state.name.length === 0) {
      this.setState({ isName: true });
      return;
    }

    if (this.state.area.length === 0) {
      this.setState({ isArea: true });
      return;
    }

    if (this.state.block.length === 0) {
      this.setState({ isBlock: true });
      return;
    }

    if (this.state.address.length === 0) {
      this.setState({ isAddress: true });
      return;
    }

    this.filedsValidation();
  };

  firstNameChange = (text: string) => {
    this.setState({ name: text, isName: false });
  };

  areaChange = (text: string) => this.setState({ area: text, isArea: false });

  blockChange = (text: string) =>
    this.setState({
      block: text,
      isBlock: false,
    });

  addressChange = (text: string) =>
    this.setState({
      address: text,
      isAddress: false,
    });

  hnChange = (text: string) =>
    this.setState({ houseNumber: text, isHouseNumber: false });

  cityChange = (text: string) => this.setState({ city: text, isCity: false });

  zipChange = (text: string) => {
    this.setState({ isZipCode: false });
    this.onInputChangeZipCode(text);
  };

  addressNameChange = (text: string) =>
    this.setState({ addressName: text, isAddressName: false });

  updateCountry = (index: number, { numeric_code }: CountryData) => {
    this.setState({
      selectedCodeIndex: index,
      dropdownOpen: false,
      countryCodeSelected: numeric_code,
    });
  };

  updatePhoneNumber = (text: string) =>
    this.setState({ contactNumber: text, isContactNumber: false });

  toggleCountryDropdown = (open: boolean) =>
    this.setState({ dropdownOpen: !open });

  toggleDefaultSwitch = (value: boolean) => {
    if (this.state.isEditAdddress && !value) {
      return showMessage({
        message: i18n.t("make_it_default_delivery_address"),
        position: { top: 8 },
        type: "info",
      });
    }
    this.setState({ isDeafultAddress: value });
  };

  filedsValidation = async () => {
    if (this.state.houseNumber.length === 0) {
      this.setState({ isHouseNumber: true });
      return false;
    }

    if (this.state.contactNumber.length === 0) {
      this.setState({ isContactNumber: true });
      return false;
    }

    if (this.state.addressName.length === 0) {
      this.setState({ isAddressName: true });
      return false;
    }

    if (this.state.isEditAdddress) {
      this.handleEditAddressPressed();
    } else {
      this.handleSavePressed();
    }
    await removeStorageData("buyerAddAddressMap");
  };

  handleSavePressed() {
    const header = {
      "Content-Type": configJSON.addAddressApiContentType,
      token: this.state.token,
    };

    const httpBodyAddAddress = {
      block: this.state.block,
      zipcode: this.state.zipCode,
      name: this.state.name,
      phone_number: this.state.contactNumber,
      area: this.state.area,
      house_or_building_number: this.state.houseNumber,
      street: this.state.address,
      country_code: this.state.countryCodeSelected,
      is_default: this.state.isDeafultAddress,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      address_name: this.state.addressName,
    };

    const requestMessageAddAddress = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiAddAddressCallId = requestMessageAddAddress.messageId;

    requestMessageAddAddress.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addAddressAPiEndPoint
    );

    requestMessageAddAddress.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessageAddAddress.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      JSON.stringify(httpBodyAddAddress)
    );

    requestMessageAddAddress.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.addAddressApiMethod
    );

    runEngine.sendMessage(
      requestMessageAddAddress.id,
      requestMessageAddAddress
    );
  }

  fetchCountryCodesInAddress = () => {
    this.setState({ loading: true });
    const messageInAddress = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.countryCodeApiCallId = messageInAddress.messageId;

    messageInAddress.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.countryCodeApiEndpoint
    );
    messageInAddress.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.countryCodeApiMethod
    );

    runEngine.sendMessage(messageInAddress.id, messageInAddress);
  };

  goToBackInAddAddress = async () => {
    await removeStorageData("buyerAddAddressMap");
    this.handleNavigation();
  };

  handleNavigation = async () => {
    const add_navigation = await getStorageData("Location_Recirect", true);
    if (add_navigation) {
      setTimeout(() => {
        this.props.navigation.navigate("LandingPage");
      }, 1500);
    } else {
      this.props.navigation.goBack();
    }
  };

  getStoreDataAddress = async () => {
    let localObjectAddress = await getStorageData("buyerAddAddressMap", true);
    this.getStoreAddress(localObjectAddress);
  };

  getStoreAddress = async (localObjectAddGet: AddressProps) => {
    if (localObjectAddGet !== null) {
      this.setState({
        address: localObjectAddGet.addressselected,
        latitude: localObjectAddGet.latitude,
        longitude: localObjectAddGet.longitude,
      });
    }
  };

  btnRedirectGpsInAdd = () => {
    this.props.navigation.navigate("CustomformMap", {
      comingFrom: "buyerAddAddress",
    });
  };

  goToAddAddress = () => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationAddAddressMessage)
    );
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

  editAddress = (addressId: string, code: string) => {
    if (this.state.addressList !== null) {
      const addressData = this.state.addressList.find(
        (address) => address.id === addressId
      )!;
      const countryIndex = this.state.countryList.findIndex(
        (country: CountryData) => country.numeric_code === code
      );
      const message = new Message(
        getName(MessageEnum.NavigationAddAddressMessage)
      );
      message.initializeFromObject({
        [getName(MessageEnum.NavigationPropsMessage)]: this.props,
        [getName(MessageEnum.AddAddressMessage)]: {
          data: {
            ...addressData,
            attributes: {
              ...addressData.attributes,
              is_default: addressData.id === this.state.backupDefaultAddressId,
            },
          },
          countryIndex: countryIndex,
          comingFrom: "edit",
        },
      });
      this.send(message);
    }
  };

  deleteAddress = (addressId: string) => {
    Alert.alert(
      i18n.t("Alert"),
      i18n.t("Are you sure you want to delete address."),
      [
        {
          text: i18n.t("No"),
          onPress: () => {},
          style: "cancel",
        },
        {
          text: i18n.t("Yes"),
          onPress: () => this.confirmToDeleteAddress(addressId),
        },
      ]
    );
  };

  confirmToDeleteAddress = (addressId: string) => {
    const header = {
      "Content-Type": configJSON.addAddressApiContentType,
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    this.apiDeleteAddressCallId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addAddressAPiEndPoint + "/" + addressId
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.deleteAddressApiMethod
    );
    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  handleEditAddressPressed = async () => {
    const header = {
      "Content-Type": configJSON.addAddressApiContentType,
      token: this.state.token,
    };

    const httpBody = {
      name: this.state.name,
      area: this.state.area,
      block: this.state.block,
      street: this.state.address,
      house_or_building_number: this.state.houseNumber,
      zipcode: this.state.zipCode,
      phone_number: this.state.contactNumber,
      is_default: this.state.isDeafultAddress,
      address_name: this.state.addressName,
      country_code: this.state.countryCodeSelected,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };

    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.apiEditAddressCallId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.addAddressAPiEndPoint + "/" + this.state.editId
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
      configJSON.updateAddressApiMethod
    );

    runEngine.sendMessage(requestMessage.id, requestMessage);
  };

  onInputChangeZipCode = (text: string) => {
    const regex = configJSON.zipcodeRegex;
    if (text === "" || regex.test(text)) {
      this.setState({ zipCode: text });
    }
  };

  toggleAssignAddress = (id: string) => {
    this.setState(
      ({ addressList }) => {
        const updatedAddressList = addressList!.map((item) => ({
          ...item,
          attributes: {
            ...item.attributes,
            is_default_1: item.id.toString() === id.toString(),
          },
        }));
        return {
          loading: true,
          addressList: updatedAddressList,
        };
      },
      () => {
        if (this.state.fromChat) {
          this.addAddressToChatCheckoutOrder(id)
        }else {
          this.addAddressToCheckoutOrder(id)
        }
      }
    );
    this.updatelocalStorage(id);
  };

  updatelocalStorage = async (id: string) => {
    await setStorageData("address_id", id);
  };
  
  addAddressToCheckoutOrder = (id : any) => {
    const header = {
      "Content-Type": configJSON.getAddressApiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: header,
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.assignAddress,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.addAddressApiMethod,
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        address_id: id,
        order_id: this.state.checkoutId,
      }),
    });
    this.assignAddressToOrderApiCallId = message.messageId;
    runEngine.sendMessage(message.id, message);
  }

  addAddressToChatCheckoutOrder = (id : any) => {
    const header = {
      "Content-Type": configJSON.getAddressApiContentType,
      token: this.state.token,
    };
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: header,
      [getName(MessageEnum.RestAPIResponceEndPointMessage)]:
        configJSON.assignAdderssToChat + id + `&id=${this.state.checkoutId}`,
      [getName(MessageEnum.RestAPIRequestMethodMessage)]:
        configJSON.updateAddressApiMethod,
    });
    this.assignAddressToOrderApiCallId = message.messageId;
    runEngine.sendMessage(message.id, message);
  }

  closeDropDown = () => {
    this.setState({ dropdownOpen: false });
  };
  // Customizable Area End
}
