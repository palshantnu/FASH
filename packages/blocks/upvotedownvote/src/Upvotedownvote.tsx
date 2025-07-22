import React from "react";

// Customizable Area Start	
import {	
  StyleSheet,	
  Text,	
  Image,	
  TouchableOpacity,	
  View,	
  ScrollView,	
  TouchableWithoutFeedback,	
} from "react-native";
import { like, redLike } from "./assets";
// Customizable Area End	

import UpvotedownvoteController, {
  Props,
  configJSON
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
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container} >
        <TouchableWithoutFeedback>
          {/* Customizable Area Start */}
          <View>
            <View style={styles.voteButtonContainer}>
              <TouchableOpacity style={styles.likeButton} {...this.btnLikeProps} >
                <View style={styles.likeImageContainer}>
                <Image source={this.state.liked ? redLike: like} style={styles.likeImage}/>
              </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.disLikeButton} {...this.btnDisLikeProps} >
                <View style={styles.disLikeImageContainer}>
                  <Image source={this.state.disliked ? redLike: like} style={styles.disLikeImage}/>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.votesCountContainer}>
              <Text>{`${this.state._upvote} ${configJSON.upvotesLabelText}`}</Text>
              <Text>{`${this.state._downvote} ${configJSON.downvotesLabelText}`}</Text>
            </View>
          </View>
          {/* Customizable Area End */}
        </TouchableWithoutFeedback>
      </ScrollView>
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff"
  },
  votesCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20
    
  },
  voteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  likeButton:{
  },
  disLikeButton:{
  },
  likeImageContainer:{
    width: 50,
    height: 50
  },
  likeImage: {
    width: '100%',
    height: '100%'
  },
  disLikeImageContainer:{
    width: 50,
    height: 50,
    transform: [{ rotate: "180deg" }]
  },
  disLikeImage: {
    width: '100%',
    height: '100%'
  }
});
// Customizable Area End
