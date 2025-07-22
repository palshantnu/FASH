import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import CustomRadioButton from "../../../components/src/CustomRadioButton";
import CustomButton from "../../../components/src/CustomButton";
import * as IMG_CONST from "./assets";
import LoginOptionsController, { Props } from "./LoginOptionsController";
import Scale from "../../../components/src/Scale";
import USFlag from '../assets/usflag.svg';
import { SvgXml } from 'react-native-svg';
import USFLAG from '../assets/USFLAG';
import USFKuwait from '../assets/USFKuwait';
import DollorSVG from '../assets/Dollor';
import DinarSVG from '../assets/Dinar';

export default class LoginOptionsScreen extends LoginOptionsController {
  constructor(props: Props) {
    super(props);
  }

  renderUserType = ({ index, item }) => (
    <TouchableOpacity
      onPress={() => this.updateMode(index)}
      testID="mode"
      style={[
        styles.card,
        {
          borderColor:
            this.state.selectedModeIndex === index ? "#324B74" : "#E5E5E5",
          backgroundColor:
            this.state.selectedModeIndex === index ? "rgba(55, 82, 128, 0.05)" : "#fff",
        },
      ]}
    >
      <View style={styles.radioTopRight}>
        <CustomRadioButton selected={index === this.state.selectedModeIndex} size={20} />
      </View>

      <Image source={item == 'Buyer' ? IMG_CONST.Buyer : item == 'Seller' ? IMG_CONST.Seller : item == 'Stylist' ? IMG_CONST.Stylist : IMG_CONST.Partner} style={styles.cardImage} />
      <Text style={styles.cardText}>{item}</Text>
    </TouchableOpacity>
  );

  renderOption = ({ index, item, type }) => {
    const isSelected =
      type === "language"
        ? this.state.selectedLanguageIndex === index
        : this.state.selectedCurrencyIndex === index;

    return (
      <TouchableOpacity
        onPress={() =>
          type === "language"
            ? this.updateLanguage(index)
            : this.updateCurrency(index)
        }
        testID={type}
        style={styles.optionRow}
      >
        <CustomRadioButton selected={isSelected} size={20} />
        {type === "language" ? (item == 'English' ? <USFLAG style={styles.flagIcon} /> : <USFKuwait style={styles.flagIcon} />) : (item == 'Dollar' ? <DollorSVG
          style={styles.flagIcon} /> : <DinarSVG style={styles.flagIcon} />)}
        <Text style={styles.optionText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.root}>
        {/* Top Header */}
        <StatusBar barStyle="ligth-content" backgroundColor={"#324B74"} hidden={false} translucent={false} networkActivityIndicatorVisible={true} />
        <View style={styles.header}>
          {/* <Image source={IMG_CONST.headerWave} style={styles.headerBg} /> */}

        </View>

        {/* White Card */}
        <View style={styles.cardContainer}>

          <View style={{
            width: 40, height: 10, backgroundColor: '#D1D5DB', borderRadius: 10, alignSelf: 'center'
          }} />
          <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <Image source={IMG_CONST.logoPrimary} style={styles.logo} />
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <Text style={styles.subTitle}>Choose your user type</Text>

            {/* User Types */}
            <FlatList
              data={this.modes}
              numColumns={2}
              keyExtractor={this.extractKeys}
              renderItem={this.renderUserType}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              scrollEnabled={false}
              style={{ marginVertical: 16 }}
            />

            {/* Language */}
            <Text style={styles.sectionTitle}>Select Language</Text>
            <FlatList
              data={this.languages}
              numColumns={2}
              keyExtractor={this.extractKeys}
              renderItem={({ index, item }) =>
                this.renderOption({ index, item, type: "language" })
              }
              columnWrapperStyle={{ justifyContent: "space-between" }}
              scrollEnabled={false}
            />

            {/* Currency */}
            <Text style={styles.sectionTitle}>Select Currency</Text>
            <FlatList
              data={this.currencies}
              numColumns={2}
              keyExtractor={this.extractKeys}
              renderItem={({ index, item }) =>
                this.renderOption({ index, item, type: "currency" })
              }
              columnWrapperStyle={{ justifyContent: "space-between" }}
              scrollEnabled={false}
            />
          </ScrollView>

          {/* Continue Button */}
          <CustomButton
            title="Continue"
            style={styles.continueBtn}
            onPress={this.btnLoginRedirection}
            testID="continueBtn"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },
  header: {
    height: Scale(90),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#324B74",
  },
  headerBg: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  logo: {
    width: 140,
    height: 34,
    resizeMode: "contain",
    marginBottom: 30,
    marginTop: 10
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 10,
    paddingHorizontal: 20
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#324B74",
  },
  subTitle: {
    fontSize: 16,
    marginTop: 6,
    color: "#444",
  },
  card: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  radioTopRight: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#324B74",
  },
  sectionTitle: {
    marginVertical: 12,
    fontSize: 16,
    fontWeight: "700",
    color: "#324B74",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "48%",
    marginBottom: 12,
  },
  flagIcon: {
    width: 24,
    height: 24,
    marginLeft: 12,
    resizeMode: "contain",
  },
  optionText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#444",
  },
  continueBtn: {
    backgroundColor: "#324B74",
    borderRadius: 10,
    marginTop: 16,
    paddingVertical: 14,
  },
});
