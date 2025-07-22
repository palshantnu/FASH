import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
export interface LoyalityPoints{
  id:number,
  orderID:string,
  date:string,
  points:number
}
export interface RedeemArray{
  id:number,
  title:string,
  earn_points:number
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  data:LoyalityPoints[];
  redeemDataArray:RedeemArray[];
  showModal:boolean;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class LoyaltysystemController extends BlockComponent<
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
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      showModal:false,
      data:[
        {
          id:1,
          orderID:'Order #4564-4678',
          date:"Credited on March 20, 2024",
          points:122
        },
        {
          
            id:2,
            orderID:'Order #4564-4678',
            date:"Credited on April 28, 2024",
            points:122
          
        },
        {
          id:3,
          orderID:'Redeemed, Order #6548-8970',
          date:"Debited on March 19, 2024",
          points:150
        },
        {
          id:4,
          orderID:'Order #4564-4678',
          date:"Credited on March 20, 2024",
          points:122
        },
        {
          
            id:5,
            orderID:'Order #4564-4678',
            date:"Credited on April 28, 2024",
            points:122
          
        },
        {
          id:6,
          orderID:'Redeemed, Order #6548-8970',
          date:"Debited on March 19, 2024",
          points:150
        },
        {
          id:7,
          orderID:'Order #4564-4678',
          date:"Credited on March 20, 2024",
          points:122
        },
        {
          
            id:8,
            orderID:'Order #4564-4678',
            date:"Credited on April 28, 2024",
            points:122
          
        },
        {
          id:9,
          orderID:'Redeemed, Order #6548-8970',
          date:"Debited on March 19, 2024",
          points:150
        }
      ],
      redeemDataArray:[
        {
          id:1,
          title:'Free delivery on your next order',
          earn_points:1500
        },
        {
          id:2,
          title:'5% off on your next order',
          earn_points:798
        },
        {
          id:3,
          title:'2 free deliveries',
          earn_points:256
        },
        {
          id:4,
          title:'Free delivery on your next order',
          earn_points:1500
        },
        {
          id:5,
          title:'5% off on your next order',
          earn_points:798
        },
        {
          id:6,
          title:'2 free deliveries',
          earn_points:256
        },
        {
          id:7,
          title:'Free delivery on your next order',
          earn_points:1500
        },
        {
          id:8,
          title:'5% off on your next order',
          earn_points:798
        },
        {
          id:9,
          title:'2 free deliveries',
          earn_points:256
        }
      ]
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        "Change Value",
        "From: " + this.state.txtSavedValue + " To: " + value
      );

      this.setState({ txtSavedValue: value });
    }

    // Customizable Area Start
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({ txtInputValue: text });
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: "email",
    keyboardType: "email-address",
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({ enableField: !this.state.enableField });
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({ txtInputValue: text });
  };

  setEnableField = () => {
    this.setState({ enableField: !this.state.enableField });
  };

  // Customizable Area Start
  handleRedeemFunction=()=>{
    this.setState({showModal:false})
    this.props.navigation.navigate('LoyaltyConfirmation')
  }
  openModalFunc=()=>{
    this.setState({showModal:true})
  }
  cancelButton=()=>{this.setState({showModal:false})}
  goToCatalogueRedirection = ()=>{
    const msgNavigation: Message = new Message(
      getName(MessageEnum.NavigationCatalogueMessage)
    );
    msgNavigation.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
    this.send(msgNavigation);
  }
  // Customizable Area End
}
