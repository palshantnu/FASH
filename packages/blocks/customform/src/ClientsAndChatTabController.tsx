import { IBlock } from "../../../framework/src/IBlock";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
    getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";
import { Dimensions } from "react-native";
import i18n from '../../../components/src/i18n/i18n.config'
// Customizable Area Start
export interface Route {
    key: string;
    title: string;
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
    index: number;
    routes: Route[];
    layout:{};
    
    // Customizable Area End
}

interface SS {
    id: any;
}

export default class ClientsAndChatTabController extends BlockComponent<Props, S, SS> {
    // Customizable Area Start
    // Customizable Area End
constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
        getName(MessageEnum.RestAPIResponceMessage),
        getName(MessageEnum.SessionSaveMessage),
        getName(MessageEnum.SessionResponseMessage),
         // Customizable Area Start
        getName(MessageEnum.NavigationPayLoadMessage),
         // Customizable Area End
    ];
    const { width, height } = Dimensions.get("window");
    this.state = {
        // Customizable Area Start
        index: 0,
        routes: [
            { key: "first", title: i18n.t('chats') },
            { key: "second", title: i18n.t('clients') },
        ],
        layout: { width, height }
        // Customizable Area End
        };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
        // Customizable Area Start
        // Customizable Area End
    }

    async componentDidMount() {
        super.componentDidMount();
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    setIndex = (index: number) => {
        this.setState({ index });
    };

    onLandingScreen = () =>{
      this.props.navigation.navigate('StylistLanding')  
    }
    // Customizable Area End

}