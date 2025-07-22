import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import moment from "moment";
import { Alert } from "react-native";

// Customizable Area Start
import i18n from '../../../components/src/i18n/i18n.config';
export interface WeekDayArrProps {
    id: string,
    day: string,
    startTime: string,
    endTime: string,
    status: boolean,
    dayFromError: boolean,
    dayToError: boolean,
    errorMsg: string,
    startTimeTf: string,
    endTimeTf: string
}
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
    selectedValue: string;
    isStartDatePickerVisible: boolean;
    isToStartDatePickerVisible: boolean;
    isDatePickerVisible: boolean;

    isToDatePickerVisible: boolean;
    isEndDatePickerVisible: boolean;
    isToEndDatePickerVisible: boolean;
    selectFromDate: boolean;
    selectToDate: boolean;
    campaingStartDate: Date;
    selectDate: Date;
    selectedToDate: Date;
    errorTo: boolean;
    errorFrom: boolean;
    visibleFromDate: boolean,
    visibleToDate: boolean,
    filter: string;
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class AnalyticsFilterController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        // Customizable Area Start
        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            getName(MessageEnum.NavigationPayLoadMessage)
            // Customizable Area Start
            // Customizable Area End
        ];

        this.state = {
            // Customizable Area Start
            selectedValue: '',
            isStartDatePickerVisible: false,
            isDatePickerVisible: false,
            isEndDatePickerVisible: false,

            isToStartDatePickerVisible: false,
            isToDatePickerVisible: false,
            isToEndDatePickerVisible: false,
            selectFromDate: false,
            selectToDate: false,
            campaingStartDate: new Date(),
            selectDate: new Date(),
            selectedToDate: new Date(),
            errorTo: false,
            errorFrom: false,
            visibleFromDate: false,
            visibleToDate: false,
            filter: '',
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }

    async receive(from: string, message: Message) {
        runEngine.debugLog("Message Recived", message);
        // Customizable Area Start
        if (getName(MessageEnum.NavigationPayLoadMessage) === message.id) {
            const data = message.getData(getName(MessageEnum.NavigationPayLoadMessage));
            if (data.fromDate) {
                const fromDate = data.fromDate
                this.setState({ selectDate: fromDate, visibleFromDate: true })
            }
            if (data.toDate) {
                const toDate = data.toDate
                this.setState({ selectedToDate: toDate, visibleToDate: true })
            }

                this.setState({filter: data.filter}, ()=> {
                    this.setFilter()
                })
              if (data.filter === "") {
                this.setState({
                  selectedValue : "this week"
                });
              }
          }
        // Customizable Area End
    }


    // Customizable Area Start

  setFilter = () => {
    if (this.state.filter === 'this week') {
      this.setState({
        selectedValue: 'this week',
      });
    }
    if (this.state.filter === 'this month') {
      this.setState({
        selectedValue: 'this month',
      });
    }
    if (this.state.filter === 'this year') {
      this.setState({
        selectedValue: 'this year',
      });
    }
    if (this.state.filter === 'manually') {
      this.setState({
        selectedValue: 'manually',
      });
    }
  }

    goToBackInAddAddress = async () => {
        this.props.navigation.goBack();
    };

    handleRadioButtonPress = (value: any) => {
        this.setState({ selectedValue: value});
    };

    clearAll = () => {
        this.setState({ selectedValue: "" })
        this.setState({selectFromDate: false})
        this.setState({selectToDate: false})
    }

    performAction = () => {
        if (!this.state.selectFromDate && !this.state.visibleFromDate) {
            this.setState({ errorFrom: true })
        }
        if (!this.state.selectToDate && !this.state.visibleToDate) {
            this.setState({ errorTo: true })
        }
        if (this.state.selectFromDate && this.state.selectToDate || this.state.visibleFromDate || this.state.visibleToDate) {
            const msgs = new Message(getName(MessageEnum.NavigationMessage));
            msgs.addData(
                getName(MessageEnum.NavigationTargetMessage),
                "ProductAnalytics"
            );
            msgs.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
            const raiseMessage = new Message(
                getName(MessageEnum.NavigationPayLoadMessage)
            );
            raiseMessage.addData(
                getName(MessageEnum.PlayLoadSignupId),
                { fromDate: this.state.selectDate, toDate: this.state.selectedToDate, filter: 'manually' }
            );
            msgs.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
            runEngine.sendMessage("MergeEngineUtilities", msgs);
        }

        const { selectedValue } = this.state;
        let filterValue = '';

        if (selectedValue === 'this week') {
            filterValue = 'this week';
        } else if (selectedValue === 'this month') {
            filterValue = 'this month';
        } else if (selectedValue === 'this year') {
            filterValue = 'this year';
        }

        if (selectedValue === 'this week' || selectedValue === 'this month' || selectedValue === 'this year') {
            const msg = new Message(getName(MessageEnum.NavigationMessage));
            msg.addData(getName(MessageEnum.NavigationTargetMessage), "ProductAnalytics");
            msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);

            const raiseMessage = new Message(getName(MessageEnum.NavigationPayLoadMessage));
            raiseMessage.addData(getName(MessageEnum.PlayLoadSignupId), { filter: filterValue });

            msg.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
            runEngine.sendMessage("MergeEngineUtilities", msg);
        }

        if(selectedValue === '' && this.state.selectFromDate === false && this.state.selectToDate === false){
            Alert.alert(i18n.t('Alert'),i18n.t('pleaseSelectAOptionText'))
        }
    };
    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false, isStartDatePickerVisible: false, isEndDatePickerVisible: false });
    };

    handleConfirmDate = (date: Date) => {
        this.setState({ selectFromDate: true, selectDate: date, isDatePickerVisible: false, isStartDatePickerVisible: false, });
        this.setState({ errorFrom: false })
    };

    openDobModal = () => this.setState({ isStartDatePickerVisible: true });

    hideToDatePicker = () => {
        this.setState({ isToDatePickerVisible: false, isToStartDatePickerVisible: false, isToEndDatePickerVisible: false });
    };
    handleToConfirmDate = (date: Date) => {
        this.setState({ selectToDate: true, selectedToDate: date, isToDatePickerVisible: false, isToStartDatePickerVisible: false, }); this.setState({ errorTo: false })
    };
    openToDobModal = () => this.setState({ isToStartDatePickerVisible: true });

    formatDate = (date: Date) => { 
        return date ? moment(date).format('ddd, DD MMM YYYY') : '';
    };
    // Customizable Area End
}
