import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import * as yup from "yup";
import moment from "moment";
import "moment/locale/ar";
import i18n from '../../../components/src/i18n/i18n.config';
import { setStorageData } from "framework/src/Utilities";
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
  token: string;
  loading: boolean;
  dob: string;
  dobDate: Date;
  dobModalVisible: boolean;
  address: string;
  area: string;
  block: string;
  house_or_building: string;
  zipcode: string;
  workCity: string;
  vehicle: string;
  errorKey:
    | keyof Pick<
        S,
        | "address"
        | "dobDate"
        | "area"
        | "block"
        | "house_or_building"
        | "zipcode"
      >
    | "";
  error: string;
  // Customizable Area End
}

interface SS {
  // Customizable Area Start
  // Customizable Area End
}

export default class DriverPersonalDetailsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  customDataApiCallId = "";
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

    moment.locale(i18n.language);

    this.state = {
      token: "",
      loading: false,
      address: "",
      area: "",
      block: "",
      zipcode: "",
      dob: moment()
        .subtract({ year: 18 })
        .format("DD-MM-YYYY"),
      dobDate: moment()
        .subtract({ year: 18 })
        .toDate(),
      house_or_building: "",
      dobModalVisible: false,
      workCity: "",
      vehicle: "",
      error: "",
      errorKey: "",
    };
    // Customizable Area End
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (message.id === getName(MessageEnum.SessionResponseMessage)) {
      this.handleToken(message);
      return;
    }

    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const payload = message.getData(
        getName(MessageEnum.NavigationDriverRegData)
      );
      if (payload.city) {
        this.setState({ vehicle: payload.vehicle, workCity: payload.city });
        runEngine.unSubscribeFromMessages(this as IBlock, [
          getName(MessageEnum.NavigationPayLoadMessage),
        ]);
      }
      return;
    }

    if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
      const apiCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      const successData = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      if (apiCallId === this.customDataApiCallId) {
        this.setState({ loading: false });
        if (
          successData &&
          successData.message &&
          successData.message.includes("success")
        ) {
          setStorageData(
            "autoLogin",
            JSON.stringify(MessageEnum.NavigationDriverDocuments)
          );
          this.goToDocumnets();
        } else {
          showMessage({
            message: String(successData.error),
            position: { top: 8 },
          });
        }
      }
    }
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.getToken();
    // Customizable Area End
  }

  // Customizable Area Start
  goBack = () => this.props.navigation.goBack();

  getToken = () => {
    const message = new Message(getName(MessageEnum.SessionRequestMessage));
    this.send(message);
  };

  handleToken = (message: Message) => {
    if (!this.state.token) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token });
    }
  };

  onCustomerCarePress = () => {
    showMessage({
      message: "This feature is not yet developed",
      type: "info",
      position: { top: 8 },
    });
  };

  onAddressChange = (address: string) =>
    this.setState({ address, errorKey: "", error: "" });

  onAreaChange = (area: string) =>
    this.setState({ area, errorKey: "", error: "" });

  onHouseChange = (house_or_building: string) => {
    this.setState({ house_or_building, errorKey: "", error: "" });
  };

  onZipCodeChange = (zipcode: string) => {
    if (/^\d{0,6}$/.test(zipcode)) {
      this.setState({ zipcode, errorKey: "", error: "" });
    }
  };

  onBlockChange = (block: string) =>
    this.setState({ block, errorKey: "", error: "" });

  openDobModal = () => this.setState({ dobModalVisible: true });

  hideDobModal = () => this.setState({ dobModalVisible: false });

  get maxDate() {
    return moment()
      .subtract({ year: 18 })
      .toDate();
  }

  confirmDob = (date: Date) => {
    this.setState({
      dobDate: date,
      dob: moment(date).format("DD-MM-YYYY"),
      dobModalVisible: false,
    });
  };

  get alertSchema() {
    type ValidationFields = Exclude<S["errorKey"], "">;

    const schema: Record<
      ValidationFields,
      yup.StringSchema<string | undefined> | yup.DateSchema
    > = {
      dobDate: yup.date().required("* Please select your date of birth"),
      address: yup.string().required(i18n.t('pleaseEnterAddressErrorText')),
      area: yup.string().required(i18n.t('pleaseEnterAreaErrorText')),
      block: yup.string().required(i18n.t('pleaseEnterBlockErrorText')),
      house_or_building: yup
        .string()
        .required(i18n.t('pleaseEnterHouseErrorText')),
      zipcode: yup.string().notRequired(),
    };

    return schema;
  }

  validate = async () => {
    type ValidationFields = Exclude<S["errorKey"], "">;
    const schema = this.alertSchema;
    for (const [keyName, fieldSchema] of Object.entries(schema)) {
      try {
        await fieldSchema.validate(this.state[keyName as keyof S]);
      } catch (_error) {
        const error = _error as yup.ValidationError;
        this.setState({
          errorKey: keyName as ValidationFields,
          error: error.message,
        });
        return;
      }
    }
    this.setCustomData();
  };

  setCustomData = () => {
    const message = new Message(getName(MessageEnum.RestAPIRequestMessage));
    message.initializeFromObject({
      [getName(
        MessageEnum.RestAPIResponceEndPointMessage
      )]: configJSON.driverCustomDataEndpoint,
      [getName(
        MessageEnum.RestAPIRequestMethodMessage
      )]: configJSON.exampleAPiMethod,
      [getName(MessageEnum.RestAPIRequestHeaderMessage)]: {
        token: this.state.token,
        "Content-Type": configJSON.validationApiContentType,
      },
      [getName(MessageEnum.RestAPIRequestBodyMessage)]: JSON.stringify({
        data: {
          attributes: {
            account_type: "Driver",
            vehicle_type: this.state.vehicle,
            city: this.state.workCity,
            date_of_birth: this.state.dob,
            address: this.state.address,
            area: this.state.area,
            block: this.state.block,
            house_or_building_number: this.state.house_or_building,
            zip_code: this.state.zipcode,
          },
        },
      }),
    });

    this.customDataApiCallId = message.messageId;
    this.setState({ loading: true });
    runEngine.sendMessage(message.messageId, message);
  };

  goToDocumnets = () => {
    const message = new Message(getName(MessageEnum.NavigationDriverDocuments));
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };
  // Customizable Area End
}
