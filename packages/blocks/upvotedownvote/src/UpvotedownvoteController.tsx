import { IBlock } from "../../../framework/src/IBlock";
import { Message } from "../../../framework/src/Message";
import { BlockComponent } from "../../../framework/src/BlockComponent";
import MessageEnum, {
  getName
} from "../../../framework/src/Messages/MessageEnum";
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
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  disliked: boolean;
  liked: boolean;
  _upvote: number;
  _downvote: number;
  token: string;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class UpvotedownvoteController extends BlockComponent<
  Props,
  S,
  SS
> {

  // Customizable Area Start
  checkVoteStatusApiCallId: string = "";
  downvotePostApiCallId: string = "";
  upvotePostApiCallId: string = "";
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      getName(MessageEnum.RestAPIResponceMessage)
      // Customizable Area End
    ];

    this.state = {
      // Customizable Area Start
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      disliked: false,
      liked: false,
      _downvote: 0,
      _upvote: 0,
      token: "",
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End

  }

  async receive(from: string, message: Message) {

    runEngine.debugLog("Message Recived", message);

    // Customizable Area Start
    if(getName(MessageEnum.RestAPIResponceMessage) === message.id){
      const apiRequestCallId = message.getData(
        getName(MessageEnum.RestAPIResponceDataMessage)
      );
      let responseJson = message.getData(
        getName(MessageEnum.RestAPIResponceSuccessMessage)
      );

      let errorResponse = message.getData(
        getName(MessageEnum.RestAPIResponceErrorMessage)
      )

        if(apiRequestCallId === this.checkVoteStatusApiCallId){
            switch(responseJson?.status) {
              case "upvote": 
                this.setState({ 
                  liked: true, 
                  disliked: false, 
                  _upvote: responseJson.total_upvotes, 
                  _downvote: responseJson.total_downvotes 
                }); 
                break;
              case "downvote": 
                this.setState({ 
                  liked: false, 
                  disliked: true,
                  _upvote: responseJson.total_upvotes, 
                  _downvote: responseJson.total_downvotes 
                }); 
                break;
              default: 
                this.setState({ 
                  liked: false, 
                  disliked: false,
                  _upvote: responseJson.total_upvotes, 
                  _downvote: responseJson.total_downvotes
                 }); 
                 break;
            }
        }
        if(apiRequestCallId === this.downvotePostApiCallId){
            if(!responseJson.errors){
              this.setState({ 
                liked: true, 
                disliked: false, 
                _upvote: responseJson.total_upvotes, 
                _downvote: responseJson.total_downvotes 
              });
            }
            else if(errorResponse != undefined) {
              this.showAlert("Error", "Something went wrong")
            }

        }
        if(apiRequestCallId === this.upvotePostApiCallId){
          if(!responseJson.errors){
            this.setState({ 
              liked: false, 
              disliked: true,
              _upvote: responseJson.total_upvotes, 
              _downvote: responseJson.total_downvotes  
            }); 
          }
          else if(errorResponse != undefined){
              this.showAlert("Error", "Something went wrong");
          }
        }
    }
    // Customizable Area End

  }

  // Customizable Area Start
  async setDislike() {
    this.setState({
      disliked: !this.state.disliked,
      _downvote: this.state.disliked
        ? this.state._downvote - 1
        : this.state._downvote + 1
    });
  }
  async setLike() {
    this.setState({
      liked: !this.state.liked,
      _upvote: this.state.liked ? this.state._upvote - 1 : this.state._upvote + 1
    });
  }
  async handleLike() {
    if (this.state.disliked) {
      this.setLike()
      this.setDislike()
    }
    this.setLike();
  }
  async handleDislike() {
    if (this.state.liked) {
      this.setDislike();
      this.setLike();
    }
    this.setDislike();
  }
  btnLikeProps = {
    testID: "likeBtn",
    onPress: () => this.upvotePostHandler("200","167"),
  }
  btnDisLikeProps = {
    testID: "disLikeBtn",
    onPress: () => this.downvotePostHandler("200","167"),
  }
  webBtnLikeProps = {
    "data-testid": "likeBtn",
    onClick: () => this.upvotePostHandler("200","167"),
  }

  webBtnDisLikeProps = {
    "data-testid": "disLikeBtn",
    onClick: () => this.downvotePostHandler("200","167"),
  }

  getToken =async () => {
    this.setState({ token: ''})
  }
  
  async upvotePostHandler(post_id: string, user_id: string): Promise<void> {
    const token = this.state.token;
    const upvotePostMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.upvotePostApiCallId = upvotePostMessage.messageId;
    const header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": 'multipart/form-data'
    }
    upvotePostMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));
    let formData = new FormData()
    formData.append("likeable_id", post_id)
    formData.append("like_by_id", user_id)
    upvotePostMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), formData)
    upvotePostMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.upvoteEndpoint)
    upvotePostMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.exampleAPiMethod)
    runEngine.sendMessage(upvotePostMessage.id, upvotePostMessage)
  }
  async downvotePostHandler(post_id: string, user_id: string): Promise<void> {
    const token = this.state.token;
    const downvotePostMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.downvotePostApiCallId = downvotePostMessage.messageId;
    const header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": 'multipart/form-data'
    }
    downvotePostMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), 
    JSON.stringify(header));
    let formData = new FormData()
    formData.append("dislikeable_id", post_id)
    formData.append("dislike_by_id", user_id)
    downvotePostMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), formData)
    downvotePostMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage), configJSON.downvoteEndpoint)
    downvotePostMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.exampleAPiMethod)
    runEngine.sendMessage(downvotePostMessage.id, downvotePostMessage)
  }
  async checkVoteStatusHandler(post_id: string): Promise<void> {
    const token = this.state.token;
    const requestMessage = new Message(getName(MessageEnum.RestAPIRequestMessage));
    this.checkVoteStatusApiCallId = requestMessage.messageId;
    const header = {
      Authorization: `Bearer ${token}`,
      "Content-Type": 'multipart/form-data'
    }
    requestMessage.addData(getName(MessageEnum.RestAPIRequestHeaderMessage), JSON.stringify(header));
    requestMessage.addData(getName(MessageEnum.RestAPIResponceEndPointMessage),`${configJSON.checkVoteStatusEndpoint}?post_id=${post_id}`)
    requestMessage.addData(getName(MessageEnum.RestAPIRequestMethodMessage), configJSON.validationApiMethodType)
    runEngine.sendMessage(requestMessage.id, requestMessage)
  }
  // Customizable Area End
  
}
