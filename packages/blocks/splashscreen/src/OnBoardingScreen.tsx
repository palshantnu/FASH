import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect, Circle } from "react-native-svg";
import MessageEnum, { getName } from "../../../framework/src/Messages/MessageEnum";
import { Message } from "../../../framework/src/Message";
import SplashScreenController2 from "./SplashScreenController2";
import Arrow from '../assets/Arrow';


const { width } = Dimensions.get("window");
const RADIUS = 45;
const STROKE_WIDTH = 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const slides = [
  { id: "1", image: "https://img.freepik.com/free-photo/close-up-hand-holding-device_23-2149241418.jpg?w=2000" },
  { id: "2", image: "https://img.freepik.com/free-photo/just-look-there-there-is-exactly-what-we-were-looking_329181-1731.jpg?w=1800" },
  { id: "3", image: "https://img.freepik.com/premium-photo/indian-girl-with-shopping-bags-gift-boxes-standing-isolated-white-background_466689-40847.jpg?w=1800" }
];

export default class OnboardingSlider extends SplashScreenController2 {
  progress = new Animated.Value(0.25); // 25% initially visible

  flatListRef = React.createRef();

  state = { currentIndex: 0 };

  componentDidUpdate(_, prevState) {
    if (prevState.currentIndex !== this.state.currentIndex) {
      Animated.timing(this.progress, {
        toValue: (this.state.currentIndex + 1) / slides.length,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }

  handleNext = () => {
    const { currentIndex } = this.state;
    if (currentIndex < slides.length - 1) {
      this.flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      const message = new Message(getName(MessageEnum.NavigationLoginOptionsMessage));
      message.addData(getName(MessageEnum.NavigationPropsMessage), this.props);
      this.send(message); // Comes from the controller (like Splashscreen2)
    }
  };

  onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      this.setState({ currentIndex: viewableItems[0].index });
    }
  };

  render() {
    const strokeDashoffset = this.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [CIRCUMFERENCE, 0],
    });

    return (
      <View style={styles.container}>
        <FlatList
          data={slides}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={this.flatListRef}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          renderItem={({ item }) => (
            <ImageBackground source={{ uri: item.image }} style={styles.image}>
              <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                <Defs>
                  <LinearGradient id="overlayGradient" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="black" stopOpacity="0.2" />
                    <Stop offset="1" stopColor="black" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#overlayGradient)" />
              </Svg>

              <View style={styles.textContainer}>
                <Text style={styles.title}>FASH</Text>
                <Text style={styles.subtitle}>Discover new styles</Text>
                <Text style={styles.description}>
                  Get Personal Styling - Connect with professional stylists
                </Text>

                <View style={styles.circleWrapper}>
                  <Svg width={RADIUS * 2 + STROKE_WIDTH} height={RADIUS * 2 + STROKE_WIDTH}>
                    <Circle
                      cx={RADIUS + STROKE_WIDTH / 2}
                      cy={RADIUS + STROKE_WIDTH / 2}
                      r={RADIUS}
                      stroke="#fff"
                      strokeWidth={STROKE_WIDTH}
                      opacity={0.2}
                      fill="none"
                    />
                    <AnimatedCircle
                      cx={RADIUS + STROKE_WIDTH / 2}
                      cy={RADIUS + STROKE_WIDTH / 2}
                      r={RADIUS}
                      stroke="#fff"
                      strokeWidth={STROKE_WIDTH}
                      strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="none"
                    />
                  </Svg>
                  <TouchableOpacity style={styles.button} onPress={this.handleNext}>
                    <Text style={styles.arrow}><Arrow style={{
                      width: 24,
                      height: 24,
                      marginLeft: 12,
                      resizeMode: "contain",
                      fontWeight:'900'
                    }} /></Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  image: {
    width,
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  textContainer: {
    padding: 24,
    alignItems: "center",
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#CCBEB1",
  },

  subtitle: {
    fontSize: 24,
    color: "#ddd",
    marginTop: 8,
  },

  description: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 12,
    marginBottom: 20,
    textAlign: "center",
  },

  circleWrapper: {
    width: RADIUS * 2 + STROKE_WIDTH,
    height: RADIUS * 2 + STROKE_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  button: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -(RADIUS * 1.5) / 2 },
      { translateY: -(RADIUS * 1.5) / 2 }
    ],  
    width: RADIUS * 1.5,
    height: RADIUS * 1.5,
    borderRadius: RADIUS,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    fontSize: 32,
    color: "#000",
    textAlign: "center",
  },
});
