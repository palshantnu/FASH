import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { getStorageData } from "../../../framework/src/Utilities";
import { DeviceEventEmitter } from "react-native";
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
  timeout: number;
  token: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class SplashscreenController2 extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  UserDataGet: any
  // Customizable Area End

  constructor(props: Props) {
    super(props);

    this.state = {
      // Customizable Area Start
      timeout: 800,
      token: "",
      // Customizable Area End
    };

    // Customizable Area Start
    this.subScribedMessages = [];
    // Customizable Area End

    this.receive = this.receive.bind(this);
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount() {
    super.componentDidMount();
    // Customizable Area Start
    this.UserDataGet = DeviceEventEmitter.addListener(
      "updatedLanguage",
      () => {
        this.autoLogin();
      }
    );
    setTimeout(() => {
      this.autoLogin();
    }, this.state.timeout);
    // Customizable Area End
  }

  // Customizable Area Start

  btnLoginOptionsRedirection = () => {
    const message: Message = new Message(
      getName(MessageEnum.NavigationLoginOptionsMessage)
    );
    this.props.navigation.navigate("OnboardingScreen");
    // message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  };

   checkAppNavigation = (data:any) =>{
     const message: Message = new Message(
      getName(MessageEnum.NavigationProductDetailsMessage)
    );
    message.addData(getName(MessageEnum.productIDMessage), data.id);
    message.addData(getName(MessageEnum.ShowByStoreId), false);
    message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(message);
  }
  
  autoLogin = async () => {
    let DeepLinkingNavigation = await getStorageData("DeepLinkingNavigation", true);
    
    if(DeepLinkingNavigation){      
      this.checkAppNavigation(DeepLinkingNavigation)
    }else{
    let autoLoginData = await getStorageData("autoLogin", true);
    let tokenManage = await getStorageData("token", true);
    if (autoLoginData != null) {
      const msgSession: Message = new Message(
        getName(MessageEnum.SessionSaveMessage)
      );

      msgSession.addData(
        getName(MessageEnum.SessionResponseToken),
        tokenManage
      );

      this.send(msgSession);

      const objectData: number = autoLoginData;
      const navMessage: Message = new Message(getName(objectData));
      if(navMessage.id==="NavigationDriverRegistrationType"){
        const message = new Message(
          getName(MessageEnum.NavigationEmailLogInMessage)
        );
        message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(message);
      }else{
        navMessage.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(navMessage);
      }
    }else{
      this.btnLoginOptionsRedirection()
    }
    }
  };
  // Customizable Area End
}
