import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { userProfile } from "./assets";
import { Linking } from "react-native";
import { showMessage } from "react-native-flash-message";
import {removeStorageData} from "../../../framework/src/Utilities"
// Customizable Area End

export const configJSON = require("./config");

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  drawerContent?: boolean;
  // Customizable Area End
}

interface S {
  // Customizable Area Start
  webDrawer: boolean;
  token: any;
  drawerItems: any;
  logoutModal:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class NavigationMenuController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  apiGetDataCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      webDrawer: false,
      token: "",
      drawerItems: [],
      logoutModal:false
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);
    // Customizable Area Start
    
    // Customizable Area End
  }

  // Customizable Area Start
  toggleDrawer = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({ webDrawer: !this.state.webDrawer });
  };

  onPressMenuItem = (menuItem: any) => {
    let path = menuItem.url;

    var tarea_regex = /^(http|https)/;
    if (tarea_regex.test(String(path).toLowerCase())) {
      if (this.isPlatformWeb()) {
        window.open(path);
      } else {
        Linking.openURL(path);
      }
    } else {
      const msg: Message = new Message(getName(MessageEnum.NavigationMessage));
      msg.addData(getName(MessageEnum.NavigationTargetMessage), path);
      msg.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(msg);
    }
  };

  userProfileProps = {
    source: userProfile,
  };

  async componentDidMount() {
    super.componentDidMount();
    this.getToken();
    if (this.isPlatformWeb() === false) {
      this.props.navigation.addListener("willFocus", () => {
        this.getToken();
      });
    }
  }

  getToken = () => {
    const msg: Message = new Message(
      getName(MessageEnum.SessionRequestMessage)
    );
    this.send(msg);
  };

 

  handleNavigationToHomePage=()=>{
    this.props.navigation.goBack()
  }

  handleFeatureNotYetImplemented=()=>{
    showMessage({
      message: "This feature is yet to be developed",
      type: "info",
      position: { top: 8 },
    });
  }

  btnLogoutAndRedirection = ()=>{
    removeStorageData('token')
    removeStorageData('buyerAddAddressMap')
    removeStorageData('storeAddressMap')
    removeStorageData('autoLogin')
    removeStorageData('createStoreArr')
   
    this.setState({logoutModal:false})
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

  // Customizable Area End
}
