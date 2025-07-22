import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum from "../../../framework/src/Messages/MessageEnum";
import { getName } from "../../../framework/src/Messages/MessageEnum";

export default class Wishlist2Adapter {
  send: (message: Message) => void;
  constructor() {
    const uuidv4 = require("uuid/v4");
    var blockId = uuidv4();
    this.send = (message) => runEngine.sendMessage(blockId, message);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.NavigationWishlist2Message),
    ]);
  }
  convert(from: Message): Message {
    const to = new Message(getName(MessageEnum.NavigationMessage));

    to.addData(getName(MessageEnum.NavigationTargetMessage), "WishListClient");

    to.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(
      getName(MessageEnum.wishlistIdMessage),
      from.getData(getName(MessageEnum.wishlistIdMessage))
    );

    to.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    return to;
  }
  receive(from: string, message: Message): void {
    this.send(this.convert(message));
  }
}
