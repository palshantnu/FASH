import { BlockComponent } from "../../../framework/src/BlockComponent";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
export interface ColorName {
    id: number;
    colorName: string;
}

export interface SizeArray {
    id: number;
    name: string;
}

export interface StylingArray {
    id: number;
    name: string;
}

export interface bodyShapeArray {
    id: number;
    name: string;
}

export interface hairsArray {
    id: number;
    name: string;
}

export interface poseArray {
    id: number;
    name: string;
}

export interface skinArray {
    id: number;
    name: string;
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
    colorName: ColorName[]
    SizeArray: SizeArray[]
    StylingArray: StylingArray[]
    bodyShapeArray: bodyShapeArray[]
    hairsArray: hairsArray[]
    poseArray: poseArray[]
    skinArray: skinArray[]
    colourId: number
    shirtColour: string
    sizeId: number,
    personSize: string
    styleId: number
    stylingShow: string
    // Customizable Area End
}

interface SS {
    id: any;
    // Customizable Area Start
    // Customizable Area End
}

export default class TryonitController extends BlockComponent<
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
            colorName: [
                { id: 1, colorName: 'black' },
                { id: 2, colorName: 'pink' },
                { id: 3, colorName: 'blue' },
                { id: 4, colorName: 'green' },
                { id: 5, colorName: 'yellow' },
                { id: 6, colorName: 'grey' },
                { id: 7, colorName: 'orange' },
                { id: 8, colorName: 'red' }
            ],
            SizeArray: [
                { id: 1, name: 'XS' },
                { id: 2, name: 'S' },
                { id: 3, name: 'M' },
                { id: 4, name: 'L' },
                { id: 5, name: 'XL' },
                { id: 6, name: 'XXL' },
            ],
            StylingArray: [
                { id: 1, name: 'Round' },
                { id: 2, name: 'Square' },
                { id: 3, name: 'Ellips' },
                { id: 4, name: 'Ractangle' },
            ],
            colourId: 1,
            shirtColour: "",
            sizeId: 1,
            personSize: "",
            styleId: 1,
            stylingShow: 'bodyType',
            bodyShapeArray: [
                { id: 1, name: 'Rectangle' },
                { id: 2, name: 'Hourglass' },
                { id: 3, name: 'Triangle' },
                { id: 4, name: 'Inverted Triangle' },
                { id: 5, name: 'Oval' },
                { id: 6, name: 'Athletic' },
                { id: 7, name: 'Slim' }],
            hairsArray: [
                { id: 1, name: 'Bob' },
                { id: 2, name: 'Pixie' },
                { id: 3, name: 'Pompadour' },
                { id: 4, name: 'Fade' },
                { id: 5, name: 'Layered' },
                { id: 6, name: 'Curly' },
                { id: 6, name: 'Undercut' }],
            poseArray: [
                { id: 1, name: 'T' },
                { id: 2, name: 'Power' },
                { id: 3, name: 'Crossed Arms' },
                { id: 4, name: 'Hands on Hips' },
                { id: 5, name: 'Over-the-Shoulder' },
                { id: 6, name: 'Walking' },
                { id: 6, name: 'Sitting' }],
            skinArray: [
                { id: 1, name: 'Fair' },
                { id: 2, name: 'Light' },
                { id: 3, name: 'Medium' },
                { id: 4, name: 'Olive' },
                { id: 5, name: 'Tan' },
                { id: 6, name: 'Dark' }],
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
    goToBack = () => {
        this.props.navigation.goBack();
    };

    onPressNext = () => {
        const ViewBasket: Message = new Message(getName(MessageEnum.NavigationSearchDataMessage));
        ViewBasket.addData(getName(MessageEnum.NavigationScreenMessage), "ThreeDeeView");
        ViewBasket.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
        this.send(ViewBasket);
    }

    selectColour = (item: any) => {
        this.setState({ colourId: item.id, shirtColour: item.colorName })
    };

    selectSize = (item: any) => {
        this.setState({ sizeId: item.id, personSize: item.name })
    };

    setstylingtype = (stylingType: string) => {
        if (stylingType === 'hairStyle') {
            this.setState({ stylingShow: stylingType, StylingArray: this.state.hairsArray })
        } else if (stylingType === 'pose') {
            this.setState({ stylingShow: stylingType, StylingArray: this.state.poseArray })
        } else if (stylingType === 'skinTone') {
            this.setState({ stylingShow: stylingType, StylingArray: this.state.skinArray })
        } else {
            this.setState({ stylingShow: stylingType, StylingArray: this.state.bodyShapeArray })
        }
    }
    // Customizable Area End
}
