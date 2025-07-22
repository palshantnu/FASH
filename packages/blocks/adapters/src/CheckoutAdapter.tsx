import { v4 as uuidv4 } from "uuid";
import { runEngine } from "framework/src/RunEngine";
import { IBlock } from "framework/src/IBlock";
import { Message } from "framework/src/Message";
import MessageEnum, { getName } from "framework/src/Messages/MessageEnum";

export default class CheckoutAdapter {
  send: (message: Message) => void;

  constructor() {
    const blockId = uuidv4();
    this.send = (message) => runEngine.sendMessage(blockId, message);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.NavigationCheckout),
    ]);
  }

  convert = (from: Message): Message => {
    const converTo = new Message(getName(MessageEnum.NavigationMessage));

    converTo.initializeFromObject({
      [getName(MessageEnum.NavigationTargetMessage)]: "Checkout",
      [getName(MessageEnum.NavigationPropsMessage)]: from.getData(
        getName(MessageEnum.NavigationPropsMessage)
      ),
    });

    return converTo;
  };

  receive(from: string, message: Message): void {
    this.send(this.convert(message));
  }
}
