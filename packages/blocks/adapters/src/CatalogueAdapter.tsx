import { runEngine } from "../../../framework/src/RunEngine";
import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import MessageEnum from "../../../framework/src/Messages/MessageEnum";
import { getName } from "../../../framework/src/Messages/MessageEnum";

export default class CatalogueAdapter {
  send: (message: Message) => void;
  constructor() {
    const uuidv4 = require("uuid/v4");
    var blockId = uuidv4();
    this.send = (message) => runEngine.sendMessage(blockId, message);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.NavigationCatalogueMessage),
    ]);
  }
  convert(from: Message): Message {
    const to = new Message(getName(MessageEnum.NavigationMessage));

    to.addData(getName(MessageEnum.NavigationTargetMessage), "Catalogue");

    to.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );

    const raiseMessage: Message = new Message(
      getName(MessageEnum.NavigationPayLoadMessage)
    );
    raiseMessage.addData(
      getName(MessageEnum.SubCategoryIdMessage),
      from.getData(getName(MessageEnum.SubCategoryIdMessage))
    );
    raiseMessage.addData(
      getName(MessageEnum.ShowByStoreId),
      from.getData(getName(MessageEnum.ShowByStoreId))
    );
    raiseMessage.addData(
      getName(MessageEnum.subCategoryNameMessage),
      from.getData(getName(MessageEnum.subCategoryNameMessage))
    );
    raiseMessage.addData(
      getName(MessageEnum.navigationTokenMessage),
      from.getData(getName(MessageEnum.navigationTokenMessage))
    );

    to.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    return to;
  }
  receive(from: string, message: Message): void {
    this.send(this.convert(message));
  }
}
