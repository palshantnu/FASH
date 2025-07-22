import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { CountryData } from "../../../components/src/MobileWithCountryCodesInput";
export const configJSON = require("./config");
import DocumentPicker from "react-native-document-picker";
import ImagePicker from 'react-native-image-crop-picker';
import { getStorageData, removeStorageData,isEmail } from "../../../framework/src/Utilities"
import { pdfImage, jpgImage } from "./assets";
import { showMessage } from "react-native-flash-message";
import i18n from "../../../components/src/i18n/i18n.config";
import { BackHandler } from "react-native";
interface Country {
  numeric_code: string;
}
interface AttachmentsUploadProps {
  type: string | null;
  uri: string;
  name: string;
}
interface ResponseJsonTypes {
  error: string
}

interface ActivationResponse {
  error?: string;
  seller_owner_account?: object;
}

interface CheckIfMobileNumberIsValidResponse {
  owner_contact_valid: boolean;
  company_contact_valid: boolean;
}

type Response = CountryData[] | ActivationResponse;
interface CameraDocResponse {
  mime: string;
  data: string;
  filename?: string;
  path: string;
}
// Customizable Area End

export interface Props {
  // Customizable Area Start
  navigation: any;
  id: string | null;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  loading: boolean;
  token: string;
  fullName: string;

  emailAddress: string;

  emailErrorMsg: string;
  firstSocialMediaAccount: string;
  secondSocialMediaAccount: string;
  thirdSocialMediaAccount: string;
  fourthSocialMediaAccount: string;
  ibanNumber: string;
  bankAccountName: string;
  ibanErrorMsg: string;
  bankAccountNumber: string;
  bankAccountNumberError: string;
  fullNameErrorMsg: string;
  bankAccountNameErrorMsg: string;
  socialMediaAccountError: string;
  activePage: string;
  ownerFullAddressError: string;
  ownerFullAddress: string;

  ownerZipCode: string;
 
  ownerContactNumber: string;
  ownerContactNumberError: string;
  companyFullAddressError: string;
  companyFullAddress: string;

  companyZipCode: string;


  countryList: CountryData[];
  selectedCodeIndex: number;
  dropdownOpen: boolean;
  selectedCountryCode: string;

  companyPhoneNum: string;
  companyPhoneNumberError: string;
  companySelectedCountryCode: string;
  companyPnDropDown: boolean;
  companySelectedCodeIndex: number;
  activeGoogleLocationFocus: string;
  documentPickerModal: boolean;
  civilId: AttachmentsUploadProps;
  commercialLicense: AttachmentsUploadProps;
  authorizedSignatures: AttachmentsUploadProps;
  MoaOrAoa: AttachmentsUploadProps;
  BusinessAccountBank: AttachmentsUploadProps;
  ActivatedUploadDocumentFocus: string;
  civilIdError: string;
  commercialLicenseError: string;
  authorizedSignatureError: string;
  moaOrAoaError: string;
  businessBankAccountError: string;
  signupId:string;
  hasErrorOnSecondScreen : boolean;
  userRole:string;
  // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class AccountActivationController extends BlockComponent<
    Props,
    S,
    SS
> {
  // Customizable Area Start
  countryCodeApiCallId: string = "";
  postAccountActivationMsgId: string = "";
  checkIfMobileNumberIsValidApiCallId : string = "";
  _didFocusSubscription= "";
  _willBlurSubscription = "";
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
            // Customizable Area End
        ];

