import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  VirtualizedList,
  View,
  ListRenderItem,
  Pressable,
} from "react-native";

import { RegisterType } from "./responseStore";
import { headPhoneIcon } from "./assets";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
import CustomHeader from "../../../components/src/CustomHeader";
import CustomRadioButton from "../../../components/src/CustomRadioButton";
import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";

const { width } = Dimensions.get("window");
// Customizable Area End

import DriverRegistrationTypeController, {
  Props,
} from "./DriverRegistrationTypeController";

export default class DriverRegistrationType extends DriverRegistrationTypeController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  renderData: ListRenderItem<RegisterType> = ({ item, index }) => {
    return (
      <Pressable
        style={[
          styles.item,
          styles.row,
          index === this.state.selectedIndex ? styles.activeItem : {},
          {flexDirection: FlexConditionManage(i18n.language)}
        ]}
        testID={`item-type-${index}`}
        onPress={() => this.selectType(index)}
      >
        <View style={[{ flexDirection: FlexConditionManage(i18n.language) },styles.row]}>
          <Image source={item.icon} style={styles.itemIcon} />
          <Text style={[{marginLeft:ManageDynamicMargin(i18n.language,undefined,Scale(36)),marginRight:ManageDynamicMargin(i18n.language,Scale(36),undefined)},styles.text]}>{item.showName}</Text>
        </View>
        <CustomRadioButton
          selected={index === this.state.selectedIndex}
          onSelect={() => this.selectType(index)}
          size={24}
        />
      </Pressable>
    );
  };
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="driverRegistration">
        <CustomHeader
          title="Registration"
          onLeftPress={this.goBack}
          leftTestId="goBackBtn"
          right={<Image source={headPhoneIcon} style={styles.icon} />}
          onRightPress={this.onCustomerCarePress}
          rightTestId="supportBtn"
        />
        <View style={styles.main}>
          <VirtualizedList
            data={this.registerAsTypes}
            getItem={this.getItem}
            getItemCount={this.getCountRegisterAsTypes}
            keyExtractor={this.extractor}
            initialNumToRender={2}
            renderItem={this.renderData}
          />
          <CustomButton
            title={i18n.t('Next')}
            onPress={this.goToSelectVehicle}
            testID="nextBtn"
          />
        </View>
      </SafeAreaView>
    );
    // Customizable Area Start
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  icon: {
    height: (width * 5) / 100,
    width: (width * 4) / 100,
  },
  item: {
    alignItems: "center",
    paddingHorizontal: Scale(20),
    height: Scale(94),
    marginBottom: Scale(20),
    margin: 2,

    shadowColor: "#000000",
    backgroundColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: Scale(2),
    borderColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  activeItem: {
    borderColor: "#CCBEB1",
  },
  itemIcon: {
    height: Scale(50),
    width: Scale(50),
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#375280",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Lato",
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    padding: Scale(20),
  },
});
