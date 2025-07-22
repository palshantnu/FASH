import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  Platform
} from "react-native";
// Customizable Area End

import ReviewsController, { Props } from "./ReviewsController";

export default class Reviews extends ReviewsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      {/* Customizable Area Start */}
        <View style={this.state.isVisible ? styles.modalBox : {display: "none"}}>
          <Modal
            animationType={"fade"}
            transparent={false}
            visible={this.state.isVisible}
          >
            <View style={styles.modal}>
              <ScrollView>
                <Text style={styles.infoText}>
                  <Text style={styles.labelText}>Title:{"  "}</Text>
                  {this.state.title}
                </Text>
                <Text numberOfLines={2} style={styles.infoText}>
                  <Text style={styles.labelText}>Anonymous{"  "}</Text>
                  {this.state.anonymous}
                </Text>
                <Text numberOfLines={2} style={styles.infoText}>
                  <Text style={styles.labelText}>Account ID{"  "}</Text>
                  {this.state.account_id}
                </Text>
                <Text numberOfLines={10} style={styles.infoText}>
                  <Text style={styles.labelText}>Description:{"  "}</Text>
                  {this.state.description}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.labelText}>Created At:{"  "}</Text>
                  {this.state.activeCreatedAt}
                </Text>
              </ScrollView>
              <View style={styles.buttonBox}>
                <TouchableOpacity
                  style={[styles.viewBtnWidth, styles.closeBtn]}
                  testID="hideModalBtn"
                  onPress={() => {
                    this.hideModal();
                  }}
                >
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity
          testID={"btnAddReview"}
          style={this.state.isVisible ? {display: "none"} : styles.addBtn}
          onPress={() => {
            this.addQuery();
          }}
        >
          <Text style={styles.addtext}>Add New Review</Text>
        </TouchableOpacity>
        {!this.state.isVisible && this.state.accountReview?.attributes ? 
        (
          <View style={styles.tableBox}>
          <Text>ID: {this.state.accountReview.attributes.id}</Text>
          <Text>title: {this.state.accountReview.attributes.title}</Text>
          <Text>description: {this.state.accountReview.attributes.description}</Text>
          <Text>anonymous: {this.state.accountReview.attributes.anonymous ? "true" : "false"} </Text>
          </View>
        )
        :
        (<Text>{this.state.token && this.state.token.length > 0 ? "Cannot Find Review for Account " + this.state.account_id : "Please login for reviews."} </Text>)
        }
      {/* Customizable End Start */}
      </ScrollView>
      //Merge Engine End DefaultContainer
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
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff"
  },
  tableBox: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    marginBottom: 30
  },
  webviewStyle: {
    height: 200
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4
  },
  labelText: {
    fontWeight: "bold"
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
  addBtn: {
    backgroundColor: "blue",
    marginBottom: 10,
    width: 120,
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-end"
  },
  addtext: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  buttonTop: {
    display: "flex",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  closeBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  },
  modal: {
    width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 80,
    marginLeft: 40,
    padding: 15
  },
  viewBtnWidth: {
    width: "48%"
  },
  closeBtnText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16
  }
});
// Customizable Area End
