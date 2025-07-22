import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { getName } from "../../../framework/src/Messages/MessageEnum";
import MessageEnum from "../../../framework/src/Messages/MessageEnum";

export default class CategoriesSubCateAdapter {
  send: (message: Message) => void;
  constructor() {
    const uuidv4 = require("uuid/v4");
    var blockId = uuidv4();
    this.send = (message) => runEngine.sendMessage(blockId, message);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.NavigationSubCateMessage),
    ]);
  }
  convert(from: Message): Message {
    const to = new Message(getName(MessageEnum.NavigationMessage));

    to.addData(
      getName(MessageEnum.NavigationTargetMessage),
      "CategoriesSubCate"
    );

    to.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );

    raiseMessage.addData(
      getName(MessageEnum.categoryIdMessage),
      from.getData(getName(MessageEnum.categoryIdMessage))
    );

    raiseMessage.addData(
      getName(MessageEnum.ShowByStoreId),
      from.getData(getName(MessageEnum.ShowByStoreId))
    );

    raiseMessage.addData(
      getName(MessageEnum.categoryNameMessage),
      from.getData(getName(MessageEnum.categoryNameMessage))
    );

    raiseMessage.addData(
      getName(MessageEnum.categoryArrMessage),
      from.getData(getName(MessageEnum.categoryArrMessage))
    );

    to.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);

    return to;
  }
  receive(from: string, message: Message): void {
    this.send(this.convert(message));
  }
}
