import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import { showMessage } from 'react-native-flash-message';
export const baseURL = require("../../../framework/src/config.js").baseURL;

// Customizable Area Start

import { Linking } from "react-native";
export const configJSON = require("./config");

interface IDownloadResponse {
    jobId: number;
    statusCode: number;
    bytesWritten: number;
  }
// Customizable Area End

export interface Props {
  // Customizable Area Start
  navigation: any;
  id: string;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  token: string;
  loading: boolean;
 downloadTemplateList:any[]
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class DownloadTemplatesController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  getAllTemplateApiCallMsgId: string = "";
 
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
      token: "",
    downloadTemplateList:[]
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );

      const responseJson = message.getData(getName(MessageEnum.RestAPIResponceSuccessMessage));


      if (apiRequestCallId && responseJson) {
        if (apiRequestCallId === this.getAllTemplateApiCallMsgId && responseJson.data) {
         this.setState({downloadTemplateList:responseJson.data,loading:false})
        }
      else if(apiRequestCallId === this.getAllTemplateApiCallMsgId) {alert("Something went wrong")
    }
      }

      this.setState({loading:false})
    }
   if(!(this.state.token)){
    if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      const token = message.getData(getName(MessageEnum.SessionResponseToken));
      this.setState({ token: token }, () => {
        this.fetchTheDownlaodTemlate() 
      });
    }
}
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    if(!this.state.token){
    this.getTokenInAssign();}
   
    this.props.navigation.addListener("willFocus", () => {
      
    });
  }

  getTokenInAssign = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

  fetchTheDownlaodTemlate = async () => {
    const header = {
      token: this.state.token,
    };
    const requestMessage = new Message(
      getName(MessageEnum.RestAPIRequestMessage)
    );

    this.getAllTemplateApiCallMsgId = requestMessage.messageId;

    requestMessage.addData(
      getName(MessageEnum.RestAPIResponceEndPointMessage),
      configJSON.getTemplateEndPoint
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestHeaderMessage),
      JSON.stringify(header)
    );

    requestMessage.addData(
      getName(MessageEnum.RestAPIRequestMethodMessage),
      configJSON.exampleGetMethod
    );
    this.setState({ loading: true })
    runEngine.sendMessage(requestMessage.id, requestMessage);
  }; // istanbul ignore next
  handleDownload = async (filePath: string, file_name: string) => {
    if (Platform.OS === 'web') return;
  
    try {
      let dirPath = RNFS.DocumentDirectoryPath;
      if (Platform.OS === 'android') {
        if (Platform.Version < 29) {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);
          if (
            granted['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED ||
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
          ) {
            showMessage({
              message: 'Permission Denied',
              description: 'Storage permission is required',
              type: 'danger',
            });
            return;
          }
          dirPath = RNFS.DownloadDirectoryPath;
        }
      } 
      const toFile = `${dirPath}/${Date.now()}_${file_name}`;
      const fromUrl = filePath.startsWith('http') ? filePath : `${baseURL}${filePath}`;
      const result = await RNFS.downloadFile({ fromUrl, toFile }).promise;
    if (result.statusCode === 200) {
      if(Platform.OS === 'ios'){
        showMessage({
          message: `${configJSON.downloadedSuccessMsg}: ${toFile.split('/').pop()}`,
          type: "success",
          position:{top:0},
        });
      }
       else{
        showMessage({
          message: `${configJSON.downloadedSuccessMsg}: ${toFile.split('/').pop()}`,
          type: "success",
          position:{top:0},
        })
      }
    }
  } catch (error) {
    console.error(" Download error:", error);
    showMessage({
      message: configJSON.downloadingFailedMsg,
      type: "danger",
    });
  }
};
      
  // Customizable Area End
}
