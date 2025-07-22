import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export type SortByFilter = 'mostRecent' | 'oldestFirst';
export type OrderStatus = 'allOrders' | 'processing' | 'delivered' | 'returned';
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
    sortBy:SortByFilter
    isActiveFilter:string;
    orderStatus: {
        allOrders: boolean;
        processing: boolean;
        delivered: boolean;
        returned: boolean;
    };
    orderDate: string;
    paramsFilterFun?:any
    selectedSortValue: string;
    selectedOrderDate: string;
    selectedStatus: string[];
    // Customizable Area End
}

interface SS {
    id: any;
}

export default class FiltersOrdersController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    // Customizable Area End
    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        // Customizable Area Start
        this.subScribedMessages = [
            getName(MessageEnum.NavigationPayLoadMessage),
            getName(MessageEnum.SessionResponseMessage),
            getName(MessageEnum.RestAPIResponceMessage),
        ];

        this.state = {
            sortBy: 'mostRecent',
            isActiveFilter:'sortByActive',
            orderStatus: {
                allOrders: true,
                processing: false,
                delivered: false,
                returned: false,
            },
            orderDate: 'last30days',
            paramsFilterFun: () => {},
            selectedSortValue: '',
            selectedOrderDate: '',
            selectedStatus: [],
        };

        // Customizable Area End

        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }
    async receive(_from: string, message: Message) {
        // Customizable Area Start
        if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
            const data = message.getData(
                getName(MessageEnum.SessionResponseData)
            );
            this.setState({
                paramsFilterFun: data.param1
            })
        }
        // Customizable Area End
    }
    // Customizable Area Start
    handleChangeFilter = (value: string) => {
        this.setState({ isActiveFilter: value })
    }
    handleSortByChange = (value: SortByFilter) => {
        this.setState({ sortBy: value, selectedSortValue: value });
    };
    handleOrderStatusChange = (status: OrderStatus) => {
        this.setState((prevState) => {
            let selectedValues: string[];
            if (prevState.selectedStatus.includes(status)) {
                // Remove the value if it's already selected (unchecked)
                selectedValues = prevState.selectedStatus.filter((v: string) => v !== status);
            } else {
                // Add the value if it's not selected (checked)
                selectedValues = [...prevState.selectedStatus, status];
            }

            return {
                orderStatus: {
                    ...prevState.orderStatus,
                    [status]: !prevState.orderStatus[status],
                },
                selectedStatus: selectedValues,
            };
        });
    };
    handleOrderDateChange = (value: string) => {
        this.setState({ orderDate: value, selectedOrderDate: value });
    }
    onClearFilter = () => {
        this.setState({
            orderStatus: {
                allOrders: true,
                processing: false,
                delivered: false,
                returned: false,
            },
            selectedStatus: [],
            orderDate: 'last30days',
            selectedOrderDate: '',
            sortBy: 'mostRecent',
            selectedSortValue: '',
        });
    }
    getsortValue = () => {
        switch (this.state.selectedSortValue) {
            case 'mostRecent':
              return '';
            case 'oldestFirst':
                return 'oldest_first';
            default:
                return ''; 
        }
    }
    getOrderDate = () => {
        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;
        switch (this.state.selectedOrderDate) {
            case 'last30days':
                return '';
            case 'last3months':
                return 'last_3_months';
            case currentYear.toString():
                return currentYear.toString();
            default:
                return  previousYear.toString();
        }
    }
    onApplyfilter = () => {
        let orderDateValue = '';
        const sortValue = this.getsortValue();
        if (this.state.selectedOrderDate) {
            orderDateValue = this.getOrderDate();
        }
        let orSt = this.state.selectedStatus.length > 0 ? this.state.selectedStatus.filter(item => item !== 'allOrders') : [];
        let orderStValues = orSt.length > 0 ? orSt.join(',') : '';
        if (typeof this.state.paramsFilterFun === 'function') {
            this.state.paramsFilterFun(sortValue, orderStValues, orderDateValue);
                const message = new Message(getName(MessageEnum.NavigationMessage));
                message.addData(getName(MessageEnum.NavigationTargetMessage), 'OrderManagementBuyerAllOrder');
                message.addData(getName(MessageEnum.NavigationPropsMessage),this.props)
                this.send(message)
        }
    }

    goBackScreen = () =>{
        const message = new Message(getName(MessageEnum.NavigationMessage));
        message.addData(getName(MessageEnum.NavigationTargetMessage), 'OrderManagementBuyerAllOrder');
        message.addData(getName(MessageEnum.NavigationPropsMessage),this.props)
        this.send(message)
    }
    // Customizable Area End
}
