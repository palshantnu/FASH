import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  View,
  Pressable,
  VirtualizedList,
  ListRenderItem,
  Dimensions,
} from "react-native";
import { VehicleType } from "./responseStore";
import { headPhoneIcon } from "./assets";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomButton from "../../../components/src/CustomButton";
import CustomRadioButton from "../../../components/src/CustomRadioButton";
import Scale from "../../../components/src/Scale";
import i18n from '../../../components/src/i18n/i18n.config';
import FlexConditionManage from '../../../components/src/FlexConditionManage'
import ManageDynamicMargin from '../../../components/src/ManageDynamicMargin'
const { width } = Dimensions.get("window");
// Customizable Area End

import SelectVehicleController, { Props } from "./SelectVehicleController";

export default class SelectVehicle extends SelectVehicleController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  renderVehicle: ListRenderItem<VehicleType> = ({ item, index }) => {
    return (
      <Pressable
        style={[
          styles.item,
          styles.row,
          index === this.state.selectedVehicleIndex ? styles.activeItem : {},
          { flexDirection: FlexConditionManage(i18n.language) }
        ]}
        onPress={() => this.selectType(index)}
        testID={`item-type-${index}`}
      >
        <View style={[styles.row,{ flexDirection: FlexConditionManage(i18n.language) }]}>
          <Image source={item.icon} style={styles.itemIcon} />
          <Text style={[styles.text,{marginLeft:ManageDynamicMargin(i18n.language,undefined,Scale(36)),marginRight:ManageDynamicMargin(i18n.language,Scale(36),undefined)}]}>{item.showName}</Text>
        </View>
        <CustomRadioButton
          selected={index === this.state.selectedVehicleIndex}
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
      <SafeAreaView style={styles.container} testID="selectVehicle">
        <CustomHeader
          title={i18n.t('selectVehicleText')}
          onLeftPress={this.goBack}
          right={<Image source={headPhoneIcon} style={styles.icon} />}
          onRightPress={this.onCustomerCarePress}
          leftTestId="goBackBtn"
          rightTestId="supportBtn"
        />
        <View style={styles.main}>
          <VirtualizedList
            data={this.vehicleTypes}
            getItem={this.getItem}
            keyExtractor={this.extractor}
            getItemCount={this.getCountVehicleTypes}
            initialNumToRender={2}
            renderItem={this.renderVehicle}
          />
          <CustomButton
            title={i18n.t('Next')}
            onPress={this.goToNextVechile}
            testID="nextBtn"
            style={styles.button}
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
    width: (width * 4) / 100,
    height: (width * 5) / 100,
  },
  item: {
    marginHorizontal: Scale(20),
    paddingHorizontal: Scale(20),
    height: Scale(94),
    marginBottom: Scale(20),
    alignItems: "center",

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
    width: Scale(50),
    height: Scale(50),
  },
  row: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "#375280",
    marginLeft: Scale(36),
    fontFamily: "Lato",
    fontSize: 16,
    fontWeight: "700",
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    marginVertical: Scale(20),
  },
  button: {
    marginHorizontal: Scale(20),
  },
});
