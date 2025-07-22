import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export const configJSON = require("./config");
import { showMessage } from "react-native-flash-message";
import DocumentPicker from 'react-native-document-picker'
import i18n from "../../../components/src/i18n/i18n.config";
// Customizable Area End

export interface Props {
  // Customizable Area Start
  navigation: any;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  loading: boolean;
  percentage: string;
  headerTile: string;
  subText: string;
  filename: string;
  fileURL: string;
  token: string | null;
    // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UploadCSVController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  uploadCSVAPIid: string = "";
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
      getName(MessageEnum.SessionSaveMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      loading: false,
      percentage: '0%',
      headerTile: 'Update Inventory',
      subText: 'Upload Products',
      filename: '',
      fileURL: '',
      token: '',
            // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.handleResponseTokenUploadCSV(token)
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));
      this.setState({ loading: false })
      if (apiRequestCallId) {
        if (apiRequestCallId === this.uploadCSVAPIid) {
          if (!responseJson.errors) {
            this.props.navigation.goBack()
            showMessage({
              message: `${this.state.headerTile} uploaded successfully!`,
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
    this.setState({headerTile: this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params.title, 
      subText: this.props.navigation &&
      this.props.navigation.state &&
      i18n.t(`${this.props.navigation.state.params.subTitle}`) })
  }

  getTokenUploadCSV = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  handleResponseTokenUploadCSV = (token: string) => {
    if (token) {
      this.setState({ token: token });
    }
  }

  updatePercentage = (percentage: string) => {
    this.setState({percentage: percentage})
    if(this.state.percentage != '100%'){
      setTimeout(async() => {
        this.updatePercentage(this.state.percentage == '30%' ? '70%' : '100%')
      }, 1000);
    };
  }

  pickFile = async() => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.csv]
      })

      if(!(res[0].type == "text/comma-separated-values" || res[0].type == "text/csv")){
        showMessage({message: "Please select CSV files only!",position: { top: 0 }});
        return
      }
      
      this.setState({filename: res[0].name, fileURL: res[0].uri})
      setTimeout(async() => {
        this.updatePercentage('30%')
      }, 1000);
    } catch(err) {
      if(DocumentPicker.isCancel(err)) {
        showMessage({message: "User cancelled the upload!",position: { top: 0 }});
      }
    }
  }

  uploadFile = () => {

    let csvfileForAssign: string | Blob = {
      'name': this.state.filename,
      'type': 'text/csv',
      'uri': this.state.fileURL
    } as unknown as Blob;

    let formDateForAssign = new FormData()
    formDateForAssign.append("csv_file", csvfileForAssign);


    let csvfileForOther: string | Blob = {
      'name': this.state.filename,
      'type': 'text/csv',
      'uri': this.state.fileURL
    } as unknown as Blob;

    let formDateForOther = new FormData()
    formDateForOther.append("catalogue_file", csvfileForOther);

    const headerStoreProducts = {
      "Content-Type": configJSON.formDatacontentType,
      token: this.state.token,
    };
    const requestMessageAssign = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.uploadCSVAPIid = requestMessageAssign.messageId;
    if (this.state.headerTile == 'Update Inventory') {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getUpdateInventory
      );
    } else if (this.state.headerTile == 'Assign Store') {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAssignStore
      );
    }
    else if (this.state.headerTile == 'Add Products') {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getAddProducts
      );
    }
    else if (this.state.headerTile == 'Edit Products') {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIResponceEndPointMessage),
        configJSON.getEditProducts
      );
    }

    requestMessageAssign.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(headerStoreProducts)
    );

    if(this.state.headerTile == 'Edit Products'){
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.patchAPiMethod
      );
    }
    else{
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIRequestMethodMessage),
        configJSON.exampleAPiMethod
      );
    }

    if (this.state.headerTile == 'Assign Store') {
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formDateForAssign)
    }
    else{
      requestMessageAssign.addData(
        getName(MessageEnum.RestAPIRequestBodyMessage),
        formDateForOther)
    }
      
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessageAssign.id, requestMessageAssign);
  }

  // Customizable Area End
}
