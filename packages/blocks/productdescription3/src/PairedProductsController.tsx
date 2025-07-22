import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";
import { runEngine } from "../../../framework/src/RunEngine";

// Customizable Area Start
import { ViewToken, ViewabilityConfig, EmitterSubscription } from "react-native";
import { showMessage } from "react-native-flash-message";
import { PairWith, PairedProductsNavigationPayload } from './response';
import { getStorageData } from "framework/src/Utilities";
import PriceConvertValue from "../../../components/src/PriceConvertValue";
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
  variant?: PairedProductsNavigationPayload;
  variantImages: Array<{ id: string, uri: string }>;
  variantImageIndex: number;
  localCurrency:string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class PairedProductsController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  focusListener = { remove: () => {} } as EmitterSubscription;
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      // Customizable Area Start
      getName(MessageEnum.NavigationPayLoadMessage),
      getName(MessageEnum.RestAPIResponceMessage),
      getName(MessageEnum.SessionResponseMessage),
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      token: '',
      variantImages: [],
      variantImageIndex: 0,
      localCurrency:''
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    // Customizable Area Start
    runEngine.debugLog("Message Recived", message);

    if (message.id === getName(MessageEnum.NavigationPayLoadMessage)) {
      const variant = message.getData(
        getName(MessageEnum.NavigationPayloadPairedProductsMessage)
      ) as PairedProductsNavigationPayload;
      const image_keys: Array<keyof PairedProductsNavigationPayload> = ['front_image', 'side_image', 'back_image']
      const images: S['variantImages'] = [];
      if (!variant.front_image && !variant.back_image && !variant.side_image) {
        images.push({ id: 'no-image', uri: 'https://i.ibb.co/8Nb9QHL/image.png' })
      } else {
        image_keys.forEach(key => {
          if (variant[key]) {
            images.push({ id: key, uri: variant[key] })
          }
        })
      }
      if (variant) {
        this.setState({
          variant,
          variantImages: images
        });
      }
    }
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "willFocus",
      async () => {
        let currencyGet = await getStorageData('currencyIcon',true)
        this.setState({localCurrency:currencyGet})
      }
    );
  }

  componentWillUnmount = async () => {
    this.focusListener.remove();
  };

  viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 80,
    minimumViewTime: 100
  }

  onViewableItemsChanged = ({ viewableItems }: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (viewableItems[0]) {
      this.setState({ variantImageIndex: viewableItems[0].index! })
    }
  }

  getPrice = (item: PairWith) => {
    return PriceConvertValue(item.attributes.price,this.state.localCurrency)
  }

  pushToProductDetails = (catalogueId: string | number) => {
    /**
     * builder's way of mavigation doesn't allow any other methods than `.navigate`
     * In this case we need the behaviour of `.push` instead of `.navigate`
   
     * > The push action adds a route on top of the stack and navigates forward to it.
     * This differs from navigate in that navigate will pop back to earlier in the stack if a route of the given name is already present there. 
     * Push will always add on top, so a route can be present multiple times.
     * 
     * https://reactnavigation.org/docs/2.x/stack-actions#push
     */
    this.props.navigation.push("ProductDetails", {cid: catalogueId});
  }

  yetToBeDevelopedAlert = () => {
    showMessage({
      message: 'This feature is yet to be developed.',
      position: { top: 8 },
      type: 'info'
    })
  }
  // Customizable Area End
}
