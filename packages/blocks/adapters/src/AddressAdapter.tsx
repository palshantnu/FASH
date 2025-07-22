import { v4 as uuidv4 } from "uuid";
import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum, {
  getName,
} from "../../../framework/src/Messages/MessageEnum";

export default class AddressesAdapter {
  send: (message: Message) => void;

  constructor() {
    const blockId = uuidv4();
    this.send = (message) => runEngine.sendMessage(blockId, message);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.NavigationAddressesMessage),
    ]);
  }

  convert = (from: Message): Message => {
    const to = new Message(getName(MessageEnum.NavigationMessage));

    to.addData(getName(MessageEnum.NavigationTargetMessage), "Addresses");

    to.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(
      getName(MessageEnum.ListAddressMessage),
      from.getData(getName(MessageEnum.ListAddressMessage))
    );

    raiseMessage.addData(
      getName(MessageEnum.CheckoutAddressMessage),
      from.getData(getName(MessageEnum.CheckoutAddressMessage))
    );

    to.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    return to;
  };

  receive(from: string, message: Message): void {
    this.send(this.convert(message));
  }
}
