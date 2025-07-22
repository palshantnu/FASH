import React from "react";

// Customizable Area Start
import {
  Container,
  Box,
  Button,
  Typography,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { like, redLike } from "./assets";
// Customizable Area End

import UpvotedownvoteController, {
    Props,
    configJSON,
} from "./UpvotedownvoteController";

export default class Upvotedownvote extends UpvotedownvoteController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  async componentDidMount ()  {
    await this.getToken()
    const post_id: string = "200";
    this.checkVoteStatusHandler(post_id)
  }
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      <ThemeProvider theme={theme}>
        <Container maxWidth={"sm"}>
          <Box sx={webStyle.mainWrapper}>
            <Box>
              <Button style={webStyle.upVoteContainer} {...this.webBtnLikeProps}>
                <img style={webStyle.imageSize} src={this.state.liked ? redLike: like} alt={configJSON.upvotesLabelText} />
              </Button>
              <Button style={webStyle.downVoteContainer}  {...this.webBtnDisLikeProps}>
                <img style={webStyle.imageSize} src={this.state.disliked ? redLike: like} alt={configJSON.downvotesLabelText} />
              </Button>
            </Box>
            <Box sx={webStyle.voteCountContainer}>
              <Typography>{`${this.state._upvote} ${configJSON.upvotesLabelText}`}</Typography>
              <Typography>{`${this.state._downvote} ${configJSON.downvotesLabelText}`}</Typography>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
  },
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      margin: "20px 0px",
    },
  },
});

const webStyle = {
  mainWrapper: {
    display: "flex",
    fontFamily: "Roboto-Medium",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "30px",
    background: "#fff",
  },
  itemWrapper: {
    border: "1px solid #767676",
    display: "flex",
    width: "70%",
    flexDirection: "row" as "row",
    marginTop: 10,
    padding: 16,
    paddingTop: 10,
    cursor: "pointer",
  },
  itemHeadingWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "row" as "row",
  },
  iconStyle: {
    width: 20,
    height: 26,
    marginTop: 6,
  },
  itemHeading: {
    color: "#000",
    flex: 1,
    fontWeight: 700,
  },
  itemHeadingRead: {
    color: "#6200EE",
    flex: 1,
    fontWeight: 700,
  },
  contents: {
    fontSize: 16,
    color: "#767676",
  },
  okButton: {
    backgroundColor: "#ccc",
    color: "#000",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
  },
  downVoteContainer: {
    transform: 'rotate(180deg)',
    width: 150,
    height: 150,
  },
  voteCountContainer: {
    display: 'flex',
    margin: 20,
    width: '100%',
    justifyContent: 'space-evenly'
  },
  upVoteContainer: {
    width: 150,
    height: 150,
  },
  imageSize: {
    width: '100%',
    height: '100%'
  }
};
// Customizable Area End
