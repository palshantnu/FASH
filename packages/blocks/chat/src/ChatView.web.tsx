import React from "react";

// Customizable Area Start
import {
  Modal,
  Container,
  Box,
  Button,
  Typography,
  Input,
  IconButton,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import InsertPhoto from "@material-ui/icons/InsertPhoto";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});
// Customizable Area End

import ChatViewController, { IMessage, Props } from "./ChatViewController";
import { configJSON } from "./ChatController";

// Customizable Area Start
// Customizable Area End

export default class ChatView extends ChatViewController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderAddAccountModal = () => (
    <Modal
      open={this.state.isVisibleModal}
      onClose={this.hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={webStyles.modalContainer}>
        <Input
          data-test-id={"inputAccountID"}
          placeholder="Account ID"
          onChange={(event) =>
            this.handleAccountIdInputChange(event?.target?.value ?? "2")
          }
        />
        <Box sx={webStyles.modalButtonView}>
          <Button
            data-test-id="btnAddAccount"
            variant="contained"
            color="primary"
            onClick={() =>
              this.addUserToChat(this.state.accountIdInput, this.state.chatId)
            }
          >
            {configJSON.addButtonText}
          </Button>
        </Box>
        <Box sx={webStyles.modalButtonView}>
          <Button
            data-test-id="btnCloseModal"
            variant="contained"
            color="primary"
            onClick={() => this.hideModal()}
          >
            {configJSON.closeButtonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  imagePriviewModal = () => (
    <Modal
      open={this.state.isVisiblePreviewModal}
      onClose={this.hidePreviewModal}
    >
      <Box sx={webStyles.previewModalContainer}>
        <img src={this.state.imageUrl} style={webStyles.previewImage} />
        <Box sx={webStyles.previewModalButtons}>
          <Box sx={webStyles.modalButtonView}>
            <Button
              data-test-id="btnClosePreviewModal"
              variant="contained"
              color="secondary"
              onClick={() => this.hidePreviewModal()}
            >
              {configJSON.cancelText}
            </Button>
          </Box>
          <Input
            data-test-id={"inputImageMessage"}
            placeholder="Write message here"
            style={webStyles.previewInput}
            value={this.state.message}
            fullWidth={true}
            onChange={(event) =>
              this.handleMessageChange(event?.target?.value ?? "Hi")
            }
          />
          <Box sx={webStyles.modalButtonView}>
            <Button
              data-test-id="btnSendImageMessage"
              variant="contained"
              color="primary"
              disabled={this.state.message?.length === 0}
              onClick={this.handleSendMessage}
            >
              {configJSON.sendText}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );

  renderMessages = () => {
    const { chatData } = this.state;
    const messages = chatData?.attributes?.messages ?? [];
    return (
      <>
        {messages
          ?.slice(0)
          .reverse()
          .map((item: IMessage, index: number) => (
            <Box
              key={`message-${index}`}
              sx={webStyles.messageBoxContainer}
              style={
                item.attributes.is_mark_read
                  ? webStyles.readMessage
                  : webStyles.unreadMessage
              }
            >
              {item.attributes.attachments ? <img src={item.attributes.attachments[0].url} style={webStyles.previewImage} /> : null}
              <Typography variant="h6">{item.attributes?.message}</Typography>
              <Typography variant="subtitle2">
                {item.attributes?.created_at}
              </Typography>
            </Box>
          ))}
      </>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    const { chatData } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Box sx={webStyles.container}>
            <Typography>{chatData?.attributes.name}</Typography>
            <Box sx={webStyles.headerContainer}>
              <Box sx={webStyles.headerButtonView}>
                <Typography>{`Users: ${chatData?.relationships?.accounts?.data
                  ?.length ?? ""}`}</Typography>
                <Button
                  data-test-id="btnShowAddModal"
                  variant="contained"
                  color="primary"
                  onClick={() => this.showModal()}
                >
                  {configJSON.addAccountText}
                </Button>
                <Button
                  data-test-id="btnLeaveChat"
                  variant="contained"
                  color="primary"
                  onClick={() => this.leaveChatRoom(this.state.chatId)}
                >
                  {configJSON.leaveChatRoomText}
                </Button>
                <IconButton
                  data-test-id="btnToggleMute"
                  onClick={this.changeNotificationStatus}
                >
                  {this.state.muted ? (
                    <VolumeOffIcon style={{ color: "#0000ff" }} />
                  ) : (
                    <VolumeUpIcon style={{ color: "#0000ff" }} />
                  )}
                </IconButton>
              </Box>
            </Box>
            <Box sx={webStyles.messageContainer}>{this.renderMessages()}</Box>
            <Box sx={webStyles.bottomContainer}>
              <Box sx={webStyles.messageInputView}>
                <Input
                  data-test-id={"inputMessage"}
                  placeholder="Write message here"
                  value={this.state.message}
                  fullWidth={true}
                  onChange={(event) =>
                    this.handleMessageChange(event?.target?.value ?? "Hi")
                  }
                />
              </Box>
              <IconButton
                data-test-id="btnInsertImage"
                onClick={this.handleInsertImage}
              >
                <InsertPhoto fontSize="large" />
              </IconButton>
              <Input
                data-test-id="FileInput"
                inputRef={this.fileInputRef}
                style={webStyles.fileInput}
                type="file"
                inputProps={{ accept: "image/png, image/jpeg" }}
                onChange={this.handleFileChange}
              />
              <Button
                data-test-id="btnSendMessage"
                variant="contained"
                color="primary"
                disabled={this.state.message?.length === 0}
                onClick={this.handleSendMessage}
              >
                {configJSON.sendText}
              </Button>
            </Box>
          </Box>
          {this.renderAddAccountModal()}
          {this.imagePriviewModal()}
        </Container>
      </ThemeProvider>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    width: 600,
    border: "1px solid #ccc",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  headerButtonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: 600,
    height: 600,
    overflow: "scroll",
  },
  messageBoxContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#d9d6ed",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 40,
  },
  messageInputView: {
    width: "100%",
    marginRight: 10,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    width: 600,
    border: "1px solid #ccc",
    background: "#fff",
  },
  modalContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute" as "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  previewModalContainer: {
    display: "flex",
    flexDirection: "column",
    position: "absolute" as "absolute",
    width: '80%',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  previewImage: {
    width: "100%",
    height: "auto"
  },
  previewInput: {
    marginLeft: 10,
  },
  modalButtonView: {
    marginLeft: 10,
  },
  previewModalButtons: {
    margin: 10,
    display: "flex",
    flexDirection: "row"
  },
  unreadMessage: {
    color: "red",
  },
  readMessage: {
    color: "black",
  },
  fileInput: {
    display: "none",
  }
};
// Customizable Area End
