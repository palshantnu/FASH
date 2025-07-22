import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
// @ts-expect-error Builder doesn't follow TS in navigation, types is not installed for this package
import { NavigationActions } from "react-navigation";
export interface FiltersPayload {
    backKey: string;
    filters: {
        colors: number[];
        minPrice?: string;
        maxPrice?: string;
        categories: string[];
        subCategory: string[];
        subSubCategory: string[];
    };
}

export interface CategoriesResponse {
    data: CategoryData[];
}

export interface CategoryData {
    id: string;
    type: string;
    attributes: CategoryAttributes;
}

export interface CategoryAttributes {
    id: number;
    name: string;
    status: string;
    created_at: string;
    updated_at: string;
    image: string;
    selected: boolean;
}

export interface ColorAttributes {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    selected: boolean;
}

export interface ColorsResponse {
    data: ColorType[];
}

export interface ColorType {
    id: string;
    type: string;
    attributes: ColorAttributes;
}

export interface ColorAttributes {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    selected: boolean;
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
    selectedFilter: string;
    minPrice: string;
    maxPrice: string;
    colors: Array<ColorAttributes>;
    filters: FiltersPayload;
    categories: {
        label: string;
        value: string;
    }[];
    subCategories: {
        label: string;
        value: string;
    }[];
    subSubCategories: {
        label: string;
        value: string;
    }[];
    category: string[];
    subCategory: string[];
    subSubCategory: string[];
    // Customizable Area End
}
interface SS {
    id: any;
}

