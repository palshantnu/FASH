import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import ImagePicker from 'react-native-image-crop-picker';
import { CameraType, launchCamera, MediaType } from "react-native-image-picker";
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
  selectGender: string
  textInput: string
  mediaType: boolean
  mediaModal: boolean
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class Cfvirtualmannequin3Controller extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    // Customizable Area End

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage)
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,

      // Customizable Area Start
      selectGender: "male",
      textInput: "",
      mediaType: false,
      mediaModal: false
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
  goToBack = () => {
    this.props.navigation.goBack();
  };

  btnChangeGender = (gender: string) => {
    this.setState({ selectGender: gender })
  }


  onPressNext = () => {
    const ViewBasket: Message = new Message(getName(MessageEnum.NavigationSearchDataMessage));
    ViewBasket.addData(getName(MessageEnum.NavigationScreenMessage), "BasicdetailsScreen");
    ViewBasket.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(ViewBasket);
  }

  setMediaType = (mediaValue: boolean) => {
    this.setState({ mediaType: mediaValue })
  }

  setMediaModal = () => {
    this.setState({ mediaModal: !this.state.mediaModal })
  }

  onConfirmPress = () => {
    if (!this.state.mediaType) {
      this.handleImageOperation(true)
    } else {
      this.recordVideo()
    }
  }

  async handleImageOperation(isCamera: boolean) {
    let image = await ImagePicker.openCamera({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 400,
      includeBase64: true,
      includeExif: true,
      compressImageQuality: 0.4
    })

    if (image.path) {
      let objData = JSON.parse(JSON.stringify({
        name: "profile.jpg",
        type: image.mime,
        uri: image.path,
      }));
    }
  }

  recordVideo = () => {
    const options = {
      mediaType: 'video' as MediaType,
      cameraType: 'back' as CameraType,
      durationLimit: 5,
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        this.setState({ mediaModal: false });
        // Alert.alert('User cancelled video recording');
      } else if (response.errorCode) {
        this.setState({ mediaModal: false });
        // Alert.alert(`Error: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        const videoUri = response.assets[0].uri;
        console.log('videoUrivideoUrivideoUrivideoUrivideoUri', response);
        // this.setState({ videoUri });
        this.setState({ mediaModal: false });
        // Alert.alert('Video recorded successfully');
      }
    });
  };
  // Customizable Area End
}
