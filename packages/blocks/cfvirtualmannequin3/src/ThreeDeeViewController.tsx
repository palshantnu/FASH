import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
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
    backImage: string,
    imageId: number
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class ThreeDeeViewController extends BlockComponent<
    Props,
    S,
    SS
> {
    // Customizable Area Start
    // Customizable Area End

    constructor(props: Props) {
        super(props);
        this.receive = this.receive.bind(this);

        this.subScribedMessages = [
            getName(MessageEnum.AccoutLoginSuccess),
            // Customizable Area Start
            // Customizable Area End
        ];

        this.state = {
            // Customizable Area Start
            backImage: "",
            imageId: 1
            // Customizable Area End
        };
        runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

        // Customizable Area Start
        // Customizable Area End
    }

    async receive(from: string, message: Message) {
        // Customizable Area Start
        // Customizable Area End
    }

    // Customizable Area Start
    onBackImagePress = (data: any) => {
        this.setState({ backImage: data.image, imageId: data.id })
    }

    goToBack = () => {
        this.props.navigation.goBack();
    };
    // Customizable Area End
}
