import React from "react";

// Customizable Area Start
import {
  Modal,
  Container,
  Box,
  Button,
  Typography,
  Input,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0000ff",
      contrastText: "#fff",
    },
  },
});
// Customizable Area End

import ChatController, { configJSON, IChat, Props } from "./ChatController";

export default class Chat extends ChatController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderAddRoomModal = () => (
    <Modal
      open={this.state.isVisibleModal}
      onClose={this.hideModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={webStyles.modalContainer}>
        <Input
          data-test-id={"inputRoomName"}
          placeholder="Name"
          onChange={(event) => this.handleChatNameChange(event?.target?.value ?? "Chat Room" )}
        />
        <Box sx={webStyles.modalButtonView}>
          <Button
            data-test-id="createChatSubmitBtn"
            variant="contained"
            color="primary"
            onClick={() => this.createChatRoom(this.state.chatName)}
          >
            {configJSON.createButtonText}
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

  renderRoomList = () => {
    const { chatList } = this.state;
    return (
      <>
        {chatList.map((item: IChat, index: number) => (
          <Box
            data-test-id={`btnShowChat${index}`}
            key={`room-${index}`}
            sx={webStyles.listItemContainer}
            onClick={() => {
              this.navigateToChatView(item.id);
            }}
            style={item.muted ? webStyles.mutedChat : webStyles.listItemContainer}
          >
            <Typography variant="h5" gutterBottom component="div">
              {item.name}
            </Typography>
            {item.muted ? (
              <VolumeOffIcon style={{ color: "#0000ff" }} />
            ) : (
              <VolumeUpIcon style={{ color: "#0000ff" }} />
            )}
            <Typography>{`${item.unreadCount} Unread Messages`}</Typography>
            <Typography>{`Last Message: ${item.lastMessage ?? ""}`}</Typography>
          </Box>
        ))}
      </>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Box sx={webStyles.createButtonView}>
            <Button
              data-test-id={"createChatRoomBtn"}
              variant="contained"
              color="primary"
              onClick={() => {
                this.showModal();
              }}
            >
              {configJSON.createRoomButtonText}
            </Button>
          </Box>
          <Box sx={webStyles.roomListContainer}>{this.renderRoomList()}</Box>
          {this.renderAddRoomModal()}
        </Container>
      </ThemeProvider>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyles = {
  createButtonView: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0px",
    marginBottom: 20,
  },
  roomListContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listItemContainer: {
    width: 300,
    border: "2px solid #ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
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
  modalButtonView: {
    marginLeft: 10,
  },
  mutedChat: {
    backgroundColor: "lightgray"
  },
};
// Customizable Area End
