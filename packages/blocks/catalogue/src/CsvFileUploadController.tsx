import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
// Customizable Area Start
import { showMessage } from "react-native-flash-message";
import DocumentPicker from "react-native-document-picker";
import ProgressBar from "../../../components/src/ProgressBar";
import React from "react";
import i18n from "../../../components/src/i18n/i18n.config";
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
  loading: boolean;
  percentagecsv: string;
  headerTilecsv: string;
  subTextcsv: string;
  filenamecsv: string;
  fileURLcsv: string;
  token: string | null;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class CsvFileUploadController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  uploadCSVAPIid: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess)
      // Customizable Area Start
      , getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.SessionSaveMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      percentagecsv: "0%",
      headerTilecsv: i18n.t('headerTilecsv'),
      subTextcsv: i18n.t('uploadProduct'),
      filenamecsv: "",
      fileURLcsv: "",
      token: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.handleResponseTokenUpload(token);
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );
      this.setState({ loading: false });
      if (apiRequestCallId) {
        if (apiRequestCallId === this.uploadCSVAPIid) {
          if (!responseJson.errors) {
            this.goBack();
            showMessage({
              message: this.state.headerTilecsv+' '+i18n.t('uploadSuccessMsgText'),
              position: { top: 0 },
            });
          } else {
            this.parseApiErrorResponse(responseJson);
          }
        }
      }
    }
    // Customizable Area End
  }
  
  // Customizable Area Start
  async componentDidMount() {
    this.getTokenUploadCSV();
    this.props.navigation.addListener("willFocus", () => {
      this.getTokenUploadCSV();
    });
    this.setState({
      headerTilecsv:
        this.props.navigation &&
        this.props.navigation.state &&
        this.props.navigation.state.params.title,
      subTextcsv:
        this.props.navigation &&
        this.props.navigation.state &&
        this.props.navigation.state.params.subTitle,
    });
  }

  getTokenUploadCSV = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  handleResponseTokenUpload = (token: string) => {
    if (token) {
      this.setState({ token: token });
    }
  };

  updatePercentageCSV = (percentage: string) => {
    this.setState({ percentagecsv: percentage });
    if (this.state.percentagecsv != "100%") {
      setTimeout(async () => {
        this.updatePercentageCSV(
          this.state.percentagecsv == "30%" ? "70%" : "100%"
        );
      }, 1000);
    }
  };

  pickFileCSV = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.csv],
      });

      if (
        !(
          res[0].type == "text/comma-separated-values" ||
          res[0].type == "text/csv"
        )
      ) {
        showMessage({
          message: i18n.t('pleaseSelectCSVOnly'),
          position: { top: 0 },
        });
        return;
      }

      this.setState({ filenamecsv: res[0].name, fileURLcsv: res[0].uri });
      setTimeout(async () => {
        this.updatePercentageCSV("30%");
      }, 1000);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        showMessage({
          message: i18n.t('userCancelUpload'),
          position: { top: 0 },
        });
      }
    }
  };

  uploadFileCSV = () => {
    alert(this.state.headerTilecsv)
    let csvfileForAssign: string | Blob = {
      name: this.state.filenamecsv,
      type: "text/csv",
      uri: this.state.fileURLcsv,
    } as unknown as Blob;

    let formDateForAssign = new FormData();
    formDateForAssign.append("csv_file", csvfileForAssign);

    let csvfileForOther: string | Blob = {
      name: this.state.filenamecsv,
      type: "text/csv",
      uri: this.state.fileURLcsv,
    } as unknown as Blob;

    let formDateForOther = new FormData();
    formDateForOther.append("catalogue_file", csvfileForOther);

    const headerStoreProducts = {
      "Content-Type": configJSON.formDatacontentType,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.uploadCSVAPIid = requestMessageAssign.messageId;
    if (this.state.headerTilecsv == "Update Inventory") {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getUpdateInventory
      );
    } else if (this.state.headerTilecsv == "Assign Store") {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAssignStore
      );
    } else if (this.state.headerTilecsv == "Add Products") {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAddProducts
      );
    } else if (this.state.headerTilecsv == "Edit Products") {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getEditProducts
      );
    } else {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.CSVFileUploadEndPoint
      )
    }

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerStoreProducts)
    );

    if (this.state.headerTilecsv == "Edit Products") {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.patchAPiMethod
      );
    } else {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.exampleAPiMethod
      );
    }

    if (this.state.headerTilecsv == "Assign Store") {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formDateForAssign
      );
    } else {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formDateForOther
      );
    }

    this.setState({ loading: true });
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  loadProgress = (progress: string) => {
    return (
      <ProgressBar
        height={8}
        backgroundColor={'#E2E8F0'}
        completedColor={'#375280'}
        percentage={progress}
      />
    )
  }
  // Customizable Area End
}
