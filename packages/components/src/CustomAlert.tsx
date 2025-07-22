import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  DeviceEventEmitter,
  AlertButton,
} from "react-native";

import Scale from "./Scale";
import CustomButton from "./CustomButton";

export interface CustomAlertParams {
  messsage: string;
  okButton: AlertButton;
  cancelButton: AlertButton;
}

const { width, height } = Dimensions.get("window");

const getPercent = (percent: number, of: number) => (percent * of) / 100;

export const showAlert = (params: CustomAlertParams) => {
  DeviceEventEmitter.emit("showCustomAlert", params);
};

export const closeAlert = () => {
  DeviceEventEmitter.emit("closeCustomAlert");
};

const defaultParams: CustomAlertParams = {
  messsage: "",
  okButton: {
    text: "Ok",
    onPress: () => {
      DeviceEventEmitter.emit("closeCustomAlert");
    },
  },
  cancelButton: {
    text: "Cancel",
    onPress: () => {
      DeviceEventEmitter.emit("closeCustomAlert");
    },
  },
};

export default function CustomAlert() {
  const [params, setParams] = useState(defaultParams);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const subShow = DeviceEventEmitter.addListener(
      "showCustomAlert",
      (data: CustomAlertParams) => {
        setParams({ ...defaultParams, ...data });
        setVisible(true);
      }
    );
    const subClose = DeviceEventEmitter.addListener("closeCustomAlert", () => {
      setVisible(true);
    });

    return () => {
      subShow.remove();
      subClose.remove();
    };
  }, []);

  return (
    <Modal
      transparent={true}
      onRequestClose={() => setVisible(false)}
      visible={visible}
      style={{ flex: 1 }}
      testID="customModal"
      statusBarTranslucent
    >
      <View style={styles.modal}>
        <SafeAreaView style={styles.main}>
          <View style={styles.alertBox}>
            <View style={styles.center}>
              <Text style={styles.message}>{params.messsage}</Text>
            </View>
            <View style={styles.buttons}>
              <CustomButton
                title={params.cancelButton.text!}
                onPress={() => {
                  if (typeof params.cancelButton.onPress === "function") {
                    params.cancelButton.onPress();
                  }
                  setVisible(false);
                }}
                textStyle={styles.noText}
                style={[styles.button, styles.leftButton]}
              />
              <CustomButton
                title={params.okButton.text!}
                onPress={() => {
                  if (typeof params.okButton.onPress === "function") {
                    params.okButton.onPress();
                  }
                  setVisible(false);
                }}
                style={[styles.button, styles.rightButton]}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    backgroundColor: "#00000030",
  },
  alertBox: {
    height: getPercent(26, height),
    width: getPercent(90, width),
    backgroundColor: "#FFFFFF",
    padding: Scale(20),
    borderRadius: Scale(12),
    justifyContent: "space-between",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    borderRadius: Scale(2),
  },
  rightButton: {
    marginLeft: Scale(5),
  },
  leftButton: {
    marginRight: Scale(5),
    backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: "#CCBEB1",
  },
  noText: {
    color: "#375280",
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Lato-Regular",
  },
  message: {
    fontWeight: "500",
    color: "#375280",
    paddingVertical: 22,
    fontFamily: "Lato-Regular",
    fontSize: Scale(16),
    textAlign: "center",
    lineHeight: 24,
  },
});
