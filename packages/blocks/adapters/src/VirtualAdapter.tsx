import { v4 as uuidv4 } from 'uuid';
import { runEngine } from '../../../framework/src/RunEngine';
import { IBlock } from '../../../framework/src/IBlock';
import { Message } from '../../../framework/src/Message';
import MessageEnum, {
  getName
} from '../../../framework/src/Messages/MessageEnum';
export default class VirtualAdapter {
  send: (message: Message) => void;
  constructor() {
    // const uuidv4 = require('uuid/v4');
    const blockId = uuidv4();
    this.send = message => runEngine.sendMessage(blockId, message);
    runEngine.attachBuildingBlock(this as IBlock, [
      getName(MessageEnum.NavigationSearchDataMessage)
    ]);
  }
  convert = (from: Message): Message => {
    const to = new Message(getName(MessageEnum.NavigationMessage));
   const ScreenName =  from.getData(getName(MessageEnum.NavigationScreenMessage))
    to.addData(
      getName(MessageEnum.NavigationTargetMessage),
      ScreenName
    );
    to.addData(
      getName(MessageEnum.NavigationPropsMessage),
      from.getData(getName(MessageEnum.NavigationPropsMessage))
    );
    const raiseMessage = new Message(
        getName(MessageEnum.NavigationPayLoadMessage)
      );
      raiseMessage.addData(
        getName(MessageEnum.NavigationIdDataMassage),
        from.getData(getName(MessageEnum.NavigationIdDataMassage))
      );
      to.addData(getName(MessageEnum.NavigationRaiseMessage), raiseMessage);
    return to;
  };
  receive(from: string, message: Message): void {
    this.send(this.convert(message));
  }
}