        this.state = {
            // Customizable Area Start
            txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      loading: false,
      token: "",
      fullName: "",

      emailAddress: "",
      emailErrorMsg: '',
      firstSocialMediaAccount: "",
      secondSocialMediaAccount: "",
      thirdSocialMediaAccount: "",
      fourthSocialMediaAccount: "",
      ibanNumber: "",
      bankAccountName: "",
      bankAccountNumber: "",
      ibanErrorMsg: "",
      fullNameErrorMsg: "",
      bankAccountNameErrorMsg: "",
      socialMediaAccountError: "",
      activePage: "first",
      ownerFullAddressError: "",
      ownerFullAddress: '',
   
      ownerZipCode: "",
     
      ownerContactNumber: "",
      ownerContactNumberError: "",

      companyFullAddress: "",
      companyFullAddressError: "",

      companyZipCode: "",
     

      countryList: [],
      selectedCodeIndex: 0,
      dropdownOpen: false,
      selectedCountryCode: "+965",
      companyPhoneNum: "",
      companyPhoneNumberError: "",
      companySelectedCountryCode: "+965",
      companyPnDropDown: false,
      companySelectedCodeIndex: 0,
      activeGoogleLocationFocus: "own",
      documentPickerModal: false,
      civilId: { name: "", type: "", uri: "" },
      commercialLicense: { name: "", type: "", uri: "" },
      authorizedSignatures: { name: "", type: "", uri: "" },
      MoaOrAoa: { name: "", type: "", uri: "" },
      BusinessAccountBank: { name: "", type: "", uri: "" },
      ActivatedUploadDocumentFocus: "civilId",
      civilIdError: "",
      commercialLicenseError: "",
      authorizedSignatureError: '',
      moaOrAoaError: '',
      businessBankAccountError: "",
      bankAccountNumberError: "",
      signupId:"",
      hasErrorOnSecondScreen : false,
      userRole:"0"
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        this._didFocusSubscription = this.props.navigation.addListener("willFocus", () => {
          BackHandler.addEventListener('hardwareBackPress', this.handleBack)
        });
        // Customizable Area End
    }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (!this.state.token) {
          if (getName(MessageEnum.SessionResponseMessage) === message.id) {
            const token = message.getData(getName(MessageEnum.SessionResponseToken));
            this.setState({ token: token },);
          }
        }
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
          this.handleApiResponse(message);
        }
        // Customizable Area End
    }

  // Customizable Area Start



  async componentDidMount() {
    if (!this.state.token) {
      this.getTokenInAssign();
      this.getStoreDataAddress();
      this.fetchCountryCodes();
      this.checkTypeOfUser();
    }

    this._didFocusSubscription = this.props.navigation.addListener("willFocus", () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBack)
      this.getStoreDataAddress()
    });

    this._willBlurSubscription = this.props.navigation.addListener('willBlur', () =>
      BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
    );
  }

  checkTypeOfUser = async() => {
    const user_type = await getStorageData("USER_TYPE");
    this.setState({userRole:user_type})
  }

  getTokenInAssign = () => {
    const message: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(message);
  };


  handleApiResponse = (message: Message) => {
    const responseId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    ) as string;
    const successResponse = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const errorResponse = message.getData(
      getName(MessageEnum.RestAPIResponceErrorMessage)
    );

    if (successResponse) {
      this.handleSuccessResponse(successResponse, responseId);
    } else {
      this.parseApiCatchErrorResponse(errorResponse);
      this.setState({ loading: false });
    }
  };

  handleSuccessResponse = async(response: Response, messageId: string) => {
    if (messageId === this.countryCodeApiCallId) {
      const kuwaitIndex = (response as CountryData[]).findIndex(
        (currentState: CountryData) => currentState.numeric_code === this.state.selectedCountryCode
      );
      this.setState({
        countryList: response as CountryData[],
        loading: false,
        selectedCountryCode: (response as CountryData[])[kuwaitIndex].numeric_code,
        selectedCodeIndex: kuwaitIndex,
        companySelectedCodeIndex: kuwaitIndex,
        companySelectedCountryCode: (response as CountryData[])[kuwaitIndex].numeric_code,
      });
    } else if (messageId === this.postAccountActivationMsgId) {
      const activationResponse = response as ActivationResponse;
      if (activationResponse && !activationResponse.error && activationResponse.seller_owner_account) {
        showMessage({
          message: 'Your Seller account activation request is submitted. Expect a confirmation within 24 hours.',
          position: { top: 5 },
        });
        await removeStorageData('storeAddressMap');
        this.setState({civilId: { name: "", type: "", uri: "" },commercialLicense: { name: "", type: "", uri: "" },authorizedSignatures: { name: "", type: "", uri: "" },MoaOrAoa: { name: "", type: "", uri: "" },BusinessAccountBank: { name: "", type: "", uri: "" }})
        this.btnLogoutAndRedirection();
      } else if (activationResponse.error) {
        this.showAlert('Error', JSON.stringify(activationResponse.error).replace(/"/g, ''));
      }
    } else if (messageId === this.checkIfMobileNumberIsValidApiCallId) {
      this.handleCheckIfMobileNumberIsValidResponse(response);
    }
    this.setState({ loading: false });
  };
  fetchCountryCodes = async () => {

    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.countryCodeApiCallId = message.messageId;

    message.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.countryCodeApiEndpoint
    );
    message.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.validationApiMethodType
    );
    this.setState({ loading: true });
    runEngine.sendMessage(message.id, message);

  };

  handlePostAccountActivation = async () => {
    

    const { fullName, emailAddress, firstSocialMediaAccount, secondSocialMediaAccount, thirdSocialMediaAccount, signupId,fourthSocialMediaAccount, ibanNumber, bankAccountName, ownerFullAddress, ownerZipCode, ownerContactNumber, companyFullAddress, companyZipCode, companyPhoneNum, civilId, commercialLicense, authorizedSignatures, MoaOrAoa, BusinessAccountBank, bankAccountNumber, companySelectedCountryCode, selectedCountryCode } = this.state
    const header = {
      "Content-Type": configJSON.validationFormContentType,
      token: this.state.token
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );
    let formData = new FormData();
    formData.append("data[attributes][full_name]", fullName);
    formData.append("data[attributes][email]", emailAddress);
    if (firstSocialMediaAccount) { formData.append("data[attributes][social_media_account][]", firstSocialMediaAccount) }
    if (secondSocialMediaAccount) { formData.append("data[attributes][social_media_account][]", secondSocialMediaAccount) }
    if (thirdSocialMediaAccount) { formData.append("data[attributes][social_media_account][]", thirdSocialMediaAccount) }
    if (fourthSocialMediaAccount) { formData.append("data[attributes][social_media_account][]", fourthSocialMediaAccount) }

    formData.append("data[attributes][account_holder_name]", bankAccountName);
    formData.append("data[attributes][iban]", ibanNumber);
    formData.append("data[attributes][owner_full_address]", ownerFullAddress);
    formData.append("data[attributes][owner_zip_code]", ownerZipCode);
    formData.append("data[attributes][owner_contact_number]", selectedCountryCode + ownerContactNumber);
    formData.append("data[attributes][company_full_address]", companyFullAddress);
    formData.append("data[attributes][company_zip_code]", companyZipCode);
    formData.append("data[attributes][company_contact_number]", companySelectedCountryCode + companyPhoneNum);
    this.appendFileToFormData(formData, "data[attributes][passport]", civilId);
    this.appendFileToFormData(formData, "data[attributes][commercial_license]", commercialLicense);
    this.appendFileToFormData(formData, "data[attributes][authorized_signature]", authorizedSignatures);
    this.appendFileToFormData(formData, "data[attributes][moa]", MoaOrAoa);
    this.appendFileToFormData(formData, "data[attributes][business_bank_account]", BusinessAccountBank);
    formData.append("data[attributes][account_id]", signupId);
    formData.append("data[attributes][account_number]", bankAccountNumber);


    this.postAccountActivationMsgId = requestMessage.messageId;
    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.postActivateAccopuntEndPoint
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );
    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestBodyMessage),
      formData
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.accountActivativationMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }
  appendFileToFormData = (formData: FormData, datakey: string, datafile: AttachmentsUploadProps) => {
    if (datafile.uri) {
      const fileName = datafile.uri.split('/').pop();
      const fileType = datafile.type || 'application/octet-stream';
      formData.append(datakey, {
        uri: datafile.uri,
        name: fileName,
        type: fileType
      } as unknown as Blob);
    }
  };
  getStoreDataAddress = async () => {
    let localObjectAddress = await getStorageData('storeAddressMap', true)
    let accountId = await getStorageData('signupId',true)
    this.setState({
      signupId:accountId
    })
    this.getStoreAddress(localObjectAddress)
  }

  getStoreAddress = async (localObjectAddGet: { addressselected: string }) => {
    if (localObjectAddGet != null) {
      if (this.state.activeGoogleLocationFocus === "own") { this.setState({ ownerFullAddress: localObjectAddGet.addressselected, ownerFullAddressError: "" }) }
      else {
        this.setState({ companyFullAddress: localObjectAddGet.addressselected, companyFullAddressError: '' })
      }

    }
  }

  handleCheckIfMobileNumberIsValidResponse = (response: any) => {
    const responseCheck = response as CheckIfMobileNumberIsValidResponse;
      let hasError = this.state.hasErrorOnSecondScreen;
      if (!responseCheck.owner_contact_valid) {
        if (this.isEmpty(this.state.ownerContactNumber)) {
          this.setState({
            ownerContactNumberError: i18n.t("contactNumberValidate"),
          });
          hasError = true;
        } else {
          hasError = true;
          this.setState({ ownerContactNumberError: i18n.t("ValidPhoneNumber") });
        }
      }  
      
      if (!responseCheck.company_contact_valid) {
        if (this.isEmpty(this.state.companyPhoneNum)) {
          this.setState({
            companyPhoneNumberError: i18n.t('companyPhoneNumberError'),
          });
          hasError = true;
        } else {
          hasError = true;
          this.setState({ companyPhoneNumberError: i18n.t("ValidPhoneNumber")});
        }
      }
      if (!hasError) {
        this.setState({
          activePage: "third"
        })
      }
  }

  updateOnChangeFullNametxt = (fNtxt: string) => {
    const filteredText = fNtxt.replace(/[^a-zA-Z\s]/g, '')
    this.setState({
      fullName: filteredText,
      fullNameErrorMsg: ""
    });
  }


  handleEmailChange = (text: string) => {
    this.setState({
      emailAddress: text.replace(/\s/g, "").trim(),
      emailErrorMsg: ""
    });
  };


  updateAccountName = (accountName: string) => {
    this.setState({
      bankAccountName: accountName.replace(/[^a-zA-Z\s]/g, ''),
      bankAccountNameErrorMsg: ""
    });
  }

  updateAccountNumber = (accountNumber: string) => {
    const formattedIban = accountNumber.toUpperCase().replace(/[^A-Z0-9]/g, '');
    this.setState({
      bankAccountNumber: formattedIban,
      bankAccountNumberError: ""
    })
  }

  updateFirstSocialMediaAccount = (fText: string) => {
    this.setState({
      firstSocialMediaAccount: fText.trim(),
      socialMediaAccountError: ""
    })
  }

  updateSecondSocialMediaAccount = (sText: string) => {
    this.setState({
      secondSocialMediaAccount: sText.trim(),
      socialMediaAccountError: ""
    })
  }

  updateThirdSocialMediaAccount = (tText: string) => {
    this.setState({
      thirdSocialMediaAccount: tText.trim(),
      socialMediaAccountError: ""
    })
  }

  updateFourthSocialMediaAccount = (fText: string) => {
    this.setState({
      fourthSocialMediaAccount: fText.trim(),
      socialMediaAccountError: ""
    })
  }

  updateIbanNumber = (ibanNumber: string) => {
    const formattedIban = ibanNumber.toUpperCase().replace(/[^A-Z0-9]/g, '');
    this.setState({
      ibanNumber: formattedIban,
      ibanErrorMsg: ""
    });
  }

  updateOwnerZipCode = (zipcodeTxt: string) => {
    this.setState({
      ownerZipCode: zipcodeTxt.replace(/\D/g, ''),
     
    })
  }

  updateCompanyZipCode = (zipcodeTxt: string) => {
    this.setState({
      companyZipCode: zipcodeTxt.replace(/\D/g, ''),
     
    })
  }

  handleSelectOwnerCountryCode = (index: number, country: Country) => {
    this.setState({
      selectedCodeIndex: index,
      dropdownOpen: false,
      selectedCountryCode: country.numeric_code,
    });
  };

  handleSelectCompanyCountryCode = (index: number, country: Country) => {
    this.setState({
      companySelectedCodeIndex: index,
      companyPnDropDown: false,
      companySelectedCountryCode: country.numeric_code,
    });
  };

  updateTheOwnerPhoneNumb = (changTxt: string) => {
    this.setState({
      ownerContactNumber: changTxt,
      ownerContactNumberError: '',
    });
  };

  updateTheCompanyPhoneNumb = (changTxt: string) => {
    this.setState({
      companyPhoneNum: changTxt,
      companyPhoneNumberError: '',
    });
  };

  updateOwnnertoggleDropDown = (currentState: boolean) => {
    this.setState({ dropdownOpen: !currentState });
  };

  updateCompanytoggleDropDown = (currentState: boolean) => {
    this.setState({ companyPnDropDown: !currentState });
  };

  isEmpty = (string: string) => {
    return !string.trim();
  };

  handleSecondPageRender = () => {
    this.setState({
      activePage: "second"
    })
  }

  handleSecondpageValidation = () => {
    this.setState({
      ownerFullAddressError: "",
     
      ownerContactNumberError: "",
     
     
      companyPhoneNumberError: '',
      companyFullAddressError: '',
     
    })
    const {  ownerContactNumber, ownerFullAddress, companyPhoneNum, companyFullAddress } = this.state
    let hasError = false;

    if (this.isEmpty(ownerFullAddress)) {
      this.setState({
        ownerFullAddressError:i18n.t('EnterFullAddressError') ,
      });
      hasError = true;
    }

    if (this.isEmpty(companyFullAddress)) {
      this.setState({
        companyFullAddressError: i18n.t('EnterCompanyAddressError'),
      });
      hasError = true;
    }

    this.setState({ hasErrorOnSecondScreen : hasError }, ()=>{
      this.checkIfMobileNumberIsValid(`${this.state.selectedCountryCode}${ownerContactNumber}`, `${this.state.companySelectedCountryCode}${companyPhoneNum}`);
    })
  }




  handleFirstPageValidations = () => {
    this.setState({
      fullNameErrorMsg: "",
      emailErrorMsg: "",
      ibanErrorMsg: "",
      bankAccountNameErrorMsg: "",
      socialMediaAccountError: "",
      bankAccountNumberError: ""
    })

    
    const { fullName, emailAddress, firstSocialMediaAccount, bankAccountNumber, secondSocialMediaAccount, thirdSocialMediaAccount, fourthSocialMediaAccount, ibanNumber, bankAccountName } = this.state
    let hasError = false;
    if (this.isEmpty(fullName)) {
      this.setState({
        fullNameErrorMsg: i18n.t("EnterBankNameError"),
      });
      hasError = true;
    }
    if (this.isEmpty(emailAddress)) {
      this.setState({
        emailErrorMsg: i18n.t('EnterBankEmailError'),
      });
      hasError = true;
    } else if (!isEmail("email",emailAddress).status) {
      this.setState({
        emailErrorMsg: i18n.t('EnterVilidEmail'),
      });
      hasError = true;
    }

    if (this.state.userRole!=="1" && this.isEmpty(firstSocialMediaAccount) && this.isEmpty(secondSocialMediaAccount) && this.isEmpty(thirdSocialMediaAccount) && this.isEmpty(fourthSocialMediaAccount)) {
      this.setState({
        socialMediaAccountError: i18n.t('EnterSocialMediaAccountError'),
      });
      hasError = true;
    }

    if (this.isEmpty(ibanNumber)) {
      this.setState({
        ibanErrorMsg: i18n.t('EnterIBANNumberError'),
      });
      hasError = true;
    }
    if (this.isEmpty(bankAccountName)) {
      this.setState({
        bankAccountNameErrorMsg:i18n.t('EnterBankAccountNameError') ,
      });
      hasError = true;
    }

    if (this.isEmpty(bankAccountNumber)) {
      this.setState({
        bankAccountNumberError: i18n.t('EnterBankAccountNumberError'),
      });
      hasError = true;
    }

    if (!hasError) {
      this.handleSecondPageRender()
    }
  }




  handleOnChangeTheAdress = (addresText: string) => {
    this.setState({
      ownerFullAddress: addresText,
      ownerFullAddressError: ""
    })
  }
  handleOnChangeTheCompanyAdress = (addresText: string) => {
    this.setState({
      companyFullAddress: addresText,
      companyFullAddressError: ""
    })
  }

  btnRedirectGps = (activeFocus: string) => {
    this.setState({
      activeGoogleLocationFocus: activeFocus
    })
    const message: Message = new Message(
      getName(MessageEnum.NavigationCustomformMapMessage)
    );

    message.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );

    this.send(message);
  }
  updateTheModal = (activeFocus: string) => {
    this.setState({
      documentPickerModal: !this.state.documentPickerModal,
      ActivatedUploadDocumentFocus: activeFocus
    })
  }

  launchCameraDoc = async () => {
    return new Promise((resolve, reject) => {
      ImagePicker.openCamera({
        maxWidth: 300,
        maxHeight: 400,
        includeBase64: true,
        includeExif: true,
        compressImageQuality: 0.4,
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    })
  }


  updateTheAttachmentToProperState = (response: AttachmentsUploadProps, ActivatedUploadDocumentFocus: string) => {


    switch (ActivatedUploadDocumentFocus) {
      case 'civilId':
        this.setState({ documentPickerModal: false, civilId: response, civilIdError: "" });
        break;
      case 'commercialLicense':
        this.setState({ documentPickerModal: false, commercialLicense: response, commercialLicenseError: "" });
        break;
      case 'authorizedSignatures':
        this.setState({ documentPickerModal: false, authorizedSignatures: response, authorizedSignatureError: "" });
        break;
      case 'MoaOrAoa':
        this.setState({ documentPickerModal: false, MoaOrAoa: response, moaOrAoaError: "" });
        break;
      case 'BusinessAccountBank':
        this.setState({ documentPickerModal: false, BusinessAccountBank: response, businessBankAccountError: '' });
        break;
    }
  };

  CameraDocOpen = async () => {
    const { ActivatedUploadDocumentFocus } = this.state
    this.launchCameraDoc().then((object) => {
      const cameraDocResponse = object as CameraDocResponse;
      let objData: AttachmentsUploadProps = {
        name: cameraDocResponse.filename ? cameraDocResponse.filename : 'image.jpg',
        type: cameraDocResponse.mime,
        uri: cameraDocResponse.path,
      };
      this.updateTheAttachmentToProperState(objData, ActivatedUploadDocumentFocus);
    }).catch((error) => {
      this.setState({ documentPickerModal: false });
    });
  };

  openImageFile = async () => {
    const { ActivatedUploadDocumentFocus } = this.state
     try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images,
        ],
      });

      this.updateTheAttachmentToProperState(response, ActivatedUploadDocumentFocus)
    } catch (error) {
      this.setState({ documentPickerModal: false })
    }
  }

  handleUploadImageAvailable = (imageData: AttachmentsUploadProps) => {
    if (imageData.name && imageData.uri && imageData.type) {
      return true
    }
    else { return false }
  }

  deleteTheCivilId = () => {
    this.setState({
      civilId: { name: "", type: "", uri: "" },
    })
  }

  deleteThecommercialLicense = () => {
    this.setState({
      commercialLicense: { name: "", type: "", uri: "" },
    })
  }

  deleteTheauthorizedSignatures = () => {
    this.setState({
      authorizedSignatures: { name: "", type: "", uri: "" },
    })
  }

  deleteTheMoaOrAoa = () => {
    this.setState({
      MoaOrAoa: { name: "", type: "", uri: "" },
    })
  }

  deleteTheBusinessAccountBank = () => {
    this.setState({
      BusinessAccountBank: { name: "", type: "", uri: "" },
    })
  }

  handleReturnTheImageAccordingToType = (imageType: string | null) => {
    if (imageType === 'application/pdf') {
      return pdfImage
    }
    else {
      return jpgImage
    }
  }

  handleCloseTheImagePicker=()=>{
    this.setState({ documentPickerModal: false })
  }


  handleThridPageImageValidation = () => {

    this.setState({
      civilIdError: '',
      commercialLicenseError: "",
      authorizedSignatureError: "",
      moaOrAoaError: "",
      businessBankAccountError: ""
    })
    const { civilId, commercialLicense, authorizedSignatures, MoaOrAoa, BusinessAccountBank } = this.state
    let hasError = false;

    if (!this.handleUploadImageAvailable(civilId)) {
      this.setState({
        civilIdError: i18n.t("civilIdError")
      })
      hasError = true
    }

    if (!this.handleUploadImageAvailable(commercialLicense)) {
      this.setState({
        commercialLicenseError: i18n.t("commercialLicenseError")
      })
      hasError = true
    }

    if (!this.handleUploadImageAvailable(authorizedSignatures)) {
      this.setState({
        authorizedSignatureError: i18n.t("authorizedSignatureError")
      })
      hasError = true
    }

    if (!this.handleUploadImageAvailable(MoaOrAoa)) {
      this.setState({
        moaOrAoaError:  i18n.t("moaOrAoaError")
      })
      hasError = true
    }
    if (!this.handleUploadImageAvailable(BusinessAccountBank)) {
      this.setState({
        businessBankAccountError:  i18n.t("businessBankAccountError")
      })
      hasError = true
    }

    if (!hasError) {
      this.handlePostAccountActivation()
    }
  }

  handleTheNextButton = () => {

    if (this.state.activePage === 'first') {
      this.handleFirstPageValidations()
    }
    else if (this.state.activePage === 'second') {

      this.handleSecondpageValidation()
    }
    else if (this.state.activePage === "third") {
      this.handleThridPageImageValidation()
    }
  }

  btnLogoutAndRedirection = ()=>{
    removeStorageData('token')
    removeStorageData('buyerAddAddressMap')
    removeStorageData('storeAddressMap')
    removeStorageData('autoLogin')
    removeStorageData('createStoreArr')
   
    const sessionMessage = new Message(getName(MessageEnum.SessionSaveMessage));
    sessionMessage.initializeFromObject({
    [getName(MessageEnum.SessionResponseData)]: {},
    [getName(MessageEnum.SessionResponseToken)]: null
    })
    this.send(sessionMessage);
    
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationLoginOptionsMessage)
  );

  msgNavigation.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
  );



  this.send(msgNavigation);
}

  handleTheBackButton = () => {
    if (this.state.activePage === 'first') {
      this.btnLogoutAndRedirection();
    }

    if (this.state.activePage === 'second') {
      this.setState({
        activePage: "first"
      })
    }

    if (this.state.activePage === 'third') {
      this.setState({
        activePage: "second"
      })
    }
  }

  handleReturnTheText = () => {
    if (this.state.activePage === "third") {
      return i18n.t("Upload")
    } else {
      return  i18n.t("Next")
    }
  }

  checkIfMobileNumberIsValid = (mobileNumber1: string, mobileNumber2: string) => {
    const header = {
      "Content-Type": configJSON.validationFormContentType,
      token: this.state.token
    };

    let formData = new FormData();

    formData.append("data[attributes][owner_contact_number]", mobileNumber1);
    formData.append("data[attributes][company_contact_number]", mobileNumber2);

    this.apiCall(
      configJSON.checkIfMobileNumberIsValidApiEndPoint,
      configJSON.checkIfMobileNumberIsValidMethod,
      header,
      formData,
      (messageId) => {
        this.checkIfMobileNumberIsValidApiCallId = messageId;
      }
    );
  }

  apiCall = (
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

  handleBack = ()=>{
    const msgNavigate: Message = new Message(
      getName(MessageEnum.NavigationEmailLogInMessage)
    );
    msgNavigate.addData(
      getName(MessageEnum.NavigationPropsMessage),
      this.props
    );
    this.send(msgNavigate);
    return true;
  }
  // Customizable Area End
}
