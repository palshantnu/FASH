import React from "react";
// Customizable Area Start
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  VirtualizedList,
  ListRenderItem,
  ImageSourcePropType,
  Image,
  Pressable,
} from "react-native";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomLoader from "../../../components/src/CustomLoader";
import Scale from "../../../components/src/Scale";

import { card, gpay, apay } from "./assets";

const { width } = Dimensions.get("window");
// Customizable Area End

import PaymentMethodsController, {
  Props,
  configJSON,
} from "./PaymentMethodsController";

export default class PaymentMethods extends PaymentMethodsController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  renderCard: ListRenderItem<{
    cardBrand: ImageSourcePropType;
    last4: string | number;
    id: string;
  }> = ({ item }) => (
    <Pressable
      style={[
        styles.row,
        styles.shadow,
        styles.cardBox,
        item.id === this.state.selected ? styles.selected : {},
      ]}
      onPress={() => this.select(item.id)}
      testID={item.id}
    >
      <Image source={item.cardBrand} style={styles.ccbrand} />
      <Text style={styles.ccn}>{`**** **** **** ${item.last4}`}</Text>
    </Pressable>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="paymentMethodPage">
        <CustomHeader
          title={configJSON.paymentMethodsTitle}
          onLeftPress={() => this.props.navigation.goBack()}
        />
        <View style={[styles.container, styles.sb]}>
          <View style={styles.m20}>
            <VirtualizedList
              keyExtractor={(item) => item.id}
              initialNumToRender={10}
              getItem={(_data, index) => this.cards[index]}
              getItemCount={() => this.cards.length}
              renderItem={this.renderCard}
              ListHeaderComponent={
                <>
                  <Text style={styles.headerTxt}>Saved Cards</Text>
                  <View
                    style={[
                      styles.shadow,
                      styles.row,
                      styles.sb,
                      styles.cardBox,
                    ]}
                  >
                    <View style={styles.row}>
                      <Image style={styles.ccbrand} source={card} />
                      <Text style={styles.ccn}>Add debit/credit card</Text>
                    </View>
                    <Pressable testID="addCard" onPress={this.goToAddCards}>
                      <Text style={styles.add}>Add</Text>
                    </Pressable>
                  </View>
                </>
              }
            />
            <View testID="gpay">
              <Text style={styles.headerTxt}>Google Pay</Text>
              <View
                style={[styles.shadow, styles.row, styles.sb, styles.cardBox]}
              >
                <Image style={styles.ccbrand} source={gpay} />
                <Text style={styles.ccn}>Google Pay</Text>
              </View>
            </View>
            <View testID="apay">
              <Text style={styles.headerTxt}>Apple Pay</Text>
              <View
                style={[styles.shadow, styles.row, styles.sb, styles.cardBox]}
              >
                <Image style={styles.ccbrand} source={apay} />
                <Text style={styles.ccn}>Apple Pay</Text>
              </View>
            </View>
          </View>
          <View style={styles.btn}>
            <CustomButton
              title="Checkout"
              testID="checkout"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </View>
        {this.state.loading && <CustomLoader />}
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  sb: {
    justifyContent: "space-between",
  },
  btn: {
    padding: Scale(20),
    backgroundColor: "#ffffff",
  },
  m20: {
    margin: Scale(20),
  },
  headerTxt: {
    color: "#375280",
    fontFamily: "Lato",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 26,
  },
  shadow: {
    shadowColor: "#000000",
    backgroundColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    borderRadius: Scale(2),
  },
  cardBox: {
    marginVertical: Scale(10),
    paddingHorizontal: Scale(16),
    height: Scale(60),
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderWidth: Scale(2),
  },
  ccn: {
    fontFamily: "Lato",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 24,
    color: "#375280",
  },
  ccbrand: {
    height: Scale(24),
    width: Scale(24),
    marginRight: Scale(12),
  },
  selected: {
    borderColor: "#CCBEB1",
    borderWidth: Scale(2),
  },
  add: {
    color: "#375280",
    fontFamily: "Lato-Regular",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 22,
  }
});
// Customizable Area End
