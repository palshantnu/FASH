import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
interface VehicleAttributesProps {
    vehicle_type:string;
    registration_number:string
}

export interface VehicleProps {
  id: string;
  attributes:VehicleAttributesProps
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
  token: string;
  loading:boolean;
  vehicleArr: VehicleProps[]
  // Customizable Area End
}

interface SS {
  id: any;
}

export default class CustomformDriverShowVehicleController extends BlockComponent<Props, S, SS> {
  // Customizable Area Start
  getAllVehicleApiCallId = "";
  // Customizable Area End
  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.SessionResponseMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.NavigationPayLoadMessage),
    ];

    this.state = {
      token: "",
      loading:false,
      vehicleArr:[]
    };
    // Customizable Area End

    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
     if (getName(MessageEnum.SessionResponseMessage) === message.id) {
      let token = message.getData(getName(MessageEnum.SessionResponseToken));
      runEngine.debugLog("TOKEN", token);
      this.getAllVehicles(token)
    }
    if (getName(MessageEnum.RestAPIResponceMessage) === message.id) {
      this.handleVehcileApiResponses(message);
    }
    // Customizable Area End
  }

  // Customizable Area Start

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();

    this.getTokenShowVehicle();

    this.props.navigation.addListener("willFocus", () => {
      this.getTokenShowVehicle();
    });
    // Customizable Area End
  }

  handleVehcileApiResponses = (message: Message) => {
    let responseJson = message.getData(
      getName(MessageEnum.RestAPIResponceSuccessMessage)
    );
    const apiRequestCallId = message.getData(
      getName(MessageEnum.RestAPIResponceDataMessage)
    );

    if (responseJson) {
      if (apiRequestCallId === this.getAllVehicleApiCallId) {
        this.setState({loading:false})
        if(responseJson.errors === undefined)
        {
          this.setState({vehicleArr:responseJson.data})
        }
      }
    }
  }

    getTokenShowVehicle = () => {
      const msgToken: Message = new Message(
          getName(MessageEnum.SessionRequestMessage)
      );
      this.send(msgToken);
    };

    getAllVehicles = (token:string) => {
        this.setState({loading:true})
        const header = {
            "Content-Type": configJSON.validationApiContentType,
            token: token,
        };
        const requestMessage = new Message(
            getName(MessageEnum.RestAPIRequestMessage)
        );

        this.getAllVehicleApiCallId = requestMessage.messageId;

        requestMessage.addData(
            getName(MessageEnum.RestAPIResponceEndPointMessage),
            configJSON.getDriverAllVehicleApiEndPoint
        );

        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestHeaderMessage),
            JSON.stringify(header)
        );
        requestMessage.addData(
            getName(MessageEnum.RestAPIRequestMethodMessage),
            configJSON.validationApiMethodType
        );
        runEngine.sendMessage(requestMessage.id, requestMessage);
    }

    btnAddVehicleRedirection = ()=>{
        const msgNavigation: Message = new Message(
          getName(MessageEnum.NavigationSelectVehicle)
        );
        msgNavigation.addData(getName(MessageEnum.AddVehiclePageNamePayloadMessage), 'Add Vehicle');
        msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(msgNavigation);
    }

  // Customizable Area End
}
