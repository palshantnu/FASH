import { StyleSheet, Platform, Dimensions } from "react-native";
import Scale from "./Scale";
const windowWidthGlobal = Dimensions.get("window").width;

const globalStyle = StyleSheet.create({
  headerMarginManage: {
    marginTop: Platform.OS === "ios" ? (windowWidthGlobal * 3) / 100 : 0,
  },
  status: {
    paddingHorizontal: Scale(12),
    paddingVertical: Scale(4),
    borderRadius: Scale(2),
  },
  open: {
    backgroundColor: "#E2E8F0",
    color: "#375280",
  },
  close: {
    backgroundColor: "#FEE2E2",
    color: "#DC2626",
  },
  statusText: {
    fontFamily: "Lato",
    fontWeight: "400",
    fontSize: 14,
  },
  inputWrapper: {
    marginTop: Scale(10),
  },
  inputLabel: {
    fontFamily: "Lato-Bold",
    fontSize: Scale(16),
    color: "#375280",
    marginBottom: Scale(6),
  },
  textInput: {
    height: Scale(48),
    padding: Scale(8),
    backgroundColor: "#F8F8F8",
    borderRadius: Scale(2),
    color: "#375280",
    fontFamily: "Lato",
  },
  errContainer: {
    height: Scale(24),
    justifyContent: "center",
  },
  errorText: {
    fontFamily: "Lato-Regular",
    color: "#EF4444",
    fontSize: Scale(16),
    lineHeight: Scale(24),
  },
});

export default globalStyle;
