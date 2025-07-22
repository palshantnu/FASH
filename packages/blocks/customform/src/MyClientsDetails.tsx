import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MyClientsDetailsController, {
  Props,
} from "./MyClientsDetailsController";
import { backIcon, menu } from "./assets";
import Scale, { verticalScale } from "../../../components/src/Scale";
import { ScrollView } from "react-native-gesture-handler";
const windowWidth = Dimensions.get("window").width;
// Customizable Area End

export default class MyClientsDetails extends MyClientsDetailsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start
  renderCart = () => {
    const { cardDataList } = this.state;
    return (
      <View style={styles.card}>
        {Object.keys(cardDataList).map((key) => (
          <View key={key} style={styles.row}>
            <Text style={styles.key}>{key}</Text>
            <Text style={styles.value}>{cardDataList[key]}</Text>
          </View>
        ))}
      </View>
    );
  };
  renderClientsDetailsContainer = () => {
    return (
      <View style={styles.detailsView}>
        <View style={styles.upperTxtBox}>
          <Text testID="AmPm" style={styles.orderNumber}>#43423-343 | 03.33PM</Text>
          <View style={styles.statusView}>
            <Text style={styles.statusCurrentTxt}>{"Current"}</Text>
          </View>
        </View>
        <FlatList
          testID="flatlistTestID"
          horizontal={true}
          style={{ marginVertical: verticalScale(16) }}
          data={this.state.fashionImageList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Image
              source={item}
              style={styles.catlougeImg}
              testID="btnScreen"
            />
          )}
        />
        <Text style={styles.descrptionTxt}>
          I want a red couloured dress with shinny embroidry over it. I usually
          wear the ‘Medium Size’ and ‘Slim’ fit. I want to wear that dress at
          Gala Dinner at my company’s meetup. The location is Maldives so i want
          something according to that location.
        </Text>
        {this.renderCart()}
      </View>
    );
  };
  renderButton = () => {
    return (
      <TouchableOpacity
        testID="wishListbuttonId"
        onPress={()=>this.createWishlist()}
        style={styles.wishListButtonStyle}
        activeOpacity={0.8}
      >
        <Text style={styles.wishListButtonText}>{this.getClientFirstName()}</Text>
      </TouchableOpacity>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeContainer}>
          <StatusBar
            backgroundColor="#ffffff"
            barStyle="dark-content"
            hidden={false}
            translucent={false}
            networkActivityIndicatorVisible={false}
          />
          <View style={styles.container}>
            <View style={styles.headerViewCli}>
              <TouchableOpacity
                testID="btnBackClientsAndchat"
                style={styles.backTouchClients}
                onPress={this.goBack}
              >
                <Image
                  resizeMode="contain"
                  source={backIcon}
                  style={styles.backIconCssN}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.headerTitleClient}>{this.state.clientDetails.attributes.buyer_name}</Text>
              </View>
              <Image source={menu} style={styles.menuStyle} />
            </View>
          </View>
          <ScrollView
            style={{
              marginBottom: verticalScale(40),
              marginTop: verticalScale(20),
            }}
          >
            {this.renderClientsDetailsContainer()}
            {this.renderButton()}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
    justifyContent: "center",
  },
  headerViewCli: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: (windowWidth * 3) / 100,
    alignContent: "center",
  },
  backTouchClients: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  backIconCssN: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleClient: {
    color: "#375280",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontWeight: "800",
    lineHeight: 26,
  },
  menuStyle: {
    height: verticalScale(24),
    width: verticalScale(24),
  },
  detailsView: {
    paddingHorizontal: Scale(20),
    paddingVertical: verticalScale(20),
  },
  upperTxtBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: "500",
    color: "#375280",
    lineHeight: 22,
    fontFamily: "Lato-Regular",
    fontStyle: "normal",
  },

  statusCurrentTxt: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
    color: "#BE5B00",
    textAlign: "center",
    fontFamily: "Lato-Regular",
    fontStyle: "normal",
  },
  statusView: {
    height: verticalScale(27),
    backgroundColor: "#FFE7D0",
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: Scale(10),
    paddingRight: Scale(10),
  },
  catlougeImg: {
    height: verticalScale(80),
    width: verticalScale(80),
    marginHorizontal: Scale(6),
  },
  descrptionTxt: {
    fontSize: 18,
    color: "#375280",
    marginBottom: 10,
    lineHeight: 26,
    textAlign: "justify",
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Lato-Regular",
  },
  card: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: Scale(16),
    borderRadius: 3,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: windowWidth - 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: verticalScale(8),
  },
  key: {
    fontWeight: "700",
    fontSize: Scale(16),
    color: "#375280",
    fontFamily: "Lato-Regular",
    lineHeight: 24,
    fontStyle: "normal",
  },
  value: {
    fontSize: Scale(16),
    fontWeight: "400",
    lineHeight: 24,
    fontStyle: "normal",
    color: "#375280",
    fontFamily: "Lato-Regular",
  },
  wishListButtonStyle: {
    height: Scale(56),
    width: Scale(380),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCBEB1",
    borderRadius: 2,
    marginBottom: verticalScale(20),
    marginTop: verticalScale(10),
  },
  wishListButtonText: {
    fontFamily: "Lato-Regular",
    fontSize: Scale(20),
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: Scale(26),
  },
});
// Customizable Area End
