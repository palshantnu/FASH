import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  View,
  Text,
  Pressable,
} from "react-native";

import CustomHeader from "../../../components/src/CustomHeader";
import CustomSearch from "../../../components/src/CustomSearch";
import CustomButton from "../../../components/src/CustomButton";
import Scale from "../../../components/src/Scale";

import { headPhoneIcon } from "./assets";
import { CityType } from "./responseStore";

const { width: windowWidth } = Dimensions.get("window");
// Customizable Area End

import SearchCityController, { Props } from "./SearchCityController";

export default class SearchCity extends SearchCityController {
  constructor(props: Props) {
    super(props);
  }

  // Customizable Area Start
  renderSectionHeader = (info: {
    section: SectionListData<
      CityType,
      {
        title: string;
        data: CityType[];
      }
    >;
  }) => {
    return (
      <View style={styles.listHeaderItem}>
        <Text style={styles.sectionHeaderText}>{info.section.title}</Text>
      </View>
    );
  };

  renderItem: SectionListRenderItem<
    CityType,
    {
      title: string;
      data: CityType[];
    }
  > = ({ item }) => (
    <View>
      <Pressable style={styles.listItem}>
        <Text style={styles.cityName}>{item.name}</Text>
      </Pressable>
      <View style={styles.divider} />
    </View>
  );
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="searchCity">
        <CustomHeader
          title="Search City"
          leftTestId="goBackBtn"
          onLeftPress={this.goBack}
          rightTestId="supportBtn"
          right={<Image source={headPhoneIcon} style={styles.icon} />}
          onRightPress={this.onSupportPress}
        />
        <View style={styles.search}>
          <CustomSearch
            placeholder="Search your work city"
            value={this.state.searchText}
            onChangeText={this.handleSearchText}
            testID="search"
          />
        </View>
        <SectionList
          sections={this.cities}
          style={styles.list}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtrator}
        />
        <CustomButton
          title="Next"
          testID="nextBtn"
          style={styles.btn}
          onPress={this.goToDriverPersonalDetails}
        />
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
  list: {
    flex: 1,
    paddingHorizontal: Scale(20),
    paddingBottom: Scale(20),
  },
  icon: {
    width: (windowWidth * 4) / 100,
    height: (windowWidth * 5) / 100,
  },
  cityName: {
    fontSize: Scale(18),
    fontFamily: "Lato",
    color: "#94A3B8",
    fontWeight: "500",
  },
  activeCity: {
    fontWeight: "700",
    color: "#375280",
  },
  sectionHeaderText: {
    fontSize: Scale(20),
    fontFamily: "Lato",
    color: "#375280",
    fontWeight: "500",
  },
  listItem: {
    marginVertical: Scale(8),
  },
  divider: {
    height: StyleSheet.hairlineWidth * 2,
    backgroundColor: "#D5D5D5",
    width: "100%",
    borderRadius: Scale(1),
    overflow: "hidden",
  },
  listHeaderItem: {
    marginVertical: Scale(9),
  },
  btn: {
    marginBottom: Scale(20),
    marginHorizontal: Scale(20),
  },
  search: {
    marginTop: Scale(10),
    marginHorizontal: Scale(20),
  },
});
