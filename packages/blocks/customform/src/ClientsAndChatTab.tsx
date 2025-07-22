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
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import { TabView, TabBar } from "react-native-tab-view";
import ClientsAndChatTabController, {
  Props,
  Route,
} from "./ClientsAndChatTabController";
import { backIcon } from "./assets";
import ClientsTabScreen from "./ClientsTabScreen";
import i18n from '../../../components/src/i18n/i18n.config'
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import ImageReverseManage from "../../../components/src/ImageReverseManage";
import ChatList from "../../chat/src/ChatList";
// Customizable Area End

export default class ClientsAndChatTab extends ClientsAndChatTabController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }
  // Customizable Area Start

  renderScene = ({ route }: { route: Route } = { route: { key: '', title: '' } }) => {
    switch (route.key) {
      case 'first':
        return <ChatList navigation={this.props.navigation} id={""} />
      
        case 'second':
          return <ClientsTabScreen navigation={this.props} id={""} />;

      default:
        return null;
    }
  };

  renderTabBar = (props: any) => (
    <TabBar
      tabStyle={{ flex: 1 }}
      {...props}
      indicatorStyle={{ backgroundColor: "#375280", height: 2 }}
      style={styles.tabStyle}
      labelStyle={styles.tablabel}
      renderLabel={({ route, focused }) => this.renderTabLable(focused, route)}
    />
  );

  renderTabLable = (focused: boolean, route: any) => {
    return (
    <Text style={focused ? styles.tablabelActive : styles.tablabelInActive}>
          {route.title}
        </Text>
    )
  }
 // Customizable Area End
  render() {
    // Customizable Area Start

    return(
      <View style={styles.mainContainer}>
        <SafeAreaView style={styles.safeContainer} />
        <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
        />
        <View style={styles.container}>
          <View style={[styles.headerViewCli,{flexDirection:FlexConditionManage(i18n.language)}]}>
            <TouchableOpacity
              testID="btnBackClientsAndchat"
              style={styles.backTouchCliAndChat}
              onPress={this.onLandingScreen}
            >
              <Image
                resizeMode="contain"
                source={backIcon}
                style={[styles.backIconCssN,{  transform: [{ scaleX: ImageReverseManage(i18n.language) }, { scaleY: ImageReverseManage(i18n.language) }]}]}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitleCliAndChat}>{i18n.t('clients')}</Text>
            </View>
            <View style={styles.extraViewTouch} />
          </View>
        </View>
        <View style={{ flex: 1}}>
          <TabView
            style={{ backgroundColor: "white" }}
            navigationState={{
              index: this.state.index,
              routes: this.state.routes,
            }}
            renderScene={this.renderScene}
            onIndexChange={this.setIndex}
            initialLayout={this.state.layout}
            renderTabBar={this.renderTabBar}
            swipeEnabled={false}
            data-test-id="TabId"
          />
        </View>
      </View>
    )
    // Customizable Area End
  
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  
  backIconCssN: {
    width: (windowWidth * 5) / 100,
    height: (windowWidth * 5) / 100,
  },
  headerTitleCliAndChat: {
    color: "#375280",
    fontSize: (windowWidth * 5) / 100,
    textAlign: "center",
    fontFamily: "Avenir-Heavy",
  },
  extraViewTouch: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
  },
  tablabel: {
    textTransform: "capitalize",
    textAlign: "center",
    fontWeight: "500",
  },
  tablabelActive: {
    textTransform: "capitalize",
    textAlign: "center",
    color : "#375280",
    fontSize: 16,
    width : 50,
    height: 20,
    fontFamily : "Lato",
    fontWeight: "bold",
  },
  tablabelInActive: {
    textTransform: "capitalize",
    textAlign: "center",
    color: "#94A3B8",
    width : 50,
    height: 20,
    fontFamily : "Lato",
    fontSize: 16,
    fontWeight: "500",
  },
  tabStyle: {
    backgroundColor: "white",
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
  },
  backTouchCliAndChat: {
    width: (windowWidth * 6) / 100,
    height: (windowWidth * 6) / 100,
    marginTop: (windowWidth * 1) / 100,
  },
  safeContainer: {
    flex: 0,
    backgroundColor: "#ffffff",
},
  mainContainer: {
      flex: 1,
      backgroundColor: "#ffffff",
  },
  headerViewCli: {
    justifyContent: "space-between",
    marginTop: (windowWidth * 3) / 100,
    alignContent: "center",
  },
  container: {
    width: (windowWidth * 90) / 100,
    alignSelf: "center",
  },
})
// Customizable Area End