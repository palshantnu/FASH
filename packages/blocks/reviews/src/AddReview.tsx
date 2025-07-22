import React from "react";

// Customizable Area Start
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView
} from "react-native";
// Customizable Area End

import ReviewsController, { Props, configJSON } from "./ReviewsController";

export default class AddReview extends ReviewsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  render() {
    return (
      <KeyboardAvoidingView
        behavior={this.isPlatformiOS() ? "padding" : undefined}
        style={styles.keyboardPadding}
      >
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
          <TouchableWithoutFeedback
            testID={"Background"}
            onPress={() => {
              this.hideKeyboard();
            }}
          >
            <View>
              <View style={styles.bgInputContainer}>
                <Text style={styles.titleInput}>{configJSON.titleTitle}</Text>
                <TextInput
                  testID="title" //Merge Engine::From BDS
                  style={styles.bgMobileInput} //UI Engine::From Sketch
                  placeholder={configJSON.titlePlaceHolder} //UI Engine::From Sketch
                  {...this.txtTitleProps} //Merge Engine::From BDS - {...this.testIDProps}
                />
              </View>
              <Text style={styles.titleInput}>{configJSON.descriptionTitle}</Text>
              <TextInput
                placeholder={configJSON.descriptionPlaceHolder}
                multiline
                testID="txtReviews" //Merge Engine::From BDS
                style={styles.bgMobileInputMessage} //UI Engine::From Sketch
                {...this.txtDescriptionProps} //Merge Engine::From BDS - {...this.testIDProps}
              />
              <TouchableOpacity
                style={styles.viewBtn}
                testID="btnSubmit" //Merge Engine::From BDS
                onPress={() => {
                  this.addQueryApi();
                }}
              >
                <Text style={styles.viewBtnText}>Add New Review</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
// Customizable Area End

// Customizable Area Start
const styles = StyleSheet.create({
  keyboardPadding: { flex: 1 },
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#fff"
  },
  goBack: {
    marginLeft: 16
  },
  viewBtn: {
    backgroundColor: "blue",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "blue"
  },
  viewBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  },
  titleInput: {
    color: "#000"
  },
  bgInputContainer: {
    marginBottom: 25
  },
  bgMobileInput: {
    height: 45,
    borderBottomWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#c9c9c9"
  },
  bgMobileInputMessage: {
    borderWidth: Platform.OS === "web" ? 0 : 1,
    borderColor: "#c9c9c9",
    height: 100,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 20
  }
});
// Customizable Area End