export default class InventoryFilterController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    getColorsApiCallId = "";
    getCategoriesApiCallId = "";
    getSubCategoriesApiCallId = "";
    getSubSubCategoriesApiCallId = "";
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
            selectedFilter: "color",
            minPrice: "",
            maxPrice: "",
            colors: [],
            filters: {
                filters: { colors: [], minPrice: "", maxPrice: "", categories: [], subCategory: [], subSubCategory: [] },
                backKey: "",
            },
            categories: [],
            subCategories: [],
            subSubCategories: [],
            category: [],
            subCategory: [],
            subSubCategory: [],
        };
        // Customizable Area End
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
    }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
            return this.handleApiResponses(message);
        }
        if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
            const filters = message.getData(
                getName(MessageEnum.NavigationInventoryFilterData)
            ) as FiltersPayload;
            this.setState({
                filters: filters,
                minPrice: filters.filters.minPrice || "",
                maxPrice: filters.filters.maxPrice || "",
                selectedFilter: filters.filters.categories.length > 0 ? "category" : "color",
                category: filters.filters.categories || [],
                subCategory: filters.filters.subCategory || [],
                subSubCategory: filters.filters.subSubCategory || [],
            }, () => {
                this.getColorsList();
                this.getCategoriesList();
                this.getSubCategoriesList();
                this.getSubSubCategoriesList();
            });
        }
        // Customizable Area End
    }

    async componentDidMount() {
        // Customizable Area Start
        super.componentDidMount();
        // Customizable Area End
    }

    // Customizable Area Start
    handleApiResponses = (message: Message) => {
        const apiCallId = message.getData(
            getName(MessageEnum.RestAPIResponceDataMessage)
        );
        const responseJson = message.getData(
            getName(MessageEnum.RestAPIResponceSuccessMessage)
        );

        switch (apiCallId) {
            case this.getColorsApiCallId:
                this.handleColorResponse(responseJson);
                break;
            case this.getCategoriesApiCallId:
                this.handleCategoriesResponse(responseJson);
                break;
            case this.getSubCategoriesApiCallId:
                this.handleSubCategoriesResponse(responseJson);
                break;
            case this.getSubSubCategoriesApiCallId:
                this.handleSubSubCategoriesResponse(responseJson);
                break;
            default:
                break;
        }
    };

    private handleColorResponse = (response: ColorsResponse) => {
        if (response.data) {
            this.setState({
                colors: response.data.map((color) => ({
                    ...color.attributes,
                    selected: this.state.filters.filters.colors.includes(
                        color.attributes.id
                    ),
                })),
            });
        }
    };

    handleCategoriesResponse = (response: CategoriesResponse) => {
        if (response.data) {
            const formattedData = response.data.map(
                (item: { attributes: { name: string; id: number } }) => ({
                    label: item.attributes.name,
                    value: item.attributes.id.toString(),
                })
            );
            this.setState({ categories: formattedData });
        }
    };

    handleSubCategoriesResponse = (response: any) => {
        if (response.data) {
            const formattedData = response.data.map(
                (item: { attributes: { name: string; id: number } }) => ({
                    label: item.attributes.name,
                    value: item.attributes.id.toString(),
                })
            );
            this.setState({ subCategories: formattedData });
        }
    };

    handleSubSubCategoriesResponse = (response: any) => {
        if (response.data) {
            const formattedData = response.data.map(
                (item: { attributes: { name: string; id: number } }) => ({
                    label: item.attributes.name,
                    value: item.attributes.id.toString(),
                })
            );
            this.setState({ subSubCategories: formattedData });
        }
    };

    getColorsList = () => {
        this.apiCall(
            configJSON.getColorListApiEndPoint,
            configJSON.getAPIMethod,
            null,
            null,
            (messageId) => {
                this.getColorsApiCallId = messageId;
            }
        );
    };

    getCategoriesList = () => {
        this.apiCall(
            configJSON.getCategoriesApiEndPoint,
            configJSON.getAPIMethod,
            null,
            null,
            (messageId) => {
                this.getCategoriesApiCallId = messageId;
            }
        );
    };

    getSubCategoriesList = () => {
        this.apiCall(
            configJSON.getSubCategoriesApiEndPoint + `${this.state.category.join(",")}`,
            configJSON.getAPIMethod,
            null,
            null,
            (messageId) => {
                this.getSubCategoriesApiCallId = messageId;
            }
        );
    };

    getSubSubCategoriesList = () => {
        this.apiCall(
            configJSON.getSubSubCategoriesApiEndPoint + `${this.state.subCategory.join(",")}`,
            configJSON.getAPIMethod,
            null,
            null,
            (messageId) => {
                this.getSubSubCategoriesApiCallId = messageId;
            }
        );
    };

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

    goBack = () => this.props.navigation.goBack();

    get filters(): Array<[string, string]> {
        return [
            ["color", "Color"],
            ["price", "Price"],
            ["gender", "Gender"],
        ]
    }

    selectFilter = (filter: string) => {
        this.setState({ selectedFilter: filter });
    };

    toggleColor = (colorIndex: number) => {
        this.setState(({ colors }) => {
            const _colors = [...colors];
            _colors[colorIndex].selected = !_colors[colorIndex].selected;
            return { colors: _colors };
        });
    };

    handleCategorySelect = (item: string[]) => {
        this.setState({
            category: item,
        });
    };

    handleCategoryRemoveItem = (item: string) => {
        const category = this.state.category;
        const index = category.indexOf(item);
        category.splice(index, 1);
        this.setState({ category: category });
    };

    handleSubCategorySelect = (item: string[]) => {
        this.setState({
            subCategory: item,
        });
    };

    handleSubSubCategorySelect = (item: string[]) => {
        this.setState({
            subSubCategory: item,
        });
    };

    handleSubCategoryRemoveItem = (item: string) => {
        const subCategory = this.state.subCategory;
        const index = subCategory.indexOf(item);
        subCategory.splice(index, 1);
        this.setState({ subCategory: subCategory });
    };

    handleSubSubCategoryRemoveItem = (item: string) => {
        const subSubCategory = this.state.subSubCategory;
        const index = subSubCategory.indexOf(item);
        subSubCategory.splice(index, 1);
        this.setState({ subSubCategory: subSubCategory });
    };

    updateMinPrice = (price: string) => {
        const Price = price.replace("$", "");
        if (/^\d*$/.test(Price)) {
            this.setState({ minPrice: Price });
        }
    };

    updateMaxPrice = (price: string) => {
        const Price = price.replace("$", "");
        if (/^\d*$/.test(Price)) {
            this.setState({ maxPrice: Price });
        }
    };

    colorsCount = () => this.state.colors.length;

    getColor = (_color: unknown, colorIndex: number) => {
        return this.state.colors[colorIndex];
    };

    clearAllFilter = () => {
        this.setState(({ colors }) => {
            return {
                selectedFilter: "color",
                maxPrice: "",
                minPrice: "",
                colors: colors.map((color) => ({ ...color, selected: false })),
                category: [],
                subCategory: [],
                subSubCategory: [],
            };
        });
    };
    filtersLength = () => {
        return this.filters.length;
    };

    getFilter = (_filter: unknown, filterIndex: number) => {
        return this.filters[filterIndex];
    };

    applyFilter = () => {
        const colors: Array<number> = [];
        for (const color of this.state.colors) {
            if (color.selected) {
                colors.push(color.id);
            }
        }

        const filters =
        {
            colors,
            maxPrice: this.state.maxPrice,
            minPrice: this.state.minPrice,
            categories: this.state.category,
            subCategory: this.state.subCategory,
            subSubCategory: this.state.subSubCategory,
        };

        const setParamsAction = NavigationActions.setParams({
            params: {
                filters: filters,
            },
            key: this.state.filters.backKey,
        });
        this.props.navigation.dispatch(setParamsAction);
        this.props.navigation.goBack();
    };
    // Customizable Area End
}