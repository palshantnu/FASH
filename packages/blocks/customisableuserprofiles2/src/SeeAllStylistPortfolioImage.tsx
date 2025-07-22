import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  FlatList,
} from "react-native";

import CustomLoader from "../../../components/src/CustomLoader";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import globalStyle from "../../../components/src/GlobalStyle";
import { backIcon } from "./assets";
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import i18n from "../../../components/src/i18n/i18n.config";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
// Customizable Area End

import SeeAllStylistPortfolioImageController, {
  Props,
} from "./SeeAllStylistPortfolioImageController";

export default class SeeAllStylistPortfolioImage extends SeeAllStylistPortfolioImageController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  Header = () => (
    <View style={[styles.headerSeeAll, { flexDirection: FlexConditionManage(i18n.language) }]}>
      <TouchableOpacity
        testID="backButtonID"
        style={styles.backTouch}
        onPress={() => {
          this.props.navigation.goBack();
        }}
      >
        <Image
          resizeMode="contain"
          source={backIcon}
          style={[styles.backIconSA,  { transform: [{ scaleY: ImageReverseManage(i18n.language) }, { scaleX: ImageReverseManage(i18n.language) }] } ]}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>
            {i18n.t("stylistPortfolioImages")}
        </Text>
      </View>
      <View style={styles.extraView} />
    </View>
  );

  view1 = (item: any, index: number) => {
    return (
        <View style={{ flexDirection: "row", width: "50%" }} key={index}>
            {item.map((subItem: any, ind1: any) => (
                ind1 === 0 ?
                    <TouchableOpacity
                        onPress={() => this.navigateTo({ item: item[0] })}
                        testID="image01"
                    >
                        <Image source={{ uri: item[0]?.url }} style={{ width: 250, height: 269 }} />
                    </TouchableOpacity>
                    :
                    ind1 === 1 &&
                    <View style={{ width: "100%" }}>
                        <TouchableOpacity
                            onPress={() => this.navigateTo({ item: item[1] })}
                            testID="image11"
                        >
                            <Image source={{ uri: item[1]?.url }} style={{ width: 177, height: 134 }} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.navigateTo({ item: item[2] })}
                            testID="image12"
                        >
                            <Image source={{ uri: item[2]?.url }} style={{ width: 177, height: 134 }} />
                        </TouchableOpacity>
                    </View>
            ))}
        </View>
    );
};
view2 = (item: any, index: number) => {
    return (
        <View style={{ flexDirection: "row", }} key={index}>
            {item.map((subItem: any) => (
                <TouchableOpacity
                    onPress={() => this.navigateTo({ item: subItem })}
                    testID={`image20-${subItem.portfolio_image_id}`}
                >
                    <Image source={{ uri: subItem.url }} style={{ width: 141, height: 141 }} />
                </TouchableOpacity>
            ))}
        </View>
    );
};
view3 = (item: any, index: number) => {
    return (
        <View style={{ flexDirection: "row", width: "50%" }} key={index}>
            {item.map((subItem: any, ind1: any) => (
                ind1 === 0 ?
                    <View style={{ width: "100%" }}>
                        <TouchableOpacity
                            onPress={() => this.navigateTo({ item: item[0] })}
                            testID="image30"
                        >
                            <Image source={{ uri: item[0]?.url }} style={{ width: 177, height: 134 }} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.navigateTo({ item: item[1] })}
                            testID="image31"
                        >
                            <Image source={{ uri: item[1]?.url }} style={{ width: 177, height: 134 }} />
                        </TouchableOpacity>
                    </View>
                    :
                    ind1 === 2 &&
                    <TouchableOpacity
                        onPress={() => this.navigateTo({ item: item[2] })}
                        testID="image32"
                    >
                        <Image source={{ uri: item[2]?.url }} style={{ width: 250, height: 269 }} />
                    </TouchableOpacity>
            ))}
        </View>
    );
};
renderImages = (item: any, index: number) => {
    if (index % 3 === 0) {
        return this.view1(item, index);
    } else if (index % 3 === 1) {
        return this.view2(item, index);
    } else {
        return this.view3(item, index);
    }
};


  // Customizable Area End  
  render() {
    // Customizable Area Start
    return (
      <SafeAreaView style={styles.container} testID="SeeAllStylistPortfolioImage">
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        {this.state.loading && <CustomLoader />}
        <View
          style={[
            styles.bodyView,
            globalStyle.headerMarginManage,
          ]}
        >
        <this.Header />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
            <View>
              <FlatList
                testID="imageList"
                data={this.state.chunkedArray}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => this.renderImages(item, index)}
              />
            </View>
        </ScrollView>
        </View>
        
      </SafeAreaView>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  extraView: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  headerSeeAll: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: (windowWidth * 3) / 100,
    marginBottom: (windowWidth * 3) / 100,
  },
  backIconSA: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitle: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
    fontWeight: "800",
  },
  bodyView: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 90) / 100,
    alignSelf: "center",
  },
});
// Customizable Area End