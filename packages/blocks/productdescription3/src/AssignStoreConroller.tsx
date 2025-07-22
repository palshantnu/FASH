import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { runEngine } from "../../../framework/src/RunEngine";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum"
// Customizable Area Start
import {
    ProductData, BusinessItem, Variant
} from "./response";
import { showMessage } from "react-native-flash-message";
import i18n from '../../../components/src/i18n/i18n.config'
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
    navigation: any;
    id: string;
    // Customizable Area Start
    // Customizable Area End
}

interface S {
    txtInputValue: string;
    txtSavedValue: string;
    enableField: boolean;
    // Customizable Area Start
    token: string | null;
    loading: boolean;
    assignStore: BusinessItem[]
    isThisAssignStore: boolean;
    assignStoreSearchText: string;
    isSelectAll: boolean;
    selectedItem: any
    catalougeDetails: ProductData;
    errorMsg: {
        errorHeader: string,
        errorTitle: string
    },
    updateLanguage:string;
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class AssignStoreConroller extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start

    getAllStoreApiCallId: string = "";
    postCreateCatalougeApiCallMsgId: string = "";
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            // Customizable Area Start
            getName(MessageEnum.RestAPIResponceMessage),
            getName(MessageEnum.SessionResponseMessage),
            getName(MessageEnum.NavigationPayLoadMessage),
            getName(MessageEnum.SessionSaveMessage),
            // Customizable Area End
        ];

        this.state = {
            enableField: false,
            txtInputValue: "",
            txtSavedValue: "A",
            // Customizable Area Start
            loading: false,

            token: "",
            assignStore: [

            ],
            isThisAssignStore: false,
            assignStoreSearchText: "",
            isSelectAll: false,
            selectedItem: [],
            catalougeDetails: {
                addProductDetails: {
                    brand: "",
                    category: "",
                    fit: "",
                    gender: "",
                    isListed: "",
                    material: "",
                    productCare: "",
                    productDescription: "",
                    productName: "",
                    subCategory: "",
                    subSubCategory: "",

                    productNameArabic:"",
                    brandArabic: "",
                    materialArabic: "",
                    fitArabic: "",
                    productCareArabic:"",
                    productDescriptionArabic:"",
                    genderAra:""
                },
                variants: []
            },
            errorMsg: {
                "errorHeader": "",
                "errorTitle": ""
            },
            updateLanguage:i18n.language
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start

        // Customizable Area End
    }

    async receive(from: string, message: Message) {
        runEngine.debugLog("Message Recived", message);
        // Customizable Area Start
        this.setState({loading:true})
        if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {

            const catalougeApiData = message.getData(
                getName(MessageEnum.ProductDetailsData));
            if (catalougeApiData) {
                this.setState({ catalougeDetails: catalougeApiData })
                this.fetchTheStoreDetails()
            }
           

        }

        if (getName(MessageEnum.SessionResponseMessage) === message.id) {

            const token = message.getData(getName(MessageEnum.SessionResponseToken));
            this.handleResponseToken(token)
           
        }
        if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
            const apiRequestCallId = message.getData(
                getName(MessageEnum.RestAPIResponceDataMessage)
            );

            const errorReponse = message.getData(getName(MessageEnum.RestAPIResponceErrorMessage));

            const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));


            if (errorReponse) {
                this.setState({ loading: false })
                this.showAlert(i18n.t('alertText'), i18n.t('somethingWentWrong'))
            }
            if (apiRequestCallId) {
                if (apiRequestCallId === this.getAllStoreApiCallId) {

                    this.handleGetStorelistResponse(responseJson)


                }
                if (apiRequestCallId === this.postCreateCatalougeApiCallMsgId) {
                    this.handleCreateCatalogueApiResponse(responseJson)
                }

                this.setState({ loading: false })
            }
        }
        // Customizable Area End
    }
    // Customizable Area Start
    handleResponseToken=(token:string)=>{
        if (token) {
            this.setState({ token: token });
        }
        else {
            this.showAlert(i18n.t('alertText'), i18n.t('pleaseLoginAgain'));
        }
    }
    async componentDidMount() {


        this.getToken();

        this.props.navigation.addListener("willFocus", () => {
            this.getToken();

        });

    }

    getToken = () => {
        const msg: Message = new Message(
            getName(MessageEnum.SessionRequestMessage)
        );
        this.send(msg);
    };

    handleGetStorelistResponse = (responseJson: any) => {
        if (responseJson && responseJson.data && !responseJson.errors) {
            this.setState({
                assignStore: responseJson.data,


            })
            if (!this.state.assignStoreSearchText) {
                this.setState({ isThisAssignStore: responseJson.data.length > 0 })
            }
        } else { this.showAlert(i18n.t('alertText'), i18n.t('somethingWentWrong')) }
    }

    updateTheSearchText = (text: string) => {
        const newText = text.replace(/[^a-zA-Z0-9\s]/g, '').trimStart();
        this.setState({ assignStoreSearchText: newText });

    }

    searchAssignStore = () => {
        this.fetchTheStoreDetails(this.state.assignStoreSearchText)
    }

    updateSelectAllCheckBox = () => {
        this.setState({ isSelectAll: !(this.state.isSelectAll) })
    }

    toggleItemSelection = (id: string | number) => {
        const index = this.state.selectedItem.indexOf(id);
        if (index === -1) {
            this.setState({
                selectedItem: [...this.state.selectedItem, id],

            })

        } else {
            this.setState({
                selectedItem: (this.state.selectedItem.filter((item: string | number) => item !== id)),
                isSelectAll: false
            })

        }
    }

    handleCreateCatalogueApiResponse = (responseJson: any) => {
        if (responseJson && !responseJson.errors && !responseJson.error) {
            showMessage({
                message: i18n.t('productListSuccess'),
                position: { top: 5 },
            });
            const msg: Message = new Message(
                getName(MessageEnum.NavigationCatalogueSellerMessage)
            );

            msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
            this.send(msg);
        } else {
            if (responseJson.errors) {
                const errorMessages = responseJson.errors.map((error: string) => Object.values(error)[0]);
                if (errorMessages.includes("Variant SKU has already been taken.")) {
                    this.showAlert(i18n.t('alertText'), i18n.t('variantAlreadyTaken'));
                } else {
                    this.showAlert(i18n.t('alertText'), i18n.t('somethingWentWrong'));
                }
            } else {
                this.showAlert(i18n.t('alertText'), i18n.t('somethingWentWrong'));
            }
        }
    }

    toggleSelectAll = () => {
        const { assignStore } = this.state;
        const { isSelectAll } = this.state;

        if (!isSelectAll) {
            const allIds = assignStore.map((item: any) => item.id);
            this.setState({
                selectedItem: allIds,
                isSelectAll: true
            });
        } else {
            this.setState({
                selectedItem: [],
                isSelectAll: false
            });
        }
    };


    fetchTheStoreDetails = async (searchTxt?: string) => {
      
        const header = {
            "Content-Type": configJSON.exampleApiContentType,
            token: this.state.token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getAllStoreApiCallId = requestMessage.messageId;
        if (searchTxt) {
            if(this.state.updateLanguage === 'en')
            {
                requestMessage.addData(
                    getName(MessageEnum.RestAPIResponceEndPointMessage),
                    configJSON.getAllStoreApiEndPoint + "&search=" + searchTxt
                );
            }else{
                requestMessage.addData(
                    getName(MessageEnum.RestAPIResponceEndPointMessage),
                    configJSON.getAllStoreApiEndPoint + "&search=" + searchTxt+'&language=ar'
                );
            }
        } else {
            if(this.state.updateLanguage === 'en')
            {
                requestMessage.addData(
                    getName(MessageEnum.RestAPIResponceEndPointMessage),
                    configJSON.getAllStoreApiEndPoint
                );
            }else{
                requestMessage.addData(
                    getName(MessageEnum.RestAPIResponceEndPointMessage),
                    configJSON.getAllStoreApiEndPoint+'&language=ar'
                );
            }
        }

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.getExampleMethod
        );
        this.setState({ loading: true })
        runEngine.sendMessage(requestMessage.id, requestMessage);
    };
    postCreateCatalogue = () => {
        if (this.state.selectedItem.length > 0) {
            this.createCatalougeApi()
            this.setState({
                errorMsg: {
                    errorHeader: "",
                    errorTitle: ""
                }
            });
        }
        else {

            this.setState({
                errorMsg: {
                    errorHeader: "Store is required",
                    errorTitle: "Please select a store"
                }
            });

        }

    }

    createCatalougeApi = async () => {
        const { addProductDetails, variants } = this.state.catalougeDetails

        const header = {
            "Content-Type": configJSON.createCatalougueApiContentType,
            token: this.state.token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.postCreateCatalougeApiCallMsgId = requestMessage.messageId;

        let formData = new FormData();

        formData.append("name", addProductDetails.productName);
        formData.append("gender", addProductDetails.gender);
        formData.append("brand_name", addProductDetails.brand);
        formData.append("category_id", addProductDetails.category);
        formData.append("sub_category_id", addProductDetails.subCategory);
        formData.append("sub_sub_category_id", addProductDetails.subSubCategory);
        formData.append("material", addProductDetails.material);
        formData.append("fit", addProductDetails.fit);
        formData.append("prodcut_care", addProductDetails.productCare);
        formData.append("list_the_product", addProductDetails.isListed);
        formData.append("description", addProductDetails.productDescription);
        this.state.selectedItem.forEach((item: string | number) => {
            formData.append("store_ids[]", item.toString());
        });


        variants.forEach((variant: Variant, index: number) => {
            const { catalogue_variant_color_id, catalogue_variant_size_id, stock_qty, price, sku, remove_back_image, remove_front_image, remove_side_image } = variant;

            formData.append(`catalogue_variants_attributes[${index}][catalogue_variant_color_id]`, catalogue_variant_color_id.toString());
            formData.append(`catalogue_variants_attributes[${index}][catalogue_variant_size_id]`, catalogue_variant_size_id.toString());
            formData.append(`catalogue_variants_attributes[${index}][stock_qty]`, stock_qty.toString());
            formData.append(`catalogue_variants_attributes[${index}][price]`, price.toString());
            formData.append(`catalogue_variants_attributes[${index}][sku]`, sku.toString());

            if (remove_front_image) {
                formData.append(`catalogue_variants_attributes[${index}][front_image]`, remove_front_image);
            }

            if (remove_back_image) {
                formData.append(`catalogue_variants_attributes[${index}][back_image]`, remove_back_image);
            }

            if (remove_side_image) {
                formData.append(`catalogue_variants_attributes[${index}][side_image]`, remove_side_image);
            }
        });

        formData.append("name_arabic", addProductDetails.productNameArabic);
        formData.append("brand_name_arabic", addProductDetails.brandArabic);
        formData.append("material_arabic", addProductDetails.materialArabic);
        formData.append("fit_arabic", addProductDetails.fitArabic);
        formData.append("prodcut_care_arabic", addProductDetails.productCareArabic);
        formData.append("description_arabic", addProductDetails.productDescriptionArabic);
        formData.append("gender_arabic", addProductDetails.genderAra);

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.postCreateCatalougeApiEndPoint
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
            configJSON.postMethod
        );
        this.setState({ loading: true })
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }


    // Customizable Area End
